'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Theme, useTheme } from './theme-provider';

const themes: { id: Theme; name: string; description: string }[] = [
  {
    id: 'default',
    name: 'Professional',
    description: 'Clean, modern interface',
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    description: 'Dark fantasy aesthetic',
  },
  {
    id: 'league',
    name: 'League of Legends',
    description: 'Vibrant, arcane style',
  },
  {
    id: 'wow',
    name: 'World of Warcraft',
    description: 'Epic fantasy theme',
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between w-full md:w-40">
          {currentTheme.name}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              setTheme(t.id);
              setOpen(false);
            }}
          >
            <div>
              <p>{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
            {theme === t.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
