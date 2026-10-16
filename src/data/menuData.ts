import fresasImg from '../assets/images/carlota_fresas_con_crema_1792173641767.jpg';
import cuchareablesImg from '../assets/images/carlota_cuchareables_1792173644323.jpg';
import wafflesImg from '../assets/images/carlota_waffles_fresas_1792173643617.jpg';
import galletasImg from '../assets/images/carlota_galletas_artesanales_1792173643726.jpg';

export { fresasImg, cuchareablesImg, wafflesImg, galletasImg };

export interface MenuItem {
  id: string;
  name: string;
  category: 'fresas' | 'cuchareables' | 'waffles' | 'salados' | 'empanadas' | 'galletas' | 'bebidas' | 'malteadas';
  description?: string;
  price: number;
  image?: string;
  badge?: string;
  customizable?: boolean;
  type?: 'standard' | 'size_variant' | 'drink_base' | 'cookie_box';
  sizes?: { label: string; price: number; note?: string }[];
  includedNotes?: string;
}

export interface ToppingItem {
  id: string;
  name: string;
  price: number;
  category?: 'galletas' | 'chocolates' | 'frutas' | 'especiales';
}

export const TOPPINGS: ToppingItem[] = [
  { id: 'brownie', name: 'Brownie', price: 4000, category: 'especiales' },
  { id: 'cocosette', name: 'Galletas Cocosette', price: 4000, category: 'galletas' },
  { id: 'oreo', name: 'Galletas Oreo', price: 4000, category: 'galletas' },
  { id: 'cokis', name: 'Galletas Cokis', price: 4000, category: 'galletas' },
  { id: 'nutella', name: 'Nutella', price: 5000, category: 'chocolates' },
  { id: 'mini-chips', name: 'Mini Chips', price: 4000, category: 'chocolates' },
  { id: 'piazza', name: 'Piazza', price: 4000, category: 'galletas' },
  { id: 'gol', name: 'Gol', price: 4000, category: 'chocolates' },
  { id: 'arequipe', name: 'Arequipe', price: 5000, category: 'especiales' },
  { id: 'chokis', name: 'Chokis', price: 5000, category: 'chocolates' },
  { id: 'minichips-2', name: 'Minichips', price: 4000, category: 'chocolates' },
  { id: 'mamut', name: 'Mamut', price: 4000, category: 'galletas' },
  { id: 'granola', name: 'Granola', price: 4000, category: 'frutas' },
  { id: 'arandanos', name: 'Arándanos', price: 4000, category: 'frutas' },
  { id: 'pistacho', name: 'Pistacho', price: 7000, category: 'especiales' },
  { id: 'chips-blanco', name: 'Chips de Chocolate blanco', price: 5000, category: 'chocolates' },
  { id: 'chococrispi', name: 'Chococrispi', price: 4000, category: 'chocolates' },
  { id: 'froot-loops', name: 'Froot Loops', price: 4000, category: 'especiales' },
  { id: 'flips', name: 'Flips', price: 4000, category: 'chocolates' },
  { id: 'waffles', name: 'Waffles trocitos', price: 4000, category: 'especiales' },
  { id: 'red-velvet', name: 'Red Velvet', price: 5000, category: 'especiales' },
  { id: 'almendras', name: 'Almendras', price: 5000, category: 'especiales' },
];

export const DRINK_FLAVORS = [
  'Maracuyá',
  'Lulo',
  'Mora',
  'Fresa',
  'Guanábana',
  'Mandarina',
  'Limonada de coco',
  'Cerezada',
  'Limonada natural',
  'Frutos rojos',
  'Frutos amarillos',
  'Mango',
];

