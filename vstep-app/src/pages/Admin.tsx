import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useFeatureFlags } from '../context/FeatureFlagContext';
import {
  Database,
  FileCheck,
  Users,
  Bot,
  ShieldAlert,
  BarChart3,
  Sliders,
  Sun,
  Moon,
  LogOut,
  GraduationCap,
  Plus,
  CheckCircle2,
  X,
  Trash2,
  Check,
  Search,
  Eye,
  Edit,
  Lock,
  Clock,
  UploadCloud,
  PenTool,
  ShieldCheck,
  RotateCcw,
  Save,
  Activity,
  Unlock,
  Key,
  Sparkles,
  Cpu,
  Download,
  Award,
  BookOpen,
  Headphones,
  Mic,
  ChevronRight,
  FileText
} from 'lucide-react';
import { getStoredApiKey, setApiKey, testGeminiApiKey } from '../services/aiScoring';

interface SecurityLogEntry {
  id: string;
  timestamp: string;
  type: 'SECURITY' | 'API_RATE' | 'AUDIT' | 'AUTH';
  message: string;
}

interface ExamItem {
  id: string;
  title: string;
  skill: string;
  source: string;
  status: 'approved' | 'pending';
  questionCount: number;
  confidence?: number;
  createdAt: string;
}

const INITIAL_EXAMS: ExamItem[] = [
  { id: 'DT-VSTEP-2026-01', title: 'Đề thi Chuẩn VSTEP 4 Kỹ năng (Bộ GD&ĐT)', skill: 'Full 4 Kỹ năng', source: 'Biên soạn nội bộ', status: 'approved', questionCount: 77, createdAt: '2026-08-15' },
  { id: 'PARSE-DOCX-09', title: 'Đề Luyện Đọc Chuyên sâu B2-C1 ĐH Ngoại Ngữ', skill: 'Reading (40 câu)', source: 'Tệp Word (.docx) [98%]', status: 'pending', questionCount: 40, confidence: 98, createdAt: '2026-09-09' },
  { id: 'PARSE-PDF-14', title: 'Bộ đề Luyện Nghe VSTEP Master Test 03', skill: 'Listening (35 câu)', source: 'Tệp PDF (.pdf) [95%]', status: 'pending', questionCount: 35, confidence: 95, createdAt: '2026-09-08' },
  { id: 'DT-WRITING-T2', title: 'Ngân hàng 50 Đề Viết luận Học thuật Task 2', skill: 'Writing (Task 1 + 2)', source: 'Hội đồng chuyên môn', status: 'approved', questionCount: 50, createdAt: '2026-08-20' },
  { id: 'PARSE-DOCX-12', title: 'Đề thi Thử VSTEP Tổng hợp Tháng 09/2026', skill: 'Full Test (4 kỹ năng)', source: 'Tệp Word (.docx) [99%]', status: 'pending', questionCount: 77, confidence: 99, createdAt: '2026-09-10' },
  { id: 'DT-SPEAKING-P1', title: 'Ngân hàng 60 Chủ đề Nói Tương tác Part 1-3', skill: 'Speaking (Part 1-3)', source: 'Giảng viên bản ngữ', status: 'approved', questionCount: 60, createdAt: '2026-08-22' },
];

