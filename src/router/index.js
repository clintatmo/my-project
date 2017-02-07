import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../components/authentication/Authentication.vue';
import Login from '../components/authentication/Login.vue';
import Register from '../components/authentication/Register.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Settings from '../components/dashboard/Settings.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      redirect: '/auth/login',
      children: [
        {
          path: 'settings',
          component: Settings
        }
      ]
    },

    {
      path: "/auth",
      component: Auth,
      redirect: '/auth/login',
      children: [
        {
          path: "login",
          component: Login,
          meta: { requiresGuest: true }
        },
        {
          path: "register",
          component: Register,
          meta: { requiresGuest: true }
        }
      ]
    }
  ]
})
