"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  KeyRound,
  BarChart3,
  Zap,
  CreditCard,
  Bot,
  type LucideIcon,
} from "lucide-react";

interface DummyInteraction {
  name: string;
  action: string;
  detail: string;
  icon: LucideIcon;
}

const interactions: DummyInteraction[] = [
  // === BOOKING KONSULTASI ===
  { name: "Sarah", action: "booking sesi konsultasi", detail: "Workflow Optimization", icon: CalendarCheck },
  { name: "Andi", action: "menjadwalkan", detail: "AI Agent Setup Call", icon: CalendarCheck },
  { name: "Rina", action: "booking", detail: "Technical Assessment", icon: CalendarCheck },
  { name: "Budi", action: "menjadwalkan konsultasi", detail: "Custom Integration", icon: CalendarCheck },
  { name: "Dian", action: "booking sesi", detail: "Performance Review", icon: CalendarCheck },
  { name: "Fajar", action: "menjadwalkan", detail: "Enterprise Onboarding", icon: CalendarCheck },
  { name: "Mega", action: "booking", detail: "Security Audit Session", icon: CalendarCheck },
  { name: "Dimas", action: "menjadwalkan demo", detail: "Advanced Features", icon: CalendarCheck },
  { name: "Putu", action: "booking sesi", detail: "Team Training", icon: CalendarCheck },
  { name: "Hendra", action: "menjadwalkan", detail: "SLA Review Meeting", icon: CalendarCheck },
  { name: "Sari", action: "booking konsultasi", detail: "Database Optimization", icon: CalendarCheck },
  { name: "Adi", action: "menjadwalkan", detail: "Migration Assistance", icon: CalendarCheck },
  { name: "Wulan", action: "booking sesi", detail: "AI Strategy Session", icon: CalendarCheck },
  { name: "Bayu", action: "menjadwalkan", detail: "Integration Checkup", icon: CalendarCheck },
  { name: "Citra", action: "booking", detail: "Quarterly Review", icon: CalendarCheck },
  { name: "Eko", action: "menjadwalkan konsultasi", detail: "Workflow Design", icon: CalendarCheck },
  { name: "Fitri", action: "booking sesi", detail: "ROI Analysis", icon: CalendarCheck },
  { name: "Gilang", action: "menjadwalkan", detail: "System Audit", icon: CalendarCheck },
  { name: "Hana", action: "booking", detail: "Optimization Review", icon: CalendarCheck },
  { name: "Irfan", action: "menjadwalkan demo", detail: "New Features Overview", icon: CalendarCheck },

  // === AKTIVASI / INTEGRASI ===
  { name: "Joko", action: "menghubungkan", detail: "Shopify + Agentive", icon: Zap },
  { name: "Kiki", action: "mengaktifkan", detail: "AI Agent Customer Service", icon: Bot },
  { name: "Lina", action: "mengintegrasikan", detail: "HubSpot CRM Pipeline", icon: Zap },
  { name: "Made", action: "mengaktifkan", detail: "AI Agent Data Entry", icon: Bot },
  { name: "Nina", action: "menghubungkan", detail: "Slack + Email + Database", icon: Zap },
  { name: "Oscar", action: "mengaktifkan", detail: "AI Agent Reporting", icon: Bot },
  { name: "Putri", action: "mengintegrasikan", detail: "Google Sheets + CRM", icon: Zap },
  { name: "Qori", action: "mengaktifkan", detail: "AI Agent Inventory", icon: Bot },
  { name: "Rudi", action: "menghubungkan", detail: "WhatsApp API + System", icon: Zap },
  { name: "Sinta", action: "mengaktifkan", detail: "AI Agent untuk Finance", icon: Bot },
  { name: "Teguh", action: "mengintegrasikan", detail: "Notion + Gmail + Slack", icon: Zap },
  { name: "Umi", action: "mengaktifkan", detail: "AI Agent Marketing", icon: Bot },
  { name: "Vina", action: "menghubungkan", detail: "ERP + 3 tools lain", icon: Zap },
  { name: "Wahyu", action: "mengaktifkan", detail: "AI Agent Procurement", icon: Bot },
  { name: "Xena", action: "mengintegrasikan", detail: "API Kustom + Webhook", icon: Zap },
  { name: "Yoga", action: "mengaktifkan", detail: "AI Agent untuk HR", icon: Bot },
  { name: "Zara", action: "menghubungkan", detail: "Database + 4 Aplikasi", icon: Zap },
  { name: "Aji", action: "mengaktifkan", detail: "AI Agent Support", icon: Bot },
  { name: "Bella", action: "mengintegrasikan", detail: "5 Channel Komunikasi", icon: Zap },
  { name: "Candra", action: "mengaktifkan", detail: "AI Agent Analitik", icon: Bot },

  // === REPORT & BILLING ===
  { name: "Dewi", action: "mengunduh", detail: "Laporan Performa Bulanan", icon: BarChart3 },
  { name: "Eka", action: "memperbarui", detail: "Metode Pembayaran", icon: CreditCard },
  { name: "Farah", action: "mengenerate", detail: "API Key Baru", icon: KeyRound },
  { name: "Gita", action: "memperpanjang", detail: "Langganan Pro Plan", icon: CreditCard },
  { name: "Hari", action: "mengunduh", detail: "Invoice Statement", icon: BarChart3 },
  { name: "Indah", action: "meng-upgrade ke", detail: "Paket Enterprise", icon: CreditCard },
  { name: "Jaya", action: "mengenerate", detail: "Webhook Credentials", icon: KeyRound },
  { name: "Karin", action: "memperbarui", detail: "Pengaturan Agent", icon: KeyRound },
  { name: "Leo", action: "mengunduh", detail: "Analitik Mingguan", icon: BarChart3 },
  { name: "Maya", action: "memperpanjang", detail: "SLA Agreement", icon: CreditCard },
  { name: "Nando", action: "mengenerate", detail: "Integration Token", icon: KeyRound },
  { name: "Olga", action: "memperbarui", detail: "Billing Information", icon: CreditCard },
  { name: "Pram", action: "mengunduh", detail: "Tax Report", icon: BarChart3 },
  { name: "Queen", action: "meng-upgrade ke", detail: "Paket Professional", icon: CreditCard },
  { name: "Rama", action: "mengenerate", detail: "SSH Key Pair", icon: KeyRound },
  { name: "Siska", action: "memperbarui", detail: "Notification Preferences", icon: KeyRound },
  { name: "Tama", action: "mengunduh", detail: "Audit Trail Logs", icon: BarChart3 },
  { name: "Ulan", action: "memperpanjang", detail: "Domain Subscription", icon: CreditCard },
  { name: "Vero", action: "mengenerate", detail: "Client Access Key", icon: KeyRound },
  { name: "Winda", action: "memperbarui", detail: "Team Permissions", icon: KeyRound },
];

