import { Home, Briefcase, Trophy, Code, BookOpen, Mail } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "achievements", label: "Impact", icon: Trophy },
  { id: "projects", label: "Projects", icon: Code },
  { id: "education", label: "Skills", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 items-center gap-8 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-400 focus:outline-none"
          >
            <item.icon size={20} />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
