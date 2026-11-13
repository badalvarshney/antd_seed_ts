/**
 * Smoothly scrolls the application back to the top.
 * Targets the isolated AppLayout scroll container (.app-content-scroll-container),
 * with fallbacks for page-top markers and window scrolling.
 */
export const scrollToTop = (smooth: boolean = true): void => {
  const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';

  // 1. Primary: Scroll the isolated app content container used in AppLayout
  const container = document.querySelector('.app-content-scroll-container');
  if (container) {
    container.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  // 2. Secondary fallback: Check for a page-top DOM element
  const pageTop = document.getElementById('page-top');
  if (pageTop) {
    pageTop.scrollIntoView({ behavior, block: 'start' });
    return;
  }

  // 3. Fallback: Standard browser window and document scrolling
  window.scrollTo({ top: 0, left: 0, behavior });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
};
