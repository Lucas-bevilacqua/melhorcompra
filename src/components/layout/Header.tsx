"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
                            <span className="text-lg font-bold text-white">M</span>
                        </div>
                        <span className="hidden font-display text-xl font-bold sm:inline-block">
                            {SITE_CONFIG.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-6 md:flex">
                        {CATEGORIES.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categorias/${category.slug}`}
                                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="hidden md:flex">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Buscar</span>
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
