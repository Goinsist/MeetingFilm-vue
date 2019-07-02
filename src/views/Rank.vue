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
      <div style="height: 50px"/>
    </ScrollView>
    <div v-show="!movieList.length" class="loading-wrap">
      <Loading/>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" @click="$router.push('/recommend')">电影</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" @click="$router.push('/user')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
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
  .loading-wrap
    display flex
    align-items center
    height 100%
</style>
