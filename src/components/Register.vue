<template>
  <div class="register container">
    <h1 class="pt-3">Register</h1>
    <div class="row justify-content-around">
      <div class="col-4">
        <form @submit.prevent="register(user);user = {};">
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" type="text" id="name" v-model="user.displayName">
            <label for="email">Email</label>
            <input class="form-control" type="email" id="email" v-model="user.email">
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" v-model="user.password">
          </div>
          <button class="btn btn-outline-dark" type="submit">Register</button>
        </form>
        <p>Already a user?
          <em class="btn btn-link" @click="toggle">Login</em>
        </p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        user: {}
      }
    },
    computed: {},
    methods: {
      register(user) {
        this.$store.dispatch('register', user)
      },
      toggle() {
        this.$router.push("login")
      }
    },
    components: {}
  }
</script>

<style>
  .register {
    background-color: #dadee3;
    border-radius: 15px 150px;
  }
</style>