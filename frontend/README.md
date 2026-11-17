# Renata Aragão Advocacia — Pré-atendimento

MVP de uma aplicação web para pré-atendimento jurídico, desenvolvido para **Renata Aragão Advocacia e Consultoria Jurídica**.

O objetivo é facilitar o primeiro contato entre potenciais clientes e o escritório, permitindo o envio de informações iniciais por meio de um formulário. Os dados são registrados no Supabase e, após a confirmação do envio, o usuário pode continuar o atendimento pelo WhatsApp.

## Objetivo do projeto

Desenvolver uma plataforma web que facilite o processo inicial de atendimento jurídico, centralizando as solicitações recebidas e proporcionando uma experiência simples, acessível e responsiva.

## Funcionalidades implementadas

- Página institucional do escritório.
- Formulário de pré-atendimento jurídico.
- Validação dos campos obrigatórios.
- Validação de e-mail e telefone.
- Campo de consentimento para envio dos dados.
- Integração com Supabase para registro das solicitações.
- Exibição de confirmação após o envio bem-sucedido.
- Redirecionamento para o WhatsApp com os dados informados.
- Tratamento de erros durante o envio.
- Preservação dos dados preenchidos quando ocorre uma falha na comunicação.
- Layout responsivo.

## Tecnologias utilizadas

- **Angular 21** — framework para desenvolvimento da aplicação.
- **TypeScript** — linguagem de programação.
- **HTML5** — estrutura da aplicação.
- **CSS3** — estilização e responsividade.
- **Angular Reactive Forms** — gerenciamento e validação do formulário.
- **Angular Signals** — gerenciamento dos estados da interface.
- **Supabase** — integração com banco de dados.
- **PostgreSQL** — banco de dados relacional.
- **Supabase JavaScript Client** — comunicação com o Supabase.
- **Git e GitHub** — versionamento e hospedagem do código.

## Arquitetura

A aplicação utiliza uma arquitetura monolítica em camadas, mantendo a interface e a comunicação com o banco de dados organizadas em responsabilidades distintas.

A estrutura contempla:

- **Interface:** componentes Angular responsáveis pela apresentação e interação com o usuário.
- **Formulário:** Angular Reactive Forms para gerenciamento dos campos e validações.
- **Serviços:** camada responsável pela comunicação com o Supabase.
- **Banco de dados:** PostgreSQL disponibilizado pelo Supabase.

O serviço `SupabaseService` centraliza a criação do cliente Supabase, evitando que a configuração da conexão fique espalhada pelos componentes.

## Estrutura do projeto

```text
renata-aragao-pre-atendimento/
│
├── css/                         # Arquivos CSS do site anterior
├── images/                      # Imagens do site anterior
├── js/                           # Arquivos JavaScript do site anterior
├── index.html                    # Página do site anterior
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── app/
    │   │   ├── services/
    │   │   │   └── supabase.service.ts
    │   │   ├── app.ts
    │   │   ├── app.html
    │   │   └── app.css
    │   │
    │   ├── environments/
    │   │   └── environment.ts
    │   │
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    │
    ├── angular.json
    ├── package.json
    ├── package-lock.json
    └── README.md
```

A pasta `frontend` contém a aplicação Angular. Os diretórios `css`, `images`, `js` e o arquivo `index.html`, localizados na raiz do repositório, correspondem à versão anterior do site.

## Configuração do Supabase

O projeto utiliza o Supabase para armazenar os dados enviados pelo formulário de pré-atendimento.

### Tabela `pre_atendimentos`

A tabela foi criada no banco PostgreSQL com os seguintes campos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | Identificador único, gerado automaticamente |
| `nome` | text | Nome do solicitante |
| `email` | text | E-mail do solicitante |
| `telefone` | text | Telefone para contato |
| `assunto` | text | Assunto do atendimento |
| `mensagem` | text | Descrição inicial da solicitação |
| `created_at` | timestamptz | Data e hora de criação do registro |

Os campos de identificação e contato são obrigatórios. A data de criação é preenchida automaticamente pelo banco de dados, utilizando o valor padrão `now()`.

