import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent GSAP from refreshing on resize events that React's dev mode
// triggers spuriously during hot reloads and Strict Mode double-invokes.
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

export { gsap, ScrollTrigger };