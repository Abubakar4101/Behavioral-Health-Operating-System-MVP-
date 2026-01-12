'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    FileSignature,
    ShieldCheck,
    History,
    FileText,
    Download,
    CheckCircle2,
    AlertCircle,
    Clock,
    UserCheck,
    Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const consentHistory = [
    { title: "HIPAA Privacy Practices v4.1", signed: "2024-01-10", status: "current", hash: "sha256:7f00...af6e" },
    { title: "Telehealth Informed Consent v2.0", signed: "2024-01-10", status: "current", hash: "sha256:3d11...b42f" },
    { title: "Release of Information (ROI) - General", signed: "2023-11-12", status: "expired", hash: "sha256:9c1b...cf7d" },
];

const globalCompliance = [
    { label: 'Clinic-Wide Consent', value: '98.2%', detail: '2 patients pending' },
    { label: 'Revocation Events', value: '0', detail: 'Last 30 days' },
    { label: 'Audit Readiness', value: 'CERTIFIED', detail: 'HIPAA/SOC2 compliant' },
];

export default function LegalVaultPage() {
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
                            <FileSignature className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Legal & Consent Vault</h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">Immutable Record Storage • v1.08 Sentinel</p>
                </div>

                <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-white/5 rounded-2xl">
                    <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 transition-all">
                        Active Profile
                    </button>
                    <button className="px-4 py-2 text-zinc-500 text-xs font-bold hover:text-white transition-all">
                        Global Statistics
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {globalCompliance.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-2"
                    >
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        <p className="text-xl font-bold tracking-tight text-white">{stat.value}</p>
                        <p className="text-[10px] font-medium text-primary/70">{stat.detail}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Signed Patient Documents
                    </h3>

                    <div className="space-y-4">
                        {consentHistory.map((doc, idx) => (
                            <motion.div
                                key={doc.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-card border border-border p-5 rounded-[24px] hover:border-primary/30 transition-all flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-3 rounded-2xl",
                                        doc.status === 'current' ? "bg-green-500/10 text-green-500" : "bg-zinc-800 text-zinc-500"
                                    )}>
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm md:text-base">{doc.title}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Signed {doc.signed}
                                            </span>
                                            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded border border-white/5">
                                                {doc.hash}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                        doc.status === 'current' ? "bg-green-500 text-white" : "bg-zinc-800 text-zinc-500"
                                    )}>
                                        {doc.status === 'current' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                        {doc.status}
                                    </div>
                                    <button className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all text-zinc-400 hover:text-white">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-6 rounded-[32px] bg-red-500/5 border border-red-500/10 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-red-500 text-sm">Action Required: Expired ROI</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                The ROI for **John Doe** has reached its 365-day retention limit. The system has automatically restricted chart access for external parties until a new electronic signature is captured.
                            </p>
                            <button className="mt-3 px-4 py-2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-600 transition-all">
                                Update Consent Flow
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Security Protocols
                    </h3>
                    <div className="glass rounded-[32px] p-6 border border-border space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-widest">Gating Enforcement</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Access to sensitive behavioral charts is **temporarily gated** until the mandatory HIPAA Acknowledgement is signed.
                            </p>
                            <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Enforced</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 space-y-3">
                            <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                                <History className="w-4 h-4" />
                                Version Control
                            </div>
                            <p className="text-[11px] text-zinc-400 font-medium">
                                Ventally maintains an immutable trail of every consent version ever presented to a patient, ensuring legislative compliance across all jurisdictions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
