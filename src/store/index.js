// This is giving us access to use the vue and vuex modules we installed, as well as access to the router vue is exporting inside of the router folder.We wont need the router just yet, but it will come into play later. 

import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'
import db from '../utils/firebaseInit'

// We are letting vue know that we want it to use the vuex module we pulled in so that we can create a vuex store.
vue.use(vuex)

let store = new vuex.Store({
  state: {
    user: {}

  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    register({ commit, dispatch }, user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          commit("setUser", res.user)
          firebase.auth().currentUser.updateProfile({ displayName: user.displayName })
            .then(res => {
              console.log("Profile Updated")
            })
            .catch(err => { console.error(err) })
          firebase.auth().currentUser.sendEmailVerification()
            .then(res => {
              console.log("Verification Email Sent")
            })
            .catch(err => { console.error(err) })
        })
        .catch(err => { console.error(err) })
    },
    login({ commit, dispatch }, user) {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push('/dashboard')
          commit("setUser", res.user)
          console.log(res.user)
        })
        .catch(err => { console.error(err) })
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut()
        .then(res => {
          router.push("/login")
          commit('setUser', {})
        })
        .catch(err => { console.error(err) })
    },
    authenticate({ commit, dispatch }) {
      // you can change the default route here
      //if someone is signed in, it goes to dashboard, if not, go to login
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user)
          router.push('/dashboard')
        } else {
          router.push('/login')
        }
      });
    }
  }
})

export default store