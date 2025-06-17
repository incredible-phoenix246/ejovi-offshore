export const API_AUTH_PREFIX = '/api/auth'

/**
 * The default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'

export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/register',
  '/forgot-password',
  '/reset-password',
]

export const DEFAULT_AUTH_REDIRECT = '/login'

export const DEFAULT_GET_ORG_ROUTE = '/organizations'
// export const PUBLIC_ROUTES = ['/', "/invite"]
export const ORG_ROUTES = [DEFAULT_GET_ORG_ROUTE, '/create-org']
