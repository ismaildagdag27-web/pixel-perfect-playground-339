import image0 from "@/assets/catalogue/J-10153P9.png.asset.json";
import image1 from "@/assets/catalogue/J-10161P15.png.asset.json";
import image2 from "@/assets/catalogue/J-10253P6.png.asset.json";
import image3 from "@/assets/catalogue/J-16380P10.png.asset.json";
import image4 from "@/assets/catalogue/J-25481.png.asset.json";
import image5 from "@/assets/catalogue/J-41420P8.png.asset.json";
import image6 from "@/assets/catalogue/J-418.png.asset.json";
import image7 from "@/assets/catalogue/J-426.png.asset.json";
import image8 from "@/assets/catalogue/J-427.png.asset.json";
import image9 from "@/assets/catalogue/J-447.png.asset.json";
import image10 from "@/assets/catalogue/J-11468P8.png.asset.json";
import image11 from "@/assets/catalogue/J-11560P8.png.asset.json";
import image12 from "@/assets/catalogue/J-14651P6.png.asset.json";
import image13 from "@/assets/catalogue/J-17782P4.png.asset.json";
import image14 from "@/assets/catalogue/J-JOU129.png.asset.json";
import image15 from "@/assets/catalogue/J-JOU131.png.asset.json";
import image16 from "@/assets/catalogue/J-JOU1161.png.asset.json";
import image17 from "@/assets/catalogue/J-JOU130.png.asset.json";
import image18 from "@/assets/catalogue/J-32113P4.png.asset.json";
import image19 from "@/assets/catalogue/J-32111P4.png.asset.json";
import image20 from "@/assets/catalogue/J-16595P4.png.asset.json";
import image21 from "@/assets/catalogue/J-16597P4.png.asset.json";
import image22 from "@/assets/catalogue/J-17440P4.png.asset.json";
import image23 from "@/assets/catalogue/J-18522P4.png.asset.json";
import image24 from "@/assets/catalogue/J-17680P4.png.asset.json";
import image25 from "@/assets/catalogue/J-18220P6.png.asset.json";
import image26 from "@/assets/catalogue/J-18421P4.png.asset.json";
import image27 from "@/assets/catalogue/J-18631P4.png.asset.json";
import image28 from "@/assets/catalogue/J-18640P4.png.asset.json";
import image29 from "@/assets/catalogue/J-41225P4.png.asset.json";
import image30 from "@/assets/catalogue/J-15461P6.png.asset.json";
import image31 from "@/assets/catalogue/J-23502P1.png.asset.json";
import image32 from "@/assets/catalogue/J-31158P4.png.asset.json";
import image33 from "@/assets/catalogue/J-32112P4.png.asset.json";
import image34 from "@/assets/catalogue/J-15359P6.png.asset.json";
import image35 from "@/assets/catalogue/J-23503P1.png.asset.json";
import image36 from "@/assets/catalogue/J-24505P1.png.asset.json";
import image37 from "@/assets/catalogue/J-24603P1.png.asset.json";
import image38 from "@/assets/catalogue/J-31127P9.png.asset.json";
import image39 from "@/assets/catalogue/J-24602P1.png.asset.json";
import image40 from "@/assets/catalogue/331.png.asset.json";
import image41 from "@/assets/catalogue/140.png.asset.json";
import image42 from "@/assets/catalogue/371P.png.asset.json";
import image43 from "@/assets/catalogue/612.png.asset.json";
import image44 from "@/assets/catalogue/633.png.asset.json";
import image45 from "@/assets/catalogue/118.png.asset.json";
import image46 from "@/assets/catalogue/900.png.asset.json";
import image47 from "@/assets/catalogue/921.png.asset.json";
import image48 from "@/assets/catalogue/924.png.asset.json";
import image49 from "@/assets/catalogue/348P.png.asset.json";
import image50 from "@/assets/catalogue/230PE.png.asset.json";

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number | null;
  description: string | null;
  category: string | null;
  currency: string | null;
  image: string;
  sourcePage: number;
  sourceDesignation: string;
};

