import { NextApiHandler } from 'next/types';
import { authOptions } from './options';
import NextAuth from 'next-auth/next';
const handler: NextApiHandler = NextAuth(authOptions);
export  {handler as GET, handler as POST};
