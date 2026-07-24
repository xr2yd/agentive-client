"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  KeyRound, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  Sliders, 
  Save, 
  Loader2, 
  Bot
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
}

interface SettingsProps {
  apiKeys: ApiKey[];
  onAddKey: (name: string) => void;
  onRevokeKey: (id: string) => void;
}

export default function SettingsTab({ apiKeys, onAddKey, onRevokeKey }: SettingsProps) {
  const [newKeyName, setNewKeyName] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Configuration forms
  const [tone, setTone] = useState("technical");
  const [reasoning, setReasoning] = useState(75); // 0-100 (Speed vs Reasoning)
  const [shopifyActive, setShopifyActive] = useState(true);
  const [hubspotActive, setHubspotActive] = useState(true);
  const [slackActive, setSlackActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    onAddKey(newKeyName);
    setNewKeyName("");
    setShowKeyModal(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-heading">API & Agent Settings</h1>
        <p className="text-xs text-muted">Manage webhook API keys, configure custom model parameters, and toggle integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: API Key Manager & Agent Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* API Key Manager */}
          <div className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-heading text-sm flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan" />
                  API Access Credentials
                </h3>
                <p className="text-[10px] text-muted">Use these keys to authenticate webhooks and custom API integrations.</p>
              </div>
              <button
                onClick={() => setShowKeyModal(true)}
                className="btn-primary py-1.5 px-3 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                New Key
              </button>
            </div>

            {/* API Keys Table */}
            <div className="border border-border/80 rounded-xl overflow-hidden divide-y divide-border/60">
              {apiKeys.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted italic">
                  No active API keys found. Click &quot;New Key&quot; to generate one.
                </div>
              ) : (
                apiKeys.map((key) => (
                  <div key={key.id} className="p-4 hover:bg-white-5/25 transition-colors flex items-center justify-between text-xs gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-heading block">{key.name}</span>
                      <code className="text-muted text-[11px] font-mono block">{key.key}</code>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-muted whitespace-nowrap">Created {key.created}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(key.id, key.key)}
                          className="p-1.5 hover:bg-white-5 border border-border hover:border-muted/30 rounded text-muted hover:text-heading transition-colors cursor-pointer"
                          title="Copy Key"
                        >
                          {copiedId === key.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => onRevokeKey(key.id)}
                          className="p-1.5 hover:bg-red-500/5 border border-border hover:border-red-500/20 rounded text-muted hover:text-red-400 transition-colors cursor-pointer"
                          title="Revoke Key"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Agent Configuration */}
          <div className="card p-6 space-y-6">
            <h3 className="font-bold text-heading text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan" />
              AI Agent Model Configuration
            </h3>

            <div className="space-y-5">
              {/* Slider for Latency vs Quality */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-heading">Reasoning Latency vs Depth</span>
                  <span className="text-cyan font-semibold">{reasoning}% Reasoning</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reasoning}
                  onChange={(e) => setReasoning(Number(e.target.value))}
                  className="w-full h-1 bg-navy-soft rounded-lg appearance-none cursor-pointer accent-blue"
                />
                <div className="flex justify-between text-[9px] text-muted">
                  <span>Fast Response (Low Cost)</span>
                  <span>Deep Reasoning (High Quality)</span>
                </div>
              </div>

              {/* Tone dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-heading uppercase tracking-wider">Advisor Conversation Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-navy border border-border rounded-lg py-2.5 px-3 text-xs text-heading focus:outline-none focus:border-blue"
                >
                  <option value="technical">Highly Technical & Analytical</option>
                  <option value="professional">Professional & Direct</option>
                  <option value="friendly">Collaborative & Instructive</option>
                </select>
              </div>

              {/* Toggles for Integrations */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <h4 className="text-[10px] font-bold text-heading uppercase tracking-wider">Active Platforms</h4>
                
                <div className="space-y-2">
                  {[
                    { label: "Shopify Real-time inventory synchronization", state: shopifyActive, setState: setShopifyActive },
                    { label: "Hubspot CRM deal pipeline monitoring", state: hubspotActive, setState: setHubspotActive },
                    { label: "Slack Operational alerts & notifications", state: slackActive, setState: setSlackActive },
                  ].map((tg, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 rounded-lg bg-navy border border-border/80 cursor-pointer select-none">
                      <span className="text-xs text-body font-medium">{tg.label}</span>
                      <input
                        type="checkbox"
                        checked={tg.state}
                        onChange={() => tg.setState(!tg.state)}
                        className="w-8 h-4 rounded bg-navy-soft border border-border accent-cyan focus:ring-0 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-muted flex items-center gap-1">
                  <Bot className="w-4 h-4 text-cyan" />
                  Configurations deploy instantly to active agent nodes.
                </span>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="btn-primary py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      Saving...
                    </>
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Saved Successfully
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Agent Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: API Documentation Quick Start */}
        <div className="space-y-6">
          <div className="card p-5 space-y-4">
            <h4 className="font-bold text-heading text-xs uppercase tracking-wider text-cyan">
              API Quick Start
            </h4>
            <div className="space-y-3 text-[11px] leading-relaxed text-muted">
              <p>
                To trigger an automated task analysis or feed custom audit logs to your agent, send a <code className="text-heading bg-white-5 px-1 py-0.5 rounded font-mono">POST</code> request:
              </p>
              <pre className="p-3 bg-navy border border-border rounded-lg text-[9px] font-mono text-cyan overflow-x-auto">
{`curl -X POST https://api.agentive.com/v1/optimize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "system_id": "shopify_store",
    "metrics": { "bounce_rate": 3.4 }
  }'`}
              </pre>
              <p>
                A successful payload triggers automated optimization scans and logs the event inside your **Overview Activity Feed**.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generate API Key Modal Dialog */}
      <AnimatePresence>
        {showKeyModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm card p-6 border-cyan/20"
            >
              <form onSubmit={handleCreateKey} className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <h3 id="settings-modal-title" className="font-bold text-heading text-sm">Create API Key</h3>
                  <button 
                    type="button" 
                    onClick={() => setShowKeyModal(false)}
                    className="text-xs text-muted hover:text-heading cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-heading">Key Identifier Name</label>
                  <input
                    type="text"
                    required
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. Production Webhook Link"
                    className="w-full bg-navy border border-border rounded-lg py-2 px-3 text-xs text-heading placeholder-muted focus:outline-none focus:border-blue"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-2.5 rounded-lg text-xs"
                >
                  Generate Credentials
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
