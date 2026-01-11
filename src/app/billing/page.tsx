'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Receipt,
    Send,
    CheckCircle2,
    Clock,
    ExternalLink,
    DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDemo } from '@/context/DemoContext';

export default function BillingPage() {
    const { billingStatus, generateInvoice } = useDemo();

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-400/10 rounded-2xl">
                        <CreditCard className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Patient Billing</h2>
                        <p className="text-muted-foreground text-sm">Patient: John Doe • Self-Pay Account</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Main Invoice Card */}
                <div className="lg:col-span-2 glass rounded-2xl md:rounded-3xl border border-border overflow-hidden order-2 lg:order-1">
                    <div className="p-6 md:p-8 border-b border-border bg-white/5">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Invoice ID</p>
                                <h3 className="text-base md:text-lg font-bold">VOS-2024-001</h3>
                            </div>
                            <div className="shrink-0">
                                {billingStatus === 'paid' ? (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-full text-[10px] md:text-xs font-bold shadow-lg shadow-green-500/20">
                                        <CheckCircle2 className="w-4 h-4" />
                                        PAID
                                    </div>
                                ) : billingStatus === 'invoice_sent' ? (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-full text-[10px] md:text-xs font-bold shadow-lg shadow-blue-500/20">
                                        <Clock className="w-4 h-4" />
                                        INVOICE SENT
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-400/20 text-orange-400 border border-orange-400/20 rounded-full text-[10px] md:text-xs font-bold">
                                        PENDING BILLING
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-xs md:text-sm py-2 border-b border-white/5 gap-4">
                                <span className="text-muted-foreground truncate">Service: Psychotherapy (90837)</span>
                                <span className="font-bold shrink-0">$175.00</span>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm py-2 border-b border-white/5 gap-4">
                                <span className="text-muted-foreground">Service Date</span>
                                <span className="font-bold shrink-0">Jan 11, 2024</span>
                            </div>
                            <div className="flex justify-between text-base md:text-lg py-4">
                                <span className="font-bold">Total Due</span>
                                <span className="font-bold text-primary">$175.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-zinc-900/50">
                        {billingStatus === 'unbilled' ? (
                            <button
                                onClick={generateInvoice}
                                className="w-full py-3 md:py-4 bg-primary text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm md:text-base"
                            >
                                <Send className="w-5 h-5 text-sm" />
                                Generate & Send Invoice
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold truncate">Checkout Link Generated</p>
                                            <p className="text-[10px] md:text-xs text-muted-foreground truncate">Sent via secure email & SMS</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                                </div>
                                {billingStatus === 'paid' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl md:rounded-2xl flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <p className="text-xs md:text-sm text-green-500 font-bold italic">Payment successfully tokenized via Stripe.</p>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment History / Cards */}
                <div className="space-y-6 order-1 lg:order-2">
                    <div className="p-6 glass rounded-2xl md:rounded-3xl border border-border">
                        <h4 className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Payment Method</h4>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white shrink-0">VISA</div>
                                <div>
                                    <p className="text-xs font-bold text-white">•••• 4242</p>
                                    <p className="text-[10px] text-muted-foreground">Expires 12/26</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Recent Invoices</h4>
                        <div className="space-y-3">
                            {[
                                { id: 'VOS-2023-098', date: 'Dec 15', status: 'PAID' },
                                { id: 'VOS-2023-094', date: 'Nov 28', status: 'PAID' },
                            ].map((inv) => (
                                <div key={inv.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer gap-2">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Receipt className="w-4 h-4 text-muted-foreground shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs md:text-sm font-bold truncate">{inv.id}</p>
                                            <p className="text-[10px] text-muted-foreground whitespace-nowrap">{inv.date} • $175.00</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-green-500 shrink-0">{inv.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
