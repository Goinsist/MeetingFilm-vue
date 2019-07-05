<template>
  <van-tabbar style="height: 126px">
    <van-tabbar-item v-model="activeIndex" @click="goIndex" >
      <span style="font-size: 20px;color: grey">首页</span>
      <img
        slot="icon"
        slot-scope="props"
        style="width: 50px;height: 50px"
        :src="props.activeIndex===1 ? indexIcon.active : indexIcon.normal"
      >
    </van-tabbar-item>
    <van-tabbar-item v-model="activeMy" @click="goUser">
      <span style="font-size: 20px;color: grey">我的</span>
      <img
        slot="icon"
        slot-scope="props"
        style="width: 50px;height: 50px"
        :src="props.activeMy===1 ? myIcon.active : myIcon.normal"
      >
    </van-tabbar-item>

    <!--<van-tabbar-item style="font-size: 21px" name="home" icon="home-o" @click="$router.push('/recommend')">电影</van-tabbar-item>-->
    <!--<van-tabbar-item style="font-size: 21px" name="user" icon="user-o" @click="$router.push('/user')">我的</van-tabbar-item>-->
  </van-tabbar>
</template>

<script>
export default {
  name: 'FooterVue',
  data () {
    return {

      activeIndex: 0,
      activeMy: 0,
      indexIcon: {
        normal: '/index.png',
        active: '/index-select.png'
      },
      myIcon: {
        normal: '/my.png',
        active: '/my-select.png'
      }
    }
  },
  methods: {
    goIndex () {
      this.activeIndex = 1
      this.$router.push('/recommend')
    },
    goUser () {
      this.activeMy = 1
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped>

</style>
