<template>
	<div class="echarts" ref="echarts">

	</div>
</template>

<script>
	import echarts from "assets/echarts/echarts.min"
	export default {
		props:["option"],
		mounted() {
			this.chart = echarts.init(this.$refs.echarts);
			this.chart.setOption(this.option)
		},
		watch:{
			option(curVal,oldVal){
				this.chart.setOption(curVal)
			}
		},
		data() {
			return {
				chart:null
			};
		}
	};
</script>

<style scoped>
	.echarts {
		height: 100%;
		width: 100%
	}
</style>