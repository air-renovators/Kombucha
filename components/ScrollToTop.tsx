import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use behavior: 'instant' to override any 'scroll-smooth' CSS that might be set on the html element,
    // ensuring the user feels like they have instantly loaded a new page.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as any 
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;