### Segurança e políticas de acesso

A proteção por Row Level Security (RLS) está habilitada na tabela `pre_atendimentos`.

Foi criada uma política que permite a inserção de registros por usuários anônimos (`anon`), necessária para que o formulário público envie as solicitações.

Não foi criada uma política pública de leitura dos registros.

A aplicação utiliza a chave publicável do Supabase no frontend. A chave secreta ou administrativa (`service_role`) não deve ser utilizada em aplicações executadas no navegador.

As informações coletadas devem ser utilizadas exclusivamente para a finalidade de pré-atendimento, observando os princípios da Lei Geral de Proteção de Dados (LGPD).

Não devem ser enviados documentos ou informações médicas sensíveis pelo formulário inicial.

## Configuração do ambiente

Para executar o projeto localmente, é necessário ter instalado:

- Node.js
- npm
- Angular CLI

### 1. Clonar o repositório

```bash
git clone https://github.com/diegoandradelr/renata-aragao-pre-atendimento.git
```

### 2. Acessar a aplicação Angular

```bash
cd renata-aragao-pre-atendimento/frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as credenciais do Supabase

No arquivo `src/environments/environment.ts`, configure a URL do projeto e a chave publicável:

```ts
export const environment = {
  production: false,
  supabaseUrl: 'SUA_PROJECT_URL',
  supabaseKey: 'SUA_PUBLISHABLE_KEY'
};
```

Substitua os valores de exemplo pelas informações disponíveis nas configurações do seu projeto Supabase.

**Importante:** utilize somente a chave publicável no frontend. Nunca coloque a chave secreta ou `service_role` nesse arquivo.

### 5. Executar a aplicação

Dentro da pasta `frontend`, execute:

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200/
```

## Integração com o Supabase

A comunicação com o Supabase é realizada por meio do pacote `@supabase/supabase-js`.

O serviço responsável pela conexão está localizado em:

```text
src/app/services/supabase.service.ts
```

O formulário envia os dados para a tabela `pre_atendimentos`.

A confirmação de envio somente é apresentada quando a operação de inserção é concluída sem erros. Caso ocorra uma falha, a aplicação exibe uma mensagem de erro e preserva os dados preenchidos para que o usuário possa tentar novamente.

## Revisão técnica e testes

Durante o desenvolvimento do MVP, foram realizadas verificações manuais das principais funcionalidades.

### Testes realizados

- Validação dos campos obrigatórios do formulário.
- Validação de e-mail e telefone.
- Verificação do consentimento para envio.
- Registro de solicitações no Supabase.
- Conferência dos dados armazenados na tabela `pre_atendimentos`.
- Verificação do preenchimento automático da data de criação.
- Teste de falha de conexão com o navegador em modo offline.
- Verificação da exibição de mensagens de erro e da preservação dos dados preenchidos.
- Verificação da apresentação da confirmação após o envio bem-sucedido.

### Considerações técnicas

A aplicação separa a interface da camada de acesso ao Supabase por meio de um serviço dedicado. O formulário utiliza Angular Reactive Forms para gerenciar os campos e suas validações, enquanto os Signals controlam os estados da interface.

O acesso ao banco é controlado por Row Level Security (RLS), com política de inserção para usuários anônimos e sem política pública de leitura.

O tratamento de falhas evita que uma solicitação seja apresentada como concluída quando o banco de dados não confirma a operação.

### Melhorias futuras

- Implementar autenticação administrativa com Supabase Auth.
- Desenvolver uma área administrativa para consulta e gerenciamento dos pré-atendimentos.
- Implementar mecanismos adicionais de proteção contra envios automatizados e spam.
- Ampliar a cobertura de testes automatizados.
- Aprimorar os recursos de acessibilidade.

## Repositório

Código-fonte disponível no GitHub:

https://github.com/diegoandradelr/renata-aragao-pre-atendimento

## Status do projeto

MVP em desenvolvimento, com formulário de pré-atendimento integrado ao Supabase e registro de solicitações no banco de dados.

Desenvolvido por **Diego Andrade**.