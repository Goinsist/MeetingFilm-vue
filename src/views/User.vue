<template>
  <Transition name="fade">
    <div v-if="user" class="user">
      <div class="userinfo-wrapper">
        <div class="avatar">
          <img src="~common/images/user.png" width="92">
        </div>
        <div class="info">
          <span class="text">{{ user.email }}</span>
          <span class="text">{{ user.username }}</span>
        </div>
        <i class="iconfont icon-left" @click="$router.back()"/>
      </div>
      <div class="menu-wrapper">
        <ul class="menus">
          <li class="menu-item" @click="listOrders">
            <van-icon
              name="orders-o"
              style="font-size: 45px"
              :info="counts"
            />
            <span class="text" style="padding-left: 10px">我的订单</span>
            <i class="iconfont icon-right"/>
          </li>
          <li class="menu-item">
            <van-icon
              name="point-gift-o"
              style="font-size: 45px"
            />
            <span class="text" style="padding-left: 10px">优惠券</span>
            <i class="iconfont icon-right"/>
          </li>
          <li class="menu-item">
            <van-icon
              name="coupon-o"
              style="font-size: 45px"
            />
            <span class="text" style="padding-left: 10px">折扣卡</span>
            <i class="iconfont icon-right"/>
          </li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <button class="logout-btn" @click="logout">退出</button>
      </div>
    </div>
  </Transition>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      collectMovies: [],
      user: {},
      counts: 0
    }
  },

  created () {
    this.getUserInfo()
    this.getOrderCounts()
  },
  methods: {
    ...mapMutations(['changeLogin']),
    getOrderCounts () {
      this.$axios.post('/meetingFilm/order/getOrderInfo').then(res => {
        if (res.status === 0) {
          console.log(res)
          this.counts = res.totalPage
        }
      })
    },
    listOrders () {
      this.$router.push('/myorder')
    },
    getUserInfo () {
      this.$axios.get('/meetingFilm/user/getUserInfo').then(res => {
        if (res.status === 0) {
          this.user = res.data
        }
      })
    },
    logout () {
      this.$axios.get('/meetingFilm/user/logout').then(res => {
        if (res.status === 0) {
          this.changeLogin({ Authorization: '' })
          this.$router.push('/')
        }
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
.user
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 10
  background #fff
  .userinfo-wrapper
    display flex
    justify-content center
    align-items center
    height 175px
    background url('~common/images/background.jpg') no-repeat
    background-size cover
    .avatar
      display flex
      align-items center
      justify-content center
      width 87px
      height 87px
      background #eee
      border-radius 50%
    .info
      display flex
      flex-direction column
      padding-left 10px
      font-size 38px
      color #fff
      .text
        flex 1
        line-height 53px
    .icon-left
      position absolute
      top 60px
      left 20px
      font-size 45px
      color #fff
  .menu-wrapper
    .menus
      padding-left 10px
      .menu-item
        padding 10px
        font-size 48px
        line-height 65px
        list-style none
        border-bottom 1px solid #d8d8d8
        color #333
        .iconfont
          vertical-align text-bottom
          font-size 85px
          color #999
          margin-right 8px
        .count
          float right
          margin-right 15px
          color #999
          font-size 45px
        .icon-right
          font-size 40px
          float right
  .btn-wrapper
    padding 20px
    .logout-btn
      width 100%
      height 78px
      line-height 78px
      font-size 58px
      border none
      border-radius 48px
      color #fff
      background-color #f13900
      outline none
.fade-enter-active, .fade-leave-active
  transition all .5s
.fade-enter, .fade-leave-to
  transform translateX(100%)
</style>
