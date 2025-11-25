export const SITE_CONFIG = {
    name: 'MelhorCompra',
    tagline: 'Reviews honestos para você comprar melhor',
    description: 'Reviews honestos, comparações detalhadas e preços atualizados. Descubra os melhores produtos antes de comprar.',
    url: 'https://melhorcompra.com.br',
    author: 'Equipe MelhorCompra',
    email: 'contato@melhorcompra.com.br',
    social: {
        twitter: '@melhorcompra',
        instagram: '@melhorcompra',
        youtube: '@melhorcompra',
    },
};

export const CATEGORIES = [
    {
        id: 'eletronicos',
        name: 'Eletrônicos',
        slug: 'eletronicos',
        description: 'Celulares, notebooks, tablets e mais',
        icon: 'Smartphone',
    },
    {
        id: 'casa',
        name: 'Casa & Eletrodomésticos',
        slug: 'casa',
        description: 'Geladeiras, ar condicionado, fogões e mais',
        icon: 'Home',
    },
    {
        id: 'gaming',
        name: 'Gaming',
        slug: 'gaming',
        description: 'Notebooks gamer, monitores, periféricos',
        icon: 'Gamepad2',
    },
    {
        id: 'fitness',
        name: 'Fitness',
        slug: 'fitness',
        description: 'Esteiras, smartbands, bicicletas',
        icon: 'Dumbbell',
    },
    {
        id: 'audio',
        name: 'Áudio',
        slug: 'audio',
        description: 'Fones, caixas de som, soundbars',
        icon: 'Headphones',
    },
] as const;

export const AFFILIATE_STORES = [
    {
        id: 'amazon',
        name: 'Amazon',
        logo: '/images/stores/amazon.svg',
    },
    {
        id: 'mercadolivre',
        name: 'Mercado Livre',
        logo: '/images/stores/ml.svg',
    },
    {
        id: 'shopee',
        name: 'Shopee',
        logo: '/images/stores/shopee.svg',
    },
    {
        id: 'magalu',
        name: 'Magalu',
        logo: '/images/stores/magalu.svg',
    },
] as const;
