'use client';

import React from 'react';
import { useTheme } from './theme-provider';

// This component creates placeholder SVGs for theme assets
export function ThemePlaceholder() {
  const { theme } = useTheme();

  // Create placeholder SVGs for each theme
  React.useEffect(() => {
    // Create a function to generate SVG data URLs
    const createSVG = (color: string, pattern: string) => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <rect width="100%" height="100%" fill="${color}" />
          ${pattern}
        </svg>
      `;
      return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    // Create placeholder images for each theme
    const createPlaceholders = () => {
      // Elden Ring placeholders
      const eldenRingBg = createSVG(
        '#1a1306',
        '<path d="M0 0 L100 100 M0 100 L100 0" stroke="#3a2a06" strokeWidth="1" />'
      );
      const eldenRingBorder = createSVG(
        '#8a6e27',
        '<rect x="10" y="10" width="80" height="80" fill="none" stroke="#c8a030" strokeWidth="4" />'
      );
      const eldenRingTexture = createSVG(
        '#000000',
        '<circle cx="50" cy="50" r="40" fill="none" stroke="#8a6e27" strokeWidth="2" />'
      );

      // League of Legends placeholders
      const leagueBg = createSVG(
        '#0a1a2a',
        '<path d="M20 20 L80 80 M20 80 L80 20" stroke="#0095ff" strokeWidth="1" />'
      );
      const leagueBorder = createSVG(
        '#0a1a2a',
        '<polygon points="10,10 90,10 80,90 20,90" fill="none" stroke="#0095ff" strokeWidth="2" />'
      );
      const leagueTexture = createSVG(
        '#000000',
        '<rect x="25" y="25" width="50" height="50" fill="none" stroke="#0095ff" strokeWidth="1" />'
      );

      // World of Warcraft placeholders
      const wowBg = createSVG(
        '#0a1a30',
        '<rect x="25" y="25" width="50" height="50" fill="none" stroke="#c8a030" strokeWidth="2" />'
      );
      const wowBorder = createSVG(
        '#0a1a30',
        '<rect x="10" y="10" width="80" height="80" fill="none" stroke="#c8a030" strokeWidth="4" rx="10" ry="10" />'
      );
      const wowTexture = createSVG(
        '#000000',
        '<circle cx="50" cy="50" r="30" fill="none" stroke="#c8a030" strokeWidth="2" />'
      );
      const wowButtonBorder = createSVG(
        '#0a1a30',
        '<rect x="20" y="20" width="60" height="60" fill="none" stroke="#c8a030" strokeWidth="4" rx="5" ry="5" />'
      );

      // Create style element to inject CSS with the placeholder images
      const style = document.createElement('style');
      style.textContent = `
        /* Elden Ring placeholders */
        .elden-ring { background-image: url('${eldenRingBg}') !important; }
        .elden-ring-card { border-image: url('${eldenRingBorder}') 24 stretch !important; }
        .elden-ring-card::before { background-image: url('${eldenRingTexture}') !important; }
        
        /* League of Legends placeholders */
        .league { background-image: url('${leagueBg}') !important; }
        .league-card { border-image: url('${leagueBorder}') 30 stretch !important; }
        .league-card::before { background-image: url('${leagueTexture}') !important; }
        
        /* World of Warcraft placeholders */
        .wow { background-image: url('${wowBg}') !important; }
        .wow-card { border-image: url('${wowBorder}') 30 stretch !important; }
        .wow-card::before { background-image: url('${wowTexture}') !important; }
        .wow-button::before { background-image: url('${wowButtonBorder}') !important; }
      `;

      // Add the style element to the head
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    };

    // Create placeholders
    const cleanup = createPlaceholders();

    return cleanup;
  }, [theme]);

  return null; // This component doesn't render anything
}
