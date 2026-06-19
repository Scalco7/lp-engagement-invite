# Documentação do Projeto: LP & Bolão - Engagement Invite

Esta documentação serve para guiar qualquer desenvolvedor que assuma o projeto, descrevendo o estado atual, a arquitetura implementada e as modificações recentes.

---

## 1. Visão Geral do Projeto
O projeto consiste em uma Landing Page elegante para envio de convites de noivado e confirmação de presença (RSVP), integrada a uma página de **Bolão de Palpites (Bets)** onde convidados confirmados podem palpitar sobre perguntas divertidas do noivado com odds dinâmicas calculadas em tempo real.

A API consumida está hospedada na Vercel e se comunica com um banco PostgreSQL no Neon:
- **Swagger UI**: [https://engagement-invite-api.vercel.app/api-docs/#/](https://engagement-invite-api.vercel.app/api-docs/#/)
- **API URL Base**: `https://engagement-invite-api.vercel.app` (pode ser sobrescrita localmente definindo `VITE_API_URL` no `.env`).

---

## 2. Arquitetura do Sistema e Estrutura de Pastas

Abaixo estão os novos componentes arquiteturais inseridos para dar suporte a consumo de API, tipagem segura, persistência local e roteamento:

```
src/
├── App.tsx                   # Ponto de entrada do React Router (rotas: "/engagement-invite" e "/engagement-invite/bet", com redirecionamento de "/" e rotas inexistentes "*" para "/engagement-invite")
├── main.tsx                  # Bootstrap da aplicação
├── api/                      # Camada de Consumo de API
│   ├── api.client.ts         # Wrapper do fetch com tratamento robusto de exceções (ApiError)
│   ├── rsvp.service.ts       # Chamadas da API de RSVP (List, Create, Lookup)
│   ├── bets.service.ts       # Chamadas da API do Bolão (List Questions, Place Bet)
│   └── index.ts              # Exportador central de serviços e tipos da API
├── services/                 # Serviços Client-Side de State/Persistência
│   └── rsvpStorage.ts        # Gerenciador do LocalStorage para salvar a confirmação (id, willGo)
├── types/                    # Definições globais de Tipos TypeScript (Separados por domínio)
│   ├── api.types.ts          # Envelopes de sucesso e erros da API
│   ├── bets.types.ts         # Modelos de perguntas, opções, palpites e odds
│   ├── rsvp.types.ts         # Modelos de dados do convidado e entrada do RSVP
│   └── index.ts              # Centralizador de exportação de tipos
├── pages/                    # Componentes de Páginas
│   ├── LandingPage.tsx       # Landing Page com convite e formulário RSVP
│   └── BetPage.tsx           # Página do Bolão (/bet) com barreiras de segurança
└── components/               # Pasta de Componentes seguindo Atomic Design
    ├── atoms/                # Elementos visuais mínimos (ex: Reveal.tsx, OddsBadge.tsx)
    ├── molecules/            # Combinações de átomos (ex: Countdown.tsx, BetQuestionCard.tsx, AccessDeniedMessage.tsx, BetOptionRow.tsx, CustomBetInput.tsx)
    ├── organisms/            # Componentes complexos e com estado (ex: ConfirmForm.tsx, RsvpLookupForm.tsx, BetQuestionsList.tsx, EnvelopeIntro.tsx, Header.tsx, Footer.tsx)
    └── sections/             # Seções grandes estruturantes da Landing Page (ex: HeroSection.tsx, HistorySection.tsx, ConfirmSection.tsx, etc.)
```

---

## 3. Alterações Realizadas e Histórico de Refatoração

### A. Ajustes no Formulário de Confirmação (`ConfirmForm.tsx`)
- **Remoção e Re-adição de Campos**: A pedido, foi retirada a "mensagem para os noivos" e o campo de "e-mail" foi ajustado para se tornar **obrigatório** (tanto no input JSX usando `required` quanto na validação JS dentro do `handleSubmit`).
- **Máscara de Telefone**: Adicionada uma máscara de telefone em tempo real `(xx) x xxxx-xxxx` para o celular do convidado, aplicada no momento da digitação.
- **Integração com API**: Substituído o comportamento simulado (mocked timeout) pelo envio real para a rota `POST /api/rsvp` através do `rsvpService`.
- **Persistência Local**: Após receber o RSVP salvo com sucesso da API, os dados `id` e `will_go` são armazenados no `localStorage` via `rsvpStorage`.

### B. Criação da Camada de API Reutilizável (`/src/api`)
- Desenvolvido o `api.client.ts` para padronizar as requisições HTTP (`GET`/`POST`).
- Caso o servidor backend responda com erros HTTP (como 400 ou 500), o cliente lança um erro `ApiError` estendendo a classe nativa `Error`, extraindo mensagens e validações da API.

### C. Modularização de Tipos (`/src/types`)
- Inicialmente os tipos estavam em `src/api/types.ts`. Eles foram migrados para a raiz `/src/types/` e divididos logicamente de acordo com suas responsabilidades em: `api.types.ts`, `bets.types.ts`, `rsvp.types.ts` e indexados em `index.ts`.
- Todos os arquivos de serviço e cliente foram corrigidos para importar a partir da nova localização.

### D. Roteamento e Barreiras de Segurança na rota `/engagement-invite/bet`
- Instalado e configurado o `react-router-dom` para suportar rotas no client-side.
- A página **do bolão** ([BetPage.tsx](file:///d:/develop/ju/lp-engagement-invite/src/pages/BetPage.tsx)) foi implementada na rota `/engagement-invite/bet` com três barreiras/portões de segurança restritivos:
  1. **Sem RSVP salvo no LocalStorage**: O usuário é impedido de ver o bolão. É renderizado um formulário simples exigindo **E-mail** e **Telefone**. Ao enviar, consome `rsvpService.lookupRsvp` buscando o RSVP correspondente na API. Se encontrado, salva no localStorage e libera o acesso. Há um botão para retornar à Home (`/engagement-invite`) caso queira realizar um novo RSVP.
  2. **RSVP com "Não vou"**: Se o convidado marcou que não vai à festa, ele é bloqueado de interagir ou ver as perguntas do bolão, exibindo uma mensagem informativa simples.
  3. **RSVP Confirmado ("Vou")**: O acesso é liberado, engatilhando a chamada da API `betsService.listQuestions()` para exibir as perguntas e cotações. Existe também um botão de depuração no rodapé que limpa a sessão local.

### E. Componentização da Página do Bolão (`BetPage.tsx`) seguindo Atomic Design
- A página de Bolão foi decomposta em partes atômicas e reutilizáveis:
  - **Molecules (Moléculas)**:
    - `AccessDeniedMessage.tsx`: Card simples informando o bloqueio para convidados que recusaram a festa.
    - `BetQuestionCard.tsx`: Card que exibe uma única pergunta do bolão com suas respectivas opções de votos e odds.
  - **Organisms (Organismos)**:
    - `RsvpLookupForm.tsx`: Formulário completo com estado interno para busca do RSVP por e-mail e telefone. Implementa a mesma máscara de telefone em tempo real `(xx) x xxxx-xxxx` para manter consistência e qualidade de UX no preenchimento.
    - `BetQuestionsList.tsx`: Grid dinâmico que exibe a lista de cards de palpites, estados de carregamento (loading), e botão para limpar a confirmação salva.
- A página principal `BetPage.tsx` atua apenas como um orquestrador leve de fluxo e estado, chamando as rotas da API e renderizando as moléculas/organismos baseados no status de autenticação local.

### F. Melhorias Visuais e de Palpites em Tempo Real no Bolão
- **Estilização Premium com TailwindCSS**: Refatorados todos os componentes do bolão (`RsvpLookupForm.tsx`, `AccessDeniedMessage.tsx`, `BetQuestionsList.tsx` e `BetQuestionCard.tsx`) eliminando estilos inline e adotando a paleta de cores e tipografias oficiais do sistema (`font-serif`, `font-sans`, `#fdfbf7`, `#3d2c25`, `#c79c93`).
- **Integração Real-Time no Card de Palpites**:
  - `BetQuestionCard.tsx` agora exibe opções com barras de progresso que refletem as parciais e odds recalculadas na hora.
  - Convidados podem palpitar selecionando opções ou digitando texto/número livre. Ao confirmar, consome `betsService.placeBet` e dispara confetes dinâmicos de sucesso.
- **Recuperação de Palpites via API**:
  - Implementado `betsService.listBetsForGuest` que consome a rota `GET /api/bets/rsvp/:rsvpId` no backend. A página agora resgata e renderiza de forma unificada os palpites anteriores do convidado diretamente do banco de dados, evitando duplicidades de dados e garantindo a consistência das informações com o servidor.
- **Cabeçalho de Navegação e Responsividade**:
  - Adicionado cabeçalho fixo com logotipo, coração pulsante e botão de retorno que encurta de "Voltar ao Convite" para "Voltar" em telas pequenas com um ícone de seta.
  - Removido qualquer botão de logout/sair para manter o login permanentemente ativo no dispositivo de cada convidado.
  - Adicionados ornamentos flutuantes lentos idênticos aos do convite principal no fundo da página.
- **Otimização para Listas Grandes (Exibição de Favoritos e Zebras)**:
  - Em cenários com mais de 8 opções (ex: 100 convidados em perguntas de escolha de convidado), o card `BetQuestionCard.tsx` oculta a maior parte das opções por padrão para manter a interface limpa e compacta.
  - Apresenta inicialmente apenas os **4 favoritos** (menores odds) e as **4 zebras** (maiores odds), garantindo que a opção já votada/selecionada pelo convidado continue visível no topo.
  - Permite expandir a lista completa de forma fluida dentro de um contêiner rolável (`max-h-[260px]`) para não quebrar a estrutura vertical da página, exibindo um botão de recolhimento.
- **Resolução de Rótulos em Palpites**:
  - No rodapé do `BetQuestionCard.tsx`, o sistema busca a opção correspondente ao palpite (`currentBet`) e exibe o rótulo amigável (ex: "Felipe Maciel Scalco") em vez do identificador ou UUID bruto recebido do backend.
- **Botão "Palpites" Dinâmico no Header**:
  - Integrado o botão "Palpites" na barra de navegação (`Header.tsx` no desktop e mobile) como o **primeiro item da esquerda para a direita**.
  - Estilizado de forma plana (como os outros links planos: "Nossa História" e "A Celebração"), usando borda inferior divisória (`border-b border-brand-accent/10`) no mobile.
  - Inicialmente bloqueado com um ícone de **cadeado** (`Lock`) e desabilitado caso o usuário não tenha feito RSVP.
  - Ao confirmar presença ("Vou"), engatilha a animação `animate-unlock` (o cadeado gira, diminui e some), liberando o acesso ao clique que navega para `/engagement-invite/bet`.
  - Ao registrar que não comparecerá ("Infelizmente não posso"), executa a animação `animate-shrink-fade` (o botão encolhe e desaparece da barra de navegação).
  - A comunicação em tempo real entre o formulário (`ConfirmForm.tsx`) e o cabeçalho (`Header.tsx`) é feita por meio de elevação de estado e callbacks (`onRsvpUpdated`) na `LandingPage.tsx`.
- **Atalho no Card de Confirmação (RSVP)**:
  - Adicionado um botão proeminente **"🎲 Dar Meus Palpites"** diretamente no card de sucesso del `ConfirmForm.tsx` quando a confirmação de presença for positiva ("Vou").
  - O clique direciona o convidado diretamente para `/engagement-invite/bet`, melhorando o fluxo de onboarding do bolão logo após a confirmação de presença.
- **Scroll Automático ao Topo**:
  - Inserido um gancho `useEffect` em `BetPage.tsx` que rola a tela do navegador automaticamente para o topo (`window.scrollTo(0, 0)`) no momento em que a página monta. Isso garante que a visualização inicie perfeitamente no cabeçalho do bolão, corrigindo a persistência do scroll da Landing Page.
- **Estilização de Destaque para Favorito e Zebra**:
  - Implementado em `BetQuestionCard.tsx` a identificação dinâmica da opção favorita (menor odd) e da opção zebra (maior odd) de cada pergunta, desde que haja pelo menos 3 opções, uma diferença real de odds, e que **no máximo 4 opções compartilhem essa mesma odd** (evitando poluição visual caso muitas opções estejam empatadas com a mesma odd padrão/inicial).
  - **Favorito (Menor Odd)**: Recebe estilo com borda alaranjada (vermelha quando votado/selecionado), fundo suave de cor âmbar (avermelhado suave quando selecionado/votado) e efeito hover que projeta sombra laranja brilhante. A etiqueta de odds é renderizada com gradiente quente (`from-amber-500 via-orange-500 to-red-500`), texto branco em negrito e um ícone `Flame` saltitante (`animate-bounce`). O efeito piscante (`animate-pulse`) foi removido do badge a fim de mantê-lo sólido. Além disso, a barra de progresso de votos recebe um tom alaranjado (`bg-orange-500/10`), e o indicador de marcação de voto/seleção ganha cor vermelha ao invés de verde/rosa.
  - **Zebra (Maior Odd)**: Ganha o estilo listrado estilizado usando a classe `.bg-zebra-stripes` no container e um emoji de zebra `🦓` saltitante ao lado das odds para adicionar mais dinamismo e humor.
- **Componentização e Atomic Design no Bolão**:
  - Refatorado o card principal `BetQuestionCard.tsx` para seguir rigorosamente o padrão **Atomic Design**, dividindo-o em partes menores, o que reduziu drasticamente o acoplamento de markup e facilitou a manutenção.
  - **Átomo `OddsBadge.tsx`**: Exibe o badge de odds, centralizando estilos e animações do favorito (gradiente quente com ícone `Flame` saltitante) e da zebra (emoji `🦓` saltitante).
  - **Molécula `BetOptionRow.tsx`**: Encapsula uma linha de opção de aposta, manipulando a barra de progresso, indicação visual do palpite selecionado/votado, exibição de votos e cotações (delegando as cotações ao `OddsBadge`).
  - **Molécula `CustomBetInput.tsx`**: Gerencia a caixa e o campo de entrada para respostas livres do bolão (texto/número), contendo as transições de foco e animação de expansão.
