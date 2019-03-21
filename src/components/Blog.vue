<template>
  <div class="blog container">
    <div class="row">
      <div class="col-12">
        <h1>{{blog.name}}</h1>
        <p>{{blog.description}}</p>
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
      }
    },
    methods: {},
    components: {}
  }
</script>


<style scoped>
  .blog {
    width: 50rem;
    word-wrap: break-word;
  }
</style>