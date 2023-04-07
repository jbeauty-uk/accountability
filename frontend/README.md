# Accountability - Frontend

### Environment variables

| Branding                    |                       |                                                             |
| --------------------------- | --------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`       | http://localhost:8080 |                                                             |
| `NEXT_PUBLIC_SITE_BRANDING` |                       | This value is optional and will default to `Accountability` |
| `NEXTAUTH_SECRET`           |                       | Use `openssl rand -base64 32` to generate a secret          |
| `GOOGLE_CLIENT_ID`          |                       | [See here][google-credentials]                              |
| `GOOGLE_CLIENT_SECRET`      |                       | [See here][google-credentials]                              |

## Start the development server

```shell
yarn dev
```

> The development server will start on `localhost:8080`

## Generate GraphQL schemas

```bash
yarn graphql-code-generator
```

> Ensure the backend application is running on `localhost:3000` before generating GraphQL types.

[google-credentials]: https://console.cloud.google.com/apis/credentials/oauthclient/80897659694-ocbk9cs9mefqoplmrqktnav8emi2eoso.apps.googleusercontent.com?project=jbeautyuk
