<template lang="html">
  <div v-if="detailmovie.length!==0" id="movie_detail_wrapper">
    <TheBackHeader>
      <span>{{ detailmovie.filmName }}</span>
    </TheBackHeader>
    <section id="movie_detail">
      <div class="movie-fliter"/>

      <div v-if="detailmovie.filmPoster" class="img_bg" :style="{backgroundImage: `url(${detailmovie.filmPoster})`}"/>
      <div v-else class="img_bg" :style="{backgroundImage: `url(${picFix(detailmovie.filmPoster)})`}"/>

      <div class="movie_content" @click="Tomovie(detailmovie.filmId)">
        <img class="movie_content_img" :src="picFix(detailmovie.filmPoster)" alt="">
        <div class="content-wrapper">
          <!-- <h1 class="musicName" v-if="detailmovie.musicName">{{detailmovie.musicName}}</h1> -->
          <h1 class="musicName">{{ detailmovie.filmName }}</h1>
          <p class="musicName_engish">{{ detailmovie.filmEnName }}</p>
          <div class="movie_info textOverflow1">
            <h3 v-if="detailmovie.filmStatus==='1'||detailmovie.filmStatus==='3'">观众评分:{{ detailmovie.filmScore }}</h3>
            <h3 v-if="detailmovie.filmStatus==='2'">{{ detailmovie.filmPreSaleNum }}想看</h3>
            <div class="icon_text_info">
              <strong>{{ detailmovie.filmCatName }}</strong>
              <span v-if="detailmovie.filmType =='3'" class="icon" :class="{'active2': detailmovie.filmType =='3'}"/>
              <span v-else class="icon" :class="{'active1': detailmovie.filmType =='4'}"/>
            </div>
            <p class="movie_dur">{{ detailmovie.filmSourceName }}/{{ detailmovie.filmLength }}分钟</p>
            <p class="time">{{ detailmovie.filmTime }}</p>
          </div>
        </div>
        <div class="arrow-g">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAS5JREFUOBGVkktuwkAMhpOoJ+hhSouE2HbDgiVCNCAOVtQHnINHhbgMJ6g6/f9gR848kmDJeOzxZ3scskzEOfcKXUMLjXXZByYQhJlqMvz3PM//1E9Z7fJoEp5wXvWZoILRZQtg7xVYdhXQzuR2XoEB/NYCOSkVdKI/g441BnuBbmI7aMAE7ilgxyaboYOD4RMO9EWiTwhgJksBLtEvUNolRmGvwJG+yDNsXSB4s2aplR3M4Y80BnuGfiQ7m0Q2qP6JJvaLc/VpTKx5lPe9IfpibviMb+4lOXYXyGLRsRPgSTsSpASdW8Av+YQ3Er+NzgIuELdvZMcAZIUaBsgpCA55IZIEeV+NLSC32hskXCTAH9xFRyWkUsgSrhqAJfjpL8fch0dMMIGWMkmYEIn8Az5Wgp5LHlhmAAAAAElFTkSuQmCC" alt="">
        </div>
      </div>
    </section>
    <!-- 日期 -->
    <section v-if="showDays.length" id="showDays">
      <div class="timeLine">
        <div
          v-for="(day, index) in showDays"
          :key="day.id"
          class="showday"
          :class="{isActive:day_index === index}"
          @click="changeTime(day,index)"
        >
          {{ day }}
        </div>
      </div>
    </section>
    <!-- 上映地点等信息 -->
    <section id="list-wrap">
      <ul v-infinite-scroll="loadMore" class="list-wrap-list">
        <li
          v-for="(cinema, index) in cinema"
          :key="index"
          class="list-wrap-item"
          @click="cinemaDetail(cinema.cinemaId)"
        >
          <div class="name">
            <h1 class="nm">{{ cinema.cinemaName }}</h1>
            <p><span>{{ cinema.filmMinPrice }}</span>元起</p>
          </div>
          <div class="address clearfix">
            <p class="addr textOverflow1">{{ cinema.cinemaAddress }}</p>
          </div>
          <!--<div class="cardPromotionTag">-->
          <!--<span v-if="movie.promotion.cardPromotionTag" class="icon"/>-->
          <!--<span v-if="movie.promotion.cardPromotionTag" class="lijian textOverflow1">{{ movie.promotion.cardPromotionTag }}</span>-->
          <!--</div>-->
          <div class="showTimes" >
            <span> 近期场次：{{ cinema.filmRound | format }}</span>
          </div>
        </li>
      </ul>
      <!-- loading 加载组件 -->
      <mt-spinner color="rgb(100, 100, 100)" type="fading-circle" class="loading"/>
    </section>
  </div>
