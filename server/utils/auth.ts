import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

/* We cannot call useDatabase() without wrapping it inside a function
https://github.com/nuxt-hub/core/issues/419
 */
let _auth: ReturnType<typeof betterAuth>
export function auth() {
  if (_auth) return _auth
  return _auth = betterAuth({
    database: drizzleAdapter(useDrizzle(), {
      provider: 'sqlite',
    }),
  })
}
