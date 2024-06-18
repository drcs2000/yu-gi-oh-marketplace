# Yu-Gi-Oh! Marketplace

Bem-vindo ao Yu-Gi-Oh! Marketplace, a maior plataforma de troca de cartas Yu-Gi-Oh! do país! Este README fornece instruções detalhadas sobre como configurar, executar e contribuir para o projeto.

## Índice

- [Início Rápido](#início-rápido)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Executando a Aplicação](#executando-a-aplicação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
  - [Página Inicial](#página-inicial)
  - [Perfil do Usuário](#perfil-do-usuário)
  - [Cartas](#cartas)
  - [Pedidos de Troca](#pedidos-de-troca)
  - [Autenticação](#autenticação)
  - [Página 404](#página-404)
- [Uso](#uso)
  - [Adicionando Cartas](#adicionando-cartas)
  - [Criando Pedidos de Troca](#criando-pedidos-de-troca)
  - [Navegando no Carrossel](#navegando-no-carrossel)

## Início Rápido

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) (versão 6.x ou superior)
- [Vue CLI](https://cli.vuejs.org/)

### Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/drcs2000/yu-gi-oh-marketplace.git
   cd yu-gi-oh-marketplace

2. Instale as dependências:

```sh
npm install
```

### Executando a Aplicação

Para executar a aplicação localmente:

```sh
npm run serve
```

A aplicação estará disponível em ``http://localhost:8080``.

### Estrutura do Projeto

- ``src/``
  - ``assets/``: CSS com Tailwind;
  - ``components/``: Componentes Reutilizáveis;
  - ``views/``: Páginas do Projeto;
  - ``router/``: Configuração do Vue Router;
  - ``sotre/``: Configuração do Vuex;
  - ``App.vue``: Componente raiz;
  - ``main.js``: ponto de entrada da aplicação.

### Funcionalidades

## Página Inicial

A página inicial dá as boas-vindas aos usuários ao marketplace e exibe os últimos pedidos de troca.

## Perfil do Usuário

Os usuários podem visualizar e gerenciar as informações do seu perfil, incluindo suas cartas e pedidos de troca.

## Cartas

Os usuários podem visualizar todas as cartas disponíveis, pesquisar cartas específicas e adicioná-las à sua coleção.

## Pedidos de Troca

Os usuários podem visualizar todos os pedidos de troca, criar novos pedidos de troca e gerenciar seus pedidos de troca existentes.

## Autenticação

Os usuários podem se registrar, fazer login e logout. A autenticação é necessária para acessar a maior parte da aplicação.

## Página 404

Uma página 404 personalizada é exibida para qualquer rota inexistente e rotas sem autorização.

### Uso

## Adicionando Cartas

1. Navegue até seu perfil;
2. Clique em "Adicionar Carta";
3. No modal, selecione as cartas que deseja adicionar (até 3);
4. Clique em "Salvar" para adicionar cartas à sua coleção.

## Criando Pedidos de Troca

1. Navegue até "Minhas Trocas" no seu perfil;
2. Clique em "Criar Nova Troca";
3. No modal, selecione a carta que está oferecendo e a carta que deseja;
4. Clique em "Criar" para enviar seu pedido de troca.

## Navegando no Carrossel

Use as setas esquerda e direita para navegar pelo carrossel de cartas e pedidos de troca. Apenas uma carta ou pedido de troca é exibido por vez.
