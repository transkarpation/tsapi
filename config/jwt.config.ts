export const jwtSecret = process.env.JWT_SECRET || 'secret'

export const routesWhiteList = [
  '/auth/login',
  '/auth/register',
]
