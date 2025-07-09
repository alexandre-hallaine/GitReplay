<script setup lang="ts">
import { VisXYContainer, VisLine, VisArea, VisBulletLegend, VisAxis } from '@unovis/vue'

const { data } = defineProps<{
  data: [number, Record<string, number>][]
  showArea?: boolean
}>()

const keys = computed(() => (data[0] ? Object.keys(data[0][1]) : []))

// x returns fractional year
const x = (d: [number, Record<string, number>]) => {
  const date = new Date(d[0])
  const year = date.getFullYear()
  const start = new Date(year, 0, 1).getTime()
  const end = new Date(year + 1, 0, 1).getTime()
  return year + (d[0] - start) / (end - start)
}

// y is an array of accessors for each key
const y = computed(() => keys.value.map(k => (d: [number, Record<string, number>]) => d[1][k]))
</script>

<template>
  <div>
    <VisBulletLegend
      v-if="keys.length > 1"
      :items="keys.map(name => ({ name }))"
    />
    <VisXYContainer :data>
      <component
        :is="showArea ? VisArea : VisLine"
        :x
        :y
      />
      <VisAxis type="x" />
    </VisXYContainer>
  </div>
</template>
