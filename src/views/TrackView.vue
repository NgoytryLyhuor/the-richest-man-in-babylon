<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">EXPENSE TRACKER</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('តាមដានការចំណាយ', 'Track Your Spending') }}
      </h2>
    </div>

    <!-- Add form -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('បន្ថែមថ្មី', 'ADD NEW') }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('កាលបរិច្ឆេទ', 'DATE') }}</label>
          <input type="date" v-model="form.date" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ប្រភេទ', 'CATEGORY') }}</label>
          <select v-model="form.category" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }">
            <option value="food">Food</option><option value="transport">Transport</option><option value="utilities">Utilities</option>
            <option value="rent">Rent</option><option value="health">Health</option><option value="education">Education</option><option value="other">Other</option>
          </select>
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">${{ t('ទឹកប្រាក់', 'AMOUNT') }}</label>
          <input type="number" v-model.number="form.amount" step="0.01" placeholder="0.00" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('កំណត់សម្គាល់', 'NOTE') }}</label>
          <input type="text" v-model="form.note" placeholder="..." class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
      </div>
      <button @click="addExpense" class="px-5 py-2 rounded-lg font-bold text-sm transition"
        :style="{ background: 'var(--accent)', color: '#ffffff' }">
        {{ t('បន្ថែម', 'ADD') }}
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-3 mb-6">
      <div class="border rounded-xl p-3 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[9px] uppercase tracking-widest" :style="{ color: 'var(--text-label)' }">{{ t('ចំណាយ', 'SPENT') }}</p>
        <p class="text-lg font-bold mt-0.5" :style="{ color: 'var(--red)' }">${{ totalSpent }}</p>
      </div>
      <div class="border rounded-xl p-3 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[9px] uppercase tracking-widest" :style="{ color: 'var(--text-label)' }">{{ t('សល់', 'LEFT') }}</p>
        <p class="text-lg font-bold mt-0.5" :style="{ color: 'var(--green)' }">${{ remaining }}</p>
      </div>
      <div class="border rounded-xl p-3 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[9px] uppercase tracking-widest" :style="{ color: 'var(--text-label)' }">{{ t('វិក័យប័ត្រ', 'ITEMS') }}</p>
        <p class="text-lg font-bold mt-0.5" :style="{ color: 'var(--text-body)' }">{{ expenses.length }}</p>
      </div>
      <div class="border rounded-xl p-3 text-center" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[9px] uppercase tracking-widest" :style="{ color: 'var(--text-label)' }">{{ t('មធ្យម', 'AVG') }}</p>
        <p class="text-lg font-bold mt-0.5" :style="{ color: 'var(--accent)' }">${{ avg }}</p>
      </div>
    </div>

    <!-- Chart + List -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
      <div class="md:col-span-2 border rounded-xl p-5" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-xs uppercase tracking-widest font-medium mb-3" :style="{ color: 'var(--text-label)' }">
          {{ t('ប្រភេទ', 'BY CATEGORY') }}
        </p>
        <div style="height:200px"><canvas ref="categoryChartRef"></canvas></div>
      </div>
      <div class="md:col-span-3 border rounded-xl p-5" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <div class="flex justify-between items-center mb-4">
          <p class="text-xs uppercase tracking-widest font-medium" :style="{ color: 'var(--text-label)' }">
            {{ t('បញ្ជី', 'LIST') }}
          </p>
          <button @click="clearExpenses" class="text-[10px] font-bold transition uppercase tracking-wider" :style="{ color: 'var(--red)' }">
            {{ t('លុប', 'CLEAR') }}
          </button>
        </div>
        <div class="space-y-1.5 max-h-64 overflow-y-auto">
          <div v-if="expenses.length === 0" class="text-sm text-center py-6" :style="{ color: 'var(--text-label)' }">
            {{ t('មិនទាន់មាន', 'Empty') }}
          </div>
          <div v-for="e in sortedExpenses" :key="e.id"
            class="flex items-center justify-between py-2 px-3 rounded-lg transition group"
            :style="{ borderBottom: '1px solid var(--border-main)' }">
            <div class="flex items-center gap-2.5">
              <span class="text-sm w-5 text-center">{{ icons[e.category] }}</span>
              <div>
                <p class="text-xs font-medium" :style="{ color: 'var(--text-heading)' }">
                  {{ categoryNames[e.category] }}<template v-if="e.note"> &middot; {{ e.note }}</template>
                </p>
                <p class="text-[10px]" :style="{ color: 'var(--text-label)' }">{{ e.date }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold" :style="{ color: 'var(--red)' }">-${{ e.amount.toFixed(2) }}</span>
              <button @click="deleteExpense(e.id)" class="text-xs opacity-0 group-hover:opacity-100 transition" :style="{ color: 'var(--text-label)' }">&#10005;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)

const { theme, getChartColors } = useTheme()
const { lang, t } = useLanguage()

const icons = { food: '\uD83C\uDF7D\uFE0F', transport: '\uD83D\uDE97', utilities: '\uD83D\uDCA1', rent: '\uD83C\uDFE0', health: '\uD83D\uDC8A', education: '\uD83D\uDCDA', other: '\uD83D\uDCE6' }
const categoryNames = { food: 'Food', transport: 'Transport', utilities: 'Utilities', rent: 'Rent', health: 'Health', education: 'Education', other: 'Other' }

const form = reactive({
  date: new Date().toISOString().split('T')[0],
  category: 'food',
  amount: null,
  note: ''
})

const expenses = ref(JSON.parse(localStorage.getItem('babylon_expenses') || '[]'))

const sortedExpenses = computed(() => [...expenses.value].sort((a, b) => b.date.localeCompare(a.date)))
const totalSpent = computed(() => expenses.value.reduce((s, e) => s + e.amount, 0).toFixed(0))
const remaining = computed(() => Math.max(0, 350 - parseFloat(totalSpent.value)).toFixed(0))
const avg = computed(() => expenses.value.length ? (parseFloat(totalSpent.value) / expenses.value.length).toFixed(0) : '0')

function save() {
  localStorage.setItem('babylon_expenses', JSON.stringify(expenses.value))
}

function addExpense() {
  const amt = form.amount || 0
  if (!form.date || amt <= 0) {
    alert(lang.value === 'km' ? 'សូមបំពេញកាលបរិច្ឆេទ និងទឹកប្រាក់' : 'Fill in date and amount')
    return
  }
  expenses.value.push({ date: form.date, category: form.category, amount: amt, note: form.note, id: Date.now() })
  save()
  form.amount = null
  form.note = ''
}

function deleteExpense(id) {
  expenses.value = expenses.value.filter(e => e.id !== id)
  save()
}

function clearExpenses() {
  if (confirm('Clear all?')) {
    expenses.value = []
    save()
  }
}

const categoryChartRef = ref(null)
let chartInstance = null

function renderCategoryChart() {
  if (chartInstance) chartInstance.destroy()
  if (!categoryChartRef.value) return
  const cats = { food: 0, transport: 0, utilities: 0, rent: 0, health: 0, education: 0, other: 0 }
  expenses.value.forEach(e => { cats[e.category] = (cats[e.category] || 0) + e.amount })
  const labels = ['Food', 'Transport', 'Utilities', 'Rent', 'Health', 'Edu', 'Other']
  const data = Object.values(cats)
  const colors = ['#f87171', '#fb923c', '#fbbf24', '#a78bfa', '#34d399', '#38bdf8', '#78716c']
  const cc = getChartColors()
  chartInstance = new Chart(categoryChartRef.value, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: cc.border, borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { color: cc.legend, padding: 8, font: { size: 10 } } } } }
  })
}

onMounted(renderCategoryChart)
watch([expenses, theme], renderCategoryChart)
</script>
