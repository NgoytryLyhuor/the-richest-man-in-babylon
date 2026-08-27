<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">10 / 20 / 70</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('គណនាថវិកា', 'Budget Calculator') }}
      </h2>
    </div>

    <!-- Inputs -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('បញ្ចូលប្រាក់ខែ', 'ENTER YOUR SALARY') }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('បើកទី១', 'Pay #1') }}</label>
          <input type="number" v-model.number="salary1" step="0.01" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('បើកទី២', 'Pay #2') }}</label>
          <input type="number" v-model.number="salary2" step="0.01" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('បំណុល', 'Debt') }}</label>
          <input type="number" v-model.number="debt" step="0.01" class="w-full border rounded-lg px-3 py-2.5 text-sm transition"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-heading)' }" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('សរុប', 'TOTAL') }}</label>
          <div class="w-full border rounded-lg px-3 py-2.5 text-sm font-bold"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--accent)', color: 'var(--accent)' }">
            ${{ total.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Allocation Bars -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-5" :style="{ color: 'var(--text-label)' }">
        {{ t('បែងចែក', 'ALLOCATION') }}
      </p>

      <div v-for="bar in bars" :key="bar.key" class="mb-4" :class="{ 'mb-0': bar.key === 'exp' }">
        <div class="flex justify-between items-center mb-1.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :style="{ background: bar.color }"></span>
            <span class="text-xs font-bold" :style="{ color: bar.color }">{{ t(bar.kmLabel, bar.enLabel) }}</span>
            <span class="text-[10px]" :style="{ color: 'var(--text-label)' }">{{ bar.pct }}%</span>
          </div>
          <span class="text-sm font-bold" :style="{ color: bar.color }">${{ bar.total.toFixed(2) }}</span>
        </div>
        <div class="h-2 rounded-full overflow-hidden" :style="{ background: 'var(--bg-input)' }">
          <div class="h-full rounded-full transition-all duration-500" :style="{ width: bar.pct + '%', background: bar.color }"></div>
        </div>
        <div class="flex justify-between mt-1">
          <span class="text-[10px]" :style="{ color: 'var(--text-label)' }">${{ bar.p1.toFixed(2) }}</span>
          <span class="text-[10px]" :style="{ color: 'var(--text-label)' }">${{ bar.p2.toFixed(2) }}</span>
        </div>
      </div>

      <div v-if="debt === 0" class="mt-4 rounded-lg px-4 py-2.5"
        :style="{ background: 'var(--no-debt-bg)', border: '1px solid var(--no-debt-border)' }">
        <p class="text-xs font-bold" :style="{ color: 'var(--green)' }">
          {{ t(`អ្នកគ្មានបំណុល → សន្សំ ៣០% = $${saveTotalYear.toFixed(2)}/ខែ`, `No debt → Save 30% = $${saveTotalYear.toFixed(2)}/mo`) }}
        </p>
      </div>
    </div>

    <!-- Yearly Projection -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <div class="border rounded-xl p-4" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium mb-2" :style="{ color: 'var(--text-label)' }">
          {{ t('សន្សំ ១០%', 'SAVE 10%') }}
        </p>
        <p class="text-2xl font-display font-black" :style="{ color: 'var(--text-heading)' }">${{ yearSave.toFixed(2) }}</p>
        <p class="text-[10px] mt-1" :style="{ color: 'var(--text-label)' }">{{ t('ក្នុង ១ ឆ្នាំ', 'per year') }}</p>
      </div>
      <div class="border rounded-xl p-4" :style="{ background: 'var(--bg-card)', borderColor: 'var(--green)' }">
        <p class="text-[10px] uppercase tracking-widest font-medium mb-2" :style="{ color: 'var(--green)' }">
          {{ t('គ្មានបំណុល = សន្សំ ៣០%', 'NO DEBT = SAVE 30%') }}
        </p>
        <p class="text-2xl font-display font-black" :style="{ color: 'var(--green)' }">${{ yearNoDebt.toFixed(2) }}</p>
        <p class="text-[10px] mt-1" :style="{ color: 'var(--text-label)' }">{{ t('ក្នុង ១ ឆ្នាំ', 'per year') }}</p>
      </div>
    </div>

    <div class="flex justify-end">
      <router-link to="/grow" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ការលូតលាស់ →', 'Next: Growth →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const salary1 = ref(250)
const salary2 = ref(250)
const debt = ref(0)

const safeS1 = computed(() => Math.max(0, salary1.value || 0))
const safeS2 = computed(() => Math.max(0, salary2.value || 0))
const total = computed(() => safeS1.value + safeS2.value)
const save1 = computed(() => safeS1.value * 0.1)
const save2 = computed(() => safeS2.value * 0.1)
const debt1 = computed(() => safeS1.value * 0.2)
const debt2 = computed(() => safeS2.value * 0.2)
const exp1 = computed(() => safeS1.value * 0.7)
const exp2 = computed(() => safeS2.value * 0.7)
const saveTotal = computed(() => save1.value + save2.value)
const debtTotal = computed(() => debt1.value + debt2.value)
const expTotal = computed(() => exp1.value + exp2.value)
const yearSave = computed(() => saveTotal.value * 12)
const yearNoDebt = computed(() => (saveTotal.value + debtTotal.value) * 12)
const saveTotalYear = computed(() => saveTotal.value + debtTotal.value)

const bars = computed(() => [
  { key: 'save', color: 'var(--green)', kmLabel: 'សន្សំ / វិនិយោគ', enLabel: 'SAVE / INVEST', pct: 10, total: saveTotal.value, p1: save1.value, p2: save2.value },
  { key: 'debt', color: 'var(--accent)', kmLabel: 'សងបំណុល', enLabel: 'PAY DEBT', pct: 20, total: debtTotal.value, p1: debt1.value, p2: debt2.value },
  { key: 'exp', color: 'var(--accent)', kmLabel: 'ចំណាយ', enLabel: 'EXPENSES', pct: 70, total: expTotal.value, p1: exp1.value, p2: exp2.value },
])
</script>
