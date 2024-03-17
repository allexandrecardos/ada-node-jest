## Requisitos

- Crie testes unitários para o fluxo de sessão de usuários (Controllers e Services)
- Não é necessário fazer testes e2e mas será apreciado
- Utilize mocks quando necessário

## Instalação e Execução
1. Clone o repositório para sua máquina local.
```bash
  git clone https://github.com/allexandrecardos/ada-node-jest.git
```

2. Certifique-se de ter o [NodeJS](https://nodejs.org/en/download/current) instalado. 

3. Certifique-se de configurar corretamente o arquivo **.env** com as variáveis de ambiente necessárias, como informações de conexão com o banco de dados e chaves JWT.<br>
**Obs: Caso não tenha o arquivo, crie e cole as variáveis abaixo.**
```bash
  PORT=3000
  MONGO_DB_URL=mongodb://root:example@localhost:27017/
  SECRET_KEY=fd7a3bda8b67f862cb9bde735beef9b36b04213a07126e3c2c9d21298c124132
```
4. Certifique-se de ter o [Docker](https://www.docker.com/get-started/) instalado e rodando no seu ambiente.

5. Instale as dependências do projeto.
```bash
  npm install
```

6. Execute o comando docker para subir o banco de dados (Mongoogse).
```bash
  docker compose up -d
```

7. Execute os comandos abaixo para executar os testes no projeto.

- **Testes sem logs**
```bash 
  npm test
```

- **Testes com logs**
```bash 
  npm run test:logs
```