/**
 * Ad Analytics API Endpoint
 * 
 * Handles ad impression tracking, conversion events, and performance metrics
 * for the Ellio-Law ad monetization system.
 */

import { NextRequest, NextResponse } from 'next/server';

// Define types for analytics events
interface AdImpressionEvent {
  type: 'impression';
  userId?: string;
  sessionId: string;
  adSlot: string;
  adSize: string;
  page: string;
  timestamp: number;
  userAgent: string;
  viewportSize: {
    width: number;
    height: number;
  };
  adBlockerDetected: boolean;
}

interface ConversionEvent {
  type: 'conversion';
  userId: string;
  sessionId: string;
  fromTier: string;
  toTier: string;
  conversionSource: string; // 'upgrade_modal', 'ad_click', 'feature_gate', etc.
  adInteractions: number;
  sessionDuration: number;
  timestamp: number;
}

interface UpgradeModalEvent {
  type: 'upgrade_modal';
  userId?: string;
  sessionId: string;
  action: 'shown' | 'dismissed' | 'upgraded';
  triggerReason: string;
  adImpressionsSinceLastModal: number;
  modalVariation?: string;
  timestamp: number;
}

interface AdBlockerEvent {
  type: 'ad_blocker';
  userId?: string;
  sessionId: string;
  detectionMethod: string;
  userAction: 'detected' | 'disabled' | 'upgraded';
  timestamp: number;
}

type AnalyticsEvent = AdImpressionEvent | ConversionEvent | UpgradeModalEvent | AdBlockerEvent;

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting
const checkRateLimit = (identifier: string, limit: number = 100, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const current = rateLimitMap.get(identifier);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
};

// Validate event data
const validateEvent = (event: any): event is AnalyticsEvent => {
  if (!event || typeof event !== 'object') return false;
  if (!event.type || !event.sessionId || !event.timestamp) return false;

  switch (event.type) {
    case 'impression':
      return !!(event.adSlot && event.adSize && event.page);
    case 'conversion':
      return !!(event.userId && event.fromTier && event.toTier && event.conversionSource);
    case 'upgrade_modal':
      return !!(event.action && event.triggerReason);
    case 'ad_blocker':
      return !!(event.detectionMethod && event.userAction);
    default:
      return false;
  }
};

// Process analytics events
const processEvent = async (event: AnalyticsEvent): Promise<void> => {
  // In production, you would:
  // 1. Store in your database (PostgreSQL, MongoDB, etc.)
  // 2. Send to analytics services (Google Analytics, Mixpanel, etc.)
  // 3. Update real-time metrics
  // 4. Trigger alerts for anomalies

  console.log(`[Analytics] Processing ${event.type} event:`, {
    type: event.type,
    sessionId: event.sessionId,
    userId: event.userId || 'anonymous',
    timestamp: new Date(event.timestamp).toISOString()
  });

  // Example: Send to Google Analytics
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    await sendToGoogleAnalytics(event);
  }

  // Example: Store in database
  // await storeInDatabase(event);

  // Example: Update real-time metrics
  // await updateMetrics(event);
};

// Send events to Google Analytics
const sendToGoogleAnalytics = async (event: AnalyticsEvent): Promise<void> => {
  try {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const apiSecret = process.env.GA_API_SECRET; // Server-side API secret

    if (!measurementId || !apiSecret) {
      console.warn('[Analytics] Google Analytics not configured');
      return;
    }

    const baseEvent = {
      client_id: event.sessionId,
      user_id: event.userId,
      timestamp_micros: event.timestamp * 1000
    };

    let gaEvent;

    switch (event.type) {
      case 'impression':
        gaEvent = {
          name: 'ad_impression',
          parameters: {
            ad_slot: event.adSlot,
            ad_size: event.adSize,
            page_location: event.page,
            ad_blocker_detected: event.adBlockerDetected,
            viewport_width: event.viewportSize.width,
            viewport_height: event.viewportSize.height
          }
        };
        break;

      case 'conversion':
        gaEvent = {
          name: 'subscription_conversion',
          parameters: {
            transaction_id: `${event.userId}_${event.timestamp}`,
            value: getSubscriptionValue(event.toTier),
            currency: 'USD',
            from_tier: event.fromTier,
            to_tier: event.toTier,
            conversion_source: event.conversionSource,
            ad_interactions: event.adInteractions,
            session_duration: event.sessionDuration
          }
        };
        break;

      case 'upgrade_modal':
        gaEvent = {
          name: 'upgrade_modal_interaction',
          parameters: {
            modal_action: event.action,
            trigger_reason: event.triggerReason,
            ad_impressions_since_last: event.adImpressionsSinceLastModal,
            modal_variation: event.modalVariation || 'default'
          }
        };
        break;

      case 'ad_blocker':
        gaEvent = {
          name: 'ad_blocker_detected',
          parameters: {
            detection_method: event.detectionMethod,
            user_action: event.userAction
          }
        };
        break;

      default:
        return;
    }

    // Send to GA4 Measurement Protocol
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...baseEvent,
          events: [gaEvent]
        })
      }
    );

    if (!response.ok) {
      console.error('[Analytics] Failed to send to Google Analytics:', response.statusText);
    }
  } catch (error) {
    console.error('[Analytics] Error sending to Google Analytics:', error);
  }
};

// Get subscription tier value for analytics
const getSubscriptionValue = (tier: string): number => {
  switch (tier.toLowerCase()) {
    case 'basic': return 9.99;
    case 'pro': return 29.99;
    case 'attorney': return 49.99;
    default: return 0;
  }
};

// Main API handler
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP, 100, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const events = Array.isArray(body) ? body : [body];

    // Validate events
    const validEvents = events.filter(validateEvent);
    if (validEvents.length === 0) {
      return NextResponse.json(
        { error: 'No valid events provided' },
        { status: 400 }
      );
    }

    // Process each event
    const results = await Promise.allSettled(
      validEvents.map(processEvent)
    );

    // Count successful processing
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.length - successful;

    if (failed > 0) {
      console.warn(`[Analytics] Failed to process ${failed} out of ${results.length} events`);
    }

    return NextResponse.json({
      success: true,
      processed: successful,
      failed: failed,
      message: `Processed ${successful} events successfully`
    });

  } catch (error) {
    console.error('[Analytics] API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Something went wrong'
      },
      { status: 500 }
    );
  }
}

// GET handler for health check and metrics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    switch (action) {
      case 'health':
        return NextResponse.json({
          status: 'healthy',
          timestamp: Date.now(),
          environment: process.env.NODE_ENV
        });

      case 'metrics':
        // In production, return aggregated metrics from your database
        return NextResponse.json({
          message: 'Metrics endpoint - implement based on your analytics storage'
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[Analytics] GET error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Example usage in client components:
/*
import { trackAdImpression, trackConversion } from '@/lib/analytics';

// Track ad impression
trackAdImpression({
  adSlot: 'dashboard-sidebar',
  adSize: 'rectangle',
  page: '/dashboard',
  adBlockerDetected: false,
  viewportSize: { width: 1920, height: 1080 }
});

// Track subscription conversion
trackConversion({
  userId: 'user-123',
  fromTier: 'free',
  toTier: 'basic',
  conversionSource: 'upgrade_modal',
  adInteractions: 5,
  sessionDuration: 180000
});
*/