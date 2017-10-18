<template>
	<div id="dashboard">
		<orgchart :data="data" v-if="data"></orgchart>
	</div>
</template>

<script>
	import orgchart from "@/components/orgchart";
	import {getTree} from "./service";
	export default {
		components: {
			orgchart
		},
		created(){
  			this.getTree()
		},
		data(){
			return{
				data:false
			}
		},
		methods: {
			async getTree(){
				let res = await getTree();
				if(res.status=="success"){
					this.data = this.process(res.content||[])
				}
				else{
					this.data = this.process([])
				}
			},
			process(data){
				let i = 0
				function changeId(data){
					data.forEach((val)=>{
						val.dataId = val.id
						val.id = i
						i++
						if(val.children){
							changeId(val.children)
						}
					})
				}
				changeId(data)
				return {
					id:"1_dashboard",
					name:"仪表盘",
					children:data
				}
			}
			
		}
	}
</script>

<style scoped>
</style>
