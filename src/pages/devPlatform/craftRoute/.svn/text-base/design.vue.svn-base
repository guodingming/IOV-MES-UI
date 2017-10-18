<template>
	<div class="wf" v-if="show" v-scroll>
		<workflow @on-close="close" @on-save="save" :data="data" :option="option" ref="wf"></workflow>
	</div>
</template>

<script>
	import workflow from "@/components/workflow";
	import {
		designQueryData,
		designSave,
		getTool
	} from "./service";
	export default {
		components: {
			workflow
		},
		data() {
			return {
				show: false,
				data: [],
			}
		},
		methods: {
			async getPage(data) {
				let res = await designQueryData({
					workOrderId: data.id
				})
				if(res.content.length > 0) {
					this.data = res.content[0].workflowShowJson
					this.id = res.content[0].id
				} else {
					this.$message({
						type: 'info',
						message: '该工单下无工艺路径'
					});
				}
				let tool = await getTool({projectId:data.projectId})
				this.option = {
					toolNodes: this.processTool(tool.content),
					row: data
				}
				this.show = true
			},
			close() {
				this.show = false
			},
			save() {
				designSave({
					id: this.id,
					workflowShowJson: this.$refs.wf.exportData(),
					workflowRunXml: this.$refs.wf.exportXml()
				}).then((res) => {});
			},
			processTool(tool=[]){
				tool.forEach((val)=>{
					val.open = true
					val.isParent = true
				})
				return tool
			}
		}
	}
</script>

<style>
	.wf {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 999;
	}
</style>