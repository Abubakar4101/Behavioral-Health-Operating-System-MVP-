'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    History,
    Search,
    Filter,
    Database,
    Lock,
    ChevronRight,
    User,
    Info
} from 'lucide-react';
import { useDemo } from '@/context/DemoContext';
import { cn } from '@/lib/utils';

export default function AuditLogPage() {
    const { auditLog } = useDemo();

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Immutable Audit Trail</h2>
                        <p className="text-muted-foreground text-sm flex items-center gap-2">
                            <Database className="w-3 h-3" />
                            Connected to HIPAA-Compliant Supabase Cluster • Live Monitoring
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl font-bold text-xs border border-green-500/20">
                    <Lock className="w-4 h-4" />
                    ENCRYPTED & HASHED
                </div>
            </div>

            <div className="glass rounded-2xl md:rounded-3xl border border-border overflow-hidden">
                <div className="p-4 md:p-6 border-b border-border flex flex-col md:flex-row items-start md:items-center justify-between bg-white/5 gap-4">
                    <div className="flex items-center gap-4 w-full md:flex-1">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                placeholder="Search logs..."
                                className="w-full bg-background/50 border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                        <button className="p-2 bg-accent rounded-xl text-muted-foreground border border-border">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-widest px-1">
                        {auditLog.length} Security Events
                    </div>
                </div>

                <div className="overflow-x-auto overflow-y-hidden">
                    <div className="min-w-[800px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-white/5">
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Integrity Hash</th>
                                    <th className="px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {auditLog.map((event, i) => (
                                    <motion.tr
                                        key={event.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/5 transition-all group"
                                    >
                                        <td className="px-6 py-4 text-[10px] font-mono text-muted-foreground">{event.timestamp}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                                    <User className="w-3 h-3 text-primary" />
                                                </div>
                                                <span className="text-xs font-semibold whitespace-nowrap">{event.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-tight border inline-block whitespace-nowrap",
                                                event.action === 'Login' ? "bg-blue-400/10 text-blue-400 border-blue-400/20" :
                                                    event.action === 'Sign Note' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                        event.action === 'Start Session' ? "bg-purple-400/10 text-purple-400 border-purple-400/20" :
                                                            event.action === 'Generate Invoice' ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                                                                "bg-white/10 text-white border-white/20"
                                            )}>
                                                {event.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-zinc-400 max-w-[200px] truncate">{event.details}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground bg-black/30 w-fit px-2 py-1 rounded border border-white/5">
                                                <span className="text-primary/50">sha256:</span>
                                                {Math.random().toString(36).substring(2, 8)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 hover:bg-white/10 rounded-lg transition-all text-muted-foreground hover:text-white">
                                                <Info className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {auditLog.length === 0 && (
                    <div className="p-20 text-center space-y-4">
                        <History className="w-12 h-12 text-muted-foreground/20 mx-auto" />
                        <p className="text-muted-foreground italic">Initializing secure audit history...</p>
                    </div>
                )}
            </div>

            <div className="p-4 md:p-6 bg-primary/5 rounded-2xl md:rounded-3xl border border-primary/20 flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 shrink-0" />
                <div>
                    <h4 className="font-bold text-sm md:text-base text-primary mb-1">Compliance Verification</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        BHOS implements <strong>AES-256 encryption-at-rest</strong> and <strong>TLS 1.3 in-transit</strong>. Every clinician action generates a cryptographically signed event stored in our immutable ledger, ensuring 100% audit readiness for HIPAA, SOC2, and state-level compliance requirements.
                    </p>
                </div>
            </div>
        </div>
    );
}
