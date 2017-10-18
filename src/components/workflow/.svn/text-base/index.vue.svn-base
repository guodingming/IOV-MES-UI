<template>
	<div ref="demo" class="demo">

	</div>
</template>
<script>
	import GooFlow from "./workflow"
	export default {
		props: ['data','option'],
		mounted() {
			this.wf = new GooFlow($(this.$refs.demo), this.option);
			this.wf.onSaveClick = () => {
				this.$emit('on-save');
			}
			this.wf.onCloseClick = () => {
				this.$emit('on-close');
			}
			if(this.data&&JSON.parse(this.data)){
				this.wf.loadData(JSON.parse(this.data))
			}
		},
		methods:{
			exportData(){
				return JSON.stringify(this.wf.exportData())
			},
			exportXml(){
				return this.wf.exportXml()
			}
		}
	};
</script>

<style>
	.demo {
		height: 100%;
		width: 100%
	}
</style>