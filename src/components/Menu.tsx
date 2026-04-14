import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  promotionalPrice?: number;
  category: string;
  image?: string;
  priceOptions?: string;
}

const CATEGORIES = ["Especiais", "Sanduíches", "Simples", "Porções", "Bebidas"];

export function Menu() {
  const [activeTab, setActiveTab] = useState<string>("Especiais");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const fetchedItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setItems(fetchedItems);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter items by active tab
  const activeItems = items.filter(item => item.category === activeTab);

  return (
    <section id="cardapio" className="py-24 bg-bg-base border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nosso <span className="text-primary">Cardápio</span>
          </h2>
          <p className="text-text-dim">Descubra sabores únicos em cada hambúrguer artesanal</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar justify-start md:justify-center gap-6 px-2">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 whitespace-nowrap font-bold text-[13px] transition-colors border-b-2",
                activeTab === tab 
                  ? "border-primary text-primary" 
                  : "border-transparent text-text-dim hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-text-dim">Carregando cardápio...</div>
          ) : activeItems.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-text-dim">Nenhum item nesta categoria.</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {activeItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-card border border-[#222] rounded-xl overflow-hidden flex flex-col p-3"
                  >
                    {item.image && (
                      <div className="h-40 overflow-hidden rounded-lg mb-3 bg-[#333]">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1 gap-4">
                        <h3 className="font-bold text-[14px]">{item.name}</h3>
                        <div className="flex flex-col items-end">
                          {item.promotionalPrice ? (
                            <>
                              <span className="font-bold text-text-dim text-[11px] line-through">
                                R$ {item.price.toFixed(2)}
                              </span>
                              <span className="font-bold text-accent text-[14px] whitespace-nowrap">
                                R$ {item.promotionalPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-primary text-[13px] whitespace-nowrap">
                              R$ {item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-[13px] text-text-dim mb-3 flex-grow leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {item.priceOptions && (
                        <p className="text-[11px] text-text-dim mb-3 font-mono bg-[#111] p-2 rounded border border-[#222]">
                          {item.priceOptions}
                        </p>
                      )}
                      <a
                        href="https://instadelivery.com.br/brunolanches5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs transition-colors text-center"
                      >
                        Pedir agora
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
