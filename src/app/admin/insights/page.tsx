'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    AlertCircle,
    FileText,
    UserX,
    CalendarClock,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    ShieldAlert,
    Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

const automationInsights = [
    {
        title: "No-Show Pattern Detected",
        description: "3 patients identified with predictive high risk for today's sessions based on historical 30-day cancellation data.",
        priority: "high",
        icon: UserX,
        action: "Send SMS Reminders"
    },
    {
        title: "Auto-Drafting Complete",
        description: "5 discharge summaries have been pre-drafted based on clinical milestones. Ready for clinician review.",
        priority: "medium",
        icon: FileText,
        action: "Review Drafts"
    },
    {
        title: "Inactivity Sentinel",
        description: "12 users identified as 'Inactive' (30+ days since last touchpoint). Triggering re-engagement outreach.",
        priority: "medium",
        icon: CalendarClock,
        action: "View List"
    }
];

const pendingTasks = [
    { id: 1, task: "Sign GAD-7 Assessment for John Doe", trigger: "Completion Rule", status: "pending" },
    { id: 2, task: "Generate Billing Export for W4", trigger: "Schedule Rule", status: "pending" },
    { id: 3, task: "Review Consent Revocation (Alice Smith)", trigger: "Legal Rule", status: "urgent" },
];

export default function InsightsPage() {
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
                            <Zap className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Intelligence & Automation</h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">Ventally Engine v4.0 • Rule-Based Engine Active</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Rule Optimizer ON</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Insights Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Detected Patterns & Insights
                    </h3>
                    <div className="space-y-4">
                        {automationInsights.map((insight, idx) => (
                            <motion.div
                                key={insight.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-card border border-border p-6 rounded-[32px] hover:border-primary/30 transition-all flex gap-6"
                            >
                                <div className={cn(
                                    "p-4 rounded-[20px] shrink-0",
                                    insight.priority === 'high' ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                                )}>
                                    <insight.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-lg">{insight.title}</h4>
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-tighter",
                                            insight.priority === 'high' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-primary/10 text-primary border-primary/20"
                                        )}>
                                            {insight.priority} Priority
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                                    <button className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all pt-2">
                                        {insight.action}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Automation Queue */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Automation Queue
                    </h3>
                    <div className="glass rounded-[32px] p-6 border border-border space-y-4">
                        {pendingTasks.map((task) => (
                            <div key={task.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{task.trigger}</span>
                                    {task.status === 'urgent' && <ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
                                </div>
                                <p className="text-xs font-bold leading-tight">{task.task}</p>
                                <button className="text-[10px] font-bold text-primary hover:underline">Process Now</button>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 rounded-[32px] bg-primary/10 border border-primary/20 space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                            <Zap className="w-4 h-4" />
                            Efficiency Score: 98.4%
                        </div>
                        <p className="text-[12px] text-muted-foreground font-medium leading-relaxed">
                            A-IQ engine has reduced documentation lag by **4.2 hours** per clinician this week via pattern-based drafting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