</template>

<script>

import TheBackHeader from '../components/TheBackHeader'
export default {
  components: {

    TheBackHeader
  },
  filters: {
    format: function (value) {
      if (value.indexOf(',') !== -1) {
        let values = value.replace(',', ' | ')
        return values
      }
      return value
    }
  },
  data () {
    return {
      movieId: '',
      pageIndex: '1',
      pageSize: '5',
      detailmovie: {}, // 电影详情
      cinema: [], // 电影上映日期等
      day_m: '',
      offset: 0, // 请求数据数量
      showDays: [],
      ciId: '',
      day_index: 0 // 切换日期索引
    }
  },
  watch: {

    '$route' (to, from) {
      this.$router.go(0)
    }
  },

  created () {
    // this.day_m = this.format();
    // 判断是否有传进来的参数，如果有就把参数给id，如果没有就从localStorage读参数给id
    this.$store.state.showNav = true
    this.movieId = this.$route.params.id

    // 电影信息详情
    this.$axios
      .get('/meetingFilm/film/beforeAddFilm', {
        params: {
          filmId: String(this.movieId)

        }
      })
      .then(res => {
        console.log(res.data)
        this.detailmovie = res.data
        this.detailmovie.filmEnName = res.data.filmName.substring(res.data.filmName.indexOf('(') + 1, res.data.filmName.indexOf(')'))
        this.detailmovie.filmName = res.data.filmName.substring(0, res.data.filmName.indexOf('('))
        this.detailmovie.filmTime = res.data.date2.substring(0, 10) + '大陆上映'
        this.detailmovie.filmCatName = ''
        for (let j = 0; j < res.data.filmCat.length; j++) {
          for (let k = 0; k < res.data.filmCats.length; k++) {
            if (res.data.filmCat[j] === res.data.filmCats[k].catId) {
              this.detailmovie.filmCatName += res.data.filmCats[k].catName + ','
            }
          }
        }
        this.detailmovie.filmCatName = this.detailmovie.filmCatName.substring(0, this.detailmovie.filmCatName.length - 1)
        for (let i = 0; i < res.data.filmSources.length; i++) {
          if (res.data.filmSource === res.data.filmSources[i].sourceId) {
            this.detailmovie.filmSourceName = res.data.filmSources[i].sourceName
          }
        }
        console.log(this.detailmovie.filmEnName)

        // 日期接口
        this.showDays.push(res.data.filmTime.substring(0, 10))
        console.log(this.showDays)
        // 修改提交
        // this.$forceUpdate() // 迫使 Vue 实例重新渲染。
        // this.$store.commit('changeHt', this.detailmovie.nm)
        this.format()
        this.post_move(this.showDays[0])
      })
    // this.$forceUpdate() // 迫使 Vue 实例重新渲染。
  },

  methods: {
    // 设置图片大小
    picFix (wh) {
      if (wh !== undefined) {
        return wh.replace('w.h', '110.150')
      }
    },
    post_move (param) {
      let releaseDate = param.split(' ')[1]
      let nowYear = new Date(releaseDate).getFullYear()
      console.log('点击日期: ' + new Date(releaseDate).getMonth())
      let nowMonth = new Date(releaseDate).getMonth() + 1
      if (nowMonth < 10) {
        nowMonth = '0' + nowMonth
      }
      let nowDay = new Date(releaseDate).getDate()
      if (nowDay < 10) {
        nowDay = '0' + nowDay
      }
      releaseDate = nowYear + '-' + nowMonth + '-' + nowDay
      // 影院信息
      this.$axios
        .get(
          '/meetingFilm/cinema/getCinemasByFilmId',
          {
            params: {

              filmId: String(this.movieId),
              releaseDate: releaseDate,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize

            }
          }
        )
        .then(res => {
          console.log(res)
          // 判断请求结果，如果影院为空，就代表当天无上映，需要再次请求。
          if (res.status === 0) {
            console.log(res.data)
            this.cinema = this.cinema.concat(res.data)
            this.cinema = res.data
          } else {
            console.log('请求失败')
          }
        })
    },
    // 到底刷新
    // loadMore () {
    //   this.offset += 20
    //   this.post_move(this.day_m, this.offset, this.ciId)
    // },
    cinemaDetail (cinemaId) {
      this.$router.push({
        name: 'cinemadetail',
        params: {
          cinemaId: cinemaId

        },
        query: { movieId: this.movieId, cinemaShowDate: this.day_index }
      })
    },
    format () {
      let date = new Date()
      let resentYear = new Date(this.showDays[0]).getFullYear() // 年

      let resentMonth = new Date(this.showDays[0]).getMonth() + 1 // 月
      console.log(resentMonth)
      let resentDay = new Date(this.showDays[0]).getDate() // 日
      let nowYear = date.getFullYear() // 获取当前年
      let nowMonth = date.getMonth() + 1 // 获取当前月

      let nowDay = date.getDate() // 获取当前日

      let time = new Date(resentYear, resentMonth, 0)
      let days = time.getDate() // 获取当前月的总天数
      let isover = false // 判断当月天数是否超了
      // 判断电影上映的那天是否为今天
      if (
        resentYear === nowYear &&
                resentMonth === nowMonth &&
                resentDay === nowDay
      ) {
        if (days - resentDay >= 7) {
          for (let i = 0; i < 7; i++) {
            //    let resentTimeLine = (resentYear+'-'+resentMonth+'-'+(resentDay+i))
            if (i === 0) {
              continue
            }
            if (i === 1) {
              this.showDays[0] = '今天 ' + this.showDays[0]
              this.showDays.push(
                '明天 ' +
                                    resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    (resentDay + i)
              )
            } else if (i === 2) {
              this.showDays.push(
                '后天 ' +
                                    resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    (resentDay + i)
              )
            } else {
              let week = this.week(
                new Date(
                  resentYear +
                                        '-' +
                                        resentMonth +
                                        '-' +
                                        (resentDay + i)
                ).getDay()
              )
              this.showDays.push(
                week + ' ' +
                                    resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    (resentDay + i)
              )
            }
          }
        } else {
          for (var i = 1; i < 7; i++) {
            resentDay++
            if (resentDay > days && isover === false) {
              isover = true
              resentDay = 1
              resentMonth += 1
              if (resentMonth > 12) {
                resentMonth = 1
                resentYear += 1
              }
            }
            if (i === 1) {
              // let resentTimeLine1 = (resentYear+'-'+resentMonth+'-'+resentDay)
              this.showDays[0] = '今天 ' + this.showDays[0]
              this.showDays.push(
                '明天 ' +
                                    resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    resentDay
              )
            } else if (i === 2) {
              this.showDays.push(
                '后天 ' +
                                    resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    resentDay
              )
            } else {
              var week = this.week(
                new Date(
                  resentYear +
                                        '-' +
                                        resentMonth +
                                        '-' +
                                        resentDay
                ).getDay()
              )
              this.showDays.push(
                week + ' ' +
                                    resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    resentDay
              )
            }
          }
        }
      } else if (
        new Date(this.showDays[0]).getTime() < new Date().getTime()
      ) {
        // 电影上映的那天比今天早
        this.showDays.length = 0
        if (days - nowDay >= 7) {
          for (let i = 1; i < 7; i++) {
            if (i === 1) {
              this.showDays.push(
                '今天 ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    nowDay
              )
              this.showDays.push(
                '明天 ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    (nowDay + i)
              )
            } else if (i === 2) {
              this.showDays.push(
                '后天 ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    (nowDay + i)
              )
            } else {
              let week = this.week(
                new Date(
                  nowYear +
                                        '-' +
                                        nowMonth +
                                        '-' +
                                        (nowDay + i)
                ).getDay()
              )
              this.showDays.push(
                week + ' ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    (nowDay + i)
              )
            }
          }
        } else {
          for (let i = 1; i < 7; i++) {
            nowDay++
            if (nowDay > days && isover === false) {
              isover = true
              nowDay = 1
              nowMonth += 1
              if (nowMonth > 12) {
                nowMonth = 1
                nowYear += 1
              }
            }
            if (i === 1) {
              this.showDays.push(
                '今天 ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    (nowDay - 1)
              )
              this.showDays.push(
                '明天 ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    nowDay
              )
            } else if (i === 2) {
              this.showDays.push(
                '后天 ' +
                                    nowYear +
                                    '-' +
                                    nowMonth +
                                    '-' +
                                    nowDay
              )
            } else {
              let week = this.week(
                new Date(
                  nowYear + '-' + nowMonth + '-' + nowDay
                ).getDay()
              )
              this.showDays.push(
                week + nowYear + '-' + nowMonth + '-' + nowDay
              )
            }
          }
        }
      } else {
        // 电影上映的那天比今天晚
        if (days - resentDay >= 7) {
          for (let i = 1; i < 7; i++) {
            if (i === 1) {
              this.showDays[0] = this.showDays[0]
            }
            let week = this.week(
              new Date(
                resentYear +
                                    '-' +
                                    resentMonth +
                                    '-' +
                                    (resentDay + i)
              ).getDay()
            )
            this.showDays.push(
              week +
                                resentYear +
                                '-' +
                                resentMonth +
                                '-' +
                                (resentDay + i)
            )
          }
        } else {
          for (let i = 1; i < 7; i++) {
            resentDay++
            if (resentDay > days && isover === false) {
              isover = true
              resentDay = 1
              resentMonth += 1
              if (resentMonth > 12) {
                resentMonth = 1
                resentYear += 1
              }
            }
            if (i === 1) {
              this.showDays[0] = this.showDays[0]
            }
            let week = this.week(
              new Date(
                resentYear + '-' + resentMonth + '-' + resentDay
              ).getDay()
            )
            this.showDays.push(
              week +
                                resentYear +
                                '-' +
                                resentMonth +
                                '-' +
                                resentDay
            )
          }
        }
      }
    },
    // 处理周
    week (week) {
      switch (week) {
        case 0:
          return '周日'

        case 1:
          return '周一'

        case 2:
          return '周二'

        case 3:
          return '周三'

        case 4:
          return '周四'

        case 5:
          return '周五'

        case 6:
          return '周六'
      }
    },
    // 时间切换,渲染其他影院信息
    changeTime (param, index) {
      this.day_index = index

      this.post_move(param)
    },
    //    跳转到电影详情
    Tomovie (id) {
      this.$router.push({
        name: 'movies',
        params: {
          movieId: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/movie_detail.scss";

.fade-enter-active {
    transition: transform 0.8s;
}
.fade-enter {
    transform: translateX(-100%);
    opacity: 0;
}
.loading {
    position: absolute;
    left: 50%;
    bottom: -20px;
    transform: translateX(-50%);
}
.arrow-g {
    position: absolute;
    width: 10px;
    height: 16px;
    right: 15px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    img {
        width: 100%;
        display: block;
    }
}
</style>
