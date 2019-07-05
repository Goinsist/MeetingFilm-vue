<template>
  <section class="list-block">
    <div class="info" @click="$emit('more')">
      <h1 class="title" style="43px">{{ title }}</h1>
      <i class="iconfont icon-right"/>
    </div>
    <div v-if="movies.length" class="list">
      <div
        v-for="item in movies"
        :key="item.filmId"
        class="item"
        @click="$emit('select', item.filmId)"
      >
        <div class="image">
          <img v-lazy="item.imgAddress" width="100%" height="100%">
          <em v-if="item.filmStatus === 1||item.filmStatus === 3" style="font-size: 39px" class="rate">
            {{ item.filmScore }}
          </em>
        </div>
        <p class="title" style="font-size: 33px">{{ item.filmName }}</p>
      </div>
    </div>
    <div v-else class="loading-wrap">
      <Loading/>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ListBlock',
  props: {
    movies: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-block
  padding-top  10px
  min-height 900px

  text-align center
  .info
    display flex
    justify-content space-between
    margin-bottom 15px
    font-weight bold
    height 40px
    font-size 40px

    .iconfont
      font-size 40px
  .list
    display flex
    justify-content space-between
    flex-wrap wrap
    .item
      width 31%
      .image
        position relative

        .rate
          position absolute
          right 5px
          bottom 2px
          color #ffb400
          font-weight bold
          font-style italic
      .title
        padding: 15px 0
        white-space nowrap

        overflow hidden
        text-overflow ellipsis
        font-size 14px
  .loading-wrap
    display flex
    align-items center
    height 200px
</style>
