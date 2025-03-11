'use client';

import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { ThemeSwitcher } from './theme-switcher';

export default function Layout() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Ensure sidebar is always open on desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main
        className={`flex-1 overflow-auto p-6 transition-all duration-200 ${!isMobile ? 'ml-64' : ''}`}
      >
        <div className="flex justify-end mb-4">
          <ThemeSwitcher />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
