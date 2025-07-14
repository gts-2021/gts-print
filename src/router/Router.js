import DocumentationPage from "@/DocumentationPage.vue"
import ExamplePage from "@/ExamplePage.vue"
import { createRouter, createWebHistory } from 'vue-router'
 

const routes = [
  {
    path: '/',
    name: 'Documentation',
    component: DocumentationPage,
  },
  {
    path: '/examples',
    name: 'Example',
    component: ExamplePage,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
