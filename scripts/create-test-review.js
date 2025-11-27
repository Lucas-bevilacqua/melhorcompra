const VERCEL_URL = "https://melhorcompra.vercel.app";
const SETUP_SECRET = "melhorcompra-setup-2025";

async function createTestReview() {
    console.log("🚀 Criando review de teste...\n");

    try {
        // Primeiro, criar uma categoria
        const categoryResponse = await fetch(`${VERCEL_URL}/api/setup/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                secret: SETUP_SECRET,
                name: "Informática",
                slug: "informatica",
                description: "Reviews de informática"
            }),
        });

        const categoryData = await categoryResponse.json();
        console.log("✅ Categoria criada:", categoryData);

        // Depois, criar um review
        const reviewResponse = await fetch(`${VERCEL_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Melhor Notebook 2025",
                slug: "melhor-notebook-2025",
                excerpt: "Descubra os melhores notebooks de 2025 com análises detalhadas e comparações.",
                content: `# Melhor Notebook 2025

Neste guia completo, analisamos os melhores notebooks disponíveis em 2025.

## Top 3 Notebooks

1. **Dell XPS 15** - Melhor para profissionais
2. **MacBook Pro M3** - Melhor para criadores
3. **Lenovo ThinkPad** - Melhor custo-benefício

## Conclusão

Escolha o notebook ideal para suas necessidades!`,
                published: true,
                featured: true,
                metaTitle: "Melhor Notebook 2025 | Guia Completo",
                metaDescription: "Descubra os melhores notebooks de 2025 com análises detalhadas",
                keywords: ["notebook", "laptop", "2025", "review"],
                categoryId: categoryData.id,
            }),
        });

        const reviewData = await reviewResponse.json();

        if (!reviewResponse.ok) {
            throw new Error(`Erro ao criar review: ${JSON.stringify(reviewData)}`);
        }

        console.log("\n✅ Review criado com sucesso!");
        console.log(`   Título: ${reviewData.title}`);
        console.log(`   Slug: ${reviewData.slug}`);
        console.log(`   URL: ${VERCEL_URL}/${reviewData.slug}`);

    } catch (error) {
        console.error("\n❌ Erro:", error.message);
    }
}

createTestReview();
