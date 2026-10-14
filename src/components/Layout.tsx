import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Menu, X, User, Package, LogOut, Trash2, ShieldCheck } from "lucide-react";
import { MoonLogo } from "./Moon";
import { useStore } from "@/lib/store";
import { brl } from "@/lib/data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/robux", label: "Robux" },
  { to: "/produtos", label: "Produtos" },
  { to: "/ranking", label: "Ranking" },
  { to: "/como-funciona", label: "Como Funciona" },
] as const;

export function Navbar() {
  const { user, logout, cart, setCartOpen, setLoginOpen } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold">
          <MoonLogo /> <span>Nebula<span className="text-gradient">Bux</span></span>
        </Link>
        <nav className="ml-6 hidden gap-1 md:flex">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}>{l.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setCartOpen(true)} aria-label="Carrinho"
            className="relative rounded-xl border border-border bg-card p-2.5 transition hover:border-primary">
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold">{cart.length}</span>}
          </button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl border border-border bg-card py-1 pl-1 pr-3 text-sm">
                <img src={user.avatar} alt="" className="h-7 w-7 rounded-lg" /> <span className="hidden sm:inline">{user.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild><Link to="/perfil"><Package className="mr-2 h-4 w-4" />Minhas Compras</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/perfil"><User className="mr-2 h-4 w-4" />Meu Perfil</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-destructive"><LogOut className="mr-2 h-4 w-4" />Sair da Conta</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button onClick={() => setLoginOpen(true)} className="hidden rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold shadow-button sm:block">Fazer Login</button>
          )}
          <button className="rounded-xl border border-border p-2.5 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 md:hidden">
          {LINKS.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm">{l.label}</Link>)}
          {!user && <button onClick={() => { setLoginOpen(true); setOpen(false); }} className="mt-2 rounded-xl bg-gradient-primary py-2 text-sm font-semibold">Fazer Login</button>}
        </nav>
      )}
      <LoginModal /><CartSheet />
    </header>
  );
}

function LoginModal() {
  const { loginOpen, setLoginOpen, login } = useStore();
  const [name, setName] = useState("");
  return (
    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
      <DialogContent className="max-w-sm border-border bg-card">
        <div className="flex flex-col items-center text-center">
          <MoonLogo className="h-14 w-14" />
          <DialogTitle className="mt-3 text-xl font-bold">Entrar na NebulaBux</DialogTitle>
          <p className="mt-1 text-sm text-muted-foreground">Conecte-se com sua conta do Discord para acompanhar seus pedidos.</p>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu usuário do Discord"
            className="mt-5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          <button onClick={() => { login(name.trim() || "NebulaUser"); setLoginOpen(false); toast.success("Login realizado!"); }}
            className="mt-3 w-full rounded-xl bg-discord py-3 text-sm font-semibold">Continuar com Discord</button>
          <p className="mt-4 flex items-center gap-1 text-xs text-subtle"><ShieldCheck className="h-3.5 w-3.5" />Nunca pedimos sua senha.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CartSheet() {
  const { cartOpen, setCartOpen, cart, removeFromCart, clearCart, addOrder, user } = useStore();
  const total = cart.reduce((s, p) => s + p.price, 0);
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col border-border bg-surface">
        <SheetHeader><SheetTitle>Seu carrinho</SheetTitle></SheetHeader>
        <div className="flex-1 space-y-3 overflow-y-auto px-4">
          {cart.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Carrinho vazio.</p>}
          {cart.map((p, i) => (
            <div key={p.id + i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2">
              <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
              <div className="flex-1"><p className="text-sm font-medium">{p.title}</p><p className="font-mono text-xs text-primary">{brl(p.price)}</p></div>
              <button onClick={() => removeFromCart(p.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-border p-4">
            <div className="mb-3 flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-mono font-bold">{brl(total)}</span></div>
            <button onClick={() => {
              addOrder({ id: "NB-" + Date.now().toString(36).toUpperCase(), type: "Produtos", description: cart.map((c) => c.title).join(", "), total, status: "Aprovado", date: new Date().toISOString(), robloxUser: user?.name });
              clearCart(); setCartOpen(false); toast.success("Pedido realizado via Pix!");
            }} className="w-full rounded-xl bg-gradient-primary py-3 text-sm font-semibold shadow-button">Finalizar com Pix</button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-extrabold"><MoonLogo /> Nebula<span className="text-gradient">Bux</span></div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">Robux e itens digitais com entrega rápida, segura e suporte humanizado 24/7.</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-[10px] font-bold tracking-wider text-success">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> SISTEMAS OPERACIONAIS
          </span>
        </div>
        <div className="space-y-2 text-sm"><p className="font-semibold">Loja</p>
          <Link to="/robux" className="block text-muted-foreground hover:text-foreground">Comprar Robux</Link>
          <Link to="/produtos" className="block text-muted-foreground hover:text-foreground">Produtos</Link>
          <Link to="/ranking" className="block text-muted-foreground hover:text-foreground">Ranking</Link></div>
        <div className="space-y-2 text-sm"><p className="font-semibold">Ajuda</p>
          <Link to="/como-funciona" className="block text-muted-foreground hover:text-foreground">Como Funciona</Link>
          <Link to="/perfil" className="block text-muted-foreground hover:text-foreground">Minhas Compras</Link></div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-subtle">© {new Date().getFullYear()} NebulaBux. Não afiliado à Roblox Corporation.</p>
    </footer>
  );
}
