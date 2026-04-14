import { Flame, Instagram, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#222] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand & About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://www.dropbox.com/scl/fi/9gi98tns5cvb49wqn8cq8/LOGO.png?rlkey=jcuvxnd1nu64mef9fc4pj9sd5&raw=1" 
                alt="Bruno Lanches Logo" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-text-dim text-[13px] leading-relaxed max-w-xs">
              Somos uma hamburgueria artesanal dedicada a criar experiências gastronômicas únicas. Com ingredientes selecionados e receitas exclusivas, cada hambúrguer é preparado com paixão e cuidado.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.instagram.com/brunolanchescn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-dim hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-4 text-white text-[14px]">Contato</h4>
            <ul className="space-y-4 text-[13px] text-text-dim w-full">
              <li>
                <a 
                  href="https://maps.app.goo.gl/1v6iUtq81wQrGEWL6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start md:items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
                >
                  <MapPin size={16} className="shrink-0 mt-0.5 md:mt-0 text-primary" />
                  <span>Av. das Brisas, 2-84 - Parque das Brisas<br/>Caldas Novas - GO, 75690-000</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5564984084104" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-accent" />
                  <span>(64) 98408-4104</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-4 text-white text-[14px]">Horários</h4>
            <ul className="space-y-2 text-[13px] text-text-dim w-full">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"></span>
                <span className="font-bold text-white">ABERTO AGORA</span>
              </li>
              <li className="text-center md:text-left">Seg - Dom • 18h00 às 23h59</li>
              <li className="text-center md:text-left text-primary font-bold">Quartas-feiras • Fechado (Folga coletiva)</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#222] text-center text-[11px] text-text-dim">
          <p>&copy; {new Date().getFullYear()} Bruno Lanches. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
