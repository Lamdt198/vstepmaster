import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LogIn,
  UserPlus,
  User,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Target,
  FileText,
  BarChart3
} from 'lucide-react';

export default function Login() {
  const { login, register, error } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('student_vstep@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [displayName, setDisplayName] = useState('');
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Onboarding modal state after successful registration
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [newlyRegistered, setNewlyRegistered] = useState<{
    username: string;
    pass: string;
    displayName: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalMessage(null);
    setIsSubmitting(true);

    // If default bullet mask is submitted, use default password
    const actualPass = password === '••••••••••••' ? '123' : password;
    const actualUser = username === 'student_vstep@gmail.com' ? 'user' : username;

    try {
      if (isRegisterMode) {
        // Register without auto-login so we can show the onboarding modal
        const res = await register(
          actualUser,
          actualPass,
          displayName || 'Học viên VSTEP',
          undefined,
          false
        );

        if (!res.success) {
          setLocalMessage(res.message || 'Đăng ký thất bại');
        } else {
          setNewlyRegistered({
            username: actualUser,
            pass: actualPass,
            displayName: displayName || actualUser,
          });
          setShowOnboardingModal(true);
        }
      } else {
        const success = await login(actualUser, actualPass);
        if (!success) {
          setLocalMessage('Đăng nhập thất bại. Kiểm tra lại thông tin (User: user/123, Admin: admin/123, VIP: hocvien/123).');
        } else {
          if (actualUser.toLowerCase() === 'admin') {
            window.location.href = '/admin';
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedAfterRegister = async (destination: '/account' | '/') => {
    if (!newlyRegistered) return;
    setIsSubmitting(true);
    try {
      await login(newlyRegistered.username, newlyRegistered.pass);
      window.location.href = destination;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (role: 'user' | 'admin' | 'hocvien') => {
    setLocalMessage(null);
    setIsSubmitting(true);
    try {
      if (role === 'admin') {
        const ok = await login('admin', '123');
        if (ok) {
          window.location.href = '/admin';
        }
      } else if (role === 'hocvien') {
        await login('hocvien', '123');
      } else {
        await login('user', '123');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F0F4F8] dark:bg-gray-950 px-4 py-12 overflow-hidden">
      {/* Decorative Blur Background Accents */}
      <div className="absolute -top-12 -left-12 w-96 h-96 bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-blue-300/30 dark:bg-blue-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 left-20 w-64 h-64 bg-slate-200/60 dark:bg-slate-800/20 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-24 w-72 h-72 bg-slate-200/60 dark:bg-slate-800/20 rounded-full pointer-events-none" />

      {/* Main Centered Login Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-slate-200/80 dark:border-gray-700 p-8 sm:p-10">
        {/* Brand Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2563EB] text-white shadow-lg mb-4">
            <span className="text-3xl font-black tracking-tight">M</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
            VSTEP Master
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Luyện thi VSTEP B1 - B2 - C1 Chuẩn Bộ GD&ĐT
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-gray-700/60 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(false);
              setLocalMessage(null);
            }}
            className={`flex-1 py-2.5 text-center text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !isRegisterMode
                ? 'bg-white dark:bg-gray-800 text-[#2563EB] dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-gray-400'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setLocalMessage(null);
            }}
            className={`flex-1 py-2.5 text-center text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isRegisterMode
                ? 'bg-white dark:bg-gray-800 text-[#2563EB] dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-gray-400'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Đăng ký tài khoản</span>
          </button>
        </div>

        {/* Alerts */}
        {(error || localMessage) && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-4">
            <p className="text-xs font-semibold text-red-700 dark:text-red-300">
              <span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-red-500 shrink-0" /><span>{localMessage || error}</span></span>
            </p>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Họ và tên học viên
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nguyễn Văn An"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Tên đăng nhập / Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="student_vstep@gmail.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {isRegisterMode ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </form>

        {/* Quick Login Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-gray-700">
          <p className="text-center text-xs text-slate-500 dark:text-gray-400 mb-3 font-medium">
            Đăng nhập nhanh 1 chạm để trải nghiệm:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickLogin('user')}
              className="py-2.5 px-2 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-800 dark:text-gray-200 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              title="Tài khoản học viên tiêu chuẩn (user / 123)"
            >
              <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Học viên (user)</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickLogin('hocvien')}
              className="py-2.5 px-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              title="Tài khoản học viên VIP mới (hocvien / 123)"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>VIP (hocvien)</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickLogin('admin')}
              className="py-2.5 px-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/80 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              title="Tài khoản quản trị viên (admin / 123)"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Admin (admin)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. ONBOARDING WELCOME MODAL: Hướng dẫn chi tiết sau khi đăng ký tài khoản */}
      {showOnboardingModal && newlyRegistered && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2 backdrop-blur-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG</span>
              </div>
              <h2 className="text-xl font-black">
                Chào mừng {newlyRegistered.displayName}!
              </h2>
              <p className="text-xs text-blue-100 mt-1">
                Tài khoản <span className="font-mono font-bold text-white">@{newlyRegistered.username}</span> đã sẵn sàng. Dưới đây là lộ trình 4 bước bạn nên làm ngay:
              </p>
            </div>

            {/* 4 Steps Checklist */}
            <div className="p-6 space-y-3.5 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-start gap-3 shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>Thiết lập Hồ sơ & Chọn Bậc Mục Tiêu (B1/B2/C1)</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                    Cập nhật trường học và chọn chuẩn B1/B2/C1 để AI áp dụng barem chấm tương ứng.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-start gap-3 shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Làm bài Thi thử Khảo sát Đầu vào (180 phút)</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                    Đo lường năng lực xuất phát điểm với bộ đề thi chuẩn định dạng Bộ Giáo dục & Đào tạo.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-start gap-3 shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Luyện 4 Kỹ năng Chuyên sâu kèm AI Chấm Điểm</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                    Luyện riêng Reading, Listening, Writing và Speaking với phản hồi từ vựng và ngữ pháp tức thì.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-start gap-3 shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Theo dõi Tiến độ Cá nhân & Dự thi Chính thức</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                    Tích lũy từ vựng qua Flashcards, theo dõi biểu đồ điểm và tự tin bước vào phòng thi.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleProceedAfterRegister('/')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
              >
                Vào thẳng Trang chủ
              </button>
              <button
                type="button"
                onClick={() => handleProceedAfterRegister('/account')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Thiết lập Hồ sơ & Mục tiêu ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
