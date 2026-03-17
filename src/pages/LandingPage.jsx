import React, { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, BookOpen, Target, Brain, ArrowRight, Loader2, Sparkles, CheckCircle2, ChevronDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What happens in the 20-minute Student Audit?",
    answer: "The Student Audit is a mandatory 1-on-1 diagnostic consultation where we evaluate your child's current conceptual understanding, identify knowledge gaps, and determine if our rigorous 12-student cohort model is the right fit for them."
  },
  {
    question: "Do you cover competitive exams like JEE/NEET?",
    answer: "Our primary focus in this specific cohort is building a rock-solid foundation for CBSE & ICSE Board Exams (aiming for 95%+). A strong NCERT foundation is the prerequisite for JEE/NEET, and our 'Clarity Recall Framework' ensures students are well-prepared to tackle competitive questions."
  },
  {
    question: "Why only 12 students per batch?",
    answer: "Large 'Factory Model' batches (60+ students) only allow for 1.5 minutes of teacher attention per student. By capping our batch at exactly 12 students, we guarantee 10x more personalized attention (15 mins/day), allowing us to provide a 'Judgment Free Time' for doubt clearing."
  },
  {
    question: "What are the Lab Facilities for?",
    answer: "We have dedicated in-house lab facilities to help students prepare practically for their Board exams. Theory is only half the battle; hands-on experience ensures they score full marks in practical assessments."
  }
];

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Timer State: 2 hours 37 minutes = (2 * 3600) + (37 * 60) = 9420 seconds
  const [timeLeft, setTimeLeft] = useState(9420);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const [leadFormData, setLeadFormData] = useState({
    name: '',
    phone: '',
    email: '',
    target: ''
  });

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using the same webhook from the diagnostic test
    const webhookUrl = "https://script.google.com/macros/s/AKfycbwueONEh-XXNqG35KzuqU-t_Kz4aZohmJdrzI1XHvaAfN7rOsIXh4wwCUR6hHGiMwYp/exec";

    try {
      const formData = new URLSearchParams();
      formData.append('name', leadFormData.name);
      formData.append('phone', leadFormData.phone);
      formData.append('email', leadFormData.email);
      // We don't have 'board' or 'subject' here, but we can pass 'target' as exam, and dummy values for the rest to satisfy the sheets structure if needed.
      formData.append('board', 'N/A');
      formData.append('exam', leadFormData.target);
      formData.append('subject', 'Demo Booking');

      await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setLeadFormData({ name: '', phone: '', email: '', target: '' });
      }, 3000);

    } catch (err) {
      console.error("Failed to sync lead data:", err);
      // Even if it fails normally due to CORS we assume success in no-cors, but catch network errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/20 overflow-x-hidden">
      {/* --- ELITE NAVBAR --- */}
      <nav className="fixed w-full z-50 top-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xl tracking-tight">
            <Brain className="w-6 h-6 text-teal-600" />
            Physics Elixir
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Methodology</a>
            <a href="#testimonials" className="hover:text-teal-400 transition-colors">Success Stories</a>
            <Link to="/diagnostic" className="hover:text-blue-600 transition-colors flex items-center gap-1 group">
               Test Platform <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_4px_14px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)]"
          >
            Book Free Demo
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-sm font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-500" />
              11th & 12th (2026-27) Admissions Open
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 mt-4">
              Physics. Chemistry. <br />Math. Biology.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-lg leading-relaxed mt-6">
              Exclusive 12-Student Batch for CBSE & ICSE. Stop being a number in a "Coaching Factory". Get 10x more personalized attention from elite mentors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.5)] group"
              >
                Enroll Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                to="/diagnostic"
                className="bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-blue-200 px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-sm shadow-sm"
              >
                <Target className="w-5 h-5 text-blue-600" /> Book an Audit
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#6fb382]/30 to-[#4ca8d4]/30 rounded-[3rem] blur-3xl transform -rotate-6"></div>
             <div className="relative w-full aspect-square md:aspect-auto md:h-full max-h-[550px] rounded-3xl bg-white border border-slate-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6fb382] via-[#f0c05a] to-[#0047a5]"></div>
                
                <h2 className="text-4xl md:text-5xl font-black text-center text-[#1e4a2d] leading-tight mb-8">
                  <span className="text-6xl text-[#6fb382]">11ᵀᴴ</span> & <span className="text-6xl text-[#6fb382]">12ᵀᴴ</span><br/>
                  <span className="text-[#0047a5] block mt-2 text-2xl md:text-3xl tracking-wide uppercase">2026-27 Batch</span>
                </h2>
                
                <div className="w-full max-w-sm space-y-4">
                   <div className="bg-[#f0c05a]/20 border border-[#f0c05a]/40 p-4 rounded-xl flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#f0c05a] flex items-center justify-center text-white font-bold">12</div>
                     <div className="font-bold text-[#4a3500]">Strictly 12-Student Batch</div>
                   </div>
                   <div className="bg-[#6fb382]/20 border border-[#6fb382]/40 p-4 rounded-xl flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#6fb382] flex items-center justify-center text-white"><BookOpen size={20}/></div>
                     <div className="font-bold text-[#1e4a2d]">PCMB for CBSE & ICSE</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- WHY PHYSICS ELIXIR SECTION --- */}
      <section id="features" className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-[#0047a5]">Why Physics Elixir?</h2>
              <div className="w-24 h-1 bg-[#c25e36] mb-8"></div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg font-medium">
                <p>
                  Dear Parents and Future Scholars, with the current Education System bright students are being pushed into <span className="bg-[#f0c05a] text-[#4a3500] px-2 py-0.5 rounded font-bold">"Coaching Factories"</span> which leaves them mentally drained & underconfident.
                </p>
                <p>
                  Buried in large batches, students rarely get the chance to stand up and ask their doubts or explore their learning further. This forced silence slowly builds into hesitation, which ultimately leads to an underdeveloped conceptual clarity.
                </p>
                <div className="bg-slate-50 border-l-4 border-[#0047a5] p-6 rounded-r-2xl italic text-slate-800 font-bold">
                  “We stand against 'Coaching Factory' style learning by offering personalized one-on-one exam focused approach with simplified, straight-forward & easy to understand concepts”
                </div>
              </div>

              <div className="mt-12 flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-[#0047a5]">Neha Jivnani Gupta</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest mt-1 font-bold italic">Founder & Physics Mentor</div>
                </div>
              </div>
            </div>

            {/* The 10x More Attention Comparison */}
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-black italic text-center mb-8"><span className="text-[#0047a5]">10X</span> <span className="text-[#0047a5]">MORE ATTENTION</span></h3>
              <div className="w-16 h-1 bg-[#c25e36] mx-auto mb-10"></div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="bg-slate-500 py-3 text-center text-white font-bold uppercase tracking-wider text-sm border-b-4 border-slate-600">The Factory Model</div>
                  <div className="p-8 text-center bg-slate-50 flex-1">
                    <div className="text-slate-800 mb-4 font-bold">60 Students ÷ 90 Minutes =</div>
                    <div className="text-5xl font-black text-slate-400 mb-2">1.5 <span className="text-xl">min</span></div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">per day of teacher attention</div>
                  </div>
                  <div className="p-4 border-t text-sm text-slate-700 bg-white">
                    <span className="font-bold text-slate-900 uppercase block mb-1">Why it doesn't work?</span>
                    In big batches, Students stop asking "stupid" questions out of fear.
                  </div>
                </div>

                <div className="bg-white border-2 border-[#0047a5] rounded-2xl overflow-hidden shadow-xl transform sm:scale-105 flex flex-col relative z-10">
                  <div className="bg-[#0047a5] py-3 text-center text-white font-bold uppercase tracking-wider text-sm border-b-4 border-[#003380]">The Elixir Model</div>
                  <div className="p-8 text-center bg-blue-50/50 flex-1">
                    <div className="text-slate-800 mb-4 font-bold">12 Students ÷ 180 Minutes =</div>
                    <div className="text-5xl font-black text-[#0047a5] mb-2">15 <span className="text-xl">min</span></div>
                    <div className="text-xs text-[#0047a5] uppercase tracking-wide font-bold">/ day (~1.5 hrs / week)</div>
                  </div>
                  <div className="p-4 border-t border-blue-100 text-sm text-slate-700 bg-white">
                     <span className="font-bold text-slate-900 uppercase block mb-1">How we make it a success?</span>
                    At Physics Elixir we provide the <span className="font-bold">"Judgment Free Time"</span> where clarity is the only priority!
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-12 pt-10 border-t mt-4">
                <div className="text-center"><div className="w-16 h-16 bg-white shadow-sm border rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🚫</div><div className="text-sm text-slate-600 font-bold tracking-wide">No Fear</div></div>
                <div className="text-center"><div className="w-16 h-16 bg-white shadow-sm border rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🙈</div><div className="text-sm text-slate-600 font-bold tracking-wide">No Shame</div></div>
                <div className="text-center"><div className="w-16 h-16 bg-amber-50 shadow-sm border border-amber-200 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">💡</div><div className="text-sm text-amber-600 font-bold tracking-wide">Total Clarity</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAM HIGHLIGHTS SECTION --- */}
      <section className="py-24 bg-slate-100 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-[#0047a5] italic">Program Highlights</h2>
            <div className="w-24 h-1 bg-[#c25e36] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#98c9a3] p-8 rounded-2xl text-[#1a3622] transform transition-transform hover:-translate-y-2">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block font-bold mb-6">12-Student Batch</div>
              <p className="font-medium text-lg leading-snug">Get your child <span className="font-bold">10x more attention</span> from their mentors than traditional institutes.</p>
            </div>
            
            <div className="bg-[#f0c05a] p-8 rounded-2xl text-[#4a3500] transform transition-transform hover:-translate-y-2">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block font-bold mb-6">Clarity Recall Framework</div>
              <p className="font-medium text-lg leading-snug">Our <span className="font-bold">Unique</span> classroom teaching <span className="font-bold">Framework</span> that boosts recall rate substantially.</p>
            </div>
            
            <div className="bg-[#c25e36] p-8 rounded-2xl text-white transform transition-transform hover:-translate-y-2">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block font-bold mb-6">Lab Facilities</div>
              <p className="font-medium text-lg leading-snug">Prepare for <span className="font-bold border-b border-white/50">Board</span> Practicals in-house with dedicated <span className="font-bold border-b border-white/50">Lab Facilities</span>.</p>
            </div>
            
            <div className="bg-[#0047a5] p-8 rounded-2xl text-white transform transition-transform hover:-translate-y-2">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block font-bold mb-6">YouTube Revisions</div>
              <p className="font-medium text-lg leading-snug">Revise <span className="font-bold">NCERT</span> Concepts from anywhere on <span className="font-bold border-b border-white/50">YouTube</span>.</p>
            </div>
            
            <div className="bg-[#ffcc66] p-8 rounded-2xl text-[#5c4300] transform transition-transform hover:-translate-y-2">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block font-bold mb-6">Simplified Hacks</div>
              <p className="font-medium text-lg leading-snug">Turn Complex Topics into <span className="font-bold">simple</span>, straight-forward, <span className="font-bold">easy-to-understand</span> logic.</p>
            </div>
            
            <div className="bg-[#a3d9b1] p-8 rounded-2xl text-[#1e4a2d] transform transition-transform hover:-translate-y-2">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block font-bold mb-6">Progress Tracking</div>
              <p className="font-medium text-lg leading-snug">Real-time progress <span className="font-bold">tracking</span> and direct mentor communications with students & parents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0047a5] mb-2 uppercase tracking-tight italic">The Roadmap</h2>
            <h3 className="text-2xl md:text-3xl font-black text-[#0047a5] uppercase tracking-widest italic">Milestones to 95%</h3>
            <div className="w-24 h-1 bg-[#c25e36] mx-auto mt-6"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#98c9a3] p-8 rounded-2xl border-l-8 border-[#3a8b50] shadow-lg flex flex-col md:flex-row gap-6 items-center md:items-start group hover:bg-[#a5d2b0] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#1a3622] text-[#98c9a3] flex items-center justify-center text-2xl font-bold shrink-0">1</div>
              <div>
                <h4 className="text-2xl font-bold text-[#1a3622] mb-2">Phase 1: Foundation Priming</h4>
                <p className="text-[#2c5236] text-lg font-medium">Mapping the "skeleton" of chapters before deep-dives to reduce initial anxiety.</p>
              </div>
            </div>

            <div className="bg-[#f0c05a] p-8 rounded-2xl border-l-8 border-[#b88c32] shadow-lg flex flex-col md:flex-row gap-6 items-center md:items-start group hover:bg-[#f3c86c] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#4a3500] text-[#f0c05a] flex items-center justify-center text-2xl font-bold shrink-0">2</div>
              <div>
                <h4 className="text-2xl font-bold text-[#4a3500] mb-2">Phase 2: Conceptual Mastery</h4>
                <p className="text-[#684c00] text-lg font-medium">Using simplified hacks to turn intimidating theorems into straight-forward logic.</p>
              </div>
            </div>

            <div className="bg-[#c25e36] p-8 rounded-2xl border-l-8 border-[#8b3f1e] shadow-lg flex flex-col md:flex-row gap-6 items-center md:items-start group hover:bg-[#cc6840] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#3e1b0d] text-[#c25e36] flex items-center justify-center text-2xl font-bold shrink-0">3</div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Phase 3: Practice</h4>
                <p className="text-[#ffe0d3] text-lg font-medium">Rhythmic mock tests and NCERT-focused board preparation.</p>
              </div>
            </div>

            <div className="bg-[#0047a5] p-8 rounded-2xl border-l-8 border-[#002f70] shadow-lg flex flex-col md:flex-row gap-6 items-center md:items-start group hover:bg-[#0051bc] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#e6f0ff] text-[#0047a5] flex items-center justify-center text-2xl font-bold shrink-0">4</div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Phase 4: Tests & One-On-One Doubt Session</h4>
                <p className="text-[#b3d1ff] text-lg font-medium">Final intensive tests & doubt sessions and lab practical mastery to secure the 95% foundation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADMISSIONS PROCESS SECTION (NEW) --- */}
      <section className="py-24 bg-slate-100 relative border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0047a5] mb-2 uppercase tracking-tight italic">Admissions Process</h2>
            <div className="w-32 h-1 bg-[#c25e36] mx-auto mt-6"></div>
          </div>

          <div className="space-y-12 pl-4 md:pl-12 border-l-2 border-slate-300 relative py-8">
            <div className="relative">
              <div className="absolute w-4 h-4 bg-[#c25e36] rounded-full -left-[9px] md:-left-[57px] top-2"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">The Student Audit</h3>
              <p className="text-slate-700 font-medium">A 20-minute diagnostic consultation (Mandatory).</p>
            </div>
            
            <div className="relative">
              <div className="absolute w-4 h-4 bg-[#c25e36] rounded-full -left-[9px] md:-left-[57px] top-2"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Demo Sessions</h3>
              <p className="text-slate-700 font-medium">Ensuring the student is ready to move out of the "Factory" mindset.</p>
            </div>
            
            <div className="relative">
              <div className="absolute w-4 h-4 bg-[#c25e36] rounded-full -left-[9px] md:-left-[57px] top-2"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Quick Test & Student Profile Review</h3>
              <p className="text-slate-700 font-medium">Quick Test of the Topics taught in the demo and confirming the clarity of old concepts.</p>
            </div>
            
            <div className="relative">
              <div className="absolute w-4 h-4 bg-[#c25e36] rounded-full -left-[9px] md:-left-[57px] top-2"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Admission & Payment</h3>
              <p className="text-slate-700 font-medium">Secure one of the 12 limited seats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TEACHERS & SUBJECTS SECTION (NEW) --- */}
      <section className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0047a5] mb-2 uppercase tracking-tight italic">Teachers & Subjects</h2>
            <div className="w-32 h-1 bg-[#c25e36] mx-auto mt-6 mb-16"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pb-20 border-b border-slate-200">
             <div className="bg-[#a3dbb5] p-8 rounded-2xl flex items-center justify-between text-[#1e4a2d]">
                <div>
                   <h3 className="text-2xl font-bold mb-4">Neha Jivnani Gupta</h3>
                   <ul className="list-disc pl-5 font-bold space-y-1 mb-6 text-sm">
                      <li>Physics Instructor</li>
                      <li>10+ Years Of Experience</li>
                   </ul>
                   <div className="font-bold border-t border-[#1e4a2d]/30 pt-4 uppercase tracking-wide text-sm">Contact: 84698 62440</div>
                </div>
             </div>

             <div className="bg-[#facc6b] p-8 rounded-2xl flex items-center justify-between text-[#5c4300]">
                <div>
                   <h3 className="text-2xl font-bold mb-4">Ruchita Punkhia</h3>
                   <ul className="list-disc pl-5 font-bold space-y-1 mb-6 text-sm">
                      <li>Chemistry Instructor</li>
                      <li>15+ Years Of Experience</li>
                   </ul>
                   <div className="font-bold border-t border-[#5c4300]/30 pt-4 uppercase tracking-wide text-sm">Contact: 7818075969</div>
                </div>
             </div>

             <div className="bg-[#c45a32] p-8 rounded-2xl flex items-center justify-between text-white">
                <div>
                   <h3 className="text-2xl font-bold mb-4">Omprakash Pandey</h3>
                   <ul className="list-disc pl-5 font-bold space-y-1 mb-6 text-sm">
                      <li>Mathematics Instructor</li>
                      <li>22+ Years Of Experience</li>
                   </ul>
                   <div className="font-bold border-t border-white/30 pt-4 uppercase tracking-wide text-sm">Contact: 7984062889</div>
                </div>
             </div>

             <div className="bg-[#0b51b7] p-8 rounded-2xl flex items-center justify-between text-white">
                <div>
                   <h3 className="text-2xl font-bold mb-4">Navil Bagadiya</h3>
                   <ul className="list-disc pl-5 font-bold space-y-1 mb-6 text-sm">
                      <li>Biology Instructor</li>
                      <li>10+ Years Of Experience</li>
                   </ul>
                   <div className="font-bold border-t border-white/30 pt-4 uppercase tracking-wide text-sm">Contact: 84698 62440</div>
                </div>
             </div>
          </div>

          <div className="pt-20 text-center max-w-4xl mx-auto">
             <h2 className="text-5xl font-black text-[#0047a5] mb-6 uppercase tracking-tight italic">The Cohort</h2>
             <div className="w-24 h-1 bg-[#c25e36] mx-auto mb-8"></div>
             <p className="text-xl font-medium italic text-slate-700 leading-relaxed mb-12">
               Focus is contagious. We select dedicated students from local schools to build a highly intentional room. A curated room of 12 focused peers. No back-row distractions.
             </p>

             <div className="space-y-8">
                <div>
                   <h4 className="text-xl font-bold text-[#0047a5] mb-2 uppercase">CBSE Boards:</h4>
                   <p className="text-lg text-slate-800 font-medium">Podar Int. | Sakar | DPS | AGS | GIS | Ananya Vidyalaya | DCIS | Pune Int.</p>
                </div>
                <div>
                   <h4 className="text-xl font-bold text-[#0047a5] mb-2 uppercase">GSEB Boards:</h4>
                   <p className="text-lg text-slate-800 font-medium">HBK | Gyandeep High School | IP | Swastik</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- BATCH AVAILABILITY (SCARCITY) --- */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#0047a5] mb-2 uppercase tracking-tight italic">Batch Status</h2>
          <div className="w-16 h-1 bg-[#c25e36] mx-auto mt-4 mb-16"></div>
          
          <div className="grid md:grid-cols-3 gap-6">
             <div className="border border-slate-300 rounded-2xl p-8 bg-slate-200/50 relative overflow-hidden opacity-70">
                <div className="relative font-bold text-slate-500 uppercase tracking-widest text-sm mb-2">Batch 1</div>
                <div className="relative text-2xl font-black text-slate-800">Entry Closed!</div>
             </div>
             
             <div className="border-2 border-amber-500/50 rounded-2xl p-8 bg-amber-50 relative shadow-[0_0_30px_rgba(245,158,11,0.1)] transform md:-translate-y-2">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-500 rounded-t-2xl"></div>
                <div className="font-bold text-amber-600 uppercase tracking-widest text-sm mb-2 mt-2">Batch 2</div>
                <div className="text-2xl font-black text-[#4a3500]">Half Filled</div>
                <div className="text-sm font-bold text-amber-700 mt-3 animate-pulse">Filling fast - Limited seats</div>
             </div>
             
             <div className="border border-slate-300 rounded-2xl p-8 bg-white relative shadow-sm">
                <div className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-2">Batch 3</div>
                <div className="text-2xl font-black text-slate-800">Opening Soon</div>
                <div className="text-sm font-medium text-slate-500 mt-3">Join the waitlist</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SUCCESS STORIES (SOCIAL PROOF) --- */}
      <section id="testimonials" className="py-24 bg-white relative border-t border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0047a5] mb-2 uppercase tracking-tight italic">What Parents Say</h2>
            <div className="w-24 h-1 bg-[#c25e36] mx-auto mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 relative">
               <div className="flex text-amber-500 mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <p className="text-slate-700 italic mb-6 leading-relaxed">"My son used to be terrified of Physics. Since joining the 12-student batch, the 10x attention has completely transformed his confidence. He looks forward to classes now!"</p>
               <div className="font-bold text-slate-900">- Priya M., Parent of 11th Grader</div>
             </div>
             
             <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 relative">
               <div className="flex text-amber-500 mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <p className="text-slate-700 italic mb-6 leading-relaxed">"We pulled our daughter out of a 'Coaching Factory' after 3 months. The Elixir Model's focus on logic over memorization is exactly what she needed for her Board exams."</p>
               <div className="font-bold text-slate-900">- Rahul S., Parent of 12th Grader</div>
             </div>
             
             <div className="bg-[#0047a5] p-8 rounded-2xl shadow-xl border border-blue-600 relative text-white">
               <div className="absolute top-4 right-4 text-6xl text-blue-400/30 font-serif">"</div>
               <div className="flex text-amber-400 mb-6 relative z-10">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <p className="text-blue-50 italic mb-6 relative z-10 leading-relaxed">"The Clarity Recall Framework is brilliant. Neha Ma'am ensures every single doubt is cleared. The lab facilities are a huge bonus for practicals."</p>
               <div className="font-bold text-white relative z-10">- Smita K., Parent of 12th Grader</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0047a5] mb-2 uppercase tracking-tight italic">Frequently Asked Questions</h2>
            <div className="w-32 h-1 bg-[#c25e36] mx-auto mt-6"></div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-slate-900 hover:text-[#0047a5] transition-colors"
                >
                  <span className="pr-8 text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180 text-[#c25e36]' : 'text-slate-400'}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION BAR --- */}
      <section className="py-24 relative overflow-hidden bg-slate-100 border-t border-slate-200">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#c25e36] to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#0047a5] to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-[#0047a5] mb-6 uppercase italic">Ready to move out of Factory Learning?</h2>
           <div className="w-24 h-1 bg-[#c25e36] mx-auto mb-8"></div>
          <p className="text-xl text-slate-700 mb-10 font-bold">WhatsApp to book your Demo Sessions.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-10 py-5 rounded-full text-xl font-bold transition-all inline-flex items-center gap-3 shadow-xl"
          >
            Claim Your Free Session <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white pt-16 pb-40 border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-black text-[#0047a5] mb-6 uppercase italic">Contact</h3>
            <div className="w-24 h-1 bg-[#c25e36] mx-auto mb-12"></div>
            
            <p className="text-xl font-bold text-slate-800 mb-2">Physics Elixir Chandkheda, Ahmedabad</p>
            <p className="text-xl font-bold text-slate-800">Contact: +91 84698 62440</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="text-slate-500 font-bold text-sm flex items-center gap-2">
               <Brain className="w-5 h-5 text-teal-600" /> Physics_Elixir
           </div>
           <div className="text-slate-500 font-medium text-xs">
            © {new Date().getFullYear()} Physics Elixir. All rights reserved.
          </div>
        </div>
      </footer>

      {/* --- BOOKING MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in">
                <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6 text-teal-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-slate-400">Our team will contact you shortly to schedule your demo.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Book a Demo</h3>
                  <p className="text-slate-400 text-sm">Fill out the details below and we'll schedule a strategic call.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input required type="text" value={leadFormData.name} onChange={e => setLeadFormData({ ...leadFormData, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" placeholder="John Doe" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">WhatsApp Number</label>
                    <input required type="tel" value={leadFormData.phone} onChange={e => setLeadFormData({ ...leadFormData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" placeholder="+91 XXXXXXXXXX" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input required type="email" value={leadFormData.email} onChange={e => setLeadFormData({ ...leadFormData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Target Exam / Grade</label>
                    <select required value={leadFormData.target} onChange={e => setLeadFormData({ ...leadFormData, target: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none cursor-pointer">
                      <option value="" disabled className="text-slate-600">Select Target...</option>
                      <option value="JEE">JEE Main / Advanced</option>
                      <option value="NEET">NEET</option>
                      <option value="Class 12">Class 12 Boards</option>
                      <option value="Class 11">Class 11</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !leadFormData.name || !leadFormData.phone || !leadFormData.email || !leadFormData.target}
                    className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Confirm Booking Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* --- GLOBAL STICKY URGENCY BANNER --- */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 border-t border-red-700 z-50 shadow-[0_-10px_40px_rgba(220,38,38,0.2)] animate-in slide-in-from-bottom-10 duration-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 text-white">
             <div className="animate-pulse flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
             </div>
             <div className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
                <span>Demo Bookings Closes in:</span>
                <div className="bg-black/20 px-3 py-1.5 rounded-md font-mono text-base sm:text-lg tabular-nums border border-white/20 shadow-inner">
                  {hours}h {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
                </div>
             </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            Secure Your Spot <ArrowRight className="w-5 h-5 hidden sm:block" />
          </button>
        </div>
      </div>
    </div>
  );
}
