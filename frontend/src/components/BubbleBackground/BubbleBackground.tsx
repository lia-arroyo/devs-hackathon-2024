import { useEffect } from 'react';

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.body.appendChild(script);
  });
};

const BubblyBackground = () => {
  useEffect(() => {
    const loadBubbly = async () => {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/bubbly-bg@1.0.0/dist/bubbly-bg.js');
        if (window.bubbly) {
          window.bubbly({
            colorStart: '#c4cbd4',
            colorStop: '#3b6a8c',
            blur: 1,
            compose: 'source-over',
            bubbles: 100,
            velocityFunc: () => Math.random() * 0.15,
            radiusFunc: () => 4 + Math.random() * 40,
            bubbleFunc: () => `rgba(115, 149, 165, ${Math.random() * 0.2})`,
          });
        }
      } catch (error) {
        console.error('Failed to load bubbly-bg script:', error);
      }
    };

    loadBubbly();
  }, []);

  return null;
};

export default BubblyBackground;
