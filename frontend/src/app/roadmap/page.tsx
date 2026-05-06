"use client";

import { useState } from "react";
import Link from "next/link";

export default function RoadmapPage() {
  const [skills, setSkills] = useState("JavaScript, HTML, CSS");
  const [interests, setInterests] = useState("Fintech, Web Development");
  const [loading, setLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState<any>(null);

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/recommend-career`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skills.split(",").map(s => s.trim()),
          interests: interests
        }),
      });
      const data = await response.json();
      setRoadmapData(data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <nav className="mb-12 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Career<span className="text-primary">Pilot</span> AI</Link>
        <Link href="/dashboard" className="text-sm opacity-60 hover:opacity-100">Back to Dashboard</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Skill <span className="gradient-text">Roadmaps.</span></h1>
          <p className="text-foreground/60">Define your current skills and career interests to generate a personalized learning journey.</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-40">Current Skills</label>
              <textarea 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none h-32 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-40">Career Interests</label>
              <input 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none"
              />
            </div>
            <button 
              onClick={generateRoadmap}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold transition-all shadow-lg shadow-primary/20"
            >
              {loading ? "Calculating Journey..." : "Generate Roadmap"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!roadmapData ? (
            <div className="h-full min-h-[400px] rounded-3xl border-2 border-dashed border-white/5 flex items-center justify-center text-center p-12">
              <p className="opacity-30 italic">Generate a roadmap to visualize your career path.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <section className="space-y-4">
                <h2 className="text-xl font-bold">Recommended Domains</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmapData.recommended_domains.map((d: any, i: number) => (
                    <div key={i} className="p-6 rounded-3xl glass border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-primary">{d.domain}</h3>
                        <span className="text-xs font-bold bg-primary/10 px-2 py-1 rounded">{d.match_percentage}% Match</span>
                      </div>
                      <p className="text-xs opacity-60 leading-relaxed">{d.reason}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xl font-bold">Learning Timeline</h2>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-white/10">
                  {roadmapData.roadmap.map((step: any, i: number) => (
                    <div key={i} className="pl-10 relative">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary border-4 border-[#0a0a0c] z-10" />
                      <div className="p-6 rounded-3xl glass border border-white/10 space-y-3 hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold">{step.phase}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{step.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {step.topics.map((t: string, j: number) => (
                            <span key={j} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5">{t}</span>
                          ))}
                        </div>
                        <div className="pt-2 flex gap-3">
                          {step.resources_type.map((r: string, j: number) => (
                            <span key={j} className="text-[9px] font-bold text-accent uppercase">{r}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
