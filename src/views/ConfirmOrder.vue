<template>
  <div id="app" >
    <van-nav-bar
      style="height: 56px"
      title="支付订单"
      left-text="返回"
      fixed="true"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="demo" style="height: 23px;">
      <count-down
        style="font-size: 18px; font-family: 新宋体;padding-top: 2px"
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

    <van-card
      :num="orderInfo.ticketNum"
      :price="orderInfo.orderPrice"
      :desc="orderInfo.fieldTime"
      :tag="orderInfo.filmName"
      title="订单详情"
      :thumb="orderInfo.filmPoster"
    >
      <div slot="tags">
        <van-tag plain type="danger">{{ orderInfo.cinemaName }}</van-tag>
        <van-tag plain type="primary">{{ orderInfo.seatsName }}</van-tag>
      </div>
    </van-card>
    <van-panel title="购票须知" status="须知" >
      <van-cell-group>
        <van-cell value="1.请确认场次和时间无误,购买成功后将不予退换" />
        <van-cell value="2.由于设备故障等不可抗力因素,存在少量场次取消的情况,会进行退款" />
        <van-cell value="3.由于影院系统不稳定等因素,存在出票失败的情况,会进行退款" />
        <van-cell value="4.购票成功后,会受到取票码短信" />
        <van-cell value="5.下单即代表你同意《meetingFilm服务协议》" />
      </van-cell-group>
    </van-panel>
    <van-submit-bar
      :price="Number(orderInfo.orderPrice)*100"
      button-text="提交订单"
      @submit="onSubmit"
    />
    <van-dialog
      v-model="show"
      title="扫描二维码付款"
      :confirm="countDownE_cb"
    >
      <van-image
        v-if="qrCode!==''"
        style="margin-left: 20%"
        :src="qrCode"
      />
    </van-dialog>
  </div>
</template>

<script>
import CountDown from 'vue2-countdown'
import qs from 'qs'

export default {
  name: 'ConfirmOrder',

  components: {
    CountDown
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

    .demo{

        transition: background-color .5s;
        background: antiquewhite linear-gradient(to right, bisque, #cccccc);
    }

</style>
