import { db } from "../src/lib/db";
import { hash } from "bcryptjs";

async function main() {
    const email = "admin@melhorcompra.com.br";
    const password = "admin123"; // Change this!

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

    console.log("Admin user created:");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User ID:", user.id);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
