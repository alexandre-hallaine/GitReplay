<script setup lang="ts">
import { VisXYContainer, VisArea, VisBulletLegend } from '@unovis/vue'

const { keys, data: info } = defineProps<{
  keys: string[]
  data: { [key: number]: { [key: string]: number } }
}>()

const data = computed(() => Object.entries(info))
const x = (d: [number]) => d[0]
const y = keys.map(key => (d: [number, { [key: string]: number }]) => d[1][key] || 0)
</script>

<template>
  <div>
    <VisBulletLegend :items="keys.map(key => ({ name: key }))" />
    <VisXYContainer :data>
      <VisArea
        :x
        :y
      />
    </VisXYContainer>
  </div>
</template>
