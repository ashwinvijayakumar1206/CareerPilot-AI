"use client";

import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { label: "ATS Score", value: "85%", change: "+5%", color: "text-primary" },
    { label: "Interviews", value: "12", change: "Last 30 days", color: "text-accent" },
    { label: "Skills Found", value: "24", change: "In Resume", color: "text-green-400" },
    { label: "Roadmaps", value: "3", change: "Active", color: "text-purple-400" },
  ];

  const activities = [
    { type: "Resume Analysis", date: "2 hours ago", status: "Completed", score: "85" },
    { type: "Mock Interview", date: "Yesterday", status: "Completed", score: "72" },
    { type: "Roadmap Generated", date: "3 days ago", status: "Active", score: "-" },
  ];

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm opacity-50">Welcome back to CareerPilot AI</p>
        </div>
        <Link href="/" className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-medium">Sign Out</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl glass border border-white/10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <p className="text-[10px] opacity-40">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-bold">Recent Activities</h2>
              <button className="text-xs text-primary font-bold">View All</button>
            </div>
            <div className="divide-y divide-white/5">
              {activities.map((activity, i) => (
                <div key={i} className="p-6 flex justify-between items-center hover:bg-white/5 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                      {activity.type.includes("Resume") ? "📄" : activity.type.includes("Interview") ? "🎙️" : "🗺️"}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{activity.type}</p>
                      <p className="text-xs opacity-40">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{activity.score !== "-" ? `${activity.score}%` : activity.status}</div>
                    <div className="text-[10px] opacity-30 uppercase tracking-tighter">Performance</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="p-8 rounded-3xl gradient-bg text-white space-y-4 shadow-xl shadow-primary/20">
            <h3 className="text-xl font-bold">Ready for your next challenge?</h3>
            <p className="text-sm opacity-80 leading-relaxed">Our AI agents suggest you try a mock interview for the 'Senior Frontend Engineer' role based on your recent skill updates.</p>
            <Link href="/interview" className="block w-full py-3 bg-white text-primary rounded-xl text-center font-bold text-sm hover:scale-105 transition-all shadow-lg">Start Interview</Link>
          </section>

          <section className="p-8 rounded-3xl glass border border-white/10 space-y-4">
            <h3 className="font-bold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/resume" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                <span className="text-sm">Optimize Resume</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              <Link href="/roadmap" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                <span className="text-sm">Career Roadmap</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
