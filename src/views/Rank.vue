<template>
  <div class="rank">
    <ScrollView v-show="movieList.length" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie.filmId"
        :movie="movie"
        :sort="index + 1"

        @select="gotoDetail"
      />
      <div style="height: 80px"/>
    </ScrollView>
    <div v-show="!movieList.length" class="loading-wrap">
      <Loading/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  components: { Footer },
  data () {
    return {
      movieList: []

    }
  },
  created () {
    this.getMovieList()
    this.$store.state.showNav = true
  },
  methods: {

    getMovieList () {
      this.$axios.get('/meetingFilm/film/getFilms', {
        params: {
          sortId: 3,
          showType: 3
        }

      }).then(res => {
        if (res.status === 0) {
          this.movieList = this.movieList.concat(res.data)
        }
      })
    },
    gotoDetail (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank
  height 100%
  margin-top 0px
  .loading-wrap
    display flex
    align-items center
    height 100%

</style>
