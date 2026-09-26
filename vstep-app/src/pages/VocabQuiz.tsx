import { useState, useMemo, useEffect } from 'react';
import { useBookmarks } from '../context/BookmarkContext';

export default function VocabQuiz() {
  const { savedWords } = useBookmarks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  // Need at least 4 words to generate quiz
  if (savedWords.length < 4) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">📝</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Cần ít nhất 4 từ
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Bạn cần lưu ít nhất 4 từ vựng để tạo bài kiểm tra.
          Hiện có: {savedWords.length} từ.
        </p>
      </div>
    );
  }

  // Shuffle words for quiz
  const quizWords = useMemo(() => {
    return [...savedWords].sort(() => Math.random() - 0.5);
  }, [savedWords.length]);

  const totalQuestions = Math.min(quizWords.length, 10);

  const currentQuestion = useMemo(() => {
    if (currentIndex >= totalQuestions) return null;
    const word = quizWords[currentIndex];
    // Generate 3 wrong answers from other words
    const otherWords = savedWords
      .filter((w) => w.word !== word.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [
      { text: word.meaning, correct: true },
      ...otherWords.map((w) => ({ text: w.meaning, correct: false })),
    ].sort(() => Math.random() - 0.5);

    return { word: word.word, example: word.example, options };
  }, [currentIndex, quizWords, savedWords]);

  if (finished || !currentQuestion) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="text-center py-12 space-y-6 max-w-md mx-auto">
        <div className="card">
          <p className="text-5xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kết quả kiểm tra
          </h2>
          <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mt-3">
            {score}/{totalQuestions}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {percentage >= 80 ? 'Xuất sắc! Bạn nắm vững từ vựng rồi!' :
             percentage >= 60 ? 'Khá tốt! Hãy ôn thêm những từ sai.' :
             'Cần luyện thêm. Hãy xem lại flashcard nhé!'}
          </p>
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setAnswered(false); setSelectedAnswer(null); }}
          className="btn-primary text-lg px-6 py-3"
        >
          🔄 Làm lại
        </button>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (currentQuestion.options[index].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= totalQuestions) {
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
      className={`space-y-8 max-w-2xl mx-auto${answered ? ' cursor-pointer' : ''}`}
      onClick={handleAdvanceClick}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📝 Kiểm tra từ vựng
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Chọn nghĩa đúng của từ
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Câu {currentIndex + 1}/{totalQuestions}</span>
        <span>Đúng: {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="card text-center">
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {currentQuestion.word}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          "{currentQuestion.example}"
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          let className = 'w-full text-left p-4 rounded-lg border-2 transition-colors font-medium ';
          if (!answered) {
            className += selectedAnswer === index
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20';
          } else {
            if (option.correct) {
              className += 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
            } else if (index === selectedAnswer && !option.correct) {
              className += 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
            } else {
              className += 'border-gray-200 dark:border-gray-600 opacity-50';
            }
          }

          return (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); handleAnswer(index); }}
              className={className}
              disabled={answered}
            >
              <span className="mr-2 text-gray-400">{String.fromCharCode(65 + index)}.</span>
              <span className="dark:text-gray-200">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Next */}
      {answered && (
        <div className="text-center" onClick={(e) => e.stopPropagation()}>
          <button onClick={nextQuestion} className="btn-primary text-lg px-8 py-3">
            {currentIndex + 1 >= totalQuestions ? 'Xem kết quả' : 'Câu tiếp →'}
          </button>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nhấn Enter hoặc click để qua câu</p>
        </div>
      )}
    </div>
  );
}
