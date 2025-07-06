<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
  // {
  //   label: 'Me',
  //   to: '/me',
  // },
])
</script>

<template>
  <div>
    <UHeader title="GitReplay">
      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />

        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/alexandre-hallaine/GitReplay"
          target="_blank"
          icon="lucide:github"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
        />
      </template>
    </UHeader>
    <slot />
  </div>
</template>
