import { useEffect, useState } from 'react';

// Custom hook to get the current window width
const useWindowWidth = () => {
  // State to hold the current width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update width state on resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  return width;
};

export default useWindowWidth;
