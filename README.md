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

## Instalação e Configuração

1. Clone o repositório ou baixe os arquivos na estrutura indicada:
├── backend
│ └── app
│ ├── services
│ │ ├── init.py
│ │ ├── ehdrec_service.py
│ │ └── scryfall_service.py
│ ├── init.py
│ ├── main.py
│ └── requirements.txt
├── frontend
│ ├── assets
│ │ ├── css
│ │ │ └── global.css
│ │ └── js
│ │ └── app.js
│ └── index.html
└── README.md


2. No diretório `backend/app`, instale as dependências:
pip install -r requirements.txt

Isso instala FastAPI, Uvicorn e bibliotecas para web scraping.

3. Certifique-se de que não há conflitos de portas (backend em 8000, frontend em 3000).

## Como Executar o Projeto

### Backend
1. Navegue até `backend/app`.
2. Execute o servidor:
uvicorn main:app --reload --port 8000

O servidor estará disponível em `http://localhost:8000`. Teste o endpoint `/api/item` via browser ou Postman para ver um JSON com imagem, título e descrição.

### Frontend
1. Navegue até o diretório `frontend`.

python -m http.server 3000
Acesse `http://localhost:3000` no navegador.

3. Clique no botão "Gerar Comandante Aleatório" para interagir com o backend e exibir os resultados.

### Execução Completa
- Inicie o backend primeiro.
- Abra o frontend no navegador.
- O JavaScript fará fetch automático para o endpoint `/api/item` ao clicar no botão, lidando com erros de conexão.

## Autor

Desenvolvido por Marcel Pfutz. Contato: marcelpfutz@gmail.com

