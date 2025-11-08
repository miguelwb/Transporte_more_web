# Transporte Plus Web

Aplicação frontend em React + Vite para o projeto Transporte Plus.

## Requisitos
- Node `>= 18`
- npm ou pnpm/yarn (no ambiente de hospedagem Linux)

## Instalação
```bash
npm install
```
Observação: `node_modules` e lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) não são versionados para evitar incompatibilidades entre Windows e Linux. A plataforma de deploy instalará os binários corretos para o sistema operacional alvo.

## Desenvolvimento
```bash
npm run dev
# abre em http://localhost:5173/
```

## Build de produção
```bash
npm run build
# gera a pasta dist/
```
Para servir localmente o build:
```bash
npm run preview
```

## Deploy em Linux
- Execute `npm install` no servidor para baixar dependências para Linux.
- Em seguida, `npm run build` para gerar `dist/`.
- Sirva a pasta `dist/` (NGINX, Apache, ou `vite preview`).

## API Backend
Durante desenvolvimento, chamadas ao caminho `/api` são proxied para o backend configurado em `vite.config.js`. Ajuste conforme necessário para seu ambiente de produção.

## Scripts úteis
- `dev`: inicia o servidor de desenvolvimento Vite
- `build`: compila para produção
- `preview`: serve o build localmente