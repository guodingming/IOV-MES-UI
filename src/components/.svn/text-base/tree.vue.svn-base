<template>
	<div class="mes-tree">
		<div class="extra" ref="extra">
			<slot name="extra"></slot>
		</div>
    	<el-input placeholder="输入关键字进行过滤" v-model="searchData"></el-input>
		<div class="tool" ref="tool">
			<slot name="tool"></slot>
		</div>
		<el-tree 
			v-scroll
			class="filter-tree"
      		:style="{top:height}"
			ref="tree"
			default-expand-all
			highlight-current
			:props="{children: 'children',label: 'name'}"
			:expand-on-click-node="false"
			:filter-node-method="filterNode"
			:data="treeData"
			@current-change="nodeClick"></el-tree>
	</div>
</template>
<script>
	export default {
		props:['treeData'],
		created(){
			
		},
		mounted(){
			let height = 0
			if(this.$refs&&this.$refs.tool){
				if(this.$refs.tool.childNodes.length>0){
					height += this.$refs.tool.clientHeight
				}
			}
			if(this.$refs&&this.$refs.extra){
				if(this.$refs.extra.clientHeight!=0){
					height += (this.$refs.extra.clientHeight+12)
				}
			}
			this.height = (height+71) + 'px'
		},
		data() {
			return {
				searchData : '',
				height:0
			};
		},
		watch: {
			searchData(val) {
				this.$refs.tree.filter(val);
			}
		},
		methods: {
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			nodeClick(data){
				this.$emit('tree-click', data);
			}
		}
	};
</script>


<style>
	.mes-tree{
		height:100%;
		width:100%;
	}
	.mes-tree .tool{
		height:30px;
		display:flex;
	}
	.mes-tree .tool>button{
		flex:1;
		border-radius: 0;
		margin-left: 1px;
		padding:6px 15px;
	}
	.mes-tree .tool>button:first-of-type{
		margin-left: 0;
		border-top-left-radius:3px;
	}
	.mes-tree .tool>button:last-of-type{
		border-top-right-radius:3px;
	}
	
	.mes-tree .extra .el-form-item {
	  margin-bottom:12px
	}
	.mes-tree .el-tree{
	    position: absolute;
	    top:50px;
	    bottom:20px;
	    left:20px;
	    right:20px;
		}
	.mes-tree>.el-input{
	    margin-bottom:14px;
	  }
	.mes-tree .el-tree-node > .el-tree-node__children{
		overflow: visible;
	}
</style>
