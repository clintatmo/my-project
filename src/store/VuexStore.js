import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        authToken:{},
        authTokenExpiration:{},
        roles:{}
    },
    mutations: {
      setCurrentUser: function (state, user) {
          state.currentUser = user;
      },
      clearCurrentUser: function (state) {
          state.currentUser = {};
      },
      setAuthToken: function (state, authToken) {
          state.authToken = authToken;
      },
      clearAuthToken: function (state) {
          state.authToken = {};
      },
      setAuthTokenExpiration: function (state, authTokenExpiration) {
          state.authTokenExpiration = authTokenExpiration;
      },
      clearAuthTokenExpiration: function (state) {
          state.authTokenExpiration = {};
      },
      setRoles: function (state, roles) {
          state.roles = roles;
      },
      clearRoles: function (state) {
          state.roles = {};
      }
    }
})
