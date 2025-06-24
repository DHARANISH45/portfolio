import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Intro from './intro';
import Navbar from './nav';
import backgroundVideo from '../assets/v2.mp4';
import image1 from '../assets/1.jpg'

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const contentContainerRef = useRef(null);
  const nameTextRef = useRef(null);
  const descriptionRef = useRef(null);
  const profileRef = useRef(null);
  const videoRef = useRef(null);

  const handleIntroComplete = () => {
    setShowContent(true);
  };
  
  // Main content animations
  useEffect(() => {
    if (showContent && contentContainerRef.current && videoRef.current) {
      // First, set all initial states
      gsap.set(videoRef.current, {
        opacity: 0,
        scale: 1.15  // Start slightly more zoomed in
      });
      
      // Set initial states for text elements
      gsap.set(nameTextRef.current, {
        opacity: 0,
        x: -100,
        y: 30,
        rotateZ: -5
      });      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 30,
        rotateZ: 2
      });
      gsap.set(profileRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -360,
        y: 50
      });
      
      // Create single timeline for synchronized animations
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Start both video and name text at the same time
      tl.to(videoRef.current, {
        opacity: 1,
        scale: 1.05,  // Match the scale from the CSS
        duration: 2.0,
        ease: "power2.out"
      })
      .to(nameTextRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: 1.2,
        ease: "back.out(1.4)"      }, "-=1.8") // Start name animation right after video begins fading in
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 1.2,
        ease: "back.out(1.4)"
      }, "-=0.8")
      .to(profileRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 1.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.9");
    }
  }, [showContent]);
  
  // Custom styles for vignette effect and animations
  const customStyles = `
    .bg-radial-gradient {
      background: radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.7) 150%);
      pointer-events: none;
    }
    
    .muted-text {
      color: rgba(255, 255, 255, 0.75);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    /* Floating animation for decorative elements - enhanced */
    .float {
      animation: floating 6s ease-in-out infinite;
    }
    
    .float-delay {
      animation: floating 6s ease-in-out infinite;
      animation-delay: 1s;
    }
    
    .float-slow {
      animation: floating 8s ease-in-out infinite;
      animation-delay: 2s;
    }
    
    @keyframes floating {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(5deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    
    /* Enhanced 3D floating with perspective */
    .float-3d {
      animation: float3d 10s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    
    @keyframes float3d {
      0% { transform: translateZ(0) translateY(0) rotateX(0deg) rotateY(0deg); }
      25% { transform: translateZ(10px) translateY(-5px) rotateX(3deg) rotateY(5deg); }
      50% { transform: translateZ(5px) translateY(-15px) rotateX(-2deg) rotateY(-3deg); }
      75% { transform: translateZ(8px) translateY(-7px) rotateX(2deg) rotateY(-5deg); }
      100% { transform: translateZ(0) translateY(0) rotateX(0deg) rotateY(0deg); }
    }
    
    /* Subtle pulsing glow - enhanced */
    .pulse-glow {
      animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 0.7; box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
      50% { opacity: 1; box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
      100% { opacity: 0.7; box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
    }
    
    /* Intense pulsing glow for highlights */
    .pulse-intense {
      animation: pulseIntense 3s ease-in-out infinite;
    }
    
    @keyframes pulseIntense {
      0% { opacity: 0.6; filter: brightness(0.9) blur(1px); box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
      50% { opacity: 1; filter: brightness(1.2) blur(0px); box-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 10px rgba(147, 51, 234, 0.5) inset; }
      100% { opacity: 0.6; filter: brightness(0.9) blur(1px); box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
    }
    
    /* Background shapes animation */
    .shape {
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
    }
    
    /* Animated gradient text - enhanced */
    .animated-gradient-text {
      background-size: 300% auto;
      background-position: 0% center;
      animation: gradient-shift 8s ease-in-out infinite;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      letter-spacing: 0.5px;
    }
    
    @keyframes gradient-shift { 
      0% { background-position: 0% center; }
      50% { background-position: 100% center; }
      100% { background-position: 0% center; }
    }    /* Text appear effect - smooth fade in */
    .text-appear {
      animation: textAppear 1.5s ease-out forwards;
    }
    
    @keyframes textAppear {
      from { 
        opacity: 0;
        transform: translateY(10px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Text reveal animation */
    .text-reveal {
      animation: reveal 1.5s cubic-bezier(0.77, 0, 0.18, 1);
    }
    
    @keyframes reveal {
      0% { 
        transform: translateY(100%);
        opacity: 0;
      }
      100% { 
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    /* Button hover effects - enhanced */
    .btn-hover-effect {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .btn-hover-effect:hover {
      box-shadow: 0 0 25px rgba(149, 76, 233, 0.6);
      transform: translateY(-5px) scale(1.03);
    }
    
    /* Spotlight hover effect - enhanced */
    .spotlight {
      position: relative;
      overflow: hidden;
    }
    
    .spotlight:after {
      content: '';
      position: absolute;
      top: -50%;
      left: -60%;
      width: 20%;
      height: 200%;
      opacity: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 100%
      );
      transform: rotate(30deg);
      transition: opacity 0.3s;
    }
    
    .spotlight:hover:after {
      opacity: 1;
      animation: spotlight 1s ease-in-out;
    }
    
    @keyframes spotlight {
      0% { left: -60%; }
      100% { left: 140%; }
    }
    
    /* Background moving particles */
    .particle {
      position: absolute;
      opacity: 0.3;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
      pointer-events: none;
    }
    
    .particle-1 {
      width: 2px;
      height: 2px;
      animation: particle-move 15s linear infinite;
    }
    
    .particle-2 {
      width: 3px;
      height: 3px;
      animation: particle-move 25s linear infinite;
      animation-delay: -5s;
    }
    
    .particle-3 {
      width: 1.5px;
      height: 1.5px;
      animation: particle-move 20s linear infinite;
      animation-delay: -10s;
    }
    
    @keyframes particle-move {
      0% {
        top: 0;
        left: -5%;
        opacity: 0;
      }
      10% {
        opacity: 0.5;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        top: 100%;
        left: 105%;
        opacity: 0;
      }
    }
    
    /* Scroll indicator animation - enhanced */
    .scroll-indicator {
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    
    /* 3D Text effect */
    .text-3d {
      text-shadow: 
        0 1px 0 rgba(255, 255, 255, 0.2),
        0 2px 0 rgba(255, 255, 255, 0.1),
        0 3px 3px rgba(0, 0, 0, 0.3);
      transform: perspective(500px) rotateX(5deg);
    }
    
    /* Glowing border effect */
    .glow-border {
      box-shadow: 0 0 5px rgba(149, 76, 233, 0.3);
      animation: borderGlow 4s ease-in-out infinite;
    }
    
    @keyframes borderGlow {
      0% { box-shadow: 0 0 5px rgba(149, 76, 233, 0.3); }
      50% { box-shadow: 0 0 15px rgba(149, 76, 233, 0.7), 0 0 30px rgba(149, 76, 233, 0.4); }
      100% { box-shadow: 0 0 5px rgba(149, 76, 233, 0.3); }
    }
  `;

  return (
    <>
      {/* Custom styles */}
      <style>{customStyles}</style>
      {/* Navbar only appears after intro complete */}
      {showContent && <Navbar />}
      
      {/* Intro component with enter button */}
      {!showContent && <Intro onComplete={handleIntroComplete} />}
      
      {/* Home content with background video */}
      <div id="home" className={`min-h-screen overflow-hidden bg-black transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
        {/* Main content */}
        <div ref={contentContainerRef} className="relative z-10 min-h-screen">
          {/* Video Background with Optimized Size */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Responsive video container with proper aspect ratio preservation */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                className="absolute object-cover"
                playsInline
                muted
                loop
                autoPlay
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                style={{ 
                  objectFit: 'cover',
                  width: '110%', /* Slightly wider than container for zoom out effect */
                  height: '110%', /* Slightly taller than container for zoom out effect */
                  objectPosition: 'center center',
                  filter: 'brightness(0.5) saturate(1.3) hue-rotate(5deg) contrast(1.1)',
                  transform: 'scale(1.05)', /* Slight zoom out */
                  transformOrigin: 'center center'
                }}>
                <source src={backgroundVideo} type="video/mp4" />
              </video>
            </div>
            {/* Enhanced overlay for better text readability and video appearance */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>
            {/* Additional vignette effect */}
            <div className="absolute inset-0 z-10 bg-radial-gradient"></div>
          </div>
          
          {/* Main content */}
          <div className="w-full max-w-7xl flex flex-col z-20 h-screen mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between px-4 md:px-8 gap-8 w-full h-full">
              <div ref={nameTextRef} className="flex flex-col justify-center items-start w-full md:w-3/5 relative">
                {/* Animated background shapes with enhanced effects */}
                <div className="shape w-40 h-40 blur-3xl -top-20 -left-20 opacity-20 float-slow"></div>
                <div className="shape w-36 h-36 blur-2xl bottom-10 left-40 opacity-15 float"></div>
                <div className="shape w-24 h-24 blur-xl -top-10 right-10 opacity-10 float-delay"></div>
                <div className="shape w-32 h-32 blur-3xl bottom-20 right-20 opacity-10 float-3d bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                
                {/* Particle effects */}
                <div className="particle particle-1" style={{top: '20%', left: '10%'}}></div>
                <div className="particle particle-2" style={{top: '50%', left: '5%'}}></div>
                <div className="particle particle-3" style={{top: '70%', left: '15%'}}></div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute -top-10 -left-6 text-sm text-primary/30 font-mono float-slow">// Hello World</div>
                <div className="absolute -top-4 left-0 w-20 h-[1px] bg-gradient-to-r from-primary/50 to-transparent pulse-glow"></div>
                <div className="absolute top-32 -left-2 transform rotate-90 text-xs text-white/20 font-mono">const developer = {'{'}</div>
                
                {/* Main heading with animated gradient and 3D effect */}
                <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-left animated-gradient-text bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent drop-shadow-md text-3d relative">
                  I am Dharanish
                  <span className="absolute -right-4 -top-4 text-xs text-secondary/40 pulse-glow">v1.0</span>
                </h1>
                
                {/* Subtitle with reveal animation */}
                <h3 className="text-xl text-left text-white/70 mt-1 mb-3 text-reveal">
                  <span className="text-primary font-semibold">Full-Stack Developer</span> & UI Designer
                </h3>
                
                {/* Description with enhanced text effects */}                {/* Description text with smooth fade in */}
                <div className="mt-4">
                  <p ref={descriptionRef} className="text-xl md:text-2xl max-w-2xl text-left muted-text drop-shadow-lg">
                    A professional developer specializing in creating beautiful and functional web experiences.
                  </p>
                </div>
                
                {/* Code snippet decoration */}
                <div className="absolute bottom-28 right-4 text-xs text-white/20 font-mono opacity-70">
                  <div>function createImpact() {'{'}</div>
                  <div className="ml-4">return passion + skills;</div>
                  <div>{'}'}</div>
                </div>
                  
                {/* Enhanced Social Links with animated effects */}                
                <div className="flex items-center space-x-4 mt-8">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/80 group-hover:text-white transition-all duration-300 group-hover:border-primary/50 glow-border">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform duration-300">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </div>
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/80 group-hover:text-white transition-all duration-300 group-hover:border-primary/50 glow-border">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform duration-300">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </div>
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/80 group-hover:text-white transition-all duration-300 group-hover:border-primary/50 glow-border">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform duration-300">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </div>
                  </a>
                </div>
                
                {/* Call to Action Buttons with enhanced effects */}                
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#projects" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium text-lg rounded-lg transition-all duration-300 transform btn-hover-effect shadow-lg shadow-primary/20 hover:shadow-primary/40 relative overflow-hidden group">
                    <span className="relative z-10">View My Work</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                  </a>
                  <a href="#contact" className="px-6 py-3 bg-black/60 border border-white/30 hover:border-white/60 text-white/85 font-medium text-lg rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-black/70 shadow-lg btn-hover-effect">
                    Get In Touch
                  </a>
                </div>
                
                {/* Scroll indicator */}
                <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50">
                  <div className="scroll-indicator text-2xl">▼</div>
                  <div className="text-xs mt-2 opacity-70">Scroll Down</div>
                </div>
              </div>
              
              <div ref={profileRef} className="w-full md:w-2/5 flex justify-center md:justify-end items-center">
                <div className="relative mx-auto md:mx-0 max-w-xs w-full">
                  {/* Enhanced animated decorative elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-2 border-primary/50 rounded-lg transform rotate-12 opacity-70 float"></div>
                  <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-secondary/20 rounded-full float-delay blur-sm"></div>
                  <div className="absolute top-1/4 -right-8 w-6 h-6 bg-primary/30 rounded-full float-slow blur-sm"></div>
                  <div className="absolute bottom-1/3 -left-8 w-4 h-4 bg-white/20 rounded-full float blur-sm"></div>
                  <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-primary/40 rounded-full float-3d"></div>
                  
                  {/* Enhanced code brackets for developer theme */}
                  <div className="absolute -top-8 left-1/4 text-2xl text-primary/40 font-mono float-slow">{'{'}</div>
                  <div className="absolute -bottom-8 right-1/4 text-2xl text-primary/40 font-mono float">{'}'}</div>
                  <div className="absolute top-1/2 -right-10 text-sm text-secondary/30 font-mono transform rotate-90 float-slow">.profile</div>
                  <div className="absolute top-1/4 -left-2 text-xs text-white/20 font-mono transform -rotate-90 float-delay">&lt;Developer/&gt;</div>
                  
                  {/* Enhanced animated decorative lines */}
                  <div className="absolute -top-2 left-0 w-20 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pulse-glow"></div>
                  <div className="absolute -bottom-2 right-0 w-20 h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent pulse-glow" style={{animationDelay: '2s'}}></div>
                  <div className="absolute top-1/2 -left-12 w-10 h-[1px] bg-gradient-to-r from-primary/30 to-transparent pulse-glow" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/4 -right-12 w-10 h-[1px] bg-gradient-to-r from-secondary/30 to-transparent pulse-glow" style={{animationDelay: '1.5s'}}></div>
                  
                  {/* Enhanced glowing frame effects */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm border border-white/10 transform -rotate-3 scale-105 z-0 pulse-intense"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tl from-primary/10 to-secondary/10 transform rotate-2 scale-[1.02] z-0 pulse-glow" style={{animationDelay: '2s'}}></div>
                  
                  {/* Main image with enhanced effects */}
                  <img 
                    src={image1}
                    alt="Dharanish" 
                    className="relative z-10 rounded-xl shadow-xl border-2 border-white/20 object-cover w-full aspect-[4/5] spotlight"
                    style={{filter: 'contrast(1.05) brightness(1.05)'}}
                  />
                  
                  {/* Enhanced image overlays for depth effect */}
                  <div className="absolute inset-0 rounded-xl bg-primary/10 mix-blend-overlay z-20"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent z-30"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-black/20 via-transparent to-transparent mix-blend-multiply z-20"></div>
                  
                  {/* Tech dots decoration with enhanced effects */}
                  <div className="absolute bottom-6 -right-8 flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 pulse-intense"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 pulse-intense" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-400 pulse-intense" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  {/* Visual code-themed decoration at bottom */}
                  <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
                    <div className="px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white/70 border border-white/10 font-mono">// Portfolio 2024</div>
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary/60"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-secondary/60"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-secondary/60"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary/60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
