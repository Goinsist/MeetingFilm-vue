
<template>
  <div v-show="load" class="loading">
    <img src="../assets/images/loading.gif">
  </div>
</template>
<script>
export default {
  // 显示加载的页面
  name: 'Loading',
  props: {
    loadingWord: String,
    load: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
<style  lang="stylus" scoped>
.loading
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    color: #fff;
    img
      width: 50px;
      height: 50px;
</style>
