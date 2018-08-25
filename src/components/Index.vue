<template>
  <div id="app">
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
    <div id="books" class="row">
      <div class="col-md-4 book-container" v-for="book in recent" :key="book.isbn">
        <router-link href="" class="" :to="{name: 'book_detail', params: {isbn: book.isbn}}">
          <div class="col-md-4 no-padding">
            <img class="book-img cssshadow" v-bind:src="book.image">
          </div>
          <div style="margin-left: 0;" class="col-md-8 flex-vertical book-info">
            <span class="title">{{ book.title }}</span>
            <div class="description-font"><span>作者：</span><span>{{ book.author }}</span>
            </div>
            <span class="summary description-font">{{ book.summary }}</span>
          </div>
        </router-link>
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
      let url = this.GLOBAL.apiUrl
      this.$http.get(url).then(function (response) {
        this.recent = response.data
      })
        .catch((response) => {
          console.log(response.data)
          this.$message.error('连接服务器失败')
        })
    }
  }
</script>

<style scoped>
  @import "../../static/css/index.css";
</style>
