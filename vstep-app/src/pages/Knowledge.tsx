import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { BookOpen, HelpCircle, ChevronDown } from 'lucide-react';

type Tab = 'grammar' | 'vocabulary' | 'tips';

const grammarTopics = [
  {
    id: 'g1',
    title: 'Thì trong tiếng Anh (Tenses)',
    content: `12 thì cơ bản cần nắm:

• Present Simple: I work every day (thói quen, sự thật)
• Present Continuous: I am working now (đang xảy ra)
• Present Perfect: I have worked here for 5 years (quá khứ liên quan hiện tại)
• Present Perfect Continuous: I have been working all day (kéo dài đến hiện tại)

• Past Simple: I worked yesterday (quá khứ đã kết thúc)
• Past Continuous: I was working when you called (đang xảy ra trong quá khứ)
• Past Perfect: I had worked before he arrived (trước 1 mốc quá khứ)

• Future Simple: I will work tomorrow
• Future Continuous: I will be working at 9 AM
• Be going to: I am going to work harder (kế hoạch)

Lưu ý quan trọng cho VSTEP:
- Chú ý signal words (yesterday, since, for, already, yet, etc.)
- Reading: nhận diện thì qua ngữ cảnh
- Writing: sử dụng đa dạng thì, tránh lặp lại`
  },
  {
    id: 'g2',
    title: 'Câu điều kiện (Conditionals)',
    content: `4 loại câu điều kiện:

• Type 0: If + S + V(present), S + V(present)
  → Sự thật hiển nhiên: If you heat water, it boils.

• Type 1: If + S + V(present), S + will + V
  → Có thể xảy ra: If it rains, I will stay home.

• Type 2: If + S + V(past), S + would + V
  → Không có thật ở hiện tại: If I had money, I would travel.

• Type 3: If + S + had + V3, S + would have + V3
  → Không có thật ở quá khứ: If I had studied, I would have passed.

Mixed Conditionals:
• If I had studied harder (quá khứ), I would be a doctor now (hiện tại).

Tips for VSTEP:
- Speaking/Writing: dùng Type 2 để đưa giả thuyết
- Reading: nhận diện loại câu điều kiện để hiểu ý nghĩa`
  },
  {
    id: 'g3',
    title: 'Mệnh đề quan hệ (Relative Clauses)',
    content: `Đại từ quan hệ:
• who: thay cho người
• which: thay cho vật
• that: thay cho cả người và vật (informal)
• whose: sở hữu
• where: nơi chốn
• when: thời gian

2 loại:
• Defining: thông tin cần thiết (không có dấu phẩy)
  The student who studies hard will pass.
  
• Non-defining: thông tin bổ sung (có dấu phẩy)
  My sister, who lives in HCMC, is a doctor.

Tips cho VSTEP Writing:
- Dùng relative clauses để kết hợp câu, tránh viết câu ngắn liên tục
- Tăng độ phức tạp cho bài viết → điểm cao hơn`
  },
  {
    id: 'g4',
    title: 'Câu bị động (Passive Voice)',
    content: `Cấu trúc: S + be + V3 (+ by + agent)

Active → Passive:
• They built this house in 1990. → This house was built in 1990.
• People speak English worldwide. → English is spoken worldwide.

Các thì:
• Present Simple: is/are + V3
• Past Simple: was/were + V3
• Present Perfect: has/have been + V3
• Future: will be + V3
• Modal: can/should be + V3

Khi nào dùng bị động:
1. Không biết ai làm: My bike was stolen.
2. Nhấn mạnh đối tượng: The Mona Lisa was painted by Da Vinci.
3. Văn viết academic/formal

Tips VSTEP:
- Writing Task 2: dùng passive để viết formal hơn
- Reading: nhận diện passive để hiểu đúng nghĩa câu`
  }
];

