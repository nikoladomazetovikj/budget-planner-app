import { createRouter, createWebHistory } from 'vue-router'

// Import the components for the login and register pages
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Dashboard from "@/components/Dashboard.vue";
import Incomes from "@/components/Incomes.vue";
import Expenses from "@/components/Expenses.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login' // Redirect '/' to '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/income',
      name: 'income',
      component: Incomes
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses
    }
  ]
})

export default router
