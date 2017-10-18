<template>
	<div id="navBar" :class="{'active':collapse}">
		<div class="navBar">
			<div class="head">
				<span class="icon-list" @click="collapse=!collapse"></span>
			</div>
			<div class="menuBox" v-scroll='{"axis":"y","theme":"dark"}'>
				<el-menu :default-active="path" class="el-menu-vertical-demo" theme="dark" router unique-opened>
					<div v-for="item in navData">
						<el-submenu v-if="item.children&&item.children.length>0" :index="item.url||item.id">
							<template slot="title">
								<el-tooltip class="item" :disabled="!collapse" :open-delay="300" effect="dark" :content="item.name" placement="right">
									<img class="navIcon" :src="require('assets/images/index/menu/' + item.icon)"/>
								</el-tooltip>
								<span class="itemName">{{item.name}}</span></template>
							<el-menu-item v-for="x in item.children" :key="x.id" :index="x.url||item.id">
								<span class="split"></span> {{x.name}}
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="!(item.children&&item.children.length>0)" :index="item.url||item.id">
							<el-tooltip class="item" :disabled="!collapse" :open-delay="300" effect="dark" :content="item.name" placement="right">
								<img class="navIcon" :src="require('assets/images/index/menu/'+item.icon)"/>
							</el-tooltip>
							<span class="itemName">{{item.name}}</span>
						</el-menu-item>
					</div>
				</el-menu>
			</div>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			let data = this.$route.matched || []
			let path = ""
			for(let x of data) {
				if(x.path.split("/").length > 2) {
					path = x.path
					break;
				}
			}
			this.path = path
			this.userInfo = this.$store.getters.userInfo
		},
		props: ['navData'],
		data() {
			return {
				collapse: false
			};
		},
		methods: {
		}
	}
</script>

<style>
	#navBar>.navBar {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		bottom: 0;
		overflow: visible;
		transition: all linear 0.1s;
	}
	
	#navBar>.navBar>div.head {
		background-color: #324157;
		border-bottom: 1px #1F2229 solid;
		height: 50px;
		width: 100%;
		text-align: right;
		padding: 15px 22px 15px 0px;
	}
	
	#navBar .navBar>div.head .icon-list {
		color: #bfcbd9;
		cursor: pointer;
	}
	
	#navBar.active .navBar {
		width: 58px;
		transition: all 0.3s linear;
	}
	
	#navBar.active>.navBar .el-submenu {
		position: relative;
	}
	
	#navBar.active>.navBar .el-menu-vertical-demo .el-submenu .el-menu {
		text-align: center;
		position: absolute;
		z-index: 2;
		width: 150px;
		top: 0px;
		right: -150px;
		display: none;
	}
	
	#navBar>.navBar .split {
		padding-left: 20px;
	}
	#navBar.active>.navBar .split {
		padding: 0;
	}
	
	#navBar.active>.navBar .el-menu-vertical-demo .el-submenu .el-menu {
		display: block;
	}
	
	#navBar.active .navBar .el-submenu__icon-arrow,
	#navBar.active .navBar .itemName {
		display: none;
	}
	
	#navBar.active>.content {
		left: 58px;
		transition: all 0.3s linear;
	}
	
	#navBar>.content {
		position: absolute;
		top: 0;
		left: 200px;
		right: 0;
		bottom: 0;
		transition: all linear 0.1s;
	}
	
	#navBar>.content>div {
		height: 100%;
		width: 100%;
	}
	
	#navBar>.navBar .el-menu>.icon {
		height: 50px;
		width: 100%;
		text-align: center;
	}
	
	#navBar>.navBar .el-menu>.icon span {
		font-size: 16px;
		color: #bfcbd9;
		line-height: 50px;
		cursor: pointer
	}
	
	#navBar>.navBar .el-menu>.icon span:hover {
		color: #fff;
	}
	
	#navBar>.navBar .menuBox {
		height: calc(100% - 50px);
		width: 100%;
		background-color: #324157;
	}
	#navBar.active>.navBar .menuBox {
		overflow:visible;
	}
	
	#navBar>.navBar .el-menu {
		min-height: 100%;
		width: 100%;
		border-radius: 0;
		z-index: 2;
	}
	
	#navBar>.navBar .navIcon {
		margin-right: 22px;
		height: 14px;
		width: 14px;
		position: relative;
		top: 2px
	}
</style>