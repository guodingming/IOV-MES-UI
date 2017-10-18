<template>
	<div id="workstation">
		<div class="navHead" id="mes__logo">
	    	<div class="image">
	    	
			</div>
	    	<div class="title">
	    		{{processName}}
			</div>
			<div class="operate">
				<el-col :span="15">
					<el-select v-model="process" placeholder="请选择" @change="changeProcess">
					    <el-option
					      v-for="item in processList"
					      :key="item.id"
					      :label="item.processName"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-col>
				<el-col :span="9">
					<el-button @click="logout"><span class="icon-signout" style=""></span>退出</el-button>
				</el-col>
			</div>
	    	<div class="info">
	    		<div class="date">
	    			{{date}}
				</div>
	    		<div class="line">
	    			<span class="ball red"></span>
	    			<span class="word pdLine">{{pdLine}}</span>
	    			<span class="ball yellow"></span>
	    			<span class="word status">{{status}}</span>
				</div>
			</div>
		</div>
		<div class="formContainer" v-scroll>
			<div class="form" ref="form" :style="style">
				
			</div>
		</div>
	</div>
	
</template>

<script>
	import {
		queryProcessList,
		changeProcess
	} from "./service";
	export default {
		data() {
			return {
				process:"",
				processList:[],
				style: {},
				date:"",
				processName:"暂无数据",
				pdLine:"暂无数据",
				status:"暂无数据"
			}
		},
		mounted() {
			let data = this.$store.getters.wsUserInfo;
			this.userData = data
			this.processName = data.produceProcess.processName
			this.process = data.produceProcess.id
			this.date = this.getDate()
			if(data.systemData){
				this.pdLine = data.systemData.pdLine
				this.status = data.systemData.status
			}
			setInterval(()=>{
				this.date = this.getDate()
			},1000)
			this.getProcessList(data.produceProcess.projectId)
			this.initForm(data.form)
		},
		methods: {
			initForm(data){
				this.$refs.form.innerHTML = `<div class="work" style="height:${data.height}px;width:${data.width}px;">${data.html}</div>`
				let js = document.createElement("script")
				js.type = "text/javascript";
				js.appendChild(document.createTextNode(data.javascript));
				document.body.appendChild(js)
	
				let css = document.createElement("link")
				css.rel = "stylesheet"
				css.type = "text/css"
				css.href = window.location.origin + "/form/style.css"
				document.head.appendChild(css)
				
				this.style = {
					"width":data.width + "px",
					"height":data.height + "px"
				}
			},
			async getProcessList(id){
				let res = await queryProcessList({projectId:id})
				this.processList = res.content||[]
			},
			getDate(){
				let nowDate = new Date()
				let res = ""
				let str = ""; 
				let week = nowDate.getDay(); 
				if (week == 0) { 
				    str = "星期日"; 
				} else if (week == 1) { 
				    str = "星期一"; 
				} else if (week == 2) { 
				    str = "星期二"; 
				} else if (week == 3) { 
				    str = "星期三"; 
				} else if (week == 4) { 
				    str = "星期四"; 
				} else if (week == 5) { 
				    str = "星期五"; 
				} else if (week == 6) { 
				    str = "星期六"; 
				}  
				str = " "+str+" "
				res = nowDate.toLocaleString('chinese',{hour12:false}).replace(/ /,str)
				return res
			},
			async changeProcess(id){
				if(id != this.userData.produceProcess.id){
					let res = await changeProcess({processId:id})
					window.location.reload()
				}
			},
			logout(){
				this.$store.dispatch('wsLogout').then(() => {
			        this.$router.push("/wsLogin")
			    },() => {this.$router.push("/wsLogin")});
			}
		}
	}
</script>

<style>
#workstation{
	height:100%;
	width:100%
}
#workstation .formContainer{
	height:calc(100% - 80px);
	width:100%
}
#workstation .form{
	position: relative;
	border:1px solid #ccc;
	background: #fff;
	margin:0 auto
}
#workstation .navHead{
	background: linear-gradient(to right,rgb(30,116,201),rgb(53,147,220));
	color: #FFF;
	width: 100%;
	height:80px;
}
#workstation .navHead>.image{
	float: left;
	height:100%;
	width:265px;
	background: url("~assets/images/workstation/hirain_logo.png");
}
#workstation .navHead>.title {
	float: left;
	height: 100%;
	line-height: 80px;
	font-size: 26px;
	letter-spacing: 2px;
}
#workstation .navHead>.info {
	float: right;
	height: 100%;
}
#workstation .navHead>.info .date{
	height: 50%;
	padding:11px;
	text-align: right;
}
#workstation .navHead>.info .line{
	height: 50%;
	padding:10px;
	font-size:16px;
	text-align: right;
	letter-spacing: 2px;
}

#workstation .navHead>.info .ball{
	display: inline-block;
	height:12px;
	width:12px;
	border-radius: 12px;
	margin-right:5px;
	margin-left:10px;
}

#workstation .navHead>.info .ball.red{
	background-color: rgb(227,193,223);
}
#workstation .navHead>.info .ball.yellow{
	background-color: rgb(227,223,205);
}
#workstation .navHead>.operate{
	float:right;
	width:260px;
	margin-left: 40px;
	height:100%
}
#workstation .navHead>.operate .el-col{
	height:100%;
	padding:22px 10px;
}

#workstation .navHead>.operate .el-col .el-input__inner{
	background: transparent;
	color: #FFF;
}
#workstation .navHead>.operate .el-col .el-input__inner::-webkit-input-placeholder {
  color: #ccc
}
#workstation .navHead>.operate .el-col .el-input__inner::-moz-placeholder {
  color: #ccc
}
#workstation .navHead>.operate .el-col .el-input__inner:-ms-input-placeholder {
  color: #ccc
}
#workstation .navHead>.operate .el-col .el-input__inner::placeholder {
  color: #ccc
}
#workstation .navHead>.operate .el-col .el-button{
	padding:8.5px 15px;
	background: transparent;
	color: #FFF;
	width: 100%;
}
#workstation .navHead>.operate .el-col .el-button .icon-signout{
	margin-right: 5px;
}
</style>