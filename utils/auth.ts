import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({})

export function signIn() {
  return authClient.signIn.social({
    provider: 'github',
  })
}
