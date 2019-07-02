<template>
  <div class="type-wrapper">
    <div
      v-for="item in types"
      :key="item.name"
      class="item"
      :class="{'active': status === item.type}"
      @click="selectItem(item)"
    >
      <i class="iconfont icon-dui"/>
      <span class="text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      types: [

        { name: '正在热映', type: 1 },
        { name: '即将上映', type: 2 },
        { name: '经典电影', type: 3 }
      ]
    }
  },
  methods: {
    selectItem (item) {
      console.log(item)
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.type-wrapper
  display flex
  flex-direction column
  background #fff
  .item
    position relative
    flex 1
    line-height 40px
    margin 0 30px
    color #333
    border-bottom 1px solid #e5e5e5
    .icon-dui
      display none
      position absolute
      left -25px
    &.active
      color #faaf00
      .icon-dui
        display inline
</style>
