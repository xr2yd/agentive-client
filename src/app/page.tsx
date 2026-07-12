"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "@/components/Login";
import Sidebar from "@/components/Sidebar";
import OverviewTab from "@/components/OverviewTab";
import ChatTab from "@/components/ChatTab";
import ReportsTab from "@/components/ReportsTab";
import BookingTab from "@/components/BookingTab";
import BillingTab from "@/components/BillingTab";
import SettingsTab from "@/components/SettingsTab";

interface Booking {
  date: string;
  time: string;
  category: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(14);

  // Shared booking state
  const [bookedMeetings, setBookedMeetings] = useState<Booking[]>([]);

  // Shared API keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key-1",
      name: "Stripe Payment Listener Webhook",
      key: "pk_live_51NvC7...8jK9P",
      created: "June 13, 2026",
    },
    {
      id: "key-2",
      name: "Shopify Orders Syncing Endpoint",
      key: "pk_live_98ZmA...1tX2r",
      created: "June 20, 2026",
    },
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("overview");
  };

  const handleRenew = () => {
    setDaysRemaining((prev) => prev + 30);
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookedMeetings((prev) => [newBooking, ...prev]);
  };

  const handleAddKey = (name: string) => {
    const randomKey = `pk_live_${Math.random().toString(36).substring(2, 8).toUpperCase()}...${Math.random().toString(36).substring(2, 7).toLowerCase()}`;
    const newKey: ApiKey = {
      id: Math.random().toString(),
      name,
      key: randomKey,
      created: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };
    setApiKeys((prev) => [...prev, newKey]);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-navy text-body flex flex-col md:flex-row relative">
      {/* Sidebar navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen md:pl-64 pt-16 md:pt-0 overflow-x-hidden">
        <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6">
          {/* Active tab content switcher */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {activeTab === "overview" && (
                <OverviewTab 
                  setActiveTab={setActiveTab} 
                  daysRemaining={daysRemaining} 
                />
              )}
              {activeTab === "chat" && <ChatTab />}
              {activeTab === "reports" && <ReportsTab />}
              {activeTab === "booking" && (
                <BookingTab 
                  onAddBooking={handleAddBooking} 
                  bookedMeetings={bookedMeetings} 
                />
              )}
              {activeTab === "billing" && (
                <BillingTab 
                  daysRemaining={daysRemaining} 
                  onRenew={handleRenew} 
                />
              )}
              {activeTab === "settings" && (
                <SettingsTab
                  apiKeys={apiKeys}
                  onAddKey={handleAddKey}
                  onRevokeKey={handleRevokeKey}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
