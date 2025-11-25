import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
    try {
        // Simple security check - only allow in development or with secret
        const { secret } = await request.json();

        if (process.env.NODE_ENV === "production" && secret !== process.env.SETUP_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = "admin@melhorcompra.com.br";
        const password = "admin123"; // Change this after first login!

        const hashedPassword = await hash(password, 10);

        const user = await db.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                password: hashedPassword,
                name: "Admin",
                role: "admin",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Admin user created",
            email,
            userId: user.id,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
