<template>
	<div class="imageUpload">
		<el-input placeholder="请选择图片" v-model="fileName" disabled>
			<el-button slot="append" icon="upload2" onclick="mes_image.click()"></el-button>
		</el-input>
		<input type="file" id="mes_image" @change="handleFileChange" ref="file"/>
		<div class="image" v-if="showIamge">
			<img :src="imgCode"/>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["value"],
		data() {
			return {
				fileName : "",
				imgCode: "",
				showIamge : false
			}
		},
		mounted() {
			if(this.value){
				this.imgCode = this.value
				this.showIamge = true
			}
			else{
				this.imgCode = ""
				this.showIamge = false
				this.fileName = ""
			}
		},
		watch: {

		},
		methods: {
			clear(){
				this.imgCode = ""
				this.showIamge = false
				this.fileName = ""
			},
			handleFileChange() {
				let file = this.$refs.file.files[0];
				if(file.size>3000000){
					this.$message({
						type: 'info',
						message: '请选择不大于3M的图片文件'
					});
				}
				else if(!/image\/\w+/.test(file.type)){
					this.$message({
						type: 'info',
						message: '请选择图片文件'
					});
				}
				else{
					this.fileName = file.name
					let reader = new FileReader();
					//将文件以Data URL形式读入页面
					reader.readAsDataURL(file);
					reader.onload = (e) => {
						this.imgCode = reader.result
						this.showIamge = true
						this.$emit("change", reader.result)
					}
				}

			}
		}
	};
</script>

<style scoped>
	.imageUpload {
		width: 100%
	}

	#mes_image {
		display: none;
	}

	.image{
		height:200px;
		width:200px;
		margin-top:20px
	}
	.image img{
		height:100%;
		width:100%;
	}
</style>
