<template>
	<el-dialog title="素材预览" :visible.sync="show" size="tiny" :close-on-click-modal="false">
		<img :src="form.image" />
		<span slot="footer" class="dialog-footer">
		    <el-button @click="show = false">确 定</el-button>
		  </span>
	</el-dialog>

</template>

<script>
	import {
	} from "./service";

	class Form {
		constructor(data={}) {
			this.image = data.image;
		}
	}

	export default {
		data() {
			return {
				show: false,
				form: new Form()
			}
		},
		methods: {
			getPage(data) {
				this.form = new Form(data);
				this.show = true
			}
		}
	}
</script>

<style scoped>
  img{
    width:100%
  }
</style>
