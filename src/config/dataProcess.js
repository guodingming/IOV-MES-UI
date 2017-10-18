/**
 * Created by yue.hao on 2017/7/10.
 */
import vm from '../main'
import regular from './regular/index'

const $ = {
	clientHeight:function(){
		return window.innerHeight
	},
	clientWidth:function(){
		return window.innerWidth
	},
	/**
	 * 按照某种自定义规则批量修改数组中每一个对象的某个key值（用于某些不可使用filter的情形）
	 * 例：let arr = [{a:1,b:1},{a:1,b:1}]
	 * $.maps(arr,"a",function(val){
	 * 	return val++
	 * })
	 * ==> [{a:2,b:1},{a:2,b:1}]
	 */
	maps:function(arr,key,fun){
		for(let x of arr){
			x[key] = fun(x[key])
		}
		return arr
	},
	/**
	 * 统一修改yyyy-MM-dd HH:mm:ss时间格式
	 */
	parseDate:function(date){
		return date.toLocaleString('chinese',{hour12:false}).replace(/\//g,"-")
	},
	/**
	 * 将id、parentId转换成children格式
	 */
	transformTree:function(data,option={}){
		let res;
		if(option.listArray){
			res = [{
				id:0,
				parentId:null,
				name:option.pNode,
				isRoot:true,
				children:data
			}]
			if(option.name){
				res[0].children.forEach((val) => {
					val.name = val[option.name]
				})
			}
		}
		else{
			if(option.pNode){
				res = [{
					id:0,
					parentId:null,
					isRoot:true,
					name:option.pNode
				}]
			}
			else{
				res = data.filter((val)=>{
						val.disabled = true
					return !val.parentId||val.parentId=="0"
				})
			}
			res = this.buildTree(res,data,option.name)
		}
		return res
	},
	buildTree:function(res,data,name){
		function build(obj){
			for(let x of data){
				if(x.parentId && x.parentId == obj.id){
					obj.children?obj.children:obj.children=[]
					if(name){
						x.name = x[name]
					}
					obj.children.push(x)
					build(x)
				}
				else if(x.pId && x.pId == obj.id){
					obj.children?obj.children:obj.children=[]
					if(name){
						x.name = x[name]
					}
					obj.children.push(x)
					build(x)
				}
			}
		}
		for(let x of res){
			build(x)
		}
		return res
	},
	deepSort:function(res,key,children){
		function deepSort(arr){
			function sort(a,b){
				return a[key] - b[key]
			}
			arr.sort(sort)
			for(let x of arr){
				if(x[children]){
					deepSort(x[children])
				}
			}
		}
		deepSort(res)
		return res
	},
	/**
	 * 将children转换成id、parentId格式
	 */
	transformArray:function(arr,key){
		let res = [];
		function build(arr){
			for(let x of arr){
				res.push(x)
				if(x[key]){
					build(x[key])
				}
			}
		}
		build(arr)
		return res
	},
	/**
	 * 重写es5 map方法
	 */
	map:function(data,key){
		let arr = []
		for(let x of data){
			arr.push(x[key])
		}
		return arr
	},
	/**
	 * 浅拷贝
	 */
	shallowCopy:function (src) {
	  var dst = {};
	  for (var prop in src) {
	    if (src.hasOwnProperty(prop)) {
	      dst[prop] = src[prop];
	    }
	  }
	  return dst;
	},
	/**
	 * 通过key获取数组某个对象
	 */
	getKey:function(arr,key,value){
		return arr.filter((val) => {
			return val[key] == value
		})[0]
	},
	/**，
	 * 处理数组
	 * map:{新:旧} 映射
	 * add:{key:value}新增
	 */
	processArray:function(arr,map,add){
		arr.forEach((val) => {
			if(map){
				for(let x in map){
					val[x] = val[map[x]]
				}
			}
			if(add){
				for(let x in add){
					val[x] = add[x]
				}
			}
		})
		return arr
	}
}

$.delete = function(tips,callback){
	vm.$confirm(tips, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		callback()
	}).catch(() => {
		vm.$message({
			type: 'info',
			message: '已取消移除'
		});
	});
}
$.checkRepeat = function(fun,id,key="name",text="该名称已被使用",extra){
	return _.debounce((rule, value, callback) => {
		if(value) {
			let data = {}
			data[key] = value
			if(extra){
				for(let x in extra){
					data[x] = extra[x];
          if(extra[x]==""){
            callback()
          }
				}
			}
			fun(data).then((res) => {
				//编辑
				if(id){
					if(res.content.length > 0 && id != res.content[0].id) {
						callback(new Error(text));
					} else {
						callback()
					}
				}
				//新建
				else{
					if(res.content.length > 0) {
						callback(new Error(text));
					} else {
						callback()
					}
				}
			})
		}
	}, 1000)
}


$.validateRequire = function(msg){
  return function(rule, value, callback){
    if(value) {
      callback()
    } else {
      callback(new Error(msg));
    }
  };
}

$.regular = regular
window._parse = function(data){
	console.log(JSON.parse(JSON.stringify(data)))
}
export default $
