<template>
  <div id="app">
    <div class="row book-container">
      <div class="col-md-2">
        <img class="book-img" v-bind:src="data.image"/>
      </div>
      <div style="margin-left: 30px;" class="col-md-5 flex-vertical">
        <div>
          <h4>{{ data.title }}</h4>
        </div>
        <div class="description-font-margin">
          <div>
            <span>作者:</span>
            <span>{{ data.author }}</span>
          </div>
          <div>
            <span>出版社:</span>
            <span>{{ data.publisher }}</span>
          </div>
          <div>
            <span>出版年：</span>
            <span>{{ data.pubdate }}</span>
          </div>
          <div>
            <span>页数：</span>
            <span>{{ data.pages }}</span>
          </div>
          <div>
            <span>定价：</span>
            <span>{{ data.price }}</span>
          </div>
          <div>
            <span>精装：</span>
            <span>{{ data.binding }}</span>
          </div>
          <div>
            <span>ISBN：</span>
            <span id="isbn">{{ data.isbn }}</span>
          </div>
          <div class="color-count">
            <span>{{ data.wishes.total }}人想要 / </span>
            <span>{{ data.gifts.total }}人可赠送</span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:30px;" class="row">
      <div v-if="data.has_in_gifts !== true && data.has_in_wishes !== true">
        <div class="col-md-1">
          <a class="btn btn-outline"
             href="#" v-on:click="gift">
            赠送此书
          </a>
        </div>
        <div style="margin-left:30px;" class="col-md-1">
          <a class="btn btn-outline"
             href="#">
            加入到心愿清单
          </a>
        </div>
      </div>
      <div class="col-md-3" v-else-if="data.has_in_wishes">
        <span class="bg-info">已添加至心愿清单</span>
      </div>
      <div class="col-md-3" v-else>
        <span class="bg-info">已添加至赠送清单</span>
      </div>
    </div>
    <div style="margin-top: 30px;" class="row">
      <div class="col-md-2"><span class="description-title">内容简介</span></div>
    </div>
    <div style="margin-top:15px;" class="row">
      <div class="col-md-11">
        <p class="description-font">{{ data.summary }}</p>
      </div>
    </div>

    <div v-if="data.gifts.total !== 0 && data.has_in_gifts !== true">
      <div style="margin-top:30px;" class="row">
        <div class="col-md-3"><span class="description-title">向他们请求此书</span></div>
      </div>
      <hr style="margin-top:5px;"/>
      <div style="margin-top:30px;" class="row" v-for="gift in data.gifts.trades" :key="gift.id">
        <div class="col-md-1">
          {{ gift.user_name }}
        </div>
        <div class="col-md-2 description-font">
          上传于{{ gift.time }}
        </div>
        <div class="col-md-2">
          <a class="btn-normal"
             href="#">向他请求此书</a>
        </div>
      </div>
      <div v-if="data.wishes.total !== 0 && data.has_in_gifts === true">
        <div style="margin-top:30px;" class="row">
          <div class="col-md-3"><span class="description-title">向他们赠送此书</span></div>
        </div>
        <hr style="margin-top:5px;"/>
        <div style="margin-top:30px;" class="row" v-for="wish in data.wishes.trades" :key="wish.id">
          <div class="col-md-1">
            {{ wish.user_name }}
          </div>
          <div class="col-md-2 description-font">
            上传于{{ wish.time }}
          </div>
          <div class="col-md-2">
            <a class="btn-normal"
               href="#">向他赠送此书</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BookDetail',
    data () {
      return {
        data: {wishes: {total: 0}, gifts: {total: 0}}
      }
    },
    methods: {
      getBooks () {
        let url = this.GLOBAL.apiUrl + 'book/' + this.$route.params.isbn
        this.$http.get(url).then(function (response) {
          if (response.status === 200) {
            let resp = response.data
            this.data = resp
          }
        })
      },
      gift () {
        this.$confirm('如果您不想赠送此书，或者没有这本书，请不要随意发布虚假信息。谢谢你的支持和理解。'
                      , '您确定拥有《' + this.data.title + '》这本书吗', {
                        confirmButtonText: '确定赠送',
                        cancelButtonText: '不，算了',
                        center: true,
                        showClose: true,
                        closeOnClickModal: false
        }).then(() => {
          this.save_gift()
        })
      },
      save_gift () {
        let url = this.GLOBAL.apiUrl + 'gifts/' + this.$route.params.isbn
        this.$http.get(url).then(function (response) {
          if (response.status === 200) {
            this.$message({
              type: 'success',
              message: '赠送成功!'
            })
          }
        })
          .catch(function (response) {
            let errorMsg = response.data.message
            this.$message.error(errorMsg)
          })
      }
    },
    created () {
      this.getBooks()
    }
  }
</script>

<style scoped>
  @import "../../static/css/book-detail.css";
  @import "../../static/3rd/ui/remodal.css";
  @import "../../static/3rd/ui/remodal-default-theme.css";
</style>
