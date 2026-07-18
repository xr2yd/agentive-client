"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  BarChart3, 
  Calendar, 
  CreditCard, 
  KeyRound, 
  LogOut, 
  LayoutDashboard, 
  Menu,
  X,
  User,
  ShieldCheck
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "chat", label: "AI Consultation", icon: Bot },
    { id: "reports", label: "Performance Reports", icon: BarChart3 },
    { id: "booking", label: "Book Consultation", icon: Calendar },
    { id: "billing", label: "Subscription & Bills", icon: CreditCard },
    { id: "settings", label: "API & Configuration", icon: KeyRound },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-navy-soft border-b border-border z-30 w-full fixed top-0 left-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-heading">
            Agentive<span className="text-cyan font-normal">.</span>
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-heading hover:bg-white-5 rounded-lg border border-border"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-navy border-r border-border flex flex-col justify-between transition-transform duration-300 md:translate-x-0 pt-16 md:pt-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            {/* Logo Desktop */}
            <div className="hidden md:flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-blue/20">
                <Bot className="w-5.5 h-5.5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-heading">
                Agentive<span className="text-cyan font-normal">.</span>
              </span>
              <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false); // Close mobile menu
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? "bg-blue/10 border border-blue/25 text-white shadow-sm" 
                        : "text-muted hover:text-heading hover:bg-white-5 border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? "text-cyan" : ""}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Profile and Sign Out */}
          <div className="space-y-4 pt-6 border-t border-border">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-white-5 border border-border flex items-center justify-center text-cyan shadow-inner">
                <User className="w-4.5 h-4.5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-semibold text-heading truncate">Acme Corporation</h4>
                <p className="text-[10px] text-muted truncate">demo@agentive.com</p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/5 hover:text-red-300 border border-transparent hover:border-red-500/10 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile Menu */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
