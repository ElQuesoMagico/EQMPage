import React, { useState } from 'react';
import "tailwindcss";
import scrollTexture from './assets/ScrollTexture.jpg';

export default function Header(): React.JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleNavigate = (id: string) => {
        window.dispatchEvent(new CustomEvent('scroll-to-id', { detail: id }));
        setIsOpen(false);
    };

    return (
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
                            Ariel C. Soto Zúñiga
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
        </header>
    );
}