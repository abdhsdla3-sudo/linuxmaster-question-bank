import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import ExamMode from "./components/ExamMode.jsx";
import PracticeMode from "./components/PracticeMode.jsx";
import WrongNote from "./components/WrongNote.jsx";
import ResultPage from "./components/ResultPage.jsx";
import Login from "./components/Login.jsx";
import ConceptSummary from "./components/ConceptSummary.jsx";
import PatchNotes from "./components/PatchNotes.jsx";
import QuestionList from "./components/QuestionList.jsx";
import { categories, questions } from "./data/questions.js";
import { buildChoiceVariant } from "./data/choiceVariants.js";
import { getConceptKey, pickDifficultyMix, shuffle } from "./data/questionSelection.js";

const EXAM_SIZE = 50;
const EXAM_CATEGORY_TARGETS = {
  "리눅스 일반": 8,
  "파일 시스템": 8,
  "기본 명령어": 14,
  보안: 7,
  프로세스: 5,
  네트워크: 4,
  "패키지 관리": 4,
};
const ACTIVE_USER_KEY = "linuxmaster_active_user";
const USERS_KEY = "linuxmaster_users";
const THEME_KEY = "linuxmaster_theme";

function safeRead(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getUserKey(username, type) {
  return `linuxmaster_${username}_${type}`;
}

function pickUniqueExamQuestions(questionList, size) {
  const groups = new Map();

  shuffle(questionList).forEach((question) => {
    const key = getConceptKey(question);
    const group = groups.get(key) ?? [];
    group.push(question);
    groups.set(key, group);
  });

  const representatives = shuffle([...groups.values()]).map((group) => shuffle(group)[0]);
  const picked = [];
  const usedKeys = new Set();

  Object.entries(EXAM_CATEGORY_TARGETS).forEach(([category, target]) => {
    const categoryQuestions = representatives.filter((question) => question.category === category);
    pickDifficultyMix(categoryQuestions, target).forEach((question) => {
      picked.push(question);
      usedKeys.add(getConceptKey(question));
    });
  });

  if (picked.length < size) {
    shuffle(representatives)
      .filter((question) => !usedKeys.has(getConceptKey(question)))
      .slice(0, size - picked.length)
      .forEach((question) => picked.push(question));
  }

  return shuffle(picked.slice(0, Math.min(size, groups.size)));
}

function shuffleQuestionChoices(question) {
  return buildChoiceVariant(question, questions);
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeUser, setActiveUser] = useState(() => localStorage.getItem(ACTIVE_USER_KEY) || "");
  const [wrongItems, setWrongItems] = useState([]);
  const [examHistory, setExamHistory] = useState([]);
  const [examSeenIds, setExamSeenIds] = useState([]);
  const [instantProgress, setInstantProgress] = useState({});
  const [examQuestions, setExamQuestions] = useState([]);
  const [examAnswers, setExamAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("single");
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");
  const [practiceMode, setPracticeMode] = useState("instant");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!activeUser) return;
    setWrongItems(safeRead(getUserKey(activeUser, "wrong_notes"), []));
    setExamHistory(safeRead(getUserKey(activeUser, "exam_history"), []));
    setExamSeenIds(safeRead(getUserKey(activeUser, "exam_seen"), []));
    setInstantProgress(safeRead(getUserKey(activeUser, "instant_progress"), {}));
  }, [activeUser]);

  useEffect(() => {
    if (!activeUser) return;
    localStorage.setItem(getUserKey(activeUser, "wrong_notes"), JSON.stringify(wrongItems));
  }, [activeUser, wrongItems]);

  useEffect(() => {
    if (!activeUser) return;
    localStorage.setItem(getUserKey(activeUser, "exam_history"), JSON.stringify(examHistory));
  }, [activeUser, examHistory]);

  useEffect(() => {
    if (!activeUser) return;
    localStorage.setItem(getUserKey(activeUser, "exam_seen"), JSON.stringify(examSeenIds));
  }, [activeUser, examSeenIds]);

  useEffect(() => {
    if (!activeUser) return;
    localStorage.setItem(getUserKey(activeUser, "instant_progress"), JSON.stringify(instantProgress));
  }, [activeUser, instantProgress]);

  const wrongIds = useMemo(() => new Set(wrongItems.map((item) => item.id)), [wrongItems]);
  const weakCategories = useMemo(() => {
    const counts = new Map();
    wrongItems.forEach((item) => {
      const question = questions.find((candidate) => candidate.id === item.id);
      const category = item.category ?? question?.category;
      if (!category) return;
      counts.set(category, (counts.get(category) ?? 0) + (item.attempts ?? 1));
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category, count]) => ({ category, count }));
  }, [wrongItems]);
  const averageScore = examHistory.length
    ? Math.round(examHistory.reduce((sum, item) => sum + item.score, 0) / examHistory.length)
    : 0;

  const handleLogin = (username) => {
    const normalized = username.trim();
    if (!normalized) return;
    const users = safeRead(USERS_KEY, []);
    if (!users.includes(normalized)) {
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, normalized]));
    }
    localStorage.setItem(ACTIVE_USER_KEY, normalized);
    setActiveUser(normalized);
    setScreen("home");
  };

  const handleLogout = () => {
    localStorage.removeItem(ACTIVE_USER_KEY);
    setActiveUser("");
    setWrongItems([]);
    setExamHistory([]);
    setExamSeenIds([]);
    setInstantProgress({});
    setResult(null);
    setScreen("home");
  };

  const saveWrong = (question, selected) => {
    setWrongItems((prev) => {
      const previous = prev.find((item) => item.id === question.id);
      const nextItem = {
        id: question.id,
        category: question.category,
        difficulty: question.difficulty,
        selected,
        selectedChoice: selected === undefined ? null : question.choices[selected],
        attempts: (previous?.attempts ?? 0) + 1,
        savedAt: new Date().toISOString(),
      };
      return previous ? prev.map((item) => (item.id === question.id ? nextItem : item)) : [...prev, nextItem];
    });
  };

  const clearWrong = (questionId) => {
    setWrongItems((prev) => prev.filter((item) => item.id !== questionId));
  };

  const saveInstantProgress = (question, selected) => {
    setInstantProgress((prev) => ({
      ...prev,
      [question.id]: {
        id: question.id,
        category: question.category,
        difficulty: question.difficulty,
        selectedChoice: question.choices[selected],
        isCorrect: selected === question.answer,
        answeredAt: new Date().toISOString(),
      },
    }));
  };

  const resetStudyData = () => {
    const shouldReset = window.confirm("시험 기록, 출제 기록, 오답노트, 즉시 풀이 진행 상태를 모두 초기화할까요?");
    if (!shouldReset) return;
    setWrongItems([]);
    setExamHistory([]);
    setExamSeenIds([]);
    setInstantProgress({});
    setResult(null);
  };

  const startExam = () => {
    const seenIdSet = new Set(examSeenIds);
    const unseenQuestions = questions.filter((question) => !seenIdSet.has(question.id));
    const pickedQuestions = pickUniqueExamQuestions(unseenQuestions, EXAM_SIZE);

    if (pickedQuestions.length < EXAM_SIZE) {
      window.alert(
        `아직 풀지 않은 문제가 ${pickedQuestions.length}문항만 남아 있어 50문항 시험을 만들 수 없습니다. 기록 초기화를 하면 다시 전체 문제에서 출제됩니다.`,
      );
      return;
    }

    const picked = pickedQuestions.map(shuffleQuestionChoices);
    setExamQuestions(picked);
    setExamAnswers({});
    setCurrentIndex(0);
    setViewMode("single");
    setResult(null);
    setScreen("exam");
  };

  const startPractice = (mode) => {
    setPracticeMode(mode);
    setScreen("practice");
  };

  const selectExamAnswer = (questionId, choiceIndex) => {
    setExamAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  };

  const submitExam = (options = {}) => {
    const unanswered = examQuestions.filter((question) => examAnswers[question.id] === undefined).length;
    if (unanswered > 0 && !options.force) {
      const shouldSubmit = window.confirm(`미응답 ${unanswered}문제가 있습니다. 제출할까요?`);
      if (!shouldSubmit) return;
    }

    let correctCount = 0;
    examQuestions.forEach((question) => {
      const selected = examAnswers[question.id];
      if (selected === question.answer) {
        correctCount += 1;
        clearWrong(question.id);
      } else {
        saveWrong(question, selected);
      }
    });

    const wrongCount = examQuestions.length - correctCount;
    const score = Math.round((correctCount / examQuestions.length) * 100);
    const nextResult = {
      questions: examQuestions,
      answers: examAnswers,
      correctCount,
      wrongCount,
      score,
      takenAt: new Date().toISOString(),
    };

    setResult(nextResult);
    setExamSeenIds((prev) => [...new Set([...prev, ...examQuestions.map((question) => question.id)])]);
    setExamHistory((prev) => [
      {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        score,
        correctCount,
        wrongCount,
        total: examQuestions.length,
        takenAt: nextResult.takenAt,
      },
      ...prev,
    ]);
    setScreen("result");
  };

  const goHome = () => setScreen("home");

  if (!activeUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <Header
        onHome={goHome}
        onPatchNotes={() => setScreen("patchNotes")}
        wrongCount={wrongIds.size}
        username={activeUser}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />

      {screen === "home" && (
        <Home
          totalQuestions={questions.length}
          wrongCount={wrongIds.size}
          categories={categories}
          weakCategories={weakCategories}
          examHistory={examHistory}
          averageScore={averageScore}
          unseenExamCount={questions.length - examSeenIds.length}
          onStartExam={startExam}
          onPracticeInstant={() => startPractice("instant")}
          onPracticeReview={() => startPractice("review")}
          onWrongNote={() => setScreen("wrongNote")}
          onConcepts={() => setScreen("concepts")}
          onQuestionList={() => setScreen("questionList")}
          onReset={resetStudyData}
        />
      )}

      {screen === "exam" && (
        <ExamMode
          examQuestions={examQuestions}
          answers={examAnswers}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onSelect={selectExamAnswer}
          onSubmit={submitExam}
          onHome={goHome}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}

      {screen === "practice" && (
        <PracticeMode
          questions={questions}
          initialMode={practiceMode}
          instantProgress={instantProgress}
          onSaveInstantProgress={saveInstantProgress}
          onSaveWrong={saveWrong}
          onClearWrong={clearWrong}
          onHome={goHome}
        />
      )}

      {screen === "wrongNote" && (
        <WrongNote
          wrongItems={wrongItems}
          questions={questions}
          onSaveWrong={saveWrong}
          onClearWrong={clearWrong}
          onHome={goHome}
        />
      )}

      {screen === "concepts" && <ConceptSummary onHome={goHome} />}

      {screen === "questionList" && <QuestionList questions={questions} onHome={goHome} />}

      {screen === "patchNotes" && <PatchNotes onHome={goHome} />}

      {screen === "result" && (
        <ResultPage result={result} onHome={goHome} onRetry={startExam} onWrongNote={() => setScreen("wrongNote")} />
      )}
    </div>
  );
}
