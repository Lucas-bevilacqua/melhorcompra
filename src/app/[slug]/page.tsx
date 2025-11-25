import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";
import { ProsCons } from "@/components/reviews/ProsCons";
import { ProductSpecs } from "@/components/reviews/ProductSpecs";
import { ReviewScore } from "@/components/reviews/ReviewScore";
import { ComparisonTable } from "@/components/reviews/ComparisonTable";
import { Button } from "@/components/ui/button";

const components = {
    ProsCons,
    ProductSpecs,
    ReviewScore,
    ComparisonTable,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge,
    Separator,
    Button,
};

export async function generateStaticParams() {
    const reviews = await db.review.findMany({
        where: { published: true },
        select: { slug: true },
    });

    return reviews.map((review) => ({
        slug: review.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const review = await db.review.findUnique({
        where: { slug },
    });

    if (!review) {
        return {
            title: "Review não encontrado",
        };
    }

    return {
        title: review.metaTitle || review.title,
        description: review.metaDescription || review.excerpt,
        keywords: review.keywords,
        authors: [{ name: review.author?.name || "Equipe MelhorCompra" }],
        openGraph: {
            title: review.metaTitle || review.title,
            description: review.metaDescription || review.excerpt,
            type: "article",
            publishedTime: review.publishedAt?.toISOString(),
            modifiedTime: review.updatedAt.toISOString(),
            authors: [review.author?.name || "Equipe MelhorCompra"],
            images: review.mainImage ? [review.mainImage] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: review.metaTitle || review.title,
            description: review.metaDescription || review.excerpt,
            images: review.mainImage ? [review.mainImage] : [],
        },
    };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const review = await db.review.findUnique({
        where: { slug },
        include: {
            author: true,
            category: true,
            products: {
                include: {
                    affiliateLinks: true,
                },
            },
        },
    });

    if (!review || !review.published) {
        notFound();
    }

    const relatedReviews = await db.review.findMany({
        where: {
            categoryId: review.categoryId,
            published: true,
            NOT: {
                id: review.id,
            },
        },
        take: 3,
        include: {
            category: true,
        },
    });

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = review.content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min de leitura`;

    return (
        <>
            <Header />
            <main>
                {/* Breadcrumbs */}
                <div className="border-b border-neutral-200 bg-neutral-50 py-4">
                    <div className="container">
                        <nav className="flex items-center space-x-2 text-sm text-neutral-600">
                            <Link href="/" className="hover:text-primary-600">
                                Home
                            </Link>
                            <span>/</span>
                            <Link
                                href={`/categorias/${review.category.slug}`}
                                className="hover:text-primary-600"
                            >
                                {review.category.name}
                            </Link>
                            <span>/</span>
                            <span className="text-neutral-900">{review.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Article Header */}
                <article className="py-12">
                    <div className="container max-w-4xl">
                        <div className="mb-8">
                            <Badge className="mb-4">{review.category.name}</Badge>
                            <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                                {review.title}
                            </h1>
                            <p className="mb-6 text-xl text-neutral-600">{review.excerpt}</p>

                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{review.author.name || "Equipe MelhorCompra"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Publicado em {formatDate(review.publishedAt?.toISOString() || review.createdAt.toISOString())}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{readingTime}</span>
                                </div>
                            </div>

                            {review.updatedAt && review.updatedAt.getTime() !== review.createdAt.getTime() && (
                                <p className="mt-2 text-sm text-neutral-500">
                                    Atualizado em {formatDate(review.updatedAt.toISOString())}
                                </p>
                            )}
                        </div>

                        <Separator className="mb-8" />

                        {/* MDX Content */}
                        <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-neutral-900 prose-pre:text-neutral-100">
                            <MDXRemote source={review.content} components={components} />
                        </div>

                        <Separator className="my-12" />

                        {/* Disclaimer */}
                        <div className="rounded-lg bg-neutral-50 p-6 text-sm text-neutral-600">
                            <p>
                                <strong>Nota:</strong> Alguns links neste artigo são links de
                                afiliados. Se você comprar através deles, podemos receber uma
                                pequena comissão sem custo adicional para você. Isso nos ajuda a
                                manter o site e continuar criando reviews honestos.
                            </p>
                        </div>
                    </div>
                </article>

                {/* Related Reviews */}
                {relatedReviews.length > 0 && (
                    <section className="section bg-neutral-50">
                        <div className="container max-w-4xl">
                            <h2 className="mb-8 font-display text-3xl font-bold">
                                Artigos Relacionados
                            </h2>
                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedReviews.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/${related.slug}`}
                                        className="group"
                                    >
                                        <Card className="h-full transition-all hover:shadow-lg">
                                            <CardHeader>
                                                <Badge variant="secondary" className="mb-2 w-fit">
                                                    {related.category.name}
                                                </Badge>
                                                <CardTitle className="line-clamp-2 text-lg group-hover:text-primary-600 transition-colors">
                                                    {related.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2">
                                                    {related.excerpt}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
