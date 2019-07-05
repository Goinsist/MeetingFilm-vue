<template>
  <div id="app" >
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
    <div class="order">
      <van-card
        style="height: 200px"
        :num="orderInfo.ticketNum"
        :price="orderInfo.orderPrice"
        :desc="orderInfo.fieldTime"
        :tag="orderInfo.filmName"
        title="订单详情"
        :thumb="orderInfo.filmPoster"
      >
        <div slot="tags">
          <van-tag plain type="danger" style="height: 20px;font-size: 18px;margin-top: 10px">{{ orderInfo.cinemaName }}</van-tag>
          <van-tag plain type="primary" style="height: 20px;font-size: 18px;margin-top: 10px;margin-left: 5px">{{ orderInfo.seatsName }}</van-tag>
        </div>
      </van-card>
    </div>

    <van-panel title="购票须知" status="须知" >
      <van-cell-group>
        <van-cell style="font-size: 20px;height: 50px" value="1.请确认场次和时间无误,购买成功后将不予退换" />
        <van-cell style="font-size: 20px;height: 50px" value="2.由于设备故障等不可抗力因素,存在少量场次取消的情况,会进行退款" />
        <van-cell style="font-size: 20px;height: 50px" value="3.由于影院系统不稳定等因素,存在出票失败的情况,会进行退款" />
        <van-cell style="font-size: 20px;height: 50px" value="4.购票成功后,会受到取票码短信" />
        <van-cell style="font-size: 20px;height: 50px" value="5.下单即代表你同意《meetingFilm服务协议》" />
      </van-cell-group>
    </van-panel>
    <div class="submit">
      <van-submit-bar
        style="height: 36px"
        :price="Number(orderInfo.orderPrice)*100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
    <van-dialog
      v-model="show"
      title="扫描二维码付款"
      :confirm="countDownE_cb"
    >
      <van-image
        v-if="qrCode!==''"
        style="left: 20%"
        :src="qrCode"
      />
    </van-dialog>
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
        this.endTime = Number(this.orderInfo.orderTimestamp) + 600
      })
    },
    onSubmit () {
      this.show = true

      this.$axios.post('/meetingFilm/order/getPayInfo', qs.stringify({ 'orderId': this.orderId })
      ).then(res => {
        console.log(res)
        this.qrCode = res.data.qRCodeAddress
        console.log(this.qrCode)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.order >>> .van-image__img{
  height 300px
  width 200px
}
.order >>> .van-card__content{
  margin-left 150px
  margin-top 30px
  height 200px
}
.order >>> .van-card__title{

  height 40px
  /*line-height 50px*/
  font-size 20px
}
.order >>> .van-card__desc{
  height 40px
  font-size 20px
}
.order >>> .van-card__price{
  margin-top 35px
  font-size 40px
}
.submit >>> span{
font-size 40px
}
.submit >>> .van-button{
  margin-right 20px
  width 180px
}

    .demo{

        transition: background-color .5s;
        background: antiquewhite linear-gradient(to right, bisque, #cccccc);
    }

</style>
