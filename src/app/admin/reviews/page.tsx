import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function ReviewsPage() {
    const reviews = await db.review.findMany({
        include: {
            author: {
                select: {
                    name: true,
                },
            },
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reviews</h1>
                    <p className="mt-2 text-neutral-600">
                        Gerencie todos os reviews do site
                    </p>
                </div>
                <Link href="/admin/reviews/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Review
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Todos os Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {reviews.length === 0 ? (
                            <p className="text-center text-neutral-600 py-8">
                                Nenhum review encontrado. Crie o primeiro!
                            </p>
                        ) : (
                            reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="flex items-center justify-between border-b pb-4 last:border-0"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{review.title}</h3>
                                            {review.published ? (
                                                <Badge variant="default">Publicado</Badge>
                                            ) : (
                                                <Badge variant="secondary">Rascunho</Badge>
                                            )}
                                            {review.featured && (
                                                <Badge variant="outline">Destaque</Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-neutral-600 mt-1">
                                            {review.category.name} • {review.author.name}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/reviews/${review.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
