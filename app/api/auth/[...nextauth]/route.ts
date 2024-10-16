import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mobile: { label: "Mobile", type: "text", placeholder: "mobile Number" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.mobile || !credentials?.password) {
            throw new Error("Mobile number and password are required");
          }

          const { mobile, password } = credentials;

          // Find the user by mobile
          const user = await prisma.user.findUnique({ where: { mobile } });
          if(user?.status=="pending"){
            throw new Error("Your application under review,Please login later")
          }

          if (!user) {
            throw new Error("No user found with this mobile number");
          }

          // Verify password
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Return the full user object
          return {
            id: user.id,
            name: user.name,
            mobile: user.mobile,
            whatsApp: user.whatsApp,
            password: user.password, // This will be excluded in the session and JWT
          };

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  session: {
    strategy: 'jwt', // Use JWTs to manage session
    maxAge: 30 * 24 * 60 * 60, // Session duration (30 days)
    updateAge: 24 * 60 * 60, // Time to check if the session needs to be updated (1 day)
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.mobile = user.mobile;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.mobile = token.mobile;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // Use a strong secret for JWT encryption
};

// export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

// Named exports for HTTP methods
export const GET = (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, authOptions);
export const POST= (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, authOptions);
