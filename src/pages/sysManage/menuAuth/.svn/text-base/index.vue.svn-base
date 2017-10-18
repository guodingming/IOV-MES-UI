<template>
	<div id="menuAuth">
		<mes-breadcrumb></mes-breadcrumb>
		<div class="menuContainer">
			<div class="roleList">
				<div class="title">
					角色列表
				</div>
				<div class="content" v-scroll>
					 <el-radio-group v-model="roleId" @change='getPermission'>
					 	<ul>
							<li v-for="item of roleList">
								<el-radio class="radio" :label="item.id" :change='getPermission'>{{item.name}}</el-radio>
							</li>
						</ul>
					</el-radio-group>
				</div>
			</div>
			<div class="menu">
				<div class="title">
					权限列表
				</div>
					<div class="content iovTreeIcon_bk" v-loading="loading" v-scroll>
						<mes-ztree ref="tree" :data="menuList" :option="options"></mes-ztree>
					</div>

			</div>
			<div class="submit">
				<el-button type="primary" @click="save">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getRole,getMenu,getPermission,save,order
	} from "./service";

	export default {
		created() {
			this.init();
		},
		data() {
			return {
				loading:false,
				roleId:"",
				roleList:[],
				menuList: [],
				options: {
					edit: {
						drag: {
							prev:true,
							next:true,
							inner:false
						},
						enable: true,
						showRemoveBtn: false,
						showRenameBtn: false
					},
					check: {
						enable: true
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						beforeDrop: (treeId, treeNodes, targetNode, moveType) => {
		    				if(treeNodes[0].pId!=targetNode.pId) return false;
						},
						onDrop: (event, treeId, treeNodes, targetNode, moveType) => {
							let pNode = this.$refs.tree.getNodeByParam("id", targetNode.pId,null)
							let nodes = this.$refs.tree.getNodesByParam("level", targetNode.level, pNode)
							let data = nodes.map((val,index)=>{
								return {
									id:val.id,
									itemOrder:index+1
								}
							})
							order(data)
						}
					}
				}
			};
		},
		methods: {
			async init() {
				this.getRole()
			},
			async getRole(){
				let res = await getRole();
				if(res.status=="success"){
					this.roleList = res.content||[]
					this.roleId = this.roleList[0].id
				}
				else{
					this.roleList = []
				}
			},
			async getPermission() {
				this.loading = true
				let perm = await getPermission(this.roleId);
				let menu = await getMenu();
				this.menuList = this.formatMenu(menu.content,this.$.map(perm.content,"id"))

				this.loading = false
			},
			async save(){
				let res = await save({
					roleId:this.roleId,
					menuIds:this.$refs.tree.getCheckedKeys()
				});
				if(res.status=="success"){
					this.getPermission()
				}
			},
			formatMenu(data,permission){
				data = data.map((val)=>{
					let res = {
						name : val.name,
						itemOrder : val.itemOrder,
						id : val.id,
						pId : val.parentId,
						checked : true,
						open: true
					}
					if(permission.indexOf(val.id) == -1){
						res.checked = false
					}
					return res
				})
				let res = data.filter((val)=>{
					return !val.pId||val.pId=="0"
				})
				res = this.$.buildTree(res,data)
				res = this.$.deepSort(res,'itemOrder','children')
				return res
			}
		}
	};
</script>

<style scoped>
	.menuContainer{
		position: absolute;
		top:60px;
		left:0;
		right:0;
		bottom:0;
		padding:30px 20px;
	}
	.title{
		width: 100%;
		height: 40px;
		background-color: #F6F6F6;
		padding:10px 20px;
	}
	.content{
		height:calc(100% - 40px);
		width:100%;
		padding: 20px 0 20px 20px;
	}
	.roleList{
		width: 50%;
		height:calc(100% - 75px);
		border:1px solid #E1E1E2;
		float:left;
	}
	.roleList ul li{
		padding:10px
	}
	.menu{
		width: 50%;
		height:calc(100% - 75px);
		border:1px solid #E1E1E2;
		float:left;
		border-left:none
	}
	.submit{
		clear: both;
		height:75px;
		width:100%;
		border:1px solid #E1E1E2;
		border-top:none;
		text-align: right;
		padding:20px 15px
	}
</style>
