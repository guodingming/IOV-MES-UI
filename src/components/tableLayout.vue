<template>
	<div id="tableLayout">
		<mes-breadcrumb  v-if="!hideCrumb"></mes-breadcrumb>
		<div class="layoutContainer" :class="{tree:treeData}">
			<div v-if="treeData" class="treeContainer">
				<mes-tree :tree-data="treeData" @tree-click="treeClick">
					<template slot="extra">
						<slot name="extra">
						</slot>
					</template>
					<template slot="tool">
						<slot name="tool">
						</slot>
					</template>
				</mes-tree>
			</div>
			<div class="tableContainer">
				<slot name="container"></slot>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props:['treeData','treeTool','treeExtra','hideCrumb'],
		created() {
			
		},
		data() {
			return {
			};
		},
		methods: {
			treeClick(data){
				this.$emit('tree-click', data);
			}
		}
	};
</script>


<style>
	#tableLayout .layoutContainer{
		position: absolute;
		top:60px;
		left:0;
		right:0;
		bottom:0;
	}
	#tableLayout .layoutContainer.tree .treeContainer{
		width:230px;
		height:100%;
		position: relative;
	}
	#tableLayout .layoutContainer.tree .tableContainer{
		position: absolute;
		top:0;
		bottom:0;
		left:230px;
		right:0;
	}
	#tableLayout .extra .el-form-item__label{
		padding-right:10px
	}
</style>
