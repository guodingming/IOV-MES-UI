<template>
	<div class="headBreadcrumb">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: item.path }" v-for="item in data" :key="item.id" v-if="item.name">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

  	
<script>
	export default {
		created() {
			this.data = this.$route.matched||[]
		},
		data() {
			return {
				data:[]
			};
		}
	};
</script>


<style scoped>
	.headBreadcrumb{
		height:60px;
		width:100%;
		padding:23px 25px;
		border-bottom:1px solid rgb(220,220,220);
	}
</style>
