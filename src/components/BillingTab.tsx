"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Check,
  HelpCircle,
  ArrowUpRight,
  Lock,
  Loader2,
  CheckCircle2,
  Download,
  AlertCircle
} from "lucide-react";
import { Skeleton, SkeletonCard } from "./Skeleton";

interface BillingTabProps {
  daysRemaining: number;
  onRenew: () => void;
}

export default function BillingTab({ daysRemaining, onRenew }: BillingTabProps) {
  const [pageLoading, setPageLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const invoices = [
    { id: "INV-8910", date: "June 13, 2026", amount: "$299.00", status: "Paid" },
    { id: "INV-7801", date: "May 13, 2026", amount: "$299.00", status: "Paid" },
    { id: "INV-6799", date: "April 13, 2026", amount: "$299.00", status: "Paid" },
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onRenew(); // Add 30 days to local state
    }, 2000);
  };

  const handleClose = () => {
    setShowModal(false);
    setSuccess(false);
    setCardNumber("");
    setExpiry("");
    setCvc("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-heading">Subscription & Billing Portal</h1>
        <p className="text-xs text-muted">Manage your payment methods, view invoice statements, and renew or upgrade your automated subscription.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Subscription Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 bg-gradient-to-br from-navy-soft to-navy border-border relative overflow-hidden">
            {/* Glow orb */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-start">
              <div>
                <span className="eyebrow mb-2">Current Subscription</span>
                <h3 className="text-2xl font-bold text-heading mt-2">Agentive Pro</h3>
                <p className="text-xs text-muted mt-1">For growing teams automating high-throughput workflows.</p>
              </div>
              <span className="text-xs font-semibold text-cyan bg-cyan/10 border border-cyan/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Active
              </span>
            </div>

            <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-border/60">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">Price</span>
                <p className="text-lg font-bold text-heading mt-1">$299.00 / month</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">Cycle Ends</span>
                <p className="text-lg font-bold text-heading mt-1">July {daysRemaining}, 2026</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">Remaining days</span>
                <p className="text-lg font-bold text-heading mt-1">{daysRemaining} days left</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowModal(true)}
                className="btn-primary py-2.5 px-4 rounded-xl text-xs flex-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Renew Subscription Early
              </button>
              <button className="btn-secondary-dark py-2.5 px-4 rounded-xl text-xs border border-border">
                Upgrade to Enterprise ($999/mo)
              </button>
            </div>
          </div>

          {/* Invoice History */}
          <div className="space-y-4">
            <h3 className="font-bold text-heading text-sm">Invoice Statements</h3>
            <div className="card divide-y divide-border/60 overflow-hidden">
              {invoices.map((inv, idx) => (
                <div key={idx} className="p-4 hover:bg-white-5/35 transition-colors flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-heading">{inv.id}</span>
                    <span className="text-muted">{inv.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-heading">{inv.amount}</span>
                    <span className="text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">
                      {inv.status}
                    </span>
                    <button className="p-1.5 hover:bg-white-5 border border-border hover:border-muted/30 rounded text-muted hover:text-heading transition-colors cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Support & FAQs */}
        <div className="space-y-6">
          <div className="card p-6 space-y-4">
            <h4 className="font-bold text-heading text-sm uppercase tracking-wider flex items-center gap-1.5 text-cyan">
              <HelpCircle className="w-4 h-4" />
              Billing FAQ
            </h4>
            <div className="space-y-4 divide-y divide-border/40">
              <div className="space-y-1">
                <h5 className="text-xs font-semibold text-heading">What happens when my billing cycle ends?</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Your registered credit card will be automatically charged $299.00 for the next 30-day block, keeping your AI Node instances online.
                </p>
              </div>
              <div className="space-y-1 pt-3">
                <h5 className="text-xs font-semibold text-heading">Can I cancel early?</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Yes, canceling early retains active features until the end of your current cycle, after which your AI Agent status falls to idle.
                </p>
              </div>
              <div className="space-y-1 pt-3">
                <h5 className="text-xs font-semibold text-heading">Do you support custom SLA agreements?</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Enterprise-level clients can schedule a custom SLA call via the <strong className="text-heading font-medium">Book Consultation</strong> tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Checkout Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-md p-4">
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md card p-6 md:p-8 border-cyan/20 relative"
            >
              {!success ? (
                <form onSubmit={handlePayment} className="space-y-5">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <div>
                      <h3 className="font-bold text-heading text-base">Renew Subscription</h3>
                      <p className="text-[10px] text-muted mt-0.5">Extend your active Pro plan for 30 additional days.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleClose} 
                      className="text-xs text-muted hover:text-heading cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="bg-navy-soft border border-border p-3.5 rounded-xl space-y-1.5 text-xs text-muted">
                    <div className="flex justify-between">
                      <span>Pro Plan Extension:</span>
                      <strong className="text-heading font-medium">$299.00</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (0%):</span>
                      <strong className="text-heading font-medium">$0.00</strong>
                    </div>
                    <div className="flex justify-between text-sm border-t border-border/60 pt-2 text-heading">
                      <span className="font-semibold">Total Due:</span>
                      <strong className="font-bold">$299.00</strong>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-heading">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-navy border border-border rounded-lg py-2 px-3 text-xs text-heading placeholder-muted focus:outline-none focus:border-blue"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center text-muted">
                          <CreditCard className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-heading">Expiration</label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
                          placeholder="MM/YY"
                          className="w-full bg-navy border border-border rounded-lg py-2 px-3 text-xs text-heading placeholder-muted focus:outline-none focus:border-blue"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-heading">CVC</label>
                        <input
                          type="password"
                          required
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="•••"
                          className="w-full bg-navy border border-border rounded-lg py-2 px-3 text-xs text-heading placeholder-muted focus:outline-none focus:border-blue"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-muted">
                    <Lock className="w-3.5 h-3.5 text-cyan" />
                    Payments are encrypted and secured by Stripe.
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-1/3 btn-secondary-dark py-2.5 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 btn-primary py-2.5 rounded-lg text-xs flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Authorize Payment
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-5"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-heading text-lg">Renewal Successful!</h4>
                    <p className="text-xs text-body leading-relaxed max-w-xs mx-auto">
                      Thank you! Your payment of **$299.00** was processed successfully. 30 days have been added to your cycle.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="btn-primary w-full py-2.5 rounded-lg text-xs"
                  >
                    Back to Billing
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
