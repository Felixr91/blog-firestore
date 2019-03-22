<template>
  <div class="blog container-fluid">
    <button class="btn btn-danger float-right" @click="deleteBlog" v-if="user.uid == blog.creatorId">Delete</button>
    <button class="btn btn-dark float-left" @click="toDashboard()">Dashboard</button>
    <div class="row justify-content-around">
      <div class="col-12">
        <h1>{{blog.name}}</h1>
        <p class="blog-content">{{blog.description}}</p>
      </div>
      <div class="blog-body col-12">
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
      <div class="col-6 bg-secondary border border-dark border-bottom-0 rounded">
        <h3 class="card-title">Comments</h3>
        <i class="far fa-plus-square fa-3x text-success margin-bottom" @click="adding = true" v-if="!adding"></i>
        <i class="far fa-minus-square fa-3x text-danger margin-bottom" @click="adding = false" v-if="adding"></i>
        <div class="add-comment" v-if="adding">
          <form @submit.prevent="addComment(comment); comment = {};">
            <div class="form-group">
              <label for="body">Comment</label>
              <input class="form-control" type="text" id="body" v-model="comment.body" maxlength="200">
            </div>
            <button class="btn btn-dark margin-bottom" @click="adding = false" type="submit">Add Comment</button>
          </form>
        </div>
        <div class="row" v-for="(comment, index) in comments">
          <div class="col-12">
            <div class="card text-white bg-dark margin-bottom" :class="evenOrOdd(index)"
              style=" min-width: 30rem; max-width: 30rem;">
              <div class="card-body">
                <h3 class="card-title">{{comment.userName}}</h3>
                <p class="card-text hide">{{comment.body}}</p>
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
    name: 'Blog',
    data() {
      return {
        body: "",
        comment: {},
        adding: false
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
      },
      comments() {
        return this.$store.state.comments
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
        var published = published
        debugger
        this.blog.body = body
        this.$store.dispatch("updateBlog", this.blog)
      },
      updatePublished() {
        this.blog.published = !this.blog.published
        this.$store.dispatch("updateBlog", this.blog)
      },
      addComment(comment) {
        this.$store.dispatch("addComment", comment)
      },
      evenOrOdd(index) {
        return index % 2 ? "float-left" : "float-right"
      }
    },
    components: {}
  }
</script>


<style scoped>
  .blog-content {
    word-wrap: break-word;
  }

  .outline {
    border: solid black 3px;
    border-radius: 10px;
  }

  .margin-bottom {
    margin-bottom: 15px;
  }
</style>