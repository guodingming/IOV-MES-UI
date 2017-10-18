<template>
		<el-dialog title="查看权限" :visible.sync="show" size="tiny" id="check" :close-on-click-modal="false">
			<mes-ztree :data="menuList" :option="options"></mes-ztree>
			<span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="show = false">确 定</el-button>
		  </span>
		</el-dialog>
</template>

<script>
	import {
		getMenu,
		getPermission
	} from "./service";
	
	export default {
		created(){
			
		},
		data(){
			return{
				show:false,
				loading:false,
				roleId:"",
				menuList:[],
				options: {
					check: {
						enable: true
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						beforeClick: function() {
							return false
						}
					}
				}
			}
		},
		methods:{
			
			getPage(data) {
				this.show = true
				this.roleId = data.id
				this.getMenu()
			},
			async getMenu(){
				let perm = await getPermission(this.roleId);
				let menu = await getMenu();
				this.menuList = this.formatMenu(menu.content,this.$.map(perm.content,"id"))
			},
			formatMenu(data,permission){
				data = data.map((val)=>{
					let res = {
						name : val.name,
						id : val.id,
						pId : val.parentId,
						checked : true,
						open: true,
						chkDisabled : true
					}
					if(permission.indexOf(val.id) == -1){
						res.checked = false
					}
					return res
				})
				return data
			}
		}
	}
</script>

<style>
	#roleManage #check .el-dialog{
		bottom:5%
	}
	#roleManage #check .el-dialog__body{
		height:calc(100% - 115px);
		overflow: auto;
	}
	
</style>
