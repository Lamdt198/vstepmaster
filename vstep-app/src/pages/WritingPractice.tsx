import { Bot, Sparkles, Save, FileText, BookOpen, PenTool, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { writingTasks } from '../data/writingData';
import { scoreWriting, ScoringResult } from '../services/aiScoring';
import { useFeatureFlags } from '../context/FeatureFlagContext';
import { progressService } from '../services/progressService';

export default function WritingPractice() {
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const { id } = useParams<{ id: string }>();
  const task = writingTasks.find((t) => t.id === id);
  const [userText, setUserText] = useState(
    id === 'w1'
      ? `Dear Scholarship Committee,\n\nI am writing this letter to formally express my deepest gratitude for awarding me the prestigious Global Excellence Scholarship for the upcoming academic year 2026-2027.\n\nI am thrilled and honored to have been selected among many competent applicants. In order to make timely arrangements, could you please provide further details regarding university accommodation and the procedure for student visa sponsorship? I would appreciate knowing the key milestones so that I can prepare all supporting financial documents accordingly.\n\nI would like to reaffirm my enthusiastic acceptance of this valuable scholarship offer and look forward to contributing actively to the university community.\n\nYours sincerely,\nNguyen Van An`
      : ''
  );
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoringResult | null>(null);
  const [scoreError, setScoreError] = useState('');

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Không tìm thấy bài viết.</p>
        <Link to="/writing" className="text-blue-600 dark:text-blue-400 mt-4 inline-block font-semibold">
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  const wordCount = userText.trim() ? userText.trim().split(/\s+/).length : 0;
  const isWordCountValid = wordCount >= task.wordCount.min && wordCount <= task.wordCount.max;

  const handleSave = () => {
    progressService.savePracticeResult(user?.username, 'writing', id || 'w1', {
      wordCount,
      title: task.prompt ? task.prompt.slice(0, 50) + '...' : `Writing Task ${task.task}`,
    });
    alert('Đã lưu bài viết thành công vào tiến độ cá nhân!');
  };

  const handleAiScore = async () => {
    if (!flags.enableAiScoring) {
      setScoreError('Động cơ AI Chấm điểm đang tạm thời bị tắt bởi Quản trị viên. Hãy bật lại trong trang Quản trị (Admin) để sử dụng.');
      return;
    }

    if (wordCount < 20) {
      setScoreError('Bài viết quá ngắn. Cần ít nhất 20 từ để AI có thể đánh giá theo Rubric VSTEP.');
      return;
    }

    setScoring(true);
    setScoreError('');

    try {
      const result = await scoreWriting(task.prompt, userText, `Task ${task.task}`, task.level);
      setScoreResult(result);
      progressService.savePracticeResult(user?.username, 'writing', id || 'w1', {
        wordCount,
        score: result.overallScore,
        band: result.vstepLevel,
        title: task.prompt ? task.prompt.slice(0, 50) + '...' : `Writing Task ${task.task}`,
      });
    } catch (err) {
      setScoreError(err instanceof Error ? err.message : 'Lỗi khi chấm điểm bài viết');
    } finally {
      setScoring(false);
    }
  };

  // Mock initial evaluation if not scored yet for instant mockup view
  const currentResult =
    scoreResult || {
      overallScore: 8.0,
      vstepLevel: 'B2',
      taskAchievement: 8.5,
      coherence: 8.0,
      lexicalResource: 7.5,
      grammar: 8.0,
      feedback:
        'Bài viết thể hiện năng lực sử dụng ngôn ngữ học thuật rất tốt, mạch lạc, đáp ứng trọn vẹn yêu cầu nhiệm vụ đề bài Task 1.',
      suggestions: [
        "Lỗi Collocation: 'make timely arrangements' -> Gợi ý: 'make appropriate preparations' hoặc 'take necessary steps'.",
        "Điểm sáng Từ vựng: 'prestigious', 'competent applicants', 'milestones' thể hiện vốn từ học thuật B2-C1 phong phú.",
      ],
      correctedVersion: '',
    };

  return (
    <div className="space-y-5 w-full pb-10">
      {/* 1. Top Header Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/writing"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors"
          >
            ← Danh sách
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Luyện Viết (Writing) - Task {task.task}: {task.title}
              </h1>
              <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-bold">
                {task.level}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Giao diện Soạn thảo & Thẻ điểm Rubric CEFR chấm bởi Trí tuệ Nhân tạo (Gemini Engine)
            </p>
          </div>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2">
            <span className="text-red-500">⏱️</span>
            <span className="font-mono font-bold text-red-600 dark:text-red-400 text-base">
              Thời gian: 18:45
            </span>
          </div>
          <button
            onClick={() => setShowSampleModal(true)}
            className="px-3.5 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-xl text-xs font-semibold hover:bg-purple-100 transition-colors"
          >
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /><span>Bài mẫu C1</span></span>
          </button>
        </div>
      </div>

      {/* 2. Main Side-by-Side Split View (Matching ui_writing_ai.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Prompt + Text Editor + Word Count + AI Trigger */}
        <div className="lg:col-span-7 space-y-5">
          {/* Prompt Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/60 to-white dark:from-blue-950/20 dark:to-gray-800">
            <h3 className="font-bold text-sm text-blue-900 dark:text-blue-300 uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600 inline" /> ĐỀ BÀI TASK {task.task} ({task.task === 1 ? 'Viết thư trang trọng / Formal Letter' : 'Bài luận học thuật / Essay'}):
            </h3>
            <div className="mt-2.5 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
              {task.prompt}
            </div>
            <div className="mt-3 pt-2.5 border-t border-blue-100 dark:border-blue-900/30 flex items-center justify-between text-xs text-blue-700 dark:text-blue-300">
              <span>Yêu cầu độ dài: <strong>{task.wordCount.min} - {task.wordCount.max} từ</strong></span>
              <span>Thời gian khuyến nghị: {task.task === 1 ? '20 phút' : '40 phút'}</span>
            </div>
          </div>

          {/* Text Editor Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
            {/* Editor Toolbar (Simulation matching ui_writing_ai.png) */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 overflow-x-auto select-none no-scrollbar">
              <div className="flex items-center gap-1 font-bold text-gray-700 dark:text-gray-300">
                <button type="button" className="w-7 h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">B</button>
                <button type="button" className="w-7 h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center italic">I</button>
                <button type="button" className="w-7 h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center underline">U</button>
              </div>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[11px] font-medium text-gray-600 dark:text-gray-300">
                Định dạng: Đoạn văn
              </span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-[11px] hover:text-blue-600 cursor-pointer">Chèn liên kết</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-[11px] hover:text-blue-600 cursor-pointer">Hoàn tác (Ctrl+Z)</span>
            </div>

            {/* Textarea */}
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              rows={14}
              placeholder="Bắt đầu soạn thảo bài viết của bạn tại đây..."
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white font-sans text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            {/* Editor Footer Status Bar */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Dynamic Word Count Indicator with Color Feedback */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                <span
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                    isWordCountValid
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : wordCount > task.wordCount.max
                      ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 inline text-gray-500" />
                  <span>
                    Số từ: <strong>{wordCount} từ</strong> (
                    {isWordCountValid
                      ? `Đạt yêu cầu ${task.wordCount.min}-${task.wordCount.max} từ`
                      : wordCount < task.wordCount.min
                      ? `Cần thêm ${task.wordCount.min - wordCount} từ`
                      : `Vượt quá quy định`}
                    )
                  </span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-1.5"><Save className="w-3.5 h-3.5 text-gray-500" /><span>Lưu bài</span></span>
                </button>
                <button
                  onClick={handleAiScore}
                  disabled={scoring || !flags.enableAiScoring}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${
                    !flags.enableAiScoring
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 disabled:opacity-50'
                  }`}
                  title={!flags.enableAiScoring ? 'Tính năng AI đã bị tắt trong Quản trị' : 'Chấm điểm tự động'}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" /><span>{scoring ? 'AI Đang chấm...' : !flags.enableAiScoring ? 'AI Đã tắt (Admin)' : 'AI Chấm điểm'}</span>
                </button>
              </div>
            </div>

            {scoreError && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
                <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0" /><span>{scoreError}</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): AI Scorecard (Matching ui_writing_ai.png) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-purple-900/40 flex flex-col justify-between min-h-[580px]">
            <div>
              {/* Score Header Card */}
              <div className="bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-1">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span>{currentResult.scoringEngine || (currentResult.isEstimated ? 'THUẬT TOÁN BAREM VSTEP' : 'KẾT QUẢ PHÂN TÍCH AI (GEMINI)')}</span>
                </div>
                {currentResult.isEstimated && (
                  <span className="inline-block mb-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    Đoán điểm theo Barem Thuật toán VSTEP
                  </span>
                )}
                <div className="flex items-baseline justify-center gap-2 mt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-purple-900 dark:text-purple-100">
                    {currentResult.overallScore.toFixed(1)}
                  </span>
                  <span className="text-sm font-medium text-gray-500">/ 10.0</span>
                  <span className="ml-3 px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                    Xếp bậc: {currentResult.vstepLevel} CEFR
                  </span>
                </div>
                <p className="text-[11px] text-purple-700 dark:text-purple-300 mt-1">
                  Đạt chuẩn đầu ra Thạc sĩ / Giảng viên B2 theo Quyết định 729/QĐ-BGDĐT
                </p>
              </div>

              {/* 4 Rubric Bars (Matching ui_writing_ai.png) */}
              <div className="space-y-3.5 mb-6">
                {[
                  {
                    title: 'Task Fulfillment (Hoàn thành yêu cầu):',
                    score: currentResult.taskAchievement,
                    color: 'bg-emerald-500',
                    textColor: 'text-emerald-600 dark:text-emerald-400',
                  },
                  {
                    title: 'Organization & Cohesion (Bố cục mạch lạc):',
                    score: currentResult.coherence,
                    color: 'bg-blue-600',
                    textColor: 'text-blue-600 dark:text-blue-400',
                  },
                  {
                    title: 'Lexical Resource (Vốn từ vựng học thuật):',
                    score: currentResult.lexicalResource,
                    color: 'bg-amber-500',
                    textColor: 'text-amber-600 dark:text-amber-400',
                  },
                  {
                    title: 'Grammatical Accuracy (Độ chuẩn ngữ pháp):',
                    score: currentResult.grammar,
                    color: 'bg-indigo-600',
                    textColor: 'text-indigo-600 dark:text-indigo-400',
                  },
                ].map((rubric) => (
                  <div key={rubric.title} className="text-xs">
                    <div className="flex items-center justify-between mb-1 font-semibold text-gray-700 dark:text-gray-300">
                      <span>{rubric.title}</span>
                      <span className={`font-bold ${rubric.textColor}`}>{rubric.score.toFixed(1)} / 10</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${(rubric.score / 10) * 100}%` }}
                        className={`h-full rounded-full ${rubric.color} transition-all duration-700`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback & Error Corrections (Matching ui_writing_ai.png) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                  Nhận xét sửa lỗi ngữ pháp & Gợi ý nâng cao:
                </h4>

                {/* Error Item 1: Collocation */}
                <div className="p-3.5 rounded-xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-800/60 text-xs space-y-1">
                  <div className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 inline" /> Lỗi Collocation: 'make timely arrangements'
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gợi ý viết lại: <em>'make appropriate preparations'</em> hoặc <em>'take necessary steps'</em> để chuẩn văn phong trang trọng.
                  </p>
                </div>

                {/* Error Item 2: Vocabulary Highlight */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-600 inline" /> Điểm sáng Từ vựng: 'prestigious', 'competent applicants', 'milestones'
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Đánh giá: Thể hiện vốn từ học thuật B2-C1 phong phú, cách diễn đạt mạch lạc tự nhiên.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Button: View Sample Essay */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowSampleModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold text-center transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-blue-600 inline" /> Xem bài viết mẫu đạt chuẩn C1 VSTEP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Sample Answer C1 */}
      {showSampleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 inline" /> Bài viết mẫu đạt chuẩn C1 VSTEP
              </h3>
              <button
                onClick={() => setShowSampleModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-500 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm leading-relaxed text-gray-800 dark:text-gray-200 max-h-[60vh] overflow-y-auto whitespace-pre-line scrollbar-thin">
              {task.sampleAnswer}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSampleModal(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

