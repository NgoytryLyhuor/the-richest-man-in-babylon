import { ref, watchEffect } from 'vue'

const theme = ref(localStorage.getItem('babylon_theme') || 'dark')

export function useTheme() {
  const apply = () => {
    if (theme.value === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  watchEffect(apply)
  apply()

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('babylon_theme', theme.value)
  }

  const getChartColors = () => {
    const isDark = theme.value === 'dark'
    return {
      legend: isDark ? '#64748b' : '#475569',
      grid: isDark ? 'rgba(30,58,95,0.4)' : 'rgba(203,213,225,0.5)',
      gold: isDark ? '#3b82f6' : '#2563eb',
      goldFill: isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.06)',
      stone: isDark ? '#334155' : '#94a3b8',
      stoneFill: isDark ? 'rgba(51,65,85,0.1)' : 'rgba(148,163,184,0.06)',
      border: isDark ? '#1a2744' : '#e2e8f0',
    }
  }

  return { theme, toggleTheme, getChartColors }
}
