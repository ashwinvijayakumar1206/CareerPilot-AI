import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />

      <nav className="fixed top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-50">
        <div className="text-2xl font-bold tracking-tighter">
          Career<span className="text-primary">Pilot</span> AI
        </div>
        <div className="space-x-8 hidden md:flex items-center text-sm font-medium opacity-80">
          <Link href="#features" className="hover:opacity-100 transition-opacity">Features</Link>
          <Link href="#how-it-works" className="hover:opacity-100 transition-opacity">How it Works</Link>
          <Link href="/dashboard" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-4xl text-center space-y-8 z-10 mt-20">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase animate-fade-in">
          Next Gen Career Platform
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight animate-fade-in">
          Navigate Your Career with <span className="gradient-text">Precision.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto animate-fade-in delay-100">
          CareerPilot AI is your personal multi-agent mentor. We analyze your resume, 
          detect skill gaps, and simulate real interviews to get you ready for your dream job.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in delay-200">
          <Link href="/resume" className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            Analyze Resume
          </Link>
          <Link href="/interview" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-bold transition-all">
            Mock Interview
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-32 w-full z-10 px-4">
        {[
          { title: "Resume Analysis", desc: "ATS score optimization and AI-driven skill mapping.", icon: "📄" },
          { title: "Interview Sim", desc: "Real-time AI interaction with technical & HR feedback.", icon: "🎙️" },
          { title: "Smart Roadmaps", desc: "Personalized learning paths based on industry trends.", icon: "🗺️" }
        ].map((item, index) => (
          <div key={index} className="p-8 rounded-3xl glass border border-white/10 hover:border-primary/50 transition-all group animate-fade-in" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-foreground/60 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
