"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, AudioLines, ChevronDown } from "lucide-react";
import ScrollJourneyController from "@/components/experience/ScrollJourneyController";

const ContinuousJourney = dynamic(() => import("@/components/experience/ContinuousJourney"), { ssr: false });

const stages = [
  { number: "00", name: "Gateway", eyebrow: "ENTER THE DOBIG WORLD", title: "Infrastructure. Cloud.\nSoftware. Done right.", body: "A connected technology journey — from the foundations that keep business running to the intelligence that moves it forward." },
  { number: "01", name: "Infrastructure", eyebrow: "BUILT ON SOLID GROUND", title: "The systems\nbehind everything.", body: "Purpose-built infrastructure, resilient compute, and the foundations your business can depend on." },
  { number: "02", name: "Cloud", eyebrow: "FLEXIBILITY WITHOUT FRICTION", title: "Your world.\nWithout boundaries.", body: "Private cloud and leading public-cloud platforms, shaped around the way your business needs to scale." },
  { number: "03", name: "Software", eyebrow: "ENGINEERED TO CONNECT", title: "From complexity\nto clarity.", body: "Thoughtful software and integrated systems that turn business requirements into useful digital experiences." },
  { number: "04", name: "AI", eyebrow: "INTELLIGENCE IN MOTION", title: "Make data\nmove you forward.", body: "Practical AI experiences that help teams uncover patterns, streamline work, and make better-informed decisions." },
  { number: "05", name: "NOC", eyebrow: "ALWAYS IN VIEW", title: "Every signal.\nEvery system.", body: "Monitoring, maintenance, and operational visibility designed to keep critical technology running smoothly." },
  { number: "06", name: "Connected world", eyebrow: "TECHNOLOGY. IN SYNC.", title: "Everything works\nbetter together.", body: "Infrastructure, cloud, software, and operations — connected through one clear technology partner." },
];

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const index = Math.min(stages.length - 1, Math.floor(progress * stages.length));
  const active = stages[index];
  const jumpTo = (i: number) => {
    const track = document.querySelector<HTMLElement>(".journey-scroll-track");
    if (!track) return;
    const max = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: track.offsetTop + max * (i / (stages.length - 1)), behavior: "smooth" });
    setMenuOpen(false);
  };

  return <main className="journey-scroll-track">
    <ScrollJourneyController />
    <section className="journey-viewport">
      <ContinuousJourney />
      <div className="journey-grain" />
      <div className="journey-vignette" />
      <header className="journey-header">
        <a className="brand-lockup" href="#top" onClick={(e) => { e.preventDefault(); jumpTo(0); }} aria-label="DOBIG home"><img className="brand-logo" src="/dobig-logo.png" alt="DOBIG" /></a>
        <div className="header-center"><span className="live-indicator" /> DIGITAL INFRASTRUCTURE, REIMAGINED</div>
        <button className="journey-menu-button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>{menuOpen ? "CLOSE" : "EXPLORE"}<span className="menu-mark">{menuOpen ? "−" : "+"}</span></button>
      </header>

      {menuOpen && <nav className="journey-menu-panel" aria-label="Journey stages">{stages.map((stage, i) => <button key={stage.number} onClick={() => jumpTo(i)} className={i === index ? "selected" : ""}><span>{stage.number}</span>{stage.name}<ArrowUpRight size={14} /></button>)}</nav>}

      <div className="journey-copy" key={active.number}>
        <div className="journey-eyebrow"><span>{active.number}</span><span className="eyebrow-line" />{active.eyebrow}</div>
        <h1>{active.title.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</h1>
        <p>{active.body}</p>
        {index === 0 ? <button className="enter-button" onClick={() => jumpTo(1)}><span className="enter-icon"><ArrowDown size={16} /></span> ENTER THE JOURNEY <ArrowUpRight size={15} /></button> : <div className="stage-caption"><AudioLines size={16} strokeWidth={1.4} /><span>DESIGNED TO WORK AS ONE</span><span className="caption-rule" /></div>}
      </div>

      <div className="journey-side-label"><span>SCROLL TO TRAVEL</span><span className="side-line" /><ChevronDown size={13} /></div>
      <div className="journey-progress-rail"><span className="rail-track" /><span className="rail-fill" style={{ height: `${progress * 100}%` }} />{stages.map((stage, i) => <button key={stage.number} aria-label={`Go to ${stage.name}`} title={stage.name} className={`rail-node ${i === index ? "active" : ""}`} style={{ top: `${(i / (stages.length - 1)) * 100}%` }} onClick={() => jumpTo(i)}><span>{stage.number}</span></button>)}</div>
      <div className="journey-bottom-left"><span>INFRASTRUCTURE</span><span className="bottom-divider" /><span>CLOUD</span><span className="bottom-divider" /><span>SOFTWARE</span><span className="bottom-divider" /><span>AI</span></div>
      <div className="journey-bottom-right"><span className="bottom-current">{active.number}</span><span className="bottom-slash">/</span><span>06</span><span className="bottom-divider" /><span>{Math.round(progress * 100).toString().padStart(2, "0")}%</span></div>
      <div className="journey-scroll-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </section>
    <div className="journey-endcap"><span>DOBIG</span><span>Infrastructure. Cloud. Software. Done Right.</span><span>BUILT FOR WHAT'S NEXT ↗</span></div>
  </main>;
}
