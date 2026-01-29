// Ellio Law Pricing Tier Definitions - Web App
// Matching iOS app ellio.legal.v.1.25.26

export type TierType = 'free' | 'standard' | 'comprehensive' | 'advanced';

export interface TierPricing {
  monthly: number;
  annual: number;
  annualSavings: number;
  annualSavingsPercent: number;
}

export interface TierLimits {
  cases: number | 'unlimited';
  documentsPerMonth: number | 'unlimited';
  chatMessagesPerMonth: number | 'unlimited';
  lawyerMatches: number | 'unlimited';
  videoConsultations: number | 'unlimited';
  cloudStorageMB: number | 'unlimited';
  teamMembers: number;
  templates: number | 'unlimited';
  legalGuides: number | 'unlimited';
}

export interface TierFeatures {
  adFree: boolean;
  documentOcr: boolean;
  aiAnalysis: boolean;
  aiAnalysisAdvanced: boolean;
  semanticSearch: boolean;
  priorityQueue: boolean;
  vipQueue: boolean;
  videoConsultations: boolean;
  dedicatedLawyer: boolean;
  support24x7: boolean;
  apiAccess: boolean;
  whiteLabel: boolean;
  customIntegrations: boolean;
  exportAll: boolean;
  customTemplates: boolean;
  lawyerChat: boolean;
}

export interface Tier {
  id: TierType;
  name: string;
  description: string;
  pricing: TierPricing;
  limits: TierLimits;
  features: TierFeatures;
  badge?: string;
  popular?: boolean;
}

export const TIERS: Record<TierType, Tier> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Get started with basic legal tools',
    pricing: {
      monthly: 0,
      annual: 0,
      annualSavings: 0,
      annualSavingsPercent: 0,
    },
    limits: {
      cases: 1,
      documentsPerMonth: 3,
      chatMessagesPerMonth: 5,
      lawyerMatches: 1,
      videoConsultations: 0,
      cloudStorageMB: 100,
      teamMembers: 0,
      templates: 0,
      legalGuides: 5,
    },
    features: {
      adFree: false,
      documentOcr: false,
      aiAnalysis: false,
      aiAnalysisAdvanced: false,
      semanticSearch: false,
      priorityQueue: false,
      vipQueue: false,
      videoConsultations: false,
      dedicatedLawyer: false,
      support24x7: false,
      apiAccess: false,
      whiteLabel: false,
      customIntegrations: false,
      exportAll: false,
      customTemplates: false,
      lawyerChat: false,
    },
    badge: 'Ad-Supported',
  },

  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Essential tools for personal legal matters',
    pricing: {
      monthly: 9.99,
      annual: 99,
      annualSavings: 20,
      annualSavingsPercent: 17,
    },
    limits: {
      cases: 5,
      documentsPerMonth: 50,
      chatMessagesPerMonth: 'unlimited',
      lawyerMatches: 1,
      videoConsultations: 0,
      cloudStorageMB: 1024,
      teamMembers: 0,
      templates: 20,
      legalGuides: 20,
    },
    features: {
      adFree: true,
      documentOcr: false,
      aiAnalysis: false,
      aiAnalysisAdvanced: false,
      semanticSearch: false,
      priorityQueue: false,
      vipQueue: false,
      videoConsultations: false,
      dedicatedLawyer: false,
      support24x7: false,
      apiAccess: false,
      whiteLabel: false,
      customIntegrations: false,
      exportAll: false,
      customTemplates: false,
      lawyerChat: true,
    },
  },

  comprehensive: {
    id: 'comprehensive',
    name: 'Comprehensive',
    description: 'Full-featured legal assistant with AI tools',
    pricing: {
      monthly: 19.99,
      annual: 199,
      annualSavings: 40,
      annualSavingsPercent: 17,
    },
    limits: {
      cases: 'unlimited',
      documentsPerMonth: 'unlimited',
      chatMessagesPerMonth: 'unlimited',
      lawyerMatches: 'unlimited',
      videoConsultations: 5,
      cloudStorageMB: 10240,
      teamMembers: 0,
      templates: 200,
      legalGuides: 500,
    },
    features: {
      adFree: true,
      documentOcr: true,
      aiAnalysis: true,
      aiAnalysisAdvanced: false,
      semanticSearch: true,
      priorityQueue: true,
      vipQueue: false,
      videoConsultations: true,
      dedicatedLawyer: false,
      support24x7: false,
      apiAccess: false,
      whiteLabel: false,
      customIntegrations: false,
      exportAll: true,
      customTemplates: false,
      lawyerChat: true,
    },
    popular: true,
    badge: 'Most Popular',
  },

  advanced: {
    id: 'advanced',
    name: 'Advanced',
    description: 'Premium legal services with dedicated support',
    pricing: {
      monthly: 39.99,
      annual: 399,
      annualSavings: 80,
      annualSavingsPercent: 17,
    },
    limits: {
      cases: 'unlimited',
      documentsPerMonth: 'unlimited',
      chatMessagesPerMonth: 'unlimited',
      lawyerMatches: 'unlimited',
      videoConsultations: 'unlimited',
      cloudStorageMB: 'unlimited',
      teamMembers: 5,
      templates: 'unlimited',
      legalGuides: 'unlimited',
    },
    features: {
      adFree: true,
      documentOcr: true,
      aiAnalysis: true,
      aiAnalysisAdvanced: true,
      semanticSearch: true,
      priorityQueue: true,
      vipQueue: true,
      videoConsultations: true,
      dedicatedLawyer: true,
      support24x7: true,
      apiAccess: true,
      whiteLabel: true,
      customIntegrations: true,
      exportAll: true,
      customTemplates: true,
      lawyerChat: true,
    },
    badge: 'Best Value',
  },
};

