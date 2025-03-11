'use client';

import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Home, User, Trophy, Settings, Menu, X, LogOut, Map } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from './theme-provider';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: User, label: 'Character', path: '/character' },
    { icon: Trophy, label: 'Challenges', path: '/challenges' },
    // { icon: Map, label: "World", path: "/world" },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0 sidebar',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1
            className={cn(
              'text-xl font-bold text-primary font-display',
              theme === 'elden-ring'
                ? 'elden-ring-text-glow'
                : theme === 'league'
                  ? 'league-text-glow'
                  : theme === 'wow'
                    ? 'wow-text-glow'
                    : ''
            )}
          >
            RPG Growth
          </h1>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors sidebar-nav-item',
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground active'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isMobile && open && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
