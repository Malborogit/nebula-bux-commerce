export const RATE = 0.046;
export const MIN_ROBUX = 100;
export const MAX_ROBUX = 100000;
export const STEP = 50;

export const PACKAGES = [
  { id: "pkg_1000", robux: 1000, label: "1.000", popular: false },
  { id: "pkg_5000", robux: 5000, label: "5.000", popular: true },
  { id: "pkg_10000", robux: 10000, label: "10.000", popular: false },
  { id: "pkg_25000", robux: 25000, label: "25.000", popular: false },
];

export const COUPONS: Record<string, number> = {
  NEBULA10: 10, VIP5: 5, PROMO15: 15, INSTAGRAM5: 5, UNI: 5, RREZE: 5,
};

export const totalBrl = (robux: number, discount = 0) =>
  Number((robux * RATE * (1 - discount / 100)).toFixed(2));
export const gamepassPrice = (robux: number) => Math.ceil(robux / 0.7);
export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const num = (n: number) => n.toLocaleString("pt-BR");

export const SAMPLE_ACCOUNTS = [
  { username: "LarahUny", displayName: "UniGirlBlox", userId: "1165056396" },
  { username: "RobloxPlayer123", displayName: "PlayerPro_BR", userId: "2849104821" },
  { username: "decency1otus", displayName: "decency1otus", userId: "4918273645" },
];
export const avatarFor = (seed: string) =>
  `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=3b0764`;

export const PIX_CODE =
  "00020101021226830014BR.GOV.BCB.PIX2561qrcodes-pix.nebulabux.com/v2/cob/nebula-robux-instant5204000053039865802BR5913NEBULABUX_LTD6009SAO_PAULO62070503***6304E2A1";

export type Product = {
  id: string; category: string; badge: string; title: string; price: number;
  featured: boolean; image: string;
};
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=500&auto=format&fit=crop&q=80`;
export const PRODUCTS: Product[] = [
  { id: "prod_fruit_notifier", category: "Blox Fruits", badge: "⚡ BLOXFRUITS", title: "Fruit Notifier", price: 97.2, featured: true, image: u("1618005182384-a83a8bd57fbe") },
  { id: "prod_custom_makeup", category: "Dress to Impress", badge: "👗 DRESS TO IMPRESS", title: "Maquiagem Personalizada", price: 17.9, featured: true, image: u("1522335789203-aabd1fc54bc9") },
  { id: "prod_quake", category: "Blox Fruits", badge: "⚡ BLOXFRUITS", title: "Quake Permanente", price: 54, featured: true, image: u("1579783902614-a3fb3927b675") },
  { id: "prod_dragon", category: "Blox Fruits", badge: "⚡ BLOXFRUITS", title: "Dragon Permanente", price: 180, featured: true, image: u("1577083552431-6e5fd01aa342") },
  { id: "prod_vip_dti", category: "Dress to Impress", badge: "👗 DRESS TO IMPRESS", title: "VIP Mensal e Permanente", price: 16.9, featured: true, image: u("1513519245088-0e12902e5a38") },
  { id: "prod_2x_money", category: "Blox Fruits", badge: "⚡ BLOXFRUITS", title: "2x Money", price: 16.2, featured: true, image: u("1621416894569-0f39ed31d247") },
  { id: "prod_fast_walk", category: "Dress to Impress", badge: "👗 DRESS TO IMPRESS", title: "Correr Rápido (Run Faster)", price: 7.5, featured: true, image: u("1550745165-9bc0b252726f") },
  { id: "prod_item_limit", category: "Dress to Impress", badge: "👗 DRESS TO IMPRESS", title: "Limite de Itens (+6 Itens)", price: 6.5, featured: true, image: u("1534447677768-be436bb09401") },
  { id: "prod_dark_blade", category: "Blox Fruits", badge: "⚡ BLOXFRUITS", title: "Dark Blade", price: 43.2, featured: false, image: u("1563089145-599997674d42") },
  { id: "prod_mm2_borealis", category: "Murder Mystery 2", badge: "🔪 MURDER MYSTERY 2", title: "Set - Borealis Godly", price: 17, featured: false, image: u("1607604276583-eef5d076aa5f") },
  { id: "prod_mm2_harvester", category: "Murder Mystery 2", badge: "🔪 MURDER MYSTERY 2", title: "Godly - Harvester", price: 21, featured: false, image: u("1518709268805-4e9042af9f23") },
  { id: "prod_french_luxury", category: "Dress to Impress", badge: "👗 DRESS TO IMPRESS", title: "French Luxury Set", price: 11.72, featured: false, image: u("1490481651871-ab68de25d43d") },
  { id: "prod_mc_full", category: "Contas Minecraft", badge: "⛏️ MINECRAFT", title: "Conta Minecraft Full Acesso", price: 39.9, featured: false, image: u("1587573089734-09cb69c0f2b4") },
];
export const CATEGORIES = ["Todos", "Blox Fruits", "Dress to Impress", "Murder Mystery 2", "Contas Minecraft"];

export const RANKING = [
  { name: "ShadowKing_BR", spent: 4820.5, orders: 42 },
  { name: "UniGirlBlox", spent: 3910.0, orders: 37 },
  { name: "PlayerPro_BR", spent: 3122.9, orders: 29 },
  { name: "NeonFox77", spent: 2480.0, orders: 21 },
  { name: "LunaStarzz", spent: 1990.3, orders: 18 },
  { name: "Bloxzinho", spent: 1540.0, orders: 15 },
  { name: "MaxGamer_XD", spent: 1288.2, orders: 12 },
  { name: "kawaii_mel", spent: 990.0, orders: 9 },
];

export const installment = (p: number) => brl(Number((p / 12).toFixed(2)));
