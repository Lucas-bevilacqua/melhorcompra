export default function TestPage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Test Page Works!</h1>
                <p className="text-xl">Slug: {params.slug}</p>
            </div>
        </div>
    );
}

export function generateStaticParams() {
    return [
        { slug: 'test-1' },
        { slug: 'test-2' },
        { slug: 'melhor-notebook-2025' }
    ];
}
