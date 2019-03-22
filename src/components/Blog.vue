<template>
  <div class="blog container-fluid">
    <button class="btn btn-danger float-right" @click="deleteBlog" v-if="user.uid == blog.creatorId">Delete</button>
    <button class="btn btn-dark float-left" @click="toDashboard()">Dashboard</button>
    <div class="row justify-content-around">
      <div class="col-12">
        <h1>{{blog.name}}</h1>
        <p class="blog-content">{{blog.description}}</p>
      </div>
      <div class="blog-body">
        <h5>{{blog.body}}</h5>
      </div>
      <div class="col-12" v-if="user.uid == blog.creatorId">
        <div class="row justify-content-around">
          <div class="input-group col-8" v-if="!blog.body">
            <div class="input-group-prepend">
              <button class="btn btn-dark" @click="updateBody">Update Body</button>
            </div>
            <textarea class="form-control" name="body" id="body" cols="30" rows="10" v-model="body"></textarea>
          </div>
          <div class="col-12 published">
            <input class="form-check-input-lg" type="checkbox" id="published" v-model="blog.published"
              @click="updatePublished">
            <label class="form-check-label" for="published">
              <h5>Published</h5>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Blog',
    data() {
      return {
        body: ""
      }
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
      },
      updateBody() {
        this.blog.body = this.body
        this.$store.dispatch("updateBlog", this.blog)
      },
      updatePublished() {
        this.blog.published = !this.blog.published
        this.$store.dispatch("updateBlog", this.blog)
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