const vocabularyTopics = [
  {
    title: 'Từ vựng chủ đề Education',
    words: [
      { word: 'curriculum', meaning: 'chương trình học', example: 'The school updated its curriculum.' },
      { word: 'scholarship', meaning: 'học bổng', example: 'She received a full scholarship.' },
      { word: 'discipline', meaning: 'kỷ luật / môn học', example: 'Students need discipline to succeed.' },
      { word: 'assessment', meaning: 'đánh giá', example: 'Continuous assessment is important.' },
      { word: 'undergraduate', meaning: 'sinh viên đại học', example: 'He is an undergraduate student.' },
      { word: 'tuition', meaning: 'học phí', example: 'Tuition fees have increased.' },
      { word: 'extracurricular', meaning: 'ngoại khóa', example: 'Extracurricular activities develop soft skills.' },
      { word: 'graduate', meaning: 'tốt nghiệp', example: 'She graduated with honors.' },
    ]
  },
  {
    title: 'Từ vựng chủ đề Technology',
    words: [
      { word: 'artificial intelligence', meaning: 'trí tuệ nhân tạo', example: 'AI is transforming many industries.' },
      { word: 'innovation', meaning: 'đổi mới', example: 'Innovation drives economic growth.' },
      { word: 'automation', meaning: 'tự động hóa', example: 'Automation may replace some jobs.' },
      { word: 'cybersecurity', meaning: 'an ninh mạng', example: 'Cybersecurity is a growing concern.' },
      { word: 'digital literacy', meaning: 'kiến thức số', example: 'Digital literacy is essential today.' },
      { word: 'obsolete', meaning: 'lỗi thời', example: 'Old phones quickly become obsolete.' },
      { word: 'breakthrough', meaning: 'đột phá', example: 'A scientific breakthrough was announced.' },
      { word: 'gadget', meaning: 'thiết bị điện tử', example: 'People love buying new gadgets.' },
    ]
  },
  {
    title: 'Từ vựng chủ đề Environment',
    words: [
      { word: 'sustainability', meaning: 'bền vững', example: 'Sustainability is crucial for our future.' },
      { word: 'carbon footprint', meaning: 'dấu chân carbon', example: 'We should reduce our carbon footprint.' },
      { word: 'deforestation', meaning: 'phá rừng', example: 'Deforestation leads to biodiversity loss.' },
      { word: 'renewable energy', meaning: 'năng lượng tái tạo', example: 'Solar power is renewable energy.' },
      { word: 'ecosystem', meaning: 'hệ sinh thái', example: 'Pollution damages ecosystems.' },
      { word: 'conservation', meaning: 'bảo tồn', example: 'Wildlife conservation is important.' },
      { word: 'emission', meaning: 'khí thải', example: 'We must cut CO2 emissions.' },
      { word: 'biodiversity', meaning: 'đa dạng sinh học', example: 'Biodiversity is under threat.' },
    ]
  },
  {
    title: 'Từ vựng chủ đề Health',
    words: [
      { word: 'well-being', meaning: 'sức khỏe / hạnh phúc', example: 'Mental well-being is as important as physical health.' },
      { word: 'sedentary', meaning: 'ít vận động', example: 'A sedentary lifestyle causes many health problems.' },
      { word: 'nutrition', meaning: 'dinh dưỡng', example: 'Good nutrition is essential for children.' },
      { word: 'epidemic', meaning: 'dịch bệnh', example: 'The obesity epidemic is a global concern.' },
      { word: 'immunity', meaning: 'miễn dịch', example: 'Vaccines help build immunity.' },
      { word: 'diagnosis', meaning: 'chẩn đoán', example: 'Early diagnosis can save lives.' },
      { word: 'chronic', meaning: 'mãn tính', example: 'Chronic diseases require long-term treatment.' },
      { word: 'rehabilitation', meaning: 'phục hồi chức năng', example: 'He went through rehabilitation after the accident.' },
    ]
  }
];

const tips = [
  {
    id: 't1',
    title: 'Chiến thuật thi Listening',
    content: `Trước khi nghe:
• Đọc câu hỏi trước
• Gạch chân từ khóa
• Dự đoán đáp án

Khi nghe:
• Chú ý paraphrase
• Signal words: However, But, Actually, In fact
• Lần đầu: nắm ý chính. Lần 2: chi tiết

Sau khi nghe:
• Không bỏ trống câu nào
• Đáp án thường theo thứ tự audio
• Cẩn thận với distractors`
  },
  {
    id: 't2',
    title: 'Chiến thuật thi Reading',
    content: `Quản lý thời gian:
• 60 phút cho 4 passages → ~15 phút/passage
• Passage dễ làm trước, khó làm sau

Kỹ thuật đọc:
• Skim: đọc lướt paragraph đầu/cuối
• Scan: tìm từ khóa cụ thể
• Inference: suy luận từ ngữ cảnh

Tips:
• Đáp án thường paraphrase
• "Not Given" = thông tin KHÔNG có trong bài`
  },
  {
    id: 't3',
    title: 'Chiến thuật thi Writing',
    content: `Task 1 (Email/Letter):
• Format: Dear..., Body (3 đoạn), Closing
• Tone: Formal hoặc Semi-formal
• 120-150 từ

Task 2 (Essay):
• 4 đoạn: Intro → Body 1 → Body 2 → Conclusion
• Introduction: Hook + Background + Thesis
• Body: Topic sentence + Explanation + Example
• 220-260 từ

Linking words:
• Addition: Moreover, Furthermore
• Contrast: However, Nevertheless
• Cause/Effect: Therefore, Consequently`
  },
  {
    id: 't4',
    title: 'Chiến thuật thi Speaking',
    content: `Part 1: Trả lời 2-3 câu, thêm chi tiết
Part 2: Note keywords trong thời gian chuẩn bị
Part 3: Đưa quan điểm + reasons + examples

Fluency tips:
• Fillers: Well, Actually, I mean, Let me think...
• Tự sửa lỗi: Sorry, what I mean is...
• Paraphrase khi quên từ

Pronunciation:
• Nhấn trọng âm đúng
• Ngữ điệu lên xuống tự nhiên
• Nối âm giữa các từ`
  }
];

