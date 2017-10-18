<template>
	<div class="dropDownTree">
		<el-button id="btn" type="default" @click="show()">{{name}}</el-button>
		<div id="dropDownTreeSelect" class="select" :class="{'fade':isFade}" :visible.sync="isFade" v-scroll>
			<ul class="ztree" ref="tree"></ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data', 'placeholder', 'value'],
		data() {
			return {
				name: this.placeholder || "请选择",
				isFade: false,
				options: {
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						onClick: (event, treeId, treeNode) => {
							this.name = treeNode.name
							this.isFade = false
							this.$emit("change", this.transfer(treeNode))
						}
					}
				}
			}
		},
		mounted() {
			if(this.data) {
				this.refreshTree()
			}
			if(this.treeObj && this.value) {
				this.selectTree()
			}
		},
		watch: {
			data(curVal, oldVal) {
				if($(this.$refs.tree).length > 0) {
					this.refreshTree()
				}
			},
			value(curVal, oldVal) {
				if(this.treeObj) {
					this.selectTree()
				}
			}
		},
		methods: {
			transfer(node) {
				let res;

				function build(arr) {
					for(let x of arr) {
						if(x.id == node.id) {
							res = x;
							break;
						} else if(x.children) {
							build(x.children)
						}
					}
				}
				build(this.data)
				return res
			},
			refreshTree() {
				this.treeObj = $.fn.zTree.init($(this.$refs.tree), this.options, this.data);
			},
			selectTree() {
				let node = this.treeObj.getNodeByParam("id", this.value, null)
				this.name = node?node.name : (this.placeholder||"请选择")
				this.treeObj.selectNode(node)
			},
			show() {
				this.isFade = !this.isFade
				document.onmousedown = (event) => {
					if(!(event.target.id == "dropDownTreeSelect" || event.target.id == "btn" || $(event.target).parents("#dropDownTreeSelect").length > 0)) {
						this.isFade = false
						document.onmousedown = null
					}
				}
			}
		}
	};
</script>

<style scoped>
	.dropDownTree {
		width: 100%
	}
	
	.dropDownTree button {
		width: 100%;
		text-align: left;
	}
	
	.dropDownTree button:hover {
		color: inherit;
		border-color: rgb(131, 145, 165)
	}
	
	.select {
		opacity: 0;
		position: absolute;
		left: 0;
		top: 72px;
		height: 0;
		width: 100%;
		z-index: 2;
		background-color: #fff;
		border: 1px solid #ccc;
		border-top: none;
		transition: all linear 0.15s;
	}
	
	.select.fade {
		opacity: 1;
		height: 300px
	}
</style>