import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Package, LogOut } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
        redirect("/admin/login");
    }

    return (
        <div className="flex h-screen bg-neutral-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary-600">Admin</h1>
                    <p className="text-sm text-neutral-600">MelhorCompra</p>
                </div>

                <nav className="mt-6">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-neutral-100"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/reviews"
                        className="flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-neutral-100"
                    >
                        <FileText className="h-5 w-5" />
                        Reviews
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-neutral-100"
                    >
                        <Package className="h-5 w-5" />
                        Produtos
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-64 border-t p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">{session.user.name}</p>
                            <p className="text-xs text-neutral-600">{session.user.email}</p>
                        </div>
                        <form action="/api/auth/signout" method="POST">
                            <button
                                type="submit"
                                className="text-neutral-600 hover:text-neutral-900"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
    );
}
