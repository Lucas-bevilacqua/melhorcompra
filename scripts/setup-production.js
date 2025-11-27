const VERCEL_URL = "https://melhorcompra.vercel.app"; // Substitua pelo seu domínio
const SETUP_SECRET = "melhorcompra-setup-2025"; // Use o mesmo secret que você colocou na Vercel

async function setupProduction() {
    console.log("🚀 Iniciando setup do banco de dados em produção...\n");

    try {
        // 1. Criar admin user
        console.log("1️⃣ Criando usuário admin...");
        const adminResponse = await fetch(`${VERCEL_URL}/api/setup/create-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ secret: SETUP_SECRET }),
        });

        const adminData = await adminResponse.json();

        if (!adminResponse.ok) {
            throw new Error(`Erro ao criar admin: ${adminData.error}`);
        }

        console.log("✅ Admin criado com sucesso!");
        console.log(`   Email: ${adminData.email}`);
        console.log(`   User ID: ${adminData.userId}\n`);

        // 2. Migrar conteúdo
        console.log("2️⃣ Migrando conteúdo MDX para o banco...");
        const migrateResponse = await fetch(`${VERCEL_URL}/api/setup/migrate-content`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ secret: SETUP_SECRET }),
        });

        const migrateData = await migrateResponse.json();

        if (!migrateResponse.ok) {
            throw new Error(`Erro ao migrar conteúdo: ${migrateData.error}`);
        }

        console.log("✅ Conteúdo migrado com sucesso!");
        console.log(`   Reviews migrados: ${migrateData.migrated.join(", ")}\n`);

        console.log("🎉 Setup completo!");
        console.log("\n📝 Credenciais de acesso:");
        console.log("   URL: https://melhorcompra.vercel.app/admin/login");
        console.log("   Email: admin@melhorcompra.com.br");
        console.log("   Senha: admin123");
        console.log("\n⚠️  IMPORTANTE: Troque a senha após o primeiro login!");

    } catch (error) {
        console.error("\n❌ Erro durante o setup:");
        console.error(error.message);
        process.exit(1);
    }
}

setupProduction();
