import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from './nav';
import Tooltip from './Tooltip';
import backgroundVideo from '../assets/v2.mp4';
import profileImage from '../assets/1.jpg';

const Home = () => {
  const contentContainerRef = useRef(null);
  const nameTextRef = useRef(null);
  const descriptionRef = useRef(null);
  const profileRef = useRef(null);
  const videoRef = useRef(null);
  
  // Animation effects for content and profile image
  useEffect(() => {
    // Basic fade-in animation for the main content
    if (contentContainerRef.current) {
      gsap.fromTo(contentContainerRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.5,
          ease: "power1.out"
        }
      );
    }
    
    // Profile image animation
    if (profileRef.current) {
      // Initial state - slightly scaled down and rotated
      gsap.set(profileRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
      });
      
      // Animate profile image entrance with slight delay
      gsap.to(profileRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3, // Start after content begins to appear
        ease: "back.out(1.2)", // Slight overshoot for dynamic effect
      });
      
      // Add subtle floating animation that runs continuously
      gsap.to(profileRef.current.querySelector('.profile-container'), {
        y: 10,
        duration: 2,
        repeat: -1, // Infinite repetition
        yoyo: true, // Go back and forth
        ease: "sine.inOut", // Smooth sinusoidal easing
        delay: 1.2, // Start after entrance animation completes
      });
    }
  }, []);
  
  // Minimal required styles - removed all animation-related CSS
  const customStyles = `
    /* Removed almost all custom styles to improve performance */
    
    /* Basic text styles */
    .muted-text {
      color: rgba(255, 255, 255, 0.75);
    }
    
    /* Enhanced profile image animations and edge effects */
    .profile-container {
      transform: perspective(1000px);
      transition: transform 0.6s ease, box-shadow 0.6s ease;
      position: relative;
      z-index: 1;
    }
    
    .profile-container::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6, #6366f1);
      border-radius: inherit;
      opacity: 0.5;
      z-index: -1;
      transition: opacity 0.6s ease, filter 0.6s ease;
    }
    
    .profile-container:hover::before {
      opacity: 0.8;
      filter: brightness(1.2);
    }
    
    .profile-container:hover {
      transform: perspective(1000px) rotateY(5deg) translateZ(10px);
    }
    
    .image-frame {
      transition: all 0.6s ease;
      position: relative;
      z-index: 1;
    }
    
    .profile-image {
      transition: transform 0.6s ease, filter 0.6s ease;
      position: relative;
      z-index: 2;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.97));
    }
    
    .profile-container:hover .profile-image {
      transform: scale(1.02);
      filter: brightness(1.1) contrast(1.08);
    }
    
    @keyframes border-pulse {
      0% { box-shadow: 0 0 0 0px rgba(99, 102, 241, 0.2), 0 0 10px 0 rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3), 0 0 20px 0 rgba(139, 92, 246, 0.5); }
      100% { box-shadow: 0 0 0 0px rgba(99, 102, 241, 0.2), 0 0 10px 0 rgba(59, 130, 246, 0.3); }
    }
    
    .profile-container {
      animation: border-pulse 4s infinite ease-in-out;
    }
  `;

  return (
    <>
      {/* Custom styles */}
      <style>{customStyles}</style>
      {/* Navbar always visible now */}
      <Navbar />
      
      {/* Home content with background video */}
      <div id="home" className="min-h-screen overflow-hidden bg-black transition-all duration-1000 opacity-100 scale-100">
        {/* Main content */}
        <div ref={contentContainerRef} className="relative z-10 min-h-screen">
          {/* Video Background with Simplified Setup */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Simplified video container */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                className="absolute object-cover w-full h-full"
                playsInline
                muted
                loop
                autoPlay
                preload="none" 
                disablePictureInPicture
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  filter: 'brightness(0.5)'
                }}>
                <source src={backgroundVideo} type="video/mp4" />
              </video>
            </div>
            {/* Simple dark overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
          </div>
          
          {/* Main content */}
          <div className="w-full max-w-7xl flex flex-col z-20 h-screen mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center md:items-stretch md:justify-between px-4 md:px-8 gap-8 w-full h-full pt-16 md:pt-0">
              <div ref={nameTextRef} className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 relative">
                {/* Removed most decorative elements */}
                
                {/* Main heading with simplified gradient effect */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 text-center md:text-left bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent relative">
                  Dharanish
                  <span className="absolute -right-4 -top-4 text-xs text-secondary/40">v1.0</span>
                </h1>
                
                {/* Subtitle with no animation */}
                <h3 className="text-xl text-center md:text-left text-white/70 mt-1 mb-3">
                  <span className="text-primary font-semibold">Full-Stack Developer</span> & UI Designer
                </h3>
                
                {/* Description with simplified text effects */}
                <div className="mt-4">
                  <p ref={descriptionRef} className="text-lg sm:text-xl md:text-2xl max-w-2xl text-center md:text-left text-white/75">
                    A professional developer specializing in creating beautiful and functional web experiences.
                  </p>
                </div>
                
                {/* Removed code snippet decoration */}
                    {/* Simplified Social Links */}                
                <div className="flex items-center justify-center md:justify-start space-x-4 mt-8">
                  <Tooltip text="Check my GitHub repositories">
                    <a href="https://github.com/DHARANISH45" target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                      </div>
                    </a>
                  </Tooltip>
                  
                  <Tooltip text="Connect with me on LinkedIn">
                    <a href="https://www.linkedin.com/in/dharanish-s-l-474566259/" target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                      </div>
                    </a>
                  </Tooltip>
                  
                  <Tooltip text="View my certificates on Credly">
                    <a href="https://www.credly.com/users/dharanish-s-l-22itr018/" target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L1 7v10l11 5 11-5V7L12 2zm0 2.5L20.76 9 12 13.56 3.24 9 12 4.5zm-8 6.32l8 3.6 8-3.6V16.5l-8 3.6-8-3.6v-5.68z"/>
                        </svg>
                      </div>
                    </a>
                  </Tooltip>
                </div>
                  {/* Simplified Call to Action Buttons */}                
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  <Tooltip text="Check out my projects section">
                    <a href="#projects" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white font-medium text-base sm:text-lg rounded-lg transition-all duration-300">
                      View My Work
                    </a>
                  </Tooltip>
                  
                  <Tooltip text="Reach out through the contact form">
                    <a href="#contact" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-black/60 border border-white/30 hover:border-white/60 text-white/85 font-medium text-base sm:text-lg rounded-lg transition-all duration-300">
                      Get In Touch
                    </a>
                  </Tooltip>
                </div>
                
                {/* Simple scroll indicator */}
                <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50">
                  <div className="text-2xl">▼</div>
                  <div className="text-xs mt-2">Scroll Down</div>
                </div>
              </div>
              
              <div ref={profileRef} className="w-full md:w-2/5 flex justify-center md:justify-end items-center mt-8 md:mt-0">
                <div className="mx-auto md:mx-0 max-w-[220px] sm:max-w-xs w-full relative z-20">
                  {/* Profile image with enhanced edges and glow effect */}
                  <div className="profile-container relative bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-indigo-500/40 p-1 rounded-2xl shadow-2xl transition-all duration-500 hover:from-blue-500/60 hover:via-purple-500/50 hover:to-indigo-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                    <div className="image-frame p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                      <img 
                        src={profileImage}
                        alt="Dharanish" 
                        className="w-full h-auto rounded-lg object-cover shadow-xl profile-image"
                        style={{ 
                          aspectRatio: '3/4',
                          width: '100%',
                          maxWidth: '100%',
                          height: 'auto',
                          maxHeight: '400px',
                          display: 'block'
                        }}
                      />
                    </div>
                  </div>
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
