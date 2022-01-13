import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '../../../models/User';
import connectDB from '../../../config/db';

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24, // 1d
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        connectDB();

        const { email, password } = credentials;

        // check if email and password are entered
        if (!email || !password) {
          throw new Error('Please enter email or password.');
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Email or password incorrect !!!');
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
          throw new Error('Email or password incorrect !!!');
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    // check if the user is existed and assign the user to the token
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
