import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFeatureFlags } from '../context/FeatureFlagContext';
import { getMockExamBank, MockExamSet } from '../data/mockExamBank';
import { ApiClient } from '../services/apiClient';
import { speechService } from '../services/speechTranscriptionService';
import { scoreSpeaking, estimateSpeakingScore, estimateWritingScore } from '../services/aiScoring';
import { progressService } from '../services/progressService';
import SpeechTranscriberWithHighlighter from '../components/SpeechTranscriberWithHighlighter';
import { useAdaptiveGrid } from '../hooks/useAdaptiveGrid';
import {
  RotateCcw,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Star,
  Volume2,
  Bot,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  X,
  Play,
  Lightbulb,
  UploadCloud,
  Pause,
  Square,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

type SkillTab = 'listening' | 'reading' | 'writing' | 'speaking';

export default function MockTest() {
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const [searchParams, setSearchParams] = useSearchParams();

  const candidateName = user?.displayName || 'Nguyễn Văn An';
  const candidateSBD = user?.username === 'admin' ? 'VSTEP-ADMIN-01' : 'VSTEP-2026-089';

  // 0. EXAM BANK STATE
  const [examBank] = useState<MockExamSet[]>(() => getMockExamBank());
  const initialExamId = searchParams.get('exam') || examBank[0].id;
  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId);
  const [activeReviewTab, setActiveReviewTab] = useState<'listening' | 'reading'>('listening');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [viewMode, setViewMode] = useState<'bank' | 'exam'>(searchParams.get('exam') ? 'exam' : 'bank');
  const [bankPage, setBankPage] = useState(1);
  const [levelFilter, setLevelFilter] = useState<'all' | 'B1' | 'B2' | 'C1'>('all');
  const [showBankModal, setShowBankModal] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // User completed exams tracking
  const [completedExams, setCompletedExams] = useState<Record<string, { score: number; band: string; date: string }>>(() => {
    return progressService.getCompletedExams(user?.username);
  });

  useEffect(() => {
    const refreshCompleted = () => {
      setCompletedExams(progressService.getCompletedExams(user?.username));
    };
    refreshCompleted();

    progressService.syncWithBackend(user?.username).then(() => {
      refreshCompleted();
    });

    window.addEventListener('vstep_progress_updated', refreshCompleted);
    return () => window.removeEventListener('vstep_progress_updated', refreshCompleted);
  }, [user?.username]);

  // Active exam object
  const currentExam = examBank.find((e) => e.id === selectedExamId) || examBank[0];

  const [activeTab, setActiveTab] = useState<SkillTab>('listening');
  const [timeLeft, setTimeLeft] = useState(flags.mockTestDurationMinutes * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);

  useEffect(() => {
    ApiClient.getExams().then(exams => {
      if (exams && exams.length > 0) {
        console.log('[MockTest] Synced with C# ASP.NET Core Backend SQLite exams:', exams.length);
      }
    }).catch(err => {
      console.warn('[MockTest] C# Backend offline fallback:', err?.message);
    });
  }, []);

  // 1. LISTENING STATE
  const [listeningPart, setListeningPart] = useState<number>(1);
  const [listeningQIndex, setListeningQIndex] = useState(0);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({});
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration] = useState(210); // 3:30
  const [showTranscript, setShowTranscript] = useState(false);
  const audioIntervalRef = useRef<number | null>(null);

  // 2. READING STATE
  const [readingPassageIndex, setReadingPassageIndex] = useState(0);
  const [readingQIndex, setReadingQIndex] = useState(0);
  const [readingAnswers, setReadingAnswers] = useState<Record<number, number>>({
    0: 1, 1: 0, 2: 2, 3: 1, 4: 3, 5: 0, 6: 2, 7: 1, 8: 0, 9: 2,
    10: 1, 11: 3, 12: 0, 13: 1, 14: 2, 15: 0, 16: 3, 17: 1,
  });

  // 3. WRITING STATE
  const [writingTask, setWritingTask] = useState<'task1' | 'task2'>('task1');
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');

  // 4. SPEAKING STATE
  const [speakingPart, setSpeakingPart] = useState<number>(1);
  const [isSpeakingRecording, setIsSpeakingRecording] = useState(false);
  const [speakingSeconds, setSpeakingSeconds] = useState(0);
  const [speakingAudioUrl, setSpeakingAudioUrl] = useState<string | null>(null);
  const [speakingEvaluation, setSpeakingEvaluation] = useState<any | null>(null);
  const [speakingTranscript, setSpeakingTranscript] = useState('');
  const [speakingInterim, setSpeakingInterim] = useState('');
  const [isEvaluatingSpeaking, setIsEvaluatingSpeaking] = useState(false);
  const speakingMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speakingAudioChunksRef = useRef<Blob[]>([]);
  const speakingTimerRef = useRef<number | null>(null);

  // Dynamic skill contents from chosen exam
  const currentListeningTest =
    listeningPart === 1
      ? currentExam.listening.part1
      : listeningPart === 2
      ? currentExam.listening.part2
      : currentExam.listening.part3;

  const mockReadingPassages = currentExam.reading.passages.map((p, idx) => ({
    title: `PASSAGE ${idx + 1}: ${p.title.toUpperCase()}`,
    text: p.passage,
    questions: p.questions,
  }));

  const currentSpeakingTopic =
    speakingPart === 1
      ? currentExam.speaking.part1
      : speakingPart === 2
      ? currentExam.speaking.part2
      : currentExam.speaking.part3;

  // Filter exams in bank
  const filteredExams = levelFilter === 'all'
    ? examBank
    : examBank.filter((exam) => exam.level === levelFilter || exam.level.includes(levelFilter));

  const { cols, rows, itemsPerPage } = useAdaptiveGrid();
  const totalBankPages = Math.ceil(filteredExams.length / itemsPerPage) || 1;
  const validBankPage = Math.min(bankPage, totalBankPages);
  const paginatedExams = filteredExams.slice(
    (validBankPage - 1) * itemsPerPage,
    validBankPage * itemsPerPage
  );

  useEffect(() => {
    if (bankPage > totalBankPages) {
      setBankPage(Math.max(1, totalBankPages));
    }
  }, [totalBankPages, bankPage]);

  const handleStartExam = (examId: string) => {
    setSelectedExamId(examId);
    setSearchParams({ exam: examId });
    setViewMode('exam');
    setShowBankModal(false);
    setActiveTab('listening');
    setListeningPart(1);
    setListeningQIndex(0);
    setListeningAnswers({});
    setReadingPassageIndex(0);
    setReadingQIndex(0);
    setReadingAnswers({ 0: 1, 1: 0, 2: 2, 3: 1, 4: 3 });
    setWritingTask('task1');
    setTask1Text('');
    setTask2Text('');
    setSpeakingPart(1);
    setSpeakingAudioUrl(null);
    setSpeakingEvaluation(null);
    setTimeLeft(flags.mockTestDurationMinutes * 60);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize duration if admin changes setting
  useEffect(() => {
    if (!isSubmitted) {
      setTimeLeft(flags.mockTestDurationMinutes * 60);
    }
  }, [flags.mockTestDurationMinutes, isSubmitted]);

  // Countdown timer effect
  useEffect(() => {
    if (isSubmitted || viewMode !== 'exam') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, viewMode]);

  // Anti-cheat detection
  useEffect(() => {
    if (!flags.strictAntiCheat || isSubmitted || viewMode !== 'exam') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const warningMsg = `CẢNH BÁO AN NINH: Phát hiện chuyển tab hoặc rời khỏi màn hình làm bài! Hành động đã được ghi vào nhật ký an ninh.`;
        setSecurityWarning(warningMsg);
        setTimeout(() => setSecurityWarning(null), 6000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [flags.strictAntiCheat, isSubmitted, viewMode]);

  // AUDIO PLAYER HANDLER (Listening)
  const togglePlayListening = () => {
    if (isAudioPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setIsAudioPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.warn('Web Audio chime not supported', e);
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = currentListeningTest.transcript || 'This is the VSTEP listening audio test.';
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = audioSpeed;
      utterance.onend = () => {
        setIsAudioPlaying(false);
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      };
      utterance.onerror = () => {
        setIsAudioPlaying(false);
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      };
      window.speechSynthesis.speak(utterance);
    }

    setIsAudioPlaying(true);
    setAudioCurrentTime(0);
    audioIntervalRef.current = window.setInterval(() => {
      setAudioCurrentTime((prev) => {
        if (prev >= audioDuration) {
          if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
          setIsAudioPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleSpeedChange = (speed: number) => {
    setAudioSpeed(speed);
    if (isAudioPlaying) {
      togglePlayListening();
      setTimeout(() => togglePlayListening(), 100);
    }
  };

  // SPEAKING HANDLERS
  const playExaminerQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startSpeakingRecording = async () => {
    try {
      setSpeakingEvaluation(null);
      setSpeakingAudioUrl(null);
      speakingAudioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      speakingMediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          speakingAudioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(speakingAudioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setSpeakingAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsSpeakingRecording(true);
      setSpeakingSeconds(0);

      // Kích hoạt nhận diện giọng nói Speech-to-Text song song
      setSpeakingInterim('');
      speechService.startListening(
        (interim) => setSpeakingInterim(interim),
        (final) => {
          setSpeakingTranscript(final);
          setSpeakingInterim('');
        },
        (err) => console.warn('SpeechRecognition warning in MockTest:', err)
      );

      speakingTimerRef.current = window.setInterval(() => {
        setSpeakingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission blocked. Using simulated recording buffer.', err);
      setIsSpeakingRecording(true);
      setSpeakingSeconds(0);
      speakingTimerRef.current = window.setInterval(() => {
        setSpeakingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopSpeakingRecording = () => {
    if (speakingTimerRef.current) {
      clearInterval(speakingTimerRef.current);
    }
    setIsSpeakingRecording(false);
    speechService.stopListening();
    const finalSpoken = (speakingTranscript + ' ' + speakingInterim).trim();
    if (finalSpoken) {
      setSpeakingTranscript(finalSpoken);
    }
    setSpeakingInterim('');

    if (speakingMediaRecorderRef.current && speakingMediaRecorderRef.current.state !== 'inactive') {
      speakingMediaRecorderRef.current.stop();
    } else if (!speakingAudioUrl) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const sampleRate = audioCtx.sampleRate;
        const durationSec = Math.max(speakingSeconds, 3);
        const frameCount = sampleRate * durationSec;
        const audioBuffer = audioCtx.createBuffer(1, frameCount, sampleRate);
        const nowBuffering = audioBuffer.getChannelData(0);
        for (let i = 0; i < frameCount; i++) {
          nowBuffering[i] = Math.sin((i / sampleRate) * 440 * 2 * Math.PI) * 0.1 * (1 - i / frameCount);
        }

        const bufferToWav = (abuffer: AudioBuffer) => {
          const numOfChan = abuffer.numberOfChannels;
          const length = abuffer.length * numOfChan * 2 + 44;
          const out = new DataView(new ArrayBuffer(length));
          const channels = [];
          let sample = 0;
          let offset = 0;
          let pos = 0;

          const setUint16 = (data: number) => { out.setUint16(pos, data, true); pos += 2; };
          const setUint32 = (data: number) => { out.setUint32(pos, data, true); pos += 4; };

          setUint32(0x46464952); // "RIFF"
          setUint32(length - 8);
          setUint32(0x45564157); // "WAVE"
          setUint32(0x20746d66); // "fmt "
          setUint32(16);
          setUint16(1); // PCM
          setUint16(numOfChan);
          setUint32(abuffer.sampleRate);
          setUint32(abuffer.sampleRate * 2 * numOfChan);
          setUint16(numOfChan * 2);
          setUint16(16);
          setUint32(0x61746164); // "data"
          setUint32(length - pos - 4);

          for (let i = 0; i < abuffer.numberOfChannels; i++) channels.push(abuffer.getChannelData(i));
          while (offset < abuffer.length) {
            for (let i = 0; i < numOfChan; i++) {
              sample = Math.max(-1, Math.min(1, channels[i][offset]));
              sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
              out.setInt16(pos, sample, true);
              pos += 2;
            }
            offset++;
          }
          return new Blob([out.buffer], { type: 'audio/wav' });
        };

        const wavBlob = bufferToWav(audioBuffer);
        const url = URL.createObjectURL(wavBlob);
        setSpeakingAudioUrl(url);
      } catch (e) {
        console.error('Simulated WAV audio error', e);
      }
    }
  };

  const handleEvaluateSpeaking = async () => {
    setIsEvaluatingSpeaking(true);
    try {
      const topicText = currentSpeakingTopic.prompt || 'VSTEP Speaking evaluation';
      const textToScore = speakingTranscript.trim() || 'I would like to share my opinions on this VSTEP topic clearly and fluently.';
      
      // Thử gọi AI thật (Gemini) -> Tự động fallback sang estimateSpeakingScore bằng STT nếu lỗi/thiếu key
      const evalResult = await scoreSpeaking(topicText, textToScore, speakingPart, 'B2');
      setSpeakingEvaluation({
        bandScore: evalResult.overallScore,
        cefrLevel: evalResult.vstepLevel,
        fluency: evalResult.fluency,
        lexical: evalResult.vocabulary,
        grammar: evalResult.grammar,
        pronunciation: evalResult.pronunciation,
        feedback: evalResult.feedback,
        suggestions: evalResult.suggestions,
        scoringEngine: evalResult.scoringEngine || (evalResult.isEstimated ? 'Thuật toán STT VSTEP' : 'Google Gemini AI'),
        isEstimated: evalResult.isEstimated,
      });
    } catch (e) {
      console.error('Speaking evaluation error in MockTest:', e);
    } finally {
      setIsEvaluatingSpeaking(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Flatten authentic reading questions from currentExam's passages
  const sampleReadingQuestions = useMemo(() => {
    const questionsList: Array<{
      id: string | number;
      questionText: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      passageIndex: number;
    }> = [];

    currentExam.reading.passages.forEach((p, pIdx) => {
      p.questions.forEach((q, qIdx) => {
        questionsList.push({
          id: q.id || `${p.id}_q${qIdx + 1}`,
          questionText: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || '',
          passageIndex: pIdx,
        });
      });
    });

    if (questionsList.length > 0) return questionsList;

    const fallbackKeys = [0,1,3,2,0,1,2,3,0,1,3,2,1,0,2,3,1,0,2,3,0,1,2,3,1,0,3,2,0,1,2,3,0,1,3,2,1,0,2,3];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      questionText: `Question ${i + 1} regarding the passage analysis and lexical comprehension:`,
      options: [
        'Advances in steel-frame engineering and passenger lift mechanisms',
        'Preferential tax subsidies provided by metropolitan municipal authorities',
        'The abundance of timber resources in suburban regions',
        'A decline in urban population density across industrialized cities',
      ],
      correctAnswer: fallbackKeys[i % fallbackKeys.length],
      explanation: 'General reading comprehension.',
      passageIndex: Math.floor(i / 10),
    }));
  }, [currentExam]);

  const totalReadingQuestions = sampleReadingQuestions.length;

    const handleConfirmSubmit = async () => {
    setShowSubmitConfirm(false);
    setIsSubmitted(true);

    // 1. Chấm Listening
    const listeningParts = [
      { part: 1, test: currentExam.listening.part1 },
      { part: 2, test: currentExam.listening.part2 },
      { part: 3, test: currentExam.listening.part3 },
    ];
    let actualListeningCorrect = 0;
    let totalListeningQuestions = 0;
    listeningParts.forEach(({ part, test }) => {
      test.questions.forEach((q, qIdx) => {
        totalListeningQuestions++;
        const userChoice = listeningAnswers[`part${part}_q${qIdx}`];
        if (userChoice !== undefined && userChoice === q.correctAnswer) actualListeningCorrect++;
      });
    });

    // 2. Chấm Reading
    let actualReadingCorrect = 0;
    sampleReadingQuestions.forEach((q, qIdx) => {
      const userChoice = readingAnswers[qIdx];
      if (userChoice !== undefined && userChoice === q.correctAnswer) actualReadingCorrect++;
    });

    // 3. Tính điểm
    const listeningScore = totalListeningQuestions > 0 ? Math.min(10, Math.round((actualListeningCorrect / totalListeningQuestions) * 10 * 2) / 2) : 0;
    const readingScore = Math.min(10, Math.round((actualReadingCorrect / totalReadingQuestions) * 10 * 2) / 2);
    const combinedWriting = (task1Text + '\n\n' + task2Text).trim();
    const calculatedWriting = combinedWriting
      ? estimateWritingScore(currentExam.title, combinedWriting, 'Task 2 Essay', 'B2')
      : null;
    const estimatedWritingScore = calculatedWriting ? calculatedWriting.overallScore : 0;
    const estimatedSpeakingScore = speakingEvaluation
      ? speakingEvaluation.bandScore
      : speakingTranscript.trim()
      ? estimateSpeakingScore(currentSpeakingTopic.prompt, speakingTranscript, speakingPart, 'B2').overallScore
      : 0;

    const rawAverage = (listeningScore + readingScore + estimatedWritingScore + estimatedSpeakingScore) / 4;
    const finalScore = Math.round(rawAverage * 2) / 2;
    const cefrBand =
      finalScore >= 8.5 ? 'C1' :
      finalScore >= 6.0 ? 'B2' :
      finalScore >= 4.0 ? 'B1' : '<B1';

    // 4. Lưu vào tiến độ học tập của User
    progressService.saveMockTestResult(user?.username, selectedExamId, {
      examTitle: currentExam.title,
      finalScore,
      cefrBand,
      listeningScore,
      readingScore,
      writingScore: estimatedWritingScore,
      speakingScore: estimatedSpeakingScore,
      actualListeningCorrect,
      totalListeningQuestions,
      actualReadingCorrect,
      totalReadingQuestions,
    });

    // 5. Cập nhật state completedExams
    setCompletedExams((prev) => ({
      ...prev,
      [selectedExamId]: {
        score: finalScore,
        band: cefrBand,
        date: new Date().toISOString(),
      },
    }));

    // 6. Gửi lên máy chủ C# SQLite
    try {
      await ApiClient.submitExam({
        userId: user?.username || 'candidate_user',
        examId: selectedExamId,
        answers: { ...listeningAnswers, ...readingAnswers },
        writingTask1: task1Text,
        writingTask2: task2Text,
        speakingTranscript: speakingEvaluation?.feedback || 'Speaking Response Recorded',
      });
      console.log('[MockTest] Successfully submitted exam to C# Backend SQLite DB');
    } catch (err) {
      console.warn('[MockTest] C# Backend submit fallback:', err);
    }
  };  // SUBMIT RESULT SCREEN - CHẤM THẬT 100% CHO LISTENING & READING
  if (isSubmitted) {
    // 1. CHẤM THẬT LISTENING: Đối soát từng câu trả lời với correctAnswer trong exam
    const listeningParts = [
      { part: 1, test: currentExam.listening.part1 },
      { part: 2, test: currentExam.listening.part2 },
      { part: 3, test: currentExam.listening.part3 },
    ];

    let actualListeningCorrect = 0;
    let totalListeningQuestions = 0;
    const listeningDetails: Array<{
      part: number;
      qNum: number;
      question: string;
      options: string[];
      selected: number | undefined;
      correctAnswer: number;
      isCorrect: boolean;
      explanation?: string;
    }> = [];

    listeningParts.forEach(({ part, test }) => {
      test.questions.forEach((q, qIdx) => {
        totalListeningQuestions++;
        const userChoice = listeningAnswers[`part${part}_q${qIdx}`];
        const isCorrect = userChoice !== undefined && userChoice === q.correctAnswer;
        if (isCorrect) actualListeningCorrect++;
        listeningDetails.push({
          part,
          qNum: totalListeningQuestions,
          question: q.question,
          options: q.options,
          selected: userChoice,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
        });
      });
    });

    // 2. CHẤM THẬT READING: Đối soát 40 câu với đáp án đúng
    let actualReadingCorrect = 0;
    const readingDetails: Array<{
      qNum: number;
      question: string;
      options: string[];
      selected: number | undefined;
      correctAnswer: number;
      isCorrect: boolean;
    }> = [];

    sampleReadingQuestions.forEach((q, qIdx) => {
      const userChoice = readingAnswers[qIdx];
      const isCorrect = userChoice !== undefined && userChoice === q.correctAnswer;
      if (isCorrect) actualReadingCorrect++;
      readingDetails.push({
        qNum: qIdx + 1,
        question: q.questionText,
        options: q.options,
        selected: userChoice,
        correctAnswer: q.correctAnswer,
        isCorrect,
      });
    });

    // 3. TÍNH ĐIỂM THẬT (READING, LISTENING) VÀ TÍNH ĐIỂM WRITING & SPEAKING DỰA TRÊN BÀI LÀM THỰC TẾ
    const listeningScore = totalListeningQuestions > 0 ? Math.min(10, Math.round((actualListeningCorrect / totalListeningQuestions) * 10 * 2) / 2) : 0;
    const readingScore = Math.min(10, Math.round((actualReadingCorrect / totalReadingQuestions) * 10 * 2) / 2);

    const writingWords = (task1Text ? task1Text.trim().split(/\s+/).length : 0) + (task2Text ? task2Text.trim().split(/\s+/).length : 0);
    const combinedWriting = (task1Text + '\n\n' + task2Text).trim();
    const calculatedWriting = combinedWriting
      ? estimateWritingScore(currentExam.title, combinedWriting, 'Task 2 Essay', 'B2')
      : null;
    const estimatedWritingScore = calculatedWriting ? calculatedWriting.overallScore : 0;

    const estimatedSpeakingScore = speakingEvaluation
      ? speakingEvaluation.bandScore
      : speakingTranscript.trim()
      ? estimateSpeakingScore(currentSpeakingTopic.prompt, speakingTranscript, speakingPart, 'B2').overallScore
      : 0;

    const rawAverage = (listeningScore + readingScore + estimatedWritingScore + estimatedSpeakingScore) / 4;
    const finalScore = Math.round(rawAverage * 2) / 2;

    const cefrBand =
      finalScore >= 8.5 ? 'C1 (Thành thạo cao cấp)' :
      finalScore >= 6.0 ? 'B2 (Độc lập nâng cao)' :
      finalScore >= 4.0 ? 'B1 (Đạt chuẩn bậc 3)' : 'Không đạt B1';

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 animate-fadeIn">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-inner">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-200">
              KẾT QUẢ KHẢO THÍ CHÍNH THỨC
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-3">
              Báo Cáo Điểm Thi VSTEP B1-B2-C1
            </h1>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
              Bộ đề: {currentExam.title} ({currentExam.code})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Thí sinh: <strong>{candidateName}</strong> • SBD: {candidateSBD} • Ngày thi: {new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kết quả thi đã được chấm điểm và lưu vào hệ thống</span>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-200 dark:border-blue-900 max-w-md mx-auto">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">ĐIỂM TỔNG HỢP VSTEP (QUY TRÒN 0.5)</span>
            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 my-2">
              {finalScore} <span className="text-xl text-gray-400">/ 10</span>
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white font-extrabold text-sm shadow-sm">
              Xếp loại: {cefrBand}
            </div>
          </div>

          {/* 4 Skill Score Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-blue-600" />
                Listening (Chấm thật)
              </span>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{listeningScore} / 10</p>
              <p className="text-[11px] text-emerald-600 font-medium">Đúng {actualListeningCorrect}/{totalListeningQuestions} câu</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" />
                Reading (Chấm thật)
              </span>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{readingScore} / 10</p>
              <p className="text-[11px] text-emerald-600 font-medium">Đúng {actualReadingCorrect}/{totalReadingQuestions} câu</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-purple-600" />
                Writing (Barem VSTEP)
              </span>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{estimatedWritingScore} / 10</p>
              <p className="text-[11px] text-purple-600 font-medium">{writingWords} từ • Chấm theo bài viết</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-amber-600" />
                Speaking (STT & Barem)
              </span>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{estimatedSpeakingScore} / 10</p>
              <p className="text-[11px] text-amber-600 font-medium">Chấm từ văn bản nói</p>
            </div>
          </div>

          {/* Detailed Question Review Section */}
          <div className="text-left bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Bảng Đối Soát Đáp Án Chi Tiết (Chấm Thật 100%)</span>
              </h3>
              <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setActiveReviewTab('listening'); setReviewFilter('all'); }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeReviewTab === 'listening' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listening ({actualListeningCorrect}/{totalListeningQuestions})</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveReviewTab('reading'); setReviewFilter('all'); }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeReviewTab === 'reading' ? 'bg-teal-600 text-white shadow-xs' : 'text-gray-600 dark:text-gray-300 hover:text-teal-600'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Reading ({actualReadingCorrect}/40)</span>
                </button>
              </div>
            </div>

            {/* Filter buttons to avoid scrolling all 40 questions */}
            {(() => {
              const activeDetails = activeReviewTab === 'listening' ? listeningDetails : readingDetails;
              const wrongCount = activeDetails.filter((d) => !d.isCorrect).length;
              const correctCount = activeDetails.filter((d) => d.isCorrect).length;
              const displayed = activeDetails.filter((item) => {
                if (reviewFilter === 'wrong') return !item.isCorrect;
                if (reviewFilter === 'correct') return item.isCorrect;
                return true;
              });

              return (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                      <span className="text-[11px] text-gray-400 font-semibold uppercase mr-1">Bộ lọc:</span>
                      <button
                        onClick={() => setReviewFilter('all')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          reviewFilter === 'all'
                            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        Tất cả ({activeDetails.length})
                      </button>
                      <button
                        onClick={() => setReviewFilter('wrong')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          reviewFilter === 'wrong'
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900'
                        }`}
                      >
                        ❌ Chỉ xem câu sai ({wrongCount})
                      </button>
                      <button
                        onClick={() => setReviewFilter('correct')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          reviewFilter === 'correct'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                        }`}
                      >
                        ✅ Câu làm đúng ({correctCount})
                      </button>
                    </div>
                    <span className="text-xs text-gray-400">
                      Đang hiển thị <strong>{displayed.length}</strong> câu hỏi
                    </span>
                  </div>

                  {/* Question Review List */}
                  <div className="max-h-96 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin text-xs">
                    {displayed.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        {reviewFilter === 'wrong' ? '🎉 Tuyệt vời! Bạn không làm sai câu nào.' : 'Không có câu hỏi phù hợp với bộ lọc.'}
                      </div>
                    ) : (
                      displayed.map((item: any) => (
                        <div
                          key={item.qNum}
                          className={`p-3.5 rounded-xl border transition-all ${
                            item.isCorrect
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                              : 'bg-red-50/70 dark:bg-red-950/20 border-red-200 dark:border-red-800/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="font-bold text-gray-900 dark:text-white">
                              Câu {item.qNum}{item.part ? ` (Part ${item.part})` : ''}: {item.question}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0 flex items-center gap-1 ${
                                item.isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                              }`}
                            >
                              {item.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {item.isCorrect ? 'ĐÚNG' : 'SAI'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-[11px] text-gray-600 dark:text-gray-300">
                            <span>
                              Lựa chọn của bạn:{' '}
                              <strong className={item.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400'}>
                                {item.selected !== undefined
                                  ? `${String.fromCharCode(65 + item.selected)}. ${item.options[item.selected] || ''}`
                                  : '(Chưa chọn)'}
                              </strong>
                            </span>
                            <span>
                              Đáp án đúng:{' '}
                              <strong className="text-emerald-700 dark:text-emerald-300">
                                {String.fromCharCode(65 + item.correctAnswer)}. {item.options[item.correctAnswer]}
                              </strong>
                            </span>
                          </div>
                          {item.explanation && (
                            <p className="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400 italic">
                              <span className="flex items-start gap-1">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <span>{item.explanation}</span>
                              </span>
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTimeLeft(flags.mockTestDurationMinutes * 60);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thi lại đề này</span>
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setViewMode('bank');
                setSearchParams({});
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Chọn đề thi khác từ Ngân hàng</span>
            </button>
            <Link to="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang chủ</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // VIEW 1: EXAM BANK HUB (NGÂN HÀNG BỘ ĐỀ THI THỬ & TÌM KIẾM)
  // ══════════════════════════════════════════════════════════════════
  if (viewMode === 'bank') {
    return (
      <div className="animate-fadeIn flex flex-col justify-between h-full overflow-hidden space-y-2.5">
        {/* Top Header & Toolbar */}
        <div className="space-y-2 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span>Đề Thi Thử VSTEP (Mock Test Bank)</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">
                15 bộ đề thi thử 4 kỹ năng chuẩn format Bộ GD&ĐT với đồng hồ 180 phút, Audio player và AI chấm điểm.
              </p>
            </div>

            {/* Level Filters, Link & Top Mini-Pagination */}
            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
                {[
                  { id: 'all', label: `Tất cả (${examBank.length})` },
                  { id: 'B1', label: 'B1' },
                  { id: 'B2', label: 'B2' },
                  { id: 'C1', label: 'C1' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setLevelFilter(f.id as any);
                      setBankPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      levelFilter === f.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <Link
                to="/custom-test"
                className="px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                title="Tạo đề thi tùy chỉnh từ file Word hoặc PDF"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Nhập Word/PDF</span>
              </Link>

              {totalBankPages > 1 && (
                <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs text-xs">
                  <button
                    onClick={() => setBankPage((p) => Math.max(1, p - 1))}
                    disabled={validBankPage === 1}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-bold px-1.5 text-gray-700 dark:text-gray-300">
                    Trang {validBankPage}/{totalBankPages}
                  </span>
                  <button
                    onClick={() => setBankPage((p) => Math.min(totalBankPages, p + 1))}
                    disabled={validBankPage === totalBankPages}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                    title="Trang sau"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Format Info */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/20 overflow-hidden transition-all shrink-0">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-bold text-blue-800 dark:text-blue-300 cursor-pointer hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Cấu trúc đề thi thử VSTEP Toàn diện (180 phút • 4 Kỹ năng: Nghe 40p, Đọc 60p, Viết 60p, Nói 12p)</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-semibold shrink-0">
                {showInfo ? 'Thu gọn' : 'Xem chi tiết'}
                {showInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </button>
            {showInfo && (
              <div className="px-3.5 pb-2.5 pt-1 text-xs text-blue-800 dark:text-blue-200 space-y-1.5 border-t border-blue-200/60 dark:border-blue-800/60 animate-fadeIn">
                <ul className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span><strong>Listening (40p):</strong> 3 Parts, 35 câu trắc nghiệm âm thanh thực tế.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span><strong>Reading (60p):</strong> 4 bài đọc, 40 câu hỏi từ vựng & suy luận.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span><strong>Writing (60p):</strong> Task 1 viết thư (120 từ), Task 2 luận xã hội (250 từ).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span><strong>Speaking (12p):</strong> 3 Parts ghi âm Micro, AI nhận diện giọng nói & chấm điểm.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Multi-column Grid that fills 100% of remaining height with adaptive cards */}
        <div
          className="grid gap-3 flex-1 min-h-0 py-0.5"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {paginatedExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => handleStartExam(exam.id)}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between h-full cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200/80 dark:border-blue-800/50 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {exam.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {completedExams[exam.id] && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> {completedExams[exam.id].score}/10 ({completedExams[exam.id].band})
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      exam.level === 'B1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      exam.level === 'B2' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {exam.level}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {exam.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {exam.source} • {exam.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" /> 180 phút • 4 Kỹ năng
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                  Vào thi &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls Anchored At Bottom */}
        <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Hiển thị <strong>{paginatedExams.length}</strong> / {filteredExams.length} bộ đề (Trang {validBankPage}/{totalBankPages})
          </span>
          {totalBankPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setBankPage((p) => Math.max(1, p - 1))}
                disabled={validBankPage === 1}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-xs transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalBankPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setBankPage(num)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    validBankPage === num
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setBankPage((p) => Math.min(totalBankPages, p + 1))}
                disabled={validBankPage === totalBankPages}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-xs transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // VIEW 2: INTERACTIVE EXAM ROOM (PHÒNG THI VSTEP ĐANG LÀM BÀI)
  // ══════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-3 w-full lg:h-[calc(100vh-100px)] lg:min-h-[620px] flex flex-col lg:overflow-hidden animate-fadeIn">
      {/* 1. TOP STICKY BAR */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-3.5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
            VSTEP
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">
                {currentExam.code}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate max-w-md">
                {currentExam.title}
              </h1>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              Nguồn: <strong>{currentExam.source}</strong> • Thí sinh: <strong className="text-blue-600 dark:text-blue-400">{candidateName}</strong> ({candidateSBD})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          {/* Change exam button */}
          <button
            onClick={() => setShowBankModal(true)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Đổi bộ đề thi khác từ Ngân hàng"
          >
            <FolderOpen className="w-3.5 h-3.5" /><span>Đổi đề thi</span>
          </button>

          {/* Countdown timer */}
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-mono font-bold text-sm ${
            timeLeft < 300 ? 'bg-red-500 text-white animate-pulse' : timeLeft < 900 ? 'bg-amber-500 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            Nộp bài
          </button>
        </div>
      </div>

      {/* Security alert if violation */}
      {securityWarning && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 text-red-800 dark:text-red-200 rounded-xl text-xs font-semibold animate-fadeIn shrink-0">
          {securityWarning}
        </div>
      )}

      {/* 2. SKILL SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm text-xs font-bold shrink-0">
        {[
          { id: 'listening' as SkillTab, label: 'KỸ NĂNG 1: LISTENING (40 phút)', icon: Headphones },
          { id: 'reading' as SkillTab, label: 'KỸ NĂNG 2: READING (60 phút)', icon: BookOpen },
          { id: 'writing' as SkillTab, label: 'KỸ NĂNG 3: WRITING (60 phút)', icon: PenTool },
          { id: 'speaking' as SkillTab, label: 'KỸ NĂNG 4: SPEAKING (12 phút)', icon: Mic },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-600 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SKILL CONTENT AREAS (LOCK HEIGHT / INDEPENDENT SCROLL) */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">

      {/* ══════════════════ TAB 1: LISTENING ══════════════════ */}
      {activeTab === 'listening' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Left Column (5 cols): Audio Station */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3.5 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700 shrink-0">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">PHÂN HỆ NGHE VSTEP</span>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  Trạm Phát Âm Thanh (Audio Station)
                </h2>
              </div>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-xs font-bold">
                Part {listeningPart} / 3
              </span>
            </div>

            {/* Part Switcher */}
            <div className="flex gap-2 shrink-0">
              {[
                { part: 1, label: 'Part 1 (8 câu ngắn)' },
                { part: 2, label: 'Part 2 (Hội thoại dài)' },
                { part: 3, label: 'Part 3 (Bài giảng)' },
              ].map((p) => (
                <button
                  key={p.part}
                  onClick={() => {
                    setListeningPart(p.part);
                    setListeningQIndex(0);
                    if (isAudioPlaying) togglePlayListening();
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    listeningPart === p.part
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Interactive Audio Player */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/30 dark:to-gray-800 border border-blue-200 dark:border-blue-900/50 space-y-3 shrink-0">
              <div className="flex items-center gap-3.5">
                <button
                  onClick={togglePlayListening}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer ${
                    isAudioPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  title={isAudioPlaying ? 'Tạm dừng bài nghe' : 'Phát bài nghe'}
                >
                  {isAudioPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-300 mb-1">
                    <span className="truncate">{currentListeningTest.title}</span>
                    <span className="font-mono text-gray-500 text-[11px]">{formatTimer(audioCurrentTime)} / {formatTimer(audioDuration)}</span>
                  </div>

                  {/* Audio Progress Track */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(audioCurrentTime / audioDuration) * 100}%` }}
                    />
                  </div>

                  {/* Speed Controls */}
                  <div className="flex items-center justify-between mt-1.5 text-xs">
                    <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                      <span>Tốc độ:</span>
                      {[0.75, 1.0, 1.25].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${
                            audioSpeed === spd ? 'bg-blue-600 text-white' : 'bg-white/80 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Equalizer animation */}
                    {isAudioPlaying && (
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-blue-600 rounded animate-pulse" />
                        <span className="w-1 h-5 bg-indigo-600 rounded animate-pulse" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-2 bg-blue-500 rounded animate-pulse" style={{ animationDelay: '300ms' }} />
                        <span className="w-1 h-4 bg-indigo-500 rounded animate-pulse" style={{ animationDelay: '450ms' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Transcript Accordion */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col space-y-2">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer shadow-xs shrink-0"
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Xem bản ghi Transcript bài nghe</span>
                </span>
                <span>{showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
              </button>

              {showTranscript && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex-1 overflow-y-auto whitespace-pre-line leading-relaxed scrollbar-thin">
                  {currentListeningTest.transcript}
                </div>
              )}
            </div>
          </div>

          {/* Center Column (7 cols): Listening Questions */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between h-full overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin space-y-4">
              <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700 shrink-0">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    CÂU HỎI {listeningQIndex + 1} / {currentListeningTest.questions.length} (PART {listeningPart}):
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5">{currentListeningTest.description}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  listeningAnswers[`part${listeningPart}_q${listeningQIndex}`] !== undefined
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {listeningAnswers[`part${listeningPart}_q${listeningQIndex}`] !== undefined ? 'Đã chọn' : 'Chưa chọn'}
                </span>
              </div>

              {/* Active Question */}
              {currentListeningTest.questions[listeningQIndex] && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
                    {currentListeningTest.questions[listeningQIndex].question}
                  </h3>

                  <div className="space-y-2">
                    {currentListeningTest.questions[listeningQIndex].options.map((opt, optIdx) => {
                      const isSelected =
                        listeningAnswers[`part${listeningPart}_q${listeningQIndex}`] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setListeningAnswers({
                              ...listeningAnswers,
                              [`part${listeningPart}_q${listeningQIndex}`]: optIdx,
                            });
                          }}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-200 shadow-xs'
                              : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 shrink-0">
              <button
                onClick={() => setListeningQIndex((prev) => Math.max(0, prev - 1))}
                disabled={listeningQIndex === 0}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-pointer"
              >
                ← Câu trước
              </button>

              <button
                onClick={() =>
                  setListeningQIndex((prev) =>
                    Math.min(currentListeningTest.questions.length - 1, prev + 1)
                  )
                }
                disabled={listeningQIndex === currentListeningTest.questions.length - 1}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
              >
                Câu tiếp theo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ TAB 2: READING ══════════════════ */}
      {activeTab === 'reading' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Left Column (6 cols): Reading Passage */}
          <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700 shrink-0">
              <div>
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">VĂN BẢN HỌC THUẬT (READING PASSAGE)</span>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-xs">
                  {mockReadingPassages[readingPassageIndex]?.title || 'PASSAGE'}
                </h2>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {mockReadingPassages.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      setReadingPassageIndex(pIdx);
                      const firstQ = sampleReadingQuestions.findIndex(q => q.passageIndex === pIdx);
                      if (firstQ !== -1) setReadingQIndex(firstQ);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      readingPassageIndex === pIdx ? 'bg-teal-600 text-white shadow-xs' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Đoạn {pIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200 pr-2 scrollbar-thin my-2.5">
              {mockReadingPassages[readingPassageIndex]?.text.split('\n\n').map((p, i) => (
                <p key={i} className="text-justify indent-4">
                  {p}
                </p>
              ))}
            </div>
            <div className="text-[11px] text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700 shrink-0">
              <span className="flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" /><span>Bôi đen cụm từ trong đoạn văn để tự động tra cứu từ điển học thuật.</span></span>
            </div>
          </div>

          {/* Right Column (6 cols): 40 Reading Questions */}
          <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  CÂU HỎI {readingQIndex + 1} / {totalReadingQuestions}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  readingAnswers[readingQIndex] !== undefined ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                }`}>
                  {readingAnswers[readingQIndex] !== undefined ? 'Đã làm' : 'Chưa làm'}
                </span>
              </div>
              <button
                onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  showQuestionPalette ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
                title="Bật/tắt lưới danh sách 40 câu hỏi"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{showQuestionPalette ? 'Thu gọn bảng câu' : 'Bảng 40 câu'}</span>
              </button>
            </div>

            {/* Question Text & Options (Scrollable) */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 my-2.5 scrollbar-thin">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
                {sampleReadingQuestions[readingQIndex]?.questionText}
              </h3>
              <div className="space-y-2">
                {sampleReadingQuestions[readingQIndex]?.options.map((opt, oIdx) => {
                  const isChecked = readingAnswers[readingQIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setReadingAnswers({ ...readingAnswers, [readingQIndex]: oIdx })}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                        isChecked
                          ? 'bg-teal-50 dark:bg-teal-950/30 border-teal-500 text-teal-950 dark:text-teal-200 shadow-xs ring-1 ring-teal-500'
                          : 'bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 ${
                        isChecked ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Collapsible Quick-Jump Palette Drawer */}
            {showQuestionPalette && (
              <div className="p-2.5 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-200 dark:border-gray-600 mb-2 shrink-0 animate-fadeIn">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Danh sách {totalReadingQuestions} câu hỏi:</span>
                  <span className="text-[10px] text-gray-400">Đã làm: {Object.keys(readingAnswers).length}/{totalReadingQuestions}</span>
                </div>
                <div className="grid grid-cols-10 gap-1 max-h-24 overflow-y-auto pr-1 scrollbar-thin">
                  {sampleReadingQuestions.map((q, qIdx) => {
                    const isCurrent = readingQIndex === qIdx;
                    const isAnswered = readingAnswers[qIdx] !== undefined;
                    return (
                      <button
                        key={qIdx}
                        onClick={() => {
                          setReadingQIndex(qIdx);
                          setReadingPassageIndex(q.passageIndex);
                        }}
                        className={`h-6 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-teal-600 bg-teal-600 text-white shadow-xs'
                            : isAnswered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-gray-700 shrink-0">
              <button
                onClick={() => {
                  setReadingQIndex((idx) => {
                    const prevIdx = Math.max(0, idx - 1);
                    if (sampleReadingQuestions[prevIdx]) {
                      setReadingPassageIndex(sampleReadingQuestions[prevIdx].passageIndex);
                    }
                    return prevIdx;
                  });
                }}
                disabled={readingQIndex === 0}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Câu trước</span>
              </button>
              <button
                onClick={() => {
                  setReadingQIndex((idx) => {
                    const nextIdx = Math.min(totalReadingQuestions - 1, idx + 1);
                    if (sampleReadingQuestions[nextIdx]) {
                      setReadingPassageIndex(sampleReadingQuestions[nextIdx].passageIndex);
                    }
                    return nextIdx;
                  });
                }}
                disabled={readingQIndex === totalReadingQuestions - 1}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Câu sau</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ TAB 3: WRITING ══════════════════ */}
      {activeTab === 'writing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Left Column (5 cols): Writing Prompt */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700 shrink-0">
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">ĐỀ BÀI VIẾT LUẬN VSTEP</span>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => setWritingTask('task1')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    writingTask === 'task1' ? 'bg-purple-600 text-white shadow-xs' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Task 1 (Thư)
                </button>
                <button
                  onClick={() => setWritingTask('task2')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    writingTask === 'task2' ? 'bg-purple-600 text-white shadow-xs' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Task 2 (Luận)
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 text-xs leading-relaxed text-gray-700 dark:text-gray-300 pr-1 my-2.5 scrollbar-thin">
              {writingTask === 'task1' ? (
                <div className="space-y-2.5">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Task 1: {currentExam.writing.task1.title}
                  </h3>
                  <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/50 text-purple-900 dark:text-purple-200 whitespace-pre-line leading-relaxed">
                    {currentExam.writing.task1.prompt}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-gray-500 dark:text-gray-400 text-[11px]">
                    <li>Thời lượng khuyến nghị: 20 phút.</li>
                    <li>Yêu cầu độ dài tối thiểu: {currentExam.writing.task1.wordCount.min} từ.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Task 2: {currentExam.writing.task2.title}
                  </h3>
                  <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/50 text-purple-900 dark:text-purple-200 whitespace-pre-line leading-relaxed">
                    {currentExam.writing.task2.prompt}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-gray-500 dark:text-gray-400 text-[11px]">
                    <li>Thời lượng khuyến nghị: 40 phút.</li>
                    <li>Yêu cầu độ dài tối thiểu: {currentExam.writing.task2.wordCount.min} từ.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (7 cols): Writing Editor */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700 shrink-0">
              <span className="text-xs font-bold text-gray-500 uppercase">KHUNG SOẠN THẢO BÀI LÀM</span>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-300 px-2.5 py-0.5 rounded-lg border border-purple-200 dark:border-purple-800">
                Số từ: {writingTask === 'task1' ? (task1Text ? task1Text.trim().split(/\s+/).length : 0) : (task2Text ? task2Text.trim().split(/\s+/).length : 0)} từ
              </span>
            </div>

            <div className="flex-1 min-h-0 py-2.5 flex flex-col">
              <textarea
                value={writingTask === 'task1' ? task1Text : task2Text}
                onChange={(e) => {
                  if (writingTask === 'task1') setTask1Text(e.target.value);
                  else setTask2Text(e.target.value);
                }}
                placeholder={writingTask === 'task1' ? 'Dear Alex,... (Viết tối thiểu 120 từ)' : 'Nowadays, technology plays an essential role... (Viết tối thiểu 250 từ)'}
                className="w-full flex-1 p-4 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-sans leading-relaxed focus:ring-2 focus:ring-purple-600 outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-2.5 border-t border-gray-100 dark:border-gray-700 shrink-0">
              <span>Hệ thống tự động lưu bản thảo thời gian thực.</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Đã đồng bộ bài làm
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ TAB 4: SPEAKING ══════════════════ */}
      {activeTab === 'speaking' && (
        <div className="h-full overflow-y-auto pr-1 space-y-4 scrollbar-thin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">GIÁM KHẢO VSTEP SPEAKING</span>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentSpeakingTopic.title}
                  </h2>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setSpeakingPart(p);
                        setSpeakingAudioUrl(null);
                        setSpeakingEvaluation(null);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        speakingPart === p ? 'bg-amber-600 text-white shadow-xs' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Part {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  Part {speakingPart}: {currentSpeakingTopic.title}
                </h3>
                <p className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 leading-relaxed whitespace-pre-line">
                  {currentSpeakingTopic.prompt}
                </p>
                {currentSpeakingTopic.followUpQuestions && currentSpeakingTopic.followUpQuestions.length > 0 && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-1">
                    <p className="font-bold text-gray-800 dark:text-gray-200">Câu hỏi gợi ý:</p>
                    <ul className="list-disc pl-4 text-gray-600 dark:text-gray-300 space-y-0.5">
                      {currentSpeakingTopic.followUpQuestions.map((fq, idx) => (
                        <li key={idx}>{fq}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => playExaminerQuestion(currentSpeakingTopic.prompt)}
                  className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" /> Giám khảo đọc câu hỏi Part {speakingPart}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b pb-2.5 border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-500 uppercase">TRẠM GHI ÂM VSTEP (RECORDING)</span>
                  <span className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">
                    Thời lượng: {formatTimer(speakingSeconds)}
                  </span>
                </div>

                {/* Record Action Bar */}
                <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/40 text-center space-y-3">
                  <div className="flex items-center justify-center gap-4">
                    {!isSpeakingRecording ? (
                      <button
                        onClick={startSpeakingRecording}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Mic className="w-4 h-4" /> Bắt đầu ghi âm bài nói
                      </button>
                    ) : (
                      <button
                        onClick={stopSpeakingRecording}
                        className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md animate-pulse cursor-pointer"
                      >
                        <Square className="w-4 h-4 fill-white" /> Dừng ghi âm ({speakingSeconds}s)
                      </button>
                    )}
                  </div>

                  {isSpeakingRecording && (
                    <p className="text-xs text-red-600 font-bold animate-pulse">
                      ● Đang ghi âm qua Micro thời gian thực... Hãy trả lời to, rõ ràng.
                    </p>
                  )}
                </div>

                {/* Speech-to-Text Live Transcript Box */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                      <FileText className="w-4 h-4" />
                      <span>Văn bản chuyển đổi từ Giọng nói (Speech-to-Text):</span>
                    </span>
                    <span className="text-[11px] text-gray-500 font-normal">
                      {speakingTranscript.trim() ? `${speakingTranscript.trim().split(/\s+/).length} từ` : isSpeakingRecording ? 'Đang lắng nghe...' : 'Chưa có nội dung'}
                    </span>
                  </div>
                  <textarea
                    value={speakingTranscript + (speakingInterim ? ' ' + speakingInterim : '')}
                    onChange={(e) => setSpeakingTranscript(e.target.value)}
                    placeholder="Khi bạn bấm ghi âm và nói vào Micro, văn bản bài nói sẽ tự động hiển thị ở đây. Bạn cũng có thể xem lại, gõ bổ sung hoặc chỉnh sửa nếu micro nhận diện chưa chuẩn trước khi bấm chấm điểm..."
                    rows={3}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white text-xs leading-relaxed resize-y focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Audio Playback of Student Voice */}
                {speakingAudioUrl && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <Headphones className="w-4 h-4 text-blue-600" /> Nghe lại bài nói vừa ghi âm của bạn:
                    </span>
                    <audio controls src={speakingAudioUrl} className="w-full h-10" />
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={handleEvaluateSpeaking}
                        disabled={isEvaluatingSpeaking}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">{isEvaluatingSpeaking ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}<span>{isEvaluatingSpeaking ? 'Đang chấm điểm...' : 'Chấm điểm Bài nói'}</span></span>
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Rubric Evaluation Card */}
                {speakingEvaluation && (
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 space-y-2.5 text-xs animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-200 dark:border-gray-600 gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 dark:text-gray-200">KẾT QUẢ ĐÁNH GIÁ:</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold">
                          {speakingEvaluation.scoringEngine || (speakingEvaluation.isEstimated ? 'Thuật toán STT VSTEP' : 'Google Gemini AI')}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full font-bold self-start sm:self-auto">
                        {speakingEvaluation.bandScore} / 10 ({speakingEvaluation.cefrLevel})
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        Trôi chảy: <strong>{speakingEvaluation.fluency}/10</strong>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        Từ vựng: <strong>{speakingEvaluation.lexical}/10</strong>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        Ngữ pháp: <strong>{speakingEvaluation.grammar}/10</strong>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        Phát âm: <strong>{speakingEvaluation.pronunciation}/10</strong>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                      "{speakingEvaluation.feedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI SPEECH-TO-TEXT & ERROR HIGHLIGHTER SUITE */}
          <div>
            <SpeechTranscriberWithHighlighter
              topicPrompt={currentSpeakingTopic.prompt}
            />
          </div>
        </div>
      )}

      </div> {/* End 3. SKILL CONTENT AREAS */}

      {/* 4. CONFIRM SUBMIT MODAL */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200 dark:border-gray-700 text-center animate-fadeIn">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-950/50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Xác nhận Nộp Bài Thi Thử?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Bạn đang nộp bài cho bộ đề <strong>{currentExam.title}</strong>. Hệ thống VSTEP Master AI sẽ chấm điểm tự động toàn diện cả 4 kỹ năng và cấp báo cáo điểm theo chuẩn MOET.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-md"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. SWITCH EXAM BANK MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeIn max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100 dark:border-gray-700 shrink-0">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-blue-600" /><span>Chọn Bộ Đề Thi Khác Từ Ngân Hàng</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Đang mở đề: <strong>{currentExam.code}</strong>. Bạn có thể chọn đề mới để bắt đầu lượt thi mới.
                </p>
              </div>
              <button
                onClick={() => setShowBankModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Exam List with scrollbar */}
            <div className="overflow-y-auto space-y-3 flex-1 pr-1 scrollbar-thin">
              {examBank.map((exam) => {
                const isCur = exam.id === selectedExamId;
                return (
                  <div
                    key={exam.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isCur
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-400 shadow-xs'
                        : 'bg-white dark:bg-gray-700/40 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {exam.code}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                          {exam.targetBand}
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> {exam.rating}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                        {exam.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        Nguồn: {exam.source} • <Clock className="w-3 h-3 inline text-gray-400" /> 180 phút • 80 câu hỏi
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartExam(exam.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        isCur
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      }`}
                    >
                      {isCur ? <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Đang thi đề này</span> : <span className="flex items-center gap-1.5"><Play className="w-3.5 h-3.5" /> Chọn thi đề này</span>}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  setShowBankModal(false);
                  setViewMode('bank');
                  setSearchParams({});
                }}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-blue-200 dark:border-blue-800 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Mở trang Ngân hàng đề thi đầy đủ</span>
              </button>
              <button
                onClick={() => setShowBankModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Đóng</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
