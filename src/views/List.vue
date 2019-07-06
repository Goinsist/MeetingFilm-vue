<template>
  <Transition name="fade">
    <div class="list">
      <TheBackHeader>
        <span style="font-size: 33px">{{ tabName }}</span>
      </TheBackHeader>
      <div class="content-wrapper">
        <ScrollView :data="movieList" :pull-up-load="true" @pulling-up="loadMore">
          <Card
            v-for="movie in movieList"
            :key="movie._id"
            :movie="movie"
            @select="gotoDetail"
          />
          <div class="pull-up-wrap">
            <p v-show="pullUpLoading">正在加载...</p>
            <p v-show="noMore">没有更多了~</p>
          </div>
        </ScrollView>
      </div>
      <div v-show="!movieList.length" class="loading-wrap">
        <Loading/>
      </div>
    </div>
  </Transition>
</template>

<script>
import TheBackHeader from 'components//TheBackHeader'

export default {
  name: 'List',
  components: {
    TheBackHeader
  },
  data () {
    return {
      movieList: [],
      tabName: '',
      count: 0,
      page: 1,
      tabs: ['即将上映', '正在热映'],
      activeIdx: +this.$route.params.type,
      pullUpLoading: false
    }
  },

  computed: {
    noMore () {
      return this.count === this.movieList.length && this.count !== 0
    }
  },
  watch: {

    '$route' (to, from) {
      this.$router.go(0)
    }
  },

  created () {
    let id = Number(this.$route.params.type)
    switch (id) {
      case 1:
        this.tabName = '正在热映'
        break
      case 2:
        this.tabName = '即将上映'
        break
      case 3:
        this.tabName = '经典电影'
        break
    }
    this.getMovieList()
  },
  beforeRouteUpdate  (to, from, next) {
    this.page = 1
    this.movieList = []
    this.count = 0
    this.activeIdx = +to.params.type
    next()
    this.getMovieList()
  },
  methods: {
    getMovieList () {
      console.log(this.$route.params)
      const params = {
        nowPage: this.page,
        pageSize: 10,
        showType: Number(this.$route.params.type)
      }
      this.$axios.get('/meetingFilm/film/getFilms', { params }).then(res => {
        if (res.status === 0) {
          this.movieList = this.movieList.concat(res.data)
          this.count = res.totalPage
        }
        this.$nextTick(() => {
          this.pullUpLoading = false
        })
      })
    },
    switchTab (idx) {
      this.activeIdx = idx
      this.$router.push(`/list/${idx}`)
    },
    loadMore () {
      const { movieList, count } = this
      if (movieList.length === count) return
      this.page += 1
      this.pullUpLoading = true
      this.getMovieList()
    },
    gotoDetail (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background #fff
  z-index 10

    .item
      display inline-block
      width 50%
      font-size 15px
      border-radius 100px
      &.active
        background $theme-color
  .content-wrapper
    position absolute
    top 86px
    bottom 0
    width 100%
    .pull-up-wrap
      height 30px
      line-height 30px
      text-align center
      color $gray
  .loading-wrap
    display flex
    align-items center
    height 100%
.fade-leave-active
  transition all .5s
.fade-leave-to
  transform translateX(100%)
</style>
