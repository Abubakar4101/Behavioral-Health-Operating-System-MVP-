'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Key,
    Smartphone,
    History,
    Activity,
    Globe,
    Cpu,
    CheckCircle2,
    ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';

const securityMetrics = [
    { label: 'Encryption at Rest', value: 'AES-256-GCM', status: 'secure', icon: Lock },
    { label: 'SSL/TLS Version', value: 'TLS 1.3 (Strict)', status: 'secure', icon: Globe },
    { label: 'Active Sessions', value: '14 Active', status: 'secure', icon: Activity },
    { label: 'MFA Enforcement', value: 'Enabled (Global)', status: 'secure', icon: Smartphone },
];

const auditTrail = [
    { event: 'Root Access Attempt', user: 'System', time: '2 mins ago', status: 'blocked', result: 'Unauthorized Origin' },
    { event: 'Database Backup', user: 'Automated', time: '1 hour ago', status: 'success', result: 'Encrypted S3' },
    { event: 'Clinician Login', user: 'Dr. Abiodun', time: '4 hours ago', status: 'success', result: 'MFA Verified' },
    { event: 'Token Refresh', user: 'Client App', time: '6 hours ago', status: 'success', result: 'JWT Rotated' },
];

export default function SecurityCenterPage() {
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
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Security Center</h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">Global Infrastructure & Compliance Monitoring</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest">HIPAA Ready</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {securityMetrics.map((metric, idx) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-4 group hover:border-primary/30 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="p-2 bg-primary/5 rounded-lg group-hover:scale-110 transition-transform">
                                <metric.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold text-green-500">SECURE</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</p>
                            <p className="text-lg font-bold mt-1 tracking-tight">{metric.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <History className="w-5 h-5 text-primary" />
                            Security Event Ledger
                        </h3>
                        <button className="text-xs font-bold text-primary hover:underline">Download Audit CSV</button>
                    </div>

                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Event</th>
                                    <th className="px-6 py-4">Context / User</th>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4 text-right">Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {auditTrail.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-foreground">{log.event}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{log.user}</td>
                                        <td className="px-6 py-4 text-muted-foreground text-[12px]">{log.time}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-full border",
                                                log.status === 'success' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                {log.result}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        Compliance Rules
                    </h3>
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Session Timeout</span>
                                <span className="text-xs font-bold italic">Configured</span>
                            </div>
                            <p className="text-sm font-medium">45 Minutes of Inactivity</p>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-primary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">JWT Rotation</span>
                                <span className="text-xs font-bold italic">Enforced</span>
                            </div>
                            <p className="text-sm font-medium">Automated every 15 mins</p>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-primary" />
                            </div>
                        </div>

                        <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                                <ShieldAlert className="w-3 h-3" />
                                Infrastructure Alert
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed">
                                System is strictly monitoring for **unusual export patterns** and chart-view spikes. Any violation will trigger an immediate **Credential Invalidation**.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
