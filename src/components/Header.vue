<template>
  <div id="header">
    <!-- <div class="back" v-show="showLeft" @click="backClick"> 返回</div> -->
    <slot name="leftView"><i class="iconfont icon-left" @click="$router.back()"/></slot>
    <slot name="titleView"><div class="title">{{ this.$route.query.cinemaName }}</div></slot>

    <slot/>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    showLeft: Number,
    titleText: String,
    rightText: String
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped="scoped">
	#header{
		position: fixed;
		display: flex;
		top: 0;
		align-items: center;
		justify-content: center;
		background: linear-gradient(to right, #6F50F5,#C26DFE);
		height: 81px;
		width: 100%;
		color: white;
	}
	.back{
		width: 140px;
		height: 100%;
		text-align: center;
		line-height: 81px;
		font-size: 25px;
	}
	.backImage{
		margin-left: -70px;
		margin-top: 26px;
		width: 14px;
		height: 28px;
	}
	.title{
		width: 470px;
		height: 100%;
		text-align: center;
		font-size: 30px;
		line-height: 81px;
	}
  .right{
    width: 130px;
    height: 100%;
    text-align: center;
    padding-right: 12px;
    font-size: 30px;
		line-height: 81px;
		color: white
  }
	.iconfont {
		position: absolute;
		left: 10px;
		font-size: 25px
	}
	/*.back-header {*/
		/*position: fixed;*/
		/*top: 0;*/
		/*display: flex;*/
		/*align-items: center;*/
		/*justify-content: center;*/
		/*width: 100%;*/
		/*height: 56px;*/
		/*color: #fff;*/
		/*background: $ theme-color;*/
		/*text-align: center*/
	/*}*/
</style>
