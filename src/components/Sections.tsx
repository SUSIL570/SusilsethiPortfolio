import { motion, AnimatePresence } from "motion/react";
import resumeData from "../data/resume.json";
import { Download, ChevronDown, CheckCircle2, Search, Trophy, Briefcase, Code, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Hero() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("resume-print-content");
    if (!element) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.basics.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative pt-20">
      <motion.div variants={fadeUp} className="flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between gap-12 max-w-6xl w-full">
        <div className="space-y-6 max-w-3xl flex-1">
          <h2 className="text-cyan-400 font-mono tracking-wider uppercase text-sm font-bold flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-400/50"></span>
            {resumeData.basics.title}
          </h2>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-slate-100">
            {resumeData.basics.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mt-6">
            {resumeData.basics.summary}
          </p>
          <div className="flex flex-wrap gap-4 pt-8">
            <button
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all flex items-center gap-2 transform hover:scale-105"
            >
              <Briefcase size={20} />
              View Experience
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full backdrop-blur-md transition-all flex items-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {downloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              {downloading ? "Generating..." : "Download Resume"}
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 lg:ml-auto group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm z-10 p-2 transform group-hover:scale-[1.02] transition-transform duration-500">
             <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-slate-900/50">
              <img 
                 src={`https://github.com/SUSIL570.png?v=${new Date().getTime()}`} 
                 alt="Profile" 
                 className="w-full h-full object-cover object-top"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(resumeData.basics.name)}&background=020617&color=22d3ee&size=512`;
                 }}
               />
             </div>
          </div>
          <div className="absolute -bottom-2 -right-2 md:bottom-2 md:right-2 bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-4 shadow-xl z-20 hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-300">Available</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-24">
      <motion.div variants={fadeUp} className="mb-16">
        <h2 className="text-4xl font-display font-bold mb-4 flex items-center gap-4">
          <Briefcase className="text-cyan-400" size={32} />
          Professional Experience
        </h2>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent w-full max-w-md"></div>
      </motion.div>

      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-white/10">
        {resumeData.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="relative pl-16 group"
          >
            <div className="absolute left-6 top-8 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] -translate-x-1/2"></div>
            
            <div 
              onClick={() => setOpenIndex(val => val === idx ? -1 : idx)}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl cursor-pointer hover:bg-white-[0.07] transition-all group-hover:border-cyan-500/30"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{exp.role}</h3>
                  <div className="text-cyan-400 font-medium text-lg">{exp.company}</div>
                </div>
                <div className="text-slate-400 font-mono text-sm bg-black/30 px-3 py-1 rounded-full w-fit">
                  {exp.dates}
                </div>
              </div>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-300 mt-4 leading-relaxed bg-black/20 p-4 rounded-xl">
                      {exp.bullets[0]}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {exp.bullets.slice(1).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-3 text-slate-400 leading-relaxed">
                          <CheckCircle2 className="text-cyan-500/70 shrink-0 mt-1" size={18} />
                          <span>{bullet.replace(/^- /, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-4 flex items-center justify-center pt-2 border-t border-white/5 text-slate-500">
                <ChevronDown size={20} className={`transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="py-24">
      <motion.div variants={fadeUp} className="mb-16">
        <h2 className="text-4xl font-display font-bold mb-4 flex items-center gap-4">
          <Trophy className="text-cyan-400" size={32} />
          Impact & Achievements
        </h2>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent w-full max-w-md"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeData.achievements.map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-colors flex flex-col justify-center"
          >
            <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
              {item.metric}
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {item.context}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="py-24">
      <motion.div variants={fadeUp} className="mb-16">
        <h2 className="text-4xl font-display font-bold mb-4 flex items-center gap-4">
          <Code className="text-cyan-400" size={32} />
          Selected Projects
        </h2>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent w-full max-w-md"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {resumeData.projects.map((proj, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="group flex flex-col h-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all"
          >
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                {proj.dates && (
                  <span className="text-slate-500 text-xs font-mono bg-black/40 px-2 py-1 rounded">
                    {proj.dates}
                  </span>
                )}
              </div>
              <p className="text-slate-300 mb-6 italic leading-relaxed">
                {proj.bullets[0]}
              </p>
              <ul className="space-y-3 mb-8 text-slate-400">
                {proj.bullets.slice(1).map((b, bIdx) => (
                  <li key={bIdx} className="flex gap-3 text-sm">
                    <span className="text-cyan-500 mt-1 flex-shrink-0">▹</span>
                    <span>{b.replace(/^- /, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black/30 p-4 border-t border-white/5 flex flex-wrap gap-2">
              {proj.stack.map(tech => (
                <span key={tech} className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SkillsEducation() {
  return (
    <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Skills */}
      <motion.div variants={fadeUp}>
        <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
          <Search className="text-cyan-400" size={28} />
          Skills Matrix
        </h2>
        <div className="space-y-8">
          {resumeData.skills.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-bold">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div variants={fadeUp}>
        <h2 className="text-3xl font-display font-bold mb-8 text-slate-100">
          Education & Certs
        </h2>
        <div className="space-y-6">
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-slate-200">{edu.degree}</h3>
              <div className="text-cyan-400 mt-1">{edu.institution}</div>
              <div className="text-slate-500 text-sm font-mono mt-3">{edu.dates}</div>
            </div>
          ))}

          <div className="p-6 bg-gradient-to-r from-cyan-950/30 to-blue-900/20 border border-cyan-800/30 rounded-2xl backdrop-blur-md">
            <h3 className="text-sm uppercase tracking-widest text-cyan-400/80 mb-4 font-bold">Certifications</h3>
            <ul className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <li key={cert} className="flex gap-3 text-slate-300">
                  <CheckCircle2 size={18} className="text-cyan-500" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  return (
    <section className="py-24" id="contact">
      <motion.div variants={fadeUp} className="mb-16">
        <h2 className="text-4xl font-display font-bold mb-4 flex items-center gap-4">
          <Mail className="text-cyan-400" size={32} />
          Get In Touch
        </h2>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent w-full max-w-md"></div>
      </motion.div>

      <motion.div variants={fadeUp} className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
        <p className="text-slate-300 mb-8 leading-relaxed text-center">
          Have a question or want to work together? Fill out the form below to send a message directly to my inbox.
          <br/>
          <span className="text-xs text-slate-500 mt-2 block">(Note: First time submission requires email verification via formsubmit.co. Check your inbox!)</span>
        </p>
        
        <form action="https://formsubmit.co/susilsethi570@gmail.com" method="POST" target="_blank" className="space-y-6">
          <input type="hidden" name="_subject" value={`Portfolio Contact from ${formData.name}`} />
          <input type="hidden" name="_template" value="box" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-400">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-400">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-400">Your Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans resize-none"
              placeholder="How can I help you?"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
