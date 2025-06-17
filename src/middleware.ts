import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_AUTH_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
} from './route'
import { inDevEnvironment } from './lib/utils'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith(API_AUTH_PREFIX)) {
    return NextResponse.next()
  }

  const session = await auth()
  const isAuthenticated = !!session
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  if (inDevEnvironment) {
    console.log('++++++++++++++++++++++++++++++++++++')
    console.log('is_authenticated:', isAuthenticated)
    console.log('++++++++++++++++++++++++++++++++++++')
    console.log('accesed_path:', pathname)
    console.log('++++++++++++++++++++++++++++++++++++')
  }

  if (isAuthRoute) {
    return isAuthenticated
      ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
      : NextResponse.next()
  }

  if (!isAuthenticated) {
    const redirectUrl = new URL(DEFAULT_AUTH_REDIRECT, req.url)
    redirectUrl.searchParams.set('redirect_to', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
