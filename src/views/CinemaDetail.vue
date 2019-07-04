<template lang="html">
  <div class="cinemaDetail">
    <TheBackHeader>
      <span>{{ cinemaData.cinemaName }}</span>
    </TheBackHeader>
    <div class="cinemaName">
      <h1 class="title">{{ cinemaData.cinemaName }}</h1>
      <p class="addr textOverflow1">{{ cinemaData.cinemaAddress }}</p>
    </div>
    <div class="cinema-nav">
      <div class="cinema-nav-list">
        <div class="post-bg"/>
        <div class="post-bg-filter">
          <!--背景图-->
          <div v-if="showData[movieIndex]" class="box">
            <img style="width:100%;height:100%;filter: blur(30px);" :src="picFix(showData[movieIndex].imgAddress)" alt="" >
          </div>
        </div>
        <div class="swiper-box">
          <!-- 轮播 -->
          <transition name="slide">
            <swiper ref="mySwiper" :options="swiperOption">
              <swiper-slide v-for="(movies, index) in showData" :key="movies.filmId">
                <div :class="{active:(movieIndex== index)}">
                  <img :src="picFix(movies.imgAddress)" alt="" @click="switchThis($event)">
                </div>
              </swiper-slide>
              <div slot="pagination" class="swiper-pagination"/>
            </swiper>
          </transition>
        </div>
      </div>
      <!-- 电影介绍 -->
      <div v-if="showData[movieIndex]" class="movie-info">
        <div class="movie-title">
          <span class="title">{{ this.showData[movieIndex].filmName }}</span>
        </div>
        <div class="desc textOverflow1">{{ this.showData[movieIndex].desc }}</div>
      </div>
    </div>
    <!-- 日期 -->
    <section id="showDays">
      <div class="timeLine">
        <div

          v-for="(day, index) in shows"
          :key="day.showDate"
          class="showday"
          :class="{active:isSwitch===index}"
          @click="changeTime(index)"
        >
          {{ day }}
        </div>
      </div>
    </section>
    <!-- 电影上映 -->
    <section class="seat-wrap" >
      <div class="seat-inner-wrap">
        <ul v-if="showData[movieIndex]" class="list-wrap">
          <li
            v-for="(item, index) in showData[movieIndex].filmFields[plist_index].showDates"
            :key="index"
            class="dp_wx_cinema_show_item"
            @click="selectSeat(item.fieldId,item.hallId,item.beginTime,item.language,item.hallName,item.price)"
          >
            <div class="item box-flex">
              <div class="time-block">
                <p class="begin">{{ item.beginTime }}</p>
                <div class="end">
                  {{ item.endTime }}
                  <span class="tui">散场</span>
                </div>
              </div>
              <div class="info-block textOverflow1">
                <p class="lan">{{ item.language }}</p>
                <p class="hall">{{ item.hallName }}</p>
              </div>
              <div class="price">
                <div class="sellPr">
                  <span class="d">￥</span>
                  <span class="stonefont">{{ item.price }}</span>
                </div>
              </div>
              <div class="button-block">
                <button v-if="item.enterShowSeat==0" type="button" name="button">停售</button>
                <button
                  v-else
                  type="button"
                  name="button"
                >
                  购票
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--&lt;!&ndash; 影院超值套餐 &ndash;&gt;-->
    <!--<section class="tuan-wrap">-->
    <!--<super-movies :deal-list="dealList"/>-->
    <!--</section>-->
  </div>
</template>
<script>

