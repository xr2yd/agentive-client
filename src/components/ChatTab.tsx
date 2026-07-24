"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Loader2, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "ai",
      text: "Hello Acme team! I am your Agentive Optimization Advisor. I analyze your connected systems and workflow reports to find bottlenecks. \n\nWhat workflow or system performance would you like to improve today? You can choose one of the suggestions below or type your query.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Optimize customer support response times",
    "Find sales database synchronization delays",
    "Identify automated return processing improvements",
    "Review current API throughput bottlenecks",
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the AI Advisor.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: "ai",
        text: data.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: Math.random().toString(),
        sender: "ai",
        text: `⚠️ **System Connection Error**: ${err.message || "Could not connect to the AI service. Please try again later."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputText);
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col justify-between">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
        <div>
          <h1 className="text-xl font-bold text-heading flex items-center gap-2">
            AI Advisory Console
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          </h1>
          <p className="text-xs text-muted">Continuous optimization advice based on active workflow intelligence.</p>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 bg-white-5 hover:bg-white-10 border border-border rounded-lg text-muted hover:text-heading transition-colors"
          title="Clear Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-3.5 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                msg.sender === "user" 
                  ? "bg-blue/10 border-blue/20 text-cyan" 
                  : "gradient-bg border-transparent text-white"
              }`}>
                {msg.sender === "user" ? <User className="w-[18px] h-[18px]" /> : <Bot className="w-[18px] h-[18px]" />}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue/10 border border-blue/20 text-white rounded-tr-sm"
                  : "bg-navy-soft border border-border text-body rounded-tl-sm whitespace-pre-line"
              }`}>
                {msg.text}
                <span className="block text-[9px] text-muted text-right mt-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-start gap-3.5 mr-auto">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 gradient-bg text-white">
              <Bot className="w-[18px] h-[18px] animate-pulse" />
            </div>
            <div className="bg-navy-soft border border-border p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Panel */}
      {messages.length === 1 && (
        <div className="my-4">
          <p className="text-xs text-muted mb-2 font-semibold uppercase tracking-wider">Suggested Topics</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-xs bg-navy-soft hover:bg-white-5 border border-border hover:border-cyan/30 text-body hover:text-heading px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="mt-4 flex gap-2 relative">
        <textarea
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask your AI Agent about workflow improvements..."
          className="flex-1 bg-navy-soft border border-border focus:border-blue rounded-xl py-3 pl-4 pr-12 text-sm text-heading placeholder-muted resize-none focus:outline-none transition-colors scrollbar max-h-32"
          disabled={isTyping}
        />
        <button
          onClick={() => handleSend(inputText)}
          disabled={!inputText.trim() || isTyping}
          className="absolute right-2 top-2 p-2 bg-blue hover:bg-indigo-600 rounded-lg text-white hover:text-cyan disabled:bg-navy border-none transition-colors cursor-pointer"
        >
          {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
