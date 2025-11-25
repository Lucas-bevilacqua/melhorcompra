import { SITE_CONFIG } from "@/lib/constants";

interface StructuredDataProps {
    type: "Organization" | "WebSite" | "Article" | "Review" | "Product" | "FAQPage" | "BreadcrumbList";
    data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
    let schema: any = {};

    switch (type) {
        case "Organization":
            schema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                logo: `${SITE_CONFIG.url}/logo.png`,
                description: SITE_CONFIG.description,
                sameAs: [
                    `https://instagram.com/${SITE_CONFIG.social.instagram.replace('@', '')}`,
                    `https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`,
                    `https://youtube.com/${SITE_CONFIG.social.youtube.replace('@', '')}`,
                ],
            };
            break;

        case "WebSite":
            schema = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                description: SITE_CONFIG.description,
                publisher: {
                    "@type": "Organization",
                    name: SITE_CONFIG.name,
                },
            };
            break;

        case "Article":
            schema = {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: data.title,
                description: data.excerpt,
                image: data.mainImage,
                datePublished: data.publishedAt,
                dateModified: data.updatedAt || data.publishedAt,
                author: {
                    "@type": "Organization",
                    name: data.author || SITE_CONFIG.author,
                },
                publisher: {
                    "@type": "Organization",
                    name: SITE_CONFIG.name,
                    logo: {
                        "@type": "ImageObject",
                        url: `${SITE_CONFIG.url}/logo.png`,
                    },
                },
            };
            break;

        case "Review":
            schema = {
                "@context": "https://schema.org",
                "@type": "Review",
                itemReviewed: {
                    "@type": "Product",
                    name: data.productName,
                },
                author: {
                    "@type": "Organization",
                    name: data.author || SITE_CONFIG.author,
                },
                reviewRating: data.rating
                    ? {
                        "@type": "Rating",
                        ratingValue: data.rating,
                        bestRating: "10",
                        worstRating: "0",
                    }
                    : undefined,
                reviewBody: data.excerpt,
            };
            break;

        case "Product":
            schema = {
                "@context": "https://schema.org",
                "@type": "Product",
                name: data.name,
                image: data.image,
                description: data.description,
                brand: data.brand
                    ? {
                        "@type": "Brand",
                        name: data.brand,
                    }
                    : undefined,
                aggregateRating: data.rating
                    ? {
                        "@type": "AggregateRating",
                        ratingValue: data.rating,
                        bestRating: "10",
                        worstRating: "0",
                        ratingCount: "1",
                    }
                    : undefined,
                offers: data.offers
                    ? {
                        "@type": "AggregateOffer",
                        lowPrice: Math.min(...data.offers.map((o: any) => o.price)),
                        highPrice: Math.max(...data.offers.map((o: any) => o.price)),
                        priceCurrency: "BRL",
                        offerCount: data.offers.length,
                        offers: data.offers.map((offer: any) => ({
                            "@type": "Offer",
                            seller: {
                                "@type": "Organization",
                                name: offer.store,
                            },
                            price: offer.price,
                            priceCurrency: "BRL",
                            url: offer.url,
                            availability: offer.inStock
                                ? "https://schema.org/InStock"
                                : "https://schema.org/OutOfStock",
                        })),
                    }
                    : undefined,
            };
            break;

        case "FAQPage":
            schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: data.questions.map((q: any) => ({
                    "@type": "Question",
                    name: q.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: q.answer,
                    },
                })),
            };
            break;

        case "BreadcrumbList":
            schema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: data.items.map((item: any, index: number) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name,
                    item: item.url,
                })),
            };
            break;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
