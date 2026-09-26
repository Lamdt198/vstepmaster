import { Link } from 'react-router-dom';

const features = [
  { path: '/chinese/vocabulary', icon: '📝', title: 'Từ vựng HSK', desc: 'Học từ vựng HSK 1-6 với pinyin, nghĩa, ví dụ' },
  { path: '/chinese/flashcards', icon: '🃏', title: 'Flashcards', desc: 'Lật thẻ học Hán tự + pinyin + nghĩa' },
  { path: '/chinese/grammar', icon: '📐', title: 'Ngữ pháp', desc: 'Cấu trúc ngữ pháp HSK theo level' },
  { path: '/chinese/reading', icon: '📖', title: 'Đọc hiểu', desc: 'Đọc đoạn văn + trả lời câu hỏi' },
  { path: '/chinese/quiz', icon: '🧠', title: 'Thi thử HSK', desc: 'Kiểm tra từ vựng + ngữ pháp' },
];

export default function ChineseHub() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-8">
        <p className="text-5xl mb-4">🇨🇳</p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          学中文 - Học tiếng Trung
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-3 max-w-xl mx-auto">
          Luyện thi HSK từ cơ bản đến nâng cao. Từ vựng, ngữ pháp, đọc hiểu, flashcards.
        </p>
      </section>

      {/* Features grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <Link
            key={f.path}
            to={f.path}
            className="card border-2 border-red-100 dark:border-red-900/30 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <p className="text-3xl mb-2">{f.icon}</p>
            <h3 className="font-bold text-gray-900 dark:text-white">{f.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.desc}</p>
          </Link>
        ))}
      </section>

      {/* HSK Info */}
      <section className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">HSK là gì?</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          <strong className="text-gray-900 dark:text-white">HSK</strong> (汉语水平考试 - Hànyǔ Shuǐpíng Kǎoshì)
          là kỳ thi năng lực tiếng Trung quốc tế duy nhất do Trung Quốc tổ chức.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Level</th>
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Từ vựng</th>
                <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Tương đương</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
              <tr><td className="px-3 py-2">HSK 1</td><td className="px-3 py-2">150 từ</td><td className="px-3 py-2">A1</td></tr>
              <tr><td className="px-3 py-2">HSK 2</td><td className="px-3 py-2">300 từ</td><td className="px-3 py-2">A2</td></tr>
              <tr><td className="px-3 py-2">HSK 3</td><td className="px-3 py-2">600 từ</td><td className="px-3 py-2">B1</td></tr>
              <tr><td className="px-3 py-2">HSK 4</td><td className="px-3 py-2">1200 từ</td><td className="px-3 py-2">B2</td></tr>
              <tr><td className="px-3 py-2">HSK 5</td><td className="px-3 py-2">2500 từ</td><td className="px-3 py-2">C1</td></tr>
              <tr><td className="px-3 py-2">HSK 6</td><td className="px-3 py-2">5000 từ</td><td className="px-3 py-2">C2</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
