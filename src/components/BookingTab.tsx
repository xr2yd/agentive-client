"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, CheckCircle2, ChevronRight,   Loader2 } from "lucide-react";

interface Booking {
  date: string;
  time: string;
  category: string;
}

interface BookingTabProps {
  onAddBooking: (booking: Booking) => void;
  bookedMeetings: Booking[];
}

export default function BookingTab({ onAddBooking, bookedMeetings }: BookingTabProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [category, setCategory] = useState("optimize");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate July 2026 Calendar Grid (Starts on Wednesday)
  const totalDays = 31;
  const startOffset = 3; // Offset for Wed start
  const calendarDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setLoading(true);

    setTimeout(() => {
      const formattedDate = `July ${selectedDate}, 2026`;
      const catLabel = 
        category === "optimize" ? "System Optimization" : 
        category === "database" ? "Custom Database Integration" : 
        category === "scaling" ? "Scaling Workflows" : "Billing & Security";

      onAddBooking({
        date: formattedDate,
        time: selectedTime,
        category: catLabel,
      });

      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setCategory("optimize");
    setDescription("");
    setSuccess(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-heading">Book Expert Consultation</h1>
        <p className="text-xs text-muted">Schedule a direct video call with our systems architects to optimize and scale your AI workflows.</p>
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left 2 Columns: Selection Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Select Date */}
              <div className="card p-6 space-y-4">
                <h3 className="font-bold text-heading text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue/10 text-cyan flex items-center justify-center text-xs">1</span>
                  Select a Date (July 2026)
                </h3>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
                    <span key={i} className="text-muted font-bold py-1 uppercase text-[10px] tracking-wider">{d}</span>
                  ))}
                  
                  {/* Empty cells for offset */}
                  {Array.from({ length: startOffset }).map((_, i) => (
                    <span key={`empty-${i}`} />
                  ))}

                  {/* Calendar Days */}
                  {calendarDays.map((day) => {
                    const isSelected = selectedDate === day;
                    // Simple logic to disable past/weekend days (mocking)
                    const isWeekend = (day + startOffset) % 7 === 0 || (day + startOffset) % 7 === 6;
                    return (
                      <button
                        key={day}
                        onClick={() => {
                          if (!isWeekend) setSelectedDate(day);
                        }}
                        disabled={isWeekend}
                        type="button"
                        className={`py-2 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                          isWeekend 
                            ? "text-muted/30 cursor-not-allowed" 
                            : isSelected 
                              ? "bg-blue text-white shadow-md shadow-blue/20" 
                              : "hover:bg-white-5 text-heading border border-transparent hover:border-border"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Time */}
              <div className="card p-6 space-y-4">
                <h3 className="font-bold text-heading text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue/10 text-cyan flex items-center justify-center text-xs">2</span>
                  Select Time Slot (UTC)
                </h3>
                {!selectedDate ? (
                  <p className="text-xs text-muted italic">Please choose a date from the calendar first.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-cyan/15 border-cyan text-cyan" 
                              : "bg-navy-soft border-border hover:border-cyan/40 text-heading"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                          {time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Column: Booking Details Form */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-heading text-sm mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue/10 text-cyan flex items-center justify-center text-xs">3</span>
                  Meeting Details
                </h3>

                <form onSubmit={handleBook} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-heading uppercase tracking-wider">Topic Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-navy border border-border rounded-lg py-2 px-3 text-xs text-heading focus:outline-none focus:border-blue"
                    >
                      <option value="optimize">Workflow Optimization</option>
                      <option value="database">Custom Database Integration</option>
                      <option value="scaling">Scaling Node executors</option>
                      <option value="billing">Billing & Custom SLA Plans</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-heading uppercase tracking-wider">Brief Context</label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what you want to address (e.g. database syncing lag, Shopify stock triggers)..."
                      className="w-full bg-navy border border-border rounded-lg py-2.5 px-3 text-xs text-heading placeholder-muted resize-none focus:outline-none focus:border-blue transition-colors"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-white-5 border border-border rounded-lg p-3 text-xs space-y-1 text-muted">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <strong className="text-heading font-medium">{selectedDate ? `July ${selectedDate}, 2026` : "Not selected"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <strong className="text-heading font-medium">{selectedTime || "Not selected"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <strong className="text-heading font-medium">30-min Video Call (Google Meet)</strong>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || loading}
                    className="w-full btn-primary py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        Scheduling Call...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Booked Meetings List */}
              {bookedMeetings.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-heading uppercase tracking-wider">Scheduled Calls ({bookedMeetings.length})</h4>
                  <div className="space-y-2">
                    {bookedMeetings.map((mtg, idx) => (
                      <div key={idx} className="card p-3 flex flex-col gap-1 border-emerald-500/20 bg-emerald-500/5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-heading">{mtg.category}</span>
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Confirmed</span>
                        </div>
                        <div className="flex gap-4 text-[10px] text-muted mt-1.5">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-cyan" />
                            {mtg.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-cyan" />
                            {mtg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto card p-8 text-center space-y-6 border-cyan/30"
          >
            <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/30 text-cyan flex items-center justify-center mx-auto shadow-lg shadow-cyan/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-heading">Consultation Scheduled!</h2>
              <p className="text-xs text-body max-w-sm mx-auto leading-relaxed">
                Your advisory session has been confirmed. A Google Meet link and calendar invitation have been sent to your email (<strong className="text-heading font-medium">demo@agentive.com</strong>).
              </p>
            </div>

            <div className="bg-navy-soft border border-border rounded-xl p-4 text-xs text-left divide-y divide-border/60">
              <div className="pb-2.5 flex justify-between">
                <span className="text-muted">Advisory Topic:</span>
                <strong className="text-heading font-semibold">
                  {category === "optimize" ? "System Optimization" : 
                   category === "database" ? "Custom Database Integration" : 
                   category === "scaling" ? "Scaling Workflows" : "Billing & Security"}
                </strong>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-muted">Date & Time:</span>
                <strong className="text-heading font-semibold">July {selectedDate}, 2026 at {selectedTime} UTC</strong>
              </div>
              <div className="pt-2.5 flex justify-between">
                <span className="text-muted">Host:</span>
                <strong className="text-heading font-semibold">Agentive Support Engineers</strong>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="btn-primary w-full py-2.5 rounded-lg text-xs"
            >
              Book Another Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
