import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options?: IntersectionObserverInit, callback?: () => void) => {
  const observerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && callback) {
        callback();
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [options, callback]);

  return [observerRef, inView] as const;
};

export default useIntersectionObserver;
