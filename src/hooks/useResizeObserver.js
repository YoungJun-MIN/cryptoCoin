import { useEffect, useState } from 'react';
import debounce from '@/utils/debounce';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const handleResize = debounce((entries) => {
      const [entry] = entries;
      setDimensions(entry.contentRect);  
    }, 100)
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    }
  }, []);
  return dimensions;
}

export default useResizeObserver