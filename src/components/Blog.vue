<template>
  <div class="blog container-fluid">
    <button class="btn btn-danger float-right" @click="deleteBlog" v-if="user.uid == blog.creatorId">Delete</button>
    <button class="btn btn-dark float-left" @click="toDashboard()">Dashboard</button>
    <div class="row justify-content-around">
      <div class="col-12">
        <h1>{{blog.name}}</h1>
        <p class="blog-content">{{blog.description}}</p>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Blog',
    data() {
      return {}
    },
    mounted() {
      this.$store.dispatch('getActiveBlog', this.$route.params.blogId)
    },
    computed: {
      blog() {
        return this.$store.state.activeBlog
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      deleteBlog() {
        this.$store.dispatch("deleteBlog", this.blog.id)
      },
      toDashboard() {
        this.$router.push("/dashboard")
      }
    },
    components: {}
  }
</script>


<style scoped>
  .blog-content {
    word-wrap: break-word;
  }
</style>