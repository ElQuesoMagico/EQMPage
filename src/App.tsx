import { useState, useEffect } from 'react';
import Header from './Header';
import Body from './Body';
import bgVideo from './assets/background.mp4';
import ScrollIndicator from './ScrollIndicator';

export default function App() {
  const [bgMedia, setBgMedia] = useState<{ type: 'video' | 'image'; src: string }>({
    type: 'video',
    src: bgVideo,
  });

  useEffect(() => {
    const handleBgChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: 'video' | 'image'; src: string }>;
      if (customEvent.detail) {
        setBgMedia(customEvent.detail);
      }
    };

    window.addEventListener('change-bg', handleBgChange);
    return () => window.removeEventListener('change-bg', handleBgChange);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* Background Media */}
      {bgMedia.type === 'video' ? (
        <video
          key={bgMedia.src}
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-80"
        >
          <source src={bgMedia.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0 pointer-events-none opacity-80 transition-all duration-500"
          style={{ backgroundImage: `url('${bgMedia.src}')` }}
        />
      )}

      {/* Content Overlay */}
      <div className="relative z-10">
        <Header />
        <Body />
        <ScrollIndicator />
      </div>
    </div>
  );
}