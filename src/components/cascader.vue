<template>
	<div class="cascader">
		<el-cascader :popper-class="pClass" :placeholder="place" filterable :show-all-levels="false" v-model="defaultSelected" :options="options" @active-item-change="changeCascader" @change="change" :props="{value: 'id',label: 'name',children: 'children'}">
		</el-cascader>
	</div>
</template>

<script>
	export default {
		props: ['data', 'value','placeholder','popperClass'],
		created() {
			this.pClass = this.popperClass||""
			this.options = this.data
			this.place = this.placeholder||'请输入搜索'
		},
		data() {
			return {
				options:[],
				pClass:'',
				place:'请输入搜索'
			};
		},
		computed: {
			defaultSelected: {
				get: function() {
					return this.value;
				},
				set: function(val) {
					this.$emit('input', val);
				}
			}
		},
		watch: {
			data(curVal, oldVal) {
				this.options = curVal
			}
		},
		methods: {
			change(data) {
				let level = data.length
				this.$emit("change", data[level - 1], data)
			},
			changeCascader(data) {
				let level = data.length
				this.$emit("item-change", data[level - 1], level, data)
				this.$emit("level"+level, data[level - 1], data)
			},
			setChild(id, ids, children) {
				let i = 0

				function pro(opt) {
					let obj;

					function getObj(arr) {
						let res = arr.filter((val) => {
							return val.id == ids[i]
						})
						if(res.length > 0 && res[0].children && (i < ids.length)) {
							i++
							obj = res[0]
							getObj(res[0].children)
						}
					}
					getObj(opt)
					obj.children = children
				}
				pro(this.options)
				this.options = JSON.parse(JSON.stringify(this.options))
			}
		}
	};
</script>

<style>
	.cascader .el-cascader .el-input__inner {
		height: 37px
	}
</style>