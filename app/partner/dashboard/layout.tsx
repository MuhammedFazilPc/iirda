import React from 'react';
// import DashNav from './DashboardNavbar';


export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <DashNav/> */}
      
      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>
      
    </div>
  );
}