import { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      category: 'web',
      image: 'https://via.placeholder.com/600x400?text=E-Commerce+Project',
      technologies: ['React', 'Node.js', 'MongoDB'],
      description: 'A fully functional e-commerce platform with product management, cart functionality, and payment processing.',
      link: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://via.placeholder.com/600x400?text=Banking+App',
      technologies: ['React Native', 'Firebase', 'Redux'],
      description: 'A secure mobile banking application with transaction history, transfers, and account management.',
      link: '#'
    },
    {
      id: 3,
      title: 'Smart Home UI',
      category: 'ui/ux',
      image: 'https://via.placeholder.com/600x400?text=Smart+Home+UI',
      technologies: ['Figma', 'Prototype', 'Animation'],
      description: 'A sleek and intuitive interface design for smart home control systems and automation.',
      link: '#'
    }
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          My Projects
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'web', 'mobile', 'ui/ux'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="flex flex-col bg-black/30 rounded-xl overflow-hidden border border-gray-800">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col p-6 flex-grow">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-300"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;