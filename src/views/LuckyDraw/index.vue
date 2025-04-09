<template>
  <div class="lottery-container">
    <div class="left-panel">
      <div class="wheel-wrap">
        <div class="wheel" :style="{
          background: wheelGradient,
          transform: `rotate(${rotation}deg)`
        }"></div>
        <div class="pointer">🎯</div>
        <div class="light" :style="{ opacity: lightOpacity }"></div>
      </div>
      <button class="btn-draw" :disabled="drawing" @click="startDraw">
        {{ drawing ? '抽奖进行中...' : '开始抽奖' }}
      </button>
    </div>
    <div class="right-panel">
      <h2>参与者列表</h2>
      <div class="participant-list">
        <div v-for="p in participants" :key="p.id"
          :class="['participant-item', { selected: winner && p.id === winner.id }]">
          <span class="dot" :style="{ background: p.color }"></span>
          <span class="name">{{ p.name }}</span>
          <span class="weight">{{ pct(p.weight) }}</span>
        </div>
      </div>
      <div v-if="showResult" class="result">
        <h2>恭喜 🎉 {{ winner.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

interface Participant { id: number; name: string; weight: number; color: string }

const raw = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1, name: `用户${i + 1}`, weight: Math.floor(Math.random() * 5) + 1
}))

const participants = ref<Participant[]>([])
const drawing = ref(false)
const showResult = ref(false)
const winner = ref<Participant>({ id: 0, name: '', weight: 0, color: '' })
const rotation = ref(0)
const lightOpacity = ref(0)

const totalWeight = computed(() => participants.value.reduce((s, p) => s + p.weight, 0))

onMounted(() => {
  const step = 360 / raw.length
  participants.value = raw.map((p, i) => ({ ...p, color: `hsl(${i * step}deg,70%,60%)` }))
})

const wheelGradient = computed(() => {
  let acc = 0
  return `conic-gradient(${participants.value.map(p => {
    const angle = p.weight / totalWeight.value * 360
    const start = acc; acc += angle
    return `${p.color} ${start}deg ${acc}deg`
  }).join(',')})`
})

const makePool = () => participants.value.flatMap(p => Array(p.weight).fill(p.id))

const pct = w => (w / totalWeight.value * 100).toFixed(1) + '%'

const startDraw = () => {
  if (drawing.value) return
  drawing.value = true; showResult.value = false; rotation.value = 0; lightOpacity.value = 0

  const pool = makePool()
  const randId = pool[Math.floor(Math.random() * pool.length)]
  const idx = participants.value.findIndex(p => p.id === randId)

  const angles = participants.value.map(p => p.weight / totalWeight.value * 360)
  const startAngles = angles.reduce((acc, a, i) => { acc.push(i ? acc[i - 1] + angles[i - 1] : 0); return acc }, [] as number[])

  const centerAngle = startAngles[idx] + angles[idx] / 2
  // 修正：顺时针旋转 360*4 + (360 - centerAngle)
  const target = 360 * 4 + (360 - centerAngle)

  gsap.to(rotation, { value: target, duration: 4, ease: 'power2.out' })
  gsap.to(lightOpacity, { value: 0.8, yoyo: true, repeat: 5, duration: 0.3 })

  gsap.delayedCall(3.8, () => {
    rotation.value = target % 360
    winner.value = participants.value[idx]
    showResult.value = true
    drawing.value = false
  })
}
</script>

<style scoped>
.lottery-container {
  display: flex;
  padding-top: 70px;
  height: calc(100vh-70px);
  max-width: 1920px;
  margin: 0 auto;
  gap: 2rem
}

.left-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
}

.right-panel {
  flex: 1;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)
}

.wheel-wrap {
  position: relative;
  width: 500px;
  height: 500px;
  margin-bottom: 2rem
}

.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1)
}

.pointer {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  text-shadow: 0 0 6px gold;
}

.light {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)
}

.btn-draw {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  background: #4ecdc4;
  border: none;
  border-radius: 30px;
  color: #fff;
  cursor: pointer
}

.participant-list {
  max-height: 60vh;
  overflow: auto
}

.participant-item {
  display: flex;
  align-items: center;
  padding: .5rem;
  border-radius: 4px;
  margin-bottom: .2rem
}

.participant-item.selected {
  background: rgba(255, 107, 107, 0.2)
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: .5rem
}

.name {
  flex: 1
}

.weight {
  color: #666
}

.result {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #ff6b6b;
  text-align: center
}
</style>
