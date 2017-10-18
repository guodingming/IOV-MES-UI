<template>
	<div id="treeDemo" class="ztree"></div>
</template>

<script>
	export default {
		props: ['data', 'option'],
		mounted() {
			if(this.data) {
				this.treeObj = $.fn.zTree.init($("#treeDemo"), this.option, this.data);
			}
		},
		watch: {
			data(curVal, oldVal) {
				if($("#treeDemo").length > 0) {
					this.treeObj = $.fn.zTree.init($("#treeDemo"), this.option, this.data);
				}
			}
		},
		methods: {
      checkAllNodes(data) {
				return this.treeObj.checkAllNodes(data)
			},
			getCheckedNodes() {
				return this.treeObj.getCheckedNodes()
			},
			getCheckedNodesId() {
				return this.treeObj.getCheckedNodes().map((val) => {
					return val.id;
				});
			},
			getCheckedKeys() {
				let nodes = this.treeObj.getCheckedNodes().map((val) => {
					return val.id
				})
				return nodes
			},
			getNodesByParam(key,value,parentNode) {
				return this.treeObj.getNodesByParam(key,value,parentNode);
			},
			getNodeByParam(key,value,parentNode){
				return this.treeObj.getNodeByParam(key,value,parentNode);
			}
		}
	};
</script>

<style scoped>

</style>
