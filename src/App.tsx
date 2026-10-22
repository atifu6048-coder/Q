import { useState, useEffect, useRef } from 'react';

// Custom hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Typing animation hook
function useTypingEffect(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

// Navigation Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-black/20 py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <a href="#home" className="text-2xl font-bold gradient-text tracking-tight">
            AC<span className="text-purple-400">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link transition-colors duration-300 text-sm font-medium tracking-wide ${
                  activeSection === link.href.slice(1)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="gradient-bg text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl mb-4 p-4 border border-gray-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-gray-300 hover:text-purple-400 hover:bg-gray-800/50 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const typedText = useTypingEffect(
    ['Full-Stack Developer', 'UI/UX Designer', 'Creative Problem Solver', 'Open Source Contributor'],
    80, 40, 2000
  );

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/5 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Available for work
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-purple-400 text-lg mb-4 tracking-wider uppercase font-medium">Hello, I'm</p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Alex <span className="gradient-text">Chen</span>
          </h1>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-xl sm:text-2xl text-gray-400 mb-8 h-8">
            <span>{typedText}</span>
            <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 animate-pulse"></span>
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            I build exceptional digital experiences that are fast, accessible, and visually stunning.
          </p>
        </div>
        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.8s' }}>
          <a
            href="#projects"
            className="gradient-bg text-white px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-gray-700 text-gray-300 px-8 py-3.5 rounded-full font-medium hover:border-purple-500 hover:text-purple-400 transition-all hover:scale-105 active:scale-95"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-14 flex justify-center space-x-5 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          {[
            { icon: 'fab fa-github', label: 'GitHub' },
            { icon: 'fab fa-linkedin', label: 'LinkedIn' },
            { icon: 'fab fa-twitter', label: 'Twitter' },
            { icon: 'fab fa-dribbble', label: 'Dribbble' },
          ].map((social) => (
            <a
              key={social.label}
              href="#"
              className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
              aria-label={social.label}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-3">Get to know me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">About <span className="gradient-text">Me</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image Area */}
          <div className={`relative flex justify-center transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="w-72 h-80 rounded-3xl gradient-bg p-[2px]">
                <div className="w-full h-full rounded-3xl bg-gray-900 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
                  <div className="text-center relative z-10">
                    <div className="text-8xl mb-4">👨‍💻</div>
                    <p className="text-gray-400 text-sm font-medium">Full-Stack Developer</p>
                    <p className="text-gray-600 text-xs mt-1">Based in San Francisco</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 gradient-bg rounded-2xl opacity-40 blur-sm animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-2xl opacity-30 blur-sm animate-float-delay"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/4 -left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* About Text */}
          <div className={`transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-semibold text-white mb-4 leading-snug">
              Passionate about creating impactful digital solutions
            </h3>
            <p className="text-gray-400 mb-5 leading-relaxed">
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
              {[
                { number: '5+', label: 'Years Exp.' },
                { number: '50+', label: 'Projects' },
                { number: '30+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl glass-card">
                  <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  const { ref, isInView } = useInView(0.1);

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
    <section id="skills" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-3">What I work with</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">My <span className="gradient-text">Skills</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/5 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-purple-400 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-bg rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isInView ? `${skill.level}%` : '0%',
                          transitionDelay: `${catIndex * 150 + skillIndex * 100 + 300}ms`
                        }}
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
  const { ref, isInView } = useInView(0.1);

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
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-3">My recent work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Featured <span className="gradient-text">Projects</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            A selection of my recent work that showcases my skills and passion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card group glass-card rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:shadow-purple-500/10 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image Placeholder */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="project-image absolute inset-0 flex items-center justify-center transition-transform duration-500">
                  <span className="text-6xl drop-shadow-lg">{project.icon}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                {/* Overlay link icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-arrow-up-right-from-corner text-white text-xs"></i>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50"
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
  const { ref, isInView } = useInView(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      <div className="max-w-4xl mx-auto relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-3">Let's connect</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get In <span className="gradient-text">Touch</span></h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-12 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: 'fas fa-envelope', title: 'Email', value: 'alex.chen@example.com' },
              { icon: 'fas fa-map-marker-alt', title: 'Location', value: 'San Francisco, CA' },
              { icon: 'fas fa-clock', title: 'Availability', value: 'Open for freelance projects' },
            ].map((item) => (
              <div key={item.title} className="flex items-start space-x-4 p-4 rounded-xl glass-card hover:border-purple-500/20 transition-all">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <i className={`${item.icon} text-white`}></i>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{item.title}</h4>
                  <p className="text-gray-400 text-sm mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-white font-medium mb-4 text-sm">Follow Me</h4>
              <div className="flex space-x-3">
                {[
                  { icon: 'fab fa-github', label: 'GitHub' },
                  { icon: 'fab fa-linkedin', label: 'LinkedIn' },
                  { icon: 'fab fa-twitter', label: 'Twitter' },
                  { icon: 'fab fa-instagram', label: 'Instagram' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
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
                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                className={`w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                className={`w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                className={`w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all resize-none`}
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-medium transition-all shadow-lg ${
                submitted
                  ? 'bg-green-500 text-white shadow-green-500/25'
                  : 'gradient-bg text-white hover:opacity-90 shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-check"></i> Message Sent!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-paper-plane"></i> Send Message
                </span>
              )}
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
    <footer className="py-8 px-4 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">AC</span>
          <span className="text-gray-600 text-sm">© 2024 Alex Chen. All rights reserved.</span>
        </div>
        <div className="flex space-x-6">
          {['Home', 'About', 'Projects', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
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
