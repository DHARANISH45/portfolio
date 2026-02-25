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
    // ScrollTrigger animation for the section
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('h2'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24 px-4 overflow-hidden relative bg-black">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

      <div className="container mx-auto relative z-20">
        <div className="mb-12 md:mb-24 text-center">
          <div className="inline-block relative">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ME</span>
            </h2>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center">
          {/* Left Side - 3D Robot (Hidden on small mobile for performance) */}
          <div ref={imageContainerRef} className="hidden sm:block w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[650px] relative group">
            {/* Glossy ring behind robot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[450px] aspect-square rounded-full border border-white/5 bg-white/2 shadow-[0_0_100px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_150px_rgba(59,130,246,0.2)] transition-all duration-1000"></div>

            <div className="relative w-full h-full spline-container overflow-hidden rounded-[3rem]">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl z-30">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                  </div>
                  <div className="text-blue-400 font-mono text-sm tracking-widest animate-pulse">SYSTEM INITIALIZING...</div>
                </div>
              )}

              <div className="w-full h-full pointer-events-auto sm:scale-100 md:scale-110 lg:scale-125 transform-gpu origin-center">
                <Spline
                  scene="https://prod.spline.design/kfQ5uBVzpHbHqb9K/scene.splinecode"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Education & Info */}
          <div ref={textRef} className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-6">
              {/* Profile Bio Card */}
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-bold tracking-widest uppercase">Mobile Developer</span>
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-bold tracking-widest uppercase">Full-Stack Developer</span>
                </div>
                <p className="text-base md:text-2xl text-white/90 leading-relaxed font-light">
                  Enthusiastic <span className="text-blue-400 font-medium">Information Technology</span> undergraduate with experience in
                  <span className="text-white font-medium"> Flutter</span> mobile app development, <span className="text-white font-medium">React</span> web applications, and <span className="text-white font-medium">DevOps</span> tools.
                  Seeking a <span className="text-blue-400 font-medium">Mobile Application Developer</span> role to apply technical skills in real-world projects.
                </p>
              </div>

              {/* Education Timeline */}
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center mr-4">
                    <span className="text-xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Academic Journey</h3>
                </div>

                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

                  {/* KEC */}
                  <div className="relative pl-10">
                    <div className="absolute left-[3px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-1">
                      <h4 className="text-lg font-bold text-white">B.Tech Information Technology</h4>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-blue-400 text-xs font-mono border border-blue-500/20">2022 - 2026</span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">Kongu Engineering College</p>
                    <div className="text-xs font-bold text-blue-300">CGPA: 6.94</div>
                  </div>

                  {/* HSC */}
                  <div className="relative pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="absolute left-[3px] top-1.5 w-2 h-2 rounded-full bg-indigo-500"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-1">
                      <h4 className="text-lg font-bold text-white">HSC</h4>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs font-mono">2022</span>
                    </div>
                    <p className="text-white/40 text-sm">Vivekananda Matric Higher Secondary School</p>
                    <div className="text-xs font-bold text-white/50">Score: 72.16%</div>
                  </div>

                  {/* SSLC */}
                  <div className="relative pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="absolute left-[3px] top-1.5 w-2 h-2 rounded-full bg-purple-500"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-1">
                      <h4 className="text-lg font-bold text-white">SSLC</h4>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs font-mono">2020</span>
                    </div>
                    <p className="text-white/40 text-sm">Vivekananda Matric Higher Secondary School</p>
                    <div className="text-xs font-bold text-white/50">Score: 87.6%</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-4 mt-2">
                {['Mobile App Developer', 'Fullstack Developer', 'Cloud computing'].map(tag => (
                  <span key={tag} className="px-6 py-2 rounded-2xl bg-white/5 border border-white/5 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-blue-500/40 hover:text-blue-400 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;