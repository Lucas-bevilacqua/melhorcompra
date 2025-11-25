import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function POST(request: Request) {
    try {
        // Simple security check
        const { secret } = await request.json();

        if (process.env.NODE_ENV === "production" && secret !== process.env.SETUP_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Create categories
        const categories = [
            { name: "Eletrônicos", slug: "eletronicos", description: "Reviews de eletrônicos" },
            { name: "Informática", slug: "informatica", description: "Reviews de informática" },
            { name: "Casa", slug: "casa", description: "Reviews de produtos para casa" },
        ];

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
            return NextResponse.json(
                { error: "No admin user found. Run /api/setup/create-admin first." },
                { status: 400 }
            );
        }

        // Read MDX files
        const reviewsDir = path.join(process.cwd(), "src/content/reviews");

        if (!fs.existsSync(reviewsDir)) {
            return NextResponse.json(
                { error: "No reviews directory found." },
                { status: 404 }
            );
        }

        const files = fs.readdirSync(reviewsDir).filter((f) => f.endsWith(".mdx"));
        const migrated = [];

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

            migrated.push(review.title);
        }

        return NextResponse.json({
            success: true,
            message: "Migration complete",
            migrated,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
