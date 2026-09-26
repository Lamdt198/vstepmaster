import { hskGrammar } from '../../data/hskData';

function speakChinese(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN'; u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

export default function ChineseGrammar() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📐 Ngữ pháp HSK</h1>
      <p className="text-gray-600 dark:text-gray-300">Các cấu trúc ngữ pháp quan trọng theo từng cấp độ HSK.</p>

      <div className="space-y-4">
        {hskGrammar.map((g) => (
          <details key={g.id} className="card group">
            <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
              <span>
                <span className="text-red-500 mr-2">HSK{g.level}</span>
                {g.title}
              </span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <p className="text-sm font-mono text-red-800 dark:text-red-300">{g.structure}</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{g.explanation}</p>
              <div className="space-y-2">
                {g.examples.map((ex, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <button onClick={() => speakChinese(ex.chinese)}
                      className="text-red-500 hover:text-red-700 mt-0.5 flex-shrink-0">🔊</button>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{ex.chinese}</p>
                      <p className="text-xs text-red-500 dark:text-red-400">{ex.pinyin}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">{ex.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
