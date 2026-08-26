<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">THE 7 CURES</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('វិធីព្យាបាលផ្លូវចិត្ត ៧យ៉ាង', '7 Cures for a Lean Purse') }}
      </h2>
    </div>

    <div class="relative pl-8 md:pl-12 space-y-4">
      <div class="absolute left-[14px] md:left-[20px] top-0 bottom-0 w-[2px]"
        :style="{ background: 'linear-gradient(to bottom, var(--accent) 0%, var(--border-main) 100%)' }"></div>

      <div v-for="(cure, i) in cures" :key="i" class="relative flex gap-4">
        <div class="relative z-10 shrink-0 mt-1">
          <div class="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold"
            :style="{ border: '2px solid var(--accent)', background: 'var(--bg-body)', color: 'var(--accent)' }">
            {{ i + 1 }}
          </div>
        </div>
        <div class="border rounded-xl p-4 md:p-5 flex-1 min-w-0"
          :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
          <h3 class="font-bold mb-1" :style="{ color: 'var(--text-heading)' }">{{ t(cure.kmTitle, cure.enTitle) }}</h3>
          <p v-if="cure.kmSub" class="text-xs font-bold mb-2" :style="{ color: 'var(--accent)' }">{{ t(cure.kmSub, cure.enSub) }}</p>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">{{ t(cure.kmDesc, cure.enDesc) }}</p>
          <div v-if="cure.example" class="mt-3 border rounded-lg px-3 py-2"
            :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)' }">
            <p class="text-xs" :style="{ color: 'var(--text-muted)' }" v-html="cure.example"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <router-link to="/laws" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ច្បាប់មាស →', 'Next: Laws of Gold →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const cures = [
  {
    kmTitle: 'ចាប់ផ្តើមបំប៉ោងផ្លូវរបស់អ្នក', enTitle: 'Start Thy Purse to Fattening',
    kmSub: 'សន្សំ ១០% ភ្លាមៗ', enSub: 'Save 10% immediately',
    kmDesc: 'រាល់ពេលទទួលបានប្រាក់ចំណូល ត្រូវដកយ៉ាងហោចណាស់ ១០% ទុកសន្សំជាដាច់ខាត មុនពេលយកទៅចំណាយ។',
    enDesc: 'Every time you receive income, save at least 10% before spending on anything else.',
    example: '$500 × 10% = <span style="color:var(--green);font-weight:bold;">$50/ខែ</span> = $600/ឆ្នាំ'
  },
  {
    kmTitle: 'គ្រប់គ្រងការចំណាយ', enTitle: 'Control Thy Expenditures',
    kmSub: 'បែងចែកឲ្យច្បាស់រវាងតម្រូវការ និងបំណងប្រាថ្នា', enSub: 'Needs vs Wants',
    kmDesc: 'កាត់បន្ថយការចំណាយមិនចាំបាច់ ដើម្បីកុំឲ្យការចំណាយកើនឡើងតាមទំហំចំណូល។',
    enDesc: 'Cut unnecessary expenses so spending doesn\'t grow with income.',
    example: '$500 × 70% = <span style="color:var(--accent);font-weight:bold;">$350/ខែ</span> សម្រាប់ចំណាយ'
  },
  {
    kmTitle: 'ធ្វើឱ្យមាសកើនឡើង', enTitle: 'Make Thy Gold Multiply',
    kmSub: 'វិនិយោគប្រាក់សន្សំ', enSub: 'Invest your savings',
    kmDesc: 'យកប្រាក់សន្សំទៅវិនិយោគលើអាជីវកម្ម ឬទ្រព្យសកម្មដែលបង្កើនការប្រាក់ត្រឡប់មកវិញ។',
    enDesc: 'Invest your savings in businesses or assets that generate compound returns.',
  },
  {
    kmTitle: 'ការពារទ្រព្យសម្បត្តិ', enTitle: 'Guard Thy Treasures',
    kmDesc: 'ត្រូវប្រាកដថាប្រាក់ដើមមានសុវត្ថិភាព។ ចៀសវាងវិនិយោគលើអ្វីដែលអ្នកមិនយល់ច្បាស់។',
    enDesc: 'Ensure your principal is safe. Avoid things you don\'t understand.',
  },
  {
    kmTitle: 'ធ្វើឱ្យលំនៅដ្ឋានមានប្រាក់ចំណេញ', enTitle: 'Make Thy Dwelling Profitable',
    kmDesc: 'ការមានផ្ទះផ្ទាល់ជួយកាត់បន្ថយថ្លៃជួល និងផ្តល់សុវត្ថិភាពសម្រាប់គ្រួសារ។',
    enDesc: 'Own your home to reduce rent and secure your family.',
  },
  {
    kmTitle: 'ធានាចំណូលនាពេលអនាគត', enTitle: 'Insure a Future Income',
    kmDesc: 'រៀបចំផែនការហិរញ្ញវត្ថុសម្រាប់ចូលនិវត្តន៍ និងការពារគ្រួសារ។',
    enDesc: 'Plan for retirement and protect your family.',
  },
  {
    kmTitle: 'បង្កើនសមត្ថភាពរកប្រាក់', enTitle: 'Increase Thy Ability to Earn',
    kmDesc: 'វិនិយោគលើចំណេះដឹង និងជំនាញ ដើម្បីបង្កើនសមត្ថភាពរកប្រាក់។',
    enDesc: 'Invest in knowledge and skills to increase earning power.',
  },
]
</script>
