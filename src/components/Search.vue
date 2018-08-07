<template>
  <div id ='app'>
    <div style="margin-top:20px;" class="row flex-vertical-center">
      <div class="col-md-6">
            <span class="sub-title">搜索 <span class="space highlight"
                                             id="keyword">#</span>的结果</span>
      </div>
      <div class="col-md-3 col-md-offset-3">
            <span class="sub-title"> 共 <span class="space"
                                             id="total">#</span> 条记录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    test () {
      console.log(this.$route.params.keyword)
    }
  },
  created () {
    this.test()
  }
}
</script>

<style scoped>
  @import "../../static/css/search-result.css";
</style>
