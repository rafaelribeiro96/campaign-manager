# Campaign Manager

Este é um projeto de **gerenciamento de campanhas** desenvolvido com **Next.js**. A aplicação permite criar, editar, listar e excluir campanhas, utilizando dados mockados de uma API.

## Funcionalidades

- Listar todas as campanhas
- Criar uma nova campanha
- Editar uma campanha existente
- Excluir uma campanha
- Pausar uma campanha
- Exibir detalhes de uma campanha
- Filtrar campanhas
- Ordenar campanhas

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/) (para os componentes de UI)
- [Jest](https://jestjs.io/) (para testes unitários)
- [ESLint](https://eslint.org/) (para linting do código)
- [Prettier](https://prettier.io/) (para formatação de código)

## Requisitos

- **Node.js** v18.17.0 ou superior
- **npm** v10.8.3 ou superior

## Como Executar o Projeto Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/campaign-manager.git
cd campaign-manager
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Executar o Projeto em Modo de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação em funcionamento.

### 4. Build para Produção

```bash
npm run build
```

Este comando irá gerar uma versão otimizada para produção na pasta `.next`.

### 5. Rodar Testes Unitários

```bash
npm run test
```

Os testes estão configurados com Jest. Eles cobrem os componentes principais e as validações do formulário de campanhas.

### 6. Verificar Cobertura de Testes

```bash
npm run test:coverage
```

Este comando executa os testes e gera um relatório de cobertura de código.

## Estrutura do Projeto

├── app

│   ├── tests                 # Testes unitários

│   ├── about                 # Página "Sobre"

│   ├── api                   # Endpoints da API

│   ├── campaign              # Páginas e componentes de campanhas

│   ├── globals.css           # Estilos globais

│   ├── layout.tsx            # Layout principal

│   └── page.tsx              # Página inicial

├── components                # Componentes reutilizáveis

├── data                      # Dados mockados (campanhas e categorias)

├── services                  # Serviços para API e utilitários

├── .eslintrc.json            # Configuração do ESLint

├── jest.config.js            # Configuração do Jest

├── package.json              # Dependências e scripts do projeto

└── README.md                 # Documentação do projeto


### Explicação das Pastas

- `app/__tests__`: Testes unitários dos componentes e funcionalidades da aplicação.
- `app/about`: Página e estilos relacionados à seção "Sobre".
- `app/api`: Endpoints da API.
- `app/campaign`: Página e componentes relacionados à gestão de campanhas.
- `components`: Componentes reutilizáveis da aplicação.
- `data`: Dados mockados, como campanhas e categorias.
- `services`: Serviços para integração com APIs e funcionalidades auxiliares.
- `public`: Arquivos estáticos como imagens e ícones.

### Validações do Formulário

As validações do formulário foram feitas de forma manual no código, sem o uso de bibliotecas . Algumas regras aplicadas:

- Nome: Obrigatório.
- Data de Início: Deve ser igual ou posterior à data atual.
- Data de Fim: Deve ser maior que a data de início.
- Categoria: Obrigatória.

### Mock de API

Neste projeto, os dados das campanhas e categorias são mockados. Eles são armazenados localmente para simular o comportamento de uma API.