export default function Knowledge() {
  const [activeTab, setActiveTab] = useState<Tab>('grammar');
  const { addWord, removeWord, isWordSaved, addKnowledge, removeKnowledge, isKnowledgeSaved } = useBookmarks();

  return (
    <div className="space-y-4 animate-fadeIn flex flex-col justify-between lg:h-[calc(100vh-105px)] lg:min-h-[580px]">
      {/* Top Header & Toolbar */}
      <div className="space-y-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span>Kiến Thức Ngữ Pháp & Chiến Thuật VSTEP</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">
              Cẩm nang ngữ pháp trọng tâm, từ vựng học thuật và chiến thuật thi 4 kỹ năng. Nhấn ❤️ để lưu vào Flashcard.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
              {[
                { id: 'grammar' as Tab, label: 'Ngữ pháp', icon: '📐' },
                { id: 'vocabulary' as Tab, label: 'Từ vựng', icon: '📝' },
                { id: 'tips' as Tab, label: 'Chiến thuật', icon: '🎯' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <Link
              to="/knowledge-quiz"
              className="px-3.5 py-1.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Làm Quiz</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Content Area (Scrolls cleanly within locked viewport) */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
        {/* Grammar Tab */}
        {activeTab === 'grammar' && (
          <div className="space-y-3">
            {grammarTopics.map((topic) => {
              const saved = isKnowledgeSaved(topic.id);
              return (
                <details
                  key={topic.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xs group transition-all"
                >
                  <summary className="font-bold text-sm text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center select-none">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>{topic.title}</span>
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (saved) {
                            removeKnowledge(topic.id);
                          } else {
                            addKnowledge({ id: topic.id, title: topic.title, content: topic.content });
                          }
                        }}
                        className={`text-base transition-transform active:scale-125 cursor-pointer ${
                          saved ? 'text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'
                        }`}
                        title={saved ? 'Bỏ lưu' : 'Lưu để ôn'}
                      >
                        {saved ? '❤️' : '🤍'}
                      </button>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                    </div>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/80 text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {topic.content}
                  </div>
                </details>
              );
            })}
          </div>
        )}

        {/* Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-4">
            {vocabularyTopics.map((topic, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xs"
              >
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>{topic.title}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {topic.words.map((w, j) => {
                    const saved = isWordSaved(w.word);
                    return (
                      <div
                        key={j}
                        className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700/80 flex justify-between items-start gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 truncate">
                              {w.word}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                              {w.meaning}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic line-clamp-2">
                            "{w.example}"
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (saved) {
                              removeWord(w.word);
                            } else {
                              addWord(w);
                            }
                          }}
                          className={`text-base shrink-0 transition-transform active:scale-125 cursor-pointer ${
                            saved ? 'text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'
                          }`}
                          title={saved ? 'Bỏ lưu' : 'Lưu vào flashcard'}
                        >
                          {saved ? '❤️' : '🤍'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            {tips.map((tip) => {
              const saved = isKnowledgeSaved(tip.id);
              return (
                <details
                  key={tip.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xs group transition-all"
                >
                  <summary className="font-bold text-sm text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center select-none">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>{tip.title}</span>
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (saved) {
                            removeKnowledge(tip.id);
                          } else {
                            addKnowledge({ id: tip.id, title: tip.title, content: tip.content });
                          }
                        }}
                        className={`text-base transition-transform active:scale-125 cursor-pointer ${
                          saved ? 'text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'
                        }`}
                        title={saved ? 'Bỏ lưu' : 'Lưu để ôn'}
                      >
                        {saved ? '❤️' : '🤍'}
                      </button>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                    </div>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/80 text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {tip.content}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Info Status */}
      <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Cẩm nang khảo thí chuẩn khung năng lực ngoại ngữ 6 bậc Việt Nam (VSTEP)</span>
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">MOET Standard</span>
      </div>
    </div>
  );
}
