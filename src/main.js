// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

store.dispatch('authenticate')

/* eslint-disable no-new */
//@ts-ignore
new Vue({
  el: '#app',
  created() {
    // you can change the default route here this is our authentication.
    //if someone is signed in, it goes to dashboard, if not, go to auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    });
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})

// What this is doing is we are pulling in access to the firebase module to utilize its functionality, as well as the firestore portion.We are then accessing our firebaseConfig object, and passing that into the firebase initializer.We set the value of that to firebaseApp.With an initialized firebase app, we can set up the firestore passing it some settings, and we then export that firestore from this file.