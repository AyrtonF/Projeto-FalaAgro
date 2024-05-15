Introdução

Bem-vindo ao Readme do aplicativo Marketplace! Este guia detalhado irá te auxiliar na instalação, configuração e execução do aplicativo, que é composto por um backend Node.js e um frontend React. O banco de dados PostgreSQL é utilizado para armazenar dados e o Prisma gerencia as migrações do banco de dados.

Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

Node.js (versão 16 ou superior)
yarn (instalado globalmente)
Docker
Conta PostgreSQL com acesso ao servidor
Instalação

Clone o repositório do aplicativo:
Bash
git clone https://github.com/seu-repositorio/marketplace.git
Use o código com cuidado.
content_copy
Acesse as pastas backend e frontend:
Bash
cd marketplace
cd backend
cd frontend
Use o código com cuidado.
content_copy
Instale as dependências em cada pasta:
Bash
# Pasta backend
yarn install

# Pasta frontend
yarn install
Use o código com cuidado.
content_copy
Crie o arquivo .env na pasta raiz do projeto (marketplace) com as variáveis de ambiente:
DATABASE_URL="postgresql://postgres:password@localhost:5432/marketplace?schema=public"
MY_SECRET_KEY="fdksjfhskdfhsdkjfhksdjfhksdfjbnureoivn"
Substitua postgres e password pelas credenciais de acesso ao seu banco de dados PostgreSQL.

Migrações do Banco de Dados

Inicialize o Prisma:
Bash
# Pasta backend
npx prisma init
Use o código com cuidado.
content_copy
Crie as migrações iniciais do banco de dados:
Bash
# Pasta backend
npx prisma migrate dev
Use o código com cuidado.
content_copy
Execução do Aplicativo

Com Docker:

Inicie o servidor backend:
Bash
# Pasta backend
yarn run dev
Use o código com cuidado.
content_copy
Inicie o frontend React:
Bash
# Pasta frontend
yarn start
Use o código com cuidado.
content_copy
Sem Docker:

Crie o banco de dados PostgreSQL manualmente:
SQL
docker-compose up -d
docker exec -it docker psql -U postgres
create database marketplace;
\c marketplace
Use o código com cuidado.
content_copy
Execute as migrações do banco de dados:
Bash
# Pasta backend
npx prisma migrate dev
Use o código com cuidado.
content_copy
Inicie o servidor backend:
Bash
# Pasta backend
yarn run dev
Use o código com cuidado.
content_copy
Inicie o frontend React:
Bash
# Pasta frontend
yarn start
Use o código com cuidado.
content_copy
Observações

O servidor backend estará disponível na porta 3000.
O frontend React estará disponível em http://localhost:3001.
Você pode modificar as variáveis de ambiente no arquivo .env para se adequar ao seu ambiente.
Consulte a documentação do Prisma para mais informações sobre migrações de banco de dados: https://www.prisma.io/docs