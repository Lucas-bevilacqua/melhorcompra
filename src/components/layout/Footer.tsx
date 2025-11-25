import Link from "next/link";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-50">
            <div className="container">
                <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
                                <span className="text-lg font-bold text-white">M</span>
                            </div>
                            <span className="font-display text-xl font-bold">
                                {SITE_CONFIG.name}
                            </span>
                        </div>
                        <p className="text-sm text-neutral-600">
                            {SITE_CONFIG.tagline}
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href={`https://instagram.com/${SITE_CONFIG.social.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href={`https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href={`https://youtube.com/${SITE_CONFIG.social.youtube.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Categorias</h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/categorias/${category.slug}`}
                                        className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Empresa</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/sobre"
                                    className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/metodologia"
                                    className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                                >
                                    Metodologia
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contato"
                                    className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                                >
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Newsletter</h3>
                        <p className="text-sm text-neutral-600">
                            Receba reviews e ofertas exclusivas
                        </p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                            >
                                Inscrever
                            </button>
                        </form>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
                    <p className="text-sm text-neutral-600">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
                    </p>
                    <div className="flex space-x-6">
                        <Link
                            href="/privacidade"
                            className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                        >
                            Privacidade
                        </Link>
                        <Link
                            href="/termos"
                            className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                        >
                            Termos
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
