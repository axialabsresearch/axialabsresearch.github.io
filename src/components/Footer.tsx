"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-md py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-2 mt-12">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="./icon.jpg" alt="Axia Labs Logo" className="w-7 h-7 rounded" />
      </div>
      {/* Copyright */}
      <div className="text-gray-400 text-sm text-center">
        © 2023 Axia Labs. All Rights Reserved.
      </div>
      {/* Socials */}
      <div className="flex items-center space-x-2">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg className="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .39.045.765.127 1.124C7.728 8.89 4.1 6.89 1.671 3.905c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89-.386.104-.793.16-1.213.16-.297 0-.583-.028-.862-.08.584 1.823 2.28 3.15 4.29 3.187A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0 0 24 4.557z"/></svg>
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg className="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.3 2 2 6.3 2 12c0 4.4 2.9 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1.1.8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.4 2.7-1.1 2.7-1.1.5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.3 4.9-4.6 5.1.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.7-4.3-10-10-10z"/></svg>
        </a>
        <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg className="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
        </a>
      </div>
    </footer>
  );
} 