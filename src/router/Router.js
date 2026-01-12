import DocumentationPage from "@/DocumentationPage.vue"

import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Documentation',
    component: DocumentationPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
