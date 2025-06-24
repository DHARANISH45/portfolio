import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Get In Touch
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="flex flex-col space-y-6">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-white">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:border-primary text-white"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:border-primary text-white"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-white">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:border-primary text-white resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
              <div className="flex flex-col space-y-4 text-gray-300">
                <a href="mailto:example@email.com" className="flex items-center space-x-3 hover:text-primary transition-colors">
                  <span>example@email.com</span>
                </a>
                <p className="flex items-center space-x-3">
                  <span>City, Country</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold text-white">Social Links</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">GitHub</a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;