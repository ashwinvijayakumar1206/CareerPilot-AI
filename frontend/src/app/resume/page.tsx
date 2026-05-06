"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/analyze-resume`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Resume <span className="gradient-text">Intelligence.</span></h1>
          <p className="text-foreground/60">Upload your resume in PDF format. Our AI agents will analyze your technical skills, ATS score, and provide actionable improvement suggestions.</p>
          
          <div className="p-12 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center space-y-4 hover:border-primary/50 transition-all bg-white/5 cursor-pointer relative">
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="text-5xl">📄</div>
            <div className="text-center">
              <p className="font-bold">{file ? file.name : "Select PDF Resume"}</p>
              <p className="text-sm opacity-40">Max size 5MB</p>
            </div>
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${!file || loading ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20'}`}
          >
            {loading ? "Analyzing Profile..." : "Run Analysis"}
          </button>
        </div>

        <div className="space-y-6">
          {!analysis ? (
            <div className="h-full rounded-3xl glass border border-white/10 flex items-center justify-center p-12 text-center">
              <p className="opacity-40 italic">Analysis results will appear here after upload.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="p-8 rounded-3xl glass border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">ATS Score</h3>
                  <div className="text-3xl font-bold text-primary">{analysis.ats_score}%</div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${analysis.ats_score}%` }} />
                </div>
              </div>

              <div className="p-8 rounded-3xl glass border border-white/10 space-y-4">
                <h3 className="font-bold">Summary</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{analysis.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl glass border border-white/10 space-y-3">
                  <h3 className="font-bold text-sm text-green-400">Strengths</h3>
                  <ul className="text-xs space-y-2 opacity-80">
                    {analysis.strengths.map((s: string, i: number) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-3xl glass border border-white/10 space-y-3">
                  <h3 className="font-bold text-sm text-red-400">Weaknesses</h3>
                  <ul className="text-xs space-y-2 opacity-80">
                    {analysis.weaknesses.map((w: string, i: number) => (
                      <li key={i}>• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 rounded-3xl glass border border-white/10 space-y-4">
                <h3 className="font-bold">Detected Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills_detected.map((s: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
