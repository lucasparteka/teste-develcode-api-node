# API Node.js

api node para cadastro, edição e listagem de usuários


## Instalação

Aplicação desenvolvida usando node `14.0.0` e PostgresSQL `12`

Criar nova tabela no banco de dados com o script informado no arquivo `scripts.sql` contido na raiz do projeto.

Criar um arquivo `.env` baseado no modelo `.env-example` contido na raiz do projeto.

URL de conexão com o banco: 
```sql
postgresql://{usuario_db}:{password_db}@{host}:{porta}/{database}
```

Substituir `{valor}` pelos dados correspondentes

Após isso

```bash
npm install
```

```bash
npm start
```

dúvidas? entre em contato comigo pelo email `lucasparteka@gmail.com`