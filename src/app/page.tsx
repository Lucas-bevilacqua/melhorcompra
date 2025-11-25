import Link from "next/link";
import { ArrowRight, Smartphone, Home, Gamepad2, Dumbbell, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getFeaturedReviews } from "@/lib/mdx";
import { StructuredData } from "@/components/seo/StructuredData";

// Icon mapping
const iconMap: Record<string, any> = {
  Smartphone,
  Home,
  Gamepad2,
  Dumbbell,
  Headphones,
};

export default function HomePage() {
  const featuredReviews = getFeaturedReviews(6);

  return (
    <>
      <StructuredData type="Organization" data={{}} />
      <StructuredData type="WebSite" data={{}} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative">
            <div className="flex min-h-[500px] flex-col items-center justify-center space-y-8 py-20 text-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Reviews Honestos
              </Badge>
              <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Reviews honestos para você{" "}
                <span className="text-primary-100">comprar melhor</span>
              </h1>
              <p className="max-w-2xl text-lg text-primary-50 md:text-xl">
                Testamos produtos reais e comparamos preços em tempo real para
                você economizar e tomar decisões informadas
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#reviews">
                    Ver Reviews
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                  <Link href="/sobre">
                    Como Testamos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Reviews */}
        <section id="reviews" className="section bg-neutral-50">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-4xl font-bold">
                Reviews em Destaque
              </h2>
              <p className="text-lg text-neutral-600">
                Análises completas dos produtos mais procurados
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredReviews.map((review) => (
                <Link
                  key={review.slug}
                  href={`/${review.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg">
                    <div className="aspect-video overflow-hidden rounded-t-lg bg-neutral-200">
                      {/* Placeholder image - será substituído por imagens reais */}
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                        <span className="text-4xl font-bold text-primary-600">
                          {review.title.split(" ")[1]?.charAt(0) || "M"}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="mb-2">
                        <Badge variant="secondary">{review.category}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary-600 transition-colors">
                        {review.title}
                      </CardTitle>
                      <CardDescription>{review.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/reviews">
                  Ver Todos os Reviews
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-4xl font-bold">
                Explore por Categoria
              </h2>
              <p className="text-lg text-neutral-600">
                Encontre reviews organizados por tipo de produto
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <Link
                    key={category.id}
                    href={`/categorias/${category.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary-300">
                      <CardHeader>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                          {Icon && <Icon className="h-6 w-6" />}
                        </div>
                        <CardTitle className="group-hover:text-primary-600 transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="text-sm font-medium text-primary-600 group-hover:underline">
                          Ver reviews →
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-neutral-900 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-display text-4xl font-bold">
                Receba reviews exclusivos
              </h2>
              <p className="mb-8 text-lg text-neutral-300">
                Cadastre-se e receba análises de produtos, ofertas e dicas de
                compra direto no seu email
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button size="lg" variant="default">
                  Inscrever
                </Button>
              </form>
              <p className="mt-4 text-sm text-neutral-400">
                Sem spam. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