import TheBackHeader from '../components/TheBackHeader'
export default {
  components: {

    TheBackHeader
  },
  data () {
    return {
      cinemaId: '',
      movieId: '',
      movieIndex: 0, // 当前电影id
      showData: {},
      movies: [], // 影片介绍
      shows: [], // 日期
      cinemaData: {},
      vipInfo: [],
      plist: [],
      dealList: [],
      plist_index: 0,
      isSwitch: 0, // 日期active
      swiperOption: {
        slidesPerView: 'auto', // 两侧的张数设为auto
        spaceBetween: 30, // swiper-slide之间的空隙（margin值）
        centeredSlides: true, // 是否居中
        slideToClickedSlide: true // 点击slider会居中
      }
    }
  },
  computed: {

    swiper () {
      //   获取swiper实例里的数据，包含改变index的方法
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    cinemaId (newValue) {
      localStorage.setItem('cinemaId', JSON.stringify(newValue))
    },
    movieId (newValue) {
      localStorage.setItem('movieId', JSON.stringify(newValue))
    }
  },

  created () {
    // console.log(this.$refs.wrapper); // undefined
    // 解决
    this.$nextTick(() => {
      // Dom渲染完成后触发
      // console.log('$nextTick',this.$refs.wrapper);
    })
    // 应用场景，结合$refs属性內的对象，或者获取页面内容渲染的尺寸
    // 判断是否有传进来的参数，如果有就把参数给id，如果没有就从localStorage读参数给id
    this.cinemaId = this.$route.params.cinemaId
    this.movieId = this.$route.query.movieId

    this.getCinemaInfo()
  },
  methods: {
    getCinemaInfo () {
      this.$axios.get('/meetingFilm/cinema/getCinemaInfo', {
        params: {
          cinemaId: this.cinemaId,
          filmId: this.movieId
        }
      }).then((res) => {
        console.log(res)
        this.cinemaData = res.data.cinemaInfo
        this.showData = res.data.filmList

        // 获取当前的电影index
        this.showData.forEach((item, index) => {
          if (item.filmId === this.movieId) {
            console.log(index)
            this.movieIndex = index // 当前电影id
          }
        })
        // this.shows = res.data.filmList[this.movieIndex].filmFields
        let arr = res.data.filmList[this.movieIndex].filmFields
        let hash = []
        for (let i = 0; i < arr.length; i++) {
          if (hash.indexOf(arr[i].showDate) === -1) {
            hash.push(arr[i].showDate)
          }
        }
        for (let j = 0; j < hash.length; j++) {
          if (this.$route.query.cinemaShowDate === hash[j]) {
            this.isSwitch = j
            this.plist_index = j
          }
        }
        this.shows = hash
        // this.vipInfo = res.data.showData.vipInfo[0]
        // this.dealList = res.data.dealList.dealList // 超值套餐数据
        // this.movieIndex = res.data.movieIndex // 当前电影id
        console.log(this.movieIndex)
        // 轮播
        this.$nextTick(() => {
          this.swiper.slideTo(this.movieIndex, 1000, false)
          this.$refs.mySwiper.$on('transitionEnd', () => {
            this.movieIndex = this.swiper.snapIndex

            let arr = res.data.filmList[this.movieIndex].filmFields
            let hash = []
            for (let i = 0; i < arr.length; i++) {
              if (hash.indexOf(arr[i].showDate) === -1) {
                hash.push(arr[i].showDate)
              }
            }

            this.shows = hash
            this.movies = res.data.filmList[this.movieIndex]
          })
        })
        // 修改提交
        // this.$forceUpdate() // 迫使 Vue 实例重新渲染。
        // this.$store.commit('changeHt', this.cinemaData.nm)
      })
    },
    selectSeat (fieldId, hallId, beginTime, language, hallName, price) {
      this.$router.push({
        name: 'hallSeat',
        query: { fieldId: fieldId,
          hallId: hallId,
          filmName: this.showData[this.movieIndex].filmName,
          cinemaName: this.cinemaData.cinemaName,
          showDate: this.showData[this.movieIndex].filmFields[this.plist_index].showDate,
          showTime: beginTime,
          language: language,
          hallName: hallName,
          price: price
        }
      })
    },
    picFix (wh) {
      if (wh !== undefined) {
        return wh.replace('w.h', '65.94')
      }
    },
    // 点击图片切换影片
    switchThis (e) {
      this.movieIndex = this.swiper.snapIndex
      this.isSwitch = 0
      this.plist_index = 0
      // this.shows = this.showData[this.movieIndex].filmFields
    },
    // 日期切换
    changeTime (index) {
      this.isSwitch = index

      this.plist_index = index
    }
  }
}
</script>

<style lang="scss">
    @import '../assets/sass/cinemadetail.scss';
</style>
