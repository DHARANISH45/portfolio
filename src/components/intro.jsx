import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import backgroundVideo from '../assets/v1.mp4';


const Intro = ({ onComplete }) => {
  const welcomeTextRef = useRef(null);  const videoRef = useRef(null);

  // Set video playback speed when component mounts
  useEffect(() => {
    if (videoRef.current) {
      // Increase playback speed (1.5x normal speed)
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  // Initial welcome text animation
  useEffect(() => {
    if (welcomeTextRef.current) {
      // Enhanced welcome text animation with stagger effect
      const tl = gsap.timeline();
      
      // Animate the container with a zoom effect
      tl.fromTo(welcomeTextRef.current,
        { 
          opacity: 0,
          scale: 0.8,
          y: 30
        },
        { 
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }
      )
      
      // Animate individual text elements
      .fromTo(welcomeTextRef.current.querySelectorAll('span'),
        {
          opacity: 0,
          y: 20,
          rotateX: -45
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(2)"
        },
        "-=0.8"
      )
      
      // Subtle hover animation for the container
      .fromTo(welcomeTextRef.current,
        { rotation: -2 },
        { 
          rotation: 2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        },
        "-=0.5"
      );

      // After 5 seconds, fade out welcome text and transition
      const timer = setTimeout(() => {
        gsap.to(welcomeTextRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: "power3.in",
          onComplete: () => onComplete()
        });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [onComplete]);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
      {/* Background Video */}      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        playsInline
        muted
        loop
        autoPlay
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="relative">
          {/* Animated background shapes */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl animate-pulse"></div>
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full animate-spin-slow"></div>
          
          {/* Main welcome text container */}
          <div ref={welcomeTextRef} className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-primary/50 rounded-lg transform rotate-45 animate-bounce-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-secondary/30 rounded-full animate-pulse"></div>
            
            {/* Welcome text */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                Welcome to
              </span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-delayed">
                My Portfolio
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-4 text-lg md:text-xl text-gray-400 opacity-0 animate-fade-in-delayed">
              Let's create something amazing together
            </p>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-primary/30 rounded-full
                       animate-float-${i + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(20px, 0); }
          75% { transform: translate(10px, 10px); }
        }
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-gradient-delayed {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite 0.5s;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 2s forwards;
        }
        .animate-float-1 { animation: float 8s infinite; }
        .animate-float-2 { animation: float 9s infinite; }
        .animate-float-3 { animation: float 10s infinite; }
        .animate-float-4 { animation: float 11s infinite; }
        .animate-float-5 { animation: float 12s infinite; }
        .animate-float-6 { animation: float 13s infinite; }
      `}</style>
    </div>
  );
};

export default Intro;
