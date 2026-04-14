import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    text: "Melhor hambúrguer artesanal da cidade! Ingredientes frescos e sabor incrível. O X-Da Casa Gigante é sensacional.",
    rating: 5
  },
  {
    name: "Amanda Costa",
    text: "Adorei o hambúrguer artesanal: sabor equilibrado, porção generosa e atendimento simpático. Voltarei com certeza!",
    rating: 5
  },
  {
    name: "Roberto Alves",
    text: "Melhor burger da cidade! Pão fresquinho, carne suculenta e tempero perfeito. Recomendo muito a batata com cheddar.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-bg-base border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-[#222] rounded-xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-text-dim mb-6 text-[13px] leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-xs font-bold text-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="text-[13px] font-bold text-white">{testimonial.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-card border border-[#222] rounded-2xl p-10 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Pronto para experimentar?</h2>
          <p className="text-text-dim text-[13px] mb-8">Faça seu pedido agora e prove o melhor hambúrguer artesanal da cidade</p>
          <a 
            href="https://instadelivery.com.br/brunolanches5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-colors"
          >
            Fazer pedido
          </a>
        </div>
      </div>
    </section>
  );
}
