import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package, Eye, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
    const [reviewCount, productCount, publishedCount] = await Promise.all([
        db.review.count(),
        db.product.count(),
        db.review.count({ where: { published: true } }),
    ]);

    const stats = [
        {
            title: "Total de Reviews",
            value: reviewCount,
            icon: FileText,
            description: `${publishedCount} publicados`,
        },
        {
            title: "Produtos",
            value: productCount,
            icon: Package,
            description: "Total cadastrados",
        },
        {
            title: "Rascunhos",
            value: reviewCount - publishedCount,
            icon: Eye,
            description: "Aguardando publicação",
        },
        {
            title: "Taxa de Publicação",
            value: reviewCount > 0 ? `${Math.round((publishedCount / reviewCount) * 100)}%` : "0%",
            icon: TrendingUp,
            description: "Reviews publicados",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-2 text-neutral-600">
                    Visão geral do painel administrativo
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-neutral-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-neutral-600">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Bem-vindo ao Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-neutral-600">
                        Use o menu lateral para gerenciar reviews e produtos.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
