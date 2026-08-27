import Header from './Header';
import Body from './Body';
import bgVideo from './assets/background.mp4'; // Import your video file

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-80"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10">
        <Header />
        <Body />
      </div>
    </div>
  );
}