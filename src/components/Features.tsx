import { motion } from "motion/react";
import { ChefHat, Medal, Clock } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Receitas Exclusivas",
    description: "Hambúrgueres artesanais criados com receitas únicas e sabores inigualáveis."
  },
  {
    icon: Medal,
    title: "Ingredientes Premium",
    description: "Selecionamos apenas os melhores ingredientes frescos para garantir qualidade excepcional."
  },
  {
    icon: Clock,
    title: "Preparo na Hora",
    description: "Cada hambúrguer é preparado fresh na hora do pedido para máximo sabor e qualidade."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Por que escolher o <span className="text-primary">BRUNO LANCHES?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-[#222] rounded-2xl p-5 text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#333] flex items-center justify-center mb-3 text-primary">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-text-dim text-[13px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
