<template>
  <div id='app'>
    <div style="margin-top:20px;" class="row flex-vertical-center">
      <div class="col-md-6">
            <span class="sub-title">搜索 <span class="space highlight"
                                             id="keyword">{{keyword}}</span>的结果</span>
      </div>
      <div class="col-md-3 col-md-offset-3">
            <span class="sub-title"> 共 <span class="space"
                                             id="total">{{total}}</span> 条记录</span>
      </div>
    </div>
    <hr>
    <div class="row col-padding" v-for="book in books" :key="book.isbn">
      <a href="#" class="">
        <div class="col-md-2">
          <img class="book-img-small shadow" v-bind:src="book.image">
        </div>
        <div class="col-md-7 flex-vertical description-font">
          <span class="title">{{ book.title }}</span>
          <span>{{book.author}} / {{book.publisher}} / ￥{{book.price}}元</span>
          <span class="summary">{{ book.summary}}</span>
        </div>
      </a>
    </div>
    <div class="row">
      <div class="flex-hor-center block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data () {
      return {
        keyword: this.$route.params.keyword,
        books: [],
        total: 0,
        per_page: 10,
        page: 1,
        currentPage: 1
      }
    },
    methods: {
      getBooks () {
        let url = this.GLOBAL.apiUrl + 'books/' + this.$route.params.keyword
        const params = {page: this.page, per_page: this.per_page}
        this.$http.get(url, {params: params}).then(function (response) {
          if (response.status === 200) {
            this.books = response.data.data
            this.total = response.data.meta.pagination.total
            this.currentPage = response.data.meta.pagination.current_page
          }
        })
      },
      handleSizeChange (val) {
        this.per_page = val
        this.getBooks()
      },
      handleCurrentChange (val) {
        this.page = val
        this.getBooks()
      }
    },
    created () {
      this.getBooks()
    }
  }
</script>

<style scoped>
  @import "../../static/css/search-result.css";
</style>
