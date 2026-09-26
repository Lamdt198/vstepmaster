import { useState, useEffect } from 'react';

export interface AdaptiveGridConfig {
  cols: number;
  rows: number;
  itemsPerPage: number;
}

export function useAdaptiveGrid(): AdaptiveGridConfig {
  const [config, setConfig] = useState<AdaptiveGridConfig>(() => {
    if (typeof window === 'undefined') {
      return { cols: 4, rows: 2, itemsPerPage: 8 };
    }
    return calculateGrid(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    let timeoutId: any = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setConfig(calculateGrid(window.innerWidth, window.innerHeight));
      }, 50);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return config;
}

function calculateGrid(width: number, height: number): AdaptiveGridConfig {
  // Mobile / Small Tablet (< 640px)
  if (width < 640) {
    const rows = height < 600 ? 2 : 3;
    return { cols: 1, rows, itemsPerPage: rows };
  }

  // Tablet (640px - 1023px)
  if (width < 1024) {
    const rows = height < 650 ? 2 : 3;
    return { cols: 2, rows, itemsPerPage: 2 * rows };
  }

  // Desktop (>= 1024px)
  // Available height for cards grid:
  // window height minus header, padding, toolbar, banner, bottom dock, footer (~230px)
  const availableGridHeight = height - 230;

  // Determine rows based on available height:
  // Each card needs at least ~170px of height to be comfortable.
  let rows = 2;
  if (availableGridHeight >= 530) {
    rows = 3;
  } else if (availableGridHeight < 320) {
    rows = 1;
  }

  // Determine columns based on available width (desktop width minus sidebar 224px and padding 48px):
  const availableWidth = width - 272;
  let cols = 4;
  if (availableWidth >= 1650) {
    cols = 5; // Ultra-wide / 1440p+
  } else if (availableWidth < 950) {
    cols = 3; // Smaller desktop / narrow window
  } else {
    cols = 4; // Standard 1080p desktop / laptop
  }

  return {
    cols,
    rows,
    itemsPerPage: cols * rows,
  };
}
