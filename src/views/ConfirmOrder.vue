<template>
  <div class="app" >
    <TheBackHeader>
      <span style="font-size: 33px">支付订单</span>
    </TheBackHeader>

    <div class="demo" style="height: 43px;">
      <count-down
        style="font-size: 38px; font-family: 新宋体;padding-top: 2px"
        :start-time="Number(orderInfo.orderTimestamp)"
        :end-time="endTime"
        :day-txt="'天'"
        :hour-txt="'时'"
        :minutes-txt="'分'"
        :seconds-txt="'秒'"
        :order-id="orderId"
        @end_callback="countDownE_cb(orderId)"
      />
    </div>
    <section id="movie_detail" >
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
    <!--<div class="order">-->
    <!--<van-card-->
    <!--style="height: 200px"-->
    <!--:num="orderInfo.ticketNum"-->
    <!--:price="orderInfo.orderPrice"-->
    <!--:desc="orderInfo.fieldTime"-->
    <!--:tag="orderInfo.filmName"-->
    <!--title="订单详情"-->
    <!--:thumb="orderInfo.filmPoster"-->
    <!--&gt;-->
    <!--<div slot="tags">-->
    <!--<van-tag plain type="danger" style="height: 20px;font-size: 18px;margin-top: 10px">{{ orderInfo.cinemaName }}</van-tag>-->
    <!--<van-tag plain type="primary" style="height: 20px;font-size: 18px;margin-top: 10px;margin-left: 5px">{{ orderInfo.seatsName }}</van-tag>-->
    <!--</div>-->
    <!--</van-card>-->
    <!--</div>-->

    <div style="margin-top: 20px;">
      <h1 style="margin-left: 20px;font-size: 40px;font-weight: bolder">购票须知</h1>
      <h1 style="border-bottom: 1px solid grey;margin-top: 10px;margin-left: 35px;margin-right: 15px"/>
      <h3 style="margin-left: 25px;padding-top: 15px;color: #cccccc;font-size: 35px">1.请确认场次和时间无误,购买成功后将不予退换</h3>
      <h3 style="margin-left: 25px;padding-top: 15px;color: #cccccc;font-size: 35px">2.由于设备故障等不可抗力因素,存在少量场次取消的情况,会进行退款</h3>
      <h3 style="margin-left: 25px;padding-top: 15px;color: #cccccc;font-size: 35px">3.由于影院系统不稳定等因素,存在出票失败的情况,会进行退款</h3>
      <h3 style="margin-left: 25px;padding-top: 15px;color: #cccccc;font-size: 35px" >4.购票成功后,会收到取票短信码</h3>
      <h3 style="margin-left: 25px;padding-top: 15px;;color: #cccccc;font-size: 35px">5.下单即代表你同意《meetingFilm用户服务协议》</h3>
    </div>
    <!--<van-dialog-->
    <!--v-model="show"-->
    <!--style="width: 800px;height: 800px;font-size:50px "-->
    <!--title="扫描二维码付款"-->
    <!--show-confirm-button="false"-->
    <!--close-on-click-overlay="true"-->
    <!--&gt;-->
    <!--<van-image-->

    <!--v-if="qrCode!==''"-->
    <!--style="position: absolute;top: 100px;right: 100px;width: 600px;height: 600px"-->
    <!--:src="qrCode"-->
    <!--/>-->
    <!--</van-dialog>-->
    <van-tabbar v-model="active" style="height: 200px" >
      <van-tabbar-item @click="onSubmit">
        <span style="font-size: 50px;color: black">确认支付</span>
        <img
          slot="icon"
          slot-scope="props"
          style="width: 100px;height: 100px"
          :src="props.active ? icon.active : icon.normal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import CountDown from 'vue2-countdown'
import qs from 'qs'
import TheBackHeader from '../components/TheBackHeader'

export default {
  name: 'ConfirmOrder',

  components: {
    CountDown,
    TheBackHeader
  },
  data () {
    return {
      endTime: 0,
      active: 0,
      icon: {
        normal: '/pay.png',
        active: '/pay.png'
      },

      fieldId: this.$route.query.fieldId,
      orderId: this.$route.query.orderId,
      orderInfo: {},
      show: false,
      qrCode: ''

    }
  },
  created () {
    this.getOrderInfo()
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
    countDownE_cb (orderId) {
      alert('支付超时,交易已关闭')
    },
    getOrderInfo () {
      this.$axios.get('/meetingFilm/order/getCurrentOrderInfo', {
        params: {
          orderId: this.orderId
        }
      }).then(res => {
        console.log(res)
        this.orderInfo = res.data
        let length = res.data.fieldTime.length
        this.orderInfo.fieldTime = res.data.fieldTime.substring(0, 9) + ' ' + res.data.fieldTime.substring(length - 8, length)
        this.endTime = Number(this.orderInfo.orderTimestamp) + 600
      })
    },
    onSubmit () {
      this.show = true

      this.$axios.post('/meetingFilm/order/getPayInfo', qs.stringify({ 'orderId': this.orderId })
      ).then(res => {
        if (res.status === 0) {
          console.log(res)
          let form = res.msg
          const div = document.createElement('pay')
          div.innerHTML = form
          document.body.appendChild(div)
          document.forms[0].submit()
          console.log(this.qrCode)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../assets/sass/movie_detail.scss";
.img{
    position: relative;
}
.img  .rate{
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

    .demo{

        transition: background-color .5s;
        background: antiquewhite linear-gradient(to right, bisque, #cccccc);
    }

</style>
