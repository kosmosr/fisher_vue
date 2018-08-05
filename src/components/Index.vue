<template>
  <div id="app">
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
    <div id="books" class="row">
      <div class="col-md-4 book-container" v-for="book in recent" :key="book.isbn">
        <a href="#" class="">
          <div class="col-md-4 no-padding">
            <img class="book-img cssshadow" v-bind:src="book.image">
          </div>
          <div style="margin-left: 0;" class="col-md-8 flex-vertical book-info">
            <span class="title">{{ book.title }}</span>
            <div class="description-font"><span>作者：</span><span>{{ book.author }}</span>
            </div>
            <span class="summary description-font">{{ book.summary }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      recent: []
    }
  },
  created: function () {
    this.$http.get('http://localhost:9527/').then(function (response) {
      this.recent = response.body
    })
  }
}
</script>

<style scoped>
  @import "../../static/css/index.css";
</style>
