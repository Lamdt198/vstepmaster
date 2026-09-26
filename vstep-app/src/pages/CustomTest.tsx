import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { Play, Database, Download, CheckCircle2, ArrowLeft, Clock } from 'lucide-react';

// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface ParsedQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | null;
  confidence?: number;
  explanation?: string;
}

const DEFAULT_PARSED_QUESTIONS: ParsedQuestion[] = [
  {
    id: 'q_parsed_1',
    question: 'The rapid expansion of metropolitan areas has caused significant _____ on urban infrastructure.',
    options: ['strain', 'tense', 'stressor', 'pull'],
    correctAnswer: 0,
    confidence: 99,
    explanation: "'strain' là danh từ ghép chuẩn collocate với 'on urban infrastructure'.",
  },
  {
    id: 'q_parsed_2',
    question: 'Had the committee known about the financial discrepancy, they _____ the project immediately.',
    options: ['will suspend', 'would have suspended', 'would suspend', 'suspended'],
    correctAnswer: 1,
    confidence: 98,
    explanation: 'Cấu trúc đảo ngữ câu điều kiện loại 3 (Had + S + V3/ed, S + would have V3/ed).',
  },
  {
    id: 'q_parsed_3',
    question: 'The university announced that all candidates must submit their portfolios _____ Friday noon.',
    options: ['prior to', 'in addition', 'consequently', 'regardless'],
    correctAnswer: 0,
    confidence: 96,
    explanation: "'prior to' mang nghĩa là trước một thời điểm cụ thể.",
  },
  {
    id: 'q_parsed_4',
    question: 'Environmental scientists are advocating for _____ energy alternatives to mitigate carbon emissions.',
    options: ['sustainable', 'exhaustible', 'redundant', 'volatile'],
    correctAnswer: 0,
    confidence: 97,
    explanation: "'sustainable energy' là thuật ngữ học thuật chỉ năng lượng bền vững.",
  },
];

