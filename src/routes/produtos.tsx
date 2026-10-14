import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Catálogo de Produtos Roblox — NebulaBux" },
      { name: "description", content: "Itens de Blox Fruits, Dress to Impress, Murder Mystery 2 e contas Minecraft." },
      { property: "og:title", content: "Catálogo de Produtos Roblox — NebulaBux" },
      { property: "og:description", content: "Itens Blox Fruits, DTI, MM2 e Minecraft com Pix." },
    ],
  }),
  component: Produtos,
});

function Produtos() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const { cart, setCartOpen } = useStore();
  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (cat === "Todos" || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    else if (sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    else l = [...l].sort((a, b) => Number(b.featured) - Number(a.featured));
    return l;
  }, [cat, q, sort]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">Produtos</h1>
      <p className="mt-1 text-muted-foreground">Itens e vantagens para seus jogos favoritos.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          <p className="mb-2 text-[10px] font-bold tracking-wider text-subtle">CATEGORIAS</p>
          <div className="flex gap-2 overflow-x-auto md:flex-col">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-sm transition ${cat === c ? "bg-gradient-primary font-semibold" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} className="mt-4 hidden w-full items-center justify-center gap-2 rounded-xl border border-primary/40 bg-accent py-2.5 text-sm md:flex">
            <ShoppingCart className="h-4 w-4" /> Carrinho ({cart.length})
          </button>
        </aside>
        <div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome..." className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-3 text-sm outline-none focus:border-primary" />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-input bg-card px-3 py-3 text-sm outline-none">
              <option value="featured">Em Destaque</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option>
            </select>
          </div>
          {list.length === 0 ? <p className="py-16 text-center text-muted-foreground">Nenhum produto encontrado.</p> :
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        </div>
      </div>
    </div>
  );
}
