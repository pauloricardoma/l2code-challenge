# L2 Code Challenge 🎬

Um aplicativo móvel desenvolvido com React Native e Expo para descoberta de filmes e gerenciamento de agendamentos cinematográficos.

## 📋 Sobre o Projeto

O **L2 Code Challenge** é um aplicativo de entretenimento que permite:

- **Descoberta de Filmes**: Busca e exploração de filmes usando a API do TMDB
- **Gerenciamento de Agendamentos**: Criação e visualização de agendamentos para assistir filmes
- **Integração com Calendário**: Sincronização de agendamentos com o calendário do dispositivo
- **Interface Moderna**: Design responsivo e intuitivo com tema escuro

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.81.4
- **Expo** ~54.0.7
- **TypeScript** ~5.9.2
- **Expo Router** (navegação baseada em arquivos)
- **Expo SQLite** (banco de dados local)
- **TanStack Query** (gerenciamento de estado e cache)
- **React Navigation** (navegação)
- **Expo Calendar** (integração com calendário)
- **Expo Image** (otimização de imagens)
- **TMDB API** (API de filmes)

## 📱 Funcionalidades

### Filmes
- **Busca de Filmes**: Pesquisa por filmes usando a API do TMDB
- **Listagem Infinita**: Carregamento progressivo de filmes com scroll infinito
- **Detalhes Completos**: Visualização de informações como título, sinopse, data de lançamento e avaliação
- **Imagens Otimizadas**: Carregamento otimizado de posters e imagens dos filmes

### Agendamentos
- **Criação de Agendamentos**: Agendar horários para assistir filmes específicos
- **Integração com Calendário**: Sincronização automática com o calendário do dispositivo
- **Gerenciamento de Eventos**: Visualização e edição de agendamentos existentes
- **Seleção de Data**: Interface intuitiva para escolha de data e horário

### Interface
- **Navegação por Abas**: Home (Filmes) e Agendamentos
- **Tema Escuro**: Interface moderna com tema escuro
- **Componentes Reutilizáveis**: Design system consistente
- **Validação em Tempo Real**: Validação instantânea de formulários

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

- **Node.js** >= 20.19.4
- **npm** ou **yarn**
- **Expo CLI** (opcional, mas recomendado)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/pauloricardoma/l2code-challenge
   cd l2code-challenge
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

### Opções de Execução

Após executar `npx expo start`, você terá as seguintes opções:

#### 📱 Dispositivo Físico (Recomendado)
- **Expo Go**: Instale o app Expo Go na sua loja de aplicativos
- Escaneie o QR code que aparece no terminal
- **Dica**: Se o QR code não estiver aparecendo bem, pressione a tecla `s` no terminal para mostrar o QR code novamente
- O app será carregado no seu dispositivo

#### 🖥️ Emulador/Simulador

**Android:**
```bash
npx expo run:android
```
*Requer Android Studio e emulador configurado*

**iOS:**
```bash
npx expo run:ios
```
*Requer Xcode e simulador iOS (apenas no macOS)*

**Web:**
```bash
npx expo start --web
```
*Executa no navegador*

### 🔧 Dicas Importantes

- **Primeira execução**: O app pode demorar um pouco para carregar na primeira vez
- **Permissões**: O app solicitará permissão para acessar o calendário do dispositivo
- **API Key**: O app já vem configurado com uma chave da API do TMDB
- **Troubleshooting**: Se houver problemas, tente limpar o cache com `npx expo start --clear`

## 📁 Estrutura do Projeto

```
src/
├── app/                   # Rotas do Expo Router
│   ├── _layout.tsx        # Layout principal com navegação por abas
│   ├── index.tsx          # Tela inicial (Filmes)
│   ├── schedules.tsx      # Tela de agendamentos
│   └── schedule-add.tsx   # Tela de adicionar agendamento
├── components/            # Componentes reutilizáveis
│   ├── DateModal.tsx      # Modal para seleção de data
│   ├── Header.tsx         # Cabeçalho das telas
│   ├── IconButton.tsx     # Botão com ícone
│   └── ...
├── constants/             # Constantes da aplicação
├── context/               # Contextos do React
│   └── query-client.context.tsx
├── data/                  # Configuração do banco de dados
│   └── database.ts
├── hooks/                 # Custom hooks
│   ├── useCalendar.ts     # Hook para calendário
│   ├── useDebounce.ts     # Hook para debounce
│   ├── useQueryMovies.ts  # Hook para busca de filmes
│   ├── useQueryMoviesSchedules.ts # Hook para agendamentos
│   └── useQueryMoviesSettings.ts  # Hook para configurações
├── repository/            # Camada de acesso a dados
├── screen/                # Componentes de tela
├── service/               # Lógica de negócio
├── types/                 # Definições de tipos TypeScript
└── utils/                 # Funções utilitárias
```

## 🗄️ Banco de Dados

O app utiliza **Expo SQLite** para armazenamento local com duas tabelas principais:

### Tabela `movies_settings`
- `id` (INTEGER PRIMARY KEY)
- `movie_id` (INTEGER NOT NULL) - ID do filme na API do TMDB
- `watched` (BOOLEAN NOT NULL) - Se o filme foi assistido
- `is_wish` (BOOLEAN NOT NULL) - Se está na lista de desejos
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### Tabela `movies_schedules`
- `id` (INTEGER PRIMARY KEY)
- `movie_id` (INTEGER NOT NULL) - ID do filme na API do TMDB
- `movie_title` (TEXT NOT NULL) - Título do filme
- `date` (DATETIME NOT NULL) - Data e horário do agendamento
- `event_id` (TEXT) - ID do evento no calendário do dispositivo
- `calendar_id` (TEXT) - ID do calendário do dispositivo
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## 🔧 Scripts Disponíveis

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web

# Executar linter
npm run lint
```

## 📱 Compatibilidade

- **iOS**: 11.0+
- **Android**: API 21+ (Android 5.0+)
- **Web**: Navegadores modernos

## 🎨 Design System

O app utiliza componentes customizados com:
- **Tema Escuro**: Interface moderna com cores escuras e acentos laranja
- **Inputs Temáticos**: Componentes de entrada com validação em tempo real
- **Botões Padronizados**: Botões com design consistente e feedback visual
- **Modais Intuitivos**: Modais para seleção de data e opções
- **Cards de Filmes**: Layout responsivo para exibição de filmes
- **Navegação por Abas**: Interface de navegação clara e intuitiva

## 🚀 Deploy

Para gerar builds de produção:

```bash
# Build para Android
npx expo build:android

# Build para iOS
npx expo build:ios
```
