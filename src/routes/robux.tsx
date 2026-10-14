import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import confetti from "canvas-confetti";
import {
  Check, ArrowRight, Clock, ShieldCheck, User, Search, Lock, Minus, Plus, Ticket, Copy, AlertTriangle,
  QrCode, FileText, CreditCard, Bitcoin, Send, Loader2, Info, BadgeCheck,
} from "lucide-react";
import { RobuxIcon } from "@/components/Moon";
import {
  PACKAGES, COUPONS, MIN_ROBUX, MAX_ROBUX, STEP, totalBrl, gamepassPrice, brl, num,
  SAMPLE_ACCOUNTS, avatarFor, PIX_CODE,
} from "@/lib/data";
import { useStore, newOrderId } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/robux")({
  head: () => ({
    meta: [
      { title: "Comprar Robux via Gamepass — NebulaBux" },
      { name: "description", content: "Compre Robux em 5 etapas: método, identificação, pacote, Pix e entrega via Gamepass com taxa coberta." },
      { property: "og:title", content: "Comprar Robux via Gamepass — NebulaBux" },
      { property: "og:description", content: "Robux com taxa de 30% coberta e Pix instantâneo." },
    ],
  }),
  component: RobuxWizard,
});

const STEPS = ["MÉTODO", "IDENTIFICAÇÃO", "PACOTE", "PAGAMENTO", "ENTREGA"];
type Account = { username: string; displayName: string; userId: string };

function RobuxWizard() {
  const { addOrder } = useStore();
  const [step, setStep] = useState(0);
  const [sub, setSub] = useState(0);
  const [account, setAccount] = useState<Account | null>(null);
  const [robux, setRobux] = useState(1000);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paidAt, setPaidAt] = useState<Date | null>(null);
  const total = totalBrl(robux, discount);
  const gp = gamepassPrice(robux);
  const go = (s: number, ss = 0) => { setStep(s); setSub(ss); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-glow" />
      <div className="relative mb-10 grid grid-cols-5 gap-2">
        {STEPS.map((s, i) => (
          <div key={s}>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div className="h-full bg-gradient-primary" animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} />
            </div>
            <p className={`mt-2 text-[9px] font-bold tracking-wider sm:text-[11px] ${i <= step ? "text-foreground" : "text-subtle"}`}>{i + 1}. {s}</p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${step}-${sub}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="relative">
          {step === 0 && sub === 0 && <MethodStep onSelect={() => setSub(1)} />}
          {step === 0 && sub === 1 && <TermsStep onCancel={() => setSub(0)} onNext={() => go(1)} />}
          {step === 1 && sub === 0 && <SearchStep onFound={(a) => { setAccount(a); setSub(1); }} />}
          {step === 1 && sub === 1 && account && <ConfirmAccount a={account} onBack={() => setSub(0)} onNext={() => go(2)} />}
          {step === 2 && (
            <PackageStep robux={robux} setRobux={setRobux} discount={discount} coupon={coupon} setCoupon={setCoupon}
              applyCoupon={() => {
                const d = COUPONS[coupon.trim().toUpperCase()];
                if (d) { setDiscount(d); toast.success(`Cupom aplicado: ${d}% OFF`); } else { setDiscount(0); toast.error("Cupom inválido"); }
              }}
              total={total} gp={gp} onNext={() => go(3)} />
          )}
          {step === 3 && sub === 0 && <PayMethod onPix={() => setSub(1)} />}
          {step === 3 && sub === 1 && <PixStep total={total} onConfirm={() => { setOrderId(newOrderId()); setPaidAt(new Date()); setSub(2); }} />}
          {step === 3 && sub === 2 && <PaidStep total={total} orderId={orderId} onNext={() => go(4)} />}
          {step === 4 && sub === 0 && <GamepassStep gp={gp} robux={robux} onDone={() => {
            addOrder({ id: orderId, type: "Robux", description: `${num(robux)} Robux (Gamepass)`, total, status: "Aprovado", date: (paidAt ?? new Date()).toISOString(), robloxUser: account?.username });
            setSub(1);
          }} />}
          {step === 4 && sub === 1 && <FinalStep robux={robux} gp={gp} total={total} account={account} orderId={orderId} date={paidAt ?? new Date()} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Title({ t, s }: { t: string; s?: string }) {
  return <div className="mb-8 text-center"><h1 className="text-2xl font-bold md:text-3xl">{t}</h1>{s && <p className="mt-2 text-sm text-muted-foreground md:text-base">{s}</p>}</div>;
}
function Badge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "success" | "muted" }) {
  const c = tone === "success" ? "bg-success/15 text-success border-success/40" : tone === "muted" ? "bg-muted text-muted-foreground border-border" : "bg-accent text-primary border-primary/40";
  return <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c}`}>{children}</span>;
}
function PrimaryBtn({ children, className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-semibold shadow-button transition hover:brightness-110 disabled:opacity-40 disabled:shadow-none ${className}`}>{children}</button>;
}
function GhostBtn({ children, className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={`rounded-xl border border-border bg-card px-5 py-3 font-semibold transition hover:border-primary ${className}`}>{children}</button>;
}

function MethodStep({ onSelect }: { onSelect: () => void }) {
  return (
    <>
      <Title t="Como deseja receber?" s="Escolha o método de entrega mais conveniente para você." />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card-neon flex flex-col border-primary/50 p-6 shadow-glow">
          <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Gamepass</h3><Badge tone="success">Recomendado</Badge></div>
          <p className="mt-2 text-sm text-muted-foreground">Crie uma passe no seu jogo e nós compramos.</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">{["Mais seguro", "Entrega rápida", "Taxa de 30% coberta por nós"].map((b) => <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{b}</li>)}</ul>
          <PrimaryBtn className="mt-6" onClick={onSelect}>Selecionar <ArrowRight className="h-4 w-4" /></PrimaryBtn>
        </div>
        <div className="flex flex-col rounded-2xl border border-border bg-card p-6 opacity-50">
          <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Grupo VIP</h3><Badge tone="muted">Em desenvolvimento</Badge></div>
          <p className="mt-2 text-sm text-muted-foreground">Você entra em nosso grupo oficial e transferimos os fundos.</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">{["Entrar no grupo", "14 dias de espera do Roblox", "Sem taxas adicionais"].map((b) => <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-subtle" />{b}</li>)}</ul>
          <GhostBtn className="mt-6 cursor-not-allowed" disabled>Indisponível</GhostBtn>
        </div>
      </div>
    </>
  );
}

