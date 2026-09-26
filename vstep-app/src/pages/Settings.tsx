import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  Bot, 
  CheckCircle2, 
  PenTool, 
  Mic, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Volume2, 
  Target, 
  Clock, 
  Sparkles, 
  Save, 
  ExternalLink,
  Info,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Learning target states
  const [targetBand, setTargetBand] = useState<'B1' | 'B2' | 'C1'>(user?.targetBand || 'B2');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(user?.dailyGoalMinutes || 45);
  
  // Audio preferences
  const [audioSpeed, setAudioSpeed] = useState<string>(() => localStorage.getItem('vstep_audio_speed') || '1.0');
  const [autoPronounce, setAutoPronounce] = useState<boolean>(() => localStorage.getItem('vstep_auto_pronounce') === 'true');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = async () => {
    localStorage.setItem('vstep_audio_speed', audioSpeed);
    localStorage.setItem('vstep_auto_pronounce', String(autoPronounce));
    
    if (user) {
      await updateProfile({
        targetBand,
        dailyGoalMinutes,
      });
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
          <span>Cài đặt & Tùy chọn Cá nhân</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
          Quản lý mục tiêu học tập, giao diện hiển thị và tùy chọn trải nghiệm ôn luyện VSTEP.
        </p>
      </div>

      {/* 1. Centralized AI Engine Status (Hidden API Key from regular students) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>Hệ thống AI Khảo thí & Chấm điểm</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Quản trị tập trung
                </span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Được kích hoạt và cấp bản quyền tự động bởi Ban Khảo thí VSTEP Master
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Sẵn sàng hoạt động</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/60">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mô hình AI cốt lõi</div>
            <div className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Gemini 2.0 Flash</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/60">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Cơ chế Khảo thí</div>
            <div className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Chấm điểm Đa tầng</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/60">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Bài thi Nói (Speaking)</div>
            <div className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1 flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Speech-to-Text (STT)</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Học viên không cần cấu hình khóa truy cập (API Key)</span>
          </p>
          <p className="text-blue-800 dark:text-blue-300 leading-relaxed pl-5.5">
            Toàn bộ lưu lượng chấm bài Writing & Speaking của bạn đều được chuyển tiếp an toàn qua bản quyền khảo thí tập trung của nhà trường. Nếu kết nối AI gián đoạn hoặc quá tải, hệ thống sẽ tự động chuyển sang <strong>Thuật toán Barem VSTEP nội bộ</strong> để đảm bảo bạn luôn nhận được điểm số và đánh giá chi tiết mà không bị gián đoạn.
          </p>
        </div>

        {/* Quản trị viên shortcut banner */}
        {user?.role === 'admin' && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Bạn đang đăng nhập với quyền <strong>Quản trị viên (SuperAdmin)</strong>. Để điều chỉnh API Key hoặc cấu hình tham số Prompt/Rubric, vui lòng truy cập Bảng Quản trị.</span>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-2xs transition-all active:scale-95 shrink-0"
            >
              <span>Vào Bảng Quản trị</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* 2. Mục tiêu Học tập Cá nhân (Learning Targets) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-5">
        <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Mục tiêu Ôn luyện VSTEP</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Cá nhân hóa lộ trình học và gợi ý bài thi phù hợp với trình độ mục tiêu của bạn
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Bậc Chứng Chỉ Mục Tiêu (CEFR / VSTEP)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['B1', 'B2', 'C1'] as const).map((band) => (
                <button
                  key={band}
                  type="button"
                  onClick={() => setTargetBand(band)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                    targetBand === band
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-extrabold shadow-2xs ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold'
                  }`}
                >
                  <div className="text-base sm:text-lg">{band}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {band === 'B1' && '4.0 - 5.5 (Cơ bản)'}
                    {band === 'B2' && '6.0 - 8.0 (Chuẩn ĐH)'}
                    {band === 'C1' && '8.5 - 10.0 (Cao cấp)'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Thời Gian Học Mỗi Ngày (Phút)
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {[30, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDailyGoalMinutes(mins)}
                  className={`py-2.5 px-3 rounded-xl border text-xs text-center transition-all cursor-pointer active:scale-95 ${
                    dailyGoalMinutes === mins
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-gray-400" />
                  <span>{mins} phút/ngày</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Giao diện & Trải nghiệm (Theme & Display) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-5">
        <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span>Giao Diện & Chế Độ Hiển Thị</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Tùy biến không gian học tập phù hợp với điều kiện ánh sáng xung quanh
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Chế độ: {theme === 'dark' ? 'Tối (Dark Mode)' : 'Sáng (Light Mode)'}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {theme === 'dark' 
                ? 'Tông màu đen xám Slate dịu mắt, tối ưu cho ôn luyện buổi tối' 
                : 'Tông màu sáng thanh lịch, rõ nét cho không gian ban ngày'}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Chuyển sang Chế độ Sáng</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-600" />
                <span>Chuyển sang Chế độ Tối</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Tùy chọn Âm thanh & Luyện thi (Audio & Speech Settings) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xs space-y-5">
        <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-600" />
            <span>Âm Thanh & Luyện Phát Âm</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Tùy biến tốc độ đọc và cơ chế phát âm giọng đọc bản ngữ trong bài thi Nghe & Thẻ Flashcards
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
            <div>
              <div className="text-xs font-bold text-gray-900 dark:text-white">Tốc độ phát âm bài thi Nghe (Default Audio Speed)</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Tốc độ mặc định khi vào phòng thi thử và bài luyện tập</div>
            </div>
            <div className="flex items-center gap-2">
              {['0.75', '1.0', '1.25'].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setAudioSpeed(speed)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    audioSpeed === speed
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
            <div>
              <div className="text-xs font-bold text-gray-900 dark:text-white">Tự động phát âm khi lật thẻ Flashcards</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Tự động phát giọng đọc bản ngữ Anh - Mỹ ngay khi lật mở mặt trước từ vựng</div>
            </div>
            <button
              type="button"
              onClick={() => setAutoPronounce(!autoPronounce)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                autoPronounce ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  autoPronounce ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Nút lưu tùy chọn */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSavePreferences}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Tùy Chọn & Mục Tiêu</span>
          </button>
          {savedSuccess && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu thành công vào hồ sơ của bạn!</span>
            </span>
          )}
        </div>
      </div>

      {/* 5. Hướng dẫn Dùng AI & Tiêu chí Barem VSTEP */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cách dùng AI chấm điểm */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-2xs space-y-3">
          <h2 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Quy Trình Chấm Điểm AI</span>
          </h2>
          <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 shrink-0 mt-0.5">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Kỹ năng Viết (Writing)</p>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">Viết bài xong → Nhấn "Chấm điểm AI" → Hệ thống chấm theo 4 tiêu chí, chỉ ra lỗi sai và gợi ý cách diễn đạt band B2/C1.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 shrink-0 mt-0.5">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Kỹ năng Nói (Speaking)</p>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">Ghi âm trực tiếp qua Micro → Công cụ STT tự động chuyển thành văn bản → AI chấm độ trôi chảy, vốn từ và ngữ pháp.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tiêu chí chấm điểm VSTEP */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-2xs space-y-3">
          <h2 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Tiêu Chí Rubric VSTEP Thang 10</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-bold text-blue-600 dark:text-blue-400 mb-1">Writing (Task 1 & 2)</p>
              <ul className="space-y-1 text-gray-500 dark:text-gray-400 text-[11px]">
                <li>• Task Achievement (Đủ ý)</li>
                <li>• Coherence (Mạch lạc)</li>
                <li>• Lexical Resource (Từ vựng)</li>
                <li>• Grammar (Ngữ pháp)</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-purple-600 dark:text-purple-400 mb-1">Speaking (Part 1, 2, 3)</p>
              <ul className="space-y-1 text-gray-500 dark:text-gray-400 text-[11px]">
                <li>• Fluency (Độ trôi chảy)</li>
                <li>• Lexical (Vốn từ vựng)</li>
                <li>• Grammar (Độ chính xác)</li>
                <li>• Pronunciation & Task</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
