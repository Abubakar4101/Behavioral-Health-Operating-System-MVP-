'use client';

import React from 'react';
import { Users, Search, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PatientsPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-2xl">
                        <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold">Patient Directory</h2>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Patient
                </button>
            </div>

            <div className="glass rounded-3xl border border-border p-8 text-center space-y-4">
                <div className="flex justify-center">
                    <Search className="w-12 h-12 text-muted-foreground/20" />
                </div>
                <h3 className="text-lg font-bold">Find a Patient</h3>
                <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                    Search by name, DOB, or Insurance ID.
                </p>
                <Link href="/patient/1/assessments" className="inline-block text-primary font-bold hover:underline">
                    View Sample: John Doe →
                </Link>
            </div>
        </div>
    );
}
