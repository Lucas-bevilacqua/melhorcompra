import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface ReviewScoreProps {
    score: number; // 0 to 10
    maxScore?: number;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
    className?: string;
}

export function ReviewScore({
    score,
    maxScore = 10,
    size = "md",
    showLabel = true,
    className,
}: ReviewScoreProps) {
    // Calculate percentage for color coding
    const percentage = (score / maxScore) * 100;

    let colorClass = "bg-danger-500";
    if (percentage >= 80) colorClass = "bg-success-500";
    else if (percentage >= 60) colorClass = "bg-primary-500";
    else if (percentage >= 40) colorClass = "bg-yellow-500";

    const sizeClasses = {
        sm: "h-8 w-8 text-sm",
        md: "h-12 w-12 text-lg",
        lg: "h-16 w-16 text-2xl",
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div
                className={cn(
                    "flex items-center justify-center rounded-full font-bold text-white shadow-sm",
                    colorClass,
                    sizeClasses[size]
                )}
            >
                {score}
            </div>
            {showLabel && (
                <div className="flex flex-col">
                    <span className="font-display font-bold text-neutral-900">
                        Nota do Editor
                    </span>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => {
                            const starValue = (i + 1) * 2;
                            const isFull = score >= starValue;
                            const isHalf = score >= starValue - 1 && score < starValue;

                            return (
                                <span key={i} className="text-yellow-400">
                                    {isFull ? (
                                        <Star className="h-4 w-4 fill-current" />
                                    ) : isHalf ? (
                                        <StarHalf className="h-4 w-4 fill-current" />
                                    ) : (
                                        <Star className="h-4 w-4 text-neutral-300" />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
