<template>
	<div id="dataAnalysis">
		<mes-nav-bar :nav-data="data"></mes-nav-bar>
	</div>
</template>

<script>
	export default {
		created(){
  			let data = this.$store.getters.menu.filter((val)=>{
  				return val.url == "/dataAnalysis"
  			})
  			this.data = data[0].children||[]
		},
		data(){
			return{
			}
		}
	}
</script>

<style scoped>
</style>
