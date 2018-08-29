<template>
  <div id="app">
    <div class="row flex-vertical-center">
      <div style="margin-top:20px;" class="col-md-6">
        <span class="sub-title">我想赠送的书籍  共  {{ gifts_length }} 本</span>
        <hr>
      </div>
    </div>
    <div class="row" v-for="gift in gifts" :key="gift.id">
      <router-link :to="{name: 'book_detail', params: {isbn: gift.book.isbn}}">
        <div style="margin-bottom:30px;" class="col-md-9 col-padding">
          <div class="col-md-2">
            <img class="book-img-small shadow" v-bind:src="gift.book.image">
          </div>
          <div style="margin-top:6px;" class="col-md-6 flex-vertical">
                            <span id="title"
                                  class="book-middle-title">{{ gift.book.title }}</span>
            <div style="margin-top:6px;"
                 class="flex-vertical description-font">
              <span id="author">{{ gift.book.author }}</span>
              <span id="publisher">{{ gift.book.publisher }}</span>
              <span id="price">{{ gift.book.price }}</span>
              <span id="isbn">{{ gift.book.isbn }}</span>
            </div>
            <a class="link-normal" v-on:click="redrawGift(gift.id)">
              撤销
            </a>
          </div>
          <div class="col-md-3 flex-vertical">
            <router-link :to="{name: 'book_detail', params: {isbn: gift.book.isbn}}">
              <span class="bg-info">{{ gift.wishes_count }}人想要</span>
            </router-link>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Gifts',
    data () {
      return {
        gifts_length: 0,
        gifts: []
      }
    },
    methods: {
      getGifts () {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'gifts'
          this.$http.get(url)
            .then((response) => {
              this.gifts = response.data
              this.gifts_length = response.data.length
            })
            .catch((response) => {
              let errorMsg = response.data.message
              this.$message.error(errorMsg)
            })
        }
      },
      redrawGift (gid) {
        let url = this.GLOBAL.apiUrl + 'gifts/' + gid
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
    },
    created () {
      this.getGifts()
    }
  }
</script>

<style scoped>

</style>