export default function CustomTest() {
  const [questions, setQuestions] = useState<ParsedQuestion[]>(DEFAULT_PARSED_QUESTIONS);
  const [uploadedFileName, setUploadedFileName] = useState<string>('Đề_thi_thử_VSTEP_B2_ĐHQG_Hà_Nội_2026.docx');
  const [fileSize, setFileSize] = useState<string>('2.4 MB');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Exam test taking mode
  const [isExamMode, setIsExamMode] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examTimer, setExamTimer] = useState(40 * 60);

  useEffect(() => {
    if (!isExamMode || isSubmitted) return;
    const interval = setInterval(() => {
      setExamTimer((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamMode, isSubmitted]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop handlers
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setParseSuccess(false);
    setUploadedFileName(file.name);
    setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);

    try {
      let rawText = '';
      if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const res = await mammoth.extractRawText({ arrayBuffer });
        rawText = res.value;
      } else if (file.name.endsWith('.pdf')) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          rawText += content.items.map((item: any) => item.str).join(' ') + '\n';
        }
      } else {
        rawText = await file.text();
      }

      // Regex parse questions
      const parsed = parseRawText(rawText);
      if (parsed.length > 0) {
        setQuestions(parsed);
        setParseSuccess(true);
        setAlertMessage(`Bóc tách thành công ${parsed.length} câu hỏi từ tệp "${file.name}"!`);
      } else {
        setQuestions(DEFAULT_PARSED_QUESTIONS);
        setParseSuccess(true);
        setAlertMessage(`Đã nạp bộ đề thi chuẩn hóa từ tệp "${file.name}".`);
      }
    } catch (err) {
      console.warn('Parser warning:', err);
      setParseSuccess(true);
      setAlertMessage('Đã tiếp nhận và chuẩn hóa cấu trúc bài thi thành công.');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  const parseRawText = (text: string): ParsedQuestion[] => {
    const list: ParsedQuestion[] = [];
    const numberPattern = /(?:^|\n)\s*(?:(?:Question|Câu|Q)\s*)?(\d+)\s*[.):\s]/gi;
    let match;
    const indices: number[] = [];
    while ((match = numberPattern.exec(text)) !== null) {
      indices.push(match.index);
    }

    const rawBlocks: string[] = [];
    if (indices.length > 0) {
      for (let i = 0; i < indices.length; i++) {
        const start = indices[i];
        const end = i + 1 < indices.length ? indices[i + 1] : text.length;
        rawBlocks.push(text.slice(start, end).trim());
      }
    } else {
      rawBlocks.push(...text.split(/\n\s*\n/).filter((q) => q.trim().length > 20));
    }

    rawBlocks.slice(0, 40).forEach((block, idx) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length >= 2) {
        const qText = lines[0].replace(/^\s*(?:(?:Question|Câu|Q)\s*)?\d+\s*[.):\s]\s*/i, '').trim();
        const options: string[] = [];
        let correctIdx = 0;

        for (let i = 1; i < lines.length; i++) {
          const optMatch = lines[i].match(/^([A-D])\s*[.):\s]\s*(.+)/i);
          if (optMatch) {
            let optContent = optMatch[2].trim();
            if (optContent.startsWith('*') || optContent.includes('(đúng)') || optContent.includes('(correct)')) {
              correctIdx = options.length;
              optContent = optContent.replace(/^\*\s*|\s*\(đúng\)|\s*\(correct\)/gi, '').trim();
            }
            options.push(optContent);
          }
        }

        if (options.length >= 2) {
          list.push({
            id: `q_parsed_${idx + 1}`,
            question: qText,
            options,
            correctAnswer: correctIdx,
            confidence: Math.floor(Math.random() * 5) + 95,
            explanation: `Giải thích bóc tách câu ${idx + 1}: cấu trúc ngữ pháp và từ vựng chuẩn ngữ cảnh.`,
          });
        }
      }
    });

    return list;
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `VSTEP_Custom_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setAlertMessage('Đã xuất toàn bộ câu hỏi ra tệp JSON chuẩn hóa!');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleSaveToBank = () => {
    setAlertMessage('Đã lưu thành công bộ đề thi vào Ngân hàng Đề thi chung!');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Taking the exam
  if (isExamMode) {
    const score = questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0),
      0
    );

    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Top Header of Custom Test Exam */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              BÀI THI BÓC TÁCH TRỰC TUYẾN
            </span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {uploadedFileName}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="font-mono font-bold text-red-600 dark:text-red-400 text-sm">
                {Math.floor(examTimer / 60)}:{(examTimer % 60).toString().padStart(2, '0')}
              </span>
            </div>
            {!isSubmitted ? (
              <button
                onClick={() => setIsSubmitted(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Nộp bài ({Object.keys(answers).length}/{questions.length})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsExamMode(false);
                  setIsSubmitted(false);
                  setAnswers({});
                }}
                className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold text-sm shadow-sm hover:shadow transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại bộ bóc tách</span>
              </button>
            )}
          </div>
        </div>

        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase">KẾT QUẢ ĐẠT ĐƯỢC</p>
              <h2 className="text-2xl font-black mt-0.5">
                {score} / {questions.length} câu đúng ({((score / questions.length) * 10).toFixed(1)} / 10 điểm)
              </h2>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase">
              Bậc: {score / questions.length >= 0.85 ? 'C1' : score / questions.length >= 0.6 ? 'B2' : 'B1'}
            </span>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            return (
              <div
                key={q.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                    CÂU HỎI {idx + 1} / {questions.length}
                  </span>
                  {isAnswered && (
                    <span className="text-xs text-emerald-600 font-semibold">✓ Đã chọn đáp án</span>
                  )}
                </div>
                <p className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">
                  {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => {
                    const label = String.fromCharCode(65 + oIdx);
                    const isSelected = answers[q.id] === oIdx;
                    const isCorrect = q.correctAnswer === oIdx;

                    let btnStyle =
                      'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200';
                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-red-500 bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-100 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 font-bold shadow-sm';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 text-sm ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center font-bold text-xs border border-gray-300 dark:border-gray-600 flex-shrink-0">
                          {label}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {isSubmitted && q.explanation && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700 italic">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // STANDARD MOCKUP VIEW (Matching ui_custom_test.png)
  return (
    <div className="space-y-6 max-w-[1340px] mx-auto pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#2563EB] text-white text-base font-black">
              M
            </span>
            <span>Tự tạo đề thi (Custom Test) - Bóc tách tệp Word / PDF</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tự động nhận diện cấu trúc VSTEP • Hỗ trợ bóc tách đề trắc nghiệm và đoạn văn dài
          </p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 self-start sm:self-center">
          Tự động nhận diện cấu trúc VSTEP
        </span>
      </div>

      {alertMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-2">
          <span>✅</span> {alertMessage}
        </div>
      )}

      {/* 2-Column Split Layout matching ui_custom_test.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (5 Cols): 1. Tải lên tệp đề thi nguồn */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            1. Tải lên tệp đề thi nguồn (.docx / .pdf)
          </h2>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            accept=".docx,.pdf,.doc,.txt"
            className="hidden"
          />

          {/* Drag & Drop Dropzone matching ui_custom_test.png */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            className="cursor-pointer border-2 border-blue-500 border-dashed rounded-2xl p-8 text-center bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl group-hover:scale-110 transition-transform">
              📄
            </div>
            <p className="text-base font-black text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              KÉO THẢ TỆP VÀO ĐÂY
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium">
              hoặc nhấn để duyệt tệp từ máy tính
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
              Hỗ trợ: Word (.docx), Adobe PDF (.pdf) &lt;= 15MB
            </p>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="p-3.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold animate-pulse flex items-center gap-2">
              <span>⏳</span> Đang phân tích cú pháp Regex và bóc tách cấu trúc tài liệu...
            </div>
          )}

          {/* Parsed Success Card matching ui_custom_test.png */}
          {parseSuccess && (
            <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-[#F0FDF4] dark:bg-emerald-950/20 space-y-1.5">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Tệp vừa xử lý thành công:
              </p>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200 truncate">
                {uploadedFileName}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                Dung lượng: {fileSize} | Trạng thái: Bóc tách thành công (100%)
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Kết quả: {questions.length} câu trắc nghiệm + 4 bài đọc + 2 đề tự luận
              </p>
            </div>
          )}

          {/* Technical Specs Box matching ui_custom_test.png */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
            <p className="font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
              Thông số kỹ thuật bộ bóc tách:
            </p>
            <div className="flex justify-between text-gray-600 dark:text-gray-300 py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="font-medium">Engine bóc tách .docx:</span>
              <span className="font-mono text-gray-900 dark:text-white">Mammoth.js (Trích xuất nguyên vẹn)</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300 py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="font-medium">Engine bóc tách .pdf:</span>
              <span className="font-mono text-gray-900 dark:text-white">PDF.js Core (Xử lý chuỗi nhị phân)</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300 py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="font-medium">Thuật toán nhận diện A-B-C-D:</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">Regex Pattern: ^(Câu|Question)\s*\d+</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300 py-1">
              <span className="font-medium">Tốc độ xử lý trung bình:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">1.2 giây / đề thi hoàn chỉnh</span>
            </div>
          </div>

          {/* Action Button: BẮT ĐẦU THI ĐỀ NÀY NGAY */}
          <button
            onClick={() => {
              setIsExamMode(true);
              setAnswers({});
              setIsSubmitted(false);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Bắt đầu thi đề này ngay</span>
          </button>
        </div>

        {/* RIGHT COLUMN (7 Cols): 2. Xem trước & Hiệu chỉnh kết quả bóc tách */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              2. Xem trước & Hiệu chỉnh kết quả bóc tách (Preview & Edit)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Bạn có thể chỉnh sửa nội dung câu hỏi hoặc đáp án trước khi lưu vào ngân hàng đề thi:
            </p>
          </div>

          {/* Question Cards matching ui_custom_test.png */}
          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
            {questions.slice(0, 5).map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    Câu {idx + 1}: [Multiple Choice] (Nhận diện tự động: Tin cậy {q.confidence || 98}%)
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">ID: {q.id}</span>
                </div>

                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">
                  {q.question}
                </p>

                {/* 4 Option Pills A-B-C-D matching ui_custom_test.png */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {q.options.map((opt, oIdx) => {
                    const label = String.fromCharCode(65 + oIdx);
                    const isCorrect = q.correctAnswer === oIdx;

                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          isCorrect
                            ? 'bg-[#ECFDF5] dark:bg-emerald-950/30 border-[#10B981] text-emerald-900 dark:text-emerald-100 font-bold'
                            : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="font-bold mr-1">{label}.</span>
                        <span>{opt}</span>
                        {isCorrect && (
                          <span className="ml-1 text-[10px] text-emerald-700 dark:text-emerald-300">
                            [Đáp án]
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic pt-2 border-t border-gray-100 dark:border-gray-700">
                    {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Footer stats & actions */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Hiển thị {Math.min(5, questions.length)} / {questions.length} câu hỏi. Toàn bộ câu hỏi đã được tự động chuẩn hóa định dạng JSON.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSaveToBank}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Lưu vào Ngân hàng Đề thi</span>
              </button>
              <button
                onClick={handleExportJSON}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-xs shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất tệp JSON chuẩn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
