# Guardiões do Clima

Aplicação web desenvolvida com **SAPUI5 / OpenUI5** para consulta de clima, visualização geográfica e exploração de destinos turísticos. O projeto combina dados meteorológicos em tempo real com mapas interativos e um globo 3D.

## O que o projeto faz

- **Clima atual e previsão** — temperatura, umidade, vento, sensação térmica e previsão para os próximos dias (API OpenWeatherMap).
- **Mapa interativo** — localização de cidades com OpenStreetMap (SAP UI5 Visual Business Map).
- **Guia de destinos** — informações turísticas por cidade (mock local com museus, parques, estádios e atrações).
- **Mapa 3D global** — globo interativo com Cesium, camada climática e busca de locais.
- **Lugares populares** — acesso rápido a cidades brasileiras direto no header da aplicação.

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| SAPUI5 / OpenUI5 | Interface e navegação |
| Node.js + UI5 CLI | Desenvolvimento e build |
| OpenWeatherMap | Dados climáticos |
| OpenStreetMap / Nominatim | Mapas e geocodificação |
| Cesium | Visualização 3D do globo |
| Docker | Execução containerizada |

## Estrutura do repositório

```
Guardioes-do-Clima-main/
├── .vscode/                 # Configurações de debug do VS Code
├── project/                 # Aplicação principal SAPUI5
│   ├── webapp/
│   │   ├── controller/      # View1 (clima/mapa) e View2 (globo 3D)
│   │   ├── view/            # Views XML e fragments
│   │   ├── model/           # Modelos e mock de locais turísticos
│   │   ├── util/            # Globo 3D, clima, navegação e busca
│   │   ├── css/             # Estilos customizados
│   │   ├── test/            # Testes unitários e de integração
│   │   └── manifest.json    # Configuração da aplicação
│   ├── package.json         # Dependências e scripts npm
│   ├── .env                 # Chave da OpenWeatherMap (criar manualmente)
│   ├── ui5.yaml             # Configuração do UI5 Tooling
│   ├── Dockerfile           # Imagem Docker da aplicação
│   └── docker-compose.yml   # Orquestração com Docker Compose
└── UI5/                     # Artefatos auxiliares do ambiente UI5
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) LTS (v18 ou superior recomendado)
- npm (incluso com o Node.js)
- *(Opcional)* [Docker](https://www.docker.com/) e Docker Compose

## Instalação

Clone o repositório e instale as dependências na pasta da aplicação:

```bash
git clone <url-do-repositorio>
cd Guardioes-do-Clima-main/project
npm install
```

Crie o arquivo `.env` na pasta `project/` (não vai para o Git):

```env
OPENWEATHERMAP_API_KEY=sua_chave_aqui
```

Chave em [openweathermap.org/api](https://openweathermap.org/api). O `npm start` gera o `webapp/config/Env.js` automaticamente. Se o `.env` for apagado, recrie o arquivo e rode `npm run env:config`.

## Como executar

### Modo desenvolvimento (npm)

Na pasta `project/`:

```bash
npm start
```

O projeto abre no **Fiori Launchpad** (`test/flp.html`) — a tela com o tile **Guardiões do Clima** (como na foto). Clique no tile para entrar na aplicação.

> **Importante:** não use `#app-preview` na URL de abertura — esse hash abre o app direto, pulando o launchpad.

Alternativas:

```bash
npm run start-noflp    # Abre direto no index.html (sem launchpad FLP)
npm run start-local    # Launchpad FLP com ui5-local.yaml
```

### VS Code

Use a configuração de launch **"Start projetinho"** em `.vscode/launch.json` (já aponta para `project/`).

### Docker

Na pasta `project/`:

```bash
docker compose up --build
```

Acesse: [http://localhost:8080](http://localhost:8080)

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run env:config` | Gera config a partir do `.env` |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção em `dist/` |
| `npm run unit-test` | Abre testes unitários (QUnit) |
| `npm run int-test` | Abre testes de integração (OPA) |

## Páginas da aplicação

| Página | Rota | Descrição |
|--------|------|-----------|
| Launchpad (FLP) | `test/flp.html` | Tela inicial ao rodar `npm start` |
| Guardiões do Clima | `/` | Painel de clima, mapa 2D e guia turístico |
| Map 3D | `/view2` | Globo terrestre 3D com camada climática |

## Licença

Projeto acadêmico / demonstrativo. Consulte os mantenedores do repositório para informações de uso.
