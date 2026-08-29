import React, { useState, useEffect, useRef } from 'react';
import scrollTexture from './assets/ScrollTexture.jpg';
import scrollDeco from './assets/ScrollDeco.png';
import scrollDeco2 from './assets/ScrollDeco2.png';
import scrollSoundFile from './assets/ScrollSound.mp3';

interface Project {
  title: string;
  description: string[];
  githubUrl: string;
}

const projectsData: Project[] = [
  {
    title: 'SkillClock',
    description: [
      'Una aplicacion de despertador con una tematica especial. Para lograr apagar la alarma cuando suene, tienes que ganar unos "skill check" al estilo del juego Dead by Daylight...',
    ],
    githubUrl: 'https://github.com/ElQuesoMagico/SkillClock',
  },
  {
    title: 'NOMBRE PROYECTO 2',
    description: [
      'Descripcion Descripcion',
      'Descripcion Descripcion',
      'Descripcion Descripcion',
      'Descripcion Descripcion',
    ],
    githubUrl: 'https://github.com',
  },
];

export default function Body(): React.JSX.Element {
  const [translateY, setTranslateY] = useState<number>(-100);
  const parchmentRef = useRef<HTMLDivElement>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    audioRef.current = new Audio(scrollSoundFile);
    audioRef.current.volume = 0.5;

    const handleScroll = () => {
      const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (fullHeight > 0) {
        const progress = Math.min(Math.max(currentScroll / fullHeight, 0), 1);
        setTranslateY(-100 + progress * 100);
      }

      if (Math.abs(currentScroll - lastScrollY.current) > 60) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;

          audioRef.current.preservesPitch = false;
          (audioRef.current as HTMLAudioElement & { mozPreservesPitch?: boolean }).mozPreservesPitch = false;
          (audioRef.current as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = false;

          const randomPitch = 0.85 + Math.random() * 0.3;
          audioRef.current.playbackRate = randomPitch;

          audioRef.current.play().catch(() => {});
        }
        lastScrollY.current = currentScroll;
      }
    };

    // Simplified and mobile-friendly scroll calculation
    const handleScrollToId = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll-to-id', handleScrollToId);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll-to-id', handleScrollToId);
    };
  }, []);

  return (
    <div style={{ height: '350vh', position: 'relative' }}>
      <div
        ref={parchmentRef}
        className="parchment-scroll w-[min(94vw,900px)] fixed transition-all ease-out"
        style={{
          top: '80px',
          left: '50%',
          transform: `translate(-50%, ${translateY}%)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          backgroundColor: '#fdefd1',
          ['--bg-texture' as string]: `url(${scrollTexture})`,
          color: '#2d2d2d',
          padding: '24px',
          zIndex: 40,
        }}
      >
        <img src={scrollDeco} alt="decoration" style={{ margin: '0 auto 2rem', display: 'block', opacity: 0.7 }} />

        <h2 id="contact" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Contacto
        </h2>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '1rem' }}>
          ¿Tienes un proyecto en mente o quieres conversar?
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>Gmail</p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>LinkedIn</p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>GitHub</p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '3rem' }}>
          Discord
        </p>

        <img src={scrollDeco2} alt="decoration" style={{ margin: '0 auto 3rem', display: 'block', opacity: 0.7, width: '80%' }} />

        <h2 id="stack" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          STACK
        </h2>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', fontWeight: 'bold' }}>
          Lenguajes de programacion
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '1rem' }}>
          C# • Python • JavaScript • Luau • Java
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', fontWeight: 'bold' }}>
          Tecnologías
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '1rem' }}>
          Unity • Bsale API • Desarrollo Web (HTML/CSS) • REST APIs
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', fontWeight: 'bold' }}>
          Herramientas, Productividad & Flujo de Trabajo
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '3rem' }}>
          Git / GitHub • Notion • Slack
        </p>

        <img src={scrollDeco2} alt="decoration" style={{ margin: '0 auto 3rem', display: 'block', opacity: 0.7, width: '80%' }} />

        <h2 id="projects" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          PROYECTOS
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '5rem',
          }}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              style={{
                flex: '1 1 280px',
                maxWidth: '400px',
                border: '2px dashed #2d2d2d',
                borderRadius: '8px',
                padding: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {project.title}
              </h3>

              <div style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {project.description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4c1d95',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                LINK GITHUB
                <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <img src={scrollDeco2} alt="decoration" style={{ margin: '0 auto 3rem', display: 'block', opacity: 0.7, width: '80%' }} />

        <h2 id="about-me" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          SOBRE MI
        </h2>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '5rem' }}>
          ¡Hola! Soy Ariel C. Soto, Técnico en Informática apasionado por construir software, sistemas multijugador y soluciones digitales que resuelven problemas del mundo real de maneras practicas y tambien divertidas.

          Mi trayectoria combina la lógica del desarrollo de software con la experiencia práctica de liderar despliegues de tecnología en terreno. He liderado proyectos como la implementación de sistemas POS/ERP y la automatización de flujos de datos mediante APIs, así como el desarrollo de arquitecturas cliente-servidor en entornos interactivos como Unity.
        </p>

        <img src={scrollDeco} alt="decoration" style={{ margin: '0 auto 2rem', display: 'block', opacity: 0.7, rotate: '180deg' }} />
      </div>
    </div>
  );
}