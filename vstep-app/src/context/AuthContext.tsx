import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth as useOidcAuth } from 'react-oidc-context';
import { ApiClient } from '../services/apiClient';

export interface User {
  username: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: string;
  email?: string;
  phone?: string;
  school?: string;
  targetBand?: 'B1' | 'B2' | 'C1';
  dailyGoalMinutes?: number;
  status?: 'active' | 'locked';
}

export interface StoredAccount extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isBackendConnected: boolean;
  error?: string;
  login: (username?: string, password?: string) => Promise<boolean>;
  register: (username: string, password: string, displayName: string, email?: string, autoLogin?: boolean) => Promise<{ success: boolean; message?: string }>;
  loginWithKeycloak: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  getAllAccounts: () => StoredAccount[];
  adminUpdateAccount: (username: string, updates: Partial<StoredAccount>) => boolean;
  adminDeleteAccount: (username: string) => boolean;
  adminCreateAccount: (acc: StoredAccount) => { success: boolean; message?: string };
}

const STORAGE_CURRENT_USER = 'vstep_current_user';
const STORAGE_ACCOUNTS = 'vstep_accounts';

export const DEFAULT_ACCOUNTS: StoredAccount[] = [
  {
    username: 'admin',
    password: '123',
    displayName: 'Quản trị viên SuperAdmin',
    role: 'admin',
    email: 'admin@vstepmaster.edu.vn',
    phone: '0901234567',
    school: 'Hội đồng Khảo thí VSTEP',
    targetBand: 'C1',
    dailyGoalMinutes: 60,
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    username: 'user',
    password: '123',
    displayName: 'Học viên VSTEP Master',
    role: 'user',
    email: 'user@vstepmaster.edu.vn',
    phone: '0912345678',
    school: 'Đại học Quốc gia Hà Nội',
    targetBand: 'B2',
    dailyGoalMinutes: 45,
    status: 'active',
    createdAt: '2026-02-15T00:00:00.000Z',
  },
  {
    username: 'student',
    password: '123',
    displayName: 'Học viên Nguyễn Văn An',
    role: 'user',
    email: 'an.nguyen@vnu.edu.vn',
    phone: '0987654321',
    school: 'ĐH Ngoại Ngữ - ĐHQGHN',
    targetBand: 'B2',
    dailyGoalMinutes: 60,
    status: 'active',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
  {
    username: 'hocvien',
    password: '123',
    displayName: 'Trần Thị Mai (Học viên VIP)',
    role: 'user',
    email: 'mai.tran@vstepmaster.edu.vn',
    phone: '0978999888',
    school: 'Đại học Sư phạm Hà Nội',
    targetBand: 'C1',
    dailyGoalMinutes: 90,
    status: 'active',
    createdAt: '2026-03-10T00:00:00.000Z',
  },
  {
    username: 'hv_nguyen22',
    password: '123',
    displayName: 'Nguyễn Văn Hùng',
    role: 'user',
    email: 'hung.nguyen22@gmail.com',
    phone: '0934567890',
    school: 'Học viện Công nghệ Bưu chính Viễn thông',
    targetBand: 'B1',
    dailyGoalMinutes: 30,
    status: 'locked',
    createdAt: '2026-04-05T00:00:00.000Z',
  },
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isBackendConnected: false,
  login: async () => false,
  register: async () => ({ success: false }),
  loginWithKeycloak: () => {},
  logout: () => {},
  updateProfile: async () => false,
  changePassword: async () => ({ success: false, message: '' }),
  getAllAccounts: () => DEFAULT_ACCOUNTS,
  adminUpdateAccount: () => false,
  adminDeleteAccount: () => false,
  adminCreateAccount: () => ({ success: false }),
});

