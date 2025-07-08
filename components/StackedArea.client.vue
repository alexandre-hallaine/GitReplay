<script setup lang="ts">
import { VisXYContainer, VisArea, VisBulletLegend } from '@unovis/vue'

const { keys, data: info } = defineProps<{
  keys: string[]
  data: Record<number, Record<string, number>>
}>()

const data = computed(() =>
  Object.entries(info).map(([x, series]) => {
    const total = keys.reduce((sum, k) => sum + (series[k] || 0), 0)
    const normalized = Object.fromEntries(keys.map(k => [k, (series[k] || 0) / total]))
    return [x, normalized]
  }),
)

const x = (d: [number]) => d[0]
const y = keys.map(k => (d: [number, Record<string, number>]) => d[1][k])
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
