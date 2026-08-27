<template>
  <div class="fade-up">
    <div class="mb-8">
      <p class="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" :style="{ color: 'var(--accent)' }">BOOK NOTES</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('សេចក្តីសង្ខេបសៀវភៅ', 'Complete Book Notes') }}
      </h2>
      <p class="text-sm mt-2" :style="{ color: 'var(--text-muted)' }">
        {{ t('រាល់គន្លឹះសំខាន់ៗពីសៀវភៅ The Richest Man in Babylon របស់ George S. Clason', 'Every key insight from George S. Clason\'s The Richest Man in Babylon') }}
      </p>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="border rounded-xl p-5 mb-6" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
      <p class="text-xs uppercase tracking-widest font-medium mb-4" :style="{ color: 'var(--text-label)' }">
        {{ t('មាតិកា', 'TABLE OF CONTENTS') }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <button v-for="(sec, i) in sections" :key="i" @click="scrollTo(i)"
          class="text-left text-sm py-1.5 px-2 rounded transition cursor-pointer hover:opacity-80"
          :style="{ color: 'var(--accent)' }">
          {{ i + 1 }}. {{ t(sec.kmTitle, sec.enTitle) }}
        </button>
      </div>
    </div>

    <!-- SECTIONS -->
    <div v-for="(sec, i) in sections" :key="i" :ref="el => sectionRefs[i] = el" class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)' }">{{ i + 1 }}</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t(sec.kmTitle, sec.enTitle) }}
        </h3>
      </div>

      <!-- Main idea -->
      <div class="border-l-4 pl-4 mb-4" :style="{ borderColor: 'var(--accent)' }">
        <p class="text-sm leading-relaxed italic" :style="{ color: 'var(--text-body)' }">
          "{{ t(sec.kmQuote, sec.enQuote) }}"
        </p>
      </div>

      <!-- Content -->
      <div class="border rounded-xl p-5 mb-4" :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
        <p class="text-sm leading-relaxed mb-4" :style="{ color: 'var(--text-body)' }">
          {{ t(sec.kmBody, sec.enBody) }}
        </p>

        <!-- Sub points -->
        <div v-if="sec.points" class="space-y-3">
          <div v-for="(pt, j) in sec.points" :key="j" class="flex items-start gap-2">
            <span class="mt-0.5 shrink-0" :style="{ color: 'var(--accent)' }">&#10003;</span>
            <p class="text-sm" :style="{ color: 'var(--text-muted)' }">{{ t(pt.km, pt.en) }}</p>
          </div>
        </div>

        <!-- Example -->
        <div v-if="sec.example" class="mt-4 border rounded-lg px-4 py-3" :style="{ background: 'var(--bg-input)', borderColor: 'var(--border-main)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--accent)' }">
            {{ t('ឧទាហរណ៍ពិត', 'REAL EXAMPLE') }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ t(sec.example.km, sec.example.en) }}</p>
        </div>

        <!-- Warning -->
        <div v-if="sec.warning" class="mt-4 border-2 border-dashed rounded-lg px-4 py-3" :style="{ borderColor: 'var(--red)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--red)' }">
            {{ t('កំហុសដែលគេធ្វើញឹកញាប់', 'COMMON MISTAKE') }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ t(sec.warning.km, sec.warning.en) }}</p>
        </div>
      </div>
    </div>

    <!-- KEY CHARACTERS -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)' }">&#9733;</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t('តួអង្គសំខាន់ៗ', 'Key Characters') }}
        </h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="(ch, i) in characters" :key="i" class="border rounded-xl p-4"
          :style="{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }">
          <p class="font-bold text-sm mb-1" :style="{ color: ch.color }">{{ t(ch.kmName, ch.enName) }}</p>
          <p class="text-xs" :style="{ color: 'var(--text-muted)' }">{{ t(ch.kmRole, ch.enRole) }}</p>
        </div>
      </div>
    </div>

    <!-- QUOTES SECTION -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)' }">"</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t('ពាក្យសម្តីគន្លឹះ', 'Key Quotes') }}
        </h3>
      </div>
      <div class="space-y-3">
        <div v-for="(q, i) in quotes" :key="i" class="border-l-4 pl-4 py-2" :style="{ borderColor: 'var(--accent)' }">
          <p class="text-sm italic leading-relaxed" :style="{ color: 'var(--text-body)' }">"{{ t(q.km, q.en) }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const sectionRefs = ref([])

