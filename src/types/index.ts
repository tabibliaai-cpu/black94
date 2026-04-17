// ============ USER TYPES ============
export type UserRole = 'user' | 'creator' | 'business';
export type VerificationStatus = 'none' | 'blue' | 'gold';
export type SubscriptionPlan = 'free' | 'premium' | 'business';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing';
export type NameVisibility = 'everyone' | 'selected' | 'hidden';
export type DMPermission = 'everyone' | 'selected' | 'none';
export type SearchVisibility = 'username' | 'profileName' | 'both' | 'hidden';

export interface PrivacySettings {
  nameVisibility: NameVisibility;
  dmPermission: DMPermission;
  searchVisibility: SearchVisibility;
  showOnlineStatus: boolean;
  allowTagging: boolean;
}

export interface Subscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  razorpaySubscriptionId?: string;
  expiresAt: Date | null;
  startedAt: Date | null;
}

export interface AffiliateBadge {
  id: string;
  assignedTo: string;
  badgeName: string;
  businessId: string;
  businessName: string;
  assignedAt: Date;
  expiresAt: Date | null;
  isActive: boolean;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  coverPhotoURL?: string;
  bio?: string;
  website?: string;
  location?: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  subscription: Subscription;
  privacySettings: PrivacySettings;
  pubKey?: string; // E2EE public key
  paidChat?: {
    enabled: boolean;
    pricePerMessage?: number;
    pricePerSession?: number;
    sessionDurationMinutes?: number;
  };
  followersCount: number;
  followingCount: number;
  postsCount: number;
  affiliateBadge?: AffiliateBadge;
  maxAffiliateBadges?: number; // for business accounts
  createdAt: Date;
  updatedAt: Date;
}

// ============ FOLLOW TYPES ============
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

// ============ POST TYPES ============
export type PostType = 'post' | 'article' | 'ad';

export interface Post {
  id: string;
  authorId: string;
  authorUsername: string;
  authorDisplayName: string;
  authorPhotoURL?: string;
  authorVerification: VerificationStatus;
  type: PostType;
  content: string;
  mediaUrls?: string[];
  mediaTypes?: ('image' | 'video')[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLikedByCurrentUser?: boolean;
  visibility: 'public' | 'followers' | 'private';
  tags?: string[];
  factCheckStatus?: 'verified' | 'disputed' | 'unverified' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface Article extends Post {
  title: string;
  subtitle?: string;
  richContent: string; // TipTap JSON
  readTime?: number;
  coverImageURL?: string;
}

// ============ CHAT TYPES ============
export interface Chat {
  id: string;
  participants: string[];
  participantProfiles?: Record<string, Pick<UserProfile, 'displayName' | 'username' | 'photoURL' | 'verificationStatus'>>;
  type: 'direct' | 'group';
  groupName?: string;
  groupPhotoURL?: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  lastMessageSenderId?: string;
  isEncrypted: boolean;
  unreadCount?: Record<string, number>;
  isPaidChat?: boolean;
  paidChatSessionActive?: Record<string, boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string; // encrypted if E2EE
  contentType: 'text' | 'image' | 'video' | 'audio' | 'file';
  mediaUrl?: string;
  isRead: boolean;
  readBy: string[];
  isEncrypted: boolean;
  deletedFor?: string[];
  createdAt: Date;
}

// ============ AD TYPES ============
export type AdStatus = 'draft' | 'pending_review' | 'active' | 'paused' | 'completed';
export type AdPlacement = 'feed' | 'comment' | 'profile' | 'search';
export type AdBillingModel = 'cpm' | 'cpc';

export interface Ad {
  id: string;
  businessId: string;
  title: string;
  description: string;
  mediaUrl?: string;
  ctaText: string;
  ctaUrl: string;
  placement: AdPlacement[];
  status: AdStatus;
  billingModel: AdBillingModel;
  budgetTotal: number;
  budgetSpent: number;
  impressions: number;
  clicks: number;
  ctr?: number;
  startDate: Date;
  endDate: Date;
  targetingCategories?: string[];
  createdAt: Date;
}

// ============ CRM / LEAD TYPES ============
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost';

export interface Lead {
  id: string;
  businessId: string;
  userId?: string;
  name: string;
  email?: string;
  phone?: string;
  source: 'ad_click' | 'profile_visit' | 'message' | 'form' | 'manual';
  status: LeadStatus;
  score?: number;
  notes?: string;
  aiSummary?: string;
  lastContactedAt?: Date;
  nextFollowUpAt?: Date;
  dealValue?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============ NOTIFICATION TYPES ============
export type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'payment' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  actionUrl?: string;
  actorId?: string;
  actorPhotoURL?: string;
  createdAt: Date;
}

// ============ SEARCH TYPES ============
export interface SearchResult {
  type: 'user' | 'post' | 'article' | 'external';
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  factCheckStatus?: 'verified' | 'disputed' | 'unverified';
  source?: string;
  createdAt?: Date;
}
