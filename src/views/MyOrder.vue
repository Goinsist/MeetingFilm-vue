<template>
  <div>
    <van-nav-bar
      style="height: 56px"
      title="支付订单"
      left-text="返回"
      fixed="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div
      v-for="(orderInfo) in orders"
      :key="orderInfo.orderId"
    >
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyOrder',

  data () {
    return {
      orders: []
    }
  },

  created () {
    this.listOrderInfo()
  },
  methods: {
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

<style scoped>
    .van-nav-bar__title{
        height: 56px;
        padding-top: 5px;
    }
</style>
