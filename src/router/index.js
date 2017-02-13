import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../components/authentication/Authentication.vue';
import Login from '../components/authentication/Login.vue';
import Register from '../components/authentication/Register.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Settings from '../components/settings/Settings.vue';
import SettingsModules from '../components/settings/modules/SettingsModules.vue';
import SettingsPrivileges from '../components/settings/privileges/SettingsPrivileges.vue';
import SettingsRoles from '../components/settings/roles/SettingsRoles.vue';
import SettingsUsers from '../components/settings/users/SettingsUsers.vue';
import NewsFeed from '../components/news-feed/NewsFeed.vue';
import NewsFeedNew from '../components/news-feed/new/NewsFeedNew.vue';
import NewsFeedHistory from '../components/news-feed/history/NewsFeedHistory.vue';

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
          redirect: 'settings/users',
          component: Settings,
          children: [{
            path: 'modules',
            component: SettingsModules,
            meta: { requiresAuth: true }
          },
          {
            path: 'privileges',
            component: SettingsPrivileges,
            meta: { requiresAuth: true }
          },
          {
            path: 'roles',
            component: SettingsRoles,
            meta: { requiresAuth: true }
          },
          {
            path: 'users',
            component: SettingsUsers,
            meta: { requiresAuth: true }
          },]
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
