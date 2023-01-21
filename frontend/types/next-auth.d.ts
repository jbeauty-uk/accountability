import "next-auth";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}
