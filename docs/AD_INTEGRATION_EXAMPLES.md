/**
 * Ad Integration Examples
 * 
 * This file demonstrates how to integrate ads into existing pages
 * and components throughout the Ellio-Law web application.
 * 
 * Copy these patterns into your existing components.
 * 
 * @fileoverview This file is for documentation only - not compiled
 */

import React from 'react';
// import AdUnit from '@/components/ads/AdUnit';
// import { useSubscription } from '@/src/context/SubscriptionContext';

// ===========================================
// DASHBOARD PAGE INTEGRATION
// ===========================================

/**
 * Example: Dashboard page with strategic ad placement
 * File: app/dashboard/page.tsx
 */
const DashboardWithAds = () => {
  const { subscription, isLoading } = useSubscription();

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          
          {/* Top banner ad for free users */}
          {!isLoading && subscription.tier === 'free' && (
            <div className="hidden lg:block">
              <AdUnit
                slot="dashboard-header-banner"
                size="banner"
                className="ellio-ad-banner"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Dashboard stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-subtle">
                <h3 className="text-lg font-semibold text-text-primary">Active Cases</h3>
                <p className="text-3xl font-bold text-brand-indigo-600 mt-2">12</p>
              </div>
              {/* More stat cards... */}
            </div>

            {/* Inline ad after stats for free users */}
            {!isLoading && subscription.tier === 'free' && (
              <div className="flex justify-center">
                <AdUnit
                  slot="dashboard-inline-rectangle"
                  size="rectangle"
                  className="ellio-ad-rectangle"
                />
              </div>
            )}

            {/* Recent activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border-subtle">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
              {/* Activity content... */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border-subtle">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              {/* Actions... */}
            </div>

            {/* Sidebar ad for free users */}
            {!isLoading && subscription.tier === 'free' && (
              <div className="sticky top-6">
                <AdUnit
                  slot="dashboard-sidebar-rectangle"
                  size="rectangle"
                  className="ellio-ad-rectangle"
                />
              </div>
            )}

            {/* Other sidebar content */}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// BLOG/RESOURCES PAGE INTEGRATION
// ===========================================

/**
 * Example: Blog page with content ads
 * File: app/blog/page.tsx
 */
const BlogWithAds = () => {
  const { subscription, isLoading } = useSubscription();

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header banner */}
        {!isLoading && subscription.tier === 'free' && (
          <div className="mb-8 flex justify-center">
            <AdUnit
              slot="blog-header-leaderboard"
              size="leaderboard"
              className="ellio-ad-leaderboard"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-text-primary mb-8">Legal Resources & Blog</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Blog posts */}
            {[1, 2, 3, 4, 5].map((post, index) => (
              <React.Fragment key={post}>
                <article className="bg-white rounded-xl p-8 shadow-sm border border-border-subtle">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">
                    Understanding Legal Contract Basics {post}
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                  <a href="#" className="text-brand-indigo-600 hover:underline">
                    Read more
                  </a>
                </article>

                {/* Insert ad after every 2nd post for free users */}
                {!isLoading && subscription.tier === 'free' && (index + 1) % 2 === 0 && (
                  <div className="flex justify-center my-8">
                    <AdUnit
                      slot={`blog-inline-${index}`}
                      size="rectangle"
                      className="ellio-ad-rectangle"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter signup */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border-subtle">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Newsletter</h3>
              {/* Newsletter form... */}
            </div>

            {/* Sidebar ads for free users */}
            {!isLoading && subscription.tier === 'free' && (
              <>
                <div className="sticky top-6">
                  <AdUnit
                    slot="blog-sidebar-rectangle-1"
                    size="rectangle"
                    className="ellio-ad-rectangle"
                  />
                </div>

                <div className="mt-6">
                  <AdUnit
                    slot="blog-sidebar-rectangle-2"
                    size="rectangle"
                    className="ellio-ad-rectangle"
                  />
                </div>
              </>
            )}

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border-subtle">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Categories</h3>
              {/* Categories... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// CHAT/ASK FEATURE INTEGRATION
// ===========================================

/**
 * Example: Chat page with strategic ad placement
 * File: app/dashboard/chat/page.tsx
 */
const ChatWithAds = () => {
  const { subscription, isLoading } = useSubscription();

  return (
    <div className="h-screen flex flex-col bg-surface-primary">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border-subtle bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text-primary">AI Legal Assistant</h1>
          
          {/* Header ad for free users */}
          {!isLoading && subscription.tier === 'free' && (
            <div className="hidden md:block">
              <AdUnit
                slot="chat-header-banner"
                size="banner"
                className="ellio-ad-banner"
                style={{ maxHeight: '50px' }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Chat messages... */}
            
            {/* Inline ad every 10 messages for free users */}
            {!isLoading && subscription.tier === 'free' && (
              <div className="flex justify-center my-6">
                <div className="max-w-md">
                  <AdUnit
                    slot="chat-inline-rectangle"
                    size="rectangle"
                    className="ellio-ad-rectangle"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex-shrink-0 border-t border-border-subtle bg-white p-6">
            {/* Chat input... */}
          </div>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden lg:block w-80 border-l border-border-subtle bg-white">
          <div className="p-6 space-y-6">
            {/* Chat history */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Chats</h3>
              {/* Chat history... */}
            </div>

            {/* Sidebar ad for free users */}
            {!isLoading && subscription.tier === 'free' && (
              <div className="sticky top-6">
                <AdUnit
                  slot="chat-sidebar-rectangle"
                  size="rectangle"
                  className="ellio-ad-rectangle"
                />
              </div>
            )}

            {/* Usage stats */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Usage</h3>
              {/* Usage info... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// MOBILE-SPECIFIC AD PLACEMENTS
// ===========================================

/**
 * Example: Mobile-optimized ad placements
 */
const MobileAdExample = () => {
  const { subscription, isLoading } = useSubscription();

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Mobile sticky header ad */}
      {!isLoading && subscription.tier === 'free' && (
        <div className="sticky top-0 z-40 bg-white border-b border-border-subtle lg:hidden">
          <div className="flex justify-center py-2">
            <AdUnit
              slot="mobile-sticky-banner"
              size="mobile-banner"
              className="ellio-ad-mobile-banner"
            />
          </div>
        </div>
      )}

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Mobile Content</h1>

        {/* Content sections */}
        {[1, 2, 3, 4, 5].map((section, index) => (
          <React.Fragment key={section}>
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-border-subtle">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Section {section}
              </h2>
              <p className="text-text-secondary">
                Content for section {section}...
              </p>
            </div>

            {/* Mobile inline ad every 2nd section */}
            {!isLoading && subscription.tier === 'free' && (index + 1) % 2 === 0 && (
              <div className="mb-6 lg:hidden">
                <AdUnit
                  slot={`mobile-inline-${index}`}
                  size="rectangle"
                  className="ellio-ad-rectangle mx-auto"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile bottom sticky ad */}
      {!isLoading && subscription.tier === 'free' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-subtle lg:hidden">
          <div className="flex justify-center py-2">
            <AdUnit
              slot="mobile-bottom-banner"
              size="mobile-banner"
              className="ellio-ad-mobile-banner"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ===========================================
// COMPONENT WRAPPER FOR PREMIUM CONTENT
// ===========================================

/**
 * Example: Wrapper component that shows ads or premium content
 */
interface PremiumContentWrapperProps {
  children: React.ReactNode;
  adSlot?: string;
  adSize?: 'banner' | 'rectangle' | 'leaderboard';
  upgradeMessage?: string;
}

const PremiumContentWrapper: React.FC<PremiumContentWrapperProps> = ({
  children,
  adSlot = 'premium-content-ad',
  adSize = 'rectangle',
  upgradeMessage = 'Upgrade to access premium features ad-free'
}) => {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return <div className="animate-pulse bg-neutral-200 h-32 rounded-lg" />;
  }

  if (subscription.tier === 'free') {
    return (
      <div className="space-y-6">
        {/* Show limited content preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
          <div className="blur-sm">
            {children}
          </div>
        </div>

        {/* Upgrade CTA with ad */}
        <div className="text-center space-y-4">
          <p className="text-text-secondary">{upgradeMessage}</p>
          
          <AdUnit
            slot={adSlot}
            size={adSize}
            className={`ellio-ad-${adSize} mx-auto`}
          />
          
          <button className="px-6 py-3 bg-brand-indigo-600 text-white rounded-lg hover:bg-brand-indigo-700 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// ===========================================
// USAGE INSTRUCTIONS
// ===========================================

/**
 * HOW TO INTEGRATE ADS INTO YOUR EXISTING PAGES:
 * 
 * 1. Import the required components:
 *    import AdUnit from '@/components/ads/AdUnit';
 *    import { useSubscription } from '@/src/context/SubscriptionContext';
 * 
 * 2. Add subscription check:
 *    const { subscription, isLoading } = useSubscription();
 * 
 * 3. Conditionally render ads for free users:
 *    {!isLoading && subscription.tier === 'free' && (
 *      <AdUnit
 *        slot="unique-slot-name"
 *        size="rectangle"
 *        className="ellio-ad-rectangle"
 *      />
 *    )}
 * 
 * 4. Strategic placement locations:
 *    - After header sections
 *    - Between content blocks
 *    - In sidebars
 *    - Before/after forms
 *    - Between search results
 *    - In mobile sticky positions
 * 
 * 5. Ad sizes to use:
 *    - 'banner' (728x90) - Headers/footers
 *    - 'rectangle' (300x250) - Sidebars/content
 *    - 'leaderboard' (728x90) - Wide headers
 *    - 'mobile-banner' (320x50) - Mobile headers/footers
 * 
 * 6. Always provide unique slot names for each ad position
 * 
 * 7. Consider user experience:
 *    - Don't overwhelm with too many ads
 *    - Maintain content readability
 *    - Follow our frequency capping rules
 *    - Test on different screen sizes
 */

export {
  DashboardWithAds,
  BlogWithAds,
  ChatWithAds,
  MobileAdExample,
  PremiumContentWrapper
};