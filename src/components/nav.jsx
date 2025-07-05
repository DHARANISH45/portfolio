import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Create a throttled scroll handler for better performance
    let lastScrollTime = 0;
    const scrollThrottleDelay = 100; // ms
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottleDelay) return;
      lastScrollTime = now;
      
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
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
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👤' },
    { name: 'Skills', href: '#skills', icon: '🛠️' },
    { name: 'Projects', href: '#projects', icon: '💼' },
    { name: 'Contact', href: '#contact', icon: '✉️' }
  ];

  const handleClick = (name, href) => {
    const sectionName = name.toLowerCase();
    setActiveSection(sectionName);
    
    // For home, always scroll to top
    if (sectionName === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // For other sections, scroll to the section
    const targetElement = document.getElementById(sectionName);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      {/* Glassmorphism background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/70 backdrop-blur-lg' 
          : 'bg-black/50 backdrop-blur-sm'
      }`}>
        {/* Animated border */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              handleClick('Home', '#home');
            }}
            className="group relative"
          >
            <div className="relative z-10">
              <span className="text-3xl font-extrabold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                  Dharanish
                </span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r 
                from-blue-400 via-purple-500 to-pink-500 
                group-hover:w-full transition-all duration-300 ease-out"></span>
            </div>
            {/* Logo glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center">
            <div className="flex bg-black/20 backdrop-blur-md rounded-full p-1 border border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.name, link.href);
                  }}
                  className={`relative group px-5 py-2 mx-1 rounded-full transition-all duration-300 ease-out
                    ${activeSection === link.name.toLowerCase()
                      ? 'text-white bg-gradient-to-br from-blue-500/80 via-purple-500/80 to-pink-500/80 shadow-lg'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {/* Main label with icon */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </div>
                  
                  {/* Highlight effect for inactive items */}
                  {activeSection !== link.name.toLowerCase() && (
                    <span className="absolute inset-0 rounded-full bg-white/0 
                      group-hover:bg-white/10 transition-all duration-300"></span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 p-2 group"
            aria-label="Toggle mobile menu"
          >
            <div className="flex flex-col justify-center items-center w-7 h-7">
              <span className={`block h-0.5 w-6 bg-gradient-to-r from-blue-400 to-purple-500 
                            absolute transform transition-all duration-300 ease-out
                            ${mobileMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-4px]'}`} />
              <span className={`block h-0.5 w-6 bg-gradient-to-r from-purple-500 to-pink-500 
                            absolute transition-all duration-300 ease-out
                            ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
              <span className={`block h-0.5 w-6 bg-gradient-to-r from-pink-500 to-blue-400 
                            absolute transform transition-all duration-300 ease-out
                            ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[4px]'}`} />
              
              {/* Button glow effect */}
              <span className="absolute inset-0 rounded-full bg-white/0 
                group-hover:bg-white/10 transition-all duration-300"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Fullscreen overlay */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 
        flex flex-col justify-center items-center transition-all duration-500 ease-in-out
        ${mobileMenuOpen ? 'opacity-100 transform-none' : 'opacity-0 translate-y-[-20px] pointer-events-none'}`}>
        
        {/* Animated background elements - reduced for better performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} 
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"
              style={{
                top: `${25 + (i * 30)}%`,
                left: `${20 + (i * 30)}%`,
                animationDuration: `${15 + i * 5}s`,
                animationName: 'floatingBubble',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                animationDirection: 'alternate'
              }}
            ></div>
          ))}
        </div>
      
        <div className="w-full max-w-md text-center">
          <div className="grid grid-cols-1 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.name, link.href);
                }}
                className="group relative"
              >
                <div className={`relative inline-block px-8 py-3 rounded-xl 
                  transition-all duration-300 ease-out
                  ${activeSection === link.name.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20'
                    : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-xl mr-3">{link.icon}</span>
                    <span className={`text-xl font-medium 
                      ${activeSection === link.name.toLowerCase()
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
                        : 'text-gray-300'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>
                  
                  {/* Bottom border */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px]
                    bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                    group-hover:w-4/5 transition-all duration-300 ease-out
                    ${activeSection === link.name.toLowerCase() ? 'w-4/5' : ''}`}
                  ></span>
                </div>
              </a>
            ))}
          </div>
          
          {/* Social Links */}
          <div className="mt-16 flex justify-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 hover:border-primary/50 transition-colors duration-300">
                G
              </div>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 hover:border-primary/50 transition-colors duration-300">
                L
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Animation styles - simplified for better performance */}
      <style jsx>{`
        @keyframes floatingBubble {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -10px); }
          100% { transform: translate(20px, -20px); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;