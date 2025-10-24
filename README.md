# Randomize Commander

## Descrição do Projeto

Este projeto busca de forma aleatórios uma criatura lendária para você gerar seu próximo deck de commander.
Ele utiliza uma API backend construída com FastAPI para integrar serviços de busca de cartas via API do site Scryfall e EDHREC.

## Funcionalidades

- Geração aleatória de comandantes válidos via API Scryfall.
- Exibição de imagem da carta nome e descrição (oracle text) no frontend.
<!-- - Integração opcional com EDHREC para tags e links.
- Design responsivo: layout flexível para desktop e mobile, com estados de loading e erro.
- Suporte a CORS para comunicação entre frontend (porta 3000) e backend (porta 8000). -->

# TODO
- **Criar botões com link das tags do EDHREC**
- **Criar botão pala site da Liga e TGCplayer**
- **Melhorar Frontend**



## Layout

O site apresenta um cabeçalho com título, um botão centralizado para gerar o comandante e uma seção de resultado que exibe a imagem da carta ao lado das informações textuais. Em telas menores, os elementos se empilham verticalmente para melhor usabilidade.

Exemplo visual: Botão roxo com ícone de shuffle, resultando em um card cinza escuro com imagem e texto branco/cinza.

## Tecnologias Utilizadas

### Backend
- **FastAPI**: Framework para API RESTful.
- **Requests e BeautifulSoup**: Para chamadas HTTP e parsing.
- **Uvicorn**: Servidor ASGI para execução.
- Dependências listadas em `backend/app/requirements.txt` (inclui fastapi, uvicorn, requests, beautifulsoup4).

### Frontend
- **HTML5 e Vanilla JavaScript**: Estrutura e interatividade.
- **TailwindCSS**: Estilização responsiva via CDN.
- Arquivos: `index.html`, `assets/css/global.css`, `assets/js/app.js`.

## Estrutura do Projeto
```
randomize-commander/
├── backend/
│ └── app/
│ ├── services/
│ │ ├── init.py
│ │ ├── ehdrec_service.py # Integração com EDHREC API
│ │ └── scryfall_service.py # Busca imagens e dados no Scryfall
│ ├── init.py
│ ├── main.py # FastAPI app principal
│ └── requirements.txt # Dependências Python (fastapi, httpx, uvicorn)
├── frontend/
│ └── commander-app/ # Projeto gerado pelo HeroUI CLI (Next.js)
│ ├── app/
│ │ ├── globals.css # Tailwind v4 + customizações (preto/roxo)
│ │ ├── layout.tsx # Root layout com HeroUIProvider e next/font
│ │ └── page.tsx # Página inicial com CommanderGenerator
│ ├── components/
│ │ └── CommanderGenerator.tsx # Componente principal com animações
│ ├── next.config.mjs # Config Next.js (ESM)
│ ├── postcss.config.mjs # PostCSS para Tailwind v4 (strings como plugins)
│ ├── tailwind.config.js # Config Tailwind com HeroUI plugin
│ ├── tsconfig.json # TypeScript com suporte a CSS modules
│ ├── next-env.d.ts # Declarações para imports de CSS/assets
│ └── package.json # Dependências: @heroui/react, tailwindcss v4, framer-motion
├── README.md
└── .gitignore
```

## Pré-requisitos
- Node.js 18+ (para frontend).
- Python 3.10+ (para backend).

## Configuração e Execução

### Backend (FastAPI)
1. Navegue para a pasta: `cd backend/app`.
2. Instale dependências: `pip install -r requirements.txt` (ou use `uv` para faster installs: `uv pip install -r requirements.txt`).
3. Execute o servidor: `uvicorn main:app --reload --port 8000` (ou `python -m uvicorn main:app --reload --port 8000`).
   - A API estará disponível em `http://localhost:8000`. Teste endpoints como `/api/random-commander` com ferramentas como Postman.

### Frontend (Next.js + HeroUI + Tailwind v4)
1. Navegue para a pasta: `cd frontend/commander-app`.
2. Instale dependências principais (incluindo Tailwind v4 e HeroUI):
```
npm install
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer framer-motion lucide-react next-themes
```
- Nota: `@tailwindcss/postcss` é obrigatório para Tailwind v4; `autoprefixer` lida com compatibilidade de browsers.
3. Configure Tailwind v4 (se não gerado pelo CLI):
- Rode `npx tailwindcss init -p` para criar `tailwind.config.js` e `postcss.config.mjs`.
- Edite `tailwind.config.js` (veja seção de Configurações abaixo).
4. Configure PostCSS para ESM (Tailwind v4):
- Edite `postcss.config.mjs` (mantenha `"type": "module"` no `package.json` para performance):
  ```
  export default {
    plugins: {
      '@tailwindcss/postcss': {},  // Plugin Tailwind v4 (string obrigatória)
      autoprefixer: {},            // Prefixos de navegador
    },
  };
  ```
- Isso evita erros como "Malformed PostCSS" ou "require not defined".
5. Configure TypeScript para CSS imports (evita erros no VS Code):
- Edite `next-env.d.ts` (adicione no final):
  ```
  declare module "*.css" {
    const content: string;
    export default content;
  }
  declare module "*.png" { /* Para imagens de cartas */ }
  ```
- Reinicie o TS server no VS Code (Ctrl+Shift+P > "TypeScript: Restart TS Server").

