'use client'
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import PartnerNavbar from './PartnerNavbar';

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        {/* <PartnerNavbar /> */}
        <main className="flex-grow container mx-auto py-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
