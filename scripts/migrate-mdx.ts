import { db } from "../src/lib/db";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function main() {
    console.log("Starting migration...");

    // Create categories first
    const categories = [
        { name: "Eletrônicos", slug: "eletronicos", description: "Reviews de eletrônicos" },
        { name: "Informática", slug: "informatica", description: "Reviews de informática" },
        { name: "Casa", slug: "casa", description: "Reviews de produtos para casa" },
    ];

    console.log("Creating categories...");
    for (const cat of categories) {
        await db.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    // Get admin user
    const adminUser = await db.user.findFirst({
        where: { role: "admin" },
    });

    if (!adminUser) {
        console.error("No admin user found! Run create-admin.ts first.");
        return;
    }

    // Read MDX files
    const reviewsDir = path.join(process.cwd(), "src/content/reviews");

    if (!fs.existsSync(reviewsDir)) {
        console.log("No reviews directory found.");
        return;
    }

    const files = fs.readdirSync(reviewsDir).filter((f) => f.endsWith(".mdx"));

    console.log(`Found ${files.length} MDX files to migrate...`);

    for (const file of files) {
        const filePath = path.join(reviewsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        const slug = file.replace(".mdx", "");

        // Find or create category
        let category = await db.category.findFirst({
            where: { name: data.category },
        });

        if (!category) {
            category = await db.category.create({
                data: {
                    name: data.category,
                    slug: data.category.toLowerCase().replace(/\s+/g, "-"),
                    description: `Reviews de ${data.category}`,
                },
            });
        }

        // Check if review already exists
        const existing = await db.review.findUnique({
            where: { slug },
        });

        if (existing) {
            console.log(`Skipping ${slug} - already exists`);
            continue;
        }

        // Create review
        const review = await db.review.create({
            data: {
                title: data.title,
                slug,
                excerpt: data.excerpt,
                content,
                published: data.featured || false,
                featured: data.featured || false,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                keywords: data.keywords || [],
                mainImage: data.mainImage,
                authorId: adminUser.id,
                categoryId: category.id,
                publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
            },
        });

        console.log(`✓ Migrated: ${review.title}`);
    }

    console.log("Migration complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
