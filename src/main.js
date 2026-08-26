import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('./views/DashboardView.vue') },
  { path: '/cures', name: 'cures', component: () => import('./views/CuresView.vue') },
  { path: '/laws', name: 'laws', component: () => import('./views/LawsView.vue') },
  { path: '/calc', name: 'calc', component: () => import('./views/CalcView.vue') },
  { path: '/grow', name: 'grow', component: () => import('./views/GrowView.vue') },
  { path: '/track', name: 'track', component: () => import('./views/TrackView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
