import { createStorage } from 'unstorage'
import githubDriver from 'unstorage/drivers/github'

export const ghStorage = createStorage({
  driver: githubDriver({
    repo: 'alexandre-hallaine/ghstats',
    branch: 'main',
    dir: '/stats',
  }),
})
