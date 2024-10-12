import CredentialsProvider from "next-auth/providers/credentials";
import { hash, compare } from "bcryptjs";
import clientPromise from "./mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        if (user && (await compare(credentials.password, user.password))) {
          return { id: user._id.toString(), email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

export async function createUser({ email, password, name }) {
  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    name,
  });

  return { id: result.insertedId, email };
}

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db();

  return db.collection("users").findOne({ email });
}
