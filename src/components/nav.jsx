import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleClick = (name, href) => {
    const sectionName = name.toLowerCase();
    setActiveSection(sectionName);

    if (sectionName === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(sectionName);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'
      }`}>
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 transition-all duration-300 z-50" style={{ width: `${scrollProgress}%` }}></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Cyber Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleClick('Home', '#home'); }} className="relative group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 border border-blue-500/30 rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-all duration-500">
                  <span className="text-white font-black -rotate-45 group-hover:-rotate-90 transition-all duration-500">D</span>
                </div>
                <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-[0.2em] text-white leading-none">DHARANISH</span>
                <span className="text-[10px] font-mono text-blue-500 tracking-[0.4em] uppercase opacity-70">Portfolio</span>
              </div>
            </div>
          </a>

          {/* Minimal Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.name, link.href); }}
                className={`relative px-6 py-2 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 group ${activeSection === link.name.toLowerCase() ? 'text-white' : 'text-white/30 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>

                {/* Visual Indicators */}
                {activeSection === link.name.toLowerCase() ? (
                  <>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full blur-[1px]"></div>
                  </>
                ) : (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/20 group-hover:w-full transition-all duration-500"></div>
                )}
              </a>
            ))}
          </div>


          {/* Tech Link & Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="/Resume.pdf" download className="flex items-center gap-2 px-5 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Download CV</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="group-hover:translate-y-0.5 transition-transform">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
            </a>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <div className={`h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></div>
            <div className={`h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'w-5 self-end'}`}></div>
            <div className={`h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-8'}`}></div>
          </button>
        </div>
      </div>

      {/* Tech-Style Mobile Menu */}
      <div className={`fixed inset-0 lg:hidden bg-black transition-all duration-700 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Background Scanline Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        <div className="relative h-full flex flex-col p-10 pt-32">
          <div className="flex flex-col gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.name, link.href); }}
                className={`group flex items-end gap-6 transition-all duration-500 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-blue-500 font-mono text-lg opacity-40 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                <span className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter ${activeSection === link.name.toLowerCase() ? 'text-white' : 'text-white/20'
                  }`}>
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-8">
            <a href="/Resume.pdf" download className="w-full py-4 flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm font-black tracking-widest uppercase hover:bg-blue-600 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
              Download CV
            </a>
            <div className="h-[1px] w-full bg-white/10"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-6">
                <a href="https://github.com/DHARANISH45" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-500 text-sm font-mono transition-colors">GH</a>
                <a href="https://www.linkedin.com/in/dharanish-sl/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-500 text-sm font-mono transition-colors">LI</a>
              </div>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">KEC • Erode, India</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;