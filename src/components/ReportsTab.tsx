"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Skeleton, SkeletonCard, SkeletonRow } from "./Skeleton";

export default function ReportsTab() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6 space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-56 w-full" />
          </div>
          <div className="card p-6 space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-56 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Chart points for 7 days accuracy (y values mapped from 95% to 100%)
  const accuracyPoints = [97.5, 98.0, 97.2, 98.4, 98.2, 98.9, 98.2];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Bar height percentages for hours saved per week
  const weeklyHours = [32, 45, 38, 48, 54];
  const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Current"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-heading">AI Agent Performance & Analytics</h1>
        <p className="text-xs text-muted">A detailed breakdown of operations, latency reductions, and task success metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Accuracy", value: "98.2%", sub: "Industry standard is 92.5%", icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Total Hours Saved", value: "217 hrs", sub: "Since launch (June 13)", icon: Clock, color: "text-cyan" },
          { label: "Cost Efficiency", value: "$4,340", sub: "$20/hr estimated savings", icon: TrendingUp, color: "text-blue" },
          { label: "Execution Errors", value: "0.14%", sub: "12 fail cases out of 8,500", icon: AlertTriangle, color: "text-amber-400" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className="flex justify-between items-center text-muted">
                <span className="text-xs font-semibold uppercase tracking-wider">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <h3 className="text-2xl font-extrabold text-heading mt-3">{kpi.value}</h3>
              <p className="text-[10px] text-muted mt-1">{kpi.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart: Accuracy Trend */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-heading text-sm">7-Day Accuracy Trend</h3>
              <p className="text-[10px] text-muted">System error rate vs model reliability.</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
              Average 98.2%
            </span>
          </div>

          {/* SVG Line Chart */}
          <div className="h-56 w-full relative pt-4">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(13,71,255,0.06)" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(13,71,255,0.06)" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(13,71,255,0.06)" strokeWidth="1" />

              {/* Gradient Fill */}
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D47FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0D47FF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Path Area */}
              <path
                d="M 10 180 Q 80 140 160 160 T 320 80 T 490 60 L 490 200 L 10 200 Z"
                fill="url(#chartGlow)"
              />

              {/* Line path */}
              <path
                d="M 10 180 Q 80 140 160 160 T 320 80 T 490 60"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0D47FF" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>

              {/* Circles on dots */}
              <circle cx="10" cy="180" r="4" className="fill-blue stroke-navy stroke-2" />
              <circle cx="90" cy="145" r="4" className="fill-blue stroke-navy stroke-2" />
              <circle cx="170" cy="155" r="4" className="fill-blue stroke-navy stroke-2" />
              <circle cx="250" cy="110" r="4" className="fill-cyan stroke-navy stroke-2" />
              <circle cx="330" cy="85" r="4" className="fill-cyan stroke-navy stroke-2" />
              <circle cx="410" cy="70" r="4" className="fill-cyan stroke-navy stroke-2" />
              <circle cx="490" cy="60" r="4" className="fill-cyan stroke-navy stroke-2" />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[10px] text-muted px-2">
            {days.map((day, i) => (
              <span key={i} className="w-12 text-center">{day}</span>
            ))}
          </div>
        </div>

        {/* Bar Chart: Hours Saved */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-heading text-sm">Weekly Productivity Gains</h3>
              <p className="text-[10px] text-muted">Hours saved from automated operations.</p>
            </div>
            <span className="text-xs font-semibold text-cyan bg-cyan/10 px-2 py-0.5 border border-cyan/20 rounded">
              Trend: +24% WoW
            </span>
          </div>

          {/* CSS-based Bar Chart */}
          <div className="h-56 flex items-end justify-between px-4 pb-2 border-b border-border/40 relative">
            {/* Background grids */}
            <div className="absolute inset-x-0 top-1/4 border-t border-border/20 border-dashed" />
            <div className="absolute inset-x-0 top-2/4 border-t border-border/20 border-dashed" />
            <div className="absolute inset-x-0 top-3/4 border-t border-border/20 border-dashed" />

            {weeklyHours.map((h, i) => (
              <div key={i} className="flex flex-col items-center w-12 z-10 group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-navy-soft border border-border text-[10px] font-bold text-heading px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {h} hours
                </div>
                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(h / 60) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                  className="w-8 rounded-t-md gradient-bg shadow-lg shadow-blue/10 group-hover:brightness-110 transition-all cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[10px] text-muted px-4">
            {weeks.map((wk, i) => (
              <span key={i} className="w-12 text-center">{wk}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Task Distribution Breakdown */}
      <div className="card p-6 space-y-5">
        <div>
          <h3 className="font-bold text-heading text-sm">Automation Domain Distribution</h3>
          <p className="text-[10px] text-muted">Analysis of what operations your agent is managing.</p>
        </div>
        <div className="space-y-4">
          {[
            { category: "Customer Support Automation", percent: 45, count: "653 tickets resolved", color: "bg-blue" },
            { category: "Sales Operations & Lead Scoring", percent: 35, count: "508 leads analyzed", color: "bg-cyan" },
            { category: "Inventory Syncing & Logistics", percent: 15, count: "218 runs successful", color: "bg-purple-500" },
            { category: "Security Audit & Alerts", percent: 5, count: "73 items reviewed", color: "bg-amber-400" },
          ].map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-heading">{cat.category}</span>
                <span className="text-muted font-medium">{cat.count} ({cat.percent}%)</span>
              </div>
              <div className="w-full bg-navy-soft rounded-full h-2 overflow-hidden border border-white-5">
                <div 
                  className={`h-full rounded-full ${cat.color}`} 
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
