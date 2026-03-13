import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Clock, Shield, Target, Activity, ChevronRight,
  CheckCircle2, XCircle, EyeOff, Play, ArrowRight, BookOpen, AlertCircle, Loader2
} from 'lucide-react';
import Papa from 'papaparse';

// --- MOCK DATA (The "Database") ---
// The live Google Sheets CSV URL
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTE2kR-JqM3y_jV8fOQzQG1Gz_p2w1_E2V8sI5L3M9O1I0Z8k3-iY7f2l5H_Z6Z7iY9k2z1N9Q4/pub?output=csv';

// --- AI LOGIC SIMULATOR ---
const generateMentorMessage = (scorePct, timerMode, avgSpeedRatio) => {
  const isHighAnxiety = timerMode === 'Hidden'; // Simplified anxiety inference based on hiding the timer

  if (scorePct < 40 && isHighAnxiety) {
    return "Take a breath. Physics tests are designed to be tough. Your score is just a starting line, not a finish line. Let's ignore the big picture for a second and just look at one concept at a time. You showed courage today.";
  } else if (scorePct >= 80 && isHighAnxiety) {
    return "Incredible work. You hid the timer, indicating a preference for low pressure, but your accuracy is top-tier. You *know* this material better than you think you do. Trust your preparation and your instincts.";
  } else if (scorePct < 50 && !isHighAnxiety && avgSpeedRatio < 0.6) {
    return "You're moving fast, but leaving points on the table. You are guessing on questions well under the ideal time. Let's build patience. Next time, force yourself to use the Count-up timer and slow down.";
  } else if (scorePct >= 80 && !isHighAnxiety) {
    return "Flawless execution. You've mastered this baseline level. It's time to upgrade your target to Advanced constraints. Let's look at where we can shave off a few seconds without losing accuracy.";
  } else {
    return "Good effort today. We have a clear picture of your current baseline. Review the diagnostic heatmap below to see exactly where we need to focus our energy next.";
  }
};

