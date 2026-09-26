import { useState, useMemo, useEffect } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const allQuizQuestions: QuizQuestion[] = [
  {
    question: 'Thì Present Perfect dùng khi nào?',
    options: [
      'Hành động đã hoàn thành trong quá khứ, không liên quan hiện tại',
      'Hành động bắt đầu trong quá khứ và liên quan đến hiện tại',
      'Hành động sẽ xảy ra trong tương lai',
      'Hành động đang xảy ra ngay lúc nói'
    ],
    correctAnswer: 1,
    explanation: 'Present Perfect diễn tả hành động bắt đầu trong quá khứ, kết quả/ảnh hưởng còn liên quan đến hiện tại. Ví dụ: I have lived here for 5 years.'
  },
  {
    question: 'Câu điều kiện loại 2 diễn tả điều gì?',
    options: [
      'Sự thật hiển nhiên',
      'Điều có thể xảy ra trong tương lai',
      'Điều không có thật ở hiện tại',
      'Điều không có thật ở quá khứ'
    ],
    correctAnswer: 2,
    explanation: 'Câu điều kiện loại 2: If + S + V(past), S + would + V. Diễn tả điều không có thật/giả định ở hiện tại.'
  },
  {
    question: '"Despite" được theo sau bởi gì?',
    options: [
      'Một mệnh đề hoàn chỉnh (S + V)',
      'Một danh từ hoặc V-ing',
      'Một tính từ',
      'Một trạng từ'
    ],
    correctAnswer: 1,
    explanation: 'Despite + N/V-ing. Ví dụ: Despite the rain, we went out. Despite being tired, she continued working.'
  },
  {
    question: 'Đâu là cách dùng đúng của "whom"?',
    options: [
      'The man whom called me is my father',
      'The man whom I met yesterday is my teacher',
      'Whom is going to the party?',
      'I know whom is responsible'
    ],
    correctAnswer: 1,
    explanation: '"Whom" thay thế cho tân ngữ (object) trong mệnh đề quan hệ. "The man whom I met" - "whom" thay cho "the man" làm tân ngữ của "met".'
  },
  {
    question: 'Signal word "Nevertheless" có nghĩa tương tự từ nào?',
    options: ['Therefore', 'However', 'Moreover', 'Because'],
    correctAnswer: 1,
    explanation: '"Nevertheless" = "However" = Tuy nhiên. Dùng để nối hai ý tương phản.'
  },
  {
    question: 'Câu bị động của "They are building a new school" là gì?',
    options: [
      'A new school is being built',
      'A new school was built',
      'A new school has been built',
      'A new school will be built'
    ],
    correctAnswer: 0,
    explanation: 'Present Continuous Passive: am/is/are + being + V3. "They are building" → "A new school is being built."'
  },
  {
    question: 'Trong VSTEP Reading, "Not Given" nghĩa là gì?',
    options: [
      'Thông tin sai so với bài đọc',
      'Thông tin đúng nhưng không quan trọng',
      'Thông tin không được đề cập trong bài đọc',
      'Thông tin chỉ đúng một phần'
    ],
    correctAnswer: 2,
    explanation: '"Not Given" = thông tin KHÔNG xuất hiện trong bài đọc. Khác với "False" là thông tin có nhưng trái ngược.'
  },
  {
    question: 'Cấu trúc nào dùng để đưa ra đề xuất trong Writing Task 2?',
    options: [
      'I want to say that...',
      'It is recommended that... / One solution would be to...',
      'I like to suggest...',
      'My opinion says that...'
    ],
    correctAnswer: 1,
    explanation: 'Academic writing cần formal structures: "It is recommended that...", "One solution would be to...", "It could be argued that..."'
  },
  {
    question: 'Từ "sustainability" thuộc chủ đề nào?',
    options: ['Education', 'Technology', 'Environment', 'Health'],
    correctAnswer: 2,
    explanation: '"Sustainability" (bền vững) thường xuất hiện trong chủ đề Environment - môi trường.'
  },
  {
    question: 'Trong Speaking Part 3, bạn nên làm gì?',
    options: [
      'Chỉ trả lời Yes hoặc No',
      'Đưa quan điểm rõ ràng, có lý do và ví dụ',
      'Đọc thuộc lòng bài mẫu',
      'Nói càng nhanh càng tốt'
    ],
    correctAnswer: 1,
    explanation: 'Speaking Part 3 yêu cầu thảo luận sâu: đưa quan điểm + giải thích lý do + đưa ví dụ minh họa.'
  },
  {
    question: '"Carbon footprint" nghĩa là gì?',
    options: [
      'Dấu chân để lại trên mặt đất',
      'Lượng khí carbon thải ra bởi một cá nhân/tổ chức',
      'Loại năng lượng mới',
      'Cách đo khoảng cách'
    ],
    correctAnswer: 1,
    explanation: '"Carbon footprint" = dấu chân carbon, chỉ tổng lượng khí thải carbon dioxide do hoạt động của một cá nhân hoặc tổ chức.'
  },
  {
    question: 'Linking word nào dùng để thêm thông tin?',
    options: ['However', 'Furthermore', 'Nevertheless', 'On the other hand'],
    correctAnswer: 1,
    explanation: '"Furthermore" = Hơn nữa, dùng để bổ sung thêm thông tin. Tương tự: Moreover, In addition, Additionally.'
  },
];