export const products: Product[] = [
  {"id": "J-10153P9", "name": "EMMA PORTIQUE BEBE 1M20", "price": 1450.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 1, "sourceDesignation": "EMMA PORTIQUE BEBE 1M20", "image": image0.url},
  {"id": "J-10161P15", "name": "ALLEGRO PAR 15H PORT 1m90 B", "price": 2100.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 1, "sourceDesignation": "ALLEGRO PAR 15H PORT 1m90 B", "image": image1.url},
  {"id": "J-10253P6", "name": "DUETTO PAR 6H métal 1m90", "price": 2500.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 1, "sourceDesignation": "DUETTO PAR 6H métal 1m90", "image": image2.url},
  {"id": "J-16380P10", "name": "PIKI PAR 10 métalobois", "price": 4700.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 1, "sourceDesignation": "PIKI PAR 10 métalobois", "image": image3.url},
  {"id": "J-25481", "name": "OLIVER 2 PORTIQUE ADULTE 3M", "price": 8100.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 2, "sourceDesignation": "OLIVER 2 PORTIQUE ADULTE 3M", "image": image4.url},
  {"id": "J-41420P8", "name": "COUCOU PAR 8V trebuchet me", "price": 2100.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 2, "sourceDesignation": "COUCOU PAR 8V trebuchet me", "image": image5.url},
  {"id": "J-418", "name": "SKIN BALANCOIRE BOIS 3M50.", "price": 280.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 2, "sourceDesignation": "SKIN BALANCOIRE BOIS 3M50.", "image": image6.url},
  {"id": "J-426", "name": "BALANCOIRE PLASTIQUE VERTE 2M/", "price": 250.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 2, "sourceDesignation": "BALANCOIRE PLASTIQUE VERTE 2M/", "image": image7.url},
  {"id": "J-427", "name": "BALANCOIRE PLASTIQUE JAUNE 2M/", "price": 250.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 2, "sourceDesignation": "BALANCOIRE PLASTIQUE JAUNE 2M/", "image": image8.url},
  {"id": "J-447", "name": "BALANCOIRE PLASTIQUE ORANGE", "price": 250.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 3, "sourceDesignation": "BALANCOIRE PLASTIQUE ORANGE", "image": image9.url},
  {"id": "J-11468P8", "name": "AVA PAR 8V PORT métal 2m20", "price": 4500.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 3, "sourceDesignation": "AVA PAR 8V PORT métal 2m20", "image": image10.url},
  {"id": "J-11560P8", "name": "MAHO PAR 8V PORT métal 2m20", "price": 5700.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 3, "sourceDesignation": "MAHO PAR 8V PORT métal 2m20", "image": image11.url},
  {"id": "J-14651P6", "name": "HALI 2 PAR 6H bois 2m30", "price": 8700.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 3, "sourceDesignation": "HALI 2 PAR 6H bois 2m30", "image": image12.url},
  {"id": "J-17782P4", "name": "KAHECO PAR 4V TCW 2m3", "price": 10900.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 3, "sourceDesignation": "KAHECO PAR 4V TCW 2m3", "image": image13.url},
  {"id": "J-JOU129", "name": "T244 Ø2m44+E O JKL-8FT1.2-O-L", "price": 3700.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 4, "sourceDesignation": "T244 Ø2m44+E O JKL-8FT1.2-O-L", "image": image14.url},
  {"id": "J-JOU131", "name": "T366 Ø3m66+E O JKL-12FT1.2-O", "price": 6400.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 4, "sourceDesignation": "T366 Ø3m66+E O JKL-12FT1.2-O", "image": image15.url},
  {"id": "J-JOU1161", "name": "BAC A SABLE LIDY BLEU", "price": 270.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 4, "sourceDesignation": "BAC A SABLE LIDY BLEU", "image": image16.url},
  {"id": "J-JOU130", "name": "T305 Ø3m05+E O JKL-10FT1.2-O", "price": 4500.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 4, "sourceDesignation": "T305 Ø3m05+E O JKL-10FT1.2-O", "image": image17.url},
  {"id": "J-32113P4", "name": "ACTOU BLEU PAR 4V glis3m00", "price": 5200.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 4, "sourceDesignation": "ACTOU BLEU PAR 4V glis3m00", "image": image18.url},
  {"id": "J-32111P4", "name": "VALOU BLEU PAR 4V glis 3m80", "price": 5000.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 5, "sourceDesignation": "VALOU BLEU PAR 4V glis 3m80", "image": image19.url},
  {"id": "J-16595P4", "name": "!9-TUTTI PAR 4 bois 2M30", "price": 6500.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 5, "sourceDesignation": "!9-TUTTI PAR 4 bois 2M30", "image": image20.url},
  {"id": "J-16597P4", "name": "!9-DANI PAR 4 bois 2M30", "price": 5970.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 5, "sourceDesignation": "!9-DANI PAR 4 bois 2M30", "image": image21.url},
  {"id": "J-17440P4", "name": "ARROBA PAR 4 TCW 2m30", "price": 7500.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 5, "sourceDesignation": "ARROBA PAR 4 TCW 2m30", "image": image22.url},
  {"id": "J-18522P4", "name": "!9-XALTO PAR 4V TCW 2m30", "price": 7700.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 5, "sourceDesignation": "!9-XALTO PAR 4V TCW 2m30", "image": image23.url},
  {"id": "J-17680P4", "name": "OPTIMA PAR 4V TCW 2m30", "price": 7800.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 6, "sourceDesignation": "OPTIMA PAR 4V TCW 2m30", "image": image24.url},
  {"id": "J-18220P6", "name": "TECHWOOD HARMONIE DOUBLO", "price": 4450.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 6, "sourceDesignation": "TECHWOOD HARMONIE DOUBLO", "image": image25.url},
  {"id": "J-18421P4", "name": "!9-TECHWOOD HARMONIE BILLY", "price": 8600.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 6, "sourceDesignation": "!9-TECHWOOD HARMONIE BILLY", "image": image26.url},
  {"id": "J-18631P4", "name": "!9-TECHWOOD HARMONIE ROMY", "price": 9600.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 6, "sourceDesignation": "!9-TECHWOOD HARMONIE ROMY", "image": image27.url},
  {"id": "J-18640P4", "name": "!9-TECHWOOD HARMONIE AMILY", "price": 6400.0, "stock": 1, "description": null, "category": null, "currency": null, "sourcePage": 6, "sourceDesignation": "!9-TECHWOOD HARMONIE AMILY - 1\nunite reliquat", "image": image28.url},
  {"id": "J-41225P4", "name": "KIKOU PAR 4", "price": 2700.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 7, "sourceDesignation": "KIKOU PAR 4", "image": image29.url},
  {"id": "J-15461P6", "name": "DARIFOU PAR 6 bois 2m30", "price": 4050.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 7, "sourceDesignation": "DARIFOU PAR 6 bois 2m30", "image": image30.url},
  {"id": "J-23502P1", "name": "J-23502P1-AL EASY XPERIENCE", "price": 8350.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 7, "sourceDesignation": "J-23502P1-AL EASY XPERIENCE", "image": image31.url},
  {"id": "J-31158P4", "name": "!1-LINOU V/O PAR 4V glis 2m63", "price": 3500.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 7, "sourceDesignation": "!1-LINOU V/O PAR 4V glis 2m63", "image": image32.url},
  {"id": "J-32112P4", "name": "PYROU BLEU PAR 4V glis 3m32", "price": 4350.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 7, "sourceDesignation": "PYROU BLEU PAR 4V glis 3m32", "image": image33.url},
  {"id": "J-15359P6", "name": "TIRIDOU 2 PAR 6 bois 2m30", "price": 3400.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 8, "sourceDesignation": "TIRIDOU 2 PAR 6 bois 2m30", "image": image34.url},
  {"id": "J-23503P1", "name": "J-23503P1-AL !9-EASY XPLORER", "price": 8850.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 8, "sourceDesignation": "J-23503P1-AL !9-EASY XPLORER", "image": image35.url},
  {"id": "J-24505P1", "name": "SMART XPERIENCE 2", "price": 9550.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 8, "sourceDesignation": "SMART XPERIENCE 2", "image": image36.url},
  {"id": "J-24603P1", "name": "!1-ULTRA XPLORER2", "price": 11900.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 8, "sourceDesignation": "!1-ULTRA XPLORER2", "image": image37.url},
  {"id": "J-31127P9", "name": "ZAZOU PAR 9V tob 1m73 VP", "price": 1900.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 8, "sourceDesignation": "ZAZOU PAR 9V tob 1m73 VP", "image": image38.url},
  {"id": "J-24602P1", "name": "ULTRA XPERIENCE 2", "price": 10900.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 9, "sourceDesignation": "ULTRA XPERIENCE 2", "image": image39.url},
  {"id": "331", "name": "MON PREMIER PORTIQUE TP «FOREST ACORN» 2 EN 1", "price": 3200.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 9, "sourceDesignation": "MON PREMIER PORTIQUE TP «FOREST\nACORN» 2 EN 1", "image": image40.url},
  {"id": "140", "name": "TREBUCHET TP BOIS", "price": 2850.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 9, "sourceDesignation": "TREBUCHET TP BOIS", "image": image41.url},
  {"id": "371P", "name": "MAISONNETTE LOFT TP AVEC GLISSIERE", "price": 16450.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 9, "sourceDesignation": "MAISONNETTE LOFT TP AVEC\nGLISSIERE", "image": image42.url},
  {"id": "612", "name": "JEU EXTERIEURE TP DELUXE", "price": 3100.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 9, "sourceDesignation": "JEU EXTERIEURE TP DELUXE", "image": image43.url},
  {"id": "633", "name": "JEU EXTERIEURE TP JUNIOR COOK", "price": 1750.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 10, "sourceDesignation": "JEU EXTERIEURE TP JUNIOR COOK", "image": image44.url},
  {"id": "118", "name": "JEUX DE LANCER ANNEAUX EN BOIS", "price": 350.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 10, "sourceDesignation": "JEUX DE LANCER ANNEAUX EN BOIS", "image": image45.url},
  {"id": "900", "name": "FAUTEUIL BEBE TP QUADPOD 4 EN 1", "price": 980.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 10, "sourceDesignation": "FAUTEUIL BEBE TP QUADPOD 4 EN 1", "image": image46.url},
  {"id": "921", "name": "TRAPEZE ANNEAUX VERT H. 190- 250CM", "price": 240.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 10, "sourceDesignation": "TRAPEZE ANNEAUX VERT H. 190-\n250CM", "image": image47.url},
  {"id": "924", "name": "CORDE A NOEUDS MARRON H. 190- 250CM", "price": 300.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 10, "sourceDesignation": "CORDE A NOEUDS MARRON H. 190-\n250CM", "image": image48.url},
  {"id": "348P", "name": "MAISONNETTE REFUGE", "price": 5100.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 11, "sourceDesignation": "MAISONNETTE REFUGE", "image": image49.url},
  {"id": "230PE", "name": "PORTIQUE SHERWOOD AMANDIER PEFC", "price": 2630.0, "stock": null, "description": null, "category": null, "currency": null, "sourcePage": 11, "sourceDesignation": "PORTIQUE SHERWOOD AMANDIER\nPEFC", "image": image50.url},
];

// La source ne précise aucune devise : ne pas supposer EUR ou MAD.
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
