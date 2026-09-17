import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures that whenever the page reloads or the route changes,
 * the scroll position is automatically reset to top 0 (X: 0, Y: 0).
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent browser from restoring previous scroll position on page reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll window to top (0, 0) instantly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Reset scroll on scrollable panels (e.g. full-split layout form panel)
    const scrollPanels = document.querySelectorAll('.auth-full-split-form-panel, .auth-layout-container');
    scrollPanels.forEach((panel) => {
      if (panel) {
        panel.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
