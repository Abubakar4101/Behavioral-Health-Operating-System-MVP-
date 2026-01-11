'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AuditEvent = {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
};

export type NoteStatus = 'draft' | 'signed';
export type BillingStatus = 'unbilled' | 'invoice_sent' | 'paid';

interface DemoContextType {
  auditLog: AuditEvent[];
  addAuditEvent: (action: string, details: string) => void;
  noteStatus: NoteStatus;
  signNote: () => void;
  billingStatus: BillingStatus;
  generateInvoice: () => void;
  sessionActive: boolean;
  startSession: () => void;
  endSession: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [auditLog, setAuditLog] = useState<AuditEvent[]>([]);
  const [noteStatus, setNoteStatus] = useState<NoteStatus>('draft');
  const [billingStatus, setBillingStatus] = useState<BillingStatus>('unbilled');
  const [sessionActive, setSessionActive] = useState(false);

  const addAuditEvent = (action: string, details: string) => {
    const newEvent: AuditEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      action,
      user: 'Dr. Aishat Abiodun',
      details,
    };
    setAuditLog((prev) => [newEvent, ...prev]);
  };

  const signNote = () => {
    setNoteStatus('signed');
    addAuditEvent('Sign Note', 'Session note for John Doe signed and locked.');
  };

  const generateInvoice = () => {
    setBillingStatus('invoice_sent');
    addAuditEvent('Generate Invoice', 'Invoice generated for John Doe (Self-pay).');

    // Auto-update to "paid" after 3 seconds for demo effect
    setTimeout(() => {
      setBillingStatus('paid');
      addAuditEvent('Payment Received', 'Stripe payment confirmed for John Doe.');
    }, 3000);
  };

  const startSession = () => {
    setSessionActive(true);
    addAuditEvent('Start Session', 'Telehealth session started with John Doe.');
  };

  const endSession = () => {
    setSessionActive(false);
    addAuditEvent('End Session', 'Telehealth session ended.');
  };

  // Initial log on mount
  useEffect(() => {
    if (auditLog.length === 0) {
      addAuditEvent('Login', 'Dr. Aishat Abiodun logged into the Clinician Dashboard.');
    }
  }, []);

  return (
    <DemoContext.Provider
      value={{
        auditLog,
        addAuditEvent,
        noteStatus,
        signNote,
        billingStatus,
        generateInvoice,
        sessionActive,
        startSession,
        endSession,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
