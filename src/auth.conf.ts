import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { login_schema } from './schemas/auth'
import { login } from './actions/auth'
import { inDevEnvironment } from './lib/utils'

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedData = login_schema.safeParse(credentials)
        if (!validatedData.success) {
          return null
        }
        const res = await login(validatedData.data)
        if (res.status !== 200 || !res.data) {
          return null
        }
        const user = res.data
        return {
          ...user,
        }
      },
    }),
  ],
  basePath: '/api/auth',
  session: {
    strategy: 'jwt',
  },
  debug: inDevEnvironment,
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      return !!user
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        token = { ...token, ...session }
        return token
      }
      if (user) {
        token.user = {
          ...user,
        }
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig
