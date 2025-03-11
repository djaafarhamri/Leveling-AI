'use client';

import { useEffect } from 'react';
import { useTheme } from './theme-provider';

// This component preloads theme assets based on the current theme
export function ThemeAssets() {
  const { theme } = useTheme();

  useEffect(() => {
    // Preload assets for the current theme
    const preloadAssets = () => {
      const assets = [];

      switch (theme) {
        case 'elden-ring':
          assets.push('/elden-ring-bg.jpg', '/elden-ring-border.png', '/elden-ring-texture.png');
          break;
        case 'league':
          assets.push('/league-bg.jpg', '/league-border.png', '/league-texture.png');
          break;
        case 'wow':
          assets.push(
            '/wow-bg.jpg',
            '/wow-border.png',
            '/wow-texture.png',
            '/wow-button-border.png'
          );
          break;
        default:
          // No assets to preload for default theme
          break;
      }

      // Create preload links
      assets.forEach((asset) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset;
        link.as = asset.endsWith('.jpg') ? 'image' : 'image';
        document.head.appendChild(link);
      });
    };

    preloadAssets();
  }, [theme]);

  return null; // This component doesn't render anything
}
