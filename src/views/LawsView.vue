<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">THE 5 LAWS</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ច្បាប់នៃមាស ៥យ៉ាង', '5 Laws of Gold') }}
      </h2>
    </div>

    <div class="space-y-3">
      <div v-for="(law, i) in laws" :key="i"
        class="border rounded-xl overflow-hidden transition-colors"
        :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <button @click="toggle(i)"
          class="law-toggle w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
          :aria-expanded="openIndex === i ? 'true' : 'false'">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm shrink-0"
              :style="law.warn
                ? { background: 'rgba(220,38,38,0.08)', color: 'var(--red)' }
                : { background: 'var(--accent-light)', color: 'var(--accent)' }">
              {{ law.num }}
            </span>
            <span class="font-bold text-sm" :style="{ color: 'var(--text-heading)' }">{{ t(law.km, law.en) }}</span>
          </div>
          <svg class="law-arrow w-4 h-4 shrink-0 transition-transform duration-300" :style="{ color: 'var(--text-label)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div class="law-content px-5 pb-5 text-sm leading-relaxed" :class="{ open: openIndex === i }" :style="{ color: 'var(--text-muted)' }">
          {{ t(law.kmDesc, law.enDesc) }}
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <router-link to="/calc" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ គណនាថវិកា →', 'Next: Budget Calculator →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const openIndex = ref(null)

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? null : i
}

const laws = [
  { num: '១', km: 'មាសមករកអ្នកសន្សំ', en: 'Gold comes to the saver', warn: false,
    kmDesc: 'អ្នកដែលសន្សំ ១០% នៃចំណូល នឹងឃើញមាសកើនឡើងរៀងរាល់ខែ។ សន្សំជាទម្លាប់ដែលត្រូវរក្សាជារៀងរាល់ខែ។',
    enDesc: 'Those who save 10% will see gold grow every month. It\'s a habit to maintain.' },
  { num: '២', km: 'មាសធ្វើការសម្រាប់ម្ចាស់ប្រាជ្ញា', en: 'Gold works for the wise', warn: false,
    kmDesc: 'មាសដែលយើងវិនិយោគនឹងធ្វើការដើម្បីបង្កើនផលចំណេញ។ ត្រូវរកទីកន្លែងដែលមាសអាចធ្វើការបាន។',
    enDesc: 'Gold invested will work to generate returns. Find where gold can work.' },
  { num: '៣', km: 'មាសស្ថិតនៅជាមួយប្រាជ្ញា', en: 'Gold clings to wisdom', warn: false,
    kmDesc: 'មាសស្ថិតនៅជាមួយអ្នកដែលមានប្រាជ្ញា។ រក្សាទុកមាសនៅជាមួយអ្នកដែលទុកចិត្ត។',
    enDesc: 'Gold stays with the wise. Keep it with those you trust.' },
  { num: '៤', km: 'មាសរត់ចេញពីល្ពៅ', en: 'Gold flees from fools', warn: true,
    kmDesc: 'មាសរត់ចេញពីអ្នកដែលស្តាប់គំនិតល្ពៅ ឬវិនិយោគដោយមិនគិត។',
    enDesc: 'Gold flees from fools or those who invest without thinking.' },
  { num: '៥', km: 'មាសភ័យខ្លាចអ្នកបង្ខំ', en: 'Gold fears force', warn: true,
    kmDesc: 'អ្នកដែលព្យាយាមរកប្រាក់លឿនពេក នឹងបាត់បង់មាស។ ត្រូវអត់ធ្មត់។',
    enDesc: 'Those who force money will lose it. Be patient.' },
]
</script>
