// @ts-check
import NextAuth from 'next-auth'
import { authConfig } from './auth.conf'

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  unstable_update,
} = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
})
