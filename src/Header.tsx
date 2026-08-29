import React, { useState, useEffect, useRef } from 'react';
import "tailwindcss";
import scrollTexture from './assets/ScrollTexture.jpg';
import bgVideo from './assets/background.mp4';
import secretvfx from './assets/secretsfx.mp3';
import heartgif from  './assets/Heart.gif';
import haruu from './assets/haruu.jpeg';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
    'Enter'
];

export default function Header(): React.JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Easter Egg States
    const [aClicks, setAClicks] = useState<number>(0);
    const [konamiIndex, setKonamiIndex] = useState<number>(0);
    const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);
    const [commandInput, setCommandInput] = useState<string>('');
    const [consoleOutput, setConsoleOutput] = useState<string>('Ingresa un comando...');

    // Action States
    const [centerMessage, setCenterMessage] = useState<string | null>(null);
    const [topImage, setTopImage] = useState<string | null>(null);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleNavigate = (id: string) => {
        window.dispatchEvent(new CustomEvent('scroll-to-id', { detail: id }));
        setIsOpen(false);
    };

    // Synthetic Audio Effects
    const playSoundEffect = (type: 'secretsuccess' | 'success' | 'error') => {
        try {
            const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'secretsuccess') {
                const audio: HTMLAudioElement = new Audio(secretvfx);
                audio.volume = 0.15;
                audio.play()
            } else if (type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
            } else {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            }
        } catch {
            // AudioContext fallback ignored if browser blocks autoplay
        }
    };

    // 15-second timer trigger after clicking 'A' 5 times
    useEffect(() => {
        if (aClicks >= 5) {
            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                setAClicks(0);
                setKonamiIndex(0);
            }, 15000);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [aClicks]);

    // Konami Code keyboard listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (aClicks < 5 || showEasterEgg) return;

            const expectedKey = KONAMI_CODE[konamiIndex].toLowerCase();
            const pressedKey = e.key.toLowerCase();

            if (pressedKey === expectedKey) {
                const nextIndex = konamiIndex + 1;
                if (nextIndex === KONAMI_CODE.length) {
                    setShowEasterEgg(true);
                    setKonamiIndex(0);
                    setAClicks(0);
                    playSoundEffect('secretsuccess');
                    if (timerRef.current) clearTimeout(timerRef.current);
                } else {
                    setKonamiIndex(nextIndex);
                }
            } else {
                setKonamiIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [aClicks, konamiIndex, showEasterEgg]);

    // Command parser for secret console
    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = commandInput.trim().toLowerCase();

        if (cmd === 'bg matrix') {
            window.dispatchEvent(
                new CustomEvent('change-bg', {
                    detail: {
                        type: 'image',
                        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920',
                    },
                })
            );

            playSoundEffect('success');
        } else if (cmd.startsWith('msg ')) {
            const text = commandInput.substring(4);
            setCenterMessage(text);
            playSoundEffect('success');
        } else if (cmd.startsWith('img ')) {
            const url = commandInput.substring(4);
            setTopImage(url);
            playSoundEffect('success');
        } else if (cmd === 'audio') {
            playSoundEffect('success');
        } else if (cmd === 'clear' || cmd === 'reset') {
            window.dispatchEvent(
                new CustomEvent('change-bg', {
                    detail: {
                        type: 'video',
                        src: bgVideo,
                    },
                })
            );
            setCenterMessage(null);
            setTopImage(null);
            setConsoleOutput('✓ Configuración reiniciada.');
            playSoundEffect('success');
        } else if ((cmd === 'junio24')){
            const message = 'Hola  mi amor, quiero que sepas que cuando veas esto que no importa el momento, situacion, hora, dia, este o no despierto. Siempre estas en mi mento, siempre estoy pensando en cuanto te amo /n';
            window.dispatchEvent(
                new CustomEvent('change-bg', {
                    detail: {
                        type: 'image',
                        src: heartgif,
                    },
                })
            );
            playSoundEffect('success');
            setTopImage(haruu);
            setCenterMessage(message);
        } else {
            setConsoleOutput('✗ Comando no reconocido.');
            playSoundEffect('error');
        }

        setCommandInput('');
    };

    return (
        <>
            <header 
                className="parchment-scroll text-gray-800 shadow-md fixed top-0 h-20 z-50 bg-[#fdefd1] transition-all ease-out" 
                style={{ 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'calc(min(94vw, 900px) + 32px)',
                    ['--bg-texture' as string]: `url(${scrollTexture})` 
                }}
            >
                <div className="w-full px-4 sm:px-6 h-full">
                    <div className="flex justify-between items-center h-full">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-xl font-bold tracking-wide">
                                <span 
                                    onClick={() => setAClicks((prev) => prev + 1)} 
                                    className={`cursor-pointer select-none transition-colors duration-300 ${
                                        aClicks >= 5 
                                            ? 'text-amber-600 font-extrabold animate-pulse' 
                                            : 'hover:text-orange-600'
                                    }`}
                                >
                                    A
                                </span>
                                riel C. Soto Zúñiga
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8 font-semibold">
                            <button onClick={() => handleNavigate('about-me')} className="hover:text-orange-500 transition-colors cursor-pointer">Sobre mi</button>
                            <button onClick={() => handleNavigate('projects')} className="hover:text-orange-500 transition-colors cursor-pointer">Proyectos</button>
                            <button onClick={() => handleNavigate('stack')} className="hover:text-orange-500 transition-colors cursor-pointer">Stack</button>
                            <button onClick={() => handleNavigate('contact')} className="hover:text-orange-500 transition-colors cursor-pointer">Contacto</button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen((prev) => !prev)}
                                className="text-gray-800 hover:text-black focus:outline-none"
                                aria-label="Toggle Menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-[#fdefd1] w-full px-4 pt-2 pb-4 space-y-2 border-t border-amber-900/20 shadow-lg">
                        <button onClick={() => handleNavigate('about-me')} className="block w-full text-left py-2 text-gray-800 font-medium hover:text-purple-900">Sobre mi</button>
                        <button onClick={() => handleNavigate('projects')} className="block w-full text-left py-2 text-gray-800 font-medium hover:text-purple-900">Proyectos</button>
                        <button onClick={() => handleNavigate('stack')} className="block w-full text-left py-2 text-gray-800 font-medium hover:text-purple-900">Stack</button>
                        <button onClick={() => handleNavigate('contact')} className="block w-full text-left py-2 text-gray-800 font-medium hover:text-purple-900">Contacto</button>
                    </div>
                )}

                {/* Floating Secret Console */}
                {showEasterEgg && (
                    <div className="fixed bottom-4 right-4 z-50 w-80 bg-black/90 text-green-400 p-4 rounded-xl shadow-2xl border border-green-500/50 font-mono text-xs backdrop-blur-md">
                        <div className="flex justify-between items-center mb-2 border-b border-green-500/30 pb-1">
                            <span className="font-bold text-green-400 flex items-center gap-1">
                                <span>&gt;_</span> CONSOLA SECRETA
                            </span>
                            <button
                                onClick={() => setShowEasterEgg(false)}
                                className="text-neutral-400 hover:text-white px-1"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-2 h-10 overflow-y-auto text-neutral-300">
                            {consoleOutput}
                        </div>

                        <form onSubmit={handleCommandSubmit} className="flex gap-1">
                            <span className="text-green-500">&gt;</span>
                            <input
                                type="text"
                                value={commandInput}
                                onChange={(e) => setCommandInput(e.target.value)}
                                placeholder="Escribe un comando..."
                                className="w-full bg-transparent text-green-300 focus:outline-none placeholder-green-800"
                                autoFocus
                            />
                        </form>
                    </div>
                )}
            </header>

            {/* Secret Top Image Overlay */}
            {topImage && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-black/80 p-2 rounded-lg border border-amber-500 shadow-2xl">
                    <img src={topImage} alt="Secreta" className="max-h-48 max-w-sm rounded object-cover" />
                    <button 
                        onClick={() => setTopImage(null)} 
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Center Message Popup */}
            {centerMessage && (
                <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto bg-blue-50 text-white border border-amber-500/50 px-6 py-4 rounded-2xl shadow-2xl text-center max-w-md">
                        <p className="text-lg font-bold mb-2"></p>
                        <p className="text-sm text-white">{centerMessage}</p>
                        <button
                            onClick={() => setCenterMessage(null)}
                            className="mt-4 px-3 py-1 bg-amber-600 text-white font-semibold text-xs rounded hover:bg-amber-500"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}