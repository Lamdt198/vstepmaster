import { useState } from 'react';
import { chineseLessons, ChineseLesson } from '../../data/lessonsData';

export default function ChineseLessons() {
  const [selected, setSelected] = useState<ChineseLesson | null>(null);
  const [levelFilter, setLevelFilter] = useState<number>(0); // 0 = all

  const filtered = levelFilter === 0 ? chineseLessons : chineseLessons.filter(l => l.level === levelFilter);

  if (selected) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button onClick={() => setSelected(null)} className="text-red-600 dark:text-red-400 hover:underline text-sm">← Quay lại danh sách</button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selected.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{selected.description}</p>
          <div className="flex gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">HSK{selected.level}</span>
            <span>🎬 {selected.duration}</span>
          </div>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
          <iframe src={selected.videoUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={selected.title} />
        </div>
        <div className="card">
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
            {selected.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1">{line.replace('### ', '')}</h3>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
              if (line.startsWith('|')) return <p key={i} className="font-mono text-xs">{line}</p>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🎬 Bài giảng tiếng Trung</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Video bài giảng HSK theo level, kèm nội dung chi tiết bên dưới.</p>
      </div>
      <div className="flex gap-2">
        {[0,1,2,3,4].map(lv => (
          <button key={lv} onClick={() => setLevelFilter(lv)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${levelFilter === lv ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            {lv === 0 ? 'Tất cả' : `HSK ${lv}`}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(lesson => (
          <button key={lesson.id} onClick={() => setSelected(lesson)}
            className="card text-left hover:shadow-md transition-all hover:scale-[1.01] border-l-4 border-l-red-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{lesson.title}</h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex-shrink-0 ml-2">HSK{lesson.level}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{lesson.description}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span>🎬 {lesson.duration}</span>
              <span className="capitalize">📂 {lesson.category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
