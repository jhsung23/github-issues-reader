import { useEffect } from 'react';

const useScrollTop = () => {
  useEffect(() => {
    if (window) window.scroll({ top: 0 });
  });

  return;
};

export default useScrollTop;
