import { useState, useEffect, useRef } from 'react';
import Tooltip from './Tooltip';
import { motion, useInView, useAnimation } from 'framer-motion';
import instagramImage from '../assets/2.jpeg'; // Instagram image
import fitcheckImage from '../assets/3.png'; // FitCheck image
import dockerImage from '../assets/4.jpg'; // Docker project image
import kkBuildersImage from '../assets/5.jpg'; // KK Construction image

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Page scroll animation trigger
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation for filter change - simplified to avoid timing issues
  useEffect(() => {
    const animateFilter = async () => {
      await controls.start({ y: 20, opacity: 0, transition: { duration: 0.2 } });
      setAnimateCard({ y: 100, opacity: 0 });
      
      setTimeout(() => {
        setAnimateCard({ y: 0, opacity: 1 });
        controls.start("visible");
      }, 400);
    };
    
    animateFilter();
  }, [activeFilter, controls]);
  
  // Animation variants - simplified for better reliability
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  // Actual projects data
  const projects = [
    {
      id: 1,
      title: 'FitCheck Web Application',
      category: 'web',
      image: fitcheckImage, // Using the imported FitCheck image
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      description: 'A comprehensive fitness tracking web application built with the MERN stack, allowing users to track workouts, set goals, and monitor progress.',
      link: 'https://github.com/DHARANISH45/FitCheck-MERN-stack'
    },
    {
      id: 2,
      title: 'Instagram Clone',
      category: 'web',
      image: instagramImage, // Using the imported Instagram image
      technologies: ['React', 'Vite', 'CSS', 'JavaScript'], // Removed Frontend, added Vite
      description: 'A frontend clone of Instagram with user interface and core functionalities implemented using modern React practices.',
      link: 'https://github.com/DHARANISH45/Instagram-clone'
    },
    {
      id: 3,
      title: 'KK Builders Portfolio',
      category: 'web',
      image: kkBuildersImage, // Using the imported KK Builders image
      technologies: ['React', 'Vite', 'Node.js', 'Responsive Design'], // Updated tech stack
      description: 'A professional portfolio website for KK Construction company showcasing their services, projects, and company information.',
      link: 'https://github.com/DHARANISH45/KK-BUILDERS-PORTFOLIO'
    },
    {
      id: 4,
      title: 'DevOps Instagram Clone',
      category: 'devops',
      image: dockerImage, // Using the imported Docker project image
      technologies: ['Docker', 'Prometheus', 'Grafana', 'Monitoring'],
      description: 'Containerized Instagram clone application with system monitoring using Prometheus and Grafana for performance tracking and visualization.',
      link: 'https://github.com/DHARANISH45/devops_final_project'
    }
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <motion.section 
      id="projects" 
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black py-20 px-4 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            rotate: 360, 
            x: ['-10%', '60%'],
            y: ['20%', '60%']
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute -left-40 top-10 w-80 h-80 rounded-full bg-gradient-to-r from-primary/30 to-transparent blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360, 
            x: ['40%', '-10%'],
            y: ['60%', '30%'] 
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute -right-40 bottom-10 w-80 h-80 rounded-full bg-gradient-to-l from-secondary/30 to-transparent blur-3xl"
        />
        
        {/* Additional animated elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
        />
        
        {/* Grid pattern overlay - using CSS instead of image dependency */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
               backgroundSize: "40px 40px"
             }}>
        </div>
        
        {/* Code-like animated background elements */}
        <div className="absolute top-20 left-10 text-primary/10 text-xs font-mono hidden md:block">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ 
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }}
            >
              {`{code: ${Math.random().toString(36).substring(7)}}`}
            </motion.div>
          ))}
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-secondary/20 rounded-full"></div>
        
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${i % 3 + 1} h-${i % 3 + 1} rounded-full ${
              i % 2 === 0 ? 'bg-primary/50' : 'bg-secondary/50'
            }`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [null, "-100%"],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl flex flex-col items-center z-10">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative"
        >
          My Projects
          <motion.span 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
          />
        </motion.h2>
        
        {/* Filter buttons - simplified */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['all', 'web', 'devops'].map(filter => {
            const tooltipText = {
              'all': 'View all projects',
              'web': 'View web development projects',
              'devops': 'View DevOps projects'
            }[filter];
            
            return (
              <Tooltip key={filter} text={tooltipText}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/40'
                      : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </motion.button>
              </Tooltip>
            );
          })}
        </motion.div>

        {/* Project cards - simplified hover interactions */}
        <motion.div 
          animate={animateCard}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full"
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="flex flex-col rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 group"
              style={{
                background: "linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%)",
                borderRadius: "1.5rem",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400?text=${project.title.replace(/ /g, '+')}`;
                  }}
                />
                {/* Simple overlay that works reliably */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-5 w-full">
                    <div className="flex justify-between items-center">
                      <span className="bg-primary/20 text-primary text-xs uppercase tracking-wider py-1 px-3 rounded-full font-semibold backdrop-blur-sm">
                        {project.category}
                      </span>
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-white text-xs w-8 h-8 flex items-center justify-center rounded-full bg-primary/30 backdrop-blur-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 flex-grow">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:-translate-y-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Tooltip text={`View ${project.title} on GitHub`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Project
                  </a>
                </Tooltip>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 mb-6 text-primary opacity-50 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </div>
            <p className="text-gray-400 text-center">No projects found in this category.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Projects;