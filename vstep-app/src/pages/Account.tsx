import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  School,
  Target,
  Award,
  Calendar,
  Shield,
  Key,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  FileText,
  Check,
  AlertCircle,
  Sparkles,
  BarChart3,
  LogOut,
  Compass,
  ShieldCheck,
  GraduationCap,
  Flame
} from 'lucide-react';

export default function Account() {
  const { user, updateProfile, changePassword, logout } = useAuth();

  // Active Tab: 'profile' | 'roadmap' | 'goals' | 'security' | 'history'
  const [activeTab, setActiveTab] = useState<'roadmap' | 'profile' | 'goals' | 'security' | 'history'>('roadmap');

  // Profile form state
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [school, setSchool] = useState(user?.school || '');
  const [targetBand, setTargetBand] = useState<'B1' | 'B2' | 'C1'>(user?.targetBand || 'B2');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(user?.dailyGoalMinutes || 45);
  const [targetDate, setTargetDate] = useState<string>('2026-10-25');

  // Change Password form state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Onboarding Checklist state persisted in localStorage
  const checklistKey = `vstep_onboarding_${user?.username || 'guest'}`;
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(checklistKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      step1_profile: true,
      step2_mocktest: false,
      step3_practice: false,
      step4_progress: false,
    };
  });

  const toggleChecklistItem = (key: string) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem(checklistKey, JSON.stringify(updated));
  };

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setSchool(user.school || '');
      setTargetBand(user.targetBand || 'B2');
      setDailyGoalMinutes(user.dailyGoalMinutes || 45);
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);
    setIsSaving(true);

    try {
      const ok = await updateProfile({
        displayName,
        email,
        phone,
        school,
        targetBand,
        dailyGoalMinutes,
      });

      if (ok) {
        setSaveSuccess('Cập nhật hồ sơ cá nhân thành công!');
        // Also mark step1 in checklist as completed
        if (!checklist.step1_profile) {
          toggleChecklistItem('step1_profile');
        }
        setTimeout(() => setSaveSuccess(null), 3500);
      } else {
        setSaveError('Có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại!');
      }
    } catch {
      setSaveError('Lỗi kết nối máy chủ!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdSuccess(null);
    setPwdError(null);

    if (newPassword !== confirmPassword) {
      setPwdError('Mật khẩu mới và mật khẩu xác nhận không trùng khớp!');
      return;
    }
    if (newPassword.length < 3) {
      setPwdError('Mật khẩu mới phải có tối thiểu 3 ký tự!');
      return;
    }

    const res = await changePassword(oldPassword, newPassword);
    if (res.success) {
      setPwdSuccess('Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwdSuccess(null), 4000);
    } else {
      setPwdError(res.message || 'Mật khẩu cũ không chính xác!');
    }
  };

  const completedStepsCount = Object.values(checklist).filter(Boolean).length;
  const onboardingProgressPercent = Math.round((completedStepsCount / 4) * 100);

  // Student Examination Identification Code
  const sbdCode = `VSTEP-${(user?.username || 'STD').toUpperCase().slice(0, 8)}-2026`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header Profile Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Identifiers */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-inner">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              {user?.role === 'admin' ? (
                <span className="absolute -bottom-2 -right-2 bg-purple-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> ADMIN
                </span>
              ) : user?.username === 'hocvien' ? (
                <span className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-amber-900" /> VIP
                </span>
              ) : (
                <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> HỌC VIÊN
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">{user?.displayName || 'Học viên VSTEP'}</h1>
                <span className="px-2.5 py-0.5 bg-white/20 rounded-lg text-xs font-semibold backdrop-blur-xs">
                  @{user?.username}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-blue-100 font-medium">
                <span className="flex items-center gap-1 font-mono bg-blue-900/40 px-2 py-0.5 rounded-md border border-blue-400/30">
                  <Award className="w-3.5 h-3.5 text-amber-300" /> SBD: {sbdCode}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-blue-200" /> Mục tiêu: <strong className="text-white font-bold">{targetBand}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-blue-200" /> {user?.school || 'Chưa cập nhật trường'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full md:w-auto justify-between md:justify-start pt-3 md:pt-0 border-t md:border-t-0 border-white/20">
            <div className="text-left md:text-right">
              <span className="text-[11px] text-blue-200 uppercase font-bold tracking-wider block">Tiến độ Onboarding</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-28 bg-white/20 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${onboardingProgressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-black text-emerald-300">{onboardingProgressPercent}%</span>
              </div>
            </div>

            <Link
              to="/mock-test"
              className="px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Vào Thi thử 180p</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex overflow-x-auto pb-1 gap-2 border-b border-gray-200 dark:border-gray-700 scrollbar-none">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-3 text-sm font-bold rounded-t-2xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
            activeTab === 'roadmap'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Lộ trình sau đăng ký</span>
          <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[10px] rounded-full font-extrabold">Mới</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 text-sm font-bold rounded-t-2xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Hồ sơ cá nhân</span>
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-3 text-sm font-bold rounded-t-2xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
            activeTab === 'goals'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Mục tiêu & Kế hoạch</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-3 text-sm font-bold rounded-t-2xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Bảo mật & Mật khẩu</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-3 text-sm font-bold rounded-t-2xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Lịch sử & Kết quả</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: LỘ TRÌNH SAU KHI ĐĂNG KÝ (Trả lời trực tiếp câu hỏi của User) */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Banner Explanation */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-amber-950 dark:text-amber-200">
                  Tài khoản đăng ký xong phải làm như thế nào?
                </h2>
                <p className="text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
                  Chào mừng bạn đến với <strong>VSTEP Master</strong>! Để đạt chứng chỉ VSTEP B1, B2 hoặc C1 chuẩn Bộ Giáo dục & Đào tạo với điểm số cao nhất, bạn hãy thực hiện theo đúng <strong>4 bước chuẩn khảo thí</strong> dưới đây:
                </p>
              </div>
            </div>
          </div>

          {/* 4 Essential Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-black">
                    BƯỚC 1 • KHỞI TẠO
                  </span>
                  <button
                    onClick={() => toggleChecklistItem('step1_profile')}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {checklist.step1_profile ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <span>{checklist.step1_profile ? 'Đã hoàn thành' : 'Đánh dấu xong'}</span>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Thiết lập Hồ sơ & Chọn Bậc Mục Tiêu</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  Cập nhật họ tên thật, trường/đơn vị đang học tập và chọn bậc chứng chỉ mục tiêu (<strong>B1</strong> tốt nghiệp ĐH, <strong>B2</strong> thạc sĩ/giáo viên, hoặc <strong>C1</strong> cao học) để hệ thống cá nhân hóa barem chấm AI.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-400">Thời gian: ~2 phút</span>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-3.5 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Chỉnh sửa hồ sơ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-black">
                    BƯỚC 2 • ĐO LƯỜNG ĐẦU VÀO
                  </span>
                  <button
                    onClick={() => toggleChecklistItem('step2_mocktest')}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {checklist.step2_mocktest ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <span>{checklist.step2_mocktest ? 'Đã hoàn thành' : 'Đánh dấu xong'}</span>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Thi thử Khảo sát Năng lực (Full Test 180p)</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  Làm 1 bài thi thử tổng hợp 4 kỹ năng chuẩn định dạng Bộ GD&ĐT. Hệ thống sẽ bấm giờ nghiêm ngặt, chấm trắc nghiệm tự động và phản hồi điểm để xác định bạn đang ở mức B1, B2 hay C1.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-400">10 bộ đề thi chuẩn nguồn Bộ</span>
                <Link
                  to="/mock-test"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Vào thi thử ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-black">
                    BƯỚC 3 • LUYỆN TẬP CHUYÊN SÂU
                  </span>
                  <button
                    onClick={() => toggleChecklistItem('step3_practice')}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    {checklist.step3_practice ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <span>{checklist.step3_practice ? 'Đã hoàn thành' : 'Đánh dấu xong'}</span>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Rèn Kỹ Năng Yếu & Nhờ AI Chấm Tức Thì</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  Luyện riêng từng kỹ năng: Đọc hiểu 4 bài (40 câu), Nghe hiểu 3 phần (35 câu), Viết luận Task 1-2 và Nói Part 1-3. Động cơ AI sẽ chỉ ra lỗi ngữ pháp, từ vựng và gợi ý nâng band điểm.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex gap-1.5">
                  <Link to="/reading" className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-100" title="Reading"><BookOpen className="w-3.5 h-3.5" /></Link>
                  <Link to="/listening" className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg hover:bg-indigo-100" title="Listening"><Headphones className="w-3.5 h-3.5" /></Link>
                  <Link to="/writing" className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-lg hover:bg-purple-100" title="Writing"><PenTool className="w-3.5 h-3.5" /></Link>
                  <Link to="/speaking" className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-lg hover:bg-rose-100" title="Speaking"><Mic className="w-3.5 h-3.5" /></Link>
                </div>
                <Link
                  to="/reading"
                  className="px-3.5 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Chọn kỹ năng luyện</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-black">
                    BƯỚC 4 • THEO DÕI TIẾN ĐỘ & ĐI THI
                  </span>
                  <button
                    onClick={() => toggleChecklistItem('step4_progress')}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    {checklist.step4_progress ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <span>{checklist.step4_progress ? 'Đã hoàn thành' : 'Đánh dấu xong'}</span>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  <span>Theo dõi Biểu đồ & Tích lũy Từ vựng CEFR</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  Kiểm tra chuỗi học liên tục (streak), ôn flashcard các từ vựng hay gặp trong đề thi VSTEP và xem dự báo xác suất đỗ B1/B2/C1 trước khi đăng ký thi chính thức tại trường.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-400">Flashcards & Quiz</span>
                <Link
                  to="/progress"
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Xem Bảng tiến độ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HỒ SƠ CÁ NHÂN */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Left Form: Edit Info */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Thông tin tài khoản thí sinh</h2>
                <p className="text-xs text-gray-500">Cập nhật thông tin để in phiếu kết quả và cá nhân hóa lộ trình</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold rounded-full">
                {user?.role === 'admin' ? 'Quản trị viên' : 'Học viên chính thức'}
              </span>
            </div>

            {saveSuccess && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{saveSuccess}</span>
              </div>
            )}

            {saveError && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-2.5 text-rose-800 dark:text-rose-200 text-xs font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{saveError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Tên đăng nhập (Username)
                  </label>
                  <input
                    type="text"
                    value={user?.username || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm font-mono cursor-not-allowed"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Tên đăng nhập cố định không thể thay đổi</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Họ và tên thí sinh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    placeholder="VD: Nguyễn Văn An"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Địa chỉ Email liên hệ
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hocvien@vstepmaster.edu.vn"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Trường Đại học / Đơn vị công tác
                </label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="VD: ĐH Quốc Gia Hà Nội / ĐH Sư Phạm / ĐH Bách Khoa"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Lưu thay đổi hồ sơ</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Preview Card: Thẻ Thí sinh mô phỏng */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center font-black text-xs">V</div>
                  <span className="text-xs font-black tracking-wider uppercase text-blue-200">VSTEP EXAM PASS</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {targetBand} LEVEL
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black text-white">
                  {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight text-white">{displayName || 'Học viên'}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{school || 'Học viên Tự do'}</p>
                  <p className="text-[11px] font-mono text-amber-400 mt-1">{sbdCode}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Kỳ thi</span>
                  <span className="font-semibold text-slate-200">VSTEP 3-5 (B1-B2-C1)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Thời lượng</span>
                  <span className="font-semibold text-slate-200">180 phút (4 Kỹ năng)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Hạn mục tiêu</span>
                  <span className="font-semibold text-slate-200">{targetDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Trạng thái</span>
                  <span className="font-semibold text-emerald-400">● Đang hoạt động</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-5 bg-blue-50/70 dark:bg-blue-950/20 rounded-2xl border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Mẹo chuẩn bị kỳ thi VSTEP:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                <li>Luyện thi đầy đủ 4 kỹ năng không học tủ, học lệch.</li>
                <li>Nghe và Đọc trắc nghiệm chiếm 50% tổng điểm.</li>
                <li>Phần Viết Task 2 (luận) nhân đôi hệ số điểm so với Task 1.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MỤC TIÊU & KẾ HOẠCH */}
      {activeTab === 'goals' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Thiết lập Mục tiêu & Kế hoạch Học tập</h2>
            <p className="text-xs text-gray-500">Hệ thống sẽ dựa vào mục tiêu này để gợi ý đề thi và chấm điểm AI phù hợp</p>
          </div>

          {/* 1. Target Band Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Chọn Bậc Chứng chỉ VSTEP Mục tiêu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* B1 */}
              <button
                type="button"
                onClick={() => setTargetBand('B1')}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  targetBand === 'B1'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-600/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                {targetBand === 'B1' && (
                  <span className="absolute top-4 right-4 text-blue-600"><CheckCircle2 className="w-5 h-5" /></span>
                )}
                <span className="text-2xl font-black text-blue-600 block">B1 VSTEP</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white mt-1 block">Bậc 3 / 6 (CEFR B1)</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Điểm quy đổi: 4.0 - 5.5. Dành cho chuẩn đầu ra Cử nhân Đại học và Cao đẳng.
                </p>
              </button>

              {/* B2 */}
              <button
                type="button"
                onClick={() => setTargetBand('B2')}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  targetBand === 'B2'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md ring-2 ring-indigo-600/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                {targetBand === 'B2' && (
                  <span className="absolute top-4 right-4 text-indigo-600"><CheckCircle2 className="w-5 h-5" /></span>
                )}
                <span className="text-2xl font-black text-indigo-600 block">B2 VSTEP</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white mt-1 block">Bậc 4 / 6 (CEFR B2)</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Điểm quy đổi: 6.0 - 8.0. Dành cho đầu vào/ra Thạc sĩ, Giáo viên tiếng Anh cấp 1 & 2.
                </p>
              </button>

              {/* C1 */}
              <button
                type="button"
                onClick={() => setTargetBand('C1')}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  targetBand === 'C1'
                    ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 shadow-md ring-2 ring-purple-600/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                {targetBand === 'C1' && (
                  <span className="absolute top-4 right-4 text-purple-600"><CheckCircle2 className="w-5 h-5" /></span>
                )}
                <span className="text-2xl font-black text-purple-600 block">C1 VSTEP</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white mt-1 block">Bậc 5 / 6 (CEFR C1)</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Điểm quy đổi: 8.5 - 10.0. Dành cho Nghiên cứu sinh Tiến sĩ, Giảng viên Đại học.
                </p>
              </button>
            </div>
          </div>

          {/* 2. Daily Goal Time & Target Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Thời gian ôn luyện mỗi ngày
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyGoalMinutes(mins)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      dailyGoalMinutes === mins
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {mins} phút
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Duy trì tối thiểu 30-45 phút mỗi ngày để tạo phản xạ ngôn ngữ</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Dự kiến ngày thi chính thức
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Hệ thống sẽ đếm ngược ngày thi và sắp xếp lịch làm đề thử</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Cập nhật Mục tiêu</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: BẢO MẬT & MẬT KHẨU */}
      {activeTab === 'security' && (
        <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Đổi mật khẩu & Bảo mật</h2>
            <p className="text-xs text-gray-500">Bảo vệ tài khoản học tập và lưu trữ an toàn kết quả thi</p>
          </div>

          {pwdSuccess && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{pwdSuccess}</span>
            </div>
          )}

          {pwdError && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-2.5 text-rose-800 dark:text-rose-200 text-xs font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{pwdError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Mật khẩu hiện tại <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại (mặc định: 123)"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Mật khẩu mới <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 3 ký tự"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Xác nhận mật khẩu mới <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Cập nhật Mật khẩu</span>
              </button>
            </div>
          </form>

          {/* Log Out Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Đăng xuất khỏi thiết bị này</p>
              <p className="text-xs text-gray-400">Kết thúc phiên làm việc hiện tại trên trình duyệt</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: LỊCH SỬ & KẾT QUẢ */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs">
              <span className="text-xs font-bold text-gray-400 uppercase">Bài thi thử hoàn thành</span>
              <p className="text-2xl font-black text-blue-600 mt-1">4 bài</p>
              <span className="text-[11px] text-emerald-600 font-semibold">+1 bài trong tuần này</span>
            </div>
            <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs">
              <span className="text-xs font-bold text-gray-400 uppercase">Điểm ước lượng hiện tại</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">6.5 / 10</p>
              <span className="text-[11px] text-blue-600 font-semibold">Tương đương B2 VSTEP</span>
            </div>
            <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs">
              <span className="text-xs font-bold text-gray-400 uppercase">Chuỗi ngày học liên tục</span>
              <p className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
                <Flame className="w-6 h-6 fill-amber-500" /> 7 ngày
              </p>
              <span className="text-[11px] text-gray-400">Giữ vững phong độ!</span>
            </div>
            <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs">
              <span className="text-xs font-bold text-gray-400 uppercase">Kỹ năng mạnh nhất</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Reading</p>
              <span className="text-[11px] text-gray-400">Đạt 8.0/10 ở đề gần nhất</span>
            </div>
          </div>

          {/* Sample History Table */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Nhật ký luyện thi & Thi thử gần đây</h3>
              <Link to="/progress" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>Xem phân tích chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 uppercase font-bold text-[11px] border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-4">Tên bài thi / Kỹ năng</th>
                    <th className="p-4">Ngày làm</th>
                    <th className="p-4">Thời gian</th>
                    <th className="p-4">Điểm số</th>
                    <th className="p-4">Quy đổi Bậc</th>
                    <th className="p-4 text-right">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Đề thi Chuẩn VSTEP 4 Kỹ năng (Bộ GD&ĐT 01)</span>
                    </td>
                    <td className="p-4 text-gray-500">10/09/2026</td>
                    <td className="p-4 text-gray-500">178 phút</td>
                    <td className="p-4 font-extrabold text-indigo-600">6.8 / 10</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[11px]">
                        B2
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link to="/mock-test" className="text-blue-600 hover:underline font-bold">Xem lại</Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Reading Passage: The Evolution of Higher Education</span>
                    </td>
                    <td className="p-4 text-gray-500">08/09/2026</td>
                    <td className="p-4 text-gray-500">14 phút</td>
                    <td className="p-4 font-extrabold text-emerald-600">9/10 câu</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[11px]">
                        C1
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link to="/reading" className="text-blue-600 hover:underline font-bold">Làm tiếp</Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-purple-600" />
                      <span>Writing Task 2: Artificial Intelligence in Healthcare</span>
                    </td>
                    <td className="p-4 text-gray-500">06/09/2026</td>
                    <td className="p-4 text-gray-500">38 phút</td>
                    <td className="p-4 font-extrabold text-blue-600">6.5 / 10 (AI chấm)</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                        B2
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link to="/writing" className="text-blue-600 hover:underline font-bold">Xem bài sửa</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
