import { useState, useEffect } from 'react';
import arrow from './assets/arrow.png';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-28 left-1/2 -translate-x-1/2 transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-orange-100 text-white px-4 py-2 rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center">
  <p className="embers-text text-center">Baja para revelar el contenido del pergamino</p>
  
  <div className="flex items-center justify-center gap-1 mt-1">
    <img src={arrow} className="scrollarrow" alt="arrow" />  
    <img src={arrow} className="scrollarrow" alt="arrow" />  
    <img src={arrow} className="scrollarrow" alt="arrow" />  
  </div>
</div>
      
    </div>
  );
}