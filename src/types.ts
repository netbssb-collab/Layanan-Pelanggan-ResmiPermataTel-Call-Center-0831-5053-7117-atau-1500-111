export type ContactVerificationStatus = 'OFFICIAL' | 'SUSPICIOUS_CELLULAR' | 'HIGH_RISK_SCAM';

export interface VerificationResult {
  phoneNumber: string;
  status: ContactVerificationStatus;
  channelName: string;
  riskLevel: 'AMANKAN' | 'WASPADA' | 'BAHAYA';
  description: string;
  officialAlternative?: string;
  safetyRecommendations: string[];
  verifiedBadge: boolean;
  analyzedAt: string;
  details?: {
    isCellularNumber: boolean;
    hasOfficialGreenCheck: boolean;
    knownScamReportCount?: number;
  };
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
  isLoading?: boolean;
}

export interface TicketReport {
  id: string;
  ticketNumber: string;
  createdAt: string;
  customerName: string;
  contactPhone: string;
  accountOrCard: string;
  category: 'SUSPICIOUS_WHATSAPP' | 'CARD_LOST_BLOCKED' | 'PHISHING_APK' | 'UNKNOWN_TRANSACTION' | 'APP_ISSUE' | 'GENERAL_INQUIRY';
  priority: 'TINGGI' | 'SEDANG' | 'NORMAL';
  status: 'TERKIRIM' | 'DALAM_INVESTIGASI' | 'DIPROSES' | 'SELESAI';
  chronology: string;
  suspectNumber?: string;
  amountLost?: string;
  resolutionNotes?: string;
}

export interface OfficialContact {
  id: string;
  category: 'CALL_CENTER' | 'WHATSAPP' | 'EMAIL_WEB' | 'SOCIAL_MEDIA';
  title: string;
  value: string;
  displayValue: string;
  operatingHours: string;
  isVerified: boolean;
  badgeText: string;
  description: string;
  actionUrl?: string;
  iconName: string;
}