export default function Admin() {
  const {
    user,
    logout,
    isBackendConnected,
    getAllAccounts,
    adminUpdateAccount,
    adminDeleteAccount,
    adminCreateAccount,
  } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { flags, updateFlag, resetDefaults } = useFeatureFlags();

  // Active Menu: 'dashboard' | 'bank' | 'pending' | 'users' | 'ai' | 'reports' | 'settings'
  const [sidebarActiveItem, setSidebarActiveItem] = useState<string>('bank');

  const [exams, setExams] = useState<ExamItem[]>(INITIAL_EXAMS);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modals (Only for inspection and quick creation, NO POPUPS for menu items!)
  const [inspectExam, setInspectExam] = useState<ExamItem | null>(null);
  const [showAddExamModal, setShowAddExamModal] = useState(false);

  // ==========================================
  // 1. USER MANAGEMENT STATE (PAGE VIEW)
  // ==========================================
  const [adminAccounts, setAdminAccounts] = useState<any[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'admin' | 'user' | 'locked'>('all');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    displayName: '',
    password: '123',
    role: 'user' as 'admin' | 'user',
    email: '',
    school: '',
  });

  const loadAccounts = () => {
    if (getAllAccounts) {
      setAdminAccounts(getAllAccounts());
    }
  };

  useEffect(() => {
    loadAccounts();
  }, [sidebarActiveItem]);

  const handleToggleLock = (username: string, currentStatus?: string) => {
    const nextStatus = currentStatus === 'locked' ? 'active' : 'locked';
    adminUpdateAccount(username, { status: nextStatus });
    loadAccounts();
    setSuccessMessage(`Đã ${nextStatus === 'locked' ? 'khóa' : 'mở khóa'} tài khoản @${username} thành công!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleToggleRole = (username: string, currentRole: 'admin' | 'user') => {
    if (username.toLowerCase() === 'admin') {
      alert('Không thể hạ quyền tài khoản SuperAdmin mặc định!');
      return;
    }
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    adminUpdateAccount(username, { role: nextRole });
    loadAccounts();
    setSuccessMessage(`Đã chuyển vai trò tài khoản @${username} thành ${nextRole === 'admin' ? 'Quản trị viên' : 'Học viên'}!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleResetPassword = (username: string) => {
    adminUpdateAccount(username, { password: '123' });
    loadAccounts();
    setSuccessMessage(`Đã đặt lại mật khẩu của @${username} về mặc định: 123!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDeleteUser = (username: string) => {
    if (username.toLowerCase() === 'admin') {
      alert('Không thể xóa tài khoản SuperAdmin mặc định!');
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản @${username}?`)) {
      adminDeleteAccount(username);
      loadAccounts();
      setSuccessMessage(`Đã xóa tài khoản @${username} khỏi hệ thống!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.username.trim()) return;
    const res = adminCreateAccount({
      username: newUserData.username.trim(),
      displayName: newUserData.displayName.trim() || newUserData.username.trim(),
      password: newUserData.password || '123',
      role: newUserData.role,
      email: newUserData.email.trim() || `${newUserData.username.trim()}@vstepmaster.edu.vn`,
      school: newUserData.school.trim() || 'ĐH Quốc Gia Hà Nội',
      status: 'active',
      targetBand: 'B2',
      dailyGoalMinutes: 45,
      createdAt: new Date().toISOString(),
    });

    if (res.success) {
      loadAccounts();
      setShowAddUserForm(false);
      setNewUserData({
        username: '',
        displayName: '',
        password: '123',
        role: 'user',
        email: '',
        school: '',
      });
      setSuccessMessage(`Tạo tài khoản @${newUserData.username} thành công!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      alert(res.message || 'Lỗi khi tạo tài khoản');
    }
  };

  // ==========================================
  // 2. EXTENSIVE AI ENGINE OPTIONS STATE
  // ==========================================
  const [aiModel, setAiModel] = useState('gemini-1.5-pro');
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [rubricStandard, setRubricStandard] = useState<'moet_729' | 'cefr_standard' | 'strict_examiner'>('moet_729');
  const [customApiKey, setCustomApiKey] = useState(() => getStoredApiKey());
  const [showApiKey, setShowApiKey] = useState(false);

  // Advanced AI Option Toggles
  const [enableGrammarFix, setEnableGrammarFix] = useState(true);
  const [enableVocabBooster, setEnableVocabBooster] = useState(true);
  const [enablePronunciationEval, setEnablePronunciationEval] = useState(true);
  const [enableWpmAnalysis, setEnableWpmAnalysis] = useState(true);
  const [enableAntiHallucination, setEnableAntiHallucination] = useState(true);
  const [enableAnonymousGrading, setEnableAnonymousGrading] = useState(true);

  // Rubric weights for Writing
  const writingWeights = {
    taskFulfillment: 25,
    coherence: 25,
    lexicalResource: 25,
    grammarAccuracy: 25,
  };

  // Prompt Templates
  const [writingPromptTemplate, setWritingPromptTemplate] = useState(
    'You are a certified senior VSTEP examiner evaluating according to MOET Decision 729/QD-BGDDT. Score on a 10.0 scale and provide specific linguistic feedback on Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.'
  );
  const [speakingPromptTemplate, setSpeakingPromptTemplate] = useState(
    'Evaluate VSTEP Speaking recording for Part 1-3. Analyze Fluency & Coherence, Pronunciation & Stress, Lexical Variety, and Grammatical Precision. Compute speaking speed (WPM) and flag mispronounced phonemes with C1 lexical suggestions.'
  );

  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState<string | null>(null);

  const handleTestApi = async () => {
    setIsTestingApi(true);
    setApiStatusMessage(null);
    try {
      const res = await testGeminiApiKey(customApiKey);
      setApiStatusMessage(res.message);
    } catch (err: any) {
      setApiStatusMessage(`Lỗi kết nối: ${err?.message || 'Không thể ping máy chủ'}`);
    } finally {
      setIsTestingApi(false);
      setTimeout(() => setApiStatusMessage(null), 8000);
    }
  };

  const handleSaveAiConfig = () => {
    if (customApiKey) {
      setApiKey(customApiKey);
    }
    setSuccessMessage('Đã lưu API Key và toàn bộ cấu hình AI Engine thành công cho toàn bộ hệ thống!');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // ==========================================
  // 3. SECURITY & AUDIT LOGS STATE
  // ==========================================
  const [dynamicLogs, setDynamicLogs] = useState<SecurityLogEntry[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vstep_security_logs');
      if (saved) {
        setDynamicLogs(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleClearLogs = () => {
    localStorage.removeItem('vstep_security_logs');
    setDynamicLogs([]);
    setSuccessMessage('Đã dọn dẹp toàn bộ nhật ký vi phạm an ninh!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // ==========================================
  // 4. EXAM BANK HANDLERS
  // ==========================================
  const pendingCount = exams.filter((e) => e.status === 'pending').length;
  const approvedCount = exams.filter((e) => e.status === 'approved').length;

  const filteredExams = exams.filter((e) => {
    if (sidebarActiveItem === 'pending') return e.status === 'pending';
    if (filterStatus === 'pending') return e.status === 'pending';
    if (filterStatus === 'approved') return e.status === 'approved';
    return true;
  });

  const handleApprove = (id: string) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'approved' } : e))
    );
    setSuccessMessage(`Đã phê duyệt đề thi ${id} vào Ngân hàng Đề chính thức!`);
    if (inspectExam?.id === id) setInspectExam(null);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleReject = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    setSuccessMessage(`Đã từ chối và xóa đề thi ${id}.`);
    if (inspectExam?.id === id) setInspectExam(null);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors">
      {/* 1. SIDEBAR (Unified with student portal design, adapts to Light/Dark Mode) */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex flex-col justify-between shrink-0 shadow-sm border-r border-gray-200 dark:border-gray-700 z-40 transition-colors">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {/* Brand Header */}
          <div className="p-5 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-md">
              M
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white text-base leading-tight tracking-tight">
                VSTEP Master
              </div>
              <div className="inline-flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Quản trị viên SuperAdmin
                </span>
              </div>
            </div>
          </div>

          {/* Nav Menu */}
          <div className="px-3 py-4">
            <div className="px-3 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              ĐIỀU HÀNH HỆ THỐNG
            </div>

            <nav className="space-y-1">
              {/* 1. Ngân hàng Đề thi */}
              <button
                onClick={() => {
                  setSidebarActiveItem('bank');
                  setFilterStatus('all');
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sidebarActiveItem === 'bank' || sidebarActiveItem === 'dashboard'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4" />
                  <span>Ngân hàng Đề thi</span>
                </div>
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-[11px] px-2 py-0.5 rounded-full font-bold">
                  128
                </span>
              </button>

              {/* 2. Duyệt Đề bóc tách */}
              <button
                onClick={() => {
                  setSidebarActiveItem('pending');
                  setFilterStatus('pending');
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sidebarActiveItem === 'pending'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-4 h-4" />
                  <span>Duyệt Đề bóc tách</span>
                </div>
                <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {pendingCount} mới
                </span>
              </button>

              {/* 3. Quản lý Học viên (PAGE VIEW - NO POPUP) */}
              <button
                onClick={() => setSidebarActiveItem('users')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sidebarActiveItem === 'users'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Quản lý Học viên</span>
                </div>
                <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-[11px] px-2 py-0.5 rounded-full font-bold">
                  {adminAccounts.length || 5}
                </span>
              </button>

              {/* 4. Cấu hình AI & Rubric (PAGE VIEW) */}
              <button
                onClick={() => setSidebarActiveItem('ai')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sidebarActiveItem === 'ai'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4" />
                  <span>Cấu hình AI & Rubric</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>

              {/* 5. Báo cáo & Phổ điểm (PAGE VIEW) */}
              <button
                onClick={() => setSidebarActiveItem('reports')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sidebarActiveItem === 'reports'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4" />
                  <span>Báo cáo & Phổ điểm</span>
                </div>
              </button>

              {/* 6. Cài đặt & Hệ thống (UNIFIED SETTINGS - Gộp các chức năng nhỏ) */}
              <button
                onClick={() => setSidebarActiveItem('settings')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sidebarActiveItem === 'settings'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4" />
                  <span>Cài đặt & Hệ thống</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer / User Profile & Controls */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-gray-50/50 dark:bg-gray-800/50">
          {/* System Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>Hệ thống: {isBackendConnected ? 'Trực tuyến' : 'Ngoại tuyến'}</span>
          </div>

          {/* Admin Profile Card */}
          <div className="p-2.5 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                {user?.displayName || 'Admin SuperAdmin'}
              </div>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SuperAdmin
              </div>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors cursor-pointer"
            title="Chuyển đổi giao diện Sáng / Tối"
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-blue-500" />
              )}
              <span>{theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase">
              {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
          </button>

          {/* Return to Student Portal Link */}
          <Link
            to="/"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Về Cổng học viên</span>
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="pl-64 min-w-0 flex flex-col pb-16">
        <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <span>Quản trị viên</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 dark:text-blue-400">
                  {sidebarActiveItem === 'bank' && 'Ngân hàng Đề thi VSTEP'}
                  {sidebarActiveItem === 'pending' && 'Duyệt Đề bóc tách Word/PDF'}
                  {sidebarActiveItem === 'users' && 'Quản lý Học viên & Phân quyền RBAC'}
                  {sidebarActiveItem === 'ai' && 'Cấu hình AI Engine & Tiêu chuẩn Chấm Barem'}
                  {sidebarActiveItem === 'reports' && 'Báo cáo Thống kê & Phổ điểm'}
                  {sidebarActiveItem === 'settings' && 'Cài đặt Phân hệ & Hệ thống'}
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                {sidebarActiveItem === 'bank' && <Database className="w-7 h-7 text-blue-600" />}
                {sidebarActiveItem === 'pending' && <FileCheck className="w-7 h-7 text-rose-600" />}
                {sidebarActiveItem === 'users' && <Users className="w-7 h-7 text-blue-600" />}
                {sidebarActiveItem === 'ai' && <Bot className="w-7 h-7 text-purple-600" />}
                {sidebarActiveItem === 'reports' && <BarChart3 className="w-7 h-7 text-indigo-600" />}
                {sidebarActiveItem === 'settings' && <Sliders className="w-7 h-7 text-emerald-600" />}

                <span>
                  {sidebarActiveItem === 'bank' && 'Ngân hàng Đề thi & Khảo thí VSTEP'}
                  {sidebarActiveItem === 'pending' && 'Kiểm duyệt & Đối soát Đề bóc tách'}
                  {sidebarActiveItem === 'users' && 'Quản lý Thí sinh & Phân quyền Học viên'}
                  {sidebarActiveItem === 'ai' && 'Trung tâm Cấu hình AI Engine & Rubric Chấm điểm'}
                  {sidebarActiveItem === 'reports' && 'Báo cáo Khảo thí & Phổ điểm Thí sinh'}
                  {sidebarActiveItem === 'settings' && 'Cài đặt Phân hệ & Vận hành Hệ thống'}
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AI Engine: Sẵn sàng ({aiModel})</span>
              </div>

              {(sidebarActiveItem === 'bank' || sidebarActiveItem === 'pending') && (
                <button
                  onClick={() => setShowAddExamModal(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Đề thi Mới</span>
                </button>
              )}

              {sidebarActiveItem === 'users' && (
                <button
                  onClick={() => setShowAddUserForm(!showAddUserForm)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddUserForm ? 'Đóng form' : 'Thêm tài khoản mới'}</span>
                </button>
              )}

              {sidebarActiveItem === 'ai' && (
                <button
                  onClick={handleSaveAiConfig}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Cấu hình AI</span>
                </button>
              )}
            </div>
          </div>

          {/* Success / Alert Banner */}
          {successMessage && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
              <button
                onClick={() => setSuccessMessage(null)}
                className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
                title="Đóng thông báo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 1: NGÂN HÀNG ĐỀ THI & DUYỆT ĐỀ (sidebarActiveItem === 'bank' | 'pending') */}
          {/* ========================================================================= */}
          {(sidebarActiveItem === 'bank' || sidebarActiveItem === 'pending') && (
            <div className="space-y-6 animate-fadeIn">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setSidebarActiveItem('users')}
                  className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs transition-all hover:shadow-sm cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      TỔNG SỐ HỌC VIÊN
                    </p>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2">
                    {adminAccounts.length ? `${adminAccounts.length} TK` : '12,450'}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-2 flex items-center gap-1">
                    <span>Xem danh sách học viên &rarr;</span>
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs transition-all hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ĐỀ THI HOẠT ĐỘNG
                    </p>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Database className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                    128 bộ đề
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Đầy đủ 4 kỹ năng Bộ GD&ĐT
                  </p>
                </div>

                <div
                  onClick={() => {
                    setSidebarActiveItem('pending');
                    setFilterStatus('pending');
                  }}
                  className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs transition-all hover:shadow-sm cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ĐỀ BÓC TÁCH CHỜ DUYỆT
                    </p>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">
                    {pendingCount.toString().padStart(2, '0')} bộ đề
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-2">
                    Kiểm duyệt & đối soát đáp án &rarr;
                  </p>
                </div>

                <div
                  onClick={() => setSidebarActiveItem('ai')}
                  className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs transition-all hover:shadow-sm cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      LƯỢT CHẤM AI HÔM NAY
                    </p>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                      <Bot className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 mt-2">
                    1,842 lượt
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-2">
                    Cấu hình mô hình AI & Barem &rarr;
                  </p>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <span>DANH SÁCH BỘ ĐỀ THI & ĐỀ BÓC TÁCH MỚI NHẤT</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold">
                        {filteredExams.length}
                      </span>
                    </h3>
                  </div>

                  <div className="flex bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        filterStatus === 'all'
                          ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                      }`}
                    >
                      Tất cả ({exams.length})
                    </button>
                    <button
                      onClick={() => setFilterStatus('pending')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        filterStatus === 'pending'
                          ? 'bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 shadow-2xs'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                      }`}
                    >
                      Chờ duyệt ({pendingCount})
                    </button>
                    <button
                      onClick={() => setFilterStatus('approved')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        filterStatus === 'approved'
                          ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                      }`}
                    >
                      Đã duyệt ({approvedCount})
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50/75 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Mã Đề</th>
                        <th className="py-3 px-4">Tên Bộ Đề Thi</th>
                        <th className="py-3 px-4">Kỹ Năng & Câu Hỏi</th>
                        <th className="py-3 px-4">Nguồn Bóc Tách</th>
                        <th className="py-3 px-4 text-center">Trạng Thái</th>
                        <th className="py-3 px-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {filteredExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-blue-50/30 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-gray-900 dark:text-white">
                            {exam.id}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                            {exam.title}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-blue-600 dark:text-blue-400">{exam.skill}</span>
                            <span className="text-gray-400 block text-[10px]">({exam.questionCount} câu)</span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400">
                            {exam.source}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {exam.status === 'pending' ? (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 rounded-full font-bold text-[10px]">
                                Chờ Thẩm Định
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-full font-bold text-[10px]">
                                Đã Hoạt Động
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {exam.status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => setInspectExam(exam)}
                                    title="Đối soát chi tiết nội dung đề thi"
                                    className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center shadow-2xs transition-all cursor-pointer active:scale-95"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleApprove(exam.id)}
                                    title="Phê duyệt đề thi"
                                    className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shadow-2xs transition-all cursor-pointer active:scale-95"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleReject(exam.id)}
                                    title="Từ chối đề thi"
                                    className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center justify-center shadow-2xs transition-all cursor-pointer active:scale-95"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => setInspectExam(exam)}
                                    title="Xem chi tiết"
                                    className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
                                  >
                                    <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSuccessMessage(`Mở trình biên tập nội dung đề: ${exam.id}`);
                                      setTimeout(() => setSuccessMessage(null), 3000);
                                    }}
                                    title="Biên tập đề thi"
                                    className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 text-blue-600 hover:bg-blue-50 border border-blue-200 dark:border-blue-800 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSuccessMessage(`Đã khóa tạm thời đề thi: ${exam.id}`);
                                      setTimeout(() => setSuccessMessage(null), 3000);
                                    }}
                                    title="Khóa đề thi"
                                    className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 text-amber-600 hover:bg-amber-50 border border-amber-200 dark:border-amber-800 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
                                  >
                                    <Lock className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: QUẢN LÝ HỌC VIÊN & PHÂN QUYỀN RBAC (FULL PAGE - NO POPUP!) */}
          {/* ========================================================================= */}
          {sidebarActiveItem === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Tổng tài khoản</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 block">
                    {adminAccounts.length}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">+100% dữ liệu Local & Backend</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Học viên (Students)</span>
                  <span className="text-2xl font-black text-blue-600 mt-1 block">
                    {adminAccounts.filter((a) => a.role === 'user').length}
                  </span>
                  <span className="text-[10px] text-gray-400">ROLE_STUDENT</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Quản trị viên (Admins)</span>
                  <span className="text-2xl font-black text-purple-600 mt-1 block">
                    {adminAccounts.filter((a) => a.role === 'admin').length}
                  </span>
                  <span className="text-[10px] text-purple-600 font-semibold">ROLE_ADMIN Super</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Khóa An Ninh</span>
                  <span className="text-2xl font-black text-rose-600 mt-1 block">
                    {adminAccounts.filter((a) => a.status === 'locked').length}
                  </span>
                  <span className="text-[10px] text-rose-600 font-semibold">Vi phạm quy chế</span>
                </div>
              </div>

              {/* Filter & Toolbar */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder="Tìm theo tên, username, email, trường..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setUserRoleFilter('all')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        userRoleFilter === 'all'
                          ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-xs font-bold'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-300'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setUserRoleFilter('user')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        userRoleFilter === 'user'
                          ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-xs font-bold'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-300'
                      }`}
                    >
                      Học viên
                    </button>
                    <button
                      onClick={() => setUserRoleFilter('admin')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        userRoleFilter === 'admin'
                          ? 'bg-white dark:bg-gray-800 text-purple-600 shadow-xs font-bold'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-300'
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => setUserRoleFilter('locked')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        userRoleFilter === 'locked'
                          ? 'bg-white dark:bg-gray-800 text-rose-600 shadow-xs font-bold'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-300'
                      }`}
                    >
                      Bị khóa
                    </button>
                  </div>

                  <button
                    onClick={() => setShowAddUserForm(!showAddUserForm)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddUserForm ? 'Đóng form' : 'Thêm tài khoản'}</span>
                  </button>
                </div>
              </div>

              {/* Add User Form */}
              {showAddUserForm && (
                <form onSubmit={handleCreateUser} className="p-6 bg-blue-50/70 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-900/50 space-y-4 shadow-sm animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-600" />
                      <span>Thêm Tài Khoản Học Viên / Quản Trị Viên Mới</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowAddUserForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Username *</label>
                      <input
                        type="text"
                        required
                        value={newUserData.username}
                        onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                        placeholder="VD: hv_nguyen2026"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Họ tên *</label>
                      <input
                        type="text"
                        required
                        value={newUserData.displayName}
                        onChange={(e) => setNewUserData({ ...newUserData, displayName: e.target.value })}
                        placeholder="VD: Trần Văn Bình"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Mật khẩu khởi tạo</label>
                      <input
                        type="text"
                        value={newUserData.password}
                        onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                        placeholder="binh.tran@vstep.edu.vn"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Trường học / Đơn vị</label>
                      <input
                        type="text"
                        value={newUserData.school}
                        onChange={(e) => setNewUserData({ ...newUserData, school: e.target.value })}
                        placeholder="ĐH Ngoại Ngữ - ĐHQGHN"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Vai trò</label>
                      <select
                        value={newUserData.role}
                        onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as 'admin' | 'user' })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                      >
                        <option value="user">Học viên (ROLE_STUDENT)</option>
                        <option value="admin">Quản trị viên (ROLE_ADMIN)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUserForm(false)}
                      className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                    >
                      Xác nhận tạo tài khoản
                    </button>
                  </div>
                </form>
              )}

              {/* Accounts Full Data Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50/75 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4">Thí sinh / Học viên</th>
                        <th className="py-3.5 px-4">Email & Liên hệ</th>
                        <th className="py-3.5 px-4">Trường học & Mục tiêu</th>
                        <th className="py-3.5 px-4 text-center">Vai trò</th>
                        <th className="py-3.5 px-4 text-center">Trạng thái</th>
                        <th className="py-3.5 px-4 text-right">Thao tác Quản trị</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {adminAccounts
                        .filter((acc) => {
                          const term = userSearchTerm.toLowerCase();
                          const matchSearch =
                            acc.username.toLowerCase().includes(term) ||
                            acc.displayName.toLowerCase().includes(term) ||
                            (acc.email && acc.email.toLowerCase().includes(term)) ||
                            (acc.school && acc.school.toLowerCase().includes(term));

                          if (!matchSearch) return false;
                          if (userRoleFilter === 'admin') return acc.role === 'admin';
                          if (userRoleFilter === 'user') return acc.role === 'user' && acc.status !== 'locked';
                          if (userRoleFilter === 'locked') return acc.status === 'locked';
                          return true;
                        })
                        .map((acc) => {
                          const isLocked = acc.status === 'locked';
                          const isAdmin = acc.role === 'admin';
                          const isSuperAdmin = acc.username.toLowerCase() === 'admin';

                          return (
                            <tr
                              key={acc.username}
                              className={`transition-colors ${
                                isLocked
                                  ? 'bg-rose-50/40 dark:bg-rose-950/20'
                                  : 'hover:bg-blue-50/30 dark:hover:bg-gray-700/30'
                              }`}
                            >
                              {/* User Info */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                                      isLocked
                                        ? 'bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                                        : isAdmin
                                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                    }`}
                                  >
                                    {acc.displayName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-xs">
                                      {acc.displayName}
                                    </p>
                                    <span className="font-mono text-[11px] text-gray-400 block">
                                      @{acc.username}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Contact */}
                              <td className="py-3.5 px-4">
                                <span className="text-gray-700 dark:text-gray-300 block font-medium">
                                  {acc.email || `${acc.username}@vstepmaster.edu.vn`}
                                </span>
                                {acc.phone && <span className="text-[11px] text-gray-400 block">{acc.phone}</span>}
                              </td>

                              {/* School & Target */}
                              <td className="py-3.5 px-4">
                                <span className="text-gray-700 dark:text-gray-300 font-medium block">
                                  {acc.school || 'Học viên tự do'}
                                </span>
                                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold block">
                                  Mục tiêu: {acc.targetBand || 'B2'}
                                </span>
                              </td>

                              {/* Role */}
                              <td className="py-3.5 px-4 text-center">
                                {isAdmin ? (
                                  <span className="px-2.5 py-1 bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    Admin
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    Học viên
                                  </span>
                                )}
                              </td>

                              {/* Status */}
                              <td className="py-3.5 px-4 text-center">
                                {isLocked ? (
                                  <span className="px-2.5 py-1 bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> ĐÃ KHÓA
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Hoạt động
                                  </span>
                                )}
                              </td>

                              {/* Action Buttons */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Lock / Unlock Toggle */}
                                  <button
                                    onClick={() => handleToggleLock(acc.username, acc.status)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs ${
                                      isLocked
                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                        : 'bg-white dark:bg-gray-700 text-rose-600 border border-rose-200 dark:border-rose-800 hover:bg-rose-50'
                                    }`}
                                    title={isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                                  >
                                    {isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                    <span>{isLocked ? 'Mở' : 'Khóa'}</span>
                                  </button>

                                  {/* Toggle Role */}
                                  {!isSuperAdmin && (
                                    <button
                                      onClick={() => handleToggleRole(acc.username, acc.role)}
                                      className="px-2 py-1 bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 rounded-lg text-[11px] font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
                                      title="Chuyển quyền giữa Admin và User"
                                    >
                                      {isAdmin ? 'User' : 'Admin'}
                                    </button>
                                  )}

                                  {/* Reset Password */}
                                  <button
                                    onClick={() => handleResetPassword(acc.username)}
                                    className="px-2 py-1 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                                    title="Reset mật khẩu về: 123"
                                  >
                                    <Key className="w-3 h-3 text-amber-500" />
                                    <span>Pass 123</span>
                                  </button>

                                  {/* Delete User */}
                                  {!isSuperAdmin && (
                                    <button
                                      onClick={() => handleDeleteUser(acc.username)}
                                      className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                      title="Xóa tài khoản"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 3: CẤU HÌNH AI & RUBRIC CHẤM ĐIỂM (PAGE VIEW - RICH AI OPTIONS!) */}
          {/* ========================================================================= */}
          {sidebarActiveItem === 'ai' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Section 1: AI Model & Inference Parameters */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      <span>1. Lựa chọn Mô hình AI & Tham số Suy luận</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Chọn engine mô hình và mức độ sáng tạo của thuật toán chấm thi</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-xs font-bold">
                    LLM Engine
                  </span>
                </div>

                {/* Model Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', desc: 'Khuyên dùng • Phân tích ngữ nghĩa 2M context', tag: 'Chính thức' },
                    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', desc: 'Phản hồi siêu tốc < 1.2s • Tiết kiệm hạn ngạch', tag: 'Fast' },
                    { id: 'gpt-4o', name: 'OpenAI GPT-4o', desc: 'Đa phương thức xuất sắc • Chấm phát âm cực chuẩn', tag: 'OpenAI' },
                    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Văn phong học thuật sắc nét • Gợi ý từ vựng C1', tag: 'Anthropic' },
                    { id: 'local-llm', name: 'Local LLM (vLLM/Ollama)', desc: 'Chạy offline bảo mật 100% • Không phụ thuộc Internet', tag: 'Offline' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setAiModel(m.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        aiModel === m.id
                          ? 'border-purple-600 bg-purple-50/60 dark:bg-purple-950/40 shadow-xs ring-2 ring-purple-600/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mb-1.5 inline-block">
                        {m.tag}
                      </span>
                      <p className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{m.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">{m.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Inference Parameters: Temperature & Max Tokens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px]">
                        Nhiệt độ suy luận (Temperature): <span className="text-purple-600 font-mono font-black">{temperature}</span>
                      </label>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {temperature <= 0.1 ? 'Khắt khe chuẩn thi' : temperature <= 0.3 ? 'Cân bằng khảo thí' : 'Gợi ý phong phú'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.7"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>0.0 (Strict MOET 729)</span>
                      <span>0.2 (Khuyên dùng)</span>
                      <span>0.7 (Gợi ý mở rộng)</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px] block mb-1.5">
                      Giới hạn Tokens phản hồi (Max Tokens)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1024, 2048, 4096].map((tok) => (
                        <button
                          key={tok}
                          type="button"
                          onClick={() => setMaxTokens(tok)}
                          className={`py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            maxTokens === tok
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {tok} tokens
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">Khuyến nghị 2048 tokens cho bài chấm Writing có phân tích sửa lỗi</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Rubric Standards & Weights */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>2. Tiêu chuẩn Barem Chấm điểm & Phân bổ Trọng số Rubric</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Quy định barem khảo thí cho kỹ năng Writing & Speaking</p>
                  </div>

                  {/* Rubric Selector */}
                  <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setRubricStandard('moet_729')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        rubricStandard === 'moet_729' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-xs' : 'text-gray-500'
                      }`}
                    >
                      Barem QĐ 729/BGDĐT
                    </button>
                    <button
                      onClick={() => setRubricStandard('cefr_standard')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        rubricStandard === 'cefr_standard' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-xs' : 'text-gray-500'
                      }`}
                    >
                      Barem CEFR Chuẩn
                    </button>
                    <button
                      onClick={() => setRubricStandard('strict_examiner')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        rubricStandard === 'strict_examiner' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-xs' : 'text-gray-500'
                      }`}
                    >
                      Strict Examiner
                    </button>
                  </div>
                </div>

                {/* 4 Weights for Writing */}
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-blue-600" />
                    <span>Trọng số 4 Tiêu chí Kỹ năng Viết (Writing Task 1 & 2):</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">1. Task Fulfillment</span>
                      <span className="text-base font-black text-blue-600">{writingWeights.taskFulfillment}%</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Đáp ứng yêu cầu đề bài</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">2. Coherence & Cohesion</span>
                      <span className="text-base font-black text-indigo-600">{writingWeights.coherence}%</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Mạch lạc & liên kết đoạn</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">3. Lexical Resource</span>
                      <span className="text-base font-black text-purple-600">{writingWeights.lexicalResource}%</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Vốn từ vựng CEFR B1-C1</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">4. Grammar Accuracy</span>
                      <span className="text-base font-black text-emerald-600">{writingWeights.grammarAccuracy}%</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Độ chuẩn xác cấu trúc câu</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Advanced AI Options (Tùy chọn AI Mới) */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>3. Các Tùy chọn & Phân hệ AI Chấm thi Nâng cao</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Kích hoạt các bộ công cụ thông minh hỗ trợ nâng band và phân tích phát âm</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Grammar Fix */}
                  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>AI Grammar & Spell Corrector</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Tự động bôi đỏ lỗi ngữ pháp, chính tả trong bài Viết và giải thích cặn kẽ nguyên nhân sai.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableGrammarFix(!enableGrammarFix)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        enableGrammarFix ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {enableGrammarFix ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Option 2: Lexical Booster */}
                  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Band C1 Academic Lexical Booster</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Gợi ý nâng cấp các từ vựng thông thường (good, important) thành cụm từ học thuật C1 (paramount, imperative).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableVocabBooster(!enableVocabBooster)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        enableVocabBooster ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {enableVocabBooster ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Option 3: Pronunciation Evaluator */}
                  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-blue-600" />
                        <span>Speaking Pronunciation & Stress Evaluator</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Nhận diện trọng âm từ, ngữ điệu câu và cảnh báo phát âm sai âm đuôi /s/, /ed/, /θ/, /ð/.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnablePronunciationEval(!enablePronunciationEval)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        enablePronunciationEval ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {enablePronunciationEval ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Option 4: WPM Speed Analyzer */}
                  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-amber-500" />
                        <span>Speaking Speed WPM Analysis</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Đo lường tốc độ nói (Words Per Minute), khuyến nghị tốc độ chuẩn khảo thí 110 - 140 từ/phút.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableWpmAnalysis(!enableWpmAnalysis)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        enableWpmAnalysis ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {enableWpmAnalysis ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Option 5: Anti-Hallucination Guardrail */}
                  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                        <span>Anti-Hallucination Guardrail</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Cơ chế đối soát 2 lần ngăn chặn mô hình AI cho điểm số ảo giác hoặc không khớp với nội dung bài nộp.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableAntiHallucination(!enableAntiHallucination)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        enableAntiHallucination ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {enableAntiHallucination ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Option 6: Anonymous Blind Grading */}
                  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Anonymous Blind Grading</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Tự động ẩn họ tên, SBD và danh tính thí sinh khi gửi bài sang máy chủ AI chấm bài.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableAnonymousGrading(!enableAnonymousGrading)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        enableAnonymousGrading ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {enableAnonymousGrading ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 4: Prompt Engineering */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-4">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>4. Quản lý Mẫu Lệnh Hệ Thống (System Prompts)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Tùy chỉnh vai trò và quy tắc đánh giá chi tiết gửi đến LLM</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                      Writing Examiner System Prompt
                    </label>
                    <textarea
                      rows={3}
                      value={writingPromptTemplate}
                      onChange={(e) => setWritingPromptTemplate(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs font-mono focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                      Speaking Examiner System Prompt
                    </label>
                    <textarea
                      rows={3}
                      value={speakingPromptTemplate}
                      onChange={(e) => setSpeakingPromptTemplate(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs font-mono focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: API Key & Latency Test */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-4">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-500" />
                    <span>5. Khóa Truy Cập API & Kiểm Tra Kết Nối Trực Tiếp</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Quản lý khóa API Google AI Studio / OpenAI và chẩn đoán độ trễ mạng</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      API Key Khảo Thí (BYOK)
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={customApiKey}
                        onChange={(e) => setCustomApiKey(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs pr-20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-2.5 text-xs text-blue-600 font-bold hover:underline"
                      >
                        {showApiKey ? 'Ẩn' : 'Hiện'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-5">
                    <button
                      onClick={handleTestApi}
                      disabled={isTestingApi}
                      className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Activity className={`w-4 h-4 text-blue-600 ${isTestingApi ? 'animate-spin' : ''}`} />
                      <span>{isTestingApi ? 'Đang kiểm tra kết nối...' : 'Kiểm tra Kết nối API'}</span>
                    </button>

                    <button
                      onClick={handleSaveAiConfig}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu Cấu hình AI Engine</span>
                    </button>
                  </div>
                </div>

                {apiStatusMessage && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{apiStatusMessage}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 4: BÁO CÁO & PHỔ ĐIỂM (PAGE VIEW) */}
          {/* ========================================================================= */}
          {sidebarActiveItem === 'reports' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Distribution Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Đạt Chuẩn B1 (4.0 - 5.5)</span>
                  <span className="text-2xl font-black text-blue-600 mt-1 block">34.2%</span>
                  <span className="text-[10px] text-gray-400">4,258 học viên</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Đạt Chuẩn B2 (6.0 - 8.0)</span>
                  <span className="text-2xl font-black text-indigo-600 mt-1 block">45.3%</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Tỷ lệ cao nhất (+4.2%)</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Đạt Chuẩn C1 (8.5 - 10.0)</span>
                  <span className="text-2xl font-black text-purple-600 mt-1 block">12.0%</span>
                  <span className="text-[10px] text-purple-600 font-semibold">1,494 thí sinh xuất sắc</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Dưới B1 (&lt; 4.0)</span>
                  <span className="text-2xl font-black text-rose-500 mt-1 block">8.5%</span>
                  <span className="text-[10px] text-gray-400">Cần ôn luyện thêm</span>
                </div>
              </div>

              {/* Skills Breakdown Chart & Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs space-y-4">
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>Tỷ lệ Đạt Chuẩn theo Kỹ Năng (VSTEP 4 Kỹ Năng)</span>
                  </h3>

                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-600" /> Reading (Đọc hiểu 40 câu)</span>
                        <span className="text-emerald-600">78.4% Đạt</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78.4%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="flex items-center gap-1.5"><Headphones className="w-3.5 h-3.5 text-indigo-600" /> Listening (Nghe hiểu 35 câu)</span>
                        <span className="text-blue-600">64.1% Đạt</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '64.1%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="flex items-center gap-1.5"><PenTool className="w-3.5 h-3.5 text-purple-600" /> Writing (Viết Task 1 & 2)</span>
                        <span className="text-purple-600">58.7% Đạt</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '58.7%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5 text-rose-500" /> Speaking (Nói Part 1-3)</span>
                        <span className="text-amber-600">52.3% Đạt</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '52.3%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export & Institution Stats */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-600" />
                      <span>Xuất Báo Cáo & Danh Sách Điểm Thí Sinh</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Kết xuất dữ liệu phục vụ hội đồng khảo thí và trường đại học</p>

                    <div className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                        <span>ĐH Quốc gia Hà Nội:</span>
                        <strong className="text-gray-900 dark:text-white">4,812 thí sinh</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                        <span>ĐH Sư phạm Hà Nội:</span>
                        <strong className="text-gray-900 dark:text-white">3,120 thí sinh</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                        <span>ĐH Bách Khoa Hà Nội:</span>
                        <strong className="text-gray-900 dark:text-white">2,418 thí sinh</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSuccessMessage('Đang kết xuất tệp Excel danh sách điểm thí sinh (.xlsx)...');
                        setTimeout(() => setSuccessMessage(null), 3000);
                      }}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Xuất file Excel (.xlsx)</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      In Báo Cáo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 5: CÀI ĐẶT & HỆ THỐNG (UNIFIED SETTINGS - Gộp Feature Toggles + Logs + Backend) */}
          {/* ========================================================================= */}
          {sidebarActiveItem === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Section 1: Feature Toggles */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600" />
                      <span>1. Bật / Tắt Phân Hệ & Tính Năng Toàn Hệ Thống</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Bật hoặc tắt các module chức năng ngay lập tức không cần restart</p>
                  </div>
                  <button
                    onClick={resetDefaults}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-200 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi phục mặc định</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-purple-600" />
                        <span>Động cơ AI Chấm điểm Tự động</span>
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Chấm bài Writing & Speaking theo Barem VSTEP</p>
                    </div>
                    <button
                      onClick={() => updateFlag('enableAiScoring', !flags.enableAiScoring)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        flags.enableAiScoring ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {flags.enableAiScoring ? 'ĐANG BẬT' : 'ĐANG TẮT'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <UploadCloud className="w-4 h-4 text-blue-600" />
                        <span>Bóc tách Đề Word (.docx) & PDF</span>
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Document Parser Mammoth và PDF.js</p>
                    </div>
                    <button
                      onClick={() => updateFlag('enableCustomTest', !flags.enableCustomTest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        flags.enableCustomTest ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {flags.enableCustomTest ? 'ĐANG BẬT' : 'ĐANG TẮT'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span>Thư viện Đọc & Dịch Song Ngữ</span>
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Reading Library tra từ song ngữ Anh - Việt</p>
                    </div>
                    <button
                      onClick={() => updateFlag('enableReadingLibrary', !flags.enableReadingLibrary)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        flags.enableReadingLibrary ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {flags.enableReadingLibrary ? 'ĐANG BẬT' : 'ĐANG TẮT'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Phân hệ Tiếng Trung HSK 1-6</span>
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Khảo thí chứng chỉ HSK song song VSTEP</p>
                    </div>
                    <button
                      onClick={() => updateFlag('enableChinese', !flags.enableChinese)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        flags.enableChinese ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600'
                      }`}
                    >
                      {flags.enableChinese ? 'ĐANG BẬT' : 'ĐANG TẮT'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 2: Security & Anti-cheat Audit Logs */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>2. Nhật Ký Giám Sát Gian Lận & An Ninh (Audit Logs)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Giám sát vi phạm chuyển tab quá số lần quy định trong Mock Test</p>
                  </div>

                  <button
                    onClick={handleClearLogs}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa nhật ký vi phạm</span>
                  </button>
                </div>

                <div className="space-y-2 font-mono text-xs max-h-60 overflow-y-auto scrollbar-thin">
                  {dynamicLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 rounded-xl border border-rose-200 dark:border-rose-800">
                      <span className="font-bold">[{log.timestamp}] [{log.type}]</span> {log.message}
                    </div>
                  ))}

                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200 rounded-xl border border-rose-200 dark:border-rose-800">
                    [15:38:02] [SECURITY] Khóa tạm TK hv_nguyen22: Chuyển tab &gt; 5 lần trong Mock Test 180 phút.
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200 rounded-xl border border-amber-200 dark:border-amber-800">
                    [14:12:45] [API_RATE] Cảnh báo: Tải API Gemini đạt 85% ngưỡng giới hạn 60 req/min.
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    [12:05:11] [AUDIT] Quản trị viên duyệt đề bóc tách DOCX-PARSE-07 thành công.
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200 rounded-xl border border-blue-200 dark:border-blue-800">
                    [09:40:30] [AUTH] Đồng bộ 15 học viên mới đăng ký từ Cổng đào tạo.
                  </div>
                </div>
              </div>

              {/* Section 3: Backend & Cache Health */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-4">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>3. Vận Hành Máy Chủ C# ASP.NET Core & Bộ Nhớ Cache</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Kiểm tra kết nối Web API .NET 10, SQLite và dọn dẹp cache cục bộ</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">C# ASP.NET Core Backend</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">http://localhost:5000 (SQLite Database)</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isBackendConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {isBackendConnected ? 'Đang kết nối' : 'Dự phòng Local'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Dọn dẹp Bộ nhớ Cache</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Xóa cache kết quả thi và khởi tạo lại</p>
                    </div>
                    <button
                      onClick={() => {
                        setSuccessMessage('Đã làm sạch bộ nhớ đệm cache hệ thống!');
                        setTimeout(() => setSuccessMessage(null), 3000);
                      }}
                      className="px-3.5 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 cursor-pointer"
                    >
                      Dọn Cache
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL: ĐỐI SOÁT & THẨM ĐỊNH BÓC TÁCH (Khi Admin bấm "Xem chi tiết / Đối soát" một đề cụ thể) */}
      {inspectExam && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/70 dark:bg-gray-800/60">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" /> DOCUMENT PARSER VERIFICATION • ĐỐI SOÁT ĐỀ THI
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  Đối soát Đề thi: {inspectExam.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectExam(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer active:scale-95"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Mã đề thi</span>
                  <p className="font-mono font-bold text-gray-900 dark:text-white mt-0.5">{inspectExam.id}</p>
                </div>
                <div className="p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Nguồn tài liệu</span>
                  <p className="font-semibold text-gray-900 dark:text-white mt-0.5 truncate">{inspectExam.source}</p>
                </div>
                <div className="p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Độ tin cậy Parser</span>
                  <p className="font-extrabold text-emerald-600 mt-0.5">{inspectExam.confidence || 98}% (Rất cao)</p>
                </div>
                <div className="p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Số lượng câu hỏi</span>
                  <p className="font-extrabold text-blue-600 mt-0.5">{inspectExam.questionCount} câu trắc nghiệm</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold">Câu hỏi mẫu 1</span>
                  <span className="text-emerald-600 font-semibold">Độ tin cậy đáp án: 99%</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  According to the passage, why are educators increasingly adopting blended learning environments?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 font-medium">
                    A. To combine digital flexibility with interactive physical instruction (Đáp án chính xác)
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    B. To completely replace traditional textbook assessments
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2.5 bg-gray-50/70 dark:bg-gray-800/60">
              <button
                onClick={() => setInspectExam(null)}
                className="px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
              >
                Đóng
              </button>
              {inspectExam.status === 'pending' && (
                <button
                  onClick={() => handleApprove(inspectExam.id)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Phê duyệt Đề thi Ngay
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: THÊM ĐỀ THI MỚI */}
      {showAddExamModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/70 dark:bg-gray-800/60">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Thêm Đề Thi Mới vào Ngân Hàng</span>
              </h3>
              <button onClick={() => setShowAddExamModal(false)} className="p-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Tên bộ đề</label>
                <input
                  type="text"
                  placeholder="VD: Đề thi Khảo sát VSTEP B1-B2 ĐH Sư Phạm 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Kỹ năng</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Full 4 Kỹ năng (180 phút)</option>
                  <option>Reading (40 câu)</option>
                  <option>Listening (35 câu)</option>
                  <option>Writing (Task 1 + 2)</option>
                  <option>Speaking (Part 1-3)</option>
                </select>
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2 bg-gray-50/70 dark:bg-gray-800/60">
              <button
                onClick={() => setShowAddExamModal(false)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setShowAddExamModal(false);
                  setSuccessMessage('Đã thêm bộ đề thi mới thành công!');
                  setTimeout(() => setSuccessMessage(null), 3000);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Lưu Đề Thi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
