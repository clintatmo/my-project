import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../components/authentication/Authentication.vue';
import Login from '../components/authentication/Login.vue';
import Register from '../components/authentication/Register.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Settings from '../components/settings/Settings.vue';
import SettingsAdmin from '../components/settings/admin/SettingsAdmin.vue';
import SettingsUser from '../components/settings/user/SettingsUser.vue';
import NewsFeed from '../components/news_feed/NewsFeed.vue';
import NewsFeedNew from '../components/news_feed/new/NewsFeedNew.vue';
import NewsFeedHistory from '../components/news_feed/history/NewsFeedHistory.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      redirect: 'news-feed/new',
      children: [
        {
          path: 'settings',
          redirect: 'settings/user',
          component: Settings,
          children: [{
            path: 'admin',
            component: SettingsAdmin,
            meta: { requiresAuth: true }
          },
            {
              path: 'user',
              component: SettingsUser,
              meta: { requiresAuth: true }
            }]
        },
        {
          path: 'news-feed',
          redirect: 'news-feed/new',
          component: NewsFeed,
          children: [{
            path: 'new',
            component: NewsFeedNew,
            meta: { requiresAuth: true }
          },
            {
              path: 'history',
              component: NewsFeedHistory,
              meta: { requiresAuth: true }
            }]
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
  ],
  linkActiveClass: 'active'
})
