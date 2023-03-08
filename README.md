fastify
typescript
npx
@types/node
eslint
@rocketseat/eslint-config
--------------------------------------
# Migration:
O knex (query builder) não suporta nativamente a biblioteca `tsx`.
Para rodar o knew, ao invez do comando `npx knex...` devemos rodar
o node. O `--` serve para dizer que o comando subsequente é para 
o knex e não para o Node. Esse comando irá criar a tabela de 
migrations do Knex.

Ex: Se o comando fosse `npm run knex -h`, a flag `-h` seria para o Node.

-Scripts
`"knex": "node -- loader tsx ./node_modules/.bin/knex"`
`npm run knex -- migrate:make create-documents`

`-- loader`: Opção específica do node para eu conseguir rodar alguma biblioteca
para carregar algum código Node. Ex: Estou usando o Node mas usando o tsx para
carregar o arquivo porque o tsx entende o a extensão `*.ts`.
--------------------------------------
# RF

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da conta;
- [x] O usuário deve poder listar todas transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

# RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [ ] Deve ser possível identificarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações o qual ele criou;

# RNF
- Requisitos técnológicos.
--------------------------------------
# Testes

- Unitários: unidade da sua aplicação
- Integração: comunicação entre duas ou mais unidades
- e2e - ponta a ponta: simulam um usuário operando na nossa aplicação

- front-end: abre a página de login, digite o texto diego@rocketseat.com.br no campo com ID email, clique no botão
- back-end: chamadas-HTTP, WebSockets

- Pirâmide de testes: E2E (não dependem de nenhuma tecnologia, não dependem de arquitetura)
- 2000 testes -› Testes E2E =› 16min