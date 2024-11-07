import "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
  }
  interface JWT {
    id?: string;
  }
}
