"use client";
import Image from 'next/image'
import { useTheme } from '@/components/ThemeContext'

export default function Footer() {
  const { theme } = useTheme();
  const iconSrc = theme === 'dark' ? '/icon.jpg' : '/icon-dark.jpg';

  return (
    <footer className={`w-full backdrop-blur-md py-4 sm:py-6 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 mt-12 ${
      theme === 'dark' ? 'bg-black/80' : 'bg-white/80 border-t border-gray-200'
    }`}>
      {/* Logo */}
      <div className="flex items-center space-x-2 order-1 md:order-none">
        <Image 
          src={iconSrc} 
          alt="Axia Labs Logo" 
          width={28} 
          height={28} 
          className="w-5 h-5 sm:w-7 sm:h-7 rounded" 
        />
      </div>
      {/* Copyright */}
      <div className={`text-xs sm:text-sm text-center order-2 md:order-none ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        © 2023 Axia Labs. All Rights Reserved.
      </div>
      {/* Socials */}
      <div className="flex items-center space-x-2 order-3 md:order-none">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.3 2 2 6.3 2 12c0 4.4 2.9 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1.1.8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.4 2.7-1.1 2.7-1.1.5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.3 4.9-4.6 5.1.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.7-4.3-10-10-10z"/></svg>
        </a>
        <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
        </a>
      </div>
    </footer>
  );
} 