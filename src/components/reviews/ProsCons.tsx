import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProsConsProps {
    pros?: string[];
    cons?: string[];
    className?: string;
}

export function ProsCons({ pros = [], cons = [], className }: ProsConsProps) {
    return (
        <div className={cn("grid gap-6 md:grid-cols-2", className)}>
            {/* Pros */}
            <div className="rounded-lg border border-success-200 bg-success-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-success-700">
                    <Check className="h-5 w-5" />
                    Prós
                </h3>
                <ul className="space-y-3">
                    {pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-success-900">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-success-600" />
                            <span>{pro}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cons */}
            <div className="rounded-lg border border-danger-200 bg-danger-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-danger-700">
                    <X className="h-5 w-5" />
                    Contras
                </h3>
                <ul className="space-y-3">
                    {cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-danger-900">
                            <X className="mt-1 h-4 w-4 shrink-0 text-danger-600" />
                            <span>{con}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
