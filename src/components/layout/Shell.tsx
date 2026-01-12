'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Users,
    CreditCard,
    ShieldCheck,
    Settings,
    LogOut,
    Bell,
    Menu,
    X,
    ShieldAlert,
    Activity,
    Zap,
    FileSignature,
    TrendingUp,
    Construction
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Medications', icon: Activity, href: '/medications' },
    { name: 'Schedule', icon: Calendar, href: '/schedule' },
    { name: 'Patients', icon: Users, href: '/patients' },
    { name: 'Billing', icon: CreditCard, href: '/billing' },
    { name: 'Insights', icon: Zap, href: '/admin/insights' },
    { name: 'Legal Vault', icon: FileSignature, href: '/admin/legal' },
    { name: 'Security', icon: ShieldAlert, href: '/admin/security' },
    { name: 'Audit Log', icon: ShieldCheck, href: '/admin/audit' },
];

export function Sidebar({ className, onItemClick }: { className?: string, onItemClick?: () => void }) {
    const pathname = usePathname();

    return (
        <div className={cn("w-64 h-full bg-card border-r border-border flex flex-col", className)}>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary tracking-tight">Ventally</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Clinical Workspace</p>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onItemClick}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </div>
            </div>
        </div>
    );
}

export function Shell({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex bg-background h-screen overflow-hidden">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex" />

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto bg-background/50">
                    {children}
                </main>
            </div>
        </div>
    );
}

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const notifications = [
        { id: 1, title: 'New Consent Signed', time: '2m ago', type: 'legal' },
        { id: 2, title: 'No-Show Risk Alert', time: '15m ago', type: 'insight' },
        { id: 3, title: 'Billing Generated', time: '1h ago', type: 'billing' },
    ];

    return (
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-muted-foreground hover:text-foreground lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-primary font-bold text-sm">AA</span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold whitespace-nowrap">Dr. Aishat Abiodun</p>
                        <p className="text-xs text-muted-foreground">Clinical Admin</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4 relative">
                <div
                    className="relative p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
                </div>

                <AnimatePresence>
                    {isNotifOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-sm">Notifications</h4>
                                <span className="text-[10px] font-bold text-primary uppercase cursor-pointer">Mark all as read</span>
                            </div>
                            <div className="space-y-2">
                                {notifications.map(n => (
                                    <div key={n.id} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                                        <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">{n.title}</p>
                                        <p className="text-[10px] text-zinc-500 mt-1">{n.time} • System Alert</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="px-3 py-1 bg-green-500/10 rounded-full text-[10px] lg:text-xs font-bold text-green-500 border border-green-500/20 whitespace-nowrap">
                    SECURE
                </div>
            </div>
        </header>
    );
}
