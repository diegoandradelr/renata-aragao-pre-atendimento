# Renata Aragão — Pré-atendimento Jurídico

MVP de uma plataforma web de pré-atendimento jurídico, desenvolvido para **Renata Aragão Advocacia e Consultoria Jurídica**.

O projeto tem como objetivo facilitar o primeiro contato entre potenciais clientes e o escritório, permitindo o preenchimento de um formulário de pré-atendimento, o armazenamento das informações em banco de dados e a continuidade do contato pelo WhatsApp.

## Funcionalidades

- Página institucional com apresentação do escritório.
- Seção de áreas de atuação.
- Seção de dúvidas frequentes (FAQ).
- Formulário de pré-atendimento com validação dos campos.
- Validação de consentimento e aviso de privacidade.
- Armazenamento das solicitações no Supabase.
- Tela de confirmação após o registro bem-sucedido.
- Encaminhamento dos dados preenchidos para o WhatsApp.
- Tratamento de erros durante o envio do formulário.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML5
- CSS3
- Angular Reactive Forms
- Angular Signals
- Supabase
- PostgreSQL
- Supabase JavaScript Client
- Git e GitHub

## Arquitetura

O projeto utiliza uma arquitetura monolítica organizada em camadas, mantendo a interface, os serviços e as configurações separados.

Estrutura principal:

```text
renata-aragao-pre-atendimento/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   └── supabase.service.ts
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   ├── app.css
│   │   │   └── app.routes.ts
│   │   │
│   │   ├── environments/
│   │   │   └── environment.ts
│   │   │
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   │
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Banco de dados

A aplicação utiliza o Supabase como serviço de banco de dados, com PostgreSQL.

A tabela `pre_atendimentos` armazena os seguintes campos:

| Campo | Tipo |
|---|---|
| id | UUID |
| nome | TEXT |
| email | TEXT |
| telefone | TEXT |
| assunto | TEXT |
| mensagem | TEXT |
| created_at | TIMESTAMPTZ |

O identificador é gerado automaticamente e a data de criação utiliza o valor padrão `now()`.

O acesso à tabela é protegido por Row Level Security (RLS), com uma política de inserção para usuários anônimos. Não foi configurada uma política de leitura pública.

## Configuração e execução

### Pré-requisitos

- Node.js
- npm
- Angular CLI
- Conta no Supabase

### Instalação

Clone o repositório:

```bash
git clone https://github.com/diegoandradelr/renata-aragao-pre-atendimento.git
```

Entre na pasta do frontend:

```bash
cd renata-aragao-pre-atendimento/frontend
```

Instale as dependências:

```bash
npm install
```

### Configuração do Supabase

Configure o arquivo:

`src/environments/environment.ts`

Adicione a URL do projeto e a chave publicável do Supabase:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'SUA_URL_DO_SUPABASE',
  supabaseKey: 'SUA_CHAVE_PUBLICAVEL'
};
```

Utilize somente a chave publicável no frontend. Nunca exponha chaves secretas ou `service_role` no código do navegador.

### Executar localmente

Dentro da pasta `frontend`, execute:

```bash
ng serve
```

A aplicação estará disponível em:

`http://localhost:4200`

## Segurança e privacidade

O formulário apresenta orientações sobre privacidade e solicita consentimento antes do envio.

O projeto utiliza RLS para controlar o acesso à tabela de pré-atendimentos. As informações coletadas devem ser utilizadas exclusivamente para a finalidade de pré-atendimento, observando os princípios da Lei Geral de Proteção de Dados (LGPD).

Não devem ser enviados documentos ou informações médicas sensíveis pelo formulário inicial.

## Status do projeto

MVP em desenvolvimento, com página institucional, formulário de pré-atendimento, integração com Supabase e encaminhamento para WhatsApp implementados.

Funcionalidades administrativas e evoluções futuras poderão ser incorporadas nas próximas etapas.

## Autor

Desenvolvido por **Diego Andrade**.

[GitHub](https://github.com/diegoandradelr)