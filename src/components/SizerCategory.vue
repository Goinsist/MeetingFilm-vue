<template>
  <div class="category-wrapper">
    <div class="list">
      <span
        v-for="item in list"
        :key="item.catId"
        :class="{'active': cache===item.catId}"
        class="item"
        @click="selectItem(item.catId)"
      >
        {{ item.catName }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'categories',
    event: 'change'
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      list: [],
      cache: ''
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$axios.get('/meetingFilm/film/getConditionList').then(res => {
        if (res.status === 0) {
          this.list = res.data.catInfo
        }
      })
    },
    resetCache () {
      this.cacheList = this.categories.slice()
    },
    selectItem (catId) {
      this.cache = catId
      console.log(this.cache)
      // const arr = this.cacheList.slice()
      // const idx = arr.indexOf(catId)
      // if (idx > -1) {
      //   arr.splice(idx, 1)
      // } else {
      //   arr.push(catId)
      // }
      // this.cacheList = arr
      this.$emit('change', Number(this.cache))
    }

  }
}
</script>

<style lang="stylus" scoped>
.category-wrapper
  padding 10px 25px
  .list
    display flex
    flex-wrap wrap
    .item
      padding 6px 12px
      margin: 0 10px 10px 0
      border-radius 10px
      text-align center
      font-size 43px
      height 50px
      color #777
      border 1px solid #ccc
      &.active
        border-color #faaf00
        background #faaf00
        color #fff
  .confirm-btn
    width 60px
    height 30px
    background #409eff
    color #fff
    border none
    outline none
    border-radius 3px
</style>
