import React, { useState } from 'react';
import './LandingPage.css';

export default function LandingPage() {
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  const toggleFaq = (index) => {
    setOpenFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    { q: "Is the demo actually free? What's the catch?", a: "Completely free. No catch. You attend, you experience the class, and you decide. If you want to join — we'll tell you how. If not — no pressure, no follow-up calls. We'd rather have students who genuinely want to be here." },
    { q: "Why is it called \"Apply for Demo\" — isn't it just a free class?", a: "Because each demo has max 5 students and we want students who are actually serious about improving. We do a quick 20-minute Student Audit before the demo to understand your level and make the class directly relevant to you. It's not a walk-in. It's intentional." },
    { q: "I'm already in another coaching. Can I still come?", a: "Yes. Many students who join Physics Elixir were previously in another coaching. Come to the demo — experience the difference — and then make your call. No pressure either way." },
    { q: "What are the fees?", a: "₹35,000 per subject per year. You can join for one subject or multiple. Full PCMB is ₹1,05,000 annually. Everything is explained transparently after the demo — no hidden costs, no pressure tactics." },
    { q: "Do you cover GSEB board or only CBSE/ICSE?", a: "All three — CBSE, ICSE, and GSEB. Teaching approach and exam focus are adapted based on your board." },
    { q: "What if I miss a class?", a: "NCERT concepts are recorded and on YouTube. You never permanently fall behind. Revise from anywhere before the next class and pick up where you left off." }
  ];

  return (
    <>


{/* STICKY WA */}
<a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="wa-sticky" target="_blank">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.557 4.118 1.532 5.845L.073 23.927l6.253-1.439A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.676-.497-5.21-1.366l-.374-.219-3.713.854.88-3.607-.244-.39A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
Apply for Demo
</a>

{/* ANN BAR */}
<div className="ann-bar">2026–27 Admissions Open · <span>Batch 2 is 60% filled</span> · Only 5 seats remaining across all batches</div>

{/* NAV */}
<nav>
  <div className="nav-logo">Physics <span>Elixir</span></div>
  <div className="nav-right">
    <span className="nav-badge">5 Seats Left</span>
    <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="btn-nav" target="_blank">Apply for Demo →</a>
  </div>
</nav>

{/* HERO — STUDENT FIRST */}
<section className="hero">
  <div>
    <div className="hero-eyebrow"><span className="hero-eyebrow-dot"></span>Class 11 & 12 · PCMB · CBSE · ICSE · GSEB</div>
    <h1>Stop surviving<br /><em>Physics.</em><br />Start actually<br />getting it.</h1>
    <div className="hero-divider"></div>
    <p className="hero-sub">Physics Elixir is Chandkheda's only <strong>12-student PCMB coaching.</strong> Not a classroom. A room where your teacher knows your name, your doubts, and exactly where you're stuck.</p>
    <div className="hero-student-line">Ask every doubt — no judgment, no fear</div>
    <div className="hero-student-line">Your teacher notices when you zone out</div>
    <div className="hero-student-line">Board prep + JEE/NEET — both, simultaneously</div>
    <div className="hero-student-line">12 focused peers. No back row to hide in.</div>
    <div className="hero-cta-group">
      <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="btn-primary" target="_blank">Apply for Free Demo →</a>
      <a href="https://wa.me/918469862440?text=Hi%2C%20I%20have%20a%20question%20about%20Physics%20Elixir" className="btn-ghost" target="_blank">Ask a Question</a>
    </div>
    <div className="hero-trust">
      <div className="htrust"><div className="htrust-dot"></div>Zero commitment</div>
      <div className="htrust"><div className="htrust-dot"></div>Max 5 students per demo</div>
      <div className="htrust"><div className="htrust-dot"></div>Free session</div>
    </div>
  </div>
  <div className="hero-card">
    <div className="hcard-label">The attention difference — every single day</div>
    <div className="att-grid">
      <div className="att-box bad">
        <div className="att-box-label">Other Coaching</div>
        <div className="att-num">1.5</div>
        <div className="att-unit">min/day attention</div>
      </div>
      <div className="att-box good">
        <div className="att-box-label">Physics Elixir</div>
        <div className="att-num">15</div>
        <div className="att-unit">min/day attention</div>
      </div>
    </div>
    <div className="xbadge">You get 10x more attention here</div>
    <div className="seat-block">
      <div className="seat-row">
        <div className="seat-label">Batch 2 — filling fast</div>
        <div className="seat-count"><span>5</span> / 12 seats left</div>
      </div>
      <div className="seat-bar"><div className="seat-fill"></div></div>
    </div>
    <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="hcard-cta" target="_blank">Apply for a Seat →</a>
  </div>
</section>

{/* PROOF BAR */}
<div className="proof-bar">
  <div className="proof-item"><div className="proof-num">4.8★</div><div className="proof-label">Google Rating</div></div>
  <div className="proof-div"></div>
  <div className="proof-item"><div className="proof-num">12</div><div className="proof-label">Max Per Batch</div></div>
  <div className="proof-div"></div>
  <div className="proof-item"><div className="proof-num">10x</div><div className="proof-label">More Attention</div></div>
  <div className="proof-div"></div>
  <div className="proof-item"><div className="proof-num">PCMB</div><div className="proof-label">All Subjects</div></div>
  <div className="proof-div"></div>
  <div className="proof-item"><div className="proof-num">50+ yrs</div><div className="proof-label">Faculty Experience</div></div>
</div>

{/* STUDENT PAIN */}
<section className="student-pain">
  <div className="sp-grid">
    <div>
      <div className="section-tag">Be honest with yourself</div>
      <div className="sp-headline">Which of these sounds like your last coaching class?</div>
      <p className="sp-body" style={{marginBottom: '24px'}}>If any of these feel familiar — you already know something isn't working.</p>
      <div className="sp-scenarios">
        <div className="sp-card scenario-1">
          <div className="sp-card-top"><span className="sp-emoji">😶</span><div className="sp-card-title">You had a doubt but didn't ask</div></div>
          <div className="sp-card-text">Too many students. Too much judgment. You wrote it down and forgot it. That doubt is still there.</div>
        </div>
        <div className="sp-card scenario-2">
          <div className="sp-card-top"><span className="sp-emoji">😵</span><div className="sp-card-title">The teacher moved on before you got it</div></div>
          <div className="sp-card-text">Chapter closed. You nodded along. The next chapter uses the same concept you missed. Now you're two chapters behind.</div>
        </div>
        <div className="sp-card scenario-3">
          <div className="sp-card-top"><span className="sp-emoji">😮‍💨</span><div className="sp-card-title">You're attending class but nothing's sticking</div></div>
          <div className="sp-card-text">You show up. You sit there for 2 hours. You come home and still can't solve that one type of problem. Every time.</div>
        </div>
        <div className="sp-card scenario-4">
          <div className="sp-card-top"><span className="sp-emoji">📱</span><div className="sp-card-title">You're watching PW videos but still stuck</div></div>
          <div className="sp-card-text">Great content. No one checking if you got it. No one to ask when the video explanation doesn't click for you specifically.</div>
        </div>
      </div>
    </div>
    <div className="sp-right">
      <div className="sp-quote">
        <div className="sp-quote-text">"I was in a batch of 55 students for 8 months. I never asked a single doubt. Not once. I was too scared. I genuinely thought I was just bad at Physics. Turns out I just needed someone to actually teach me."</div>
        <div className="sp-quote-author">— Arjun K., Class 11 · H B Kapadia · joined Physics Elixir mid-year</div>
      </div>
      <div className="sp-headline" style={{fontSize: '22px', marginBottom: '12px'}}>The problem isn't you.<br />It's the room you're in.</div>
      <p className="sp-body">When there are 60 students and 90 minutes, your teacher has exactly 1.5 minutes for you. That's not teaching. That's broadcasting.</p>
      <p className="sp-body" style={{marginBottom: '28px'}}>At Physics Elixir — 12 students, 180 minutes. Your teacher has 15 minutes for you every day. That's when learning actually happens.</p>
      <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="btn-primary" target="_blank">Come See What That Feels Like →</a>
    </div>
  </div>
</section>

{/* WHAT CHANGES */}
<section className="what-changes">
  <div className="section-tag">What actually changes</div>
  <h2 className="section-title">Inside Physics Elixir</h2>
  <p className="section-sub">Six things that are different — and why each one matters for your marks.</p>
  <div className="wc-grid">
    <div className="wc-card">
      <span className="wc-tag student">For you</span>
      <div className="wc-icon orange"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
      <h4>12 students. Your teacher knows you.</h4>
      <p>Your weak topics, your exam goal, where you got confused last week. All tracked. All addressed. Not one of 60 faces.</p>
    </div>
    <div className="wc-card">
      <span className="wc-tag student">For you</span>
      <div className="wc-icon purple"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
      <h4>Ask the doubt you've been holding for 3 weeks</h4>
      <p>Judgment Free Time is a named promise at Physics Elixir. No ridicule. No sighs. No "we covered this already." Every question is valid.</p>
    </div>
    <div className="wc-card">
      <span className="wc-tag student">For you</span>
      <div className="wc-icon green"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
      <h4>Clarity Recall Framework</h4>
      <p>Physics Elixir's own methodology. Complex theorems broken into logical steps you'll actually remember in the exam — not just during class.</p>
    </div>
    <div className="wc-card">
      <span className="wc-tag student">For you</span>
      <div className="wc-icon orange"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div>
      <h4>Missed a class? Watch it on YouTube.</h4>
      <p>NCERT concepts recorded and available anytime. You never permanently fall behind. Revise before the next class from anywhere.</p>
    </div>
    <div className="wc-card">
      <span className="wc-tag student">For you</span>
      <div className="wc-icon navy"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
      <h4>Boards + JEE/NEET. Not one or the other.</h4>
      <p>Separate exam strategy built into the curriculum. You don't have to split your time between two different coachings.</p>
    </div>
    <div className="wc-card">
      <span className="wc-tag student">For you</span>
      <div className="wc-icon green"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
      <h4>12 peers who are actually serious</h4>
      <p>No back-row chaos. No one dragging the class down. Curated students from reputed schools. Focus is contagious — and this room has it.</p>
    </div>
  </div>
</section>

{/* VOICES — STUDENT FIRST */}
<section className="voices">
  <div className="section-tag">Real people. Real results.</div>
  <h2 className="section-title">From students and parents</h2>
  <p className="section-sub" style={{marginBottom: '40px'}}>70% of these are from students. Because they're the ones who actually sit in the class.</p>
  <div className="voices-grid">
    <div className="voice-card">
      <span className="voice-type student-voice">Student</span>
      <div className="stars"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <p className="voice-text">"Honestly I used to sit in the last row and just zone out. Here there is no last row. It's 12 of us and Neha ma'am literally notices if you're confused before you even say anything. Bit scary at first but it works."</p>
      <div className="voice-author"><div className="voice-av" style={{background: 'var(--orange)'}}>AK</div><div><div className="voice-name">Arjun K.</div><div className="voice-detail">Class 11 · H B Kapadia · GSEB</div></div></div>
    </div>
    <div className="voice-card">
      <span className="voice-type student-voice">Student</span>
      <div className="stars"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <p className="voice-text">"My parents changed my coaching after my Class 11 midterms and I was not happy about it at all. But my scores actually improved. Chemistry went from 54 to 79 in one term. I wouldn't have believed that a few months ago."</p>
      <div className="voice-author"><div className="voice-av" style={{background: 'var(--purple)'}}>SR</div><div><div className="voice-name">Sneha R.</div><div className="voice-detail">Class 11 · Podar International · CBSE</div></div></div>
    </div>
    <div className="voice-card">
      <span className="voice-type parent-voice">Parent</span>
      <div className="stars"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <p className="voice-text">"We were paying the same fees at a large institute and our son was invisible there. At Physics Elixir, Neha Ma'am called us after the first week to tell us exactly where he was struggling. That had never happened before."</p>
      <div className="voice-author"><div className="voice-av" style={{background: 'var(--green)'}}>PM</div><div><div className="voice-name">Priya M.</div><div className="voice-detail">Parent of Class 11 student · DPS</div></div></div>
    </div>
  </div>
</section>

{/* DEMO — EXCLUSIVE */}
<section className="demo-section">
  <div className="demo-inner">
    <div className="demo-left">
      <div className="section-tag">The free demo</div>
      <h2 className="section-title">Not everyone gets in.<br />Here's what happens<br />when you do.</h2>
      <p className="section-sub" style={{marginBottom: 0}}>The demo isn't a sales pitch. It's a real class with max 5 students. You either feel the difference — or you don't. Most people feel it.</p>
      <div className="demo-what">
        <div className="demo-item">
          <div className="demo-num">1</div>
          <div className="demo-item-text"><h5>Student Audit — 20 minutes</h5><p>We understand your current level, weak chapters, and exam goal before the demo. So the class is actually relevant to you.</p></div>
        </div>
        <div className="demo-item">
          <div className="demo-num">2</div>
          <div className="demo-item-text"><h5>Live demo class — max 5 students</h5><p>A real Physics Elixir class. You'll ask doubts. Concepts will actually click. You'll see what 15 minutes of attention feels like.</p></div>
        </div>
        <div className="demo-item">
          <div className="demo-num">3</div>
          <div className="demo-item-text"><h5>Quick test on what was taught</h5><p>Short test on the demo topics. Confirms whether the clarity was real — not just a feeling in the moment.</p></div>
        </div>
        <div className="demo-item">
          <div className="demo-num" style={{background: 'var(--orange)'}}>4</div>
          <div className="demo-item-text"><h5>Decision is yours</h5><p>Zero pressure after. If you want a seat — we'll tell you how. If not — no follow-up spam. Simple.</p></div>
        </div>
      </div>
    </div>
    <div className="demo-right">
      <h3>Apply for the demo.</h3>
      <p>We review every application. Seats in each demo are limited to 5 students. We schedule as soon as 5 confirm.</p>
      <div className="demo-criteria">
        <div className="demo-criterion">
          <div className="dc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div className="dc-text">Class 11 or 12 science student</div>
        </div>
        <div className="demo-criterion">
          <div className="dc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div className="dc-text">CBSE, ICSE, or GSEB board</div>
        </div>
        <div className="demo-criterion">
          <div className="dc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div className="dc-text">Serious about improving marks this year</div>
        </div>
        <div className="demo-criterion">
          <div className="dc-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div className="dc-text">Ready to actually participate — not just watch</div>
        </div>
      </div>
      <div className="demo-cta-block">
        <p>Tap below to apply on WhatsApp. We'll confirm your spot within a few hours.</p>
        <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" target="_blank">Apply for Free Demo on WhatsApp →</a>
        <div className="spots-left">Only 5 seats remaining in Batch 2</div>
      </div>
    </div>
  </div>
</section>

{/* COMPARISON */}
<section className="compare-section">
  <div className="section-tag">Side by side</div>
  <h2 className="section-title">What you're getting vs what you have now</h2>
  <p className="section-sub" style={{marginBottom: '32px'}}>Every row in this table is something that directly affects your marks.</p>
  <table className="compare-table">
    <thead>
      <tr>
        <th style={{textAlign: 'left', background: '#fff', color: 'var(--text-light)'}}>What matters</th>
        <th className="factory">Large Coaching</th>
        <th className="elixir">Physics Elixir</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Students per batch</td><td className="fv">40–60+</td><td className="ev">Max 12 ✓</td></tr>
      <tr><td>Your attention per day</td><td className="fv">1.5 minutes</td><td className="ev">15 minutes ✓</td></tr>
      <tr><td>Can you ask a doubt freely?</td><td className="fv">Rarely</td><td className="ev">Always ✓</td></tr>
      <tr><td>Teacher knows your weak areas</td><td className="fv">No</td><td className="ev">Yes ✓</td></tr>
      <tr><td>Missed class recovery</td><td className="fv">You're on your own</td><td className="ev">YouTube recordings ✓</td></tr>
      <tr><td>Board + JEE/NEET both</td><td className="fv">Usually one only</td><td className="ev">Both simultaneously ✓</td></tr>
      <tr><td>Lab for practicals</td><td className="fv">Not included</td><td className="ev">In-house lab ✓</td></tr>
      <tr><td>Progress tracking</td><td className="fv">None</td><td className="ev">Monthly reports ✓</td></tr>
    </tbody>
  </table>
  <div style={{textAlign: 'center', marginTop: '36px'}}>
    <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="btn-primary" target="_blank">Apply for Free Demo →</a>
  </div>
</section>

{/* BATCH STATUS */}
<section className="batch-section">
  <div style={{textAlign: 'center', marginBottom: '40px'}}>
    <div className="section-tag" style={{textAlign: 'center'}}>Batch availability</div>
    <h2 className="section-title" style={{textAlign: 'center'}}>12 seats. That's the cap. Always.</h2>
    <p className="section-sub" style={{textAlign: 'center', margin: '0 auto'}}>Once a batch is full — it's full. No exceptions. No 13th student.</p>
  </div>
  <div className="batch-grid">
    <div className="batch-card closed">
      <span className="batch-badge">Full</span>
      <div className="batch-name">Batch 1</div>
      <div className="batch-desc">Entry closed</div>
      <div className="batch-bar"><div className="batch-fill-c"></div></div>
      <div className="batch-seats">12 / 12 seats filled</div>
    </div>
    <div className="batch-card active">
      <span className="batch-badge">Filling Fast</span>
      <div className="batch-name">Batch 2</div>
      <div className="batch-desc">Only 5 seats left</div>
      <div className="batch-bar"><div className="batch-fill-a"></div></div>
      <div className="batch-seats">7 / 12 seats filled</div>
      <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20Batch%202%20at%20Physics%20Elixir" className="batch-btn" target="_blank">Apply Now →</a>
    </div>
    <div className="batch-card soon">
      <span className="batch-badge">Opening Soon</span>
      <div className="batch-name">Batch 3</div>
      <div className="batch-desc">Join the waitlist</div>
      <div className="batch-bar"><div style={{height: '100%', width: 0, background: 'var(--navy)', borderRadius: '4px'}}></div></div>
      <div className="batch-seats">Taking registrations now</div>
      <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20join%20the%20Batch%203%20waitlist%20at%20Physics%20Elixir" className="batch-btn" target="_blank">Join Waitlist →</a>
    </div>
  </div>
</section>

{/* FACULTY */}
<section className="faculty-section">
  <div style={{textAlign: 'center', marginBottom: '40px'}}>
    <div className="section-tag" style={{textAlign: 'center'}}>The faculty</div>
    <h2 className="section-title" style={{textAlign: 'center'}}>One specialist per subject.<br />No compromises.</h2>
    <p className="section-sub" style={{textAlign: 'center', margin: '0 auto'}}>Not one teacher covering everything. Four dedicated experts — each one focused entirely on their subject.</p>
  </div>
  <div className="faculty-grid">
    <div className="faculty-card">
      <div className="fav" style={{background: 'var(--navy)'}}>NJ</div>
      <div className="faculty-name">Neha Jivnani Gupta</div>
      <div className="faculty-subject">Physics · Founder</div>
      <div className="faculty-exp">10+ years experience</div>
    </div>
    <div className="faculty-card">
      <div className="fav" style={{background: 'var(--orange)'}}>RP</div>
      <div className="faculty-name">Ruchita Punkhia</div>
      <div className="faculty-subject">Chemistry</div>
      <div className="faculty-exp">15+ years experience</div>
    </div>
    <div className="faculty-card">
      <div className="fav" style={{background: 'var(--green)'}}>OP</div>
      <div className="faculty-name">Omprakash Pandey</div>
      <div className="faculty-subject">Mathematics</div>
      <div className="faculty-exp">22+ years experience</div>
    </div>
    <div className="faculty-card">
      <div className="fav" style={{background: 'var(--purple)'}}>NB</div>
      <div className="faculty-name">Navil Bagadiya</div>
      <div className="faculty-subject">Biology</div>
      <div className="faculty-exp">10+ years experience</div>
    </div>
  </div>
</section>

{/* PARENT SECTION — 30% */}
<section className="parent-section">
  <div className="parent-grid">
    <div className="parent-left">
      <div style={{fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '12px'}}>For parents</div>
      <h2>You're not paying for a seat.<br />You're paying for <em>actual attention.</em></h2>
      <p>At most coachings, your child is one of 60. The teacher can't track individual progress — it's structurally impossible. You're paying premium fees for a crowd.</p>
      <div className="parent-points">
        <div className="parent-point">
          <div className="pp-dot"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
          <div className="pp-text"><strong>Monthly progress reports</strong> — you know exactly where your child stands, every month</div>
        </div>
        <div className="parent-point">
          <div className="pp-dot"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
          <div className="pp-text"><strong>Direct teacher access</strong> — Neha Ma'am personally communicates with parents on progress</div>
        </div>
        <div className="parent-point">
          <div className="pp-dot"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
          <div className="pp-text"><strong>In-house lab</strong> — board practicals handled on site, no additional arrangements needed</div>
        </div>
        <div className="parent-point">
          <div className="pp-dot"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
          <div className="pp-text"><strong>Fees are transparent</strong> — ₹35,000 per subject per year. No hidden costs. Discussed after demo.</div>
        </div>
      </div>
    </div>
    <div>
      <div className="parent-right-card">
        <div className="prc-stat">
          <div className="prc-stat-num">10x</div>
          <div className="prc-stat-label">more personal attention than any large<br />coaching in Chandkheda — every single day</div>
        </div>
        <div className="prc-divider"></div>
        <div className="prc-testi">"We were paying the same amount at a large institute and getting nothing individual in return. At Physics Elixir, Neha Ma'am called us after the first week to explain exactly where our son was struggling. That had never happened before."</div>
        <div className="prc-author">— Priya M., Parent of Class 11 student · DPS Chandkheda</div>
        <a href="https://wa.me/918469862440?text=Hi%2C%20I%20am%20a%20parent%20and%20I%20want%20to%20know%20more%20about%20Physics%20Elixir" className="prc-cta" target="_blank">Book a Demo for My Child →</a>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="faq-section">
  <div style={{textAlign: 'center', marginBottom: '48px'}}>
    <div className="section-tag" style={{textAlign: 'center'}}>Quick answers</div>
    <h2 className="section-title" style={{textAlign: 'center'}}>Things you're probably wondering</h2>
  </div>
  
    <div className="faq-wrap">
      {faqs.map((faq, idx) => (
        <div key={idx} className={`faq-item ${openFaqs[idx] ? 'open' : ''}`}>
          <div className="faq-q" onClick={() => toggleFaq(idx)}>{faq.q}<div className="faq-icon">+</div></div>
          <div className="faq-a">{faq.a}</div>
        </div>
      ))}
    </div>

</section>

{/* FINAL CTA */}
<section className="final-cta">
  <h2>Stop surviving.<br /><em>Start getting it.</em></h2>
  <p>The demo is free. 5 students max. Your teacher will know your name before the class ends. Come see what that actually feels like.</p>
  <div className="final-btns">
    <a href="https://wa.me/918469862440?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20free%20demo%20session%20at%20Physics%20Elixir" className="btn-primary" style={{fontSize: '17px', padding: '17px 36px'}} target="_blank" rel="noreferrer">Apply for Free Demo on WhatsApp →</a>
  </div>
  <div className="urgency-tag"><div className="udot"></div>Batch 2 is 60% filled · Only 5 seats left · March–April window closing</div>
</section>

{/* FOOTER */}
<footer>
  <div>
    <div className="footer-logo">Physics <span>Elixir</span></div>
    <div className="footer-info">
      102, Setu Square, New CG Road, Chandkheda, Ahmedabad – 382424<br />
      <a href="https://wa.me/918469862440?text=Hi" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>+91 84698 62440</a> · <a href="mailto:admissions.physicselixir@gmail.com" style={{color: 'inherit', textDecoration: 'none'}}>admissions.physicselixir@gmail.com</a>
    </div>
  </div>
  <div className="footer-copy">© 2026 Physics Elixir. All rights reserved.</div>
</footer>


    </>
  );
}
