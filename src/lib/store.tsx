import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./data";

export type Order = {
  id: string; type: string; description: string; total: number;
  status: "Aprovado" | "Entregue" | "Pendente"; date: string; robloxUser?: string;
};
type User = { name: string; avatar: string };
type Ctx = {
  user: User | null; login: (name: string) => void; logout: () => void;
  cart: Product[]; addToCart: (p: Product) => void; removeFromCart: (id: string) => void; clearCart: () => void;
  cartOpen: boolean; setCartOpen: (v: boolean) => void;
  loginOpen: boolean; setLoginOpen: (v: boolean) => void;
  orders: Order[]; addOrder: (o: Order) => void;
};
const StoreCtx = createContext<Ctx | null>(null);

function usePersist<T>(key: string, init: T) {
  const [v, setV] = useState<T>(init);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); } catch {}
    setLoaded(true);
  }, [key]);
  useEffect(() => { if (loaded) localStorage.setItem(key, JSON.stringify(v)); }, [key, v, loaded]);
  return [v, setV] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = usePersist<User | null>("nb_user", null);
  const [cart, setCart] = usePersist<Product[]>("nb_cart", []);
  const [orders, setOrders] = usePersist<Order[]>("nb_orders", []);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <StoreCtx.Provider value={{
      user,
      login: (name) => setUser({ name, avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=4c1d95` }),
      logout: () => setUser(null),
      cart, addToCart: (p) => setCart((c) => [...c, p]),
      removeFromCart: (id) => setCart((c) => { const i = c.findIndex((x) => x.id === id); return i < 0 ? c : [...c.slice(0, i), ...c.slice(i + 1)]; }),
      clearCart: () => setCart([]),
      cartOpen, setCartOpen, loginOpen, setLoginOpen,
      orders, addOrder: (o) => setOrders((x) => [o, ...x]),
    }}>{children}</StoreCtx.Provider>
  );
}
export const useStore = () => { const c = useContext(StoreCtx); if (!c) throw new Error("no store"); return c; };
export const newOrderId = () => "NB-" + Math.random().toString(36).slice(2, 8).toUpperCase() + Date.now().toString().slice(-4);
