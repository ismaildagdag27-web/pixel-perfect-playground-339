import swing from "@/assets/swing.jpg";
import slide from "@/assets/slide.jpg";
import trampoline from "@/assets/trampoline.jpg";
import playhouse from "@/assets/playhouse.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  age: string;
  badge?: "Populaire" | "Nouveau" | "Incontournable";
  image: string;
  category: string;
};

export const categories = [
  { name: "Balançoires", label: "Swings", image: swing, count: 24 },
  { name: "Toboggans", label: "Slides", image: slide, count: 18 },
  { name: "Trampolines", label: "Trampolines", image: trampoline, count: 12 },
  { name: "Maisonnettes", label: "Playhouses", image: playhouse, count: 15 },
];

export const products: Product[] = [
  { id: "p1", name: "Portique Aventure Bois 2 places", price: 349, oldPrice: 399, rating: 5, reviews: 128, age: "3-10 ans", badge: "Populaire", image: swing, category: "Balançoires" },
  { id: "p2", name: "Toboggan Soleil 1,5 m", price: 89, rating: 4.8, reviews: 96, age: "2-6 ans", badge: "Nouveau", image: slide, category: "Toboggans" },
  { id: "p3", name: "Trampoline Rebond Ø 366 cm + filet", price: 279, oldPrice: 329, rating: 4.9, reviews: 211, age: "6-14 ans", badge: "Incontournable", image: trampoline, category: "Trampolines" },
  { id: "p4", name: "Maisonnette Ciel Bleu en bois", price: 499, rating: 5, reviews: 74, age: "2-8 ans", badge: "Populaire", image: playhouse, category: "Maisonnettes" },
  { id: "p5", name: "Aire de jeux Explorateur", price: 649, rating: 4.7, reviews: 52, age: "3-12 ans", image: swing, category: "Balançoires" },
  { id: "p6", name: "Mini Trampoline Junior Ø 140 cm", price: 119, rating: 4.6, reviews: 88, age: "3-6 ans", badge: "Nouveau", image: trampoline, category: "Trampolines" },
  { id: "p7", name: "Toboggan Vague XXL 2,4 m", price: 159, rating: 4.8, reviews: 63, age: "4-10 ans", image: slide, category: "Toboggans" },
  { id: "p8", name: "Cabane Cottage Fleurie", price: 389, oldPrice: 429, rating: 4.9, reviews: 41, age: "2-8 ans", image: playhouse, category: "Maisonnettes" },
];

export const testimonials = [
  { name: "Sophie M.", city: "Lyon", text: "Le portique est magnifique et super solide. Nos enfants passent leurs après-midis dehors maintenant !" },
  { name: "Karim B.", city: "Casablanca", text: "Livraison rapide, montage simple. Le trampoline est un vrai succès auprès de toute la famille." },
  { name: "Julie & Marc", city: "Bordeaux", text: "La maisonnette est devenue le QG de nos filles. Qualité impeccable, je recommande les yeux fermés." },
  { name: "Nadia L.", city: "Lille", text: "Service client adorable et produits certifiés. On se sent en confiance pour nos petits." },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
