import { cn } from "@/lib/utils";
import { Check, X, Minus } from "lucide-react";

interface ComparisonTableProps {
    products: {
        name: string;
        image?: string;
        price: string;
        rating: number;
        features: {
            [key: string]: string | boolean | null;
        };
    }[];
    features: string[];
    className?: string;
}

export function ComparisonTable({ products, features, className }: ComparisonTableProps) {
    return (
        <div className={cn("overflow-x-auto rounded-lg border border-neutral-200", className)}>
            <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                        <th className="p-4 font-display font-bold text-neutral-900 min-w-[150px]">
                            Recurso
                        </th>
                        {products.map((product, index) => (
                            <th key={index} className="p-4 font-display font-bold text-neutral-900 min-w-[150px]">
                                {product.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                    {/* Price Row */}
                    <tr className="bg-white">
                        <td className="p-4 font-medium text-neutral-600">Preço</td>
                        {products.map((product, index) => (
                            <td key={index} className="p-4 font-bold text-primary-600">
                                {product.price}
                            </td>
                        ))}
                    </tr>

                    {/* Rating Row */}
                    <tr className="bg-neutral-50/50">
                        <td className="p-4 font-medium text-neutral-600">Nota</td>
                        {products.map((product, index) => (
                            <td key={index} className="p-4 font-bold text-neutral-900">
                                {product.rating}/10
                            </td>
                        ))}
                    </tr>

                    {/* Feature Rows */}
                    {features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className={featureIndex % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
                            <td className="p-4 font-medium text-neutral-600">{feature}</td>
                            {products.map((product, productIndex) => {
                                const value = product.features[feature];
                                return (
                                    <td key={productIndex} className="p-4 text-neutral-900">
                                        {typeof value === "boolean" ? (
                                            value ? (
                                                <Check className="h-5 w-5 text-success-500" />
                                            ) : (
                                                <X className="h-5 w-5 text-danger-500" />
                                            )
                                        ) : value === null || value === undefined ? (
                                            <Minus className="h-5 w-5 text-neutral-300" />
                                        ) : (
                                            <span>{value}</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