export default function KnowledgeQuiz() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    return [...allQuizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [started]);

  if (!started) {
    return (
      <div className="text-center py-12 max-w-md mx-auto space-y-6">
        <p className="text-5xl">🧠</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Kiểm tra kiến thức VSTEP
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          10 câu hỏi về ngữ pháp, từ vựng, và chiến thuật thi VSTEP.
          Kiểm tra xem bạn nắm vững kiến thức đến đâu!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="btn-primary text-lg px-8 py-3"
        >
          Bắt đầu kiểm tra
        </button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-12 space-y-6 max-w-md mx-auto">
        <div className="card">
          <p className="text-5xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📖'}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kết quả kiểm tra
          </h2>
          <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mt-3">
            {score}/{questions.length}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
            {percentage}% đúng
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {percentage >= 80 ? 'Xuất sắc! Kiến thức VSTEP rất vững!' :
             percentage >= 60 ? 'Khá tốt! Ôn thêm những phần còn yếu.' :
             'Cần ôn luyện thêm. Xem lại mục Kiến thức nhé!'}
          </p>
        </div>
        <button
          onClick={() => { setStarted(false); setCurrentIndex(0); setScore(0); setFinished(false); setAnswered(false); setSelectedAnswer(null); }}
          className="btn-primary text-lg px-6 py-3"
        >
          🔄 Làm lại
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === q.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  // Enter key to advance when answered
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && answered && !e.repeat) {
        e.preventDefault();
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, currentIndex]);

  // Click anywhere to advance when answered
  const handleAdvanceClick = () => {
    if (answered) {
      nextQuestion();
    }
  };

  return (
    <div
      className={`space-y-6 max-w-2xl mx-auto${answered ? ' cursor-pointer' : ''}`}
      onClick={handleAdvanceClick}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          🧠 Kiểm tra kiến thức
        </h1>
      </div>

      {/* Progress */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Câu {currentIndex + 1}/{questions.length}</span>
        <span>Đúng: {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="card">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((option, index) => {
          let className = 'w-full text-left p-4 rounded-lg border-2 transition-colors ';
          if (!answered) {
            className += 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-800 dark:text-gray-200';
          } else {
            if (index === q.correctAnswer) {
              className += 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
            } else if (index === selectedAnswer && index !== q.correctAnswer) {
              className += 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
            } else {
              className += 'border-gray-200 dark:border-gray-600 opacity-50 text-gray-600 dark:text-gray-400';
            }
          }

          return (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); handleAnswer(index); }}
              className={className}
              disabled={answered}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-medium">💡 Giải thích:</span> {q.explanation}
          </p>
        </div>
      )}

      {/* Next */}
      {answered && (
        <div className="text-center" onClick={(e) => e.stopPropagation()}>
          <button onClick={nextQuestion} className="btn-primary text-lg px-8 py-3">
            {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp →'}
          </button>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nhấn Enter hoặc click để qua câu</p>
        </div>
      )}
    </div>
  );
}
