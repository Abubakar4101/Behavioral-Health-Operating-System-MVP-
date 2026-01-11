'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    Settings,
    Maximize,
    MessageSquare,
    FileText,
    Lock,
    Edit3,
    CheckCircle2,
    Clock,
    Sparkles,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDemo } from '@/context/DemoContext';
import { useRouter } from 'next/navigation';

export default function SessionPage() {
    const { startSession, endSession, signNote, noteStatus, addAuditEvent } = useDemo();
    const router = useRouter();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [isAutoPopulating, setIsAutoPopulating] = useState(false);

    useEffect(() => {
        startSession();

        // Auto-population effect
        setIsAutoPopulating(true);
        const autoText = `Session Date: ${new Date().toLocaleDateString()}\nTime: 2:00 PM\nCPT Code: 90837 (Individual Psychotherapy, 60 min)\nPatient: John Doe\n\nClinical Observations:\n- Patient appears well-oriented.\n- Reports increased anxiety related to work stress.\n- GAD-7 score: 14 (Moderate).`;

        let currentText = '';
        const interval = setInterval(() => {
            if (currentText.length < autoText.length) {
                currentText = autoText.slice(0, currentText.length + 5);
                setNoteContent(currentText);
            } else {
                clearInterval(interval);
                setIsAutoPopulating(false);
                addAuditEvent('Auto-Populate', 'Note auto-populated with session metadata and baseline observations.');
            }
        }, 50);

        return () => {
            endSession();
            clearInterval(interval);
        };
    }, []);

    const handleSign = () => {
        signNote();
        // Demo flow: redirect to patients or dashboard after signing
        setTimeout(() => {
            router.push('/');
        }, 1500);
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-black overflow-hidden relative">
            {/* Left: Video Area */}
            <div className="flex-1 min-h-[40vh] lg:min-h-0 relative bg-zinc-900 overflow-hidden">
                {/* Mock Video Feed */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto border-2 border-primary/30 animate-pulse">
                            <span className="text-2xl md:text-4xl font-bold text-primary">JD</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white">John Doe</h3>
                        <p className="text-zinc-500 text-xs md:text-sm">Telehealth Connection: Optimized</p>
                    </div>
                </div>

                {/* Small Self-view */}
                <div className="absolute top-4 right-4 w-32 h-20 md:w-48 md:h-32 bg-zinc-800 rounded-lg md:rounded-xl border border-white/10 overflow-hidden shadow-2xl z-20">
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 group">
                        <span className="text-[10px] md:text-sm font-bold text-zinc-500">Dr. Aishat Abiodun</span>
                    </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 bg-zinc-800/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl z-20">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={cn("p-2 md:p-4 rounded-full transition-all", isMuted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20")}
                    >
                        {isMuted ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
                    </button>
                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={cn("p-2 md:p-4 rounded-full transition-all", isVideoOff ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20")}
                    >
                        {isVideoOff ? <VideoOff className="w-5 h-5 md:w-6 md:h-6" /> : <Video className="w-5 h-5 md:w-6 md:h-6" />}
                    </button>
                    <button className="p-2 md:p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all">
                        <PhoneOff className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <div className="w-px h-6 md:h-8 bg-white/10 mx-1 md:mx-2" />
                    <button className="hidden sm:block p-2 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                        <Settings className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button className="p-2 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                        <Maximize className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Live Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-red-500/10 border border-red-500/20 rounded-full z-20">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-vibrant-pulse" />
                    <span className="text-[8px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest">Live: 14:02</span>
                </div>
            </div>

            {/* Right: Side-Car Note Editor */}
            <div className="w-full lg:w-[450px] bg-card border-t lg:border-t-0 lg:border-l border-border flex flex-col h-[60vh] lg:h-full">
                <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs md:text-sm">Session Note</h4>
                            <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-widest">Encounter #4492</p>
                        </div>
                    </div>
                    <AnimatePresence>
                        {noteStatus === 'signed' ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-[10px] md:text-xs font-bold border border-green-500/20"
                            >
                                <Lock className="w-3 h-3" />
                                SIGNED
                            </motion.div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-orange-500/10 text-orange-500 rounded-lg text-[10px] md:text-xs font-bold border border-orange-500/20">
                                <Edit3 className="w-3 h-3" />
                                DRAFT
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
                    {/* Auto-populate highlight */}
                    {isAutoPopulating && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3"
                        >
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
                            <p className="text-[10px] md:text-xs text-primary font-medium italic">Vibrant AI: Auto-populating session metadata...</p>
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Encouter Content</label>
                        <textarea
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            disabled={noteStatus === 'signed'}
                            className="w-full h-64 lg:h-96 bg-transparent border-none focus:ring-0 text-sm leading-relaxed resize-none p-0 placeholder:text-zinc-700"
                            placeholder="Start typing your clinical notes..."
                        />
                    </div>

                    <div className="pt-4 border-t border-border space-y-4">
                        <div className="flex items-center justify-between text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <span>Compliance Check</span>
                            <span className="text-green-500">Passed</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-full h-1 bg-green-500/20 rounded-full overflow-hidden">
                                <div className="w-[100%] h-full bg-green-500" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6 border-t border-border bg-card">
                    {noteStatus === 'draft' ? (
                        <button
                            onClick={handleSign}
                            className="w-full py-3 md:py-4 bg-primary text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group text-sm md:text-base"
                        >
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                            Sign & Lock Note
                            <motion.div
                                className="ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 opacity-50" />
                            </motion.div>
                        </button>
                    ) : (
                        <div className="w-full py-3 md:py-4 bg-zinc-800 text-zinc-500 font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed text-sm md:text-base">
                            <Lock className="w-4 h-4 md:w-5 md:h-5" />
                            Note Locked
                        </div>
                    )}
                    <p className="text-[8px] md:text-[10px] text-center text-muted-foreground mt-3 md:mt-4 italic">
                        Signing will encrypt this record and create an immutable audit trail event.
                    </p>
                </div>
            </div>
        </div>
    );
}
