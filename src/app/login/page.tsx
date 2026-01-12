'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Mail,
    ArrowRight,
    Fingerprint,
    ShieldAlert,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'login' | 'mfa' | 'success'>('login');
    const [email, setEmail] = useState('dr.abiodun@ventally.health');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('mfa');
        }, 1500);
    };

    const handleMFASubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('success');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-zinc-900 border border-white/10 p-8 rounded-[32px] shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Ventally</h1>
                        <p className="text-zinc-400 mt-2 text-sm font-medium tracking-wide">Next-Gen Clinical Workspace</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'login' && (
                            <motion.form
                                key="login-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLogin}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address"
                                            className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="password"
                                            defaultValue="password123"
                                            placeholder="Password"
                                            className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group relative overflow-hidden disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <div className="text-center">
                                    <button type="button" className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium">
                                        Forgot your password?
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {step === 'mfa' && (
                            <motion.form
                                key="mfa-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleMFASubmit}
                                className="space-y-6"
                            >
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
                                    <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-yellow-200/80 leading-relaxed font-medium">
                                        <strong className="text-yellow-500">MFA Verification Required.</strong> We've sent a one-time code to your registered mobile device ending in **4922**.
                                    </p>
                                </div>

                                <div className="flex justify-between gap-3">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            maxLength={1}
                                            className="w-12 h-14 bg-zinc-800/50 border border-white/5 rounded-xl text-center text-white text-xl font-bold focus:outline-none focus:border-primary/50"
                                            defaultValue={i % 2 === 0 ? i : ''}
                                            autoFocus={i === 1}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Verify Identity
                                            <Fingerprint className="w-5 h-5 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <div className="text-center">
                                    <button type="button" className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium">
                                        Resend code (00:45)
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success-view"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-2">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Identity Verified</h3>
                                <p className="text-zinc-500 text-sm font-medium">Estabilishing secure HIPAA session...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        Infrastructure: HIPAA COMPLIANT
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
