// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    mobile: string;
    whatsApp: string;
    password: string;
  }

  interface Session {
    user: {
      id: number;
      name: string ;
      mobile: string;
    };
  }

  interface JWT {
    id: number;
    name: string ;
    mobile: string;
  }
}
