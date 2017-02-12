import Store from '../store/VuexStore';

var AuthPlugin = {
    setToken: function (token, expiration, username, roles) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authTokenExpiration', expiration);
        localStorage.setItem('roles', roles);
      //Store.commit('setAuthToken', token);
      //Store.commit('setAuthTokenExpiration', expiration);
      Store.commit('setCurrentUser', username);
      //Store.commit('setRoles', roles);
    },

    destroyToken: function () {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpiration');
      //Store.commit('clearAuthToken');
      //Store.commit('clearAuthTokenExpiration');
      Store.commit('clearCurrentUser');
      //Store.commit('clearRoles');
    },

    getToken: function () {
        var token = localStorage.getItem('authToken');
        var expiration = localStorage.getItem('authTokenExpiration');

        if (!token || !expiration)
            return null;

        // ToDo
        // if (Date.now() > parseInt(expiration)) {
        //     this.destroyToken();
        //     return null;
        // } else {
        //     return token;
        // }

        return token;
    },

    loggedIn: function () {

      if (this.getToken())
            return true;
        else
            return false;
    }
};

export default function(Vue) {
    Vue.auth = AuthPlugin;

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: function() {
                return Vue.auth;
            }
        }
    })
}
