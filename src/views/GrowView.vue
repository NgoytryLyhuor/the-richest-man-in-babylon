<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">COMPOUND INTEREST</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ការលូតលាស់នៃប្រាក់សន្សំ', 'Savings Growth Calculator') }}
      </h2>
    </div>

    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('កំណត់រចនាសម្ព័ន្ធ', 'CONFIGURE') }}
      </p>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">${{ t('សន្សំ/ខែ', 'MONTHLY') }}</label>
          <input type="number" v-model.number="monthly" step="0.01" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('អត្រា %', 'RATE %') }}</label>
          <input type="number" v-model.number="rate" step="0.1" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ឆ្នាំ', 'YEARS') }}</label>
          <select v-model.number="years" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }">
            <option :value="1">1</option><option :value="3">3</option><option :value="5">5</option><option :value="10">10</option><option :value="20">20</option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-6">
      <div class="border rounded-xl p-4 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ដាក់សន្សំ', 'DEPOSITED') }}</p>
        <p class="text-xl font-display font-black mt-1" :style="{ color: 'var(--text-heading)' }">${{ totalDeposited }}</p>
      </div>
      <div class="border rounded-xl p-4 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ការប្រាក់', 'INTEREST') }}</p>
        <p class="text-xl font-display font-black mt-1" :style="{ color: 'var(--green)' }">${{ interestEarned }}</p>
      </div>
      <div class="border rounded-xl p-4 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--accent)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium" :style="{ color: 'var(--accent)' }">{{ t('សរុប', 'TOTAL') }}</p>
        <p class="text-xl font-display font-black mt-1" :style="{ color: 'var(--accent)' }">${{ totalSavings }}</p>
      </div>
    </div>

    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ការលូតលាស់', 'GROWTH CHART') }}
      </p>
      <div class="chart-box"><canvas ref="growthChartRef"></canvas></div>
    </div>

    <div class="flex justify-end">
      <router-link to="/track" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ចំណាយ →', 'Next: Expenses →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)

const { theme, getChartColors } = useTheme()
const { lang, t } = useLanguage()

const monthly = ref(50)
const rate = ref(3)
const years = ref(5)

const growthChartRef = ref(null)
let chartInstance = null

const calcResult = computed(() => {
  const mr = rate.value / 100 / 12
  const tm = years.value * 12
  let bal = 0
  const labels = [], dep = [], tot = []
  for (let m = 1; m <= tm; m++) {
    bal = (bal + monthly.value) * (1 + mr)
    if (m % (tm <= 24 ? 1 : tm <= 60 ? 3 : 12) === 0 || m === tm) {
      labels.push(lang.value === 'km' ? 'ខែ ' + m : 'M' + m)
      dep.push(monthly.value * m)
      tot.push(parseFloat(bal.toFixed(2)))
    }
  }
  return { labels, dep, tot, td: monthly.value * tm, int: bal - monthly.value * tm, total: bal }
})

const totalDeposited = computed(() => calcResult.value.td.toFixed(0))
const interestEarned = computed(() => calcResult.value.int.toFixed(0))
const totalSavings = computed(() => calcResult.value.total.toFixed(0))

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!growthChartRef.value) return
  const cc = getChartColors()
  const r = calcResult.value
  chartInstance = new Chart(growthChartRef.value, {
    type: 'line',
    data: {
      labels: r.labels,
      datasets: [
        { label: 'Deposit', data: r.dep, borderColor: cc.stone, backgroundColor: cc.stoneFill, fill: true, tension: 0.3 },
        { label: 'Total', data: r.tot, borderColor: cc.gold, backgroundColor: cc.goldFill, fill: true, tension: 0.3 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: cc.legend, font: { size: 11 } } } },
      scales: {
        y: { ticks: { color: cc.legend }, grid: { color: cc.grid } },
        x: { ticks: { color: cc.legend, maxRotation: 45 }, grid: { color: cc.grid } }
      }
    }
  })
}

onMounted(renderChart)
watch([monthly, rate, years, theme], renderChart)
</script>
