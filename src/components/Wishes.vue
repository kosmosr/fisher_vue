<template>
  <div id="app">
    <div class="row flex-vertical-center">
      <div style="margin-top:20px;" class="col-md-6">
        <span class="sub-title">我想要的书籍  共  {{ wishes_length }} 本</span>
        <hr>
      </div>
    </div>
    <div class="row" v-for="wish in wishes" :key="wish.id">
      <router-link :to="{name: 'book_detail', params: {isbn: wish.book.isbn}}">
        <div style="margin-bottom:30px;" class="col-md-9 col-padding">
          <div class="col-md-2">
            <img class="book-img-small shadow" v-bind:src="wish.book.image">
          </div>
          <div style="margin-top:6px;" class="col-md-6 flex-vertical">
                            <span id="title"
                                  class="book-middle-title">{{ wish.book.title }}</span>
            <div style="margin-top:6px;"
                 class="flex-vertical description-font">
              <span id="author">{{ wish.book.author }}</span>
              <span id="publisher">{{ wish.book.publisher }}</span>
              <span id="price">{{ wish.book.price }}</span>
              <span id="isbn">{{ wish.book.isbn }}</span>
            </div>
            <a class="link-normal"
               href="#" v-on:click="redrawWish(wish.book.isbn)">
              撤销
            </a>
          </div>
          <div class="col-md-3 flex-vertical">
            <router-link :to="{name: 'book_detail', params: {isbn: wish.book.isbn}}">
              <span class="bg-info">{{ wish.wishes_count }}人赠送</span>
            </router-link>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Wishes',
    data () {
      return {
        wishes_length: 0,
        wishes: []
      }
    },
    methods: {
      getWishes () {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'wishes'
          this.$http.get(url)
            .then((response) => {
              this.wishes = response.data
              this.wishes_length = response.data.length
            })
            .catch((response) => {
              let errorMsg = response.data.message
              this.$message.error(errorMsg)
              this.$router.push({path: '/'})
            })
        }
      },
      redrawWish (isbn) {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'wish/' + isbn
          this.$http.delete(url)
            .then((response) => {
              this.$message.success('撤销成功')
              this.$router.go(0)
            })
            .catch((response) => {
              let errorMsg = response.data.message
              this.$message.error(errorMsg)
              this.$router.go(0)
            })
        }
      }
    },
    created () {
      this.getWishes()
    }
  }
</script>

<style scoped>

</style>
