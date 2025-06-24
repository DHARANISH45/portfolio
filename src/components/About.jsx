import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoBackground from '../assets/v3.mp4';
import './animations.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [robotHovered, setRobotHovered] = useState(false);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageContainerRef = useRef(null);
  const decorativeElementsRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Set a timeout to ensure we show loading state for at least a brief moment
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);
    useEffect(() => {
    const section = sectionRef.current;
    const textElements = textRef.current;
    const imageContainer = imageContainerRef.current;
    const decorativeElements = decorativeElementsRef.current;
    
    if (!section || !textElements || !imageContainer || !decorativeElements) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        scrub: 0.5 // Smoother animation on scroll
      }
    });
    
    // Animate designer decorative elements
    gsap.set(decorativeElements.querySelectorAll('.designer-element'), { opacity: 0, scale: 0 });
    
    // Dramatic staggered entrance for the design system
    tl.fromTo(section.querySelector('.designer-heading'),
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
      0
    )
    
    // Designer grid entrance animation
    .fromTo(section.querySelectorAll('.designer-grid, .designer-vertical-line, .designer-horizontal-line'),
      { opacity: 0 },
      { opacity: 0.2, stagger: 0.2, duration: 1.5, ease: "power3.out" },
      0.3
    )
    
    // Enhanced 3D robot container entrance
    .fromTo(imageContainer,
      { x: -120, opacity: 0, rotationY: -15, scale: 0.85 },
      { x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.4, ease: "power3.out" },
      0.5
    )
    
    // Designer content card entrance
    .fromTo(textElements,
      { x: 120, opacity: 0, rotationY: 5 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1.4, ease: "power3.out" },
      0.5
    )
    
    // Staggered animation for journey timeline items
    .fromTo(textElements.querySelectorAll('.designer-timeline-item'),
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" },
      1.0
    )
    
    // Animate designer decorative elements with enhanced physics
    .fromTo(decorativeElements.querySelectorAll('.designer-element'),
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, stagger: 0.15, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      0.8
    )
    
    // Designer tags fade in
    .fromTo(textElements.querySelectorAll('.designer-tag'),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      1.3
    );
    
    // Interactive hover effect for the 3D container with video reaction
    if (!isLoading && imageContainer) {
      const container = imageContainer.querySelector('.spline-container');
      if (container) {
        const handleMouseMove = (e) => {
          const rect = imageContainer.getBoundingClientRect();
          const mouseX = e.clientX - rect.left; 
          const mouseY = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const moveX = (mouseX - centerX) / 25;
          const moveY = (mouseY - centerY) / 25;
          
          gsap.to(container, {
            rotateY: moveX * 1.8,
            rotateX: -moveY * 1.2,
            duration: 0.8,
            ease: "power2.out"
          });
            // Video effect follows mouse slightly
          const videoBackdrop = imageContainer.querySelector('.video-backdrop video');
          if (videoBackdrop) {
            gsap.to(videoBackdrop, {
              scale: 1.12,
              x: moveX * 0.5,
              y: moveY * 0.5, 
              duration: 1.2,
              ease: "power1.out"
            });
          }
        };
        
        const handleMouseEnter = () => {
          setRobotHovered(true);
          
          // Scale up video slightly on hover
          const videoBackdrop = imageContainer.querySelector('.video-backdrop video');
          if (videoBackdrop) {
            gsap.to(videoBackdrop, {
              scale: 1.12,
              opacity: 0.6,
              duration: 0.8,
              ease: "power2.out"
            });
          }
        };
        
        const handleMouseLeave = () => {
          setRobotHovered(false);
          gsap.to(container, {
            rotateY: 0,
            rotateX: 3,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)"
          });
            // Reset video on mouse leave
          const videoBackdrop = imageContainer.querySelector('.video-backdrop video');
          if (videoBackdrop) {
            gsap.to(videoBackdrop, {
              scale: 1.10,
              x: 0,
              y: 0,
              opacity: 0.4,
              duration: 1,
              ease: "power2.out"
            });
          }
        };
        
        imageContainer.addEventListener('mousemove', handleMouseMove);
        imageContainer.addEventListener('mouseenter', handleMouseEnter);
        imageContainer.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          imageContainer.removeEventListener('mousemove', handleMouseMove);
          imageContainer.removeEventListener('mouseenter', handleMouseEnter);
          imageContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }
    
    // Return cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [isLoading, robotHovered]);  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden relative bg-gradient-to-b from-black to-gray-900">
      {/* Futuristic Designer Grid Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-full designer-grid opacity-20"></div>
        <div className="absolute right-0 top-0 h-full w-1/4 designer-vertical-line"></div>
        <div className="absolute left-0 bottom-0 w-full h-1/4 designer-horizontal-line"></div>
      </div>
      
      {/* Decorative floating elements with new designer style */}
      <div ref={decorativeElementsRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="designer-element absolute top-[10%] left-[8%] w-24 h-24 designer-shape-diamond"></div>
        <div className="designer-element absolute bottom-[20%] right-[12%] w-36 h-36 designer-shape-circle"></div>
        <div className="designer-element absolute top-[40%] right-[15%] w-16 h-16 designer-shape-triangle"></div>
        <div className="designer-element absolute top-[65%] left-[18%] w-20 h-20 designer-shape-square"></div>
        <div className="designer-element absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[300px] designer-line"></div>
        <div className="designer-element absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-[200px] designer-line-reverse"></div>
      </div>
      
      <div className="container mx-auto relative z-20">
        <div className="designer-heading relative mb-20 overflow-hidden">
          <div className="designer-heading-chip absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-6 bg-primary/30 rounded-full blur-sm"></div>
          <h2 className="text-5xl md:text-7xl font-black text-center relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-text">
              ABOUT ME
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-width"></div>
          </h2>
          <div className="designer-heading-chip absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-6 bg-secondary/30 rounded-full blur-sm"></div>
        </div>
        
        {/* Main Content Container - Diagonal/Asymmetric Layout */}
        <div className="flex flex-col md:flex-row gap-12">          
          {/* Left Side - 3D Robot over Video */}
          <div ref={imageContainerRef} className="w-full md:w-[55%] md:translate-y-[-40px] h-[600px] relative perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Designer loader */}
                  <div className="relative">
                    <div className="designer-loader"></div>
                    <div className="designer-loader-inner"></div>
                    <div className="designer-loader-text absolute top-full mt-6 text-center w-full text-primary font-mono">
                      Loading Experience
                      <span className="animate-blink">.</span>
                      <span className="animate-blink animation-delay-200">.</span>
                      <span className="animate-blink animation-delay-400">.</span>
                    </div>
                  </div>
                </div>
              ) : (                <div className="relative w-full h-full group">
                  {/* Video backdrop behind the 3D model */}
                  <div className="absolute inset-0 mb-8 rounded-lg overflow-hidden video-backdrop">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      className="w-full h-full object-cover scale-110 opacity-40" 
                    >
                      <source src={videoBackground} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
                  </div>
                  
                  {/* Designer frame with enhanced borders */}
                  <div className="absolute inset-0 w-full h-full spline-container overflow-hidden rounded-lg border-2 border-primary/20 bg-black/30 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-700">
                    {/* Increased size of Spline container */}
                    <div className="w-full h-[calc(100%+60px)] scale-[1.08] translate-y-[-30px]">
                      <Spline
                        scene="https://prod.spline.design/kfQ5uBVzpHbHqb9K/scene.splinecode"
                        onLoad={() => setIsLoading(false)}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                      />
                    </div>
                    {/* Enhanced overlay that covers the bottom where the watermark appears */}
                    <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                  </div>
                  
                  {/* Designer overlay elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-md"></div>
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-md"></div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-secondary/60 rounded-bl-md"></div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-secondary/60 rounded-br-md"></div>
                    
                    {/* Designer scan lines */}
                    <div className="absolute inset-0 designer-scanlines opacity-10 group-hover:opacity-5 transition-opacity duration-300"></div>
                    
                    {/* Designer UI elements */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1">
                      <div className="designer-dot"></div>
                      <div className="designer-dot animation-delay-200"></div>
                      <div className="designer-dot animation-delay-400"></div>
                    </div>
                    
                    {/* Designer coordinates */}
                    <div className="absolute bottom-4 left-4 text-xs text-primary/60 font-mono designer-coordinates">
                      x:142.45 y:308.12 z:0.35
                    </div>
                    
                    {/* Battery/power indicator */}
                    <div className="absolute top-4 left-4 flex items-center">
                      <div className="w-16 h-3 border border-primary/40 rounded-sm overflow-hidden flex items-center">
                        <div className="h-full bg-gradient-to-r from-primary/80 to-secondary/80 w-3/4 animate-power-level"></div>
                      </div>
                      <span className="ml-1 text-xs text-primary/60 font-mono">PWR</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Designer Journey Timeline */}
          <div ref={textRef} className="w-full md:w-[45%] md:translate-y-[40px]">
            <div className="designer-card p-8 rounded-xl relative overflow-hidden">
              {/* Designer card effects */}
              <div className="absolute inset-0 designer-card-bg"></div>
              <div className="absolute inset-0 designer-card-noise opacity-5"></div>
              
              {/* Designer heading with icon */}
              <div className="flex items-center mb-10 journey-title relative">
                <div className="designer-dash"></div>
                <h3 className="text-3xl font-extrabold">
                  <span className="designer-text-gradient">MY JOURNEY</span>
                </h3>
                <div className="ml-auto">
                  <div className="tech-icon designer-icon-container">
                    <span className="designer-icon-symbol text-primary/90">&#60;/&#62;</span>
                  </div>
                </div>
              </div>
              
              {/* Designer timeline with horizontal orientation */}
              <div className="designer-timeline relative">
                <div className="designer-timeline-item mb-8 journey-item">
                  <div className="flex items-start">
                    <div className="designer-timeline-dot"></div>
                    <div className="ml-4">
                      <h4 className="designer-timeline-heading">Passionate Developer</h4>
                      <p className="designer-timeline-text">
                        I am a passionate developer with expertise in creating modern web applications.
                        My journey in tech started with a curiosity about how things work on the internet.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="designer-timeline-item mb-8 journey-item">
                  <div className="flex items-start">
                    <div className="designer-timeline-dot dot-secondary"></div>
                    <div className="ml-4">
                      <h4 className="designer-timeline-heading">Years of Experience</h4>
                      <p className="designer-timeline-text">
                        With several years of experience in web development, I've worked on various projects 
                        ranging from small business websites to complex enterprise applications.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="designer-timeline-item journey-item">
                  <div className="flex items-start">
                    <div className="designer-timeline-dot dot-gradient"></div>
                    <div className="ml-4">
                      <h4 className="designer-timeline-heading">Constant Learning</h4>
                      <p className="designer-timeline-text">
                        I'm constantly learning new technologies and methodologies to improve my skills
                        and deliver better solutions to my clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Designer footer elements */}
              <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="designer-tag">Designer</div>
                <div className="designer-tag">Developer</div>
                <div className="designer-tag">Creator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;