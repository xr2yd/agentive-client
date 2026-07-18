"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  // === BOOKING KONSULTASI (30) ===
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
  { name: "Jeni", action: "booking sesi", detail: "Data Pipeline Review", icon: CalendarCheck },
  { name: "Krisna", action: "menjadwalkan", detail: "Compliance Check", icon: CalendarCheck },
  { name: "Laras", action: "booking", detail: "Cost Optimization", icon: CalendarCheck },
  { name: "Miko", action: "menjadwalkan konsultasi", detail: "Architecture Review", icon: CalendarCheck },
  { name: "Novi", action: "booking sesi", detail: "Disaster Recovery", icon: CalendarCheck },
  { name: "Oni", action: "menjadwalkan", detail: "Performance Tuning", icon: CalendarCheck },
  { name: "Pia", action: "booking", detail: "Security Assessment", icon: CalendarCheck },
  { name: "Raka", action: "menjadwalkan demo", detail: "Platform Overview", icon: CalendarCheck },
  { name: "Santi", action: "booking sesi", detail: "Integration Planning", icon: CalendarCheck },
  { name: "Toni", action: "menjadwalkan", detail: "Scale Strategy", icon: CalendarCheck },

  // === AKTIVASI / INTEGRASI (35) ===
  { name: "Joko", action: "menghubungkan", detail: "Shopify + Agentive", icon: Zap },
  { name: "Kiki", action: "mengaktifkan", detail: "AI Agent Customer Service", icon: Bot },
  { name: "Lina", action: "mengintegrasikan", detail: "HubSpot CRM Pipeline", icon: Zap },
  { name: "Made", action: "mengaktifkan", detail: "AI Agent Data Entry", icon: Bot },
  { name: "Nina", action: "menghubungkan", detail: "Slack + Email + Database", icon: Zap },
  { name: "Oscar", action: "mengaktifkan", detail: "AI Agent Reporting", icon: Bot },
  { name: "Putri", action: "mengintegrasikan", detail: "Google Sheets + CRM", icon: Zap },
  { name: "Qori", action: "mengaktifkan", detail: "AI Agent Inventory", icon: Bot },
  { name: "Rudi", action: "menghubungkan", detail: "WhatsApp API + System", icon: Zap },
  { name: "Sinta", action: "mengaktifkan", detail: "AI Agent Finance", icon: Bot },
  { name: "Teguh", action: "mengintegrasikan", detail: "Notion + Gmail + Slack", icon: Zap },
  { name: "Umi", action: "mengaktifkan", detail: "AI Agent Marketing", icon: Bot },
  { name: "Vina", action: "menghubungkan", detail: "ERP + 3 tools lain", icon: Zap },
  { name: "Wahyu", action: "mengaktifkan", detail: "AI Agent Procurement", icon: Bot },
  { name: "Xena", action: "mengintegrasikan", detail: "API Kustom + Webhook", icon: Zap },
  { name: "Yoga", action: "mengaktifkan", detail: "AI Agent HR", icon: Bot },
  { name: "Zara", action: "menghubungkan", detail: "Database + 4 Aplikasi", icon: Zap },
  { name: "Aji", action: "mengaktifkan", detail: "AI Agent Support", icon: Bot },
  { name: "Bella", action: "mengintegrasikan", detail: "5 Channel Komunikasi", icon: Zap },
  { name: "Candra", action: "mengaktifkan", detail: "AI Agent Analitik", icon: Bot },
  { name: "Dewi", action: "menghubungkan", detail: "Stripe Payment Webhook", icon: Zap },
  { name: "Evan", action: "mengaktifkan", detail: "AI Agent Sales", icon: Bot },
  { name: "Fina", action: "mengintegrasikan", detail: "Mailchimp + CRM", icon: Zap },
  { name: "Gunawan", action: "mengaktifkan", detail: "AI Agent Monitoring", icon: Bot },
  { name: "Hilda", action: "menghubungkan", detail: "Google Analytics + API", icon: Zap },
  { name: "Indra", action: "mengaktifkan", detail: "AI Agent Compliance", icon: Bot },
  { name: "Jasmine", action: "mengintegrasikan", detail: "Zendesk + Slack", icon: Zap },
  { name: "Kevin", action: "mengaktifkan", detail: "AI Agent Logistics", icon: Bot },
  { name: "Lia", action: "menghubungkan", detail: "Custom API + Database", icon: Zap },
  { name: "Maman", action: "mengaktifkan", detail: "AI Agent Admin", icon: Bot },
  { name: "Nadia", action: "mengintegrasikan", detail: "Trello + Jira + Slack", icon: Zap },
  { name: "Oki", action: "mengaktifkan", detail: "AI Agent Research", icon: Bot },
  { name: "Pram", action: "menghubungkan", detail: "AWS S3 + Agentive", icon: Zap },
  { name: "Queen", action: "mengaktifkan", detail: "AI Agent Security", icon: Bot },
  { name: "Rama", action: "mengintegrasikan", detail: "Firebase + BigQuery", icon: Zap },

  // === REPORT & BILLING (35) ===
  { name: "Uci", action: "mengunduh", detail: "Laporan Performa Bulanan", icon: BarChart3 },
  { name: "Vicky", action: "memperbarui", detail: "Metode Pembayaran", icon: CreditCard },
  { name: "Wawan", action: "mengenerate", detail: "API Key Baru", icon: KeyRound },
  { name: "Yanti", action: "memperpanjang", detail: "Langganan Pro Plan", icon: CreditCard },
  { name: "Agus", action: "mengunduh", detail: "Invoice Statement", icon: BarChart3 },
  { name: "Betty", action: "meng-upgrade ke", detail: "Paket Enterprise", icon: CreditCard },
  { name: "Cahyo", action: "mengenerate", detail: "Webhook Credentials", icon: KeyRound },
  { name: "Dina", action: "memperbarui", detail: "Pengaturan Agent", icon: KeyRound },
  { name: "Evan", action: "mengunduh", detail: "Analitik Mingguan", icon: BarChart3 },
  { name: "Fina", action: "memperpanjang", detail: "SLA Agreement", icon: CreditCard },
  { name: "Gita", action: "mengenerate", detail: "Integration Token", icon: KeyRound },
  { name: "Hari", action: "memperbarui", detail: "Billing Information", icon: CreditCard },
  { name: "Indah", action: "mengunduh", detail: "Tax Report", icon: BarChart3 },
  { name: "Jaya", action: "meng-upgrade ke", detail: "Paket Professional", icon: CreditCard },
  { name: "Karin", action: "mengenerate", detail: "SSH Key Pair", icon: KeyRound },
  { name: "Leo", action: "memperbarui", detail: "Notification Preferences", icon: KeyRound },
  { name: "Maya", action: "mengunduh", detail: "Audit Trail Logs", icon: BarChart3 },
  { name: "Nando", action: "memperpanjang", detail: "Domain Subscription", icon: CreditCard },
  { name: "Olga", action: "mengenerate", detail: "Client Access Key", icon: KeyRound },
  { name: "Pia", action: "memperbarui", detail: "Team Permissions", icon: KeyRound },
  { name: "Qori", action: "mengunduh", detail: "Usage Report", icon: BarChart3 },
  { name: "Raka", action: "memperbarui", detail: "Alamat Penagihan", icon: CreditCard },
  { name: "Santi", action: "mengenerate", detail: "OAuth Token", icon: KeyRound },
  { name: "Toni", action: "memperpanjang", detail: "Enterprise Contract", icon: CreditCard },
  { name: "Ulan", action: "mengunduh", detail: "Cost Analysis", icon: BarChart3 },
  { name: "Vero", action: "memperbarui", detail: "Tax Settings", icon: CreditCard },
  { name: "Winda", action: "mengenerate", detail: "Deploy Key", icon: KeyRound },
  { name: "Xena", action: "memperbarui", detail: "Security Preferences", icon: KeyRound },
  { name: "Yusuf", action: "mengunduh", detail: "Monthly Summary", icon: BarChart3 },
  { name: "Zaki", action: "memperpanjang", detail: "Starter Plan", icon: CreditCard },
  { name: "Ayu", action: "mengenerate", detail: "Read-Only Token", icon: KeyRound },
  { name: "Bima", action: "memperbarui", detail: "Webhook Endpoints", icon: KeyRound },
  { name: "Cici", action: "mengunduh", detail: "Error Log Report", icon: BarChart3 },
  { name: "Doni", action: "memperbarui", detail: "Payment Method", icon: CreditCard },
  { name: "Elsa", action: "mengenerate", detail: "Service Account Key", icon: KeyRound },
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
  const lastIndexRef = useRef<number>(-1);
  const hasStartedRef = useRef(false);

  const showNext = useCallback(() => {
    const { interaction, index } = getRandomInteraction(lastIndexRef.current);
    lastIndexRef.current = index;
    setCurrent(interaction);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    // Prevent re-run on StrictMode double-mount
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Random first delay: 2-8 detik, biar tiap refresh beda
    const firstDelay = 2000 + Math.random() * 6000;

    const initialTimer = setTimeout(() => {
      showNext();
    }, firstDelay);

    // Random interval: 8-18 detik
    const interval = setInterval(() => {
      showNext();
    }, 8000 + Math.random() * 10000);

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
