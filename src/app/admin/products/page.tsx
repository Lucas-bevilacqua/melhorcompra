import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Produtos</h1>
                <p className="mt-2 text-neutral-600">
                    Gerencie produtos e links de afiliados
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gerenciamento de Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-neutral-600">
                        Os produtos são gerenciados dentro de cada review. Vá para a página de reviews para adicionar produtos.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
