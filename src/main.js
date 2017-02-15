// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import Auth from './plugins/AuthPlugin';
import Store from './store/VuexStore';


Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(Auth);

// initialize the vuex store using the vuex module. note that you can change the
//  name of the module if you wish
const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
});

Vue.use(vuexI18n.plugin, store);

// add translations directly to the application
Vue.i18n.add('en', require('./assets/i18n/en-US.json'));
Vue.i18n.add('nl', require('./assets/i18n/nl-NL.json'));

// set the start locale to use
Vue.i18n.set('en');


//configure alertify defaults
alertify.defaults.notifier.position = 'top-right';


var base64 = require('base-64');

Vue.http.headers.common['Authorization'] = 'Basic '+base64.encode(process.env.AUTH_USERNAME+":"+process.env.AUTH_PASSWORD);

Vue.http.options.xhr = {withCredentials: true};
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push(function(request, next) {

  if (request.url[0] === '/') {
    request.url = process.env.API + request.url;

    var token = Vue.auth.getToken();
    if (token){
      request.headers.set('Authorization', 'Bearer ' + token);
    }


  }

  next(function(response) {
    if (response.status == 400) {

        alertify.error(response.data.error_description);

      /*response.body.errors.forEach(function (e) {
        alertify.error(e);
      });*/
    }

    if (response.status == 401) {

        Vue.auth.destroyToken();
        next({
          path: '/auth/login'
        });
        alertify.error(response.data.error_description);
    }
  });
});

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
