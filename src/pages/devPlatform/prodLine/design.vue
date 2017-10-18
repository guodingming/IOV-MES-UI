<template>
	<div class="wf" v-if="show" v-scroll>
		<workflow @on-close="close" @on-save="save" :data="rowData.workflowShowJson" :option="option"  ref="wf"></workflow>
	</div>
</template>

<script>
	import workflow from "@/components/workflow";
	import {
		edit,
		getTool
	} from "./service";
	export default {
		components: {
			workflow
		},
		data() {
			return {
				show: false,
				data: []
			}
		},
		methods: {
			async getPage(data) {
				this.rowData = data
				let tool = await getTool({projectId:data.id})
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
				edit({
					id: this.rowData.id,
					wfCode: this.rowData.id,
					workflowShowJson: this.$refs.wf.exportData(),
					workflowRunXml: this.$refs.wf.exportXml()
				}).then((res) => {
					this.$parent.queryData()
				});
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