6. Edite `app/globals.css` para Tailwind v4 + tema customizado:
```
@import "tailwindcss";
@plugin "./hero.ts"; /* Se usar hero.ts para HeroUI plugin */

@source "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}";

@theme inline {
--color-primary: #8B5CF6; /* Roxo principal /
--color-background: #000000; / Fundo preto /
--color-foreground: #FFFFFF; / Texto branco */
}

body {
background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%);
color: var(--color-foreground);
font-family: Inter, sans-serif;
}

/* Animações customizadas */
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fadeIn { animation: fadeIn 0.5s ease-out; }
```
- Crie `app/hero.ts` para plugin HeroUI (Tailwind v4):
  ```
  import { heroui } from "@heroui/react";
  export default heroui();
  ```
7. Edite `app/layout.tsx` (exemplo completo com HeroUI e next/font):

```
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "Randomize Commander",
description: "Gerador de comandantes MTG",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="pt-BR" suppressHydrationWarning>
<body className={inter.className}>
<HeroUIProvider>
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
{children}
</ThemeProvider>
</HeroUIProvider>
</body>
</html>
);
}
```
8. Adicione componente principal em `components/CommanderGenerator.tsx` (com animações):
- Instale: `npm install framer-motion lucide-react`.
- Exemplo básico (integre com fetch para backend):
  ```
  "use client";
  import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import { Dice6 } from "lucide-react";

  export default function CommanderGenerator() {
    const [commander, setCommander] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateCommander = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/random-commander");
        const data = await res.json();
        setCommander(data);
      } catch (error) {
        console.error("Erro ao gerar comandante:", error);
      }
      setLoading(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-4"
      >
        <h1 className="text-4xl font-bold text-primary mb-8 animate-fadeIn">Randomize Commander</h1>
        <button
          onClick={generateCommander}
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <Dice6 size={20} /> {loading ? "Gerando..." : "Gerar Comandante"}
        </button>
        {commander && (
          <motion.img
            key={commander.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={commander.image_uris?.border_crop || "/placeholder.png"}
            alt={commander.name}
            className="mt-8 w-64 h-88 object-cover rounded-lg shadow-lg"
          />
        )}
      </motion.div>
    );
  }
  ```
- Edite `app/page.tsx` para renderizar: `import CommanderGenerator from "../components/CommanderGenerator"; export default CommanderGenerator;`.
9. Execute o dev server: `npm run dev`.
- Acesse `http://localhost:3000`. Certifique-se de que o backend roda em porta 8000 para fetches funcionarem.

## Configurações Adicionais
- **next.config.mjs** (ESM, sem Turbopack por estabilidade):
/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
// typedRoutes: true, // Desabilitado para evitar conflitos com Turbopack
},
telemetry: false,
};

export default nextConfig;

- **tailwind.config.js** (com HeroUI):
```
module.exports = {
content: ["./app//*.{js,ts,jsx,tsx,mdx}", "./components//.{js,ts,jsx,tsx,mdx}", "./node_modules/@heroui/react/dist/**/.{js,ts,jsx,tsx}"],
darkMode: "class",
theme: {
extend: {
colors: { primary: { DEFAULT: "#8B5CF6" }, background: "#000000" },
},
},
plugins: [require("@heroui/react/plugin")],
};
```
**package.json** (adicione `"type": "module"` para ESM):
```
{
"type": "module",
"scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
"dependencies": { "next": "15.5.6", "@heroui/react": "^2.8.0", "framer-motion": "^10.0.0", "lucide-react": "^0.3.0", "next-themes": "^0.3.0" },
"devDependencies": { "tailwindcss": "^4.0.0", "@tailwindcss/postcss": "^4.0.0", "autoprefixer": "^10.4.20", "postcss": "^8.5.0", "typescript": "^5.0.0" }
}
```
## Troubleshooting
- **Erro Turbopack/PostCSS**: Desabilite Turbopack editando `package.json` scripts: `"dev": "next dev"` (sem `--turbopack`). Use Webpack para estabilidade.
- **ES Modules/Require not Defined**: Mantenha `"type": "module"` e use strings em `postcss.config.mjs` (ex.: `'@tailwindcss/postcss'`). Limpe caches: `rm -rf .next node_modules package-lock.json && npm install`.
- **next/font ou Autoprefixer Missing**: Instale `npm install -D autoprefixer @tailwindcss/postcss` e verifique `postcss.config.mjs` com formato de strings/objetos.
- **Import CSS no VS Code**: Adicione declaração em `next-env.d.ts` e reinicie TS server.
- **Build Error Malformed PostCSS**: Use o formato oficial: plugins como strings ou arrays. Veja [docs Next.js PostCSS](https://nextjs.org/docs/messages/postcss-shape).
- **Tailwind v4 + HeroUI**: Siga migração oficial: Importe via CSS (`@import "tailwindcss";`), use `@plugin "./hero.ts"`. Atualize para HeroUI ^2.8.0.
- **Animações Não Funcionam**: Instale `framer-motion` e use `motion.div` em componentes client-side (`"use client";`).
- **Integração Backend-Frontend**: CORS no `main.py`: `from fastapi.middleware.cors import CORSMiddleware; app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"])`.





## Autor

Desenvolvido por Marcel Pfutz. Contato: marcelpfutz@gmail.com

