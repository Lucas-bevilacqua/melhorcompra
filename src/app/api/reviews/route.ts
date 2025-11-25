import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const reviews = await db.review.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                category: true,
                products: {
                    include: {
                        affiliateLinks: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const review = await db.review.create({
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.excerpt,
                content: body.content,
                published: body.published || false,
                featured: body.featured || false,
                metaTitle: body.metaTitle,
                metaDescription: body.metaDescription,
                keywords: body.keywords || [],
                mainImage: body.mainImage,
                authorId: session.user.id!,
                categoryId: body.categoryId,
                publishedAt: body.published ? new Date() : null,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}
