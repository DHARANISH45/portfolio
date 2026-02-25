import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Navbar from './nav';
import Tooltip from './Tooltip';
import backgroundVideo from '../assets/v2.mp4';
import profileImage from '../assets/1.jpg';

const Home = () => {
  const contentContainerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Generic content fade-in
    if (contentContainerRef.current) {
      gsap.fromTo(contentContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  const customStyles = `
    .hero-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.01);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .cyber-frame {
      position: relative;
      border-radius: 2.5rem;
      padding: 4px;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5));
      overflow: hidden;
    }

    .cyber-frame::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transform: translateX(-100%);
      animation: sweep 3s infinite linear;
    }

    @keyframes sweep {
      100% { transform: translateX(100%); }
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <Navbar />

      <div id="home" className="min-h-screen overflow-hidden bg-black relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          <video
            ref={videoRef}
            className="absolute object-cover w-full h-full opacity-30"
            playsInline muted loop autoPlay
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>

        <div ref={contentContainerRef} className="relative z-20 w-full max-w-7xl mx-auto min-h-screen flex items-center px-4 md:px-8 py-20 md:py-0">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-12">

            <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-2xl sm:text-5xl md:text-8xl font-black mb-3 sm:mb-4 tracking-tighter leading-tight md:leading-none">
                  <span className="bg-gradient-to-r from-blue-400 via-white to-purple-500 bg-clip-text text-transparent uppercase">
                    DHARANISH S L
                  </span>
                </h1>

                <div className="flex items-center gap-3 mb-4 sm:mb-6 justify-center md:justify-start">
                  <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[9px] sm:text-sm font-mono tracking-tight shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    B.Tech IT @ Kongu Engineering College
                  </span>
                </div>

                <h3 className="text-base sm:text-xl md:text-3xl text-white/90 font-light mb-4 sm:mb-6 tracking-wide">
                  <span className="text-blue-400 font-medium">Mobile Developer</span> & <span className="text-purple-400 font-medium">Full-Stack</span>
                </h3>

                <p className="text-xs sm:text-sm md:text-xl max-w-xl text-white/60 leading-relaxed mb-5 sm:mb-8 px-2 md:px-0">
                  Crafting high-performance <span className="text-white/90">Flutter</span> experiences and
                  scalable <span className="text-white/90">React</span> architectures with a DevOps mindset.
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-6 mb-6 sm:mb-10 justify-center md:justify-start">
                  <Tooltip text="GitHub Profile">
                    <a href="https://github.com/DHARANISH45" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="sm:w-5 sm:h-5">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </Tooltip>
                  <Tooltip text="LinkedIn Connect">
                    <a href="https://www.linkedin.com/in/dharanish-sl/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="sm:w-5 sm:h-5">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                  </Tooltip>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center md:justify-start">
                  <a href="#projects" className="w-full sm:w-auto text-center px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-xl shadow-white/5">
                    View My Work
                  </a>
                  <a href="/Resume.pdf" download className="w-full sm:w-auto text-center px-5 py-2.5 sm:px-8 sm:py-4 bg-white/5 border border-white/20 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 flex items-center justify-center gap-2 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="group-hover:translate-y-0.5 transition-transform">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                    Download CV
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="w-full md:w-2/5 flex justify-center items-center relative order-1 md:order-2 mb-6 md:mb-0">
              <div className="hero-glow"></div>

              <div className="relative w-full max-w-[200px] sm:max-w-[320px] lg:max-w-[420px]">
                {/* Profile Image with Cyber Frame */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="cyber-frame shadow-2xl z-10"
                >
                  <img
                    src={profileImage}
                    alt="Dharanish S L"
                    className="w-full aspect-[4/5] object-cover rounded-[2.3rem] filter contrast-110 brightness-90 transition-all duration-700 hover:brightness-100"
                  />

                  {/* Energy Corners */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/40"></div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/40"></div>
                </motion.div>

                {/* Decorative Tech Bit (Minimal) */}
                <div className="absolute -top-10 -right-10 w-32 h-32 border border-blue-500/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 border border-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
