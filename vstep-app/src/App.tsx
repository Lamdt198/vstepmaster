import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listening from './pages/Listening';
import Reading from './pages/Reading';
import Writing from './pages/Writing';
import Speaking from './pages/Speaking';
import MockTest from './pages/MockTest';
import Knowledge from './pages/Knowledge';
import KnowledgeQuiz from './pages/KnowledgeQuiz';
import Progress from './pages/Progress';
import ListeningPractice from './pages/ListeningPractice';
import ReadingPractice from './pages/ReadingPractice';
import WritingPractice from './pages/WritingPractice';
import SpeakingPractice from './pages/SpeakingPractice';
import Flashcards from './pages/Flashcards';
import VocabQuiz from './pages/VocabQuiz';
import Vocabulary from './pages/Vocabulary';
import VocabStudy from './pages/VocabStudy';
import CustomTest from './pages/CustomTest';
import Login from './pages/Login';
import Settings from './pages/Settings';
import ReadingLibrary from './pages/ReadingLibrary';
import ChineseHub from './pages/chinese/ChineseHub';
import ChineseVocab from './pages/chinese/ChineseVocab';
import ChineseGrammar from './pages/chinese/ChineseGrammar';
import ChineseReading from './pages/chinese/ChineseReading';
import ChineseLessons from './pages/chinese/ChineseLessons';
import Lessons from './pages/Lessons';
import Admin from './pages/Admin';
import Account from './pages/Account';
import { useAuth } from './context/AuthContext';
import { useFeatureFlags } from './context/FeatureFlagContext';

function App() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const { flags } = useFeatureFlags();

  // Đang chuyển hướng qua Keycloak hoặc xử lý callback.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
        Đang tải phiên đăng nhập…
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Core VSTEP Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/listening/:id" element={<ListeningPractice />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/reading/:id" element={<ReadingPractice />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:id" element={<WritingPractice />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/speaking/:id" element={<SpeakingPractice />} />
          <Route path="/mock-test" element={<MockTest />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/vocabulary/:id" element={<VocabStudy />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/vocab-quiz" element={<VocabQuiz />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/account" element={<Account />} />

          {/* Conditional VSTEP Features */}
          <Route
            path="/custom-test"
            element={flags.enableCustomTest ? <CustomTest /> : <Navigate to="/" replace />}
          />

          {/* Admin Portal Guard (Role RBAC) */}
          <Route
            path="/admin"
            element={user?.role === 'admin' ? <Admin /> : <Navigate to="/" replace />}
          />

          {/* Optional Modules (Hidden by default, enabled via Admin) */}
          <Route
            path="/reading-library"
            element={flags.enableReadingLibrary ? <ReadingLibrary /> : <Navigate to="/" replace />}
          />
          <Route
            path="/lessons"
            element={flags.enableLessons ? <Lessons /> : <Navigate to="/" replace />}
          />
          <Route
            path="/knowledge"
            element={flags.enableKnowledge ? <Knowledge /> : <Navigate to="/" replace />}
          />
          <Route
            path="/knowledge-quiz"
            element={flags.enableKnowledge ? <KnowledgeQuiz /> : <Navigate to="/" replace />}
          />

          {/* Chinese / HSK Routes Guard */}
          <Route
            path="/chinese"
            element={flags.enableChinese ? <ChineseHub /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chinese/vocabulary"
            element={flags.enableChinese ? <ChineseVocab /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chinese/flashcards"
            element={flags.enableChinese ? <ChineseVocab /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chinese/grammar"
            element={flags.enableChinese ? <ChineseGrammar /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chinese/reading"
            element={flags.enableChinese ? <ChineseReading /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chinese/lessons"
            element={flags.enableChinese ? <ChineseLessons /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chinese/quiz"
            element={flags.enableChinese ? <ChineseVocab /> : <Navigate to="/" replace />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
