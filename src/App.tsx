import { useState, useEffect } from 'react';

// Navigation Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-2xl font-bold gradient-text">AC</a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg mb-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <p className="text-purple-400 text-lg mb-4 tracking-wider uppercase">Hello, I'm</p>
        </div>
        <div className="animate-fade-in-up-delay-1">
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
            Alex <span className="gradient-text">Chen</span>
          </h1>
        </div>
        <div className="animate-fade-in-up-delay-2">
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Full-Stack Developer & UI/UX Designer crafting beautiful digital experiences
          </p>
        </div>
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="gradient-bg text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-gray-600 text-gray-300 px-8 py-3 rounded-full font-medium hover:border-purple-500 hover:text-purple-400 transition-all"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center space-x-6 animate-fade-in-up-delay-3">
          <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-2xl">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-2xl">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-2xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-2xl">
            <i className="fab fa-dribbble"></i>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About <span className="gradient-text">Me</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image Area */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-2xl gradient-bg p-1">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👨‍💻</div>
                    <p className="text-gray-400 text-sm">Full-Stack Developer</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 gradient-bg rounded-xl opacity-50 blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-xl opacity-30 blur-sm"></div>
            </div>
          </div>

          {/* About Text */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Passionate about creating impactful digital solutions
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I'm a full-stack developer with 5+ years of experience building web applications 
              that are not only functional but also beautiful and intuitive. I specialize in 
              React, TypeScript, Node.js, and modern web technologies.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new design trends, contributing to 
              open-source projects, or sharing knowledge through blog posts and tech talks.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-gray-500 text-sm mt-1">Years Exp.</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-gray-500 text-sm mt-1">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">30+</div>
                <div className="text-gray-500 text-sm mt-1">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 80 },
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'GraphQL', level: 78 },
      ]
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git / GitHub', level: 92 },
        { name: 'Docker', level: 80 },
        { name: 'AWS / Cloud', level: 75 },
        { name: 'Figma', level: 85 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">My <span className="gradient-text">Skills</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">{skill.name}</span>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-bg rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with real-time inventory, payment processing, and admin dashboard.',
      tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
      color: 'from-purple-500 to-blue-500',
      icon: '🛒',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop, and team features.',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
      color: 'from-blue-500 to-cyan-500',
      icon: '📋',
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered platform that generates marketing copy, blog posts, and social media content.',
      tags: ['Python', 'OpenAI', 'React', 'FastAPI'],
      color: 'from-cyan-500 to-green-500',
      icon: '🤖',
    },
    {
      title: 'Fitness Tracker',
      description: 'Mobile-first fitness application with workout plans, progress tracking, and social features.',
      tags: ['React Native', 'Firebase', 'Charts', 'Auth'],
      color: 'from-green-500 to-yellow-500',
      icon: '💪',
    },
    {
      title: 'Real Estate Platform',
      description: 'Property listing platform with virtual tours, map integration, and mortgage calculator.',
      tags: ['Vue.js', 'Mapbox', 'Node.js', 'MongoDB'],
      color: 'from-yellow-500 to-orange-500',
      icon: '🏠',
    },
    {
      title: 'Music Streaming App',
      description: 'Spotify-inspired music player with playlists, recommendations, and social sharing.',
      tags: ['React', 'GraphQL', 'AWS', 'Redis'],
      color: 'from-orange-500 to-red-500',
      icon: '🎵',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured <span className="gradient-text">Projects</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            A selection of my recent work that showcases my skills and passion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group glass-card rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project Image Placeholder */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="project-image absolute inset-0 flex items-center justify-center transition-transform duration-500">
                  <span className="text-6xl">{project.icon}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In <span className="gradient-text">Touch</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-envelope text-white"></i>
              </div>
              <div>
                <h4 className="text-white font-medium">Email</h4>
                <p className="text-gray-400">alex.chen@example.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-map-marker-alt text-white"></i>
              </div>
              <div>
                <h4 className="text-white font-medium">Location</h4>
                <p className="text-gray-400">San Francisco, CA</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-clock text-white"></i>
              </div>
              <div>
                <h4 className="text-white font-medium">Availability</h4>
                <p className="text-gray-400">Open for freelance projects</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-white font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full gradient-bg text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
            >
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2024 Alex Chen. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#home" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Home</a>
          <a href="#about" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">About</a>
          <a href="#projects" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Projects</a>
          <a href="#contact" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
