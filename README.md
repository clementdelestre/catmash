# CatMash.

L'application qui te permet de juger des chats.


## Tech Stack

**Monorepo:** Lerna

**Client:** Angular 18, TailwindCSS

**Server:** Node, Nestjs



## Run Locally

Clone the project

```bash
  git clone https://github.com/clementdelestre/catmash
```

Go to the project directory

```bash
  cd catmash
```

Install dependencies

```bash
  npm install pnpm -g
  pnpm install
```

Start the backend

```bash
  npx lerna run start --scope backend
```

Start the frontend

```bash
  npx lerna run start --scope frontend
```

## Environment Variables

To run this project, you will need to add the following environment variables to your backend/.env file

`DB_HOST`

`DB_PASSWORD`

`DB_USER`

`DB_NAME`

`DB_PORT`

`DB_SYNCHRONIZE`
