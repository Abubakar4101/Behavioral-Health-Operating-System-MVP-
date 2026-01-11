'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function SchedulePage() {
    return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center border border-border">
                <CalendarIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
                <h2 className="text-2xl font-bold">Clinical Calendar</h2>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                    Your schedule is optimized for today. All 8 slots are managed by Vibrant's auto-scheduling engine.
                </p>
            </div>
            <div className="flex gap-4">
                <div className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-bold border border-primary/20">
                    View Tomorrow
                </div>
            </div>
        </div>
    );
}
