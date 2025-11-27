# Setup do Banco de Dados em Produção

O banco de dados na Vercel está vazio. Siga estes passos para popular:

## 1. Adicionar SETUP_SECRET na Vercel

Vá em Settings → Environment Variables e adicione:
```
SETUP_SECRET=seu-secret-aqui-qualquer-string-aleatoria
```

## 2. Fazer Redeploy

Após adicionar a variável, faça um redeploy.

## 3. Criar Admin User

Abra o terminal e execute:

```bash
curl -X POST https://seu-dominio.vercel.app/api/setup/create-admin \
  -H "Content-Type: application/json" \
  -d '{"secret":"seu-secret-aqui"}'
```

Ou use o Postman/Insomnia:
- URL: `https://seu-dominio.vercel.app/api/setup/create-admin`
- Method: POST
- Body (JSON):
```json
{
  "secret": "seu-secret-aqui"
}
```

## 4. Migrar Conteúdo MDX

```bash
curl -X POST https://seu-dominio.vercel.app/api/setup/migrate-content \
  -H "Content-Type: application/json" \
  -d '{"secret":"seu-secret-aqui"}'
```

Ou use o Postman/Insomnia:
- URL: `https://seu-dominio.vercel.app/api/setup/migrate-content`
- Method: POST
- Body (JSON):
```json
{
  "secret": "seu-secret-aqui"
}
```

## 5. Verificar

Acesse o site e veja se o conteúdo aparece!

## Credenciais do Admin

- Email: `admin@melhorcompra.com.br`
- Senha: `admin123`

**IMPORTANTE:** Troque a senha após o primeiro login!

## Remover Endpoints (Opcional)

Após o setup, você pode remover os arquivos:
- `src/app/api/setup/create-admin/route.ts`
- `src/app/api/setup/migrate-content/route.ts`

Ou manter e proteger com o `SETUP_SECRET`.
