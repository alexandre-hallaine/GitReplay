<script setup lang="ts">
const session = authClient.useSession()
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
    orientation="horizontal"
  >
    <UPageCard
      v-if="!session?.data"
      description="Sign in to unlock real-time GitHub stats from your own repos."
    >
      <UButton
        icon="lucide:github"
        label="Login with GitHub"
        variant="soft"
        @click="signIn"
      />
    </UPageCard>

    <UPageCard
      v-else
      description="You're logged in — fetch real-time data from GitHub's API."
    />
  </UPageSection>
</template>
