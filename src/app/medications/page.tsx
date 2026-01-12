'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Plus,
    Pill,
    AlertTriangle,
    History,
    TrendingUp,
    CheckCircle2,
    Calendar,
    Clock,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const medsData = [
    { name: 'Sertraline (Zoloft)', dosage: '50mg', frequency: 'Daily (AM)', status: 'active', startDate: '2023-11-12', notes: 'Maintain dosage, monitoring for GI side effects.' },
    { name: 'Lorazepam (Ativan)', dosage: '0.5mg', frequency: 'PRN (As Needed)', status: 'active', startDate: '2024-01-05', notes: 'Max 2 doses per 24 hours.' },
    { name: 'Melatonin', dosage: '5mg', frequency: 'Bedtime', status: 'discontinued', startDate: '2023-09-01', notes: 'Ineffective for primary insomnia.' },
];

const symptomHistory = [
    { date: 'Jan 10', severity: 8, label: 'Acute Anxiety' },
    { date: 'Jan 11', severity: 6, label: 'Post-medication stabilization' },
    { date: 'Jan 12', severity: 3, label: 'Mild baseline' },
    { date: 'Today', severity: 2, label: 'Near-asymptomatic' },
];

export default function MTSPage() {
    const [searchTerm, setSearchTerm] = useState('');

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
                            <Activity className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Medication Tracking (MTS)</h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">MTS v2.4 • Independent Service Active</p>
                </div>

                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                    <Plus className="w-5 h-5" />
                    New Prescription
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Med List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-4"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search patient medications..."
                                className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Filter:</span>
                            <select className="bg-transparent text-xs font-bold text-primary focus:outline-none cursor-pointer">
                                <option>Active Only</option>
                                <option>All Statuses</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {medsData.map((med, idx) => (
                            <motion.div
                                key={med.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={cn(
                                    "p-6 rounded-[24px] border border-border bg-card hover:border-primary/30 transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden",
                                    med.status === 'discontinued' && "opacity-60 grayscale"
                                )}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={cn(
                                        "p-3 rounded-2xl",
                                        med.status === 'active' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                    )}>
                                        <Pill className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{med.name}</h4>
                                        <p className="text-sm font-bold text-muted-foreground">{med.dosage} • {med.frequency}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:items-end justify-center gap-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                        <span className="text-[11px] font-medium text-muted-foreground">Started {med.startDate}</span>
                                    </div>
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                        med.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {med.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Insights & Guardrails */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="glass rounded-[32px] p-8 border border-border space-y-6">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Symptom Efficacy
                        </h3>
                        <div className="space-y-6">
                            {symptomHistory.map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-muted-foreground">{item.date} • {item.label}</span>
                                        <span className="text-xs font-bold text-primary">Severity {item.severity}/10</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.severity / 10) * 100}%` }}
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                item.severity > 7 ? "bg-red-500" : item.severity > 4 ? "bg-yellow-500" : "bg-green-500"
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-950/20 border border-red-500/20 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px]">
                            <AlertTriangle className="w-4 h-4 animate-vibrant-pulse" />
                            Safety Guardrail (MTS-Active)
                        </div>
                        <p className="text-[12px] text-red-200/70 font-medium leading-relaxed">
                            Potentially high **Lorazepam** consumption detected.
                            Current PRN usage exceeds baseline by 20% in the last 72 hours.
                        </p>
                        <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold py-3 rounded-xl text-xs transition-all border border-red-500/30">
                            Review Medication Logic
                        </button>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-3">
                            <History className="w-4 h-4" />
                            Compliance Trace
                        </div>
                        <p className="text-[11px] text-muted-foreground font-medium italic">
                            All script adjustments are cryptographically signed and hashed in the MT-Ledger.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