// --- MAIN COMPONENT ---
export default function App() {
  // Global State
  const [phase, setPhase] = useState('onboarding'); // onboarding, dashboard, test, report

  // Data State
  const [questions, setQuestions] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // User State
  const [user, setUser] = useState({ name: '', phone: '', email: '', board: '', exam: '', subject: '' });

  // Test State
  const [testConfig, setTestConfig] = useState({ timerMode: 'Countdown', confidence: 3 });
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: { selected: index, timeSpent: seconds } }
  const [qStartTime, setQStartTime] = useState(Date.now());
  const [testTimeElapsed, setTestTimeElapsed] = useState(0);
  const timerIntervalRef = useRef(null);

  // Report State
  const [expandedQ, setExpandedQ] = useState(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // We use the ID from the user's sharing link, but formatted for CSV export
        // The user provided: https://docs.google.com/spreadsheets/d/14LwHQo-u_TcrHAsi_IYYI_FSuukO7No7aA17g3OS-3c/edit?usp=sharing
        const sheetId = '14LwHQo-u_TcrHAsi_IYYI_FSuukO7No7aA17g3OS-3c';
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

        // Try to optionally grab the document title using a CORS proxy
        let documentTitle = "Live Test";
        try {
          const proxyUrl = `https://api.microlink.io?url=${encodeURIComponent(`https://docs.google.com/spreadsheets/d/${sheetId}/edit`)}&force=true`;
          const titleResponse = await fetch(proxyUrl);
          if (titleResponse.ok) {
            const data = await titleResponse.json();
            if (data.data && data.data.title) {
              documentTitle = data.data.title.replace(' - Google Sheets', '').trim();
            }
          }
        } catch (e) {
          console.warn("Could not fetch document title. Using fallback name.", e);
        }

        Papa.parse(csvUrl, {
          download: true,
          header: true,
          complete: (results) => {
            const parsedQuestions = results.data
              .filter(row => row['Questions'] && row['Questions'].trim() !== '') // Filter out empty rows
              .map((row, index) => {
                // Determine correct index based on letter (A=0, B=1, etc)
                const correctLetter = (row['Correct Answer'] || '').trim().toUpperCase();
                let correctIndex = 0;
                if (correctLetter === 'B') correctIndex = 1;
                else if (correctLetter === 'C') correctIndex = 2;
                else if (correctLetter === 'D') correctIndex = 3;

                // Attempt to parse '0.5 min' to 30 seconds
                let idealTimeSecs = 60;
                const timeStr = row['Ideal Time'] || '';
                if (timeStr.includes('min')) {
                  idealTimeSecs = parseFloat(timeStr) * 60;
                } else if (!isNaN(parseFloat(timeStr))) {
                  idealTimeSecs = parseFloat(timeStr);
                }

                return {
                  id: row['ID'] || (index + 1),
                  subject: documentTitle, // Dynamically pulled from doc title
                  topic: row['Topic'] || 'General',
                  difficulty: 2, // Hardcoded as Difficulty is not in the CSV
                  idealTime: idealTimeSecs,
                  content: row['Questions'],
                  options: [row['A'], row['B'], row['C'], row['D']].filter(Boolean),
                  correct: correctIndex
                };
              });

            setQuestions(parsedQuestions);

            // Extract unique test names (subjects) from the spreadsheet
            const uniqueTests = [...new Set(parsedQuestions.map(q => q.subject))];
            setAvailableTests(uniqueTests);
            setLoadingConfig(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setFetchError("Failed to load test data. Please try again.");
            setLoadingConfig(false);
          }
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setFetchError("Failed to connect to the database.");
        setLoadingConfig(false);
      }
    };

    fetchQuestions();
  }, []);

  // --- PHASE 1: ONBOARDING ---
  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    setPhase('dashboard');
  };

  const renderOnboarding = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-center mb-6 text-teal-600">
          <Brain size={48} strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-light text-center text-slate-800 mb-2">Physics Elixir Test Platform</h1>
        <p className="text-center text-slate-500 mb-8 text-sm">Let's test your knowledge.</p>

        <form onSubmit={handleOnboardingSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
              <input required type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="Write your full name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Number</label>
                <input required type="tel" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="+91 XXXXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Id</label>
                <input required type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Board</label>
              <select value={user.board} onChange={e => setUser({ ...user, board: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                <option value="">Select...</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State">State Board</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target</label>
              <select value={user.exam} onChange={e => setUser({ ...user, exam: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                <option value="">Select...</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="Boards">Boards Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Test</label>
            <select value={user.subject} onChange={e => setUser({ ...user, subject: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white">
              <option value="">Select from the list</option>
              {availableTests.map(testName => (
                <option key={testName} value={testName}>{testName}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-2">Select the test which you want to appear in.</p>
          </div>

          <button type="submit" disabled={!user.name || !user.phone || !user.email || !user.board || !user.exam || !user.subject} className="w-full bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-xl font-medium transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            Let's Start <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );

  // --- PHASE 2: DASHBOARD ---
  const renderDashboard = () => (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-slate-800">Hi, {user.name}.</h1>
            <p className="text-slate-500 mt-1">Ready for your <span className="font-semibold text-teal-600">{user.subject}</span> diagnostic check-in?</p>
          </div>
          <div className="h-12 w-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xl">
            {user.name.charAt(0)}
          </div>
        </header>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Next Best Action</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-indigo-50 p-6 rounded-2xl flex-1 flex items-start gap-4 w-full">
              <Activity className="text-indigo-500 shrink-0" size={24} />
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-1">Baseline Physics Diagnostic</h3>
                <p className="text-indigo-700/70 text-sm mb-4">5 Questions • Adaptive Timer • Granular Report</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-indigo-900 mb-2">Choose Timer Mode to manage stress:</label>
                    <div className="flex flex-wrap gap-2">
                      {['Countdown', 'Count-up', 'Hidden'].map(mode => (
                        <button key={mode} onClick={() => setTestConfig({ ...testConfig, timerMode: mode })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${testConfig.timerMode === mode ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100'}`}>
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => { setPhase('test'); setQStartTime(Date.now()); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 mt-4">
                    <Play size={18} fill="currentColor" /> Start Focused Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- PHASE 3: TEST ARENA ---
  useEffect(() => {
    if (phase === 'test') {
      timerIntervalRef.current = setInterval(() => {
        setTestTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [phase]);

  const handleOptionSelect = (optionIndex) => {
    const timeSpent = Math.floor((Date.now() - qStartTime) / 1000);
    // Get only the questions for the chosen subject
    const activeQuestions = questions.filter(q => q.subject === user.subject);

    setAnswers(prev => ({
      ...prev,
      [activeQuestions[currentQIndex].id]: { selected: optionIndex, timeSpent }
    }));

    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setQStartTime(Date.now());
    } else {
      setPhase('report');
    }
  };

  const renderTestArena = () => {
    const activeQuestions = questions.filter(q => q.subject === user.subject);
    const question = activeQuestions[currentQIndex];

    const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    let timerDisplay;
    if (testConfig.timerMode === 'Hidden') {
      timerDisplay = <><EyeOff size={16} /> Timer Active</>;
    } else if (testConfig.timerMode === 'Count-up') {
      timerDisplay = <><Clock size={16} /> {formatTime(testTimeElapsed)}</>;
    } else {
      // Countdown based on total ideal time
      const totalIdealTime = activeQuestions.reduce((acc, q) => acc + q.idealTime, 0);
      const remaining = Math.max(0, totalIdealTime - testTimeElapsed);
      timerDisplay = <><Clock size={16} /> {formatTime(remaining)} left</>;
    }

    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
        {/* Empathetic Timer Pill */}
        <div className="absolute top-8 transition-all opacity-70 hover:opacity-100 bg-white shadow-sm border border-zinc-200 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-zinc-600">
          {timerDisplay}
        </div>

        <div className="w-full max-w-2xl">
          {/* Question Canvas */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-normal text-zinc-800 leading-relaxed mb-8">
              {question.content}
            </h2>

            {/* Frictionless Options */}
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className="w-full text-left p-4 md:p-5 rounded-2xl border border-zinc-200 bg-white hover:border-teal-500 hover:shadow-md hover:shadow-teal-100 transition-all duration-300 group flex items-center gap-4 text-zinc-700"
                >
                  <div className="h-8 w-8 rounded-full border border-zinc-300 group-hover:border-teal-500 flex items-center justify-center text-sm font-medium text-zinc-400 group-hover:text-teal-600 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {activeQuestions.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentQIndex ? 'w-8 bg-teal-500' : idx < currentQIndex ? 'w-2 bg-teal-200' : 'w-2 bg-zinc-200'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- PHASE 4: DIAGNOSTIC REPORT ---
  const renderReport = () => {
    // Calculate Analytics
    let totalCorrect = 0;
    let totalTime = 0;
    let totalIdealTime = 0;
    const topicStats = {};
    const activeQuestions = questions.filter(q => q.subject === user.subject);

    activeQuestions.forEach((q) => {
      const ans = answers[q.id];
      if (!ans) return;

      const isCorrect = ans.selected === q.correct;
      if (isCorrect) totalCorrect++;
      totalTime += ans.timeSpent;
      totalIdealTime += q.idealTime;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { correct: 0, total: 0, timeSpent: 0, idealTime: 0 };
      }
      if (isCorrect) topicStats[q.topic].correct++;
      topicStats[q.topic].total++;
      topicStats[q.topic].timeSpent += ans.timeSpent;
      topicStats[q.topic].idealTime += q.idealTime;
    });

    const scorePct = Math.round((totalCorrect / activeQuestions.length) * 100);
    const avgSpeedRatio = totalTime / totalIdealTime;

    // Assign Quadrants
    const quadrants = {
      mastered: [],
      needsFluency: [],
      careless: [],
      gap: []
    };

    Object.entries(topicStats).forEach(([topic, stats]) => {
      const accuracy = stats.correct / stats.total;
      const speedRatio = stats.timeSpent / stats.idealTime;

      if (accuracy >= 0.7 && speedRatio <= 1.2) quadrants.mastered.push(topic);
      else if (accuracy >= 0.7 && speedRatio > 1.2) quadrants.needsFluency.push(topic);
      else if (accuracy < 0.7 && speedRatio <= 0.8) quadrants.careless.push(topic);
      else quadrants.gap.push(topic);
    });

    const mentorMessage = generateMentorMessage(scorePct, testConfig.timerMode, avgSpeedRatio);

    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 animate-in fade-in duration-700">
        <div className="max-w-4xl mx-auto space-y-8">

          <header className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl font-light text-slate-800">Diagnostic Complete.</h1>
              <p className="text-slate-500">Here is your prescriptive breakdown, {user.name}.</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-light text-slate-800">{scorePct}%</div>
              <div className="text-sm text-slate-400">Accuracy</div>
            </div>
          </header>

          {/* AI Mentor Message Card */}
          <div className="bg-white rounded-2xl p-6 border-l-4 border-teal-500 shadow-sm flex gap-4 items-start">
            <div className="bg-teal-50 p-3 rounded-full text-teal-600 mt-1">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Mentor AI Insight</h3>
              <p className="text-slate-600 leading-relaxed">{mentorMessage}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Diagnostic Heatmap */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium text-slate-800 mb-6 flex items-center gap-2"><Target size={20} className="text-slate-400" /> Accuracy vs. Time Matrix</h3>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-64">
                <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-teal-700 uppercase">Mastered</span>
                  <div className="text-sm text-teal-900 font-medium">
                    {quadrants.mastered.length > 0 ? quadrants.mastered.join(', ') : '-'}
                  </div>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-amber-700 uppercase">Needs Fluency</span>
                  <div className="text-sm text-amber-900 font-medium">
                    {quadrants.needsFluency.length > 0 ? quadrants.needsFluency.join(', ') : '-'}
                  </div>
                </div>
                <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-orange-700 uppercase">Rushed / Careless</span>
                  <div className="text-sm text-orange-900 font-medium">
                    {quadrants.careless.length > 0 ? quadrants.careless.join(', ') : '-'}
                  </div>
                </div>
                <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-purple-700 uppercase">Knowledge Gap</span>
                  <div className="text-sm text-purple-900 font-medium">
                    {quadrants.gap.length > 0 ? quadrants.gap.join(', ') : '-'}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-4 px-2">
                <span>Fast Pace</span>
                <span>Slow Pace</span>
              </div>
            </div>

            {/* Actionable Prescription */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-medium text-slate-800 mb-6 flex items-center gap-2"><BookOpen size={20} className="text-slate-400" /> Next Best Actions</h3>
              <div className="space-y-4 flex-1">
                {quadrants.gap.map((topic, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    <div>
                      <span className="text-sm font-medium text-slate-700 block">Review NCERT Theory: {topic}</span>
                      <span className="text-xs text-slate-500 block">Identified as a core knowledge gap.</span>
                    </div>
                  </label>
                ))}
                {quadrants.careless.map((topic, i) => (
                  <label key={`c-${i}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    <div>
                      <span className="text-sm font-medium text-slate-700 block">Practice Set: {topic} (Untimed)</span>
                      <span className="text-xs text-slate-500 block">You are rushing. Build accuracy first.</span>
                    </div>
                  </label>
                ))}
                {quadrants.needsFluency.map((topic, i) => (
                  <label key={`f-${i}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    <div>
                      <span className="text-sm font-medium text-slate-700 block">Speed Drills: {topic}</span>
                      <span className="text-xs text-slate-500 block">Concept is clear, but pace is slow.</span>
                    </div>
                  </label>
                ))}
                {quadrants.gap.length === 0 && quadrants.careless.length === 0 && quadrants.needsFluency.length === 0 && (
                  <div className="text-center text-slate-500 mt-10 text-sm">All topics mastered. Proceed to next module.</div>
                )}
              </div>
            </div>
          </div>

          {/* Gentle Review Accordion */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-medium text-slate-800">Question Review</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {activeQuestions.map((q, idx) => {
                const ans = answers[q.id];
                if (!ans) return null;
                const isCorrect = ans.selected === q.correct;
                const isExpanded = expandedQ === q.id;

                return (
                  <div key={q.id} className="bg-white">
                    <button
                      onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {isCorrect ? <CheckCircle2 size={20} className="text-teal-500" /> : <XCircle size={20} className="text-red-400" />}
                        <span className="text-sm font-medium text-slate-700 text-left line-clamp-1 flex-1">
                          Question {idx + 1}: {q.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${ans.timeSpent > q.idealTime ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                          {ans.timeSpent}s / {q.idealTime}s
                        </span>
                        <ChevronRight size={18} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 text-sm animate-in slide-in-from-top-2">
                        <p className="text-slate-800 mb-4">{q.content}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, i) => {
                            let itemClass = "p-3 rounded-lg border ";
                            if (i === q.correct) itemClass += "bg-teal-50 border-teal-200 text-teal-900";
                            else if (i === ans.selected && !isCorrect) itemClass += "bg-red-50 border-red-200 text-red-900";
                            else itemClass += "bg-white border-slate-200 text-slate-500";

                            return (
                              <div key={i} className={itemClass}>
                                {String.fromCharCode(65 + i)}. {opt}
                                {i === q.correct && <span className="ml-2 text-teal-600 text-xs font-semibold">(Correct Answer)</span>}
                                {i === ans.selected && !isCorrect && <span className="ml-2 text-red-600 text-xs font-semibold">(Your Answer)</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-8 pb-12">
            <button onClick={() => { setPhase('dashboard'); setAnswers({}); setCurrentQIndex(0); setTestTimeElapsed(0); }} className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors flex items-center gap-2">
              Return to Dashboard
            </button>
          </div>

        </div>
      </div>
    );
  };

  // --- ROUTER ---
  if (loadingConfig) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-500">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Loading questions from database...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-red-500">
        <AlertCircle className="mb-4" size={32} />
        <p>{fetchError}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-slate-900">
      {phase === 'onboarding' && renderOnboarding()}
      {phase === 'dashboard' && renderDashboard()}
      {phase === 'test' && renderTestArena()}
      {phase === 'report' && renderReport()}
    </div>
  );
}