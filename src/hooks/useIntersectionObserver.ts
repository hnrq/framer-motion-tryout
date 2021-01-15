import {
  RefObject,
  useEffect
} from 'react';

const useIntersectionObserver = (
  intersectElement: RefObject<HTMLElement>, 
  onIntersect: () => unknown,
  properties: IntersectionObserverInit = {}
) => {

  useEffect(() => {
    const elementCurrent = intersectElement.current;
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>) => {
        if (entries[0].isIntersecting) onIntersect();
      }, 
      { 
        root: null,
        rootMargin: '0px', 
        threshold: 0.9,
        ...properties
      }
    );

    if (elementCurrent) observer.observe(elementCurrent as unknown as HTMLElement);
    return () => {
      if(elementCurrent) observer.unobserve(elementCurrent);
    }
  }, [intersectElement, onIntersect, properties]);
};

export default useIntersectionObserver;