import { motion } from "motion/react";
import { Flame } from "lucide-react";

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-base/90 backdrop-blur-md border-b border-[#222]"
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://www.dropbox.com/scl/fi/9gi98tns5cvb49wqn8cq8/LOGO.png?rlkey=jcuvxnd1nu64mef9fc4pj9sd5&raw=1" 
            alt="Bruno Lanches Logo" 
            className="h-10 w-auto"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold text-text-dim">
          <a href="#inicio" className="hover:text-white transition-colors">Início</a>
          <a href="#cardapio" className="hover:text-white transition-colors">Cardápio</a>
          <a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a>
        </nav>

        <a 
          href="https://instadelivery.com.br/brunolanches5" 
          target="_blank" 
          rel="noopener noreferrer"
          className="md:hidden text-xs font-bold text-primary hover:text-white transition-colors uppercase"
        >
          Fazer Pedido
        </a>
      </div>
    </motion.header>
  );
}
