'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Target,
    Users,
    MousePointer2,
    Zap,
    Heart,
    Shield,
    Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const scorecardData = [
    {
        category: "1. Visibility & Reach (Top of Funnel)",
        goal: "Are people seeing Ventally organically?",
        metrics: [
            { label: "Daily comment impressions", target: "+10–20% weekly", status: "pass" },
            { label: "Post appearance gain", target: "≥50% of threads", status: "pass" },
            { label: "Platform warnings", target: "0 warnings", status: "pass" }
        ],
        result: "pass"
    },
    {
        category: "2. Engagement Quality (Signal Strength)",
        goal: "Are people reacting emotionally?",
        metrics: [
            { label: "Reply rate", target: "≥1 reply per 3 mentions", status: "pass" },
            { label: "Thread depth", target: "≥30% with 10+ replies", status: "watch" },
            { label: "Emotional language", target: "Consistent usage", status: "pass" }
        ],
        result: "pass"
    },
    {
        category: "3. Curiosity & Click Intent",
        goal: "Are people taking the next step?",
        metrics: [
            { label: "Profile visits", target: "+10% weekly", status: "pass" },
            { label: "Bio link clicks", target: "≥3–5% of visitors", status: "watch" },
            { label: "Bounce complaints", target: "Near zero", status: "pass" }
        ],
        result: "pass"
    },
    {
        category: "4. Conversion to Signup",
        goal: "Does interest turn into action?",
        metrics: [
            { label: "App downloads", target: "Consistent daily", status: "pass" },
            { label: "Signup conversion", target: "20–30%", status: "pass" },
            { label: "Drop-off documentation", target: "100% recorded", status: "pass" }
        ],
        result: "pass"
    },
    {
        category: "5. Retention & Early Use",
        goal: "Do people come back?",
        metrics: [
            { label: "7-day return rate", target: "≥25–30%", status: "watch" },
            { label: "In-app action", target: "≥50% of signups", status: "pass" },
            { label: "Confusion emails", target: "None documented", status: "pass" }
        ],
        result: "watch"
    },
    {
        category: "6. Community & Support Signals",
        goal: "Is trust forming without friction?",
        metrics: [
            { label: "SLA response time", target: "< 24 hours", status: "pass" },
            { label: "Safety complaints", target: "0 reports", status: "pass" },
            { label: "Inquiry quality", target: "Curiosity centered", status: "pass" }
        ],
        result: "pass"
    },
    {
        category: "7. Operational Stability",
        goal: "Growth is not breaking the system.",
        metrics: [
            { label: "Contractor delivery", target: "100% on checklist", status: "pass" },
            { label: "Farming volume", target: "Within caps", status: "pass" },
            { label: "App uptime", target: "99.9%", status: "pass" },
            { label: "Core functionality", target: "Payments/Calls stable", status: "pass" }
        ],
        result: "pass"
    }
];

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'pass':
            return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    Pass
                </div>
            );
        case 'watch':
            return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3" />
                    Watch
                </div>
            );
        default:
            return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <XCircle className="w-3 h-3" />
                    Fail
                </div>
            );
    }
}

export default function StrategyPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Growth Validation</h2>
                    </div>
                    <p className="text-muted-foreground text-base md:text-lg">Ventally 30-Day Scale Scorecard</p>
                </div>

                <div className="flex flex-col gap-2 p-4 glass rounded-2xl border border-primary/20">
                    <div className="flex items-center justify-between gap-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Overall Signal</span>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold uppercase tracking-tighter shadow-lg shadow-green-500/20">
                            Ready to Scale
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {scorecardData.map((section, idx) => (
                    <motion.div
                        key={section.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="glass rounded-2xl p-6 border border-border flex flex-col gap-6 group hover:border-primary/30 transition-all"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1">{section.category}</h3>
                                <p className="text-sm text-muted-foreground italic">Goal: {section.goal}</p>
                            </div>
                            <StatusBadge status={section.result} />
                        </div>

                        <div className="space-y-4">
                            {section.metrics.map((metric) => (
                                <div key={metric.label} className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-medium text-foreground">{metric.label}</span>
                                        <span className={cn(
                                            "font-bold uppercase tracking-tighter",
                                            metric.status === 'pass' ? "text-green-500" : "text-yellow-500"
                                        )}>
                                            {metric.status}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: metric.status === 'pass' ? "100%" : "75%" }}
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                metric.status === 'pass' ? "bg-green-500" : "bg-yellow-500"
                                            )}
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">Target: {metric.target}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* scale logic footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row gap-8 justify-between items-center"
                >
                    <div className="flex-1">
                        <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-2">Final 30-Day Decision Logic</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Scale decision is based on absolute dominance in Visibility, Engagement, Conversion, and Operations.
                            Current trajectory indicates a <span className="text-primary font-bold">SCALE</span> recommendation.
                        </p>
                    </div>
                    <div className="flex gap-4 shrink-0">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Scale</span>
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-green-500/20">
                                <Zap className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center opacity-30">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Adjust</span>
                            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center opacity-30">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Pause</span>
                            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                                <XCircle className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
