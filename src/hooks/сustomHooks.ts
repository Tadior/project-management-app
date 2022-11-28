import { useEffect, useState } from 'react';

export const useActiveHeader = () => {
  const [activeClass, setActiveClass] = useState('header');

  const onScroll = (event: Event) =>
    setActiveClass(window.scrollY > 0 ? 'header active-header' : 'header');

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return activeClass;
};
