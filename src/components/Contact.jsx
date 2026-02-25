import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tooltip from './Tooltip';
import emailjs from '@emailjs/browser';
import './contact.css';
import { validateTemplateParams } from '../emailjs-template-helper';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_yo16z4d';
const EMAILJS_TEMPLATE_ID = 'template_r5dvawe';
const EMAILJS_PUBLIC_KEY = 'I-8rfS4bSH7-sYddY';

// Initialize EmailJS with error handling
try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('EmailJS initialized successfully');
} catch (error) {
  console.error('Failed to initialize EmailJS:', error);
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formFocus, setFormFocus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null); // Form reference for DOM element
  const infoRef = useRef(null);
  const particlesRef = useRef(null);

  // GSAP animations and other useEffects will be below

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      // Clear any previous errors
      setFormErrors({});

      // Create the template parameters object with proper field names
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        // Add more fields to ensure message content is visible
        subject: "New Contact Message from Portfolio",
        name: formData.name,
        email: formData.email,
        to_name: "Dharanish", // Your name as the recipient
        // Add a timestamp for uniqueness
        timestamp: new Date().toISOString()
      };

      console.log('Sending email with params:', templateParams);
      console.log('Using EmailJS config:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY
      });

      // Send the email with EmailJS
      sendEmailWithRetry(templateParams, 0);
    }
  };

  // Helper function to send email with retry capability
  const sendEmailWithRetry = (templateParams, retryCount, maxRetries = 2) => {
    // Add essential message verification
    if (!templateParams.message) {
      console.error('Missing message content in template params');
      setFormErrors({ submit: "Error: Message content is missing" });
      setIsSubmitting(false);
      return;
    }

    // Validate template parameters
    try {
      const validation = validateTemplateParams(templateParams);
      if (!validation.valid) {
        console.error('Invalid template params:', validation);
        setFormErrors({ submit: `Error: Missing required fields: ${validation.missingFields.join(', ')}` });
        setIsSubmitting(false);
        return;
      }
    } catch (e) {
      console.warn('Template validation error:', e);
    }

    // Log template params for debugging
    console.log('Template params:', {
      ...templateParams,
      message: templateParams.message.substring(0, 30) + '...' // Show only start of message
    });

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setIsSubmitting(false);
        setShowSuccess(true);

        // Reset form after showing success message
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        }, 3000);
      })
      .catch((error) => {
        console.error(`Error sending email (attempt ${retryCount + 1}):`, error);

        // Detailed error logging
        if (error.status) {
          console.error(`EmailJS error status: ${error.status}`);
        }
        if (error.text) {
          console.error(`EmailJS error details: ${error.text}`);
        }

        // Try again if we haven't exceeded max retries
        if (retryCount < maxRetries) {
          console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
          setTimeout(() => {
            sendEmailWithRetry(templateParams, retryCount + 1, maxRetries);
          }, 1000); // Wait 1 second before retrying
          return;
        }

        // All retries failed, show error to user
        let errorMessage = "Failed to send message. Please try again or contact directly via email.";

        if (error.status === 404) {
          if (error.text && error.text.includes("Account not found")) {
            errorMessage = "EmailJS account not found. Please verify your EmailJS account setup.";
          } else {
            errorMessage = "Email service not found. Please contact via the direct email link below.";
          }
        } else if (error.status === 400) {
          errorMessage = "Invalid form data. Please check all fields and try again.";
        } else if (error.status === 401 || error.status === 403) {
          errorMessage = "Authentication error. Please contact via the direct email link below.";
        } else if (error.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (!navigator.onLine) {
          errorMessage = "You appear to be offline. Please check your internet connection.";
        }

        setIsSubmitting(false);
        setFormErrors({ submit: errorMessage });

        // Show direct contact information after max retries
        if (error.status === 404 || error.status === 401 || error.status === 403) {
          const additionalInfo = error.text && error.text.includes('Account not found') ?
            " The EmailJS account was not found. This could be due to an expired account or incorrect public key." :
            " You can email me directly using the link below.";

          setFormErrors(prev => ({
            ...prev,
            fallback: true,
            debug: null, // Clear any debug messages
            submit: errorMessage + additionalInfo
          }));
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Map field names from EmailJS template fields to our state properties
    const fieldMap = {
      'from_name': 'name',
      'reply_to': 'email',
      'message': 'message'
    };

    // Get the corresponding state field name
    const stateField = name === 'from_name' ? 'name' :
      name === 'reply_to' ? 'email' : 'message';

    setFormData(prev => ({
      ...prev,
      [stateField]: value
    }));

    // Clear error when user starts typing
    if (formErrors[stateField]) {
      setFormErrors(prev => ({
        ...prev,
        [stateField]: null
      }));
    }
  };

  const handleFocus = (field) => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus(null);
  };

  // Initialize particle animation
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    // Create particles
    const createParticles = () => {
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;

        // Random position
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;

        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;

        // Random duration between 15s and 40s
        const duration = Math.random() * 25 + 15;

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.opacity = opacity;

        // Create unique animation
        const direction = Math.random() > 0.5 ? 1 : -1;
        const xMovement = Math.random() * 50 * direction;
        const yMovement = Math.random() * 50 * direction;

        particle.animate(
          [
            { transform: `translate(0, 0)`, opacity: opacity },
            { transform: `translate(${xMovement}px, ${yMovement}px)`, opacity: opacity * 0.5 },
            { transform: `translate(0, 0)`, opacity: opacity }
          ],
          {
            duration: duration * 1000,
            iterations: Infinity
          }
        );

        particlesContainer.appendChild(particle);
      }
    };

    createParticles();

    // Create floating code elements
    const codeElements = ['{...}', '</>', '<div>', '()', '// code'];
    const floatingElementsCount = 6;

    for (let i = 0; i < floatingElementsCount; i++) {
      const flyingEl = document.createElement('div');
      flyingEl.classList.add('flying-element');

      // Random code element
      flyingEl.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];

      // Random position
      flyingEl.style.top = `${Math.random() * 80 + 10}%`;

      // Random delay
      flyingEl.style.animationDelay = `${Math.random() * 15}s`;

      particlesContainer.appendChild(flyingEl);
    }

    // Create data ripples
    const createRipple = () => {
      const ripple = document.createElement('div');
      ripple.classList.add('data-ripple');

      // Random position
      ripple.style.left = `${Math.random() * 100}%`;
      ripple.style.top = `${Math.random() * 100}%`;

      // Random size
      const size = Math.random() * 100 + 50;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      particlesContainer.appendChild(ripple);

      // Remove after animation completes
      setTimeout(() => {
        if (ripple && ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 2000);
    };

    // Create ripples at intervals
    const rippleInterval = setInterval(createRipple, 3000);

    return () => {
      clearInterval(rippleInterval);
    };
  }, []);  // Animation for page elements on scroll  
  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !form || !info) return;

    // Initial state setup
    gsap.set([form, info], { opacity: 0, y: 50 });
    gsap.set(form.querySelectorAll("input, textarea, button"), { opacity: 0, y: 20 });
    gsap.set(info.querySelectorAll("h3, a, p, div.social-links a"), { opacity: 0, y: 20 });
    gsap.set(section.querySelectorAll(".shape"), { opacity: 0, scale: 0.8 });
    gsap.set([form.querySelectorAll(".tech-dot"), info.querySelectorAll(".tech-dot")], { opacity: 0, scale: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate title safely
    const title = section.querySelector("h2");
    if (title) {
      tl.fromTo(title, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    }

    // Left side animations (form)
    tl.to(form, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

    const formFields = form.querySelectorAll("input, textarea");
    if (formFields.length > 0) {
      tl.to(formFields, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "back.out(1.2)" }, "-=0.4");
    }

    const formButton = form.querySelector("button");
    if (formButton) {
      tl.to(formButton, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
    }

    // Right side animations (info)
    tl.to(info, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

    const infoItems = info.querySelectorAll("h3, a, p, .social-links a");
    if (infoItems.length > 0) {
      tl.to(infoItems, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }, "-=0.4");
    }

    // Decorative shapes
    const shapes = section.querySelectorAll(".shape");
    if (shapes.length > 0) {
      tl.fromTo(shapes, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=1.5");
    }

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  // Component continues with the return statement below

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-20 px-3 sm:px-4 relative overflow-hidden">
      {/* Designer background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>

      {/* Designer grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="designer-grid w-full h-full"></div>
      </div>

      {/* Particles animation background */}
      <div ref={particlesRef} className="particles-container absolute inset-0 pointer-events-none"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shape absolute top-[10%] left-[10%] w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-xl"></div>
        <div className="shape absolute bottom-[15%] right-[10%] w-40 h-40 bg-gradient-to-bl from-secondary/5 to-transparent rounded-full blur-xl"></div>
        <div className="shape absolute top-[60%] right-[15%] w-24 h-24 bg-primary/5 rounded-full blur-lg"></div>
        <div className="shape absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="shape absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl flex flex-col items-center relative z-10">
        <div className="relative mb-8 sm:mb-12 flex flex-col items-center">
          <div className="hidden sm:block absolute -left-12 top-1/2 transform -translate-y-1/2 w-16 h-8 bg-primary/30 rounded-full blur-md"></div>
          <h2 className="text-2xl sm:text-4xl md:text-7xl font-black text-center relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary uppercase">
              Keep In Touch
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </h2>
          <div className="hidden sm:block absolute -right-12 top-1/2 transform -translate-y-1/2 w-16 h-8 bg-secondary/30 rounded-full blur-md"></div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 relative">
          {/* Contact Form */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-6 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-gray-800/50 bg-black/20 shadow-xl relative group hover-reveal">
              {/* Design corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/60 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/60 rounded-br-lg"></div>

              {/* Left side tech dots decorator */}
              <div className="absolute top-5 left-5 flex space-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400/50 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>

              {/* Left side decorative element */}
              <div className="absolute bottom-5 left-5 px-3 py-1.5 rounded-lg bg-black/40 border border-primary/30 text-xs text-gray-300 flex items-center space-x-2 hover:scale-110 hover:border-primary transition-all duration-300">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                <span>Get in Touch</span>
              </div>

              {/* Form fields */}
              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="name" className="text-white/90 font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 sm:px-4 sm:py-4 bg-black/30 border border-gray-700 rounded-lg text-white text-sm sm:text-base transition-all duration-300 outline-none focus:border-primary hover:border-gray-500 ${formErrors.name ? 'input-error' : formData.name ? 'input-success' : ''}`}
                    required
                  />
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${formFocus === 'name' ? 'w-full' : ''}`}></div>
                </div>
                <div className={`error-message ${formErrors.name ? 'visible' : ''}`}>
                  <span className="error-icon">⚠️</span>
                  {formErrors.name}
                </div>
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="email" className="text-white/90 font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="reply_to"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 sm:px-4 sm:py-4 bg-black/30 border border-gray-700 rounded-lg text-white text-sm sm:text-base transition-all duration-300 outline-none focus:border-primary hover:border-gray-500 ${formErrors.email ? 'input-error' : formData.email ? 'input-success' : ''}`}
                    required
                  />
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${formFocus === 'email' ? 'w-full' : ''}`}></div>
                </div>
                <div className={`error-message ${formErrors.email ? 'visible' : ''}`}>
                  <span className="error-icon">⚠️</span>
                  {formErrors.email}
                </div>
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="message" className="text-white/90 font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2"></span>
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full px-3 py-3 sm:px-4 sm:py-4 bg-black/30 border border-gray-700 rounded-lg text-white text-sm sm:text-base resize-none transition-all duration-300 outline-none focus:border-primary hover:border-gray-500 ${formErrors.message ? 'input-error' : formData.message && formData.message.length >= 10 ? 'input-success' : ''}`}
                    required
                  ></textarea>
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${formFocus === 'message' ? 'w-full' : ''}`}></div>
                </div>
                <div className={`error-message ${formErrors.message ? 'visible' : ''}`}>
                  <span className="error-icon">⚠️</span>
                  {formErrors.message}
                </div>
              </div>

              {/* Debug message removed */}

              {/* Display general submit error if any */}
              {formErrors.submit && (
                <div className="error-message visible mt-4">
                  <span className="error-icon">⚠️</span>
                  {formErrors.submit}
                  {(formErrors.fallback || formErrors.submit.includes("account not found") || formErrors.submit.includes("service not found") || formErrors.submit.includes("Failed to send")) ? (
                    <div className="mt-2">
                      <span className="text-sm">Or email me directly: </span>
                      <a
                        href="mailto:dharanishslc@gmail.com"
                        className="text-sm text-primary hover:underline"
                      >
                        dharanishslc@gmail.com
                      </a>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="flex justify-center">
                <Tooltip text="Send me a message">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-primary/20 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 relative overflow-hidden border border-primary/50 hover:border-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : "Send Message"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </button>
                </Tooltip>
              </div>

              {/* Success message overlay */}
              <div className={`success-message ${showSuccess ? 'visible' : ''}`}>
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <h3 className="text-2xl font-bold text-white mt-6">Message Sent!</h3>
                <p className="text-gray-300 mt-2">Thank you for reaching out!</p>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="flex flex-col space-y-5 sm:space-y-8 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-gray-800/50 bg-black/20 shadow-xl h-fit relative hover-reveal">
            {/* Design corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/60 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/60 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-lg"></div>

            {/* Contact info section */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-primary to-secondary mr-3 rounded-full"></div>
                Contact Information
              </h3>
              <div className="flex flex-col space-y-4 sm:space-y-6 text-gray-300">
                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-primary/30 flex items-center justify-center mr-4 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Phone</span>
                    <a href="tel:+918438058354" className="font-medium hover:text-primary transition-colors duration-300">
                      +91 8438058354
                    </a>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-primary/30 flex items-center justify-center mr-4 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Email</span>
                    <a href="mailto:dharanishslc@gmail.com" className="font-medium hover:text-primary transition-colors duration-300">
                      dharanishslc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-secondary/30 flex items-center justify-center mr-4 group-hover:border-secondary group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Location</span>
                    <span className="font-medium">Namakkal, India</span>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-primary/30 flex items-center justify-center mr-4 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Response Time</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider with gradient */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

            {/* Social links section */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-primary to-secondary mr-3 rounded-full"></div>
                Connect With Me
              </h3><div className="social-links flex space-x-3 sm:space-x-4 pl-4"><Tooltip text="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/dharanish-sl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-black/50 border border-gray-700/50 hover:border-primary flex items-center justify-center text-gray-300 hover:text-primary hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </Tooltip>

                <Tooltip text="GitHub ">
                  <a
                    href="https://github.com/DHARANISH45"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-black/50 border border-gray-700/50 hover:border-primary flex items-center justify-center text-gray-300 hover:text-primary hover:scale-110 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </Tooltip>

                {/* Credly badge removed as requested */}
              </div>
            </div>

            {/* Designer element: Tech dots */}
            <div className="absolute top-5 right-5 flex space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-400/50 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>

            {/* New interactive element: tech badge */}
            <div className="absolute bottom-5 right-5 px-3 py-1.5 rounded-lg bg-black/40 border border-primary/30 text-xs text-gray-300 flex items-center space-x-2 hover:scale-110 hover:border-primary transition-all duration-300">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>Designer & Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;