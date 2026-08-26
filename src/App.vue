<template>
  <!-- DESKTOP SIDEBAR -->
  <aside class="desktop-sidebar fixed left-0 top-0 h-full w-56 border-r z-50 flex flex-col"
    :style="{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-main)', transition: 'background 0.3s, border-color 0.3s' }">
    <div class="p-5 border-b" :style="{ borderColor: 'var(--border-main)' }">
      <router-link to="/" class="flex items-center gap-2.5 cursor-pointer">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: 'var(--accent-light)' }">
          <span class="text-sm font-bold font-display" :style="{ color: 'var(--accent)' }">B</span>
        </div>
        <div>
          <p class="text-xs font-bold tracking-wide font-display" :style="{ color: 'var(--accent)' }">BABYLON</p>
          <p class="text-[10px] -mt-0.5" :style="{ color: 'var(--text-label)' }">TREASURY</p>
        </div>
      </router-link>
    </div>

    <nav class="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
      <router-link v-for="item in navItems" :key="item.page" :to="item.to"
        class="sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition"
        :class="{ active: $route.name === item.page }"
        :style="{ color: $route.name === item.page ? '' : 'var(--text-muted)' }">
        <span class="text-base w-5 text-center" v-html="item.icon"></span>
        <span>{{ t(item.km, item.en) }}</span>
      </router-link>
    </nav>

    <div class="p-3 border-t flex items-center gap-2" :style="{ borderColor: 'var(--border-main)' }">
      <button @click="toggleLang()"
        class="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition"
        :style="{ color: 'var(--text-label)' }">
        <span class="w-5 text-center">&#9873;</span>
        <span>{{ lang === 'km' ? 'EN' : 'KM' }}</span>
      </button>
      <button @click="toggleTheme()" class="theme-btn" title="Toggle theme">
        {{ theme === 'dark' ? '&#9790;' : '&#9789;' }}
      </button>
    </div>
  </aside>

  <!-- MOBILE BOTTOM TABS -->
  <nav class="mobile-tabs fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t z-50 justify-around py-1.5 px-1"
    :style="{ display: 'none', background: 'var(--bg-topbar)', borderColor: 'var(--border-main)', transition: 'background 0.3s' }">
    <router-link v-for="item in mobileNavItems" :key="item.page" :to="item.to"
      class="flex flex-col items-center gap-0.5 py-1 px-2 text-[10px]"
      :style="{ color: $route.name === item.page ? 'var(--accent)' : 'var(--text-label)' }">
      <span class="text-lg leading-none" v-html="item.icon"></span>
      <span>{{ t(item.km, item.en) }}</span>
    </router-link>
  </nav>

  <!-- MAIN CONTENT -->
  <div class="main-area md:ml-56 min-h-screen" :style="{ transition: 'background 0.3s' }">
    <!-- TOPBAR (mobile) -->
    <header class="md:hidden flex items-center justify-between px-4 py-3 border-b"
      :style="{ background: 'var(--bg-topbar)', borderColor: 'var(--border-main)', transition: 'background 0.3s' }">
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-md flex items-center justify-center" :style="{ background: 'var(--accent-light)' }">
          <span class="text-xs font-bold font-display" :style="{ color: 'var(--accent)' }">B</span>
        </div>
        <span class="text-sm font-bold font-display tracking-wide" :style="{ color: 'var(--accent)' }">BABYLON</span>
      </router-link>
      <div class="flex items-center gap-2">
        <button @click="toggleLang()" class="text-xs px-2.5 py-1 rounded-md"
          :style="{ color: 'var(--text-label)', background: 'var(--bg-card)', border: '1px solid var(--border-main)' }">
          {{ lang === 'km' ? 'EN' : 'KM' }}
        </button>
        <button @click="toggleTheme()" class="theme-btn"
          :style="{ width: '28px', height: '28px', fontSize: '12px' }" title="Toggle theme">
          {{ theme === 'dark' ? '&#9790;' : '&#9789;' }}
        </button>
      </div>
    </header>

    <main class="p-4 md:p-8 max-w-5xl">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- FOOTER -->
    <footer class="border-t py-5 text-center text-[11px]"
      :style="{ borderColor: 'var(--border-main)', color: 'var(--text-label)' }">
      <p>George S. Clason &middot; Built by Lyhuor</p>
    </footer>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'
import { useLanguage } from './composables/useLanguage'

const { theme, toggleTheme } = useTheme()
const { lang, t, toggleLang } = useLanguage()

const navItems = [
  { page: 'dashboard', to: '/', icon: '&#9632;', km: 'ទំព័រដើម', en: 'Dashboard' },
  { page: 'cures', to: '/cures', icon: '&#9733;', km: 'វិធីព្យាបាល', en: '7 Cures' },
  { page: 'laws', to: '/laws', icon: '&#9830;', km: 'ច្បាប់មាស', en: 'Laws of Gold' },
  { page: 'calc', to: '/calc', icon: '&#8721;', km: 'គណនាថវិកា', en: 'Budget Calc' },
  { page: 'grow', to: '/grow', icon: '&#8593;', km: 'ការលូតលាស់', en: 'Growth' },
  { page: 'track', to: '/track', icon: '&#9776;', km: 'តាមដានចំណាយ', en: 'Expenses' },
]

const mobileNavItems = [
  { page: 'dashboard', to: '/', icon: '&#9632;', km: 'ដើម', en: 'Home' },
  { page: 'cures', to: '/cures', icon: '&#9733;', km: 'ព្យាបាល', en: 'Cures' },
  { page: 'calc', to: '/calc', icon: '&#8721;', km: 'គណនា', en: 'Calc' },
  { page: 'grow', to: '/grow', icon: '&#8593;', km: 'លូត', en: 'Grow' },
  { page: 'track', to: '/track', icon: '&#9776;', km: 'ចំណាយ', en: 'Spend' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