function getRandomInteraction(excludeIndex?: number): {
  interaction: DummyInteraction;
  index: number;
} {
  let index: number;
  do {
    index = Math.floor(Math.random() * interactions.length);
  } while (index === excludeIndex);
  return { interaction: interactions[index], index };
}

export default function SocialProof() {
  const [current, setCurrent] = useState<DummyInteraction | null>(null);
  const [visible, setVisible] = useState(false);
  const [lastIndex, setLastIndex] = useState<number>(-1);

  const showNext = useCallback(() => {
    const { interaction, index } = getRandomInteraction(lastIndex);
    setLastIndex(index);
    setCurrent(interaction);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [lastIndex]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      showNext();
    }, 3000);

    const interval = setInterval(() => {
      showNext();
    }, 10000 + Math.random() * 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNext]);

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {visible && current && (
          <motion.div
            key={`${current.name}-${current.detail}-${Date.now()}`}
            initial={{ opacity: 0, x: -60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -60, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
            className="pointer-events-auto"
          >
            <div className="glass rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue/50 to-transparent" />

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue/20 to-purple/20 border border-white/10 flex items-center justify-center">
                  <current.icon size={18} className="text-cyan" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 font-medium leading-snug">
                    <span className="font-semibold text-white">{current.name}</span>{" "}
                    <span className="text-white/70">{current.action}</span>
                  </p>
                  <p className="text-xs text-cyan/80 mt-0.5 font-medium">
                    {current.detail}
                  </p>

                  <p className="text-[10px] text-white/30 mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
                    Baru saja
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
