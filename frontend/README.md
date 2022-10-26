# Accountability

A service to help you manage your day-to-day spending.

## Running the app

### Set up backend

Step 1. Start up a Postgres database. If using MacOS, you can use [Postgres.app](https://postgresapp.com/)

### Set up frontend

```bash
cd frontend
```

Step 1. Copy the contents of `.env.sample` to `.env.local`

```bash
cp .env .env.local
```

Step 2. Fill out the .env.local.

Step 3. Install all dependencies

```bash
yarn install
```

Step 4. Run the development server

```bash
yarn dev
```

### Environment variables

| Environment variable     | Sample Value                         | Description                     |
| ------------------------ | ------------------------------------ | ------------------------------- |
| GOOGLE_CLIENT_ID         | `example.apps.googleusercontent.com` | Google credential client id     |
| GOOGLE_CLIENT_SECRET     | `secret value`                       | Google credential client secret |
| NEXTAUTH_URL             | `Example`                            | Lorem ipsum                     |
| SECRET                   | `Example`                            | Lorem ipsum                     |
| NEXT_PUBLIC_API_ENDPOINT | `Example`                            | Lorem ipsum                     |

Google client credentials can be obtained from [this page](https://console.cloud.google.com/apis/credentials)
