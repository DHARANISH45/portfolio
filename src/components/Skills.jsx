import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './skills.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const headingRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const matrixRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const techDotsRef = useRef(null);
  const frontendSkills = [
    { name: "React.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind CSS", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" }
  ];
  const backendSkills = [
    { name: "Node.js", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "MongoDB", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
  ];

  const toolsSkills = [
    { name: "Git", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Figma", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
  ];

  // Add matrix code rain effect
  useEffect(() => {
    const matrixContainer = matrixRef.current;
    if (!matrixContainer) return;
    
    const createMatrixRain = () => {
      matrixContainer.innerHTML = '';
      const columns = Math.floor(window.innerWidth / 20);
      
      for (let i = 0; i < columns; i++) {
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 3;
        
        const span = document.createElement('span');
        span.style.left = `${i * 20}px`;
        span.style.animationDuration = `${duration}s`;
        span.style.animationDelay = `${delay}s`;
        span.textContent = Math.random() > 0.5 ? '1' : '0';
        
        matrixContainer.appendChild(span);
      }
    };
    
    createMatrixRain();
    window.addEventListener('resize', createMatrixRain);
    
    return () => {
      window.removeEventListener('resize', createMatrixRain);
    };
  }, []);

  // Add function to create tech dots that follow mouse movement
  const createTechDots = useCallback(() => {
    if (!techDotsRef.current) return;
    
    const container = techDotsRef.current;
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('div');
      dot.className = 'tech-dot-pulse';
      
      // Randomize the initial position slightly
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;
      
      dot.style.left = `calc(${mousePosition.x}px + ${randomX}px)`;
      dot.style.top = `calc(${mousePosition.y}px + ${randomY}px)`;
      
      // Randomize animation delay
      dot.style.animationDelay = `${i * 0.1}s`;
      
      container.appendChild(dot);
    }
  }, [mousePosition]);
  
  // Track mouse position for the interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only update every few movements to improve performance
      if (Math.random() > 0.9) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create tech dots when mouse position changes
  useEffect(() => {
    createTechDots();
  }, [mousePosition, createTechDots]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const heading = headingRef.current;
    
    if (!section || !cards || !heading) return;
    
    // Create timeline with scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%", 
        end: "center center",
        toggleActions: "play none none reverse"
      }
    });

    // Animate heading
    tl.fromTo(
      heading, 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Animate skill cards with stagger
    tl.fromTo(
      cards.querySelectorAll('.skill-card'),
      { y: 60, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
    
    // Animate skill bars with delay
    tl.fromTo(
      cards.querySelectorAll('.skill-progress-bar span'),
      { width: 0 },
      { width: "100%", stagger: 0.1, duration: 1, ease: "power2.out" },
      "-=0.2"
    );
    
    // Animate icons with bounce
    tl.fromTo(
      cards.querySelectorAll('.skill-icon'),
      { scale: 0, rotation: -10 },
      { scale: 1, rotation: 0, stagger: 0.05, duration: 0.6, ease: "back.out(2)" },
      "-=1.5"
    );

    // Add hover effects for skill cards
    const skillCards = cards.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          y: -10, 
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(var(--color-primary-rgb), 0.6)',
          duration: 0.3
        });
        
        // Animate progress bars on hover
        const progressBars = card.querySelectorAll('.skill-progress-bar span');
        gsap.to(progressBars, {
          scaleX: 1.02,
          duration: 0.4,
          ease: "elastic.out(1.2, 0.5)",
          stagger: 0.05
        });
        
        // Animate icons
        const icons = card.querySelectorAll('.skill-icon');
        gsap.to(icons, {
          rotation: 5,
          scale: 1.1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.05
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          y: 0, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(128, 128, 128, 0.3)',
          duration: 0.3
        });
        
        // Reset progress bars
        const progressBars = card.querySelectorAll('.skill-progress-bar span');
        gsap.to(progressBars, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05
        });
        
        // Reset icons
        const icons = card.querySelectorAll('.skill-icon');
        gsap.to(icons, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05
        });
      });
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      
      // Cleanup event listeners
      skillCards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {/* Add 3D grid effect */}
          <div className="absolute inset-0 skills-grid"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/30 filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/30 filter blur-[100px] animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>
        
        {/* Animated code snippets */}
        <div className="code-snippet absolute top-[15%] left-[5%] opacity-20 text-xs rotate-[-15deg] floating-element">
          &lt;div className="skills"&gt;
        </div>
        <div className="code-snippet absolute top-[80%] right-[10%] opacity-20 text-xs rotate-[5deg] floating-element-reverse">
          const developer = true;
        </div>
        <div className="code-snippet absolute top-[40%] right-[5%] opacity-20 text-xs rotate-[15deg] floating-element">
          npm install success
        </div>
        
        {/* Digital particles */}
        <div className="digital-particles"></div>
        
        {/* Add hexagon grid with cyberpunk theme */}
        <div className="hexagon-grid absolute inset-0"></div>
        
        {/* Add retro scanlines */}
        <div className="retro-scanline"></div>
        
        {/* Container for tech dots that follow mouse */}
        <div ref={techDotsRef} className="absolute inset-0 pointer-events-none"></div>
      </div>

      <div className="container mx-auto max-w-6xl z-10">
        <div className="flex flex-col items-center" ref={headingRef}>
          {/* Cyberpunk-Inspired Interactive Title */}
          <div className="relative mb-20 interactive-title">
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-6 bg-primary/30 rounded-full blur-sm glow-effect"></div>
            <h2 className="text-5xl md:text-7xl font-black text-center relative inline-block glitch-text" data-text="MY SKILLS">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-text">
                MY SKILLS
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-width"></div>
            </h2>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-6 bg-secondary/30 rounded-full blur-sm glow-effect"></div>
          </div>
          
          <p className="text-center text-gray-400 max-w-xl mb-12 px-4 typed-effect">
            A showcase of my technical abilities and tools I've mastered on my journey as a 
            frontend developer with backend knowledge.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Frontend Skills Card - Enhanced with more cyberpunk elements */}
          <div 
            className="skill-card skill-card-interactive backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 bg-black/30 relative group hover-effect overflow-hidden skill-card-hover"
            onMouseEnter={() => setActiveSkill('frontend')}
            onMouseLeave={() => setActiveSkill(null)}
          >
            {/* Liquid animation background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="liquid-animation"></div>
            </div>
            
            {/* Add holographic effect */}
            <div className="holographic-effect"></div>
            
            {/* Card decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-lg corner-animation"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-lg corner-animation"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-lg corner-animation"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-lg corner-animation"></div>
            
            {/* Tech dots */}
            <div className="absolute top-4 right-4 flex space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-400/50 animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
            
            {/* Add interactive connection lines when card is active */}
            {activeSkill === 'frontend' && (
              <>
                <div className="connection-line top-1/2 -right-4 w-8 h-1"></div>
                <div className="connection-line bottom-10 -left-4 w-8 h-1"></div>
              </>
            )}
            
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-6 flex items-center relative z-10 neon-text">
              <div className="w-1 h-6 bg-primary mr-3 rounded-full"></div>
              Frontend
            </h3>
            
            {/* Simple tag with no proficiency information */}
            <div className="inline-block mb-6 px-3 py-1 text-xs bg-primary/5 border border-primary/10 rounded-md text-primary/80 relative z-10">
              UI Development
            </div>
            
            {/* Skills list with no proficiency indicators */}
            <ul className="grid grid-cols-1 gap-3 mt-6 relative z-10">
              {frontendSkills.map((skill, index) => (
                <li key={index} className="skill-item flex items-center p-2.5 rounded-md bg-black/30 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="skill-icon w-9 h-9 p-1.5 rounded-md bg-black/40 border border-primary/10 flex items-center justify-center mr-4">
                    <img 
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full filter brightness-110 animate-floating"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  </div>
                  <span className="font-medium text-white tracking-wide">{skill.name}</span>
                  
                  {/* Decorative element */}
                  <div className="ml-auto">
                    <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary/20 animate-pulse"></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Cyberpunk-style badge */}
            <div className="absolute -bottom-2 -right-2 transform rotate-12 bg-black text-[#50FAFA] text-xs font-bold py-1 px-3 rounded-md border border-[#50FAFA] shadow-[0_0_10px_rgba(80,250,250,0.5)]">
              FRONT:END
            </div>
          </div>
          
          {/* Backend Skills Card - Similar enhancements with cyberpunk styling */}
          <div 
            className="skill-card skill-card-interactive backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 bg-black/30 relative group hover-effect overflow-hidden skill-card-hover"
            onMouseEnter={() => setActiveSkill('backend')}
            onMouseLeave={() => setActiveSkill(null)}
          >
            {/* Data stream animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="data-stream-animation"></div>
            </div>
            
            {/* Add holographic effect */}
            <div className="holographic-effect"></div>
            
            {/* Card decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/5 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/60 rounded-tl-lg corner-animation"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/60 rounded-tr-lg corner-animation"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/60 rounded-bl-lg corner-animation"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/60 rounded-br-lg corner-animation"></div>
            
            {/* Tech dots */}
            <div className="absolute top-4 right-4 flex space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-400/50 animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
            
            {/* Add interactive connection lines when card is active */}
            {activeSkill === 'backend' && (
              <>
                <div className="connection-line top-1/2 -left-4 w-8 h-1"></div>
                <div className="connection-line bottom-10 -right-4 w-8 h-1"></div>
              </>
            )}
            
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white mb-6 flex items-center relative z-10">
              <div className="w-1 h-6 bg-secondary mr-3 rounded-full"></div>
              Backend
            </h3>
            
            {/* Simple tag with no proficiency information */}
            <div className="inline-block mb-6 px-3 py-1 text-xs bg-secondary/5 border border-secondary/10 rounded-md text-secondary/80 relative z-10">
              Server Development
            </div>
            
            {/* Skills list with no proficiency indicators */}
            <ul className="grid grid-cols-1 gap-3 mt-6 relative z-10">
              {backendSkills.map((skill, index) => (
                <li key={index} className="skill-item flex items-center p-2.5 rounded-md bg-black/30 border border-secondary/10 hover:border-secondary/30 transition-all duration-300">
                  <div className="skill-icon w-9 h-9 p-1.5 rounded-md bg-black/40 border border-secondary/10 flex items-center justify-center mr-4">
                    <img 
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full filter brightness-110 animate-floating"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  </div>
                  <span className="font-medium text-white tracking-wide">{skill.name}</span>
                  
                  {/* Decorative element */}
                  <div className="ml-auto">
                    <div className="w-6 h-6 rounded-full bg-secondary/5 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-secondary/20 animate-pulse"></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Cyberpunk-style badge */}
            <div className="absolute -bottom-2 -right-2 transform rotate-12 bg-black text-[#FFD129] text-xs font-bold py-1 px-3 rounded-md border border-[#FFD129] shadow-[0_0_10px_rgba(255,209,41,0.5)]">
              BACK:END
            </div>
          </div>
          
          {/* Tools Skills Card - Similar enhancements */}
          <div 
            className="skill-card skill-card-interactive backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 bg-black/30 relative group hover-effect overflow-hidden skill-card-hover"
            onMouseEnter={() => setActiveSkill('tools')}
            onMouseLeave={() => setActiveSkill(null)}
          >
            {/* Circuit pattern animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="circuit-pattern"></div>
            </div>
            
            {/* Add holographic effect */}
            <div className="holographic-effect"></div>
            
            {/* Card decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg corner-animation"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg corner-animation"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg corner-animation"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg corner-animation"></div>
            
            {/* Tech dots */}
            <div className="absolute top-4 right-4 flex space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-400/50 animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
            
            {/* Add interactive connection lines when card is active */}
            {activeSkill === 'tools' && (
              <>
                <div className="connection-line top-1/2 -left-4 w-8 h-1"></div>
                <div className="connection-line top-10 -right-4 w-8 h-1"></div>
              </>
            )}
            
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 flex items-center relative z-10">
              <div className="w-1 h-6 bg-white/70 mr-3 rounded-full"></div>
              Tools
            </h3>
            
            {/* Simple tag with no proficiency information */}
            <div className="inline-block mb-6 px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-white/80 relative z-10">
              Development Tools
            </div>
            
            {/* Skills list with no proficiency indicators */}
            <ul className="grid grid-cols-1 gap-3 mt-6 relative z-10">
              {toolsSkills.map((skill, index) => (
                <li key={index} className="skill-item flex items-center p-2.5 rounded-md bg-black/30 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="skill-icon w-9 h-9 p-1.5 rounded-md bg-black/40 border border-white/10 flex items-center justify-center mr-4">
                    <img 
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full filter brightness-110 animate-floating"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  </div>
                  <span className="font-medium text-white tracking-wide">{skill.name}</span>
                  
                  {/* Decorative element */}
                  <div className="ml-auto">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Cyberpunk-style badge */}
            <div className="absolute -bottom-2 -right-2 transform rotate-12 bg-black text-white text-xs font-bold py-1 px-3 rounded-md border border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              UTIL:TOOLS
            </div>
          </div>
        </div>
        
        {/* Add a futuristic skill comparison dashboard */}
        <div className="mt-16 bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800/50 max-w-3xl mx-auto relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="circuit-pattern opacity-10"></div>
          </div>
          
          <h3 className="text-center text-xl font-bold mb-8 text-white/90 neon-text">TECHNICAL PROFICIENCY</h3>
          <div className="grid grid-cols-3 gap-8">
            {[
              { name: 'FRONTEND', color: '#50FAFA', icon: '💻' },
              { name: 'BACKEND', color: '#FFD129', icon: '🔧' },
              { name: 'TOOLS', color: '#FFFFFF', icon: '🛠️' }
            ].map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-3" 
                     style={{ borderColor: category.color, boxShadow: `0 0 15px ${category.color}40` }}>
                  <span className="text-4xl">{category.icon}</span>
                </div>
                <span className="text-sm font-mono tracking-wider" style={{ color: category.color }}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Cyberpunk corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#50FAFA] rounded-tl-lg corner-animation"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFD129] rounded-tr-lg corner-animation"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FFD129] rounded-bl-lg corner-animation"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#50FAFA] rounded-br-lg corner-animation"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
