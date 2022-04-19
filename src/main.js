// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import { i18n } from "./assets/languageKeys/i18n"

Vue.config.productionTip = false

Vue.prototype.$accessToken = "";

Vue.prototype.$getAccessToken = function () {

  if (Vue.prototype.$accessToken != "") {

    if(Date.now() >= Vue.prototype.$accessToken.expires_in) {

      generateAccessToken(() => {
        console.log("generated because time over")
        return Vue.prototype.$accessToken
      });

    } else {

      return Vue.prototype.$accessToken;

    }

  } else {

    generateAccessToken(()=>{
      console.log("generated because not found")
      return Vue.prototype.$accessToken;
    })

  }
}

function generateAccessToken(callback) {

  let clientID = "";
  let clientSecret = "";
  let authorizationToken = "Basic " + btoa(clientID + ":" + clientSecret);

  axios({

    method: "POST",
    "url": "https://api-as.mycliplister.com/oauth2/token?grant_type=client_credentials",
    "data": {},
    "headers": {"content-type": "application/x-www-form-urlencoded", "Authorization": authorizationToken}

  }).then(result => {

    Vue.prototype.$accessToken = result.data;
    Vue.prototype.$accessToken.expires_in = Date.now()+3600000;
    callback();

  }, error => {

    console.error(error);
    callback();

  });

}

generateAccessToken(function () {
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
