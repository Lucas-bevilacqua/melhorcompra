# Configuração de Variáveis de Ambiente na Vercel

## Variáveis Necessárias

Você precisa adicionar estas variáveis no painel da Vercel:

### 1. Database (Vercel Postgres)
```
DATABASE_URL=postgres://ff9bc8373185cb99a948b2c7f17dfe732d77f33fe2cd6e6fb5c9491ce5cffecc:sk_PpIP-wG3vqPHcP80CT2Jq@db.prisma.io:5432/postgres?sslmode=require
POSTGRES_URL=postgres://ff9bc8373185cb99a948b2c7f17dfe732d77f33fe2cd6e6fb5c9491ce5cffecc:sk_PpIP-wG3vqPHcP80CT2Jq@db.prisma.io:5432/postgres?sslmode=require
PRISMA_DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19QcElQLXdHM3ZxUEhjUDgwQ1QySnEiLCJhcGlfa2V5IjoiMDFLQVk4OVdOSFlaOEI0SkFQUEJWMVgyRkUiLCJ0ZW5hbnRfaWQiOiJmZjliYzgzNzMxODVjYjk5YTk0OGIyYzdmMTdkZmU3MzJkNzdmMzNmZTJjZDZlNmZiNWM5NDkxY2U1Y2ZmZWNjIiwiaW50ZXJuYWxfc2VjcmV0IjoiNTczNjcwM2UtNmVmZC00NDUwLWJlOTAtMjg5YzY2YzA3Zjc0In0.cDwwK7NDbBf_9diVr4mooPNY_cOofGLsgXK3LB8BCFw
```

### 2. NextAuth
```
NEXTAUTH_SECRET=gere-um-secret-aleatorio-aqui-use-openssl-rand-base64-32
NEXTAUTH_URL=https://seu-dominio.vercel.app
```

## Como Adicionar na Vercel

1. Vá para o projeto na Vercel
2. Settings → Environment Variables
3. Adicione cada variável acima
4. Selecione todos os ambientes (Production, Preview, Development)
5. Clique em "Save"
6. Faça um novo deploy (Settings → Deployments → Redeploy)

## Gerar NEXTAUTH_SECRET

Execute no terminal:
```bash
openssl rand -base64 32
```

Ou use qualquer string aleatória longa e segura.

## Importante

- Substitua `NEXTAUTH_URL` pelo seu domínio real da Vercel
- Depois de adicionar as variáveis, faça um redeploy manual