function TermsStep({ onCancel, onNext }: { onCancel: () => void; onNext: () => void }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="mx-auto max-w-2xl">
      <Title t="Antes de continuarmos..." s="Leia com atenção as informações abaixo." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-neon p-5"><Clock className="h-6 w-6 text-primary" /><h3 className="mt-3 font-semibold">Prazo de Entrega</h3><p className="mt-1 text-sm text-muted-foreground">Média de 10 minutos a 24h.</p></div>
        <div className="card-neon p-5"><ShieldCheck className="h-6 w-6 text-success" /><h3 className="mt-3 font-semibold">Segurança Total</h3><p className="mt-1 text-sm text-muted-foreground">Nunca pedimos sua senha, apenas o nick.</p></div>
      </div>
      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
        <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary" />
        <span>Li e concordo com os <span className="text-primary underline">Termos de Serviço</span> (Entendo que o reembolso só é possível antes do envio dos Robux)</span>
      </label>
      <div className="mt-6 flex justify-end gap-3"><GhostBtn onClick={onCancel}>Cancelar</GhostBtn><PrimaryBtn disabled={!ok} onClick={onNext}>Continuar <ArrowRight className="h-4 w-4" /></PrimaryBtn></div>
    </div>
  );
}

function SearchStep({ onFound }: { onFound: (a: Account) => void }) {
  const [nick, setNick] = useState("");
  const [loading, setLoading] = useState(false);
  const search = () => {
    const n = nick.trim();
    if (n.length < 3) { toast.error("Digite um nick válido (mín. 3 caracteres)"); return; }
    setLoading(true);
    setTimeout(() => {
      const found = SAMPLE_ACCOUNTS.find((a) => a.username.toLowerCase() === n.toLowerCase());
      let hash = 0; for (const c of n) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
      onFound(found ?? { username: n, displayName: n, userId: String(1000000000 + (hash % 4000000000)) });
    }, 900);
  };
  return (
    <div className="mx-auto max-w-lg">
      <Title t="Qual seu nick?" s="Digite seu nome de usuário do Roblox." />
      <div className="flex gap-2">
        <div className="relative flex-1">
          <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input value={nick} onChange={(e) => setNick(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="Ex: RobloxPlayer123"
            className="w-full rounded-xl border border-input bg-card py-3.5 pl-11 pr-4 outline-none focus:border-primary focus:shadow-glow" />
        </div>
        <PrimaryBtn onClick={search} disabled={loading} aria-label="Buscar">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}</PrimaryBtn>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" />Não pedimos sua senha. Apenas o nick público.</p>
    </div>
  );
}

function ConfirmAccount({ a, onBack, onNext }: { a: Account; onBack: () => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-md text-center">
      <Title t="Confirme sua conta" />
      <div className="card-neon flex flex-col items-center p-8">
        <div className="relative">
          <img src={avatarFor(a.username)} alt={a.displayName} className="h-[120px] w-[120px] rounded-full border-4 border-primary bg-accent shadow-glow" />
          <span className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full border-4 border-card bg-success"><Check className="h-4 w-4" /></span>
        </div>
        <h2 className="mt-4 text-xl font-bold">{a.displayName}</h2>
        <p className="text-sm text-muted-foreground">@{a.username}</p>
        <span className="mt-3 rounded-full bg-muted px-3 py-1 font-mono text-xs">ID: {a.userId}</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3"><GhostBtn onClick={onBack}>Não é essa conta</GhostBtn><PrimaryBtn onClick={onNext}>Sim, sou eu</PrimaryBtn></div>
    </div>
  );
}

function PackageStep(p: { robux: number; setRobux: (n: number) => void; discount: number; coupon: string; setCoupon: (s: string) => void; applyCoupon: () => void; total: number; gp: number; onNext: () => void }) {
  const clamp = (n: number) => Math.max(MIN_ROBUX, Math.min(MAX_ROBUX, n || 0));
  const [raw, setRaw] = useState(String(p.robux));
  useEffect(() => setRaw(String(p.robux)), [p.robux]);
  const valid = p.robux >= MIN_ROBUX && p.robux <= MAX_ROBUX;
  return (
    <>
      <Title t="Selecione o Pacote" s="Escolha um pacote pronto ou personalize a quantidade." />
      <div className="grid gap-6 md:grid-cols-5">
        <div className="card-neon p-5 md:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Selecione o valor</h3>
          <div className="grid grid-cols-2 gap-3">
            {PACKAGES.map((k) => {
              const active = p.robux === k.robux;
              return (
                <button key={k.id} onClick={() => p.setRobux(k.robux)}
                  className={`relative rounded-2xl border p-4 text-left transition ${active ? "border-primary bg-accent shadow-glow" : "border-border bg-surface hover:border-primary/50"}`}>
                  {k.popular && <span className="absolute right-2 top-2"><Badge>Popular</Badge></span>}
                  <RobuxIcon className="h-6 w-6" />
                  <p className="mt-2 font-mono text-2xl font-bold">{k.label}</p>
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground">ROBUX</p>
                </button>
              );
            })}
          </div>
          <div className="my-5 flex items-center gap-3 text-[10px] font-bold tracking-wider text-subtle"><span className="h-px flex-1 bg-border" />OU PERSONALIZE<span className="h-px flex-1 bg-border" /></div>
          <p className="mb-2 text-[10px] font-bold tracking-wider text-muted-foreground">QUANTIDADE PERSONALIZADA</p>
          <div className="flex items-center gap-2">
            <GhostBtn className="px-4" onClick={() => p.setRobux(clamp(p.robux - STEP))}><Minus className="h-4 w-4" /></GhostBtn>
            <input type="number" value={raw} min={MIN_ROBUX} max={MAX_ROBUX}
              onChange={(e) => { setRaw(e.target.value); const n = parseInt(e.target.value); if (!isNaN(n)) p.setRobux(n); }}
              onBlur={() => p.setRobux(clamp(p.robux))}
              className="w-full rounded-xl border border-input bg-surface py-3 text-center font-mono text-2xl font-bold outline-none focus:border-primary" />
            <GhostBtn className="px-4" onClick={() => p.setRobux(clamp(p.robux + STEP))}><Plus className="h-4 w-4" /></GhostBtn>
          </div>
          <p className="mt-1 text-xs text-subtle">Mínimo {num(MIN_ROBUX)} · Máximo {num(MAX_ROBUX)}</p>
          <div className="mt-5 flex gap-2">
            <div className="relative flex-1">
              <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
              <input value={p.coupon} onChange={(e) => p.setCoupon(e.target.value)} placeholder="Cupom de desconto"
                className="w-full rounded-xl border border-input bg-surface py-3 pl-10 pr-3 font-mono text-sm uppercase outline-none focus:border-primary" />
            </div>
            <GhostBtn onClick={p.applyCoupon} className="text-sm">APLICAR</GhostBtn>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="card-neon sticky top-24 p-5">
            <h3 className="mb-4 font-semibold">Resumo do pedido</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Pacote</dt><dd className="font-mono">{num(p.robux)} Robux</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Método</dt><dd>Gamepass</dd></div>
              {p.discount > 0 && <div className="flex justify-between text-success"><dt>Desconto</dt><dd className="font-mono">-{p.discount}%</dd></div>}
            </dl>
            <div className="my-4 h-px bg-border" />
            <p className="text-xs text-muted-foreground">Total a pagar</p>
            <p className="font-mono text-3xl font-bold">{brl(p.total)}</p>
            <PrimaryBtn className="mt-5 w-full" disabled={!valid} onClick={p.onNext}>Ir para Pagamento <ArrowRight className="h-4 w-4" /></PrimaryBtn>
            <div className="mt-4 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
              <Info className="mb-1 inline h-4 w-4" /> Sua Gamepass deve custar <b className="font-mono">{num(p.gp)} Robux</b> (Taxa de 30% coberta)
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PayMethod({ onPix }: { onPix: () => void }) {
  const opts = [
    { n: "Boleto", d: "Pode levar até 3 dias úteis.", I: FileText },
    { n: "Cartão", d: "Crédito ou Débito em até 12x.", I: CreditCard },
    { n: "Cripto", d: "Bitcoin, ETH, USDT.", I: Bitcoin },
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <Title t="Como deseja pagar?" s="Escolha a forma de pagamento." />
      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={onPix} className="card-neon border-primary/50 p-5 text-left shadow-glow">
          <div className="flex items-center justify-between"><QrCode className="h-7 w-7 text-success" /><Badge tone="success">Recomendado</Badge></div>
          <h3 className="mt-3 font-semibold">Pix</h3><p className="text-sm text-muted-foreground">Aprovação imediata. O mais rápido.</p>
        </button>
        {opts.map(({ n, d, I }) => (
          <div key={n} className="rounded-2xl border border-border bg-card p-5 opacity-50">
            <div className="flex items-center justify-between"><I className="h-7 w-7" /><Badge tone="muted">Em breve</Badge></div>
            <h3 className="mt-3 font-semibold">{n}</h3><p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PixStep({ total, onConfirm }: { total: number; onConfirm: () => void }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(PIX_CODE)}`;
  return (
    <div className="mx-auto max-w-md">
      <Title t="Concluir pagamento" s="Escaneie o QR Code no app do seu banco." />
      <div className="card-neon flex flex-col items-center p-6">
        <img src={qr} alt="QR Code Pix" className="h-60 w-60 rounded-xl bg-foreground p-2" />
        <p className="mt-5 self-start text-xs text-muted-foreground">Ou use o copia e cola:</p>
        <div className="mt-2 flex w-full gap-2">
          <input readOnly value={PIX_CODE} className="min-w-0 flex-1 rounded-xl border border-input bg-surface px-3 font-mono text-xs" />
          <GhostBtn className="flex items-center gap-1 px-3 text-sm" onClick={() => { navigator.clipboard?.writeText(PIX_CODE); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            {copied ? <><Check className="h-4 w-4 text-success" />Copiado!</> : <><Copy className="h-4 w-4" />Copiar</>}
          </GhostBtn>
        </div>
        <p className="mt-6 text-[10px] font-bold tracking-wider text-muted-foreground">TOTAL A PAGAR</p>
        <p className="font-mono text-3xl font-bold">{brl(total)}</p>
        <PrimaryBtn className="mt-5 w-full" disabled={loading} onClick={() => { setLoading(true); setTimeout(onConfirm, 1200); }}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Verificando...</> : "Confirmar pagamento"}
        </PrimaryBtn>
      </div>
    </div>
  );
}

function PaidStep({ total, orderId, onNext }: { total: number; orderId: string; onNext: () => void }) {
  useEffect(() => { confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 }, colors: ["#A855F7", "#D946EF", "#10B981", "#ffffff"] }); }, []);
  return (
    <div className="mx-auto max-w-md text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15 ring-4 ring-success/30">
        <Check className="h-10 w-10 text-success" />
      </motion.div>
      <h1 className="mt-5 text-2xl font-bold md:text-3xl">Pagamento Confirmado!</h1>
      <div className="card-neon mt-6 space-y-3 p-5 text-left text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge tone="success">Aprovado</Badge></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Valor pago</span><span className="font-mono">{brl(total)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">ID do Pedido</span><span className="font-mono">{orderId}</span></div>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-left text-sm text-warning">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><span><b>IMPORTANTE:</b> Não feche a página até configurar sua Gamepass!</span>
      </div>
      <PrimaryBtn className="mt-6 w-full" onClick={onNext}>Enviar Link da Gamepass <ArrowRight className="h-4 w-4" /></PrimaryBtn>
    </div>
  );
}

function GamepassStep({ gp, robux, onDone }: { gp: number; robux: number; onDone: () => void }) {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const steps = [
    "Acesse create.roblox.com e abra o Creator Dashboard.",
    "Escolha uma das suas experiências (jogos) e vá em Monetização → Passes.",
    "Clique em 'Criar um Passe', dê um nome e salve.",
    `Em 'Vendas', ative 'Item à venda' e defina o preço exato de ${num(gp)} Robux.`,
    "Copie o link (ou ID) do Passe e cole abaixo.",
  ];
  const verify = () => {
    if (!/\d{4,}/.test(link)) { toast.error("Cole um link ou ID de Gamepass válido"); return; }
    setLoading(true); setTimeout(onDone, 1400);
  };
  return (
    <div className="mx-auto max-w-2xl">
      <Title t="Configure sua Gamepass" s={`Para receber ${num(robux)} Robux, siga o passo a passo.`} />
      <div className="card-neon p-6">
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-primary font-mono text-xs font-bold">{i + 1}</span><span className="pt-1">{s}</span></li>
          ))}
        </ol>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-primary/40 bg-accent p-4"><p className="text-xs text-muted-foreground">Preço da Gamepass</p><p className="flex items-center gap-2 font-mono text-2xl font-bold"><RobuxIcon />{num(gp)}</p></div>
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"><AlertTriangle className="mb-1 h-4 w-4" />DESATIVE os <b>Preços Regionais</b>, ou o valor recebido será menor.</div>
        </div>
        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://www.roblox.com/game-pass/123456789/..."
          className="mt-6 w-full rounded-xl border border-input bg-surface px-4 py-3.5 font-mono text-sm outline-none focus:border-primary" />
        <PrimaryBtn className="mt-3 w-full" disabled={loading} onClick={verify}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Verificando...</> : <><BadgeCheck className="h-4 w-4" />Verificar e Confirmar Gamepass</>}
        </PrimaryBtn>
      </div>
    </div>
  );
}

type Msg = { from: "sys" | "staff" | "me"; t: string };
function FinalStep({ robux, gp, total, account, orderId, date }: { robux: number; gp: number; total: number; account: Account | null; orderId: string; date: Date }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "sys", t: `Pedido ${orderId} criado. Gamepass verificada com sucesso.` }]);
  const [input, setInput] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const a = setTimeout(() => setMsgs((m) => [...m, { from: "sys", t: "Um atendente entrou no chat." }]), 1200);
    const b = setTimeout(() => setMsgs((m) => [...m, { from: "staff", t: `Olá ${account?.displayName ?? ""}! Estou processando a compra da sua Gamepass de ${num(gp)} Robux. 💜` }]), 2600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs]);
  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { from: "me", t: input.trim() }]); setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "staff", t: "Entendido! Seus Robux ficam pendentes por até 5 dias no Roblox (regra da plataforma). Qualquer dúvida é só chamar." }]), 1500);
  };
  const rows: [string, string][] = [
    ["Tipo", "Robux (Gamepass)"], ["Quantidade", `${num(robux)} Robux`], ["Preço da Gamepass", `${num(gp)} Robux`],
    ["Usuário Roblox", `@${account?.username ?? "-"}`], ["Data/Hora", date.toLocaleString("pt-BR")], ["ID", orderId],
  ];
  return (
    <>
      <Title t="Detalhes do Pedido" s="Acompanhe sua entrega em tempo real." />
      <div className="grid gap-6 md:grid-cols-5">
        <div className="card-neon p-5 md:col-span-2">
          <h3 className="mb-4 font-semibold">Resumo do Pedido</h3>
          <dl className="space-y-3 text-sm">{rows.map(([k, v]) => <div key={k} className="flex justify-between gap-2"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-mono">{v}</dd></div>)}</dl>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-mono text-xl font-bold">{brl(total)}</span></div>
        </div>
        <div className="card-neon flex h-[460px] flex-col md:col-span-3">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h3 className="font-semibold">Suporte ao Cliente</h3>
            <span className="flex items-center gap-1.5 text-xs text-success"><span className="h-2 w-2 animate-pulse rounded-full bg-success" />Em atendimento</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => m.from === "sys"
              ? <p key={i} className="text-center text-xs text-subtle">— {m.t} —</p>
              : <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.from === "me" ? "ml-auto bg-gradient-primary" : "bg-muted"}`}>{m.t}</motion.div>)}
            <div ref={end} />
          </div>
          <div className="flex gap-2 border-t border-border p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Digite sua mensagem..."
              className="flex-1 rounded-xl border border-input bg-surface px-4 text-sm outline-none focus:border-primary" />
            <PrimaryBtn onClick={send} className="px-4" aria-label="Enviar"><Send className="h-4 w-4" /></PrimaryBtn>
          </div>
        </div>
      </div>
    </>
  );
}
