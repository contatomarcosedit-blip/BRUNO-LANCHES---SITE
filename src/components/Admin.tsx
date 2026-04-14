import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import { Flame, Plus, Pencil, Trash2, LogOut, Database } from "lucide-react";

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

const INITIAL_DATA = [
  { category: "Especiais", name: "X-Da Casa Gigante", description: "Pão, 3 hambúrguer, frango, filé mignon, presunto, mussarela, 2 ovos, bacon, cheddar, 2 salsichas, milho, salada e batata palha.", price: 48.00, image: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800&auto=format&fit=crop" },
  { category: "Especiais", name: "X-Da Casa", description: "Pão, 2 hambúrguer, frango, presunto, mussarela, ovo, bacon, salsichas, milho, salada e batata palha.", price: 35.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
  { category: "Especiais", name: "X-Bacon Tudo", description: "Pão, hambúrguer, presunto, mussarela, ovo, mais bacon, salsichas, milho, salada e batata palha.", price: 25.00, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop" },
  { category: "Especiais", name: "X-Super Tudo", description: "Pão, 2 hambúrguer, presunto, mussarela, ovo, bacon, salsichas, milho, salada e batata palha.", price: 24.00, image: "https://images.unsplash.com/photo-1594212691516-436f8f6c268c?q=80&w=800&auto=format&fit=crop" },
  { category: "Sanduíches", name: "X-Tudo", description: "Pão, (frango/hambúrguer/filé mignon), presunto, mussarela, ovo, bacon, salsichas, milho, salada e batata palha.", price: 23.00, priceOptions: "Caseiro: R$ 23 | Frango: R$ 21 | Filé Mignon: R$ 27" },
  { category: "Sanduíches", name: "X-Bacon Especial", description: "Pão, (frango/hambúrguer/filé mignon), presunto, mussarela, ovo, bacon, salada e batata palha.", price: 22.00, priceOptions: "Caseiro: R$ 22 | Frango: R$ 20 | Filé Mignon: R$ 28" },
  { category: "Sanduíches", name: "X-Bacon Simples", description: "Pão, (frango/hambúrguer/filé mignon), presunto, mussarela, bacon, salada e batata palha.", price: 21.00, priceOptions: "Caseiro: R$ 21 | Frango: R$ 29 | Filé Mignon: R$ 23" },
  { category: "Sanduíches", name: "X-Salada Especial", description: "Pão, (frango/hambúrguer/filé mignon), presunto, mussarela, ovo, salada e batata palha.", price: 18.00, priceOptions: "Caseiro: R$ 18 | Frango: R$ 16 | Filé Mignon: R$ 20" },
  { category: "Sanduíches", name: "X-Salada Simples", description: "Pão, (frango/hambúrguer/filé mignon), presunto, mussarela, salada e batata palha.", price: 16.00, priceOptions: "Caseiro: R$ 16 | Frango: R$ 15 | Filé Mignon: R$ 18" },
  { category: "Sanduíches", name: "X-Burguer", description: "Pão, hambúrguer, presunto, mussarela e batata palha.", price: 15.00, priceOptions: "Caseiro: R$ 15 | Frango: R$ 14 | Filé Mignon: R$ 17" },
  { category: "Simples", name: "X-Americano", description: "Pão, presunto, mussarela, ovo, salada e batata palha.", price: 11.00 },
  { category: "Simples", name: "Bauru", description: "Pão, presunto, mussarela e tomate.", price: 10.00 },
  { category: "Simples", name: "Misto Quente", description: "Pão, presunto e mussarela.", price: 9.00 },
  { category: "Porções", name: "Batata Frita Simples", description: "Porção de 500g de batata frita crocante.", price: 25.00 },
  { category: "Porções", name: "Batata com Cheddar e Bacon", description: "Porção de 500g com cheddar cremoso e bacon crocante.", price: 30.00 },
  { category: "Bebidas", name: "Refrigerante Lata", description: "Coca Cola, Guaraná, Sukita, Mineiro, Sprint, Coca Zero", price: 5.00 },
  { category: "Bebidas", name: "Refrigerante 600ml", description: "Guaraná Antarctica e Sukita", price: 7.00 },
  { category: "Bebidas", name: "H2OH!", description: "", price: 8.00 },
  { category: "Bebidas", name: "Coca Cola 600ml", description: "", price: 8.00 },
  { category: "Bebidas", name: "Coca Cola 1L", description: "", price: 10.00 },
  { category: "Bebidas", name: "Coca Cola 2L", description: "", price: 15.00 },
  { category: "Bebidas", name: "Mineiro 2L", description: "", price: 10.00 },
  { category: "Bebidas", name: "Suco Lata", description: "Caju, Uva, Maracujá", price: 7.00 },
  { category: "Bebidas", name: "Suco 1L", description: "Caju, Uva, Maracujá", price: 10.00 },
  { category: "Bebidas", name: "Água S/ Gás", description: "", price: 3.00 },
  { category: "Bebidas", name: "Água C/ Gás", description: "", price: 4.00 },
  { category: "Bebidas", name: "Cerveja Lata", description: "Antarctica e Skol", price: 5.00 },
  { category: "Bebidas", name: "Cerveja Lata", description: "Amstel e Brahma", price: 6.00 },
  { category: "Bebidas", name: "Heineken Lata", description: "", price: 10.00 }
];

export function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "", description: "", price: 0, promotionalPrice: 0, category: "Especiais", image: "", priceOptions: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const fetchedItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setItems(fetchedItems);
    }, (error) => {
      console.error("Error fetching menu items:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
      alert("Erro ao fazer login.");
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const seedDatabase = async () => {
    if (window.confirm("Isso vai adicionar todos os itens padrão ao banco de dados. Deseja continuar?")) {
      try {
        for (const item of INITIAL_DATA) {
          await addDoc(collection(db, "menuItems"), item);
        }
        alert("Itens adicionados com sucesso!");
      } catch (error) {
        console.error("Error seeding database:", error);
        alert("Erro ao adicionar itens. Verifique se você tem permissão de administrador.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        ...(formData.description && { description: formData.description }),
        ...(formData.promotionalPrice && { promotionalPrice: Number(formData.promotionalPrice) }),
        ...(formData.image && { image: formData.image }),
        ...(formData.priceOptions && { priceOptions: formData.priceOptions })
      };

      if (isEditing) {
        await updateDoc(doc(db, "menuItems", isEditing.id), dataToSave);
      } else {
        await addDoc(collection(db, "menuItems"), dataToSave);
      }
      
      setFormData({ name: "", description: "", price: 0, promotionalPrice: 0, category: "Especiais", image: "", priceOptions: "" });
      setIsEditing(null);
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Erro ao salvar item. Verifique se você tem permissão de administrador.");
    }
  };

  const handleEdit = (item: MenuItem) => {
    setIsEditing(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price,
      promotionalPrice: item.promotionalPrice || 0,
      category: item.category,
      image: item.image || "",
      priceOptions: item.priceOptions || ""
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      try {
        await deleteDoc(doc(db, "menuItems", id));
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Erro ao excluir item.");
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-bg-base">Carregando...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-base p-4">
        <img 
          src="https://www.dropbox.com/scl/fi/9gi98tns5cvb49wqn8cq8/LOGO.png?rlkey=jcuvxnd1nu64mef9fc4pj9sd5&raw=1" 
          alt="Bruno Lanches Logo" 
          className="h-20 w-auto mb-6"
          referrerPolicy="no-referrer"
        />
        <h1 className="text-2xl font-bold mb-8">Painel Administrativo</h1>
        <button 
          onClick={handleLogin}
          className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-card p-4 rounded-xl border border-[#222]">
          <div className="flex items-center gap-2">
            <img 
              src="https://www.dropbox.com/scl/fi/9gi98tns5cvb49wqn8cq8/LOGO.png?rlkey=jcuvxnd1nu64mef9fc4pj9sd5&raw=1" 
              alt="Bruno Lanches Logo" 
              className="h-8 w-auto"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl font-bold">Admin | Bruno Lanches</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={seedDatabase} className="text-xs bg-[#222] hover:bg-[#333] px-3 py-1.5 rounded flex items-center gap-1 border border-[#333]">
              <Database size={14} /> Popular Dados Iniciais
            </button>
            <span className="text-sm text-text-dim hidden md:inline">{user.email}</span>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-400 flex items-center gap-1 text-sm">
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="bg-card p-6 rounded-xl border border-[#222] h-fit">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              {isEditing ? <Pencil size={18} /> : <Plus size={18} />}
              {isEditing ? "Editar Item" : "Novo Item"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-dim mb-1">Nome *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dim mb-1">Categoria *</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-dim mb-1">Preço (R$) *</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-dim mb-1">Preço Promocional</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.promotionalPrice}
                    onChange={e => setFormData({...formData, promotionalPrice: e.target.value})}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dim mb-1">Descrição</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none h-20 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dim mb-1">Opções de Preço (Ex: Caseiro: R$ 23 | Frango: R$ 21)</label>
                <input 
                  type="text" 
                  value={formData.priceOptions}
                  onChange={e => setFormData({...formData, priceOptions: e.target.value})}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dim mb-1">URL da Imagem</label>
                <input 
                  type="url" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                />
              </div>
              
              <div className="pt-4 flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors text-sm"
                >
                  {isEditing ? "Salvar Alterações" : "Adicionar Item"}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(null); setFormData({ name: "", description: "", price: 0, promotionalPrice: 0, category: "Especiais", image: "", priceOptions: "" }); }}
                    className="px-4 bg-[#222] hover:bg-[#333] text-white font-bold py-2 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-6">
            {CATEGORIES.map(category => {
              const categoryItems = items.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-lg font-bold mb-3 text-primary border-b border-[#222] pb-2">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categoryItems.map(item => (
                      <div key={item.id} className="bg-card border border-[#222] rounded-lg p-4 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300"><Pencil size={14} /></button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`font-bold text-sm ${item.promotionalPrice ? 'line-through text-text-dim' : 'text-primary'}`}>
                            R$ {item.price.toFixed(2)}
                          </span>
                          {item.promotionalPrice ? (
                            <span className="font-bold text-sm text-accent">
                              R$ {item.promotionalPrice.toFixed(2)}
                            </span>
                          ) : null}
                        </div>
                        {item.description && <p className="text-xs text-text-dim line-clamp-2">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {items.length === 0 && (
              <div className="text-center py-12 text-text-dim bg-card border border-[#222] rounded-xl">
                Nenhum item cadastrado ainda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
