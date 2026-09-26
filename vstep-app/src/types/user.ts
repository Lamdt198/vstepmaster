/**
 * User & Security Domain Types
 * Architecture: Clean Architecture - Domain Layer / RBAC
 */

export type UserRole = 'ROLE_ADMIN' | 'ROLE_STUDENT' | 'ROLE_EXAMINER';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  targetBand: 'B1' | 'B2' | 'C1';
  currentStreakDays: number;
  totalStudyMinutes: number;
  lastActiveAt: string;
}

export interface AuthSession {
  token: string;
  user: User;
  expiresAt: number;
}
