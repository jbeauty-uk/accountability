import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "graphql/schemas",
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        avoidOptionals: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
