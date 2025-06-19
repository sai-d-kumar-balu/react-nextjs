// app/portfolio/page.js
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin, Download, Code, Palette, Zap, Users, Linkedin, Twitter, Menu, X } from 'lucide-react'

// Dummy Data
const portfolioData = {
    hero: {
        name: "Saikumar Balu",
        title: "Full Stack Developer (MERN / MEAN)",
        subtitle: "Crafting digital experiences with code and creativity",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        resume: "/documents/saikumar-balu-resume.pdf"
    },
    about: {
        description: "Passionate developer with 2+ years of experience creating innovative web applications and Mobile Apps. I specialize in React, Next.js, React Native, Node Js, Express Js and modern web technologies, with a keen eye for design and user experience.",
        stats: [
            { label: "Projects Completed", value: "5+" },
            { label: "Happy Clients", value: "15+" },
            { label: "Years Experience", value: "2+" },
            { label: "Technologies", value: "10+" }
        ]
    },
    skills: [
        { name: "React/Next.js", level: 95, icon: <Code className="w-6 h-6" /> },
        { name: "Node.js", level: 90, icon: <Zap className="w-6 h-6" /> },
        { name: "UI/UX Design", level: 85, icon: <Palette className="w-6 h-6" /> },
        { name: "Team Leadership", level: 80, icon: <Users className="w-6 h-6" /> }
    ],
    projects: [
        {
            id: 1,
            title: "RxDxStreamline HMS Application",
            description: "Comprehensive Hospital Management System to streamline patient registration, appointments, billing, lab results, medical records, and staff workflows in one unified portal.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tags: ["Next.js", "Socket.io", "Node.js", "React", "Express", "MySQL"],
            github: "#",
            live: "#"
        },
        {
            id: 2,
            title: "Clinisync App",
            description: "Locum‑doctor placement app—enables clinics to book certified temporary doctors or nurses for shift cover in real‑time, manage schedules, and streamline credential verification.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
            tags: ["Ionic Angular", "Socket.io", "MongoDB", "Express", "Node.js"],
            github: "#",
            live: "#"
        },
        {
            id: 3,
            title: "Motherhood App",
            description: "Appointment‑booking solution for regular checkups, video consultations, lab tests and scans—patients can pick slots, pay with Stripe, and receive reminders.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
            tags: ["Ionic Angular", "Node.js", "Tailwind", "MongoDB", "Express", "Stripe"],
            github: "#",
            live: "#"
        }
    ],
    contact: {
        email: "balusaikumar1999@gmail.com",
        phone: "+91 8310659537",
        location: "Bangalore, Karnataka",
        social: {
            github: "https://github.com/sai-d-kumar-balu",
            linkedin: "https://www.linkedin.com/in/saikumarbalu",
            twitter: "https://twitter.com"
        }
    }
}

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('hero')
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        >
                            SB
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    whileHover={{ scale: 1.1 }}
                                    className="text-white hover:text-purple-400 transition-colors font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden pb-4"
                        >
                            <div className="flex flex-col space-y-4">
                                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        whileHover={{ scale: 1.05 }}
                                        className="text-white hover:text-purple-400 transition-colors font-medium py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-0">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-400 rounded-full"
                            animate={{
                                x: [0, Math.random() * 1000],
                                y: [0, Math.random() * 1000],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center z-10 px-4 w-full"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-8"
                    >
                        <img
                            src={portfolioData.hero.image}
                            alt={portfolioData.hero.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-purple-400 shadow-2xl"
                        />
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 px-4"
                    >
                        {portfolioData.hero.name.split(' ').map((word, index) => (
                            <motion.span
                                key={index}
                                className="inline-block"
                                whileHover={{
                                    scale: 1.1,
                                    color: '#a855f7'
                                }}
                            >
                                {word}{' '}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-purple-300 mb-2 px-4"
                    >
                        {portfolioData.hero.title}
                    </motion.p>

                    <motion.p
                        variants={itemVariants}
                        className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto px-4"
                    >
                        {portfolioData.hero.subtitle}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2"
                            onClick={() => {
                                // Programmatically trigger download
                                const link = document.createElement('a');
                                link.href = portfolioData.hero.resume;
                                link.download = `Saikumar-Balu-Resume.pdf`; // Custom filename
                                link.target = '_blank'; // Open in new tab as fallback
                                link.rel = 'noopener noreferrer';
                                link.click();
                            }}
                        >
                            <Download className="w-5 h-5" />
                            Download CV
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-purple-400 text-purple-400 px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition-colors w-full sm:w-auto justify-center"
                        >
                            View Work
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                    <ChevronDown className="w-8 h-8 text-purple-400" />
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 md:py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About Me</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-6"
                        >
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                {portfolioData.about.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {portfolioData.about.stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-3 md:p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                                    >
                                        <div className="text-xl md:text-2xl font-bold text-purple-400">{stat.value}</div>
                                        <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-6 mt-8 md:mt-0"
                        >
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Skills & Expertise</h3>
                            {portfolioData.skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-purple-400">{skill.icon}</div>
                                            <span className="text-white font-medium text-sm md:text-base">{skill.name}</span>
                                        </div>
                                        <span className="text-purple-400 font-semibold text-sm md:text-base">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className="h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-16 md:py-20 px-4 bg-slate-800/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {portfolioData.projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                            >
                                <div className="relative group">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <motion.a
                                            href={project.github}
                                            whileHover={{ scale: 1.1 }}
                                            className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github className="w-5 h-5" />
                                        </motion.a>
                                        <motion.a
                                            href={project.live}
                                            whileHover={{ scale: 1.1 }}
                                            className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </motion.a>
                                    </div>
                                </div>

                                <div className="p-4 md:p-6">
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{project.title}</h3>
                                    <p className="text-sm md:text-base text-gray-300 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-1 md:gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-2 py-1 text-xs md:text-sm bg-purple-400/20 text-purple-300 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4"></div>
                        <p className="text-gray-300 text-base md:text-lg">Ready to work together? Let's create something amazing!</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-400/20 rounded-lg">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Email</h3>
                                    <p className="text-gray-300 text-sm md:text-base">{portfolioData.contact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-400/20 rounded-lg">
                                    <Phone className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Phone</h3>
                                    <p className="text-gray-300 text-sm md:text-base">{portfolioData.contact.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-400/20 rounded-lg">
                                    <MapPin className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Location</h3>
                                    <p className="text-gray-300 text-sm md:text-base">{portfolioData.contact.location}</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="pt-4">
                                <h3 className="text-white font-semibold mb-3">Connect With Me</h3>
                                <div className="flex gap-4">
                                    <motion.a
                                        href={portfolioData.contact.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        className="p-2 bg-white/10 rounded-full hover:bg-purple-400/20 transition-colors"
                                    >
                                        <Github className="w-5 h-5 text-white" />
                                    </motion.a>
                                    <motion.a
                                        href={portfolioData.contact.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        className="p-2 bg-white/10 rounded-full hover:bg-purple-400/20 transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </motion.a>
                                    <motion.a
                                        href={portfolioData.contact.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        className="p-2 bg-white/10 rounded-full hover:bg-purple-400/20 transition-colors"
                                    >
                                        <Twitter className="w-5 h-5 text-white" />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <textarea
                                    rows={5}
                                    placeholder="Your Message"
                                    className="w-full p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none text-sm md:text-base"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base"
                            >
                                Send Message
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 md:py-8 px-4 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-0">
                            © 2024 {portfolioData.hero.name}. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <motion.a
                                href={portfolioData.contact.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={portfolioData.contact.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={portfolioData.contact.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}