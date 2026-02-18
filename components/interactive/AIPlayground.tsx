"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    role: "user" | "ai";
    text: string;
    timestamp: Date;
};

const AIPlayground = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "ai",
            text: "Hi! I'm the ZapLead Agent. I qualify leads instantly. Try me! Ask about pricing, booking a demo, or how I work.",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            text: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Prepare history for API (exclude the latest user message which is sent separately)
            const history = messages.map(m => ({
                role: m.role,
                text: m.text
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg.text,
                    history: history
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                text: data.response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error("Failed to get AI response:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                text: "I'm having trouble connecting to my brain right now. Please check if the API key is set correctly.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[450px] sm:h-[600px]">

                {/* Sidebar / Info Panel */}
                <div className="hidden md:flex w-1/3 bg-black/20 border-r border-white/5 p-8 flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">ZapLead AI</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Online & Ready
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-blue-300">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm font-semibold">Response Time</span>
                                </div>
                                <p className="text-2xl font-bold text-white">~0.2s</p>
                                <p className="text-xs text-white/50">Faster than any human</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 className="text-sm font-semibold text-white mb-2">Capabilities</h4>
                                <ul className="text-xs text-white/60 space-y-2">
                                    <li className="flex items-center gap-2">✓ Qualifies Leads</li>
                                    <li className="flex items-center gap-2">✓ Books Meetings</li>
                                    <li className="flex items-center gap-2">✓ Handles Objections</li>
                                    <li className="flex items-center gap-2">✓ 24/7 Availability</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-white/30 text-center">
                        Powered by ZapLead Engine v2.0
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-gradient-to-b from-white/5 to-transparent">
                    {/* Header (Mobile only) */}
                    <div className="md:hidden p-4 border-b border-white/10 flex items-center gap-3 bg-black/20">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">ZapLead AI</h3>
                            <p className="text-[10px] text-green-400">Online</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                    >
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                        msg.role === "ai" ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white"
                                    )}>
                                        {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                                    </div>

                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.role === "ai"
                                            ? "bg-blue-500/10 border border-blue-500/20 text-blue-100 rounded-tl-none"
                                            : "bg-white text-black rounded-tr-none"
                                    )}>
                                        {msg.text}
                                        <div className={cn(
                                            "text-[10px] mt-1 opacity-50",
                                            msg.role === "ai" ? "text-blue-200" : "text-black/60"
                                        )}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex gap-3"
                            >
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </motion.div>
                        )}

                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-black/20">
                        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all disabled:opacity-50 disabled:hover:bg-blue-600"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <p className="text-center text-[10px] text-white/30 mt-3">
                            This is a live demo. Try asking about pricing or booking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPlayground;
