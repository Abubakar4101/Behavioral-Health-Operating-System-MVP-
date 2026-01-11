'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  AlertCircle,
  Clock,
  Video,
  ChevronRight,
  TrendingDown,
  FileText,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDemo } from '@/context/DemoContext';
import Link from 'next/link';

export default function Dashboard() {
  const { auditLog } = useDemo();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Morning, Dr. Aishat.</h2>
          <p className="text-muted-foreground mt-1 text-base md:text-lg">You have 6 sessions today. 1 require immediate attention.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl flex items-center gap-2 text-primary font-medium text-sm md:text-base w-full md:w-auto">
          <Clock className="w-4 h-4" />
          <span>2:00 PM Next Session: John Doe</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Action Required Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 border border-border flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-lg">Action Required</h3>
            </div>
            <span className="bg-red-400/10 text-red-400 text-xs px-2 py-1 rounded-full font-bold">2 Items</span>
          </div>

          <div className="space-y-3">
            <Link href="/patient/1/encounters" className="block group">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-primary/50 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Unsigned Note</p>
                    <p className="text-xs text-muted-foreground">John Doe • 10:00 AM Session</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>

            <Link href="/patient/1/assessments" className="block group">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-primary/50 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">PHQ-9 Assessment</p>
                    <p className="text-xs text-muted-foreground">Waiting for review</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Clinical To-Do List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 border border-border flex flex-col gap-4 col-span-1 lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Clinical To-Do List</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Session Widget */}
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 relative overflow-hidden group">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-tighter border border-green-500/20">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-vibrant-pulse"></span>
                Live Now
              </div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Telehealth Session</p>
              <h4 className="text-xl font-bold">John Doe</h4>
              <p className="text-sm text-muted-foreground mb-4">Generalized Anxiety • 60-min intake</p>

              <Link href="/session" className="flex items-center justify-center w-full bg-primary text-white font-bold py-3 rounded-xl gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <Video className="w-5 h-5" />
                Join Video Session
              </Link>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Completed Today</h5>
              {[
                { name: 'Alice Smith', type: 'Follow-up', time: '11:00 AM' },
                { name: 'Bob Johnson', type: 'Medication Management', time: '9:00 AM' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <UserCheck className="w-4 h-4 text-green-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{item.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground font-medium shrink-0 whitespace-nowrap ml-2">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Audit Feed (Sneak Peak) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Recent System Events</h4>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-8 px-8">
          {auditLog.slice(0, 3).map((event) => (
            <div key={event.id} className="min-w-[280px] md:min-w-[300px] p-3 rounded-lg border border-border bg-card/50 text-[10px] flex items-center justify-between shrink-0">
              <div className="min-w-0 flex-1">
                <span className="text-primary font-bold mr-2 uppercase">{event.action}</span>
                <span className="text-muted-foreground truncate block md:inline">{event.details}</span>
              </div>
              <span className="text-muted-foreground ml-4 shrink-0">{event.timestamp}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
