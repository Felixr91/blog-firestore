import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'
import db from '../utils/firebaseInit'

vue.use(vuex)

let store = new vuex.Store({
  state: {
    user: {},
    activeBlog: {},
    blogs: [],
    comments: []
  },
  mutations: {
    setActiveBlog(state, activeBlog) {
      state.activeBlog = activeBlog
    },
    setUser(state, user) {
      state.user = user
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
    },
    setComments(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    //BLOGS
    addBlog({ commit, dispatch, state }, blog) {
      blog.creatorId = state.user.uid
      db.collection("blogs").add(blog).then(docRef => {
        console.log("Blog created with id:", docRef.id)
        dispatch("getBlogs")
      })
        .catch(err => { console.error(err) })
    },
    deleteBlog({ commit, dispatch, state }, blogId) {
      db.collection("blogs").doc(blogId).delete().then(() => {
        console.log("Blog deleted")
        dispatch("getBlogs")
        router.push("/dashboard")
      })
        .catch(err => { console.error(err) })
    },
    getBlogs({ commit, dispatch }) {
      db.collection("blogs").get().then(querySnapShot => {
        var blogs = []
        querySnapShot.forEach(docRef => {
          var blog = docRef.data()
          blog.id = docRef.id
          blogs.push(blog)
        })
        commit("setBlogs", blogs)
      })
        .catch(err => { console.error(err) })
    },
    getActiveBlog({ commit, dispatch }, blogId) {
      db.collection("blogs").doc(blogId).get().then(docRef => {
        var blog = docRef.data()
        blog.id = docRef.id
        commit("setActiveBlog", blog)
        dispatch("getComments", blog.id)
      })
        .catch(err => { console.error(err) })
    },
    updateBlog({ commit, dispatch }, blog) {
      db.collection("blogs").doc(blog.id).update(blog).then(() => {
        dispatch("getActiveBlog", blog.id)
      })
        .catch(err => { console.error(err) })
    },
    // COMMENTS
    addComment({ commit, dispatch, state }, comment) {
      comment.userName = state.user.displayName
      comment.creatorId = state.user.uid
      comment.blogId = state.activeBlog.id
      db.collection("comments").add(comment).then(docRef => {
        console.log("Comment created with id:", docRef.id)
        dispatch("getComments", state.activeBlog.id)
      })
        .catch(err => { console.error(err) })
    },
    getComments({ commit, dispatch }, blogId) {
      db.collection("blogs").doc(blogId).collection("comments").get().then(querySnapShot => {
        var comments = []
        querySnapShot.forEach(docRef => {
          var comment = docRef.data()
          comment.id = docRef.id
          comments.push(comment)
        })
        commit("setComments", comments)
      })
    },
    // USER AUTHENTICATION
    register({ commit, dispatch }, user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push("/dashboard")
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
        })
        .catch(err => { console.error(err) })
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut()
        .then(res => {
          router.push('/login')
          commit('setUser', {})
        })
        .catch(err => { console.error(err) })
    },
    authenticate({ commit, dispatch }) {
      // you can change the default route here
      //if someone is signed in, it goes to dashboard, if not, go to auth
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