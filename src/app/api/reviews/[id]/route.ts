import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const review = await db.review.findUnique({
            where: { id },
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
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch review" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const review = await db.review.update({
            where: { id },
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.excerpt,
                content: body.content,
                published: body.published,
                featured: body.featured,
                metaTitle: body.metaTitle,
                metaDescription: body.metaDescription,
                keywords: body.keywords,
                mainImage: body.mainImage,
                categoryId: body.categoryId,
                publishedAt: body.published && !body.publishedAt ? new Date() : body.publishedAt,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update review" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await db.review.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete review" },
            { status: 500 }
        );
    }
}
