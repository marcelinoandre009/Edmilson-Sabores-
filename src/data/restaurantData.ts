import { Product } from '../types/restaurant';

// Configuração central do restaurante
export const RESTAURANT_CONFIG = {
  name: 'Edmilson Sabores',
  tagline: 'O verdadeiro gosto das ruas!',
  description: 'Somos uma empresa especializada em fast food na Caála. Hambúrgueres artesanais, cachorros especiais, batatas crocantes e bebidas geladas.',
  whatsappNumber: '244922955570', // Número oficial solicitado: 922 955 570
  phoneDisplay: '922 955 570',
  location: 'Bairro Catelenga Nova, junto à igreja católica',
  city: 'Caála, Huambo, Angola',
  fullAddress: 'Bairro Catelenga Nova, junto à igreja católica, Caála, Huambo — Angola',
  googleMapsQuery: 'Catelenga Nova, Caala, Huambo, Angola',
  googleMapsUrl: 'https://maps.google.com/?q=Caala+Huambo+Angola',
  deliveryFee: 500, // "Fazemos entregas ao domicílio com uma taxa adicional de 500kz, não importa a distância"
  currency: 'Kz',
  openingHoursDisplay: 'Segunda a Domingo: 11h00 às 23h00 (ou consulte via WhatsApp)',
  features: [
    { title: 'Entrega Rápida', desc: 'Receba quentinho onde estiver na Caála por apenas 500 Kz' },
    { title: 'Take Away', desc: 'Faça seu pedido antecipado e retire quando estiver pronto' },
    { title: 'Comer no Local', desc: 'Ambiente acolhedor, sossegado e ideal para grupos e família' },
    { title: 'Pedidos via WhatsApp', desc: 'Envio direto e confirmação personalizada no WhatsApp' },
  ],
  services: [
    'Entrega ao domicílio',
    'Take away (Retirada)',
    'Comer no local',
    'Almoço e Jantar',
    'Refeições rápidas',
    'Serviço de mesa',
    'Estacionamento gratuito na rua',
    'Ambiente indicado para crianças'
  ]
};

// Imagens geradas de alta fidelidade
export const RESTAURANT_IMAGES = {
  hero: '/src/assets/images/hero_burger_gourmet_1792233740426.jpg',
  burgerSpecial: '/src/assets/images/burger_xx_special_1792233741771.jpg',
  hotdogSpecial: '/src/assets/images/hotdog_special_xdog_1792233743139.jpg',
  loadedFries: '/src/assets/images/loaded_fries_el_sabor_1792233742687.jpg',
  ambiance: '/src/assets/images/restaurant_ambiance_1792233743258.jpg',
};

// Categorias do Cardápio
export const MENU_CATEGORIES = [
  { id: 'todos', label: 'Todos os Itens', icon: '🍽️' },
  { id: 'burgers', label: 'Hambúrgueres', icon: '🍔' },
  { id: 'cachorros', label: 'Cachorros Quentes', icon: '🌭' },
  { id: 'sandes_e_porcoes', label: 'Sandes & Batatas', icon: '🍟' },
  { id: 'combos', label: 'Combos & Especiais', icon: '🍗' },
  { id: 'bebidas', label: 'Bebidas Geladas', icon: '🥤' },
] as const;

