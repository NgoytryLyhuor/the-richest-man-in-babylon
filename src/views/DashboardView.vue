<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">BOOK SUMMARY</p>
      <h1 class="text-3xl md:text-5xl font-display font-black leading-tight mb-3" :style="{ color: 'var(--text-heading)' }">
        {{ t('មនុស្សដែលមានបំផុតក្នុងបាប៊ីឡូន', 'The Richest Man in Babylon') }}
      </h1>
      <p class="max-w-lg text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">
        {{ t('មេរៀនហិរញ្ញវត្ថុដ៏មានតម្លៃពី George S. Clason — សាមញ្ញ ប៉ុន្តែផ្លាស់ប្តូរជីវិត។', 'Priceless financial lessons from George S. Clason — simple, yet life-changing.') }}
      </p>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <router-link v-for="card in statCards" :key="card.to" :to="card.to"
        class="border rounded-xl p-4 text-left cursor-pointer hover:opacity-80 transition block"
        :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium" :style="{ color: 'var(--text-label)' }">{{ t(card.kmLabel, card.enLabel) }}</p>
        <p class="text-3xl font-display font-black mt-1" :style="{ color: card.color }">{{ card.value }}</p>
        <p class="text-[10px] mt-1" :style="{ color: 'var(--text-label)' }">{{ t(card.kmSub, card.enSub) }}</p>
      </router-link>
    </div>

    <!-- Chart -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('ការលូតលាស់ប្រាក់សន្សំក្នុង ១ ឆ្នាំ', '1-YEAR SAVINGS GROWTH') }}
      </p>
      <div class="chart-box"><canvas ref="mainChartRef"></canvas></div>
      <p class="text-center text-[11px] mt-3" :style="{ color: 'var(--text-label)' }">
        {{ t('$50/ខែ + អត្រាការប្រាក់ ៣%', '$50/mo + 3% interest') }}
      </p>
    </div>

    <div class="text-center">
      <router-link to="/cures"
        class="inline-block px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg"
        :style="{ background: 'var(--accent)', color: '#ffffff', boxShadow: '0 4px 14px rgba(59,130,246,0.25)' }">
        {{ t('ចាប់ផ្តើមអាន', 'Start Reading') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)

const { theme, getChartColors } = useTheme()
const { lang, t } = useLanguage()

const mainChartRef = ref(null)
let chartInstance = null

const statCards = [
  { to: '/cures', kmLabel: 'វិធីព្យាបាល', enLabel: 'CURES', value: '7', color: 'var(--accent)', kmSub: 'វិធីព្យាបាលផ្លូវចិត្ត', enSub: 'Mental Cures' },
  { to: '/laws', kmLabel: 'ច្បាប់មាស', enLabel: 'LAWS', value: '5', color: 'var(--accent)', kmSub: 'ច្បាប់នៃមាស', enSub: 'Laws of Gold' },
  { to: '/calc', kmLabel: 'រូបមន្ត', enLabel: 'FORMULA', value: '10/20/70', color: 'var(--accent)', kmSub: 'បែងចែកថវិកា', enSub: 'Budget Split' },
  { to: '/grow', kmLabel: 'ឧទាហរណ៍', enLabel: 'EXAMPLE', value: '$500', color: 'var(--green)', kmSub: 'ការលូតលាស់សន្សំ', enSub: 'Savings Growth' },
]

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!mainChartRef.value) return
  const cc = getChartColors()
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let bal = 0
  const dep = [], tot = []
  for (let i = 1; i <= 12; i++) {
    bal = (bal + 50) * 1.0025
    dep.push(50 * i)
    tot.push(parseFloat(bal.toFixed(2)))
  }
  chartInstance = new Chart(mainChartRef.value, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: 'Deposit', data: dep, borderColor: cc.stone, tension: 0.3, fill: false },
        { label: 'Total', data: tot, borderColor: cc.gold, tension: 0.3, fill: true, backgroundColor: cc.goldFill }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: cc.legend, font: { size: 11 } } } },
      scales: {
        y: { beginAtZero: true, ticks: { color: cc.legend }, grid: { color: cc.grid } },
        x: { ticks: { color: cc.legend }, grid: { color: cc.grid } }
      }
    }
  })
}

onMounted(renderChart)
watch(theme, renderChart)
</script>
