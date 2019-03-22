<template>
  <div class="dashboard row justify-content-around">
    <div class="col-12">
      <h1 class="col-12 title">Blogs</h1>
      <h4>Add Blog</h4>
    </div>
    <div class="col-12" v-if="!adding">
      <i class="far fa-plus-square fa-3x text-success margin-bottom" @click="adding = true"></i>
    </div>
    <div class="col-4" v-if="adding">
      <i class="far fa-minus-square fa-3x red-text" @click="adding = false"></i>
      <form @submit.prevent="addBlog(blog); blog = {};">
        <div class="form-group">
          <label for="name">Name</label>
          <input class="form-control" type="text" id="name" v-model="blog.name">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input class="form-control" type="text" id="description" v-model="blog.description" maxlength="350">
        </div>
        <button class="btn btn-dark margin-bottom" type="submit">Add Blog</button>
      </form>
    </div>
    <div class="col-12">
      <div class="container-fluid">
        <div class="row justify-content-between">
          <div class="col-4" v-for="blog in blogs" @click="viewBlog(blog)"
            v-if="blog.creatorId == user.uid || blog.published">
            <div class="card text-white bg-dark" style="max-width: 40rem;">
              <div class="card-body">
                <h3 class="card-title">{{blog.name}}</h3>
                <p class="card-text hide">{{blog.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        blog: {},
        adding: false
      }
    },
    created() {
      this.$store.dispatch('getBlogs')
    },
    computed: {
      blogs() {
        return this.$store.state.blogs
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      addBlog(blog) {
        this.$store.dispatch('addBlog', blog)
      },
      viewBlog(blog) {
        this.$router.push('/blogs/' + blog.id)
      }
    }
  }
</script>

<style scoped>
  .margin-bottom {
    margin-bottom: 2rem;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .green-text {
    color: #0cc00c;
  }

  .red-text {
    color: red;
  }

  .title {
    font-size: 4rem
  }

  .card {
    height: 14rem;
  }

  .hide {
    opacity: 0;
  }

  :hover.card .hide {
    opacity: 1;
  }
</style>