interface KeycloakProfile {
  preferred_username?: string;
  name?: string;
  email?: string;
  realm_access?: { roles?: string[] };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const oidc = useOidcAuth();
  const [localUser, setLocalUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENT_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authError, setAuthError] = useState<string | undefined>();
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Monitor C# ASP.NET Core Backend Health (http://localhost:5000)
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const ok = await ApiClient.checkHealth();
      if (isMounted) setIsBackendConnected(ok);
    };
    check();
    const interval = setInterval(check, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Initialize sample accounts in localStorage if not present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACCOUNTS);
      if (!saved) {
        localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
      } else {
        // Merge in any missing defaults (like new fields or new demo accounts)
        const accounts: StoredAccount[] = JSON.parse(saved);
        let updated = false;
        DEFAULT_ACCOUNTS.forEach((def) => {
          const idx = accounts.findIndex((a) => a.username.toLowerCase() === def.username.toLowerCase());
          if (idx === -1) {
            accounts.push(def);
            updated = true;
          } else {
            // enrich existing defaults with missing properties
            if (!accounts[idx].email || !accounts[idx].targetBand || accounts[idx].status === undefined) {
              accounts[idx] = { ...def, ...accounts[idx] };
              updated = true;
            }
          }
        });
        if (updated) {
          localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(accounts));
        }
      }
    } catch (e) {
      console.error('Error initializing accounts in localStorage', e);
    }
  }, []);

  const profile = oidc.user?.profile as KeycloakProfile | undefined;

  const oidcUser: User | null = oidc.isAuthenticated && profile
    ? {
        username: profile.preferred_username ?? profile.email ?? 'user',
        displayName: profile.name ?? profile.preferred_username ?? profile.email ?? 'User',
        role: profile.realm_access?.roles?.includes('admin') ? 'admin' : 'user',
        email: profile.email,
        createdAt: '',
        status: 'active',
        targetBand: 'B2',
      }
    : null;

  const user = oidcUser || localUser;

  const getAllAccounts = (): StoredAccount[] => {
    try {
      const raw = localStorage.getItem(STORAGE_ACCOUNTS);
      return raw ? JSON.parse(raw) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  };

  const saveAccounts = (accounts: StoredAccount[]) => {
    localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(accounts));
  };

  const login = async (username?: string, password?: string): Promise<boolean> => {
    setAuthError(undefined);

    const targetUser = (username ?? '').trim() || 'user';
    const targetPass = password || '123';

    // 1. Tích hợp máy chủ C# ASP.NET Core Web API (http://localhost:5000/api/Auth/login)
    try {
      const res = await ApiClient.login(targetUser, targetPass);
      if (res && res.token) {
        const u = res.user || res;
        localStorage.setItem('vstep_jwt_token', res.token);
        const mappedUser: User = {
          username: u.username || targetUser,
          displayName: u.displayName || u.fullName || (u.role === 'admin' ? 'Quản trị viên SuperAdmin' : u.username || targetUser),
          role: u.role === 'admin' ? 'admin' : 'user',
          email: u.email || `${targetUser}@vstepmaster.edu.vn`,
          createdAt: u.createdAt || new Date().toISOString(),
          status: 'active',
          targetBand: 'B2',
        };
        setLocalUser(mappedUser);
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(mappedUser));
        setIsBackendConnected(true);
        return true;
      }
    } catch (apiErr: any) {
      console.warn('[ApiClient] C# Backend login fallback:', apiErr?.message);
    }

    // 2. Dự phòng LocalStorage
    try {
      const accounts = getAllAccounts();
      const matched = accounts.find(
        (acc) => acc.username.toLowerCase() === targetUser.toLowerCase()
      );

      const isAdminLogin = targetUser.toLowerCase() === 'admin';

      if (!matched) {
        const newUser: User = {
          username: targetUser,
          displayName: isAdminLogin ? 'Quản trị viên SuperAdmin' : targetUser,
          role: isAdminLogin ? 'admin' : 'user',
          email: `${targetUser}@vstepmaster.edu.vn`,
          createdAt: new Date().toISOString(),
          status: 'active',
          targetBand: 'B2',
          dailyGoalMinutes: 45,
        };
        const newAccount: StoredAccount = {
          ...newUser,
          password: targetPass,
        };
        saveAccounts([...accounts, newAccount]);
        setLocalUser(newUser);
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
        return true;
      }

      // Check if account is locked
      if (matched.status === 'locked') {
        setAuthError('Tài khoản này đã bị tạm khóa an ninh! Vui lòng liên hệ Quản trị viên để mở khóa.');
        return false;
      }

      if (isAdminLogin) {
        const validAdminPass = ['123', 'admin123', 'admin', matched.password];
        if (targetPass && !validAdminPass.includes(targetPass)) {
          setAuthError('Mật khẩu quản trị viên không chính xác (gợi ý: 123 hoặc admin123)!');
          return false;
        }
      } else if (targetPass && matched.password !== targetPass) {
        setAuthError('Mật khẩu không chính xác!');
        return false;
      }

      const activeUser: User = {
        username: matched.username,
        displayName: matched.displayName || (isAdminLogin ? 'Quản trị viên SuperAdmin' : 'Học viên VSTEP'),
        role: isAdminLogin ? 'admin' : matched.role,
        email: matched.email || `${matched.username}@vstepmaster.edu.vn`,
        phone: matched.phone || '',
        school: matched.school || '',
        targetBand: matched.targetBand || 'B2',
        dailyGoalMinutes: matched.dailyGoalMinutes || 45,
        status: matched.status || 'active',
        createdAt: matched.createdAt,
      };
      setLocalUser(activeUser);
      localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(activeUser));
      return true;
    } catch {
      setAuthError('Đã xảy ra lỗi khi đăng nhập');
      return false;
    }
  };

  const register = async (username: string, password: string, displayName: string, email?: string, autoLogin: boolean = true): Promise<{ success: boolean; message?: string }> => {
    setAuthError(undefined);
    if (!username.trim() || !password) {
      return { success: false, message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!' };
    }

    const cleanUser = username.trim();
    const cleanName = displayName.trim() || cleanUser;
    const cleanEmail = email?.trim() || `${cleanUser}@vstepmaster.edu.vn`;

    // 1. Tích hợp máy chủ C# ASP.NET Core Web API
    try {
      const res = await ApiClient.register(cleanUser, password, cleanName, cleanEmail);
      if (res && res.token) {
        const u = res.user || res;
        localStorage.setItem('vstep_jwt_token', res.token);
        const mappedUser: User = {
          username: u.username || cleanUser,
          displayName: u.displayName || u.fullName || cleanName,
          role: u.role === 'admin' ? 'admin' : 'user',
          email: cleanEmail,
          status: 'active',
          targetBand: 'B2',
          dailyGoalMinutes: 45,
          createdAt: u.createdAt || new Date().toISOString(),
        };
        if (autoLogin) {
          setLocalUser(mappedUser);
          localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(mappedUser));
        }
        setIsBackendConnected(true);
        return { success: true };
      }
    } catch (apiErr: any) {
      console.warn('[ApiClient] C# Backend register fallback:', apiErr?.message);
    }

    // 2. Fallback LocalStorage
    try {
      const accounts = getAllAccounts();

      if (accounts.some((acc) => acc.username.toLowerCase() === cleanUser.toLowerCase())) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.' };
      }

      const newAccount: StoredAccount = {
        username: cleanUser,
        password,
        displayName: cleanName,
        email: cleanEmail,
        role: 'user',
        status: 'active',
        targetBand: 'B2',
        dailyGoalMinutes: 45,
        createdAt: new Date().toISOString(),
      };

      saveAccounts([...accounts, newAccount]);

      if (autoLogin) {
        const newUser: User = {
          username: newAccount.username,
          displayName: newAccount.displayName,
          role: newAccount.role,
          email: newAccount.email,
          status: newAccount.status,
          targetBand: newAccount.targetBand,
          dailyGoalMinutes: newAccount.dailyGoalMinutes,
          createdAt: newAccount.createdAt,
        };
        setLocalUser(newUser);
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
      }
      return { success: true };
    } catch {
      return { success: false, message: 'Đã xảy ra lỗi khi đăng ký tài khoản!' };
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    try {
      const updatedUser: User = {
        ...user,
        ...updates,
      };

      // Update in storage current user
      setLocalUser(updatedUser);
      localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(updatedUser));

      // Update in stored accounts
      const accounts = getAllAccounts();
      const idx = accounts.findIndex((a) => a.username.toLowerCase() === user.username.toLowerCase());
      if (idx !== -1) {
        accounts[idx] = { ...accounts[idx], ...updates };
        saveAccounts(accounts);
      }
      return true;
    } catch (err) {
      console.error('Failed to update profile:', err);
      return false;
    }
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    if (!user) return { success: false, message: 'Bạn chưa đăng nhập!' };
    if (!newPass || newPass.length < 3) {
      return { success: false, message: 'Mật khẩu mới phải có ít nhất 3 ký tự!' };
    }

    const accounts = getAllAccounts();
    const idx = accounts.findIndex((a) => a.username.toLowerCase() === user.username.toLowerCase());
    if (idx === -1) {
      return { success: false, message: 'Không tìm thấy tài khoản trong hệ thống!' };
    }

    if (accounts[idx].password !== oldPass) {
      return { success: false, message: 'Mật khẩu hiện tại không chính xác!' };
    }

    accounts[idx].password = newPass;
    saveAccounts(accounts);
    return { success: true, message: 'Đổi mật khẩu thành công!' };
  };

  const adminUpdateAccount = (username: string, updates: Partial<StoredAccount>): boolean => {
    try {
      const accounts = getAllAccounts();
      const idx = accounts.findIndex((a) => a.username.toLowerCase() === username.toLowerCase());
      if (idx === -1) return false;

      accounts[idx] = { ...accounts[idx], ...updates };
      saveAccounts(accounts);

      // If updating currently logged in user, refresh their session
      if (user && user.username.toLowerCase() === username.toLowerCase()) {
        const updatedLocal: User = {
          ...user,
          ...updates,
        };
        setLocalUser(updatedLocal);
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(updatedLocal));
      }
      return true;
    } catch {
      return false;
    }
  };

  const adminDeleteAccount = (username: string): boolean => {
    try {
      const accounts = getAllAccounts();
      const filtered = accounts.filter((a) => a.username.toLowerCase() !== username.toLowerCase());
      saveAccounts(filtered);
      return true;
    } catch {
      return false;
    }
  };

  const adminCreateAccount = (acc: StoredAccount): { success: boolean; message?: string } => {
    try {
      const accounts = getAllAccounts();
      if (accounts.some((a) => a.username.toLowerCase() === acc.username.toLowerCase())) {
        return { success: false, message: 'Tên tài khoản này đã tồn tại!' };
      }
      saveAccounts([...accounts, acc]);
      return { success: true };
    } catch {
      return { success: false, message: 'Lỗi khi tạo tài khoản!' };
    }
  };

  const loginWithKeycloak = () => {
    setAuthError(undefined);
    void oidc.signinRedirect();
  };

  const logout = () => {
    setLocalUser(null);
    localStorage.removeItem(STORAGE_CURRENT_USER);
    localStorage.removeItem('vstep_jwt_token');
    if (oidc.isAuthenticated) {
      void oidc.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
    }
  };

  const isKeycloakCallback = window.location.search.includes('code=');
  const isLoading = isKeycloakCallback && oidc.isLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        isBackendConnected,
        error: authError || oidc.error?.message,
        login,
        register,
        loginWithKeycloak,
        logout,
        updateProfile,
        changePassword,
        getAllAccounts,
        adminUpdateAccount,
        adminDeleteAccount,
        adminCreateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
