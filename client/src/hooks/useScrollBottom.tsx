import { useEffect, useState } from "react";

export default function useScrollBottom(threshold = 0) {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
      setIsBottom(isAtBottom);
    };

    // Find the scrollable element within the ScrollArea
    const scrollAreaViewport = document.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (scrollAreaViewport) {
      scrollAreaViewport.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollAreaViewport) {
        scrollAreaViewport.removeEventListener("scroll", handleScroll);
      }
    };
  }, [threshold]);

  return isBottom;
}
