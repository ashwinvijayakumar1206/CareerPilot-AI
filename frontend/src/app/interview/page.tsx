"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const [role, setRole] = useState("Full Stack Developer");
  const [skills, setSkills] = useState("React, Node.js, Python");
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async () => {
    setStarted(true);
    setLoading(true);
    const initialHistory = [{ role: "assistant", content: "Hi! I'm your interviewer today. Let's get started. Could you briefly introduce yourself and tell me about your experience with " + skills + "?" }];
    setMessages(initialHistory);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/interview-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          skills: skills.split(",").map(s => s.trim()),
          history: newMessages
        }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error in chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Career<span className="text-primary">Pilot</span> AI</Link>
        <div className="text-sm opacity-50">Mock Interview Session</div>
      </nav>

      {!started ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">Interview <span className="gradient-text">Simulator.</span></h1>
            <p className="text-foreground/60">Configure your session and practice with our AI technical interviewer.</p>
          </div>

          <div className="w-full max-w-md space-y-6 glass p-8 rounded-3xl border border-white/10">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Target Role</label>
              <input 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Skills to Test</label>
              <textarea 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all h-24 resize-none"
                placeholder="e.g. React, Python, SQL"
              />
            </div>
            <button 
              onClick={startInterview}
              className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all"
            >
              Start Session
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col glass rounded-3xl border border-white/10 overflow-hidden relative">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">{role} Interview</span>
            </div>
            <button onClick={() => setStarted(false)} className="text-xs opacity-50 hover:opacity-100">End Session</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-150" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="flex gap-4">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
              />
              <button 
                onClick={sendMessage}
                className="px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
