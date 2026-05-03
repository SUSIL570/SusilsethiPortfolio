import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import { Hero, Experience, Achievements, Projects, SkillsEducation, Contact } from "./components/Sections";
import { AnimatePresence, motion } from "motion/react";
import resumeData from "./data/resume.json";
import PrintResume from "./components/PrintResume";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="print:hidden min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
        <AnimatedBackground />

      <AnimatePresence mode="wait">
        {loading && <Splash key="splash" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-24 lg:gap-32">
            <motion.div 
              id="home"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
            >
              <Hero />
            </motion.div>
            
            <motion.div 
              id="experience"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
            >
              <Experience />
            </motion.div>
            
            <motion.div 
              id="achievements"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
            >
              <Achievements />
            </motion.div>
            
            <motion.div 
              id="projects"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
            >
              <Projects />
            </motion.div>
            
            <motion.div 
              id="education"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
            >
              <SkillsEducation />
            </motion.div>
            
            <motion.div 
              id="contact"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
            >
              <Contact />
            </motion.div>
          </main>
          
          <footer className="py-12 mt-12 text-center text-slate-500 text-sm border-t border-white/5 bg-black/20">
            <div className="flex flex-col items-center gap-4">
              <span className="font-display font-bold text-xl text-slate-400">SS.</span>
              <p className="max-w-md px-6">
                {resumeData.basics.name} • {resumeData.basics.location} <br/>
                <a href="#contact" className="hover:text-cyan-400" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>{resumeData.basics.email}</a> • {resumeData.basics.phone}
              </p>
              <p className="text-xs opacity-50 mt-4">{resumeData.extra[0]}</p>
            </div>
          </footer>
        </motion.div>
      )}
      </div>
      <PrintResume />
    </>
  );
}
