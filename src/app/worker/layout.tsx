'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/dashboards/Sidebar';

export default function WorkerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-10rem)]">
        <DashboardSidebar role="worker" />
        <main className="flex-1 min-w-0 bg-transparent">{children}</main>
      </div>
    </div>
  );
}