export const CATEGORIES = [
  { id: 'all', name: 'Todo el Menú' },
  { id: 'fresas', name: 'Fresas con Crema' },
  { id: 'cuchareables', name: 'Cuchareables' },
  { id: 'waffles', name: 'Waffles y Creps' },
  { id: 'galletas', name: 'Galletas' },
  { id: 'malteadas', name: 'Malteadas' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'salados', name: 'Opciones Saladas' },
  { id: 'empanadas', name: 'Empanadas' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // FRESAS CON CREMA
  {
    id: 'fresas-12oz',
    name: 'Fresas con Crema 12 Oz',
    category: 'fresas',
    description: 'Fresas frescas seleccionadas, cremosa receta de la casa y salsa de chocolate incluida.',
    price: 14000,
    image: fresasImg,
    badge: 'Popular',
    customizable: true,
    includedNotes: 'Incluye salsa de chocolate',
  },
  {
    id: 'fresas-16oz',
    name: 'Fresas con Crema 16 Oz',
    category: 'fresas',
    description: 'Fresas frescas, crema artesanal, salsa de chocolate e incluye trozos de brownie húmedo.',
    price: 18000,
    image: fresasImg,
    badge: 'Recomendado',
    customizable: true,
    includedNotes: 'Incluye brownie y salsa de chocolate',
  },
  {
    id: 'fresas-22oz',
    name: 'Fresas con Crema 22 Oz',
    category: 'fresas',
    description: 'Tamaño gigante para compartir. Fresas frescas, abundante crema, brownie y salsa de chocolate.',
    price: 22000,
    image: fresasImg,
    customizable: true,
    includedNotes: 'Incluye brownie y salsa de chocolate',
  },
  {
    id: 'bowl-de-fresas',
    name: 'Bowl de Fresas Especial',
    category: 'fresas',
    description: 'La experiencia definitiva: tazón completo con fresas, crema especial, brownie húmedo y Nutella original.',
    price: 24000,
    image: fresasImg,
    badge: 'Firma de la Casa',
    customizable: true,
    includedNotes: 'Incluye brownie, Nutella y salsa de chocolate',
  },

  // CUCHAREABLES
  {
    id: 'cuchareable-carlota',
    name: 'Postre Carlota',
    category: 'cuchareables',
    description: 'Nuestra especialidad insignia: suave crema de limón entre delicadas capas de galleta crujiente.',
    price: 10000,
    image: cuchareablesImg,
    badge: 'Receta Secreta',
    customizable: false,
  },
  {
    id: 'cuchareable-oreo',
    name: 'Cuchareable Oreo',
    category: 'cuchareables',
    description: 'Postre cremoso frío con capas generosas de galleta Oreo troceada y topping especial.',
    price: 12000,
    image: cuchareablesImg,
    customizable: false,
  },
  {
    id: 'cuchareable-chokis',
    name: 'Cuchareable Chokis',
    category: 'cuchareables',
    description: 'Cremoso vasito con galletas Chokis y centro irresistible de chocolate.',
    price: 12000,
    image: cuchareablesImg,
    customizable: false,
  },
  {
    id: 'cuchareable-brownie',
    name: 'Cuchareable Brownie',
    category: 'cuchareables',
    description: 'Capas de suave crema pastelera artesanal y jugosos cubos de brownie de chocolate intenso.',
    price: 12000,
    image: cuchareablesImg,
    customizable: false,
  },
  {
    id: 'cuchareable-cocosette',
    name: 'Cuchareable Cocosette',
    category: 'cuchareables',
    description: 'El auténtico sabor del coco y barquillo crujiente Cocosette en una textura ultra cremosa.',
    price: 12000,
    image: cuchareablesImg,
    customizable: false,
  },
  {
    id: 'cuchareable-minichis',
    name: 'Cuchareable Minichis',
    category: 'cuchareables',
    description: 'Divertida combinación de galletitas minichis en crema suave.',
    price: 12000,
    image: cuchareablesImg,
    customizable: false,
  },

  // WAFFLES Y CREPS
  {
    id: 'waffles-con-fresa',
    name: 'Waffles con Fresa',
    category: 'waffles',
    description: 'Waffle recién horneado con fresas frescas, crema chantilly y cremosa crema de avellanas.',
    price: 20000,
    image: wafflesImg,
    badge: 'Favorito',
    customizable: true,
  },
  {
    id: 'crepes-con-fresas',
    name: 'Crepes con Fresas',
    category: 'waffles',
    description: 'Delicada masa de crepe rellena y decorada con fresas frescas, crema y crema de avellanas.',
    price: 17000,
    image: wafflesImg,
    customizable: true,
  },

  // GALLETAS
  {
    id: 'galleta-chips',
    name: 'Galleta de Chips de Chocolate',
    category: 'galletas',
    description: 'Horneada al punto: bordes crujientes, centro suave y rebozada de chips de chocolate.',
    price: 7000,
    image: galletasImg,
    customizable: false,
  },
  {
    id: 'galleta-red-velvet',
    name: 'Galleta de Red Velvet',
    category: 'galletas',
    description: 'Masa aterciopelada de cacao rojo con trozos de chocolate blanco cremoso.',
    price: 7000,
    image: galletasImg,
    customizable: false,
  },
  {
    id: 'galleta-chocolate',
    name: 'Galleta de Doble Chocolate',
    category: 'galletas',
    description: 'Pura indulgencia con cacao puro y chispas de chocolate semi-amargo derretidas.',
    price: 7000,
    image: galletasImg,
    customizable: false,
  },
  {
    id: 'galleta-pistacho',
    name: 'Galleta de Pistacho',
    category: 'galletas',
    description: 'Elaborada con auténtica pasta de pistacho seleccionado y trozos crujientes.',
    price: 7000,
    image: galletasImg,
    badge: 'Gourmet',
    customizable: false,
  },
  {
    id: 'caja-4-galletas',
    name: 'Caja por 4 Galletas',
    category: 'galletas',
    description: 'Combina tus 4 sabores favoritos en una elegante caja para regalar o disfrutar.',
    price: 24000,
    image: galletasImg,
    badge: 'Ahorra $4k',
    customizable: true,
    type: 'cookie_box',
  },

  // MALTEADAS
  {
    id: 'malteada-carlota',
    name: 'Malteada Carlota',
    category: 'malteadas',
    description: 'Nuestra malteada estrella con el inconfundible toque cremoso de limón y galleta.',
    price: 15000,
    badge: 'Exclusiva',
    customizable: false,
  },
  {
    id: 'malteada-waffle',
    name: 'Malteada Waffle',
    category: 'malteadas',
    description: 'Batido espeso con notas de masa de waffle horneada, crema y caramelo.',
    price: 15000,
    customizable: false,
  },
  {
    id: 'malteada-brownie',
    name: 'Malteada Brownie',
    category: 'malteadas',
    description: 'Elaborada con auténticos trozos de brownie mezclados en helado y coronada con crema.',
    price: 15000,
    customizable: false,
  },

  // BEBIDAS
  {
    id: 'bebida-fruta',
    name: 'Jugos y Limonadas Naturales',
    category: 'bebidas',
    description: 'Elige tu fruta favorita preparada al instante: en agua refrescante, en leche cremosa o con helado.',
    price: 7000,
    type: 'drink_base',
    customizable: true,
  },
  {
    id: 'agua-mineral',
    name: 'Agua Mineral / Natural',
    category: 'bebidas',
    description: 'Botella de agua purificada fría.',
    price: 5000,
    customizable: false,
  },

  // OPCIONES SALADAS
  {
    id: 'la-portena',
    name: 'La Porteña Burguer',
    category: 'salados',
    description: 'Burguer de milanesa de pollo crujiente, queso mozzarela fundido, cebolla caramelizada, mayonesa ahumada, tomate y lechuga fresca.',
    price: 24000,
    badge: 'Plato Fuerte',
    customizable: false,
  },
  {
    id: 'la-milanga-pork',
    name: 'La Milanga Pork',
    category: 'salados',
    description: 'Burguer de milanesa de cerdo jugosa, queso mozzarela, cebolla caramelizada suave, mayonesa ahumada casera, tomate y lechuga.',
    price: 23000,
    badge: 'Favorito Salado',
    customizable: false,
  },

  // EMPANADAS
  {
    id: 'empanada-pollo',
    name: 'Empanada de Pollo',
    category: 'empanadas',
    description: 'Empanada artesanal crocante rellena de pechuga de pollo desmechada y guiso tradicional.',
    price: 4000,
    customizable: false,
  },
  {
    id: 'empanada-carne',
    name: 'Empanada de Carne',
    category: 'empanadas',
    description: 'Empanada dorada rellena de carne tierna sazonada con especias de la casa.',
    price: 4000,
    customizable: false,
  },
  {
    id: 'empanada-pollo-maiz',
    name: 'Empanada de Pollo con Maíz',
    category: 'empanadas',
    description: 'Relleno suave de pollo tierno y granos de maíz dulce con masa crujiente.',
    price: 4000,
    badge: 'Recomendada',
    customizable: false,
  },
];

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedToppings: ToppingItem[];
  selectedDrinkBase?: 'En agua' | 'En leche' | 'En helado';
  selectedFlavor?: string;
  cookieSelection?: string[];
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}