// Feature keys for feature gating
export const FEATURES = {
  AD_FREE: 'adFree',
  DOCUMENT_OCR: 'documentOcr',
  AI_ANALYSIS: 'aiAnalysis',
  AI_ANALYSIS_ADVANCED: 'aiAnalysisAdvanced',
  SEMANTIC_SEARCH: 'semanticSearch',
  PRIORITY_QUEUE: 'priorityQueue',
  VIP_QUEUE: 'vipQueue',
  VIDEO_CONSULTATIONS: 'videoConsultations',
  DEDICATED_LAWYER: 'dedicatedLawyer',
  SUPPORT_24X7: 'support24x7',
  API_ACCESS: 'apiAccess',
  WHITE_LABEL: 'whiteLabel',
  CUSTOM_INTEGRATIONS: 'customIntegrations',
  EXPORT_ALL: 'exportAll',
  CUSTOM_TEMPLATES: 'customTemplates',
  LAWYER_CHAT: 'lawyerChat',
} as const;

// Limit keys for usage tracking
export const LIMITS = {
  CASES: 'cases',
  DOCUMENTS_PER_MONTH: 'documentsPerMonth',
  CHAT_MESSAGES_PER_MONTH: 'chatMessagesPerMonth',
  LAWYER_MATCHES: 'lawyerMatches',
  VIDEO_CONSULTATIONS: 'videoConsultations',
  CLOUD_STORAGE_MB: 'cloudStorageMB',
  TEAM_MEMBERS: 'teamMembers',
  TEMPLATES: 'templates',
  LEGAL_GUIDES: 'legalGuides',
} as const;

export const TIER_ORDER: TierType[] = ['free', 'standard', 'comprehensive', 'advanced'];

export const getTierByName = (name: string): TierType | null => {
  if (name.toLowerCase().includes('standard')) return 'standard';
  if (name.toLowerCase().includes('comprehensive')) return 'comprehensive';
  if (name.toLowerCase().includes('advanced')) return 'advanced';
  return 'free';
};

export const canAccessFeature = (tier: TierType, feature: keyof TierFeatures): boolean => {
  return TIERS[tier]?.features[feature] ?? false;
};

export const getLimit = (tier: TierType, limit: keyof TierLimits): number | 'unlimited' => {
  return TIERS[tier]?.limits[limit] ?? 0;
};

export const isWithinLimit = (tier: TierType, limit: keyof TierLimits, currentUsage: number): boolean => {
  const tierLimit = getLimit(tier, limit);
  if (tierLimit === 'unlimited') return true;
  return currentUsage < tierLimit;
};
