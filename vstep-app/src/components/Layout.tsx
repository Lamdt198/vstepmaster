import {
  Home,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  FileText,
  UploadCloud,
  BookMarked,
  Layers,
  BarChart3,
  Settings,
  ShieldCheck,
  Moon,
  Sun,
  LogOut,
  User,
  UserCheck,
  Sparkles,
  Video,
  Library,
  HelpCircle,
  Menu,
  X,
  ArrowUp,
  type LucideIcon
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import GlobalDictionaryPopover from './GlobalDictionaryPopover';
import { useBookmarks } from '../context/BookmarkContext';
import { useAuth } from '../context/AuthContext';
import { useFeatureFlags } from '../context/FeatureFlagContext';

interface LayoutProps {
  children: ReactNode;
}

interface NavItemDef {
  path: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItemDef[] = [
  { path: '/', label: 'Trang chủ', icon: Home },
  { path: '/listening', label: 'Listening', icon: Headphones },
  { path: '/reading', label: 'Reading', icon: BookOpen },
  { path: '/writing', label: 'Writing', icon: PenTool },
  { path: '/speaking', label: 'Speaking', icon: Mic },
  { path: '/mock-test', label: 'Thi thử (180p)', icon: FileText },
  { path: '/custom-test', label: 'Nhập đề (Word/PDF)', icon: UploadCloud },
  { path: '/vocabulary', label: 'Từ vựng CEFR', icon: BookMarked },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/progress', label: 'Tiến độ', icon: BarChart3 },
  { path: '/account', label: 'Tài khoản', icon: UserCheck },
  { path: '/settings', label: 'Cài đặt', icon: Settings },
  { path: '/reading-library', label: 'Đọc & Dịch', icon: Library },
  { path: '/lessons', label: 'Bài giảng', icon: Video },
  { path: '/knowledge', label: 'Kiến thức', icon: BookOpen },
  { path: '/knowledge-quiz', label: 'Quiz', icon: HelpCircle },
];

const chineseNavItems: NavItemDef[] = [
  { path: '/chinese', label: 'Trang chủ HSK', icon: Home },
  { path: '/chinese/vocabulary', label: 'Từ vựng HSK', icon: FileText },
  { path: '/chinese/grammar', label: 'Ngữ pháp HSK', icon: PenTool },
  { path: '/chinese/reading', label: 'Đọc hiểu HSK', icon: BookOpen },
  { path: '/chinese/lessons', label: 'Bài giảng HSK', icon: Video },
  { path: '/chinese/quiz', label: 'Thi thử HSK', icon: HelpCircle },
  { path: '/settings', label: 'Cài đặt', icon: Settings },
];



export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cập nhật tiêu đề tab trình duyệt theo từng trang
  useEffect(() => {
    const getPageTitle = (path: string) => {
      if (path === '/') return 'VSTEP Master - Luyện Thi VSTEP B1, B2, C1';
      if (path.startsWith('/mock-test')) return 'Đề Thi Thử VSTEP | VSTEP Master';
      if (path.startsWith('/listening')) return 'Kỹ Năng Nghe (Listening) | VSTEP Master';
      if (path.startsWith('/reading-library')) return 'Thư Viện Đọc & Dịch | VSTEP Master';
      if (path.startsWith('/reading')) return 'Kỹ Năng Đọc (Reading) | VSTEP Master';
      if (path.startsWith('/writing')) return 'Kỹ Năng Viết (Writing) | VSTEP Master';
      if (path.startsWith('/speaking')) return 'Kỹ Năng Nói (Speaking) | VSTEP Master';
      if (path.startsWith('/vocabulary')) return 'Từ Vựng CEFR | VSTEP Master';
      if (path.startsWith('/flashcards')) return 'Flashcards Từ Vựng | VSTEP Master';
      if (path.startsWith('/vocab-quiz')) return 'Trắc Nghiệm Từ Vựng | VSTEP Master';
      if (path.startsWith('/lessons')) return 'Bài Giảng Video | VSTEP Master';
      if (path.startsWith('/knowledge')) return 'Kiến Thức Ngữ Pháp | VSTEP Master';
      if (path.startsWith('/custom-test')) return 'Tạo Đề Tùy Chỉnh | VSTEP Master';
      if (path.startsWith('/progress')) return 'Tiến Độ Học Tập | VSTEP Master';
      if (path.startsWith('/settings')) return 'Cài Đặt Hệ Thống | VSTEP Master';
      if (path.startsWith('/account')) return 'Hồ Sơ Cá Nhân | VSTEP Master';
      if (path.startsWith('/admin')) return 'Quản Trị Hệ Thống | VSTEP Master';
      if (path.startsWith('/chinese')) return 'HSK Master - Luyện Thi HSK 1-6';
      return 'VSTEP Master - Luyện Thi VSTEP B1, B2, C1';
    };

    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

  const { savedWords } = useBookmarks();
  const { user, logout } = useAuth();
  const { flags } = useFeatureFlags();

  const isChinese = flags.enableChinese && location.pathname.startsWith('/chinese');

  const filteredNavItems = navItems.filter((item) => {
    if (item.path === '/reading-library' && !flags.enableReadingLibrary) return false;
    if (item.path === '/lessons' && !flags.enableLessons) return false;
    if ((item.path === '/knowledge' || item.path === '/knowledge-quiz') && !flags.enableKnowledge) return false;
    if (item.path === '/custom-test' && !flags.enableCustomTest) return false;
    return true;
  });

  const currentNav = isChinese ? chineseNavItems : filteredNavItems;

  if (location.pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen lg:h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors overflow-x-hidden lg:overflow-hidden">
      {/* Sidebar - Desktop (always visible) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40">
        {/* Logo + Language switcher */}
        <div className="flex items-center justify-between px-3 h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <Link to={isChinese ? '/chinese' : '/'} className="flex items-center gap-2">
            {isChinese ? (
              <>
                <span className="text-2xl">🇨🇳</span>
                <div>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">HSK Master</span>
                  <span className="text-[9px] block text-gray-400 dark:text-gray-500 -mt-0.5">学中文 HSK1-6</span>
                </div>
              </>
            ) : (
              <>
                <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="10" fill="#2563eb"/>
                  <path d="M10 28L14 12h3l4 10 4-10h3l4 16h-3l-2.8-11-3.7 9.5h-2l-3.7-9.5L14.5 28H10z" fill="white"/>
                </svg>
                <div>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">VSTEP Master</span>
                  <span className="text-[9px] block text-gray-400 dark:text-gray-500 -mt-0.5">Luyện thi B1-C1</span>
                </div>
              </>
            )}
          </Link>
        </div>

        {/* Language switcher - Only visible if enabled in Admin */}
        {flags.enableChinese && (
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${!isChinese ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              🇬🇧 English
            </Link>
            <Link to="/chinese" className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${isChinese ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              🇨🇳 中文
            </Link>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
          {currentNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                (location.pathname === item.path || (item.path !== '/' && item.path !== '/chinese' && location.pathname.startsWith(item.path)))
                  ? (isChinese ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300')
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-primary-600 dark:text-gray-400" />
              <span className="truncate">{item.label}</span>
              {item.path === '/flashcards' && savedWords.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {savedWords.length}
                </span>
              )}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                location.pathname === '/admin'
                  ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" /><span>Quản trị viên</span>
            </Link>
          )}
        </nav>

        {/* User info & controls at bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-1">
          {user && (
            <Link
              to="/account"
              className="block px-3 py-2 mb-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors group cursor-pointer"
              title="Quản lý tài khoản & Lộ trình VSTEP"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{user.displayName}</p>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Xem &rarr;</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                {user.role === 'admin' ? (
                  <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold"><ShieldCheck className="w-3.5 h-3.5" /> Admin</span>
                ) : user.username === 'hocvien' ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold"><Sparkles className="w-3.5 h-3.5" /> Học viên VIP</span>
                ) : (
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold"><User className="w-3.5 h-3.5" /> Học viên ({user.targetBand || 'B2'})</span>
                )}
              </p>
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <><Moon className="w-4 h-4 shrink-0" /><span>Chế độ tối</span></> : <><Sun className="w-4 h-4 text-amber-500 shrink-0" /><span>Chế độ sáng</span></>}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" /><span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          {/* Sidebar */}
          <aside className="relative w-64 max-w-[80vw] h-full bg-white dark:bg-gray-800 shadow-xl flex flex-col">
            {/* Logo + close */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-2">
                {isChinese ? <span className="text-xl">🇨🇳</span> : (
                  <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="10" fill="#2563eb"/>
                    <path d="M10 28L14 12h3l4 10 4-10h3l4 16h-3l-2.8-11-3.7 9.5h-2l-3.7-9.5L14.5 28H10z" fill="white"/>
                  </svg>
                )}
                <span className={`text-sm font-bold ${isChinese ? 'text-red-600 dark:text-red-400' : 'text-primary-600 dark:text-primary-400'}`}>
                  {isChinese ? 'HSK Master' : 'VSTEP Master'}
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close menu">
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Language switcher mobile - Only visible if enabled in Admin */}
            {flags.enableChinese && (
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <Link to="/" onClick={() => setSidebarOpen(false)} className={`flex-1 py-2 text-center text-xs font-medium ${!isChinese ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400'}`}>🇬🇧 English</Link>
                <Link to="/chinese" onClick={() => setSidebarOpen(false)} className={`flex-1 py-2 text-center text-xs font-medium ${isChinese ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'text-gray-500 dark:text-gray-400'}`}>🇨🇳 中文</Link>
              </div>
            )}

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
              {currentNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    (location.pathname === item.path || (item.path !== '/' && item.path !== '/chinese' && location.pathname.startsWith(item.path)))
                      ? (isChinese ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300')
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-primary-600 dark:text-gray-400" />
                  <span className="truncate">{item.label}</span>
                  {item.path === '/flashcards' && savedWords.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {savedWords.length}
                    </span>
                  )}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                    location.pathname === '/admin'
                      ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" /><span>Quản trị viên</span>
                </Link>
              )}
            </nav>

            {/* User & controls */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-1">
              {user && (
                <Link
                  to="/account"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-3 py-2 mb-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors group cursor-pointer"
                  title="Quản lý tài khoản & Lộ trình VSTEP"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{user.displayName}</p>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Xem &rarr;</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {user.role === 'admin' ? '🛡️ Admin' : user.username === 'hocvien' ? '✨ Học viên VIP' : `👤 Học viên (${user.targetBand || 'B2'})`}
                  </p>
                </Link>
              )}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? <><Moon className="w-4 h-4 shrink-0" /><span>Chế độ tối</span></> : <><Sun className="w-4 h-4 text-amber-500 shrink-0" /><span>Chế độ sáng</span></>}
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4 shrink-0" /><span>Đăng xuất</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-56 lg:h-screen lg:overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between h-14 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="#2563eb"/>
                <path d="M10 28L14 12h3l4 10 4-10h3l4 16h-3l-2.8-11-3.7 9.5h-2l-3.7-9.5L14.5 28H10z" fill="white"/>
              </svg>
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">VSTEP Master</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 py-2 flex-1 flex flex-col min-h-0">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 shrink-0">
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>VSTEP Master - Luyện thi VSTEP B1-B2-C1</p>
          </div>
        </footer>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center cursor-pointer group"
            title="Lên đầu trang"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Global Double-Click Instant Dictionary & Auto-Save */}
        <GlobalDictionaryPopover />
      </div>
    </div>
  );
}
