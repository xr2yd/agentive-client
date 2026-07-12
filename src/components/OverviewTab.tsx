"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  Calendar, 
  ArrowUpRight, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Play
} from "lucide-react";

interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
  daysRemaining: number;
}

export default function OverviewTab({ setActiveTab, daysRemaining }: OverviewTabProps) {
  // Mock activity logs
  const activities = [
    {
      time: "2 mins ago",
      event: "Resolved return inquiry for order #10892",
      type: "Customer Support",
      status: "success",
    },
    {
      time: "15 mins ago",
      event: "Synchronized inventory stock levels with Shopify",
      type: "Operations",
      status: "success",
    },
    {
      time: "1 hour ago",
      event: "Drafted email follow-up response for high-value lead",
      type: "Sales",
      status: "success",
    },
    {
      time: "4 hours ago",
      event: "Flagged anomaly in webhook payout signature",
      type: "Security",
      status: "warning",
    },
    {
      time: "Yesterday",
      event: "Processed monthly optimization analysis report",
      type: "System",
      status: "success",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-navy-soft to-navy p-6 rounded-2xl border border-border"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-heading tracking-tight">
            Welcome back, <span className="gradient-text">Acme Corporation</span>
          </h1>
          <p className="text-sm text-body mt-1">
            Your custom AI Agent is active and running optimizations across 4 connected platforms.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab("chat")}
            className="btn-primary py-2.5 px-4 rounded-xl text-xs"
          >
            <Bot className="w-4 h-4" />
            Talk to AI Agent
          </button>
        </div>
      </motion.div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Agent Status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-muted tracking-wider">Agent Status</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-4 h-4 bg-transparent" />
            </div>
          </div>
          <div className="my-6">
            <h3 className="text-3xl font-extrabold text-heading">Active</h3>
            <p className="text-xs text-muted mt-1">Operational since June 13, 2026</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            All integrations healthy (100% online)
          </div>
        </motion.div>

        {/* Card 2: Subscription Remaining */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-muted tracking-wider">Subscription</span>
            <div className="p-2 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-3xl font-extrabold text-heading">{daysRemaining} Days</h3>
              <span className="text-xs text-muted">left in cycle</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-navy-soft rounded-full h-1.5 mt-3 overflow-hidden border border-white-5">
              <div 
                className="gradient-bg h-full rounded-full" 
                style={{ width: `${(daysRemaining / 30) * 100}%` }}
              />
            </div>
          </div>
          <button 
            onClick={() => setActiveTab("billing")}
            className="w-full flex items-center justify-between text-xs font-semibold text-blue hover:text-cyan group transition-colors cursor-pointer"
          >
            Manage Billing & Payments
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Card 3: Efficiency Metric */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-muted tracking-wider">Automations (Month)</span>
            <div className="p-2 rounded-lg bg-blue/10 border border-blue/20 text-blue">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="my-6">
            <h3 className="text-3xl font-extrabold text-heading">1,452</h3>
            <p className="text-xs text-muted mt-1">98.2% Accuracy rate</p>
          </div>
          <button 
            onClick={() => setActiveTab("reports")}
            className="w-full flex items-center justify-between text-xs font-semibold text-blue hover:text-cyan group transition-colors cursor-pointer"
          >
            View Performance Report
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Activity Log */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-heading tracking-tight flex items-center gap-2">
            Recent Agent Activity
            <span className="text-xs font-normal text-muted">(Updated live)</span>
          </h2>
          <div className="card divide-y divide-border/60 overflow-hidden">
            {activities.map((act, i) => (
              <div key={i} className="p-4 hover:bg-white-5/40 transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${
                    act.status === "warning" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {act.status === "warning" ? (
                      <AlertCircle className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading leading-tight">{act.event}</p>
                    <span className="text-[10px] text-muted tracking-wide mt-1 inline-block uppercase">
                      {act.type}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted whitespace-nowrap">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Quick Help / Action Cards */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-heading tracking-tight">Need Support?</h2>
          <div className="card p-5 space-y-4 bg-gradient-to-b from-navy-soft/60 to-navy border-border">
            <h3 className="font-semibold text-heading text-sm">Schedule Expert Advisory</h3>
            <p className="text-xs text-body leading-relaxed">
              Want to scale your automation workflows or integrate custom business databases? Schedule a 1:1 consultation call with our solutions team.
            </p>
            <button
              onClick={() => setActiveTab("booking")}
              className="w-full btn-secondary-dark py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-border/80 hover:border-cyan/30"
            >
              <Calendar className="w-4 h-4 text-cyan" />
              Book Consultation Call
            </button>
          </div>

          <div className="card p-5 space-y-3 bg-white-5/20 border-white-10">
            <div className="flex items-center gap-2 text-cyan">
              <HelpCircle className="w-4 h-4" />
              <h4 className="text-xs font-semibold text-heading uppercase tracking-wider">Quick Hint</h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              You can adjust agent configurations (like tone of voice or reasoning latency) directly under the <strong className="text-heading font-medium">API & Configuration</strong> tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
