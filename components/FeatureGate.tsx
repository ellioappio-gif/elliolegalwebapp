// Feature Gate Component - Web App
// Conditionally renders content based on subscription tier

'use client'

import React, { ReactNode } from 'react'
import { useSubscriptionStore } from '@/lib/stores/subscriptionStore'
import { TierFeatures, TierLimits, TierType, TIERS, TIER_ORDER } from '@/lib/constants/tiers'
import Link from 'next/link'
import { Lock, Sparkles, ArrowRight } from 'lucide-react'

interface FeatureGateProps {
  feature?: keyof TierFeatures;
  limit?: keyof TierLimits;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export function FeatureGate({
  feature,
  limit,
  children,
  fallback,
  showUpgradePrompt = true,
}: FeatureGateProps) {
  const { tier, canAccessFeature, isWithinLimit, getRemainingLimit } = useSubscriptionStore();

  // Check feature access
  if (feature && !canAccessFeature(feature)) {
    return fallback || (showUpgradePrompt ? <UpgradePrompt feature={feature} currentTier={tier} /> : null);
  }

  // Check limit
  if (limit && !isWithinLimit(limit)) {
    const remaining = getRemainingLimit(limit);
    return fallback || (showUpgradePrompt ? <LimitReachedPrompt limit={limit} remaining={remaining} currentTier={tier} /> : null);
  }

  return <>{children}</>;
}

interface UpgradePromptProps {
  feature: keyof TierFeatures;
  currentTier: string;
}

function UpgradePrompt({ feature, currentTier }: UpgradePromptProps) {
  // Find minimum tier that has this feature
  const requiredTier = TIER_ORDER.find(t => TIERS[t].features[feature]);
  const tierName = requiredTier ? TIERS[requiredTier].name : 'Premium';

  const featureNames: Record<string, string> = {
    adFree: 'Ad-free experience',
    documentOCR: 'Document OCR scanning',
    aiAnalysis: 'AI document analysis',
    aiAnalysisAdvanced: 'Advanced AI analysis',
    semanticSearch: 'Semantic search',
    priorityQueue: 'Priority support queue',
    vipQueue: 'VIP support queue',
    videoConsultations: 'Video consultations',
    dedicatedLawyer: 'Dedicated lawyer',
    support24x7: '24/7 support',
    apiAccess: 'API access',
    whiteLabel: 'White-label options',
    customIntegrations: 'Custom integrations',
    exportAll: 'Export all data',
    customTemplates: 'Custom templates',
  };

  return (
    <div className="bg-gradient-to-br from-[#E8ECF8] to-[#D4DAF0] border border-[#D4DAF0] rounded-xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-[#F5F7FC] flex items-center justify-center mx-auto mb-4">
        <Lock className="w-6 h-6 text-[#394C9A]" />
      </div>
      <h3 className="font-['Quicksand'] text-lg font-semibold text-[#394C9A] mb-2">
        {featureNames[feature] || feature} requires {tierName}
      </h3>
      <p className="text-[#5B6BA8] text-sm mb-4">
        Upgrade to {tierName} to unlock this feature and many more.
      </p>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg text-white rounded-lg font-medium transition-all"
      >
        <Sparkles className="w-4 h-4" />
        View Plans
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

interface LimitReachedPromptProps {
  limit: keyof TierLimits;
  remaining: number | 'unlimited';
  currentTier: string;
}

function LimitReachedPrompt({ limit, remaining, currentTier }: LimitReachedPromptProps) {
  const limitNames: Record<string, string> = {
    cases: 'cases',
    documentsPerMonth: 'documents this month',
    chatMessagesPerMonth: 'AI chat messages this month',
    lawyerMatches: 'lawyer matches',
    videoConsultations: 'video consultations',
    cloudStorageMB: 'storage space',
    teamMembers: 'team members',
    templates: 'templates',
    legalGuides: 'legal guides',
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        <Lock className="w-6 h-6 text-amber-600" />
      </div>
      <h3 className="font-['Quicksand'] text-lg font-semibold text-[#394C9A] mb-2">
        {limitNames[limit] || limit} limit reached
      </h3>
      <p className="text-[#5B6BA8] text-sm mb-4">
        You've used all your {limitNames[limit]} for this period. Upgrade to get more.
      </p>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg text-white rounded-lg font-medium transition-all"
      >
        <Sparkles className="w-4 h-4" />
        Upgrade Now
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// Hook for checking feature access
export function useFeature(feature: keyof TierFeatures): boolean {
  const { canAccessFeature } = useSubscriptionStore();
  return canAccessFeature(feature);
}

// Hook for checking limit
export function useLimit(limit: keyof TierLimits): {
  isWithinLimit: boolean;
  remaining: number | 'unlimited';
  total: number | 'unlimited';
} {
  const { tier, isWithinLimit: checkLimit, getRemainingLimit } = useSubscriptionStore();
  const tierKey = tier as TierType;
  const tierData = tierKey in TIERS ? TIERS[tierKey] : TIERS['free'];
  const total = tierData?.limits[limit] ?? 0;
  
  return {
    isWithinLimit: checkLimit(limit),
    remaining: getRemainingLimit(limit),
    total,
  };
}
