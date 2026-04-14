import { motion } from "motion/react";
import { Flame } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop" 
          alt="Hambúrguer Artesanal" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-bg-base/80 to-bg-base" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center text-center w-full">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1.5 }}
          className="w-40 h-40 md:w-48 md:h-48 mb-8 flex items-center justify-center drop-shadow-[0_0_20px_rgba(255,76,0,0.2)]"
        >
          <img 
            src="https://www.dropbox.com/scl/fi/9gi98tns5cvb49wqn8cq8/LOGO.png?rlkey=jcuvxnd1nu64mef9fc4pj9sd5&raw=1" 
            alt="Bruno Lanches Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 leading-tight"
        >
          O Melhor da<br/>
          <span className="text-primary">
            Cidade
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-text-dim max-w-2xl mb-10 px-4"
        >
          Sabores únicos preparados com ingredientes selecionados e muito amor. Peça agora e surpreenda-se!
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col w-full sm:w-auto gap-4 px-4 sm:px-0"
        >
          <a 
            href="https://instadelivery.com.br/brunolanches5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            Fazer pedido agora
          </a>
          <div className="flex gap-4 w-full">
            <a 
              href="https://www.ifood.com.br/delivery/caldas-novas-go/bruno-lanches-parque-das-brisas-iii/c0a0e077-bcc5-4737-bc93-463d6eb4fbf3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 rounded-lg bg-[#EA1D2C] hover:bg-[#EA1D2C]/90 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              Pedir no iFood
            </a>
            <a 
              href="https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=Av.%20das%20Brisas%2C%202-84%20-%20Parque%20das%20Brisas%2C%20Caldas%20Novas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 rounded-lg bg-white hover:bg-gray-100 text-black font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              Venha de Uber
            </a>
          </div>
          <a 
            href="#cardapio"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#222] border border-[#333] hover:bg-[#333] text-white font-bold text-sm transition-colors flex items-center justify-center"
          >
            Ver cardápio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
