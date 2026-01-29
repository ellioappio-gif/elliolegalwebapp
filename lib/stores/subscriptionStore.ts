// Subscription Store - Web App
// Manages user subscription tier and usage tracking

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TierType, TIERS, TierLimits, TierFeatures } from '@/lib/constants/tiers'

interface UsageTracking {
  cases: number;
  documentsThisMonth: number;
  chatMessagesThisMonth: number;
  lawyerMatchesThisMonth: number;
  videoConsultationsThisMonth: number;
  storageUsedMB: number;
  lastResetDate: string; // ISO date string for monthly reset
}

interface SubscriptionState {
  tier: TierType;
  billingCycle: 'monthly' | 'annual';
  subscriptionStart: string | null;
  subscriptionEnd: string | null;
  usage: UsageTracking;
  
  // Actions
  setTier: (tier: TierType) => void;
  setBillingCycle: (cycle: 'monthly' | 'annual') => void;
  incrementUsage: (key: keyof Omit<UsageTracking, 'lastResetDate'>) => void;
  decrementUsage: (key: keyof Omit<UsageTracking, 'lastResetDate'>) => void;
  resetMonthlyUsage: () => void;
  
  // Computed
  canAccessFeature: (feature: keyof TierFeatures) => boolean;
  isWithinLimit: (limit: keyof TierLimits) => boolean;
  getRemainingLimit: (limit: keyof TierLimits) => number | 'unlimited';
  getCurrentTier: () => typeof TIERS[TierType];
}

const initialUsage: UsageTracking = {
  cases: 0,
  documentsThisMonth: 0,
  chatMessagesThisMonth: 0,
  lawyerMatchesThisMonth: 0,
  videoConsultationsThisMonth: 0,
  storageUsedMB: 0,
  lastResetDate: new Date().toISOString().split('T')[0],
};

const SubscriptionContext = createContext<SubscriptionState | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<TierType>('free')
  const [billingCycle, setBillingCycleState] = useState<'monthly' | 'annual'>('monthly')
  const [subscriptionStart, setSubscriptionStart] = useState<string | null>(null)
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null)
  const [usage, setUsage] = useState<UsageTracking>(initialUsage)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ellio-subscription')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          if (data.state) {
            setTierState(data.state.tier || 'free')
            setBillingCycleState(data.state.billingCycle || 'monthly')
            setSubscriptionStart(data.state.subscriptionStart || null)
            setSubscriptionEnd(data.state.subscriptionEnd || null)
            setUsage(data.state.usage || initialUsage)
          }
        } catch (e) {
          console.error('Failed to load subscription data:', e)
        }
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = {
        state: { tier, billingCycle, subscriptionStart, subscriptionEnd, usage },
        version: 0
      }
      localStorage.setItem('ellio-subscription', JSON.stringify(data))
    }
  }, [tier, billingCycle, subscriptionStart, subscriptionEnd, usage])

  const setTier = (newTier: TierType) => setTierState(newTier)
  
  const setBillingCycle = (cycle: 'monthly' | 'annual') => setBillingCycleState(cycle)
  
  const incrementUsage = (key: keyof Omit<UsageTracking, 'lastResetDate'>) => {
    setUsage(prev => ({
      ...prev,
      [key]: prev[key] + 1,
    }))
  }

  const decrementUsage = (key: keyof Omit<UsageTracking, 'lastResetDate'>) => {
    setUsage(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] - 1),
    }))
  }

  const resetMonthlyUsage = () => {
    setUsage(prev => ({
      ...prev,
      documentsThisMonth: 0,
      chatMessagesThisMonth: 0,
      lawyerMatchesThisMonth: 0,
      videoConsultationsThisMonth: 0,
      lastResetDate: new Date().toISOString().split('T')[0],
    }))
  }

  const canAccessFeature = (feature: keyof TierFeatures): boolean => {
    return TIERS[tier]?.features[feature] ?? false
  }

  const isWithinLimit = (limit: keyof TierLimits): boolean => {
    const tierLimit = TIERS[tier]?.limits[limit]
    if (tierLimit === 'unlimited') return true
    
    const usageMap: Record<string, number> = {
      cases: usage.cases,
      documentsPerMonth: usage.documentsThisMonth,
      chatMessagesPerMonth: usage.chatMessagesThisMonth,
      lawyerMatches: usage.lawyerMatchesThisMonth,
      videoConsultations: usage.videoConsultationsThisMonth,
      cloudStorageMB: usage.storageUsedMB,
    }
    
    const currentUsage = usageMap[limit] || 0
    return currentUsage < (tierLimit as number)
  }

  const getRemainingLimit = (limit: keyof TierLimits): number | 'unlimited' => {
    const tierLimit = TIERS[tier]?.limits[limit]
    if (tierLimit === 'unlimited') return 'unlimited'
    
    const usageMap: Record<string, number> = {
      cases: usage.cases,
      documentsPerMonth: usage.documentsThisMonth,
      chatMessagesPerMonth: usage.chatMessagesThisMonth,
      lawyerMatches: usage.lawyerMatchesThisMonth,
      videoConsultations: usage.videoConsultationsThisMonth,
      cloudStorageMB: usage.storageUsedMB,
    }
    
    const currentUsage = usageMap[limit] || 0
    return Math.max(0, (tierLimit as number) - currentUsage)
  }

  const getCurrentTier = () => TIERS[tier]

  const value: SubscriptionState = {
    tier,
    billingCycle,
    subscriptionStart,
    subscriptionEnd,
    usage,
    setTier,
    setBillingCycle,
    incrementUsage,
    decrementUsage,
    resetMonthlyUsage,
    canAccessFeature,
    isWithinLimit,
    getRemainingLimit,
    getCurrentTier,
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscriptionStore(): SubscriptionState {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscriptionStore must be used within SubscriptionProvider')
  }
  return context
}
