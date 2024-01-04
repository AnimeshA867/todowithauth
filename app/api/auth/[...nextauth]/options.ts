import bcrypt from 'bcryptjs';
import { connectMongoDB as connect } from '@/lib/mongodb';
import Credentials from 'next-auth/providers/credentials';
import { AuthOptions, ISODateString, User } from 'next-auth';
import { User as UserModel } from '@/models/user';
import { JWT } from 'next-auth/jwt';


export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async signIn({ user }) {
      connect();
      try {
        const findUser = await UserModel.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await UserModel.create({
          email: user.email,
          name: user.name,
          role: 'User',
        });
        return true;
      } catch (error) {
        console.log('The error is ', error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        user.role = user?.role == null ? 'User' : user?.role;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    Credentials({
      name: 'Welcome Back',
      type: 'credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connect();
          const user = await UserModel.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("The password doesn't match.");
          } else {
            console.log('Password matched.');
            return user;
          }
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
  ],
};