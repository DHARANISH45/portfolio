const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
          Skills & Expertise
        </h2>
        
        <div className="w-full md:w-5/6 md:ml-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 h-full">
            <h3 className="text-2xl font-semibold text-white mb-4 border-b border-primary/30 pb-2">
              <span className="text-primary">&lt;</span> Technical Skills <span className="text-primary">/&gt;</span>
            </h3>
      
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white/90 mb-3">Frontend</h4>
              <div className="flex flex-wrap gap-3">
                {["React", "Next.js", "TypeScript", "TailwindCSS", "HTML5", "CSS3"].map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-primary/10 rounded-full text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white/90 mb-3">Backend</h4>
              <div className="flex flex-wrap gap-3">
                {["Node.js", "Express", "MongoDB", "PostgreSQL", "REST API", "GraphQL"].map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-secondary/10 rounded-full text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white/90 mb-3">Tools & Others</h4>
              <div className="flex flex-wrap gap-3">
                {["Git", "Docker", "CI/CD", "AWS", "Firebase", "Figma"].map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-700/30 rounded-full text-white/80 border border-white/10 hover:bg-gray-700/50 transition-colors">
                    {skill}
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

export default Skills;
