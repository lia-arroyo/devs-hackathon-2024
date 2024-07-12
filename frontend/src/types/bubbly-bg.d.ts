declare module 'bubbly-bg' {
  interface BubblyOptions {
    colorStart?: string;
    colorStop?: string;
    blur?: number;
    compose?: string;
    bubbles?: number;
    velocityFunc?: () => number;
    radiusFunc?: () => number;
    bubbleFunc?: () => string;
  }

  function bubbly(options?: BubblyOptions): void;

  export { bubbly };
}
