<template>
	<div class="form" v-if="show">
		<formDesign @on-close="close" @on-save="save" :option="option"></formDesign>
	</div>
</template>

<script>
	import formDesign from "@/components/formDesign";
	import {
		edit
	} from "./service";
	export default {
		components: {
			formDesign
		},
		data() {
			return {
				show: false,
				option: {}
			}
		},
		mounted() {

		},
		methods: {
			getPage(data) {
				this.id = data.id
				this.option = {
					formId: data.id,
					title: data.name,
					html: data.html,
					javascript: data.javascript,
					height: data.height,
					width: data.width
				}
				this.show = true
			},
			close() {
				this.show = false
				window.location.reload()
			},
			save(data) {
				edit({
					id: this.id,
					html: data.html,
					javascript: data.javascript,
					width: data.width,
					height: data.height
				}).then((res) => {
					this.$parent.queryData();
				});
			}
		}
	}
</script>

<style scoped>
	.form {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 999;
	}
</style>