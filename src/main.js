// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import Auth from './plugins/AuthPlugin';
import Store from './store/VuexStore';
import Element from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en'


Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(Auth);
Vue.use(VueI18n);
Vue.use(Element);
Vue.config.lang = 'en';
Vue.locale('en', enLocale);

//configure alertify defaults
alertify.defaults.notifier.position = 'top-right';


var base64 = require('base-64');

Vue.http.headers.common['Authorization'] = 'Basic '+base64.encode(process.env.AUTH_USERNAME+":"+process.env.AUTH_PASSWORD);
Vue.http.headers.common['Content-Type'] = 'application/json';

Vue.http.options.xhr = {withCredentials: true};
//Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push(function(request, next) {

  if (request.url[0] === '/') {
    request.url = process.env.API + request.url;

    var token = Vue.auth.getToken();
    if (token){
      request.headers.set('Authorization', 'Bearer ' + token);
    }


  }

  next(function(response) {
    if (response.status == 400 || response.status == 500) {
      checkErrorMessages(response);
    }

    if (response.status == 401) {

      checkErrorMessagesAndNotify(response);
      Vue.auth.destroyToken();
      Router.go('/auth/login');
    }
  });
});

function checkErrorMessagesAndNotify(response) {
  if(response.data.error_description) alertify.notify(response.data.error_description, 'error', 60, function(){});
  if(response.data.error) alertify.notify(response.data.error, 'error', 60, function(){});
  if(response.data.message) alertify.notify(response.data.message, 'error', 60, function(){});
}

function checkErrorMessages(response) {
  if(response.data.error_description) alertify.error(response.data.error_description);
  if(response.data.error) alertify.error(response.data.error);
  if(response.data.message) alertify.error(response.data.message);
}

//configure route guards
Router.beforeEach(function (to, from, next)  {
  //prevent access to 'requiresGuest' routes;
  if (to.matched.some(function(record) { return record.meta.requiresGuest })
    && Vue.auth.loggedIn())
  {
    next({
      path: '/news-feed'
    });
  }
  else if (to.matched.some(function(record) { return record.meta.requiresAuth })
    && !Vue.auth.loggedIn())
  {

    next({
      path: '/auth/login'
    });
  }
  else {
    next(); // make sure to always call next()!
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  template: '<App/>',
  components: { App },
  methods: {}
})
