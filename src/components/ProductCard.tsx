import { ShoppingCart } from "lucide-react";
import { brl, installment, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ p }: { p: Product }) {
  const { addToCart } = useStore();
  return (
    <div className="card-neon group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-0.5 text-[10px] font-bold tracking-wider backdrop-blur">{p.badge}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold">{p.title}</h3>
        <p className="mt-2 font-mono text-xl font-bold">{brl(p.price)}</p>
        <p className="text-xs text-muted-foreground">à vista no Pix · ou 12x de {installment(p.price)}</p>
        <button onClick={() => { addToCart(p); toast.success(`${p.title} adicionado ao carrinho`); }}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-accent py-2.5 text-sm font-semibold transition hover:bg-gradient-primary">
          <ShoppingCart className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  );
}
