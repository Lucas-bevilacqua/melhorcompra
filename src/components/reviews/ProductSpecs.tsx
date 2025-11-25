import { cn } from "@/lib/utils";

interface ProductSpecsProps {
    specs: {
        label: string;
        value: string;
    }[];
    title?: string;
    className?: string;
}

export function ProductSpecs({ specs, title = "Especificações Técnicas", className }: ProductSpecsProps) {
    return (
        <div className={cn("overflow-hidden rounded-lg border border-neutral-200", className)}>
            {title && (
                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
                    <h3 className="font-display text-lg font-bold text-neutral-900">{title}</h3>
                </div>
            )}
            <div className="divide-y divide-neutral-200">
                {specs.map((spec, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 sm:gap-4 hover:bg-neutral-50/50 transition-colors"
                    >
                        <dt className="font-medium text-neutral-600">{spec.label}</dt>
                        <dd className="text-neutral-900 sm:col-span-2">{spec.value}</dd>
                    </div>
                ))}
            </div>
        </div>
    );
}
