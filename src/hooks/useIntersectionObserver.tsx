import { useCallback, useEffect, useRef } from 'react';

const useIntersectionObserver = (callback: () => void, options?: IntersectionObserverInit) => {
  const ref = useRef(null);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) return;

    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [onIntersect, options]);

  return ref;
};

export default useIntersectionObserver;
