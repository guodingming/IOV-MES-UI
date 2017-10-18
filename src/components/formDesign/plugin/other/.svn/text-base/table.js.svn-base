export default {
	type:"other",
	name:"table",
	text: "表格",
	template:
	`<div class="mes__formDesign_table" id="mes__table" style="">
		<table>
			<thead>
				<tr>
					<th>示例key1</th>
					<th>示例key2</th>
					<th>示例key3</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>示例value1</td>
					<td>示例value2</td>
					<td>示例value3</td>
				</tr>
			</tbody>
		</table>
	</div>`,
  script:
    `
window.mes__table = {
    /*
	 * 加载表格的数据列表
	 * 参数:
	 * option 表头中文与字段key对应数组 例:[{ prop: "name1",label: "字段名称一"},{ prop: "name2",label: "字段名称二"}]
	 * data 列表数据数组 例:[{name1:'1',name2:1},{name1:'2',name2:2},{name1:'3',name2:3}]
	 * mes__table.loadData([{ prop: "name1",label: "字段名称一"},{ prop: "name2",label: "字段名称二"}],[{name1:'1',name2:1},{name1:'2',name2:2},{name1:'3',name2:3}])
	 */
	loadData: function(option,data){
	    var headString = "<th>序号</th>";
	    var bodyString = "";
	    var head = ['$index']
	    option.forEach(function(val){
        	headString+= '<th>'+val.label+'</th>'
        	head.push(val.prop)
		})
        data.forEach(function(val,index){
        	bodyString+= ('<tr>'+
        	(function(data){
	            var string = "";
	            head.forEach(function(val){
	            	if(val == '$index'){
	            		string+='<td class="mes__table__index">'+(index+1)+'</td>'
	            	}
	            	else{
	            		string+='<td>'+(data[val]||"")+'</td>'
	            	}
	               
	            })
	            return string
        	})(val)
            +'</tr>')
		})
		$("#mes__table thead tr").html(headString);
		$("#mes__table tbody").html(bodyString);
	},
	/*
	 * 追加操作列并添加自定义模板
	 * 参数:
	 * template 自定义操作列模板 例:'<span class="icon-eye-open"></span>'
	 * mes__table.operate('<span class="icon-eye-open"></span>')
	 */
	operate: function(template){
	    $("#mes__table thead tr").append(<th>操作</th>)
	    $("#mes__table tbody tr").each(function(index,dom){
	    	dom.append("<td>"+template+"</td>")
	    })
	},
	/*
	 * 追加多选框
	 * mes__table.operate('<span class="icon-eye-open"></span>')
	 */
	checkbox:function(){
	    $(".mes__table__index").each(function(index,dom){
	    	dom.prepend('<input type="checkbox"/>')
	    })
	},
}`
}