// Cardápio oficial extraído diretamente do folheto oficial da Edmilson Sabores
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hamburguer-normal',
    name: 'Hambúrguer Normal',
    price: 1450,
    category: 'burgers',
    description: 'Hambúrguer tradicional saboroso preparado na chapa com ingredientes frescos.',
    ingredients: ['Pão macio', 'Molho especial', 'Salada fresca', 'Batata palha', 'Bife de hambúrguer', 'Ovo frito', 'Queijo'],
    image: RESTAURANT_IMAGES.hero,
    available: true,
    popular: true,
  },
  {
    id: 'hamburguer-misto',
    name: 'Hambúrguer Misto',
    price: 1850,
    category: 'burgers',
    description: 'Combinação irresistível de carne com chouriço ou mortadela, queijo e bacon.',
    ingredients: ['Pão', 'Molho da casa', 'Salada', 'Batata palha', 'Chouriço ou mortadela', 'Bacon crocante', 'Queijo', 'Ovo', 'Bife'],
    image: RESTAURANT_IMAGES.burgerSpecial,
    available: true,
    badge: 'Popular',
    popular: true,
  },
  {
    id: 'x-burguer',
    name: 'X-Burguer',
    price: 2000,
    category: 'burgers',
    description: 'Mais recheio, sabor encorpado e dose extra de batatas para satisfazer a sua fome.',
    ingredients: ['Pão', 'Molho artesanal', 'Salada', 'Batata palha', 'Bife suculento', 'Mortadela', 'Bacon', 'Queijo derretido', 'Ovo', 'Chouriço', 'Batatas extra'],
    image: RESTAURANT_IMAGES.burgerSpecial,
    available: true,
    badge: 'Destaque',
    popular: true,
  },
  {
    id: 'xx-burguer',
    name: 'XX-Burguer (Completo + Bebida)',
    price: 2500,
    category: 'burgers',
    description: 'O monstro da casa! Duplamente recheado, com carnes, queijos, bacon e ainda inclui uma bebida gelada.',
    ingredients: ['Pão fofo', 'Molho da casa', 'Salada', 'Batata palha', 'Bife', 'Ovo', 'Queijo duplo', 'Mortadela', 'Bacon', 'Chouriço', 'Batatas extra', '1 Bebida inclusa'],
    image: RESTAURANT_IMAGES.burgerSpecial,
    available: true,
    badge: 'Mais Completo',
    popular: true,
  },
  {
    id: 'cachorro-normal',
    name: 'Cachorro Normal',
    price: 950,
    category: 'cachorros',
    description: 'Cachorro-quente clássico de rua bem servido, molho saboroso e crocância na medida certa.',
    ingredients: ['Pão de cachorro', 'Molho especial', 'Salada', 'Batata palha', 'Salsicha grelhada', 'Ovo', 'Milho doce'],
    image: RESTAURANT_IMAGES.hotdogSpecial,
    available: true,
    popular: true,
  },
  {
    id: 'cachorro-especial',
    name: 'Cachorro Especial (+ Bebida)',
    price: 1650,
    category: 'cachorros',
    description: 'Cachorro caprichado com mortadela, queijo derretido por cima e acompanha bebida refrescante.',
    ingredients: ['Pão', 'Molho especial', 'Salada', 'Batata palha', 'Salsicha', 'Ovo', 'Milho doce', 'Mortadela fatiada', 'Queijo derretido', '1 Bebida inclusa'],
    image: RESTAURANT_IMAGES.hotdogSpecial,
    available: true,
    badge: 'Top Dog',
    popular: true,
  },
  {
    id: 'xdog',
    name: 'XDog (+ 1 Dose)',
    price: 1900,
    category: 'cachorros',
    description: 'A versão super recheada do cachorro-quente para quem aprecia sabor marcante e recheio abundante.',
    ingredients: ['Pão', 'Molho', 'Salada', 'Batata palha', 'Salsicha', 'Ovo', 'Milho doce', 'Mortadela', 'Queijo derretido abundante', '+ 1 dose adicional'],
    image: RESTAURANT_IMAGES.hotdogSpecial,
    available: true,
    badge: 'Especial',
  },
  {
    id: 'sandes-mista',
    name: 'Sandes Mista',
    price: 800,
    category: 'sandes_e_porcoes',
    description: 'Sandes rápida e deliciosa recheada com ovos mistos na chapa, chouriço fatiado e mortadela.',
    ingredients: ['Pão fresco', 'Molho', 'Salada', 'Ovos mistos com salsichas', 'Chouriço fatiado', 'Mortadela'],
    image: RESTAURANT_IMAGES.hero,
    available: true,
  },
  {
    id: 'batatas-el-sabor',
    name: 'Batatas à El Sabor',
    price: 850,
    category: 'sandes_e_porcoes',
    description: 'Porção irresistível de batatas douradas e estaladiças preparadas com molho e temperos especiais.',
    ingredients: ['Batatas fritas crocantes', 'Molho especial da casa', 'Queijo ralado', 'Ervas e tempero especial'],
    image: RESTAURANT_IMAGES.loadedFries,
    available: true,
    badge: 'Favorito',
    popular: true,
  },
  {
    id: 'combo-família-ruas',
    name: 'Combo Edmilson Super Ruas',
    price: 3600,
    category: 'combos',
    description: '1 XX-Burguer completo + 1 Porção de Batatas à El Sabor + 1 Refrigerante gelado.',
    ingredients: ['XX-Burguer', 'Batatas à El Sabor', 'Refrigerante 330ml'],
    image: RESTAURANT_IMAGES.burgerSpecial,
    available: true,
    badge: 'Melhor Custo/Benefício',
  },
  {
    id: 'refrigerante-lata',
    name: 'Refrigerante Lata (Coca-Cola / Fanta / Sprite)',
    price: 700,
    category: 'bebidas',
    description: 'Lata 330ml bem gelada para acompanhar seu lanche favorito.',
    ingredients: ['Lata 330ml bem fresca (escolha Coca-Cola, Fanta ou Sprite nas observações)'],
    image: RESTAURANT_IMAGES.loadedFries,
    available: true,
  },
  {
    id: 'sumo-compal',
    name: 'Sumo Compal Néctar',
    price: 800,
    category: 'bebidas',
    description: 'Sumo néctar de fruta fresca e refrescante.',
    ingredients: ['Garrafa/Pacote individual com sabores variados'],
    image: RESTAURANT_IMAGES.loadedFries,
    available: true,
  },
  {
    id: 'agua-mineral',
    name: 'Água Mineral Natural 500ml',
    price: 350,
    category: 'bebidas',
    description: 'Água pura e refrescante, servida à temperatura ambiente ou bem gelada.',
    ingredients: ['Água mineral engarrafada 500ml'],
    image: RESTAURANT_IMAGES.loadedFries,
    available: true,
  },
  {
    id: 'sobremesa-especial',
    name: 'Pudim Caseiro da Casa',
    price: 900,
    category: 'sandes_e_porcoes',
    description: 'Fatia de sobremesa caseira para encerrar sua refeição com chave de ouro.',
    ingredients: ['Leite condensado', 'Calda de caramelo', 'Ovos frescos'],
    image: RESTAURANT_IMAGES.loadedFries,
    available: false, // Exemplo de item indisponível conforme solicitado pelo usuário
    badge: 'Esgotado hoje',
  }
];

// Formatação monetária em Kwanzas
export function formatKz(amount: number): string {
  return new Intl.NumberFormat('pt-AO', {
    maximumFractionDigits: 0,
  }).format(amount) + ' Kz';
}
