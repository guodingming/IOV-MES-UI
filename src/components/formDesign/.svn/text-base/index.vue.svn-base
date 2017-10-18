<template>
	<div ref="demo" class="demo">
		
	</div>
</template>
<script>
	import FormDesign from "./src/index"
	export default {
		props: ['option'],
		mounted(){
			let fd = new FormDesign($(this.$refs.demo),this.option)
			fd.callback = {
				onSaveClick : (data) => {
					this.$emit('on-save',data);
				},
				onCloseClick : () => {
					this.$emit('on-close');
				}
			}
			let obj = {
				type:"base",
				name:"label",
				text: "标签",
				template:
				`<span class="mes__formDesign_label" style="">文字示例</span>`
			}
			fd.registerPlugin(obj)
			fd.init()
		}
	};
</script>


<style scoped>
	.demo{
		height:100%;
		width:100%;
	}
</style>
