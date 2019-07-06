<template>
  <div class="recommend">
    <van-notice-bar
      style="height: 90px;font-size: 33px"
      text="复仇者联盟4火热上映，现票价仅需121元即可购买，还附赠爆米花、饮料，让你享受激情一夏,另购买特殊套餐,还将附赠钢铁侠公仔一只"
      left-icon="volume-o"
    />
    <ScrollView :data="movies">
      <ListBLock
        :movies="playingMovies"
        :title="`正在热映(${playingCount})`"
        @more="goMore(1)"
        @select="selectItem"
      />
      <Spacing bg-color="#f6f6f6" :height="10"/>
      <ListBLock

        :movies="commingMovies"
        :title="`即将上映(${commingCount})`"
        @more="goMore(2)"
        @select="selectItem"
      />
      <Spacing bg-color="#f6f6f6" :height="10"/>
      <ListBLock
        :movies="classicMovies"
        :title="`经典影片(${classicCount})`"
        @more="goMore(3)"
        @select="selectItem"
      />
      <div style="height: 88px"/>
    </ScrollView>
    <Footer/>
  </div>
</template>

<script>
import ListBLock from 'components/ListBlock'
import Footer from '../components/Footer'
export default {
  components: {
    ListBLock,
    Footer
  },
  data () {
    return {
      commingMovies: [],
      commingCount: 0,
      playingMovies: [],
      playingCount: 0,
      classicMovies: [],
      classicCount: 0
    }
  },
  computed: {
    // movies () {
    //   return this.commingMovies.concat(this.playingMovies)
    // }
  },
  created () {
    this.$store.state.showNav = true

    this.getMovie()
  },
  methods: {
    userProfile () {
      this.$router.push(`/user`)
    },
    getMovie () {
      this.$axios.get('/meetingFilm/film/getIndex').then(res => {
        if (res.status === 0) {
          console.log(res)
          const { soonFilms, hotFilms, classicFilms } = res.data
          this.commingMovies = soonFilms.filmInfo
          this.commingCount = soonFilms.filmNum
          this.playingMovies = hotFilms.filmInfo
          this.playingCount = hotFilms.filmNum
          this.classicMovies = classicFilms.filmInfo
          this.classicCount = classicFilms.filmNum
          console.log(this.playingMovies)
        }
      })
    },
    goMore (type) {
      this.$router.push(`/list/${type}`)
    },
    selectItem (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  height 100%
</style>
