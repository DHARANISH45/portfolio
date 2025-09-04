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
    // Only show loading for a brief moment, no GSAP or scroll animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-12 md:py-20 px-4 overflow-hidden relative bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto relative z-20">
        <div className="mb-10 md:mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
            ABOUT ME
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
          {/* Left Side - 3D Robot over Video */}
          <div ref={imageContainerRef} className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4">
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
              ) : (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
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
                  <div className="absolute inset-0 w-full h-full spline-container overflow-hidden rounded-lg border-2 border-primary/20 bg-black/30 backdrop-blur-sm">
                    <div className="w-full h-full">
                      <Spline
                        scene="https://prod.spline.design/kfQ5uBVzpHbHqb9K/scene.splinecode"
                        onLoad={() => setIsLoading(false)}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Right Side - Designer Journey Timeline */}
          <div ref={textRef} className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="designer-card p-5 md:p-8 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 designer-card-bg"></div>
              <div className="absolute inset-0 designer-card-noise opacity-5"></div>
              <div className="flex items-center mb-6 md:mb-10 journey-title relative">
                <div className="designer-dash"></div>
                <h3 className="text-2xl md:text-3xl font-extrabold">
                  <span className="designer-text-gradient">MY JOURNEY</span>
                </h3>
                <div className="ml-auto">
                  <div className="tech-icon designer-icon-container">
                    <span className="designer-icon-symbol text-primary/90">&#60;/&#62;</span>
                  </div>
                </div>
              </div>
              <div className="designer-timeline relative">
                <div className="designer-timeline-item mb-6 md:mb-8">
                  <div className="flex items-start">
                    <div className="designer-timeline-dot"></div>
                    <div className="ml-3 md:ml-4">
                      <h4 className="designer-timeline-heading text-lg md:text-xl">Frontend Developer & UI Designer</h4>
                      <p className="designer-timeline-text text-sm md:text-base">
                        I'm a final year student with a passion for creating stunning web experiences. 
                        I blend code and creativity to transform ideas into engaging, responsive interfaces.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="designer-timeline-item mb-6 md:mb-8">
                  <div className="flex items-start">
                    <div className="designer-timeline-dot dot-secondary"></div>
                    <div className="ml-3 md:ml-4">
                      <h4 className="designer-timeline-heading text-lg md:text-xl">Academic Journey</h4>
                      <p className="designer-timeline-text text-sm md:text-base">
                        Currently pursuing my final year in Information Technology. I've been consistently 
                        exploring the intersection of technology and design through coursework and personal projects.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="designer-timeline-item">
                  <div className="flex items-start">
                    <div className="designer-timeline-dot dot-gradient"></div>
                    <div className="ml-3 md:ml-4">
                      <h4 className="designer-timeline-heading text-lg md:text-xl">Design Philosophy</h4>
                      <p className="designer-timeline-text text-sm md:text-base">
                        I believe in creating designs that not only look spectacular but also provide 
                        intuitive user experiences. Every pixel matters in crafting digital solutions 
                        that stand out in today's competitive landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-white/10 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-3">
                <div className="designer-tag text-xs md:text-sm">Frontend Dev</div>
                <div className="designer-tag text-xs md:text-sm">UI/UX</div>
                <div className="designer-tag text-xs md:text-sm">Creative Coder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;