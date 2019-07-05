<template>
  <div class="search">
    <ScrollView :data="list">
      <div class="input-wrap">
        <SearchBox ref="searchBox" @input="search" @clear="clear"/>
      </div>
      <div class="hotkey-wrap">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span
            v-for="item in hotKeys"
            :key="item"
            class="item"
            @click="addQuery(item)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <div v-if="searchHistory.length" class="history-wrap">
        <div class="title">
          <span>搜索历史</span>
          <i class="iconfont icon-clear" @click="showConfirm"/>
        </div>
        <div v-for="item in searchHistory" :key="item" class="item">
          <i class="iconfont icon-history"/>
          <span class="text" @click="addQuery(item)">{{ item }}</span>
          <i class="iconfont icon-del" @click="deleteSearchHistory(item)"/>
        </div>
      </div>
    </ScrollView>
    <div v-show="isShow" class="result-wrap">
      <ScrollView :data="movieList">
        <Card
          v-for="movie in movieList"
          :key="movie.filmId"
          :movie="movie"
          @select="selectItem"
        />
      </ScrollView>
      <div v-show="!movieList.length" class="no-result">
        <img src="~common/images/noresult.png" class="img">
        <p class="text">没有找到相关内容</p>
      </div>
    </div>
    <Confirm ref="confirm" content="是否删除所有搜索历史" @confirm="clearSearchHistory"/>
    <Footer/>
  </div>
</template>

<script>
import SearchBox from 'components/SearchBox'
import { mapState, mapMutations } from 'vuex'
import Footer from '../components/Footer'
export default {
  components: {
    SearchBox,
    Footer
  },
  data () {
    return {
      hotKeys: [],
      movieList: [],
      isShow: false
    }
  },
  computed: {
    list () {
      return this.hotKeys.concat(this.searchHistory)
    },
    ...mapState([
      'searchHistory'
    ])
  },
  created () {
    this.$store.state.showNav = true
    this.getHotKeys()
  },

  methods: {
    getHotKeys () {
      this.$axios.get('/meetingFilm/film/list5HotSearch').then(res => {
        if (res.status === 0) {
          console.log(res.data)
          this.hotKeys = res.data
        }
      })
    },
    search (query) {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      if (!query.trim()) return

      const params = {
        searchParam: query,
        searchType: 1,
        isList: false
      }
      this.timer = setTimeout(() => {
        this.$axios.get('/meetingFilm/film/films', { params }).then(res => {
          if (res.status === 0) {
            console.log(res.data)
            this.movieList = res.data
            for (let i = 0; i < this.movieList.length; i++) {
              this.movieList[i].filmScore = this.movieList[i].score
              this.movieList[i].directorName = this.movieList[i].info04.actors.director.directorName
            }
            this.isShow = true
          }
        })
        this.saveSearchHistory(query)
      }, 500)
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    clear () {
      this.movieList = []
      this.isShow = false
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
      this.search(query)
    },
    selectItem (id) {
      this.$router.push(`/movie/${id}`)
    },
    ...mapMutations([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.search
  height 100%
  background #f9f9f9
  .input-wrap
    background #f5f5f5
    padding: 10px 15px
  .hotkey-wrap
    padding  0 0 8px 15px
    background-color #fff
    .title
      padding 15px 0
      font-size 35px
      color #666
    .list
      display flex
      flex-wrap wrap
      overflow hidden
      .item
        padding 6px 12px
        margin: 0 12px 12px 0
        border-radius 4px
        font-size 33px
        color white
        background-color #ff9000
  .history-wrap
    .title
      padding 15px 0
      font-size 35px
      color #666
      .icon-clear
        float right
        font-size 35px
    margin-top 10px
    padding 0 15px 8px 15px
    .item
      height 90px
      line-height 90px
      display flex
      font-size 35px
      color #333
      border-bottom 1px solid #e5e5e5
      .icon
        font-size 35px
        color #999
      .icon-history
        font-size 35px
        margin-right 10px
      .text
        font-size 37px
        flex 1
  .result-wrap
    position fixed
    top 201px
    bottom 0
    width 100%
    overflow scroll
    background #fff
    .no-result
      position absolute
      top 40%
      left 50%
      transform translate(-50%,-50%)
      color #999
      text-align center
      .img
        width 200px
        height 200px
        filter grayscale(1)
        margin-bottom 15px
</style>
