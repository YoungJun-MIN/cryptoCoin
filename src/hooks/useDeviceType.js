import debounce from "@/utils/debounce";
import { useEffect, useState } from "react";
const useDeviceType = () => {
  const getDeviceType = () => {
    const width = window.innerWidth;
    if(width <= 768) return "mobile";
    else if(width <= 1024) return "tablet";
    else return "desktop";
  }
  const [deviceType, setDeviceType] = useState(getDeviceType);
  
  useEffect(() => {
  const debouncedHandleResize = debounce(() => setDeviceType(getDeviceType()), 100);

  window.addEventListener("resize", debouncedHandleResize);
  return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return deviceType;
}

export default useDeviceType;