"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Shield, Zap, ArrowRight, Lock, Mail, Loader2 } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate login loading
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleDemoLogin = () => {
    setEmail("demo@agentive.com");
    setPassword("password123");
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-navy text-body overflow-hidden">
      {/* Left Column: Brand & Features */}
      <div className="md:w-1/2 flex flex-col justify-between p-8 md:p-16 bg-gradient-to-br from-navy to-navy-soft border-r border-border relative overflow-hidden">
        {/* Glow Orb */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan/5 rounded-full blur-3xl" />

        {/* Header */}
        <div className="z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-blue/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="font-sans font-bold text-2xl tracking-tight text-heading">
            Agentive<span className="text-cyan font-normal">.</span>
          </span>
        </div>

        {/* Main Content */}
        <div className="z-10 my-auto py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow mb-6">Client Portal</span>
            <h1 className="text-4xl md:text-5xl font-sans font-extrabold text-heading tracking-tight leading-tight mb-6">
              Empower your business with{" "}
              <span className="gradient-text">Autonomous AI Agents</span>.
            </h1>
            <p className="text-lg text-body max-w-md mb-10">
              Monitor real-time performance, access dedicated AI optimization consulting, and scale your automated workflows.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-6 max-w-md">
            {[
              {
                icon: Zap,
                title: "Real-time Monitoring",
                desc: "Track agent activities, API call counts, and execution logs instantly.",
              },
              {
                icon: Bot,
                title: "AI Business Consultation",
                desc: "Consult with your custom AI agent to discover workflow improvements.",
              },
              {
                icon: Shield,
                title: "Secure Integrations",
                desc: "Manage API keys and adjust credentials in a highly secure sandbox environment.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-white-5 border border-white-10 text-cyan">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-heading text-sm">{f.title}</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 text-xs text-muted mt-8 md:mt-0">
          © {new Date().getFullYear()} Agentive Inc. All rights reserved. Privacy & Terms.
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-[#040406]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="card p-8 md:p-10 border-border/80">
            <h2 className="text-2xl font-bold text-heading tracking-tight mb-2">Welcome Back</h2>
            <p className="text-sm text-body mb-8">Enter your credentials to access your client dashboard.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-heading tracking-wider uppercase">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-navy border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-heading placeholder-muted focus:outline-none focus:border-blue transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-heading tracking-wider uppercase">Password</label>
                  <a href="#" className="text-xs text-blue hover:text-cyan hover:underline transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-navy border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-heading placeholder-muted focus:outline-none focus:border-blue transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="w-4 h-4 rounded bg-navy border border-border accent-blue focus:ring-0 cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-xs text-body ml-2 cursor-pointer select-none">
                  Keep me logged in for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 text-sm cta-pulse"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60"></div>
              </div>
              <span className="relative px-3 bg-navy text-[10px] uppercase font-semibold text-muted tracking-widest">
                Fast Access
              </span>
            </div>

            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full btn-secondary-dark py-3 rounded-lg flex items-center justify-center gap-2 text-xs border border-border hover:border-blue/30 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-cyan" />
              Sign in with Demo Client Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
