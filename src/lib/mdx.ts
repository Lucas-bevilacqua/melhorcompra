import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const reviewsDirectory = path.join(process.cwd(), 'src/content/reviews');

export interface ReviewFrontmatter {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    updatedAt?: string;
    featured?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    author?: string;
    mainImage?: string;
}

export interface Review extends ReviewFrontmatter {
    content: string;
    readingTime: string;
}

export function getAllReviews(): Review[] {
    // Verificar se o diretório existe
    if (!fs.existsSync(reviewsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(reviewsDirectory);
    const allReviews = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(reviewsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            const { text } = readingTime(content);

            return {
                slug,
                content,
                readingTime: text,
                ...(data as ReviewFrontmatter),
            };
        });

    // Ordenar por data de publicação (mais recente primeiro)
    return allReviews.sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

export function getReviewBySlug(slug: string): Review | null {
    try {
        const fullPath = path.join(reviewsDirectory, `${slug}.mdx`);
        console.log('[getReviewBySlug] Looking for:', fullPath);
        console.log('[getReviewBySlug] File exists:', fs.existsSync(fullPath));

        if (!fs.existsSync(fullPath)) {
            console.log('[getReviewBySlug] File not found, returning null');
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const { text } = readingTime(content);

        console.log('[getReviewBySlug] Successfully loaded review:', data.title);
        return {
            slug,
            content,
            readingTime: text,
            ...(data as ReviewFrontmatter),
        };
    } catch (error) {
        console.error('[getReviewBySlug] Error:', error);
        return null;
    }
}

export function getReviewsByCategory(category: string): Review[] {
    const allReviews = getAllReviews();
    return allReviews.filter(
        (review) => review.category.toLowerCase() === category.toLowerCase()
    );
}

export function getFeaturedReviews(limit: number = 6): Review[] {
    const allReviews = getAllReviews();
    return allReviews.filter((review) => review.featured).slice(0, limit);
}

export function getRelatedReviews(currentSlug: string, category: string, limit: number = 3): Review[] {
    const categoryReviews = getReviewsByCategory(category);
    return categoryReviews
        .filter((review) => review.slug !== currentSlug)
        .slice(0, limit);
}

export function getAllSlugs(): string[] {
    if (!fs.existsSync(reviewsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(reviewsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
