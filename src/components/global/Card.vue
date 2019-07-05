<template>
  <div class="card" :class="{ 'rank-card': isRank }" @click="$emit('select', movie.filmId)">
    <p v-if="isRank" class="text" :class="'rank-' + sort">{{ sort }}</p>
    <div class="image">
      <img v-lazy="movie.imgAddress" width="100%" height="100%">
    </div>
    <div class="descript" >
      <h1 class="title">{{ movie.filmName }}</h1>
      <p v-if="movie.filmStatus !==2" class="rate">
        观众评分:
        <span :class="{ 'text': movie.filmScore > 0 }">{{ movie.filmScore || '暂无' }}</span>
      </p>
      <p v-else class="pubdate">上映时间: {{ movie.showTime | removeZh }}</p>
      <p class="cast">导演: {{ movie.directorName }}</p>
    </div>
    <div class="buy">
      <button
        v-if="movie.filmStatus===1"
        style="width: 150px;height: 130px;background-color: red;border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 26px;
border-radius: 12px;"
      >
        购票
      </button>
      <button
        v-if="movie.filmStatus===2"
        style="width: 150px;height: 130px;background-color: cornflowerblue;border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 26px;
border-radius: 12px;"
      >
        预售
      </button>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    removeZh (str) {
      return str.replace('(中国大陆)', '')
    }
  },
  props: {
    movie: {
      type: Object,
      required: true
    },

    sort: {
      type: Number,
      default: -1
    }
  },
  computed: {
    casts () {
      return this.movie.casts.map(it => it.name).join(',')
    },
    isRank () {
      return this.sort !== -1
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card
    display flex
    padding 10px 20px
    /*height 140px*/
    height 300px
    align-items center
    box-sizing border-box
    &.rank-card
      padding-left 0
    .text
      /*width 30px*/
      width 60px
      /*height 30px*/
      height 60px
      margin 0 10px
      /*line-height 30px*/
      line-height 60px
      text-align center
      background-color #f7f7f7
      color #999
      font-weight 700
      &.rank-1
        background #ef4238
        color #fff
      &.rank-2
        background #ffb400
        color #fff
      &.rank-3
        background #FFB47A
        color #fff
    .image
        width 190px
        height 270px
      /*width 80px*/

      /*height 120px*/
    .buy
      flex 1

    .descript
      flex 2.5
      /*margin-left 10px*/

      margin-left 40px
      display flex
      flex-direction column
      box-sizing border-box
      /*line-height: 30px*/
      line-height: 90px
      /*font-size 13px*/
      font-size 28px
      color #666
      border-bottom 1px solid #e6e6e6
      overflow hidden
      white-space nowrap
      .title
        flex 1
        color #333

        /*font-size 17px*/
        font-size 27px
        font-weight 700
        overflow hidden
        text-overflow ellipsis
      .rate
        flex 1

        .text
          /*font-size 15px*/
          font-size 21px
          font-weight 700
          color #faaf00
      .cast
        flex 1

        overflow hidden
        text-overflow ellipsis
      .duration
        flex 1
</style>
