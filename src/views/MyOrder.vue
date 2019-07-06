<template>
  <div>
    <TheBackHeader>
      <span style="font-size: 33px">我的订单</span>
    </TheBackHeader>
    <div
      v-for="(orderInfo) in orders"
      :key="orderInfo.orderId"
    >
      <section id="movie_detail" style="margin-top: 30px" >
        <div class="movie-fliter"/>
        <div class="img">
          <div v-if="orderInfo.filmPoster" class="img_bg" :style="{backgroundImage: `url(${orderInfo.filmPoster})`}"/>
          <em v-if="orderInfo.filmPoster" style="font-size: 39px" class="rate">
            {{ orderInfo.filmName }}
          </em>
        </div>
        <div class="movie_content" @click="Tomovie(orderInfo.filmId)">
          <img class="movie_content_img" :src="picFix(orderInfo.filmPoster)" alt="">
          <div class="content-wrapper" style="margin-left: 50px">
            <!-- <h1 class="musicName" v-if="detailmovie.musicName">{{detailmovie.musicName}}</h1> -->
            <h1 class="musicName">订单详情:</h1>
            <p
              class="showTime"
              style="margin-top: 20px;
                font-size: 42px;
                opacity: .8;"
            >
              {{ orderInfo.fieldTime }}
            </p>
            <div class="movie_info textOverflow1">
              <h3 style="margin-top: 30px">{{ orderInfo.cinemaName }}</h3>
              <h3 style="margin-top: 30px">{{ orderInfo.seatsName }}</h3>
              <p style="position: absolute;right: 5px;bottom: 5px;font-size: 50px">X{{ orderInfo.ticketNum }}</p>

              <p class="time" style="position: absolute;right:450px;bottom: 20px">￥{{ orderInfo.orderPrice }}</p>
            </div>
          </div>
        </div>
      </section>
      <!--<van-card-->
      <!--:num="orderInfo.ticketNum"-->
      <!--:price="orderInfo.orderPrice"-->
      <!--:desc="orderInfo.fieldTime"-->
      <!--:tag="orderInfo.filmName"-->
      <!--title="订单详情"-->
      <!--:thumb="orderInfo.filmPoster"-->
      <!--&gt;-->
      <!--<div slot="tags">-->
      <!--<van-tag plain type="danger">{{ orderInfo.cinemaName }}</van-tag>-->
      <!--<van-tag plain type="primary">{{ orderInfo.seatsName }}</van-tag>-->
      <!--</div>-->
      <!--</van-card>-->
    </div>
  </div>
</template>

<script>
import TheBackHeader from '../components/TheBackHeader'
export default {
  name: 'MyOrder',
  components: {

    TheBackHeader
  },

  data () {
    return {
      orders: []
    }
  },

  created () {
    this.listOrderInfo()
  },
  methods: {
    // 设置图片大小
    picFix (wh) {
      if (wh !== undefined) {
        return wh.replace('w.h', '110.150')
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    listOrderInfo () {
      this.$axios.post('/meetingFilm/order/getOrderInfo').then(res => {
        if (res.status === 0) {
          console.log(res.data)
          this.orders = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/sass/movie_detail.scss";
  .rate{
    position: absolute;
    left: 15px;
    top: 20px;
    border: 2px solid red;
    border-bottom-right-radius: 30px ;
    border-top-right-radius: 30px;
    background-color: red;
    font-size: 45px!important;
    color: white;
    font-family: 隶书;

  }
</style>