const scrollTo = (i) => {
  sectionRefs.value[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const sections = [
  {
    kmTitle: 'អំពីសៀវភៅនេះ',
    enTitle: 'About This Book',
    kmQuote: 'សៀវភៅនេះនិយាយអំពីមេរៀនហិរញ្ញវត្ថុដែលមនុស្សក្នុងទីក្រុងបាប៊ីឡូនបានរៀនសូត្រកាលពី ៥,០០០ ឆ្នាំមុន។',
    enQuote: 'This book teaches financial lessons from the ancient city of Babylon, 5,000 years ago.',
    kmBody: 'George S. Clason បានសរសេរសៀវភៅនេះក្នុងឆ្នាំ ១៩២៦ ដោយប្រើរឿងនិទានរបស់ទីក្រុងបាប៊ីឡូនដើម្បីបង្រៀនមេរៀនហិរញ្ញវត្ថុ។ សៀវភៅនេះបានក្លាយជាសៀវភៅពេញនិយមបំផុតអំពីការគ្រប់គ្រងលុយកាក់ក្នុងប្រវត្តិសាស្រ្ត។ វាបង្រៀនថា មេរៀនហិរញ្ញវត្ថុមិនប្តូរទេ — មនុស្សតែងតែប្រឈមបញ្ហាដូចគ្នាដែរ។',
    enBody: 'George S. Clason wrote this book in 1926 using parables from ancient Babylon to teach financial lessons. It became one of the most popular personal finance books in history. The message: financial principles don\'t change — people face the same money challenges today as they did 5,000 years ago.',
    points: [
      { km: 'សៀវភៅប្រើរឿងនិទានដើម្បីបង្រៀន — មិនមែនជាសៀវភៅគណនេយ្យថ្សច់ៗទេ', en: 'The book uses parables to teach — it\'s not a dry accounting textbook' },
      { km: 'មេរៀនទាំងអស់អាចអនុវត្តបានសម្រាប់ជីវិតប្រចាំថ្ងៃ', en: 'All lessons can be applied to everyday life' },
      { km: 'សរសេរក្នុងភាសាសាមញ្ញ — ងាយស្រួលអានសម្រាប់ទាំងអស់គ្នា', en: 'Written in simple language — easy for anyone to read' },
    ],
  },
  {
    kmTitle: 'រឿង Arkad — មនុស្សដែលមានបំផុតក្នុងបាប៊ីឡូន',
    enTitle: 'The Story of Arkad — Richest Man in Babylon',
    kmQuote: 'Arkad ក្លាយជាមនុស្សដែលមានបំផុតក្នុងបាប៊ីឡូន ដោយសារគាត់រៀនសូត្រពីកំហុសរបស់ខ្លួនឯង។',
    enQuote: 'Arkad became the richest man in Babylon by learning from his own mistakes.',
    kmBody: 'Arkad ជាកូនអ្នកជំនួញដែលក្រីក្រ។ គាត់បានឈ្នះប្រាក់ច្រើនក្នុងឆ្នាំដំបូង ប៉ុន្តែបានចំណាយអស់ទាំងអស់។ គាត់បានជួប Algamish អ្នកមានបំផុតក្នុងទីក្រុង ដែលបង្រៀនគាត់ពី "ច្បាប់នៃមាស"។ Arkad បានអនុវត្តមេរៀនទាំងនេះ ហើយក្លាយជាមនុស្សមានបំផុតក្នុងទីក្រុង។',
    enBody: 'Arkad was a poor merchant\'s son. He won big in his first year but spent everything. He met Algamish, the richest man in Babylon, who taught him the "Laws of Gold." Arkad applied these lessons and became the wealthiest man in the city.',
    points: [
      { km: 'Algamish បង្រៀនថា "ចំណូលដែលអ្នកទទួលបាន ១០% ត្រូវដាក់ទុកសន្សំ — មិនអាចប៉ះបានទេ"', en: 'Algamish taught: "Pay yourself 10% of everything you earn — it is untouchable"' },
      { km: 'Arkad រៀនថា "ការងារដែលអ្នកធ្វើបានល្អ នាំមកនូវប្រាក់ចំណូលបន្ថែម"', en: 'Arkad learned: "Work well done brings extra income"' },
      { km: 'គាត់រៀនថា "លុយដែលអ្នកសន្សំនឹងធ្វើការសម្រាប់អ្នក — compound interest"', en: 'He learned: "Your savings will work for you — compound interest"' },
      { km: 'គាត់បានបង្រៀនមនុស្ស ៥០០ នាក់ឱ្យសន្សំ ១០% នៃចំណូល — ហើយពួកគេក៏មានប្រាក់ដែរ', en: 'He taught 500 people to save 10% — and they became wealthy too' },
    ],
    example: {
      km: 'Arkad មានចំណូល $៥០/ខែ។ គាត់ដាក់ $៥ (១០%) ទៅសន្សំ។ ក្នុងរយៈពេល ១ ឆ្នាំ គាត់មាន $60 សន្សំ — ហើយ $60 នោះបានកើនឡើងដោយសារការប្រាក់។',
      en: 'Arkad earned $50/mo. He saved $5 (10%). In 1 year he had $60 saved — and that $60 grew from interest.'
    },
  },
  {
    kmTitle: 'វិធីព្យាបាលផ្លូវចិត្ត ៧យ៉ាង',
    enTitle: 'The 7 Cures for a Lean Purse',
    kmQuote: 'ដើម្បីមានប្រាក់ អ្នកត្រូវព្យាបាល "ផ្លូវរបស់អ្នក" ដែលរីងស្ងួត។',
    enQuote: 'To fill your purse, you must first cure its emptiness.',
    kmBody: 'វិធីព្យាបាលទាំង ៧ គឺជាមេរៀនស្នូលនៃសៀវភៅ។ វាបង្រៀនថា ដើម្បីមានប្រាក់ អ្នកត្រូវធ្វើអ្វីៗជាក់លាក់ជារៀងរាល់ខែ។ វិធីនីមួយៗសាមញ្ញ ប៉ុន្តែមានឥទ្ធិពលខ្លាំង។',
    enBody: 'The 7 cures are the core lessons of the book. They teach that to become wealthy, you must take specific actions every month. Each cure is simple but powerful.',
    points: [
      { km: '១. ចាប់ផ្តើមបំប៉ោងផ្លូវរបស់អ្នក — សន្សំ ១០% ភ្លាមៗនៃចំណូល', en: '1. Start thy purse to fattening — save 10% of income immediately' },
      { km: '២. គ្រប់គ្រងការចំណាយ — កាត់បន្ថយអ្វីដែលមិនចាំបាច់', en: '2. Control thy expenditures — cut unnecessary spending' },
      { km: '៣. ធ្វើឱ្យមាសកើនឡើង — វិនិយោគប្រាក់សន្សំ', en: '3. Make thy gold multiply — invest your savings' },
      { km: '៤. ការពារទ្រព្យសម្បត្តិ — កុំវិនិយោគលើអ្វីដែលមិនយល់', en: '4. Guard thy treasures — don\'t invest in what you don\'t understand' },
      { km: '៥. ធ្វើឱ្យលំនៅដ្ឋានមានប្រាក់ចំណេញ — កាត់បន្ថយថ្លៃជួល', en: '5. Make thy dwelling profitable — reduce rent costs' },
      { km: '៦. ធានាចំណូលនាពេលអនាគត — រៀបចំផែនការចូលនិវត្តន៍', en: '6. Insure a future income — plan for retirement' },
      { km: '៧. បង្កើនសមត្ថភាពរកប្រាក់ — វិនិយោគលើចំណេះដឹង', en: '7. Increase thy ability to earn — invest in knowledge' },
    ],
  },
  {
    kmTitle: 'ច្បាប់នៃមាស ៥យ៉ាង',
    enTitle: 'The 5 Laws of Gold',
    kmQuote: 'ច្បាប់នៃមាសគឺជាច្បាប់ដែលមិនប្តូរ — អ្នកដែលអនុវត្តនឹងមានប្រាក់។',
    enQuote: 'The Laws of Gold are unchanging — those who follow them will prosper.',
    kmBody: 'ច្បាប់ទាំង ៥ គឺជាគោលការណ៍ស្នូលដែល Arkad បានរៀនសូត្រពី Algamish។ វាបង្រៀនថា មាស (លុយ) មានអត្ថប្រយោជន៍សម្រាប់អ្នកដែលមានប្រាជ្ញា ប៉ុន្តែរត់ចេញពីអ្នកដែលល្ពៅ។',
    enBody: 'The 5 Laws are the core principles Arkad learned from Algamish. Gold (money) rewards the wise but flees from fools.',
    points: [
      { km: '១. មាសមករកអ្នកសន្សំ — អ្នកដែលសន្សំ ១០% នឹងឃើញមាសកើនឡើង', en: '1. Gold comes to the saver — save 10% and watch gold grow' },
      { km: '២. មាសធ្វើការសម្រាប់ម្ចាស់ប្រាជ្ញា — វិនិយោគដើម្បីបង្កើនផលចំណេញ', en: '2. Gold works for the wise — invest to generate returns' },
      { km: '៣. មាសស្ថិតនៅជាមួយប្រាជ្ញា — ទុកលុយជាមួយអ្នកដែលទុកចិត្ត', en: '3. Gold clings to wisdom — keep money with trustworthy people' },
      { km: '៤. មាសរត់ចេញពីល្ពៅ — កុំវិនិយោគដោយមិនគិត', en: '4. Gold flees from fools — don\'t invest without thinking' },
      { km: '៥. មាសភ័យខ្លាចអ្នកបង្ខំ — កុំព្យាយាមរកលុយលឿនពេក', en: '5. Gold fears force — don\'t try to get rich too fast' },
    ],
    warning: {
      km: 'កំហុសធំបំផុត៖ គិតថាលុយនឹងមកដោយខ្លួនឯង — លុយមិនមកដោយស្វ័យប្រវត្តិទេ។ អ្នកត្រូវសន្សំ វិនិយោគ និងការពារវា។',
      en: 'Biggest mistake: thinking money will come on its own — it won\'t. You must save, invest, and protect it.'
    },
  },
  {
    kmTitle: 'រឿង Banzar — ការពារទ្រព្យសម្បត្តិ',
    enTitle: 'The Story of Banzar — Guarding Wealth',
    kmQuote: 'Banzar ការពារទ្រព្យសម្បត្តិរបស់គាត់ — គាត់មិនដែលវិនិយោគលើអ្វីដែលមិនយល់។',
    enQuote: 'Banzar guarded his wealth — he never invested in what he didn\'t understand.',
    kmBody: 'Banzar ជាអ្នកជំនួញដែលជោគជ័យក្នុងការការពារទ្រព្យសម្បត្តិ។ គាត់បដិសេធវិនិយោគលើអាជីវកម្មដែលគាត់មិនយល់ច្បាស់ ទោះបីជាមនុស្សផ្សេងៗព្យាយាមលក់គាត់ក៏ដោយ។ គាត់បង្រៀនថា "ការពារទ្រព្យសម្បត្តិគឺសំខាន់ដូចជាការរកប្រាក់ដែរ។"',
    enBody: 'Banzar was a businessman who excelled at protecting wealth. He refused to invest in businesses he didn\'t understand, even when others tried to sell him. He taught: "Guarding wealth is as important as earning it."',
    points: [
      { km: 'កុំវិនិយោគលើអ្វីដែលអ្នកមិនយល់ — ទោះបីជាគេនិយាយថាមានប្រាក់ច្រើនក៏ដោយ', en: 'Don\'t invest in what you don\'t understand — no matter how profitable it sounds' },
      { km: 'សួរគេ៧សំណួរមុននឹងវិនិយោគ — ប្រសិនបើឆ្លើយមិនបាន កុំវិនិយោគ', en: 'Ask 7 questions before investing — if they can\'t answer, don\'t invest' },
      { km: 'ទ្រព្យសម្បត្តិដែលមានសុវត្ថិភាពគឺប្រសើរជាងទ្រព្យដែលមានហានិភ័យ', en: 'Safe wealth is better than risky wealth' },
    ],
  },
  {
    kmTitle: 'រឿង Dabasir — ការសងបំណុល',
    enTitle: 'The Story of Dabasir — Getting Out of Debt',
    kmQuote: 'Dabasir បានសងបំណុលទាំងអស់ដោយប្រើរូបមន្ត ១០/២០/៧០។',
    enQuote: 'Dabasir paid off all debts using the 10/20/70 formula.',
    kmBody: 'Dabasir ជាអ្នកជំនួញដែលមានបំណុលច្រើន។ គាត់បានអនុវត្តរូបមន្ត ១០/២០/៧០៖ ១០% សន្សំ ២០% សងបំណុល ៧០% ចំណាយ។ គាត់បានសងបំណុលទាំងអស់ក្នុងរយៈពេល ២ ឆ្នាំ។ នេះគឺជារឿងពិតដែលបង្ហាញថា រូបមន្តសាមញ្ញអាចផ្លាស់ប្តូរជីវិត។',
    enBody: 'Dabasir was a businessman with heavy debts. He applied the 10/20/70 formula: 10% save, 20% pay debt, 70% expenses. He paid off all debts in 2 years. This true story shows how a simple formula can change your life.',
    points: [
      { km: '១០% សន្សំ — ទោះបីជាមានបំណុលក៏ដោយ ត្រូវសន្សំ ១០% ដាច់ខាត', en: '10% savings — even with debt, save 10% no matter what' },
      { km: '២០% សងបំណុល — ដាក់ ២០% ទៅសងបំណុលរហូតដល់អស់', en: '20% debt payment — put 20% toward debt until it\'s gone' },
      { km: '៧០% ចំណាយ — រស់នៅក្នុង ៧០% នៃចំណូល', en: '70% expenses — live on 70% of your income' },
      { km: 'កាត់បន្ថយការចំណាយ — ធ្វើឱ្យ ៧០% និង ២០% កើនឡើង', en: 'Cut expenses — increase the 10% and 20%' },
    ],
    example: {
      km: 'Dabasir មានចំណូល $៥០០/ខែ។ គាត់ដាក់ $៥០ (១០%) សន្សំ $១០០ (២០%) សងបំណុល $៣៥០ (៧០%) ចំណាយ។ ក្នុងរយៈពេល ២ ឆ្នាំ គាត់សងបំណុលអស់។',
      en: 'Dabasir earned $500/mo. He saved $50 (10%), paid $100 (20%) debt, spent $350 (70%). In 2 years, all debts were paid.'
    },
  },
  {
    kmTitle: 'រឿង Mathon — ទម្លាប់សន្សំ',
    enTitle: 'The Story of Mathon — The Habit of Saving',
    kmQuote: 'Mathon បង្រៀនថា "ទម្លាប់សន្សំគឺជាមូលដ្ឋាននៃភាពមានប្រាក់។"',
    enQuote: 'Mathon taught: "The habit of saving is the foundation of wealth."',
    kmBody: 'Mathon ជាអ្នកជំនួញធនាគារដែលបង្រៀនថា ទម្លាប់សន្សំគឺសំខាន់ជាងចំណូល។ គាត់និយាយថា "មនុស្សដែលមានចំណូលច្រើនប៉ុន្តែមិនសន្សំ គឺដូចជាអ្នកដែលមានទឹកដមច្រើនប៉ុន្តែមិនដាក់ទៅក្នុងអាងស្តុកទឹក — វានឹងអស់។"',
    enBody: 'Mathon was a wealthy banker who taught that saving habits matter more than income. He said: "People who earn a lot but don\'t save are like those with a full well but no reservoir — the water runs dry."',
    points: [
      { km: 'ទម្លាប់សន្សំគឺសំខាន់ជាងចំណូល — មនុស្សដែលមានចំណូលតិចប៉ុន្តែសន្សំ ១០% នឹងមានប្រាក់ជាងអ្នកដែលមានចំណូលច្រើនប៉ុន្តែមិនសន្សំ', en: 'Saving habit is more important than income — low earner who saves 10% is wealthier than high earner who saves nothing' },
      { km: 'សន្សំមុនពេលចំណាយ — "ដាក់ ១០% ទៅសន្សំភ្លាមៗ រួចចំណាយអ្វីដែលនៅសល់"', en: 'Save before spending — "pay yourself 10% first, then spend what\'s left"' },
      { km: 'កុំខកថ្ងៃសន្សំ — ទម្លាប់ត្រូវបន្តរាល់ខែ', en: 'Never miss a savings day — the habit must continue monthly' },
    ],
  },
  {
    kmTitle: 'រឿង Khafra — ការវិនិយោគដ៏ប្រាជ្ញា',
    enTitle: 'The Story of Khafra — Wise Investing',
    kmQuote: 'Khafra វិនិយោគលើអាជីវកម្មដែលគាត់យល់ — ហើយទទួលបានផលចំណេញច្រើន។',
    enQuote: 'Khafra invested in businesses he understood — and earned great returns.',
    kmBody: 'Khafra បង្រៀនថា ការវិនិយោគដ៏ប្រាជ្ញាគឺវិនិយោគលើអ្វីដែលអ្នកយល់ច្បាស់។ គាត់មិនដែលវិនិយោគលើអាជីវកម្មដែលគាត់មិនយល់ទេ ទោះបីជាគេនិយាយថាមានប្រាក់ច្រើនក៏ដោយ។ គាត់បង្រៀនថា "មាសដែលអ្នកវិនិយោគលើអ្វីដែលអ្នកមិនយល់ នឹងរត់ចេញ។"',
    enBody: 'Khafra taught that wise investing means investing in what you truly understand. He never invested in businesses he didn\'t know, no matter how profitable they sounded. He taught: "Gold invested in what you don\'t understand will flee."',
    points: [
      { km: 'វិនិយោគលើអ្វីដែលអ្នកយល់ — ប្រសិនបើអ្នកមិនយល់ កុំវិនិយោគ', en: 'Invest in what you understand — if you don\'t understand it, don\'t invest' },
      { km: 'សួរអ្នកជំនាញ — សួរអ្នកដែលមានបទពិសោធន៍មុននឹងវិនិយោគ', en: 'Ask experts — consult experienced people before investing' },
      { km: 'កុំព្យាយាមរកប្រាក់លឿនពេក — វិនិយោគត្រូវការពេលវេលា', en: 'Don\'t try to get rich quick — investing takes time' },
    ],
  },
  {
    kmTitle: 'រឿង Clonus — ការបង្កើនសមត្ថភាពរកប្រាក់',
    enTitle: 'The Story of Clonus — Increasing Earning Ability',
    kmQuote: 'Clonus វិនិយោគលើចំណេះដឹង — ហើយសមត្ថភាពរកប្រាក់របស់គាត់កើនឡើង ៣ ដង។',
    enQuote: 'Clonus invested in knowledge — and his earning ability tripled.',
    kmBody: 'Clonus ជាអ្នកដែលជំរុញខ្លួនឯងឱ្យរៀនសូត្រជានិច្ច។ គាត់រៀនពីអ្នកជំនាញ អានសៀវភៅ និងចូលរួមវគ្គបណ្តុះបណ្តាល។ ដោយសារការវិនិយោគលើចំណេះដឹង សមត្ថភាពរកប្រាក់របស់គាត់កើនឡើង ៣ ដងក្នុងរយៈពេល ២ ឆ្នាំ។',
    enBody: 'Clonus was a self-improver who always learned from experts, read books, and attended training. By investing in knowledge, his earning ability tripled in 2 years.',
    points: [
      { km: 'វិនិយោគលើចំណេះដឹង — សៀវភៅ វគ្គបណ្តុះបណ្តាល និងបទពិសោធន៍', en: 'Invest in knowledge — books, training, and experience' },
      { km: 'រៀនពីអ្នកជំនាញ — ស្វែងរកអ្នកដែលជោគជ័យរួចហើយ', en: 'Learn from experts — find those who have already succeeded' },
      { km: 'បង្កើនជំនាញ — ជំនាញកាន់តែច្រើន = ចំណូលកាន់តែច្រើន', en: 'Build skills — more skills = more income' },
    ],
  },
  {
    kmTitle: 'មេរៀនសំខាន់ៗពីសៀវភៅ',
    enTitle: 'Key Lessons from the Book',
    kmQuote: 'សៀវភៅនេះបង្រៀនថា មេរៀនហិរញ្ញវត្ថុមិនប្តូរ — មនុស្សតែងតែប្រឈមបញ្ហាដូចគ្នា។',
    enQuote: 'The book teaches that financial principles don\'t change — people face the same challenges.',
    kmBody: 'សៀវភៅនេះបង្រៀនមេរៀនជាច្រើនដែលអាចអនុវត្តបានសម្រាប់ជីវិតប្រចាំថ្ងៃ។ វាបង្រៀនថា ភាពមានប្រាក់មិនមែនដោយសារចំណូលច្រើនទេ — វាដោយសារទម្លាប់ល្អ។',
    enBody: 'The book teaches many practical lessons. It shows that wealth doesn\'t come from high income — it comes from good habits.',
    points: [
      { km: 'សន្សំ ១០% នៃចំណូល — នេះគឺជាច្បាប់ទី ១ ដែលមិនអាចបំបែកបាន', en: 'Save 10% of income — this is the #1 unbreakable rule' },
      { km: 'គ្រប់គ្រងការចំណាយ — កាត់បន្ថយអ្វីដែលមិនចាំបាច់', en: 'Control spending — cut unnecessary expenses' },
      { km: 'វិនិយោគប្រាក់សន្សំ — ធ្វើឱ្យមាសកើនឡើង', en: 'Invest savings — make your gold multiply' },
      { km: 'ការពារទ្រព្យ — កុំវិនិយោគលើអ្វីដែលមិនយល់', en: 'Guard wealth — don\'t invest in what you don\'t understand' },
      { km: 'បង្កើនសមត្ថភាពរកប្រាក់ — វិនិយោគលើចំណេះដឹង', en: 'Increase earning ability — invest in knowledge' },
      { km: 'ទម្លាប់សន្សំគឺសំខាន់ជាងចំណូល', en: 'Saving habit is more important than income' },
      { km: 'រូបមន្ត ១០/២០/៧០ — សន្សំ ១០% សងបំណុល ២០% ចំណាយ ៧០%', en: 'The 10/20/70 formula — save 10%, pay debt 20%, spend 70%' },
    ],
  },
]

const characters = [
  { kmName: 'Arkad', enName: 'Arkad', kmRole: 'មនុស្សដែលមានបំផុតក្នុងបាប៊ីឡូន — ជាអ្នកដែលរៀនសូត្រពីកំហុសរបស់ខ្លួនឯង ហើយបង្រៀនមនុស្ស ៥០០ នាក់ឱ្យមានប្រាក់។', enRole: 'Richest man in Babylon — learned from his mistakes and taught 500 people to build wealth.', color: 'var(--accent)' },
  { kmName: 'Algamish', enName: 'Algamish', kmRole: 'អ្នកមានបំផុតក្នុងទីក្រុង ដែលបង្រៀន Arkad ពីច្បាប់នៃមាស។', enRole: 'The richest man in Babylon who taught Arkad the Laws of Gold.', color: '#f59e0b' },
  { kmName: 'Dabasir', enName: 'Dabasir', kmRole: 'អ្នកជំនួញដែលមានបំណុលច្រើន — បានសងបំណុលអស់ដោយប្រើរូបមន្ត ១០/២០/៧០។', enRole: 'A businessman who was heavily in debt — paid off everything using 10/20/70.', color: '#10b981' },
  { kmName: 'Banzar', enName: 'Banzar', kmRole: 'អ្នកជំនួញដែលជំនាញក្នុងការការពារទ្រព្យសម្បត្តិ។', enRole: 'A businessman who excelled at protecting wealth.', color: '#3b82f6' },
  { kmName: 'Mathon', enName: 'Mathon', kmRole: 'អ្នកជំនួញធនាគារដែលបង្រៀនទម្លាប់សន្សំ។', enRole: 'A banker who taught the habit of saving.', color: '#8b5cf6' },
  { kmName: 'Khafra', enName: 'Khafra', kmRole: 'អ្នកវិនិយោគដែលបង្រៀនការវិនិយោគដ៏ប្រាជ្ញា។', enRole: 'An investor who taught wise investing.', color: '#f59e0b' },
  { kmName: 'Clonus', enName: 'Clonus', kmRole: 'អ្នកដែលវិនិយោគលើចំណេះដឹង — សមត្ថភាពរកប្រាក់កើនឡើង ៣ ដង។', enRole: 'Invested in knowledge — earning ability tripled.', color: '#10b981' },
]

const quotes = [
  { km: 'ចំណូលដែលអ្នកទទួលបាន ១០% ត្រូវដាក់ទុកសន្សំ — វាជាលុយដែលមិនអាចប៉ះបានទេ។', en: 'Pay yourself first ten percent of all you earn. It is not to be touched.' },
  { km: 'ទម្លាប់សន្សំគឺជាមូលដ្ឋាននៃភាពមានប្រាក់។', en: 'The habit of saving is the foundation of wealth.' },
  { km: 'មាសដែលអ្នកវិនិយោគលើអ្វីដែលអ្នកមិនយល់ នឹងរត់ចេញ។', en: 'Gold invested in what you don\'t understand will flee.' },
  { km: 'ការពារទ្រព្យសម្បត្តិគឺសំខាន់ដូចជាការរកប្រាក់ដែរ។', en: 'Guarding wealth is as important as earning it.' },
  { km: 'មនុស្សដែលមានចំណូលច្រើនប៉ុន្តែមិនសន្សំ គឺដូចជាអ្នកដែលមានទឹកដមច្រើនប៉ុន្តែមិនដាក់ទៅក្នុងអាងស្តុកទឹក។', en: 'People who earn a lot but don\'t save are like those with a full well but no reservoir.' },
  { km: 'ភាពមានប្រាក់មិនមែនដោយសារចំណូលច្រើនទេ — វាដោយសារទម្លាប់ល្អ។', en: 'Wealth doesn\'t come from high income — it comes from good habits.' },
  { km: 'លុយនឹងមកដោយស្វ័យប្រវត្តិសម្រាប់អ្នកដែលសន្សំ — ប៉ុន្តែនឹងមិនមកសម្រាប់អ្នកដែលចំណាយអស់។', en: 'Money will come naturally to those who save — but never to those who spend everything.' },
]
</script>
