'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingDown,
    TrendingUp,
    Calendar,
    ChevronRight,
    ClipboardCheck,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const assessmentData = [
    { date: 'Oct 12', score: 18, level: 'Severe' },
    { date: 'Nov 05', score: 15, level: 'Mod-Severe' },
    { date: 'Nov 28', score: 14, level: 'Moderate' },
    { date: 'Dec 15', score: 12, level: 'Moderate' },
    { date: 'Jan 11', score: 9, level: 'Mild' },
];

export default function AssessmentsPage() {
    const maxScore = 21;

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-400/10 rounded-2xl">
                        <TrendingDown className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">GAD-7 Progress Tracking</h2>
                        <p className="text-muted-foreground text-sm">Patient: John Doe • Cognitive Behavioral Therapy Path</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all">
                    <Plus className="w-4 h-4" />
                    New Assessment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trend Line Visualizer */}
                <div className="lg:col-span-2 glass rounded-3xl border border-border p-8 flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Trend Analysis</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-400" />
                                <span className="text-xs text-muted-foreground">GAD-7 Score</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-64 flex items-end justify-between px-4 pb-8 border-b border-white/5">
                        {assessmentData.map((d, i) => (
                            <div key={d.date} className="relative group flex flex-col items-center gap-4 flex-1">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.score / maxScore) * 100}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="w-12 bg-gradient-to-t from-blue-400/20 to-blue-400 rounded-lg relative"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-blue-400 text-sm">
                                        {d.score}
                                    </span>
                                </motion.div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{d.date}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-sm">
                            <span className="font-bold text-primary">Vibrant Insight:</span> 50% reduction in GAD-7 scores over 3 months. Symptoms have moved from <span className="text-red-400 font-bold uppercase tracking-tighter mx-1">Severe</span> to <span className="text-green-500 font-bold uppercase tracking-tighter mx-1">Mild</span>.
                        </p>
                    </div>
                </div>

                {/* History List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Assessment History</h3>
                    <div className="space-y-3">
                        {assessmentData.slice().reverse().map((item) => (
                            <div key={item.date} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-400/10 rounded-lg">
                                        <ClipboardCheck className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{item.date}</p>
                                        <p className="text-[10px] text-muted-foreground">Score: {item.score} • {item.level}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
