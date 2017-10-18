<template>
	<div class="wf" v-if="show" v-scroll>
		<workflow @on-close="close" :data="data" ref="wf" :option="option"></workflow>
	</div>
</template>

<script>
	import workflow from "@/components/workflow";
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
			getPage(data) {
				this.data = data.workflowShowJson
				this.option = {
					toolHide: true,
					headtool: ["check","exit"]
				}
				this.show = true
			},
			close() {
				this.show = false
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