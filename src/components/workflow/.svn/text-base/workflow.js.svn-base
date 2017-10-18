import "assets/codemirror/codemirror.js"
import "assets/codemirror/codemirror.css"
import "assets/codemirror/xml.js"
import "./style.css"

function getElCoordinate(dom) {
	let t = dom.offsetTop;
	let l = dom.offsetLeft;
	dom = dom.offsetParent;
	while(dom) {
		t += dom.offsetTop;
		l += dom.offsetLeft;
		dom = dom.offsetParent;
	};
	return {
		top: t,
		left: l
	};
}

function mousePosition(ev) {
	if(!ev) ev = window.event;
	if(ev.pageX || ev.pageY) {
		return {
			x: ev.pageX,
			y: ev.pageY
		};
	}
	return {
		x: ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
		y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop
	};
}

//定义一个区域图类：
function GooFlow(bgDiv, property) {
	//初始化区域图的对象
	//	this.$id=bgDiv.attr("id");
	this.$id = "wf";
	this.$bgDiv = bgDiv; //最父框架的DIV
	this.$bgDiv.addClass("GooFlow");
	let width = 3000;
	let height = 1500;
	let thisData = this
	this.$bgDiv.css({
		width: width + "px",
		height: height + "px"
	});
	this.$tool = null; //左侧工具栏对象
	this.$tree = null; //树工具栏
	this.$headtool = null; //顶部标签及工具栏按钮
	this.$title = "newFlow_1"; //流程图的名称
	this.$nowType = "cursor"; //当前要绘制的对象类型
	this.$lineData = {};
	this.$nodeData = {};
	this.$lineDom = {};
	this.$nodeDom = {};
	this.$selectNode = null;
	this.$max = property.initNum || 1; //计算默认ID值的起始SEQUENCE
	this.$focus = ""; //当前被选定的结点/转换线ID,如果没选中或者工作区被清空,则为""
	this.$cursor = "default"; //鼠标指针在工作区内的样式
	
	this.$treeData = property.toolNodes||[]
	this.$rowData = property.row||{}
	this.$flowId = this.$rowData.id||"暂无数据"
	this.$flowName = this.$rowData.name||"暂无数据"
	this.$toolHide = property.toolHide||false
	this.$headtoolArr = property.headtool || ["save","tree","check","exit"]
	this.apply = function(fun,param){
		if ((typeof fun) == "function") {
			return fun.apply(this, param?param:[]);
		}
	}
	//插入工具栏 并用ztree初始化树
	if(!this.$toolHide){
		this.$bgDiv.append('<div id="tool" class="ztree"></div>')
		let setting = {
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					$(".item_focus .item_menu").slideUp("fast");
					if(treeNode.id) {
						thisData.$selectNode = treeNode
						thisData.switchToolBtn(treeNode.id);
						thisData.treeNodeId = treeNode.id
					} else {
						thisData.switchToolBtn("cursor");
						thisData.treeNodeId = "cursor"
					}
				}
			}
		};
		this.$tree = $.fn.zTree.init($("#tool"), setting, this.$treeData);
		this.$tool = this.$bgDiv.children("#tool");
	}
	//插入头部工具栏
	this.$bgDiv.append(
		`<div id="head"><ul>
		${this.$headtoolArr.indexOf("save")!=-1?'<li class="save"><span></span>保存</li>':""}
		${this.$headtoolArr.indexOf("tree")!=-1?'<li class="treeshow"><span></span>显示树</li><li class="treehide"><span></span>隐藏树</li>':""}
		${this.$headtoolArr.indexOf("check")!=-1?'<li class="check"><span></span>查看</li>':""}
		${this.$headtoolArr.indexOf("exit")!=-1?'<li class="exit"><span></span>退出</li>':""}
		</ul></div>`
	)
	
	this.$headtool = this.$bgDiv.children("#head");
	this.$headtool.css({
		width:this.$headtool.find("ul").width()+5,
		marginLeft:-(this.$headtool.find("ul").width()+5)/2,
	})
	//绑定工具栏各个按钮的点击事件
	this.$headtool.delegate("li", "click", {
		inthis: this
	}, function(e) {
		let This = e.data.inthis
		$(".item_focus .item_menu").slideUp("fast")
		let className = e.currentTarget.className
		switch(className) {
			case "save":
				This.apply(This.onSaveClick)
				break;
			case "treeshow":
				This.$tool.animate({
					left: "10px"
				}, 500)
				This.$headtool.find(".treeshow").hide()
				This.$headtool.find(".treehide").show()
				break;
			case "treehide":
				This.$tool.animate({
					left: -1 * (This.$tool.width() + 10)
				}, 500)
				This.$headtool.find(".treeshow").show()
				This.$headtool.find(".treehide").hide()
				break;
			case "check":
				let dom = $("#check .modal-body")
				$("#check").modal()
				$(".modal-backdrop").hide();
				dom.empty()
				dom.append('<textarea id="highlight"></textarea>')
				let code = CodeMirror.fromTextArea(document.getElementById("highlight"), {
					lineNumbers: true,
					extraKeys: {
						"Ctrl": "autocomplete"
					},
					mode: "text/html"
				});
//				dom.find(".CodeMirror-scroll").mCustomScrollbar({"axis":"yx","theme":"dark"});
				code.setValue(This.parseXml())
				break;
			case "exit":
				This.apply(This.onCloseClick)
				break;
			default:
				break;
		}
	})
	//插入查看xml时的模态框 基于bootstrap
	this.$bgDiv.append('<div class="modal" id="check"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close">×</button><h4 class="modal-title">流程XML数据</h4></div><div class="modal-body"><textarea id="highlight"></textarea></div></div></div></div>')
	$("#check .close").click(function() {
		$("#check").modal("hide")
	})
	//生成工作区
	width = width - 9;
	height = height - 8;
	this.$bgDiv.append("<div class='GooFlow_work' oncontextmenu='return false'></div>");
	this.$workArea = $("<div class='GooFlow_work_inner'></div>")
		.attr({
			"unselectable": "on",
			"onselectstart": 'return false',
			"onselect": 'document.selection.empty()'
		});
	this.$bgDiv.children(".GooFlow_work").append(this.$workArea);
	this.$draw = null; //画矢量线条的容器
	this.initDraw("draw_" + this.$id, width, height);

	this.$workArea.on("click", {
		inthis: this
	}, function(e) {
		let This = e.data.inthis;
		if(!e) e = window.event;
		let type = This.$nowType;
		if(type == "cursor") {
			let t = $(e.target);
			let n = t.prop("tagName");
			if(n == "svg" || (n == "DIV" && t.prop("class").indexOf("GooFlow_work") > -1) || n == "LABEL") {
				if(This.$lineOper.data("tid")) {
					This.focusItem(This.$lineOper.data("tid"), false);
				} else {
					$(".item_focus .item_menu").slideUp("fast");
					This.blurItem();
					This.switchToolBtn("cursor")
					This.$tree.selectNode(e.data.inthis.$tree.getNodeByParam("id", "cursor"));
				}
			}
			return;
		}
		else if(type=="direct")return;
		let X, Y;
		let ev = mousePosition(e),
			t = getElCoordinate(this);
		X = ev.x - t.left + this.parentNode.scrollLeft - 1;
		Y = ev.y - t.top + this.parentNode.scrollTop - 1;
		This.addNode(This.$id + "_node_" + This.$max, {
			name: This.$selectNode.name,
			left: X,
			top: Y,
			type: This.$nowType,
			data: This.$selectNode.data,
			icon: This.$selectNode.icon
		});
		This.$max++;
	});
	//划线或改线时用的绑定
	this.$workArea.mousemove({
		inthis: this
	}, function(e) {
		if(e.data.inthis.$nowType != "direct" && !e.data.inthis.$mpTo.data("p")) return;
		let lineStart = $(this).data("lineStart");
		let lineEnd = $(this).data("lineEnd");
		if(!lineStart && !lineEnd) return;

		let ev = mousePosition(e),
			t = getElCoordinate(this);
		let X, Y;
		X = ev.x - t.left + this.parentNode.scrollLeft;
		Y = ev.y - t.top + this.parentNode.scrollTop;
		let line = document.getElementById("GooFlow_tmp_line");
		if(lineStart) {
			line.childNodes[0].setAttribute("d", "M " + lineStart.x + " " + lineStart.y + " L " + X + " " + Y);
			line.childNodes[1].setAttribute("d", "M " + lineStart.x + " " + lineStart.y + " L " + X + " " + Y);
			if(line.childNodes[1].getAttribute("marker-end") == "url('#arrow2')")
				line.childNodes[1].setAttribute("marker-end", "url('#arrow3')");
			else line.childNodes[1].setAttribute("marker-end", "url('#arrow2')");
		} else if(lineEnd) {
			line.childNodes[0].setAttribute("d", "M " + X + " " + Y + " L " + lineEnd.x + " " + lineEnd.y);
			line.childNodes[1].setAttribute("d", "M " + X + " " + Y + " L " + lineEnd.x + " " + lineEnd.y);
			if(line.childNodes[1].getAttribute("marker-end") == "url('#arrow2')")
				line.childNodes[1].setAttribute("marker-end", "url('#arrow3')");
			else line.childNodes[1].setAttribute("marker-end", "url('#arrow2')");
		}
	});
	this.$workArea.mouseup({
		inthis: this
	}, function(e) {
		let This = e.data.inthis;
		if(This.$nowType != "direct" && !This.$mpTo.data("p")) return;
		let tmp = document.getElementById("GooFlow_tmp_line");
		if(tmp) {
			$(this).css("cursor", "auto").removeData("lineStart").removeData("lineEnd");
			This.$mpTo.hide().removeData("p");
			This.$mpFrom.hide().removeData("p");
			This.$draw.removeChild(tmp);
//			This.focusItem(This.$focus, false);
		} else {
			This.$lineOper.removeData("tid");
		}
	});
	//为了结点而增加的一些集体delegate绑定
	this.initWorkForNode();
	//对结点进行移动或者RESIZE时用来显示的遮罩层
	this.$ghost = $("<div class='rs_ghost'></div>").attr({
		"unselectable": "on",
		"onselectstart": 'return false',
		"onselect": 'document.selection.empty()'
	});
	this.$bgDiv.append(this.$ghost);
	this.$textArea = $("<textarea></textarea>");
	this.$bgDiv.append(this.$textArea);
	this.$lineMove = $("<div class='GooFlow_line_move' style='display:none'></div>"); //操作折线时的移动框
	this.$workArea.append(this.$lineMove);
	this.$lineMove.on("mousedown", {
		inthis: this
	}, function(e) {
		if(e.button == 2) return false;
		let lm = $(this);
		lm.css({
			"background-color": "#333"
		});
		let This = e.data.inthis;
		let ev = mousePosition(e),
			t = getElCoordinate(This.$workArea[0]);
		let X, Y;
		X = ev.x - t.left + parseInt(This.$bgDiv.parent().css("left"));
		Y = ev.y - t.top + parseInt(This.$bgDiv.parent().css("top"));
		let p = This.$lineMove.position();
		let vX = X - p.left,
			vY = Y - p.top;
		let isMove = false;
		document.onmousemove = function(e) {
			if(!e) e = window.event;
			let ev = mousePosition(e);
			let ps = This.$lineMove.position();
			X = ev.x - t.left + parseInt(This.$bgDiv.parent().css("left"));
			Y = ev.y - t.top + parseInt(This.$bgDiv.parent().css("top"));
			if(This.$lineMove.data("type") == "lr") {
				X = X - vX;
				if(X < 0) X = 0;
				else if(X > This.$workArea.width())
					X = This.$workArea.width();
				This.$lineMove.css({
					left: X + "px"
				});
			} else if(This.$lineMove.data("type") == "tb") {
				Y = Y - vY;
				if(Y < 0) Y = 0;
				else if(Y > This.$workArea.height())
					Y = This.$workArea.height();
				This.$lineMove.css({
					top: Y + "px"
				});
			}
			isMove = true;
		}
		document.onmouseup = function(e) {
			if(isMove) {
				let p = This.$lineMove.position();
				if(This.$lineMove.data("type") == "lr")
					This.setLineM(This.$lineMove.data("tid"), p.left + 3);
				else if(This.$lineMove.data("type") == "tb")
					This.setLineM(This.$lineMove.data("tid"), p.top + 3);
			}
			This.$lineMove.css({
				"background-color": "transparent"
			});
			if(This.$focus == This.$lineMove.data("tid")) {
				This.focusItem(This.$lineMove.data("tid"));
			}
			document.onmousemove = null;
			document.onmouseup = null;
		}
	});
	//选定一条转换线后出现的浮动操作栏，有改变线的样式和删除线等按钮。
	this.$lineOper = $("<div class='GooFlow_line_oper' style='display:none'><i class='b_l1'></i><i class='b_l2'></i><i class='b_l3'></i><i class='b_x'></i></div>"); //选定线时显示的操作框
	this.$workArea.parent().append(this.$lineOper);
	this.$lineOper.on("click", {
		inthis: this
	}, function(e) {
		if(!e) e = window.event;
		if(e.target.tagName != "I") return;
		let This = e.data.inthis;
		let id = $(this).data("tid");
		switch($(e.target).attr("class")) {
			case "b_x":
				This.delLine(id);
				this.style.display = "none";
				break;
			case "b_l1":
				This.setLineType(id, "lr");
				break;
			case "b_l2":
				This.setLineType(id, "tb");
				break;
			case "b_l3":
				This.setLineType(id, "sl");
				break;
		}
	});
	//新增移动线两个端点至新的结点功能移动功能，这里要提供移动用的DOM
	this.$mpFrom = $("<div class='GooFlow_line_mp' style='display:none'></div>");
	this.$mpTo = $("<div class='GooFlow_line_mp' style='display:none'></div>");
	this.$workArea.append(this.$mpFrom).append(this.$mpTo);
	this.initLinePointsChg();

	this.onMenuSaveClick = null;
	$(document).keydown({
		inthis: this
	}, function(e) {
		//绑定键盘操作
		let This = e.data.inthis;
		if(This.$focus == "") return;
		switch(e.keyCode) {
			case 46: //删除
				This.delNode(This.$focus, true);
				This.delLine(This.$focus);
				break;
		}
	});

}
GooFlow.prototype = {
	getSvgMarker: function(id, color) {
		let m = document.createElementNS("http://www.w3.org/2000/svg", "marker");
		m.setAttribute("id", id);
		m.setAttribute("viewBox", "0 0 6 6");
		m.setAttribute("refX", 5);
		m.setAttribute("refY", 3);
		m.setAttribute("markerUnits", "strokeWidth");
		m.setAttribute("markerWidth", 6);
		m.setAttribute("markerHeight", 6);
		m.setAttribute("orient", "auto");
		let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M 0 0 L 6 3 L 0 6 z");
		path.setAttribute("fill", color);
		path.setAttribute("stroke-width", 0);
		m.appendChild(path);
		return m;
	},
	initDraw: function(id, width, height) {
		let elem;
		this.$draw = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //可创建带有指定命名空间的元素节点
		this.$workArea.prepend(this.$draw);
		let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
		this.$draw.appendChild(defs);
		defs.appendChild(GooFlow.prototype.getSvgMarker("arrow1", "#3892D3"));
		defs.appendChild(GooFlow.prototype.getSvgMarker("arrow2", "#ff3300"));
		defs.appendChild(GooFlow.prototype.getSvgMarker("arrow3", "#ff3300"));

		this.$draw.id = id;
		this.$draw.style.width = width * 3 + "px";
		this.$draw.style.height = +height * 3 + "px";
		//绑定连线的点击选中以及双击编辑事件
		let tmpClk = "g";

		$(this.$draw).delegate(tmpClk, "click", {
			inthis: this
		}, function(e) {
			e.data.inthis.focusItem(this.id, true);
		});
		$(this.$draw).delegate(tmpClk, "dblclick", {
			inthis: this
		}, function(e) {
			let oldTxt, x, y, from, to;
			let This = e.data.inthis;
			oldTxt = this.childNodes[2].textContent;
			from = this.getAttribute("from").split(",");
			to = this.getAttribute("to").split(",");
			if(This.$lineData[this.id].type == "lr") {
				from[0] = This.$lineData[this.id].M;
				to[0] = from[0];
			} else if(This.$lineData[this.id].type == "tb") {
				from[1] = This.$lineData[this.id].M;
				to[1] = from[1];
			}
			x = (parseInt(from[0], 10) + parseInt(to[0], 10)) / 2 - 60;
			y = (parseInt(from[1], 10) + parseInt(to[1], 10)) / 2 - 12;
			let t = getElCoordinate(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({
				display: "block",
				width: 120,
				height: 32,
				left: t.left + x - parseInt(This.$bgDiv.parent().css("left")),
				top: t.top + y - parseInt(This.$bgDiv.parent().css("top"))
			}).data("id", This.$focus).focus();
			This.$workArea.parent().one("mousedown", function(e) {
				if(e.button == 2) return false;
				This.setName(This.$textArea.data("id"), This.$textArea.val(), "line");
				This.$textArea.val("").removeData("id").hide();
			});
		});
	},
	//初始化用来改变连线的连接端点的两个小方块的操作事件
	initLinePointsChg: function() {
		this.$mpFrom.on("mousedown", {
			inthis: this
		}, function(e) {
			let This = e.data.inthis;
			This.switchToolBtn("cursor");
			let ps = This.$mpFrom.data("p").split(",");
			let pe = This.$mpTo.data("p").split(",");
			$(this).hide();
			This.$workArea.data("lineEnd", {
				"x": pe[0],
				"y": pe[1],
				"id": This.$lineData[This.$lineOper.data("tid")].to
			}).css("cursor", "crosshair");
			let line = GooFlow.prototype.drawLine("GooFlow_tmp_line", [ps[0], ps[1]], [pe[0], pe[1]], true);
			This.$draw.appendChild(line);
			return false;
		});
		this.$mpTo.on("mousedown", {
			inthis: this
		}, function(e) {
			let This = e.data.inthis;
			This.switchToolBtn("cursor");
			let ps = This.$mpFrom.data("p").split(",");
			let pe = This.$mpTo.data("p").split(",");
			$(this).hide();
			This.$workArea.data("lineStart", {
				"x": ps[0],
				"y": ps[1],
				"id": This.$lineData[This.$lineOper.data("tid")].from
			}).css("cursor", "crosshair");
			let line = GooFlow.prototype.drawLine("GooFlow_tmp_line", [ps[0], ps[1]], [pe[0], pe[1]], true);
			This.$draw.appendChild(line);
			return false;
		});
	},

	//切换左边工具栏按钮,传参TYPE表示切换成哪种类型的按钮
	switchToolBtn: function(type) {
		this.$nowType = type;
		if(this.$tool){
			this.$tool.children("#" + this.$id + "_btn_" + this.$nowType.split(" ")[0]).attr("class", "GooFlow_tool_btn");
			this.$tool.children("#" + this.$id + "_btn_" + type.split(" ")[0]).attr("class", "GooFlow_tool_btndown");
		}
		if(this.$nowType == "direct") {
			this.blurItem();
		}
		if(this.$textArea.css("display") == "none") {
			this.$textArea.removeData("id").val("").hide();
		}
	},
	//增加一个流程结点,传参为一个JSON,有id,name,top,left,width,height,type(结点类型)等属性
	addNode: function(id, json) {
		if(json.type.indexOf(" round") > 0) {
			this.$nodeDom[id] = $(
				`<div class='GooFlow_item item_round' id='${id}' type='${json.type}' style='top:${json.top}px;left:${json.left}px'>
					<table cellspacing='0'>
						<tr>
							<td class='ico'><i class='ico_${json.type}'></i></td>
						</tr>
					</table>
					<div class='span'>${json.name}</div>
					<div class='item_menu'>
						<ul>
							<li class='rs_close'>删除节点</li>
						</ul>
					</div>
				</div>`
			);
			this.$workArea.append(this.$nodeDom[id]);
			json.width = 33;
			json.height = 33;
		} 
		else if(json.type.indexOf(" rectangle") > 0) {
			this.$nodeDom[id] = $(
				`<div class='GooFlow_item item_rectangle' id='${id}' type='${json.type}' style='top:${json.top}px;left:${json.left}px'>
					<table cellspacing='0'>
						<tr>
							<td class='ico'><i class='ico_${json.type}'></i></td>
						</tr>
					</table>
					<div class='item_menu'>
						<ul>
							<li class='rs_close'>删除节点</li>
						</ul>
					</div>
				</div>`
			);
			this.$workArea.append(this.$nodeDom[id]);
			json.width = 35;
			json.height = 35;
		}
		else {
			this.$nodeDom[id] = $(
				`<div class='GooFlow_item item_primary' id='${id}' type='${json.type}' style='top:${json.top}px;left:${json.left}px'>
					<table cellspacing='1'>
						<tr>
							<td class='ico'><i class='ico_${json.type}' style="background:url(${json.icon}) no-repeat"></i></td>
							<td>${json.name}</td>
						</tr>
					</table>
					<div class='item_menu'>
						<ul>
						<li class='rs_close'>删除节点</li>
						</ul>
					</div>
				</div>`
			);
			this.$workArea.append(this.$nodeDom[id]);
			json.width = this.$nodeDom[id].width()+30
			json.height = this.$nodeDom[id].height()+20
		}
		json.data = json.data||{}
		this.$nodeData[id] = json;
	},
	initWorkForNode: function() {
		//绑定点击事件
		this.$workArea.delegate(".GooFlow_item", "click", {
			inthis: this
		}, function(e) {
			if(e.data.inthis.$nowType == "direct" || document.getElementById("GooFlow_tmp_line")) return;
			let This = e.data.inthis
			This.focusItem(this.id, true);
			This.switchToolBtn("cursor")
			e.data.inthis.$tree.selectNode(e.data.inthis.$tree.getNodeByParam("id", "cursor"));
		});
		this.$workArea.delegate(".GooFlow_item", "mousedown", {
			inthis: this
		}, function(e) {
			let This = e.data.inthis
			if(e.button == 2) {
				This.focusItem(this.id, true);
				This.$tree.selectNode(This.$tree.getNodeByParam("id", "cursor"));
				This.switchToolBtn("cursor")
				This.$focusTreeNode = $(this).attr("type")
				if($(".item_focus .item_menu").css("display") == 'none') {
					$(".item_focus .item_menu").slideDown("fast")
				}
			}
		});
		//绑定用鼠标移动事件
		this.$workArea.delegate(".GooFlow_item", "mousedown", {
			inthis: this
		}, function(e) {
			if(!e) e = window.event;
			if(e.button == 0) {
				let This = e.data.inthis;
				if(This.$nowType == "direct") return;
				if(e.target.className == "item_menu"||$(e.target).parents(".item_menu").length>0) return 
				let dom = $(this)
				let id = dom.attr("id");
				This.focusItem(id, true);
				let hack = 1;
				let ev = mousePosition(e),
					t = getElCoordinate(This.$workArea[0]);

				dom.children("table").clone().prependTo(This.$ghost);
				let X, Y;
				X = ev.x - t.left + parseInt(This.$bgDiv.parent().css("left"));
				Y = ev.y - t.top + parseInt(This.$bgDiv.parent().css("top"));
				let vX = X - This.$nodeData[id].left,
					vY = Y - This.$nodeData[id].top;
				let isMove = false;
				document.onmousemove = function(e) {
					if(!e) e = window.event;
					let ev = mousePosition(e);
					if(X == ev.x - vX && Y == ev.y - vY) return false;
					X = ev.x - vX;
					Y = ev.y - vY;
					if(isMove && This.$ghost.css("display") == "none") {
						This.$ghost.css({
							display: "block",
							width: dom.width() + 14,
							height: dom.height() + 10,
							top: This.$nodeData[id].top + t.top - parseInt(This.$bgDiv.parent().css("top")) + hack + "px",
							left: This.$nodeData[id].left + t.left - parseInt(This.$bgDiv.parent().css("left")) + hack + "px",
							cursor: "move"
						});
					}

					if(X < t.left - parseInt(This.$bgDiv.parent().css("left")))
						X = t.left - parseInt(This.$bgDiv.parent().css("left"));
					else if(X + parseInt(This.$bgDiv.parent().css("left")) + This.$nodeData[id].width > t.left + This.$workArea.width())
						X = t.left + This.$workArea.width() - parseInt(This.$bgDiv.parent().css("left")) - This.$nodeData[id].width;
					if(Y < t.top - parseInt(This.$bgDiv.parent().css("top")))
						Y = t.top - parseInt(This.$bgDiv.parent().css("top"));
					else if(Y + parseInt(This.$bgDiv.parent().css("top")) + This.$nodeData[id].height > t.top + This.$workArea.height())
						Y = t.top + This.$workArea.height() - parseInt(This.$bgDiv.parent().css("top")) - This.$nodeData[id].height;
					This.$ghost.css({
						left: X + hack + "px",
						top: Y + hack + "px"
					});
					isMove = true;
				}
				document.onmouseup = function(e) {
					if(isMove) This.moveNode(id, X + parseInt(This.$bgDiv.parent().css("left")) - t.left, Y + parseInt(This.$bgDiv.parent().css("top")) - t.top);
					This.$ghost.empty().hide();
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}
		});
		//绑定鼠标覆盖/移出事件
		this.$workArea.delegate(".GooFlow_item", "mouseenter", {
			inthis: this
		}, function(e) {
			if(e.data.inthis.$nowType != "direct" && !document.getElementById("GooFlow_tmp_line")) return;
			$(this).addClass("crosshair").css("border-color", "#ff3300");
		});
		this.$workArea.delegate(".GooFlow_item", "mouseleave", {
			inthis: this
		}, function(e) {
			if(e.data.inthis.$nowType != "direct" && !document.getElementById("GooFlow_tmp_line")) return;
			$(this).removeClass("crosshair");
			if(this.id == e.data.inthis.$focus) {
				$(this).css("border-color", "#3892D3");
			} else {
				$(this).css("border-color", "#A1DCEB");
			}
			let top = $(this).css("top")
			let left = $(this).css("left")
			$(this).removeAttr("style")
			$(this).css({
				top: top,
				left: left
			})
		});
		//绑定连线时确定初始点
		this.$workArea.delegate(".GooFlow_item", "mousedown", {
			inthis: this
		}, function(e) {
			if(e.button == 2) return false;
			let This = e.data.inthis;
			if(This.$nowType != "direct") return;
			let ev = mousePosition(e),
				t = getElCoordinate(This.$workArea[0]);
			let X, Y;
			X = ev.x - t.left + This.$workArea[0].parentNode.scrollLeft;
			Y = ev.y - t.top + This.$workArea[0].parentNode.scrollTop;
			This.$workArea.data("lineStart", {
				"x": X,
				"y": Y,
				"id": this.id
			}).css("cursor", "crosshair");
			let line = GooFlow.prototype.drawLine("GooFlow_tmp_line", [X, Y], [X, Y], true);
			This.$draw.appendChild(line);
		});
		//绑定连线时确定结束点
		this.$workArea.delegate(".GooFlow_item", "mouseup", {
			inthis: this
		}, function(e) {
			let This = e.data.inthis;
			if(This.$nowType != "direct" && !This.$mpTo.data("p")) return;
			let lineStart = This.$workArea.data("lineStart");
			let lineEnd = This.$workArea.data("lineEnd");
			if(lineStart && !This.$mpTo.data("p")) {
				This.addLine(This.$id + "_line_" + This.$max, {
					from: lineStart.id,
					to: this.id,
					name: ""
				});
				This.$max++;
			} else {
				if(lineStart) {
					This.moveLinePoints(This.$focus, lineStart.id, this.id);
				} else if(lineEnd) {
					This.moveLinePoints(This.$focus, this.id, lineEnd.id);
				}
			}
		});
		//绑定结点的删除功能
		this.$workArea.delegate(".rs_close", "click", {
			inthis: this
		}, function(e) {
			if(!e) e = window.event;
			let This = e.data.inthis
			This.delNode(e.data.inthis.$focus);
			This.switchToolBtn("cursor")
			This.$tree.selectNode(e.data.inthis.$tree.getNodeByParam("id", "cursor"));
			return false;
		});

	},

	//取消所有结点/连线被选定的状态
	blurItem: function() {
		if(this.$focus != "") {
			let jq = $("#" + this.$focus);
			if(jq.prop("tagName") == "DIV") {
				jq.removeClass("item_focus")
			} else {
					jq[0].childNodes[1].setAttribute("stroke", "#3892D3");
					jq[0].childNodes[1].setAttribute("marker-end", "url('#arrow1')");
				this.$lineMove.hide().removeData("type").removeData("tid");
				this.$lineOper.hide().removeData("tid");
				this.$mpFrom.hide().removeData("p");
				this.$mpTo.hide().removeData("p");

			}
		}
		this.$focus = "";
		return true;
	},
	//选定某个结点/转换线 bool:TRUE决定了要触发选中事件，FALSE则不触发选中事件，多用在程序内部调用。
	focusItem: function(id, bool) {
		$(".item_focus .item_menu").slideUp("fast");
		let jq = $("#" + id);
		if(jq.length == 0) return;
		if(!this.blurItem()) return; //先执行"取消选中",如果返回FLASE,则也会阻止选定事件继续进行.
		if(jq.prop("tagName") == "DIV") {
			jq.addClass("item_focus");
			this.$workArea.append(jq);
		} 
		else { //如果是连接线
			jq[0].childNodes[1].setAttribute("stroke", "#ff3300");
			jq[0].childNodes[1].setAttribute("marker-end", "url('#arrow2')");
			let x, y, from, to, n;
			from = jq.attr("from").split(",");
			to = jq.attr("to").split(",");
			n = [from[0], from[1], to[0], to[1]];
			from[0] = parseInt(from[0], 10);
			from[1] = parseInt(from[1], 10);
			to[0] = parseInt(to[0], 10);
			to[1] = parseInt(to[1], 10);
			//let t=getElCoordinate(this.$workArea[0]);
			if(this.$lineData[id].type == "lr") {
				from[0] = this.$lineData[id].M;
				to[0] = from[0];

				this.$lineMove.css({
					width: "5px",
					height: (to[1] - from[1]) * (to[1] > from[1] ? 1 : -1) + "px",
					left: from[0] - 3 + "px",
					top: (to[1] > from[1] ? from[1] : to[1]) + 1 + "px",
					cursor: "e-resize",
					display: "block"
				}).data({
					"type": "lr",
					"tid": id
				});
			} else if(this.$lineData[id].type == "tb") {
				from[1] = this.$lineData[id].M;
				to[1] = from[1];
				this.$lineMove.css({
					width: (to[0] - from[0]) * (to[0] > from[0] ? 1 : -1) + "px",
					height: "5px",
					left: (to[0] > from[0] ? from[0] : to[0]) + 1 + "px",
					top: from[1] - 3 + "px",
					cursor: "s-resize",
					display: "block"
				}).data({
					"type": "tb",
					"tid": id
				});
			}
			x = (from[0] + to[0]) / 2 - 35;
			y = (from[1] + to[1]) / 2 + 6;
			this.$lineOper.css({
				display: "block",
				left: x + "px",
				top: y + "px"
			}).data("tid", id);
			this.$mpFrom.css({
				display: "block",
				left: n[0] - 4 + "px",
				top: n[1] - 4 + "px"
			}).data("p", n[0] + "," + n[1]);
			this.$mpTo.css({
				display: "block",
				left: n[2] - 4 + "px",
				top: n[3] - 4 + "px"
			}).data("p", n[2] + "," + n[3]);

			this.$draw.appendChild(jq[0]);
		}
		this.$focus = id;
	},
	//移动结点到一个新的位置
	moveNode: function(id, left, top) {
		if(!this.$nodeData[id]) return;
		if(left < 0) left = 0;
		if(top < 0) top = 0;
		$("#" + id).css({
			left: left + "px",
			top: top + "px"
		});
		this.$nodeData[id].left = left;
		this.$nodeData[id].top = top;
		//重画转换线
		this.resetLines(id, this.$nodeData[id]);

	},
	//设置结点/连线/分组区域的文字信息
	setName: function(id, name, type) {
		let oldName;
		if(type == "node") { //如果是结点
			if(!this.$nodeData[id]) return;
			if(this.$nodeData[id].name == name) return;
			oldName = this.$nodeData[id].name;
			this.$nodeData[id].name = name;
			if(this.$nodeData[id].type.indexOf("round") > 1) {
				this.$nodeDom[id].children(".span").text(name);
			} else {
				this.$nodeDom[id].find("td:eq(1)").text(name);
				let hack = 0;
				let width = this.$nodeDom[id].outerWidth();
				let height = this.$nodeDom[id].outerHeight();
				this.$nodeData[id].width = width;
				this.$nodeData[id].height = height;
			}

			//重画转换线
			this.resetLines(id, this.$nodeData[id]);
		} else if(type == "line") { //如果是线
			if(!this.$lineData[id]) return;
			if(this.$lineData[id].name == name) return;
			oldName = this.$lineData[id].name;
			this.$lineData[id].name = name;
			this.$lineDom[id].childNodes[2].textContent = name;

		}
	},
	//删除结点
	delNode: function(id) {
		if(!this.$nodeData[id]) return;
		//先删除可能的连线
		for(let k in this.$lineData) {
			if(this.$lineData[k].from == id || this.$lineData[k].to == id) {
				this.delLine(k);
			}
		}

		delete this.$nodeData[id];
		this.$nodeDom[id].remove();
		delete this.$nodeDom[id];
		if(this.$focus == id) this.$focus = "";

	},
	//载入一组数据
	loadData: function(data) {
		if(data.initNum){
			this.$max = data.initNum;
		}
		if(data.flowId){
			this.$flowId = data.flowId;
		}
		if(data.flowName){
			this.$flowName = data.flowName;
		}
		for(let i in data.nodes){
			this.addNode(i, data.nodes[i]);
		}
		for(let j in data.lines){
			this.addLine(j, data.lines[j]);
		}
	},
	//把画好的整个流程图导出到一个变量中(其实也可以直接访问GooFlow对象的$nodeData,$lineData,$areaData这三个JSON属性)
	exportData: function() {
		let ret = {
			title: this.$title,
			nodes: this.$nodeData,
			lines: this.$lineData,
			initNum: this.$max,
			flowId: this.$flowId,
			flowName: this.$flowName
		};
		return ret;
	},
	//清空工作区及已载入的数据
	clearData: function() {
		for(let key in this.$nodeData) {
			this.delNode(key);
		}
		for(let key in this.$lineData) {
			this.delLine(key);
		}
	},
	//销毁自己
	destrory: function() {
		this.$bgDiv.empty();
		this.$lineData = null;
		this.$nodeData = null;
		this.$lineDom = null;
		this.$nodeDom = null;
	},
	///////////以下为有关画线的方法
	//绘制一条箭头线，并返回线的DOM
	drawLine: function(id, sp, ep, dash) {
		let line;
		line = document.createElementNS("http://www.w3.org/2000/svg", "g");
		let hi = document.createElementNS("http://www.w3.org/2000/svg", "path");
		let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

		if(id != "") line.setAttribute("id", id);
		line.setAttribute("from", sp[0] + "," + sp[1]);
		line.setAttribute("to", ep[0] + "," + ep[1]);
		hi.setAttribute("visibility", "hidden");
		hi.setAttribute("stroke-width", 9);
		hi.setAttribute("fill", "none");
		hi.setAttribute("stroke", "white");
		hi.setAttribute("d", "M " + sp[0] + " " + sp[1] + " L " + ep[0] + " " + ep[1]);
		hi.setAttribute("pointer-events", "stroke");
		path.setAttribute("d", "M " + sp[0] + " " + sp[1] + " L " + ep[0] + " " + ep[1]);
		path.setAttribute("stroke-width", 1.4);
		path.setAttribute("stroke-linecap", "round");
		path.setAttribute("fill", "none");
		if(dash) path.setAttribute("style", "stroke-dasharray:6,5");

			path.setAttribute("stroke", "#3892D3");
			path.setAttribute("marker-end", "url('#arrow1')");
		line.appendChild(hi);
		line.appendChild(path);
		line.style.cursor = "crosshair";
		if(id != "" && id != "GooFlow_tmp_line") {
			let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.setAttribute("fill","#333");
			line.appendChild(text);
			let x = (ep[0] + sp[0]) / 2;
			let y = (ep[1] + sp[1]) / 2;
			text.setAttribute("text-anchor", "middle");
			text.setAttribute("x", x);
			text.setAttribute("y", y);
			line.style.cursor = "pointer";
			text.style.cursor = "text";
		}

		return line;
	},
	//画一条只有两个中点的折线
	drawPoly: function(id, sp, m1, m2, ep) {
		let poly, strPath;
		poly = document.createElementNS("http://www.w3.org/2000/svg", "g");
		let hi = document.createElementNS("http://www.w3.org/2000/svg", "path");
		let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		if(id != "") poly.setAttribute("id", id);
		poly.setAttribute("from", sp[0] + "," + sp[1]);
		poly.setAttribute("to", ep[0] + "," + ep[1]);
		hi.setAttribute("visibility", "hidden");
		hi.setAttribute("stroke-width", 9);
		hi.setAttribute("fill", "none");
		hi.setAttribute("stroke", "white");
		strPath = "M " + sp[0] + " " + sp[1];
		if(m1[0] != sp[0] || m1[1] != sp[1])
			strPath += " L " + m1[0] + " " + m1[1];
		if(m2[0] != ep[0] || m2[1] != ep[1])
			strPath += " L " + m2[0] + " " + m2[1];
		strPath += " L " + ep[0] + " " + ep[1];
		hi.setAttribute("d", strPath);
		hi.setAttribute("pointer-events", "stroke");
		path.setAttribute("d", strPath);
		path.setAttribute("stroke-width", 1.4);
		path.setAttribute("stroke-linecap", "round");
		path.setAttribute("fill", "none");
		path.setAttribute("stroke", "#3892D3");
		path.setAttribute("marker-end", "url('#arrow1')");
		poly.appendChild(hi);
		poly.appendChild(path);
		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.setAttribute("fill", "#333");
		poly.appendChild(text);
		let x = (m2[0] + m1[0]) / 2;
		let y = (m2[1] + m1[1]) / 2;
		text.setAttribute("text-anchor", "middle");
		text.setAttribute("x", x);
		text.setAttribute("y", y);
		text.style.cursor = "text";
		poly.style.cursor = "pointer";

		return poly;
	},
	//计算两个结点间要连直线的话，连线的开始坐标和结束坐标
	calcStartEnd: function(n1, n2) {
		let X_1, Y_1, X_2, Y_2;
		//X判断：
		let x11 = n1.left,
			x12 = n1.left + n1.width,
			x21 = n2.left,
			x22 = n2.left + n2.width;
		//结点2在结点1左边
		if(x11 >= x22) {
			X_1 = x11;
			X_2 = x22;
		}
		//结点2在结点1右边
		else if(x12 <= x21) {
			X_1 = x12;
			X_2 = x21;
		}
		//结点2在结点1水平部分重合
		else if(x11 <= x21 && x12 >= x21 && x12 <= x22) {
			X_1 = (x12 + x21) / 2;
			X_2 = X_1;
		} else if(x11 >= x21 && x12 <= x22) {
			X_1 = (x11 + x12) / 2;
			X_2 = X_1;
		} else if(x21 >= x11 && x22 <= x12) {
			X_1 = (x21 + x22) / 2;
			X_2 = X_1;
		} else if(x11 <= x22 && x12 >= x22) {
			X_1 = (x11 + x22) / 2;
			X_2 = X_1;
		}

		//Y判断：
		let y11 = n1.top,
			y12 = n1.top + n1.height,
			y21 = n2.top,
			y22 = n2.top + n2.height;
		//结点2在结点1上边
		if(y11 >= y22) {
			Y_1 = y11;
			Y_2 = y22;
		}
		//结点2在结点1下边
		else if(y12 <= y21) {
			Y_1 = y12;
			Y_2 = y21;
		}
		//结点2在结点1垂直部分重合
		else if(y11 <= y21 && y12 >= y21 && y12 <= y22) {
			Y_1 = (y12 + y21) / 2;
			Y_2 = Y_1;
		} else if(y11 >= y21 && y12 <= y22) {
			Y_1 = (y11 + y12) / 2;
			Y_2 = Y_1;
		} else if(y21 >= y11 && y22 <= y12) {
			Y_1 = (y21 + y22) / 2;
			Y_2 = Y_1;
		} else if(y11 <= y22 && y12 >= y22) {
			Y_1 = (y11 + y22) / 2;
			Y_2 = Y_1;
		}
		return {
			"start": [X_1, Y_1],
			"end": [X_2, Y_2]
		};
	},
	//计算两个结点间要连折线的话，连线的所有坐标
	calcPolyPoints: function(n1, n2, type, M) {
		//开始/结束两个结点的中心
		let SP = {
			x: n1.left + n1.width / 2,
			y: n1.top + n1.height / 2
		};
		let EP = {
			x: n2.left + n2.width / 2,
			y: n2.top + n2.height / 2
		};
		let sp = [],
			m1 = [],
			m2 = [],
			ep = [];
		//如果是允许中段可左右移动的折线,则参数M为可移动中段线的X坐标
		//粗略计算起始点
		sp = [SP.x, SP.y];
		ep = [EP.x, EP.y];
		if(type == "lr") {
			//粗略计算2个中点
			m1 = [M, SP.y];
			m2 = [M, EP.y];
			//再具体分析修改开始点和中点1
			if(m1[0] > n1.left && m1[0] < n1.left + n1.width) {
				m1[1] = (SP.y > EP.y ? n1.top : n1.top + n1.height);
				sp[0] = m1[0];
				sp[1] = m1[1];
			} else {
				sp[0] = (m1[0] < n1.left ? n1.left : n1.left + n1.width)
			}
			//再具体分析中点2和结束点
			if(m2[0] > n2.left && m2[0] < n2.left + n2.width) {
				m2[1] = (SP.y > EP.y ? n2.top + n2.height : n2.top);
				ep[0] = m2[0];
				ep[1] = m2[1];
			} else {
				ep[0] = (m2[0] < n2.left ? n2.left : n2.left + n2.width)
			}
		}
		//如果是允许中段可上下移动的折线,则参数M为可移动中段线的Y坐标
		else if(type == "tb") {
			//粗略计算2个中点
			m1 = [SP.x, M];
			m2 = [EP.x, M];
			//再具体分析修改开始点和中点1
			if(m1[1] > n1.top && m1[1] < n1.top + n1.height) {
				m1[0] = (SP.x > EP.x ? n1.left : n1.left + n1.width);
				sp[0] = m1[0];
				sp[1] = m1[1];
			} else {
				sp[1] = (m1[1] < n1.top ? n1.top : n1.top + n1.height)
			}
			//再具体分析中点2和结束点
			if(m2[1] > n2.top && m2[1] < n2.top + n2.height) {
				m2[0] = (SP.x > EP.x ? n2.left + n2.width : n2.left);
				ep[0] = m2[0];
				ep[1] = m2[1];
			} else {
				ep[1] = (m2[1] < n2.top ? n2.top : n2.top + n2.height);
			}
		}
		return {
			start: sp,
			m1: m1,
			m2: m2,
			end: ep
		};
	},
	//初始化折线中段的X/Y坐标,mType='rb'时为X坐标,mType='tb'时为Y坐标
	getMValue: function(n1, n2, mType) {
		if(mType == "lr") {
			return(n1.left + n1.width / 2 + n2.left + n2.width / 2) / 2;
		} else if(mType == "tb") {
			return(n1.top + n1.height / 2 + n2.top + n2.height / 2) / 2;
		}
	},
	//原lineData已经设定好的情况下，只在绘图工作区画一条线的页面元素
	addLineDom: function(id, lineData) {
		let n1 = this.$nodeData[lineData.from],
			n2 = this.$nodeData[lineData.to]; //获取开始/结束结点的数据
		if(!n1 || !n2) return;
		//开始计算线端点坐标
		let res;
		if(lineData.type && lineData.type != "sl") {
			res = GooFlow.prototype.calcPolyPoints(n1, n2, lineData.type, lineData.M);
		} else {
			res = GooFlow.prototype.calcStartEnd(n1, n2);
		}
		if(!res) return;

		if(lineData.type == "sl")
			this.$lineDom[id] = GooFlow.prototype.drawLine(id, res.start, res.end);
		else {
			this.$lineDom[id] = GooFlow.prototype.drawPoly(id, res.start, res.m1, res.m2, res.end);
		}
		this.$draw.appendChild(this.$lineDom[id]);
		this.$lineDom[id].childNodes[2].textContent = lineData.name;
	},
	//增加一条线
	addLine: function(id, json) {
		if(json.from == json.to) return;
		let n1 = this.$nodeData[json.from],
			n2 = this.$nodeData[json.to]; //获取开始/结束结点的数据
		if(!n1 || !n2) return;
		//避免两个节点间不能有一条以上同向接连线
		for(let k in this.$lineData) {
			if((json.from == this.$lineData[k].from && json.to == this.$lineData[k].to))
				return;
		}
		//设置$lineData[id]
		this.$lineData[id] = {};
		if(json.type) {
			this.$lineData[id].type = json.type;
			this.$lineData[id].M = json.M;
		} else {
			this.$lineData[id].type = "sl"; //默认为直线
		}
		this.$lineData[id].from = json.from;
		this.$lineData[id].to = json.to;
		this.$lineData[id].name = json.name;
		//设置$lineData[id]完毕
		this.addLineDom(id, this.$lineData[id]);

	},
	//重构所有连向某个结点的线的显示，传参结构为$nodeData数组的一个单元结构
	resetLines: function(id, node) {
		for(let i in this.$lineData) {
			let other = null; //获取结束/开始结点的数据
			let res;
			if(this.$lineData[i].from == id) { //找结束点
				other = this.$nodeData[this.$lineData[i].to] || null;
				if(other == null) continue;
				if(this.$lineData[i].type == "sl")
					res = GooFlow.prototype.calcStartEnd(node, other);
				else
					res = GooFlow.prototype.calcPolyPoints(node, other, this.$lineData[i].type, this.$lineData[i].M)
				if(!res) break;
			} else if(this.$lineData[i].to == id) { //找开始点
				other = this.$nodeData[this.$lineData[i].from] || null;
				if(other == null) continue;
				if(this.$lineData[i].type == "sl")
					res = GooFlow.prototype.calcStartEnd(other, node);
				else
					res = GooFlow.prototype.calcPolyPoints(other, node, this.$lineData[i].type, this.$lineData[i].M);
				if(!res) break;
			}
			if(other == null) continue;
			this.$draw.removeChild(this.$lineDom[i]);
			if(this.$lineData[i].type == "sl") {
				this.$lineDom[i] = GooFlow.prototype.drawLine(i, res.start, res.end);
			} else {
				this.$lineDom[i] = GooFlow.prototype.drawPoly(i, res.start, res.m1, res.m2, res.end);
			}
			this.$draw.appendChild(this.$lineDom[i]);
			this.$lineDom[i].childNodes[2].textContent=this.$lineData[i].name;
		}
	},
	//重新设置连线的样式 newType= "sl":直线, "lr":中段可左右移动型折线, "tb":中段可上下移动型折线
	setLineType: function(id, newType, M) {
		if(!newType || newType == null || newType == "" || newType == this.$lineData[id].type) return false;
		let from = this.$lineData[id].from;
		let to = this.$lineData[id].to;
		this.$lineData[id].type = newType;
		let res;
		//如果是变成折线
		if(newType != "sl") {
			let res = GooFlow.prototype.calcPolyPoints(this.$nodeData[from], this.$nodeData[to], this.$lineData[id].type, this.$lineData[id].M);
			if(M) {
				this.setLineM(id, M, true);
			} else {
				this.setLineM(id, this.getMValue(this.$nodeData[from], this.$nodeData[to], newType), true);
			}
		}
		//如果是变回直线
		else {
			delete this.$lineData[id].M;
			this.$lineMove.hide().removeData("type").removeData("tid");
			res = GooFlow.prototype.calcStartEnd(this.$nodeData[from], this.$nodeData[to]);
			if(!res) return;
			this.$draw.removeChild(this.$lineDom[id]);
			this.$lineDom[id] = GooFlow.prototype.drawLine(id, res.start, res.end);
			this.$draw.appendChild(this.$lineDom[id]);
			this.$lineDom[id].childNodes[2].textContent=this.$lineData[id].name;
		}
		if(this.$focus == id) {
			this.focusItem(id);
		}

	},
	//设置折线中段的X坐标值（可左右移动时）或Y坐标值（可上下移动时）
	setLineM: function(id, M, noStack) {
		if(!this.$lineData[id] || M < 0 || !this.$lineData[id].type || this.$lineData[id].type == "sl") return false;
		let from = this.$lineData[id].from;
		let to = this.$lineData[id].to;
		this.$lineData[id].M = M;
		let ps = GooFlow.prototype.calcPolyPoints(this.$nodeData[from], this.$nodeData[to], this.$lineData[id].type, this.$lineData[id].M);
		this.$draw.removeChild(this.$lineDom[id]);
		this.$lineDom[id] = GooFlow.prototype.drawPoly(id, ps.start, ps.m1, ps.m2, ps.end);
		this.$draw.appendChild(this.$lineDom[id]);
		this.$lineDom[id].childNodes[2].textContent=this.$lineData[id].name;
	},
	//删除转换线
	delLine: function(id) {
		if(!this.$lineData[id]) return;
		this.$draw.removeChild(this.$lineDom[id]);
		delete this.$lineData[id];
		delete this.$lineDom[id];
		if(this.$focus == id) this.$focus = "";
		this.$mpFrom.hide().removeData("p");
		this.$mpTo.hide().removeData("p");
		this.$lineOper.hide().removeData("tid");
	},
	//变更连线两个端点所连的结点
	//参数：要变更端点的连线ID，新的开始结点ID、新的结束结点ID；如果开始/结束结点ID是传入null或者""，则表示原端点不变
	moveLinePoints: function(lineId, newStart, newEnd, noStack) {
		if(newStart == newEnd) return;
		if(!lineId || !this.$lineData[lineId]) return;
		if(newStart == null || newStart == "")
			newStart = this.$lineData[lineId].from;
		if(newEnd == null || newEnd == "")
			newEnd = this.$lineData[lineId].to;

		//避免两个节点间不能有一条以上同向接连线
		for(let k in this.$lineData) {
			if((newStart == this.$lineData[k].from && newEnd == this.$lineData[k].to))
				return;
		}
		if(newStart != null && newStart != "") {
			this.$lineData[lineId].from = newStart;
		}
		if(newEnd != null && newEnd != "") {
			this.$lineData[lineId].to = newEnd;
		}
		//重建转换线
		this.$draw.removeChild(this.$lineDom[lineId]);
		this.addLineDom(lineId, this.$lineData[lineId]);
	},
	parseXml: function() {
		let data = this.exportData()
		console.log(data.lines)
		let uid = "uid001"
		let flowname = "流程图一"
		let txt = ""
		for(let x in data.nodes) {
			let name = data.nodes[x].name
			if(name == "开始") {
				txt += `    <startEvent id="${x}" name="开始"></startEvent>\n`
			} else if(name == "结束") {
				txt += `    <endEvent id="${x}" name="结束"></endEvent>\n`
			} else if(name == "并行网关") {
				txt += `    <exclusiveGateway id="${x}" name="并行网关"></exclusiveGateway>\n`
			} else {
				let exClass = `<extensionElements>
			<activiti:taskListener event="create" class="${data.nodes[x].data.class}"></activiti:taskListener>
		 </extensionElements>`
				let id = `activiti:assignee="${data.nodes[x].data.id}"`
				txt += `    <userTask id="${x}" name="${name}"  activiti:exclusive="true" ${data.nodes[x].data.id?id:""}>
		${data.nodes[x].data.class?exClass:""}
	</userTask>\n`
			}
		}
		for(let x in data.lines) {
			let exCon = `<conditionExpression xsi:type="tFormalExpression"><![CDATA[${data.lines[x].name}]]></conditionExpression>`
			txt += `    <sequenceFlow id="${x}" sourceRef="${data.lines[x].from}" targetRef="${data.lines[x].to}">
		${data.lines[x].name?exCon:""}
	</sequenceFlow>\n`
		}
		txt = `<process id="${this.$flowId}" name="${this.$flowName}" isClosed="false" isExecutable="true" processType="None">\n${txt}</process>`
		return txt
	},
	exportXml: function() {
		let data = this.exportData()
		let txt = ""
		for(let x in data.nodes) {
			let name = data.nodes[x].name
			if(name == "开始") {
				txt += `<startEvent id="${x}" name="开始"></startEvent>`
			} else if(name == "结束") {
				txt += `<endEvent id="${x}" name="结束"></endEvent>`
			} else if(name == "并行网关") {
				txt += `    <exclusiveGateway id="${x}" name="并行网关"></exclusiveGateway>\n`
			} else {
				let exClass = `<extensionElements><activiti:taskListener event="create" class="${data.nodes[x].data.class}"></activiti:taskListener></extensionElements>`
				let id = `activiti:assignee="${data.nodes[x].data.id}"`
				txt += `<userTask id="${x}" name="${name}"  activiti:exclusive="true" ${data.nodes[x].data.id?id:""}>${data.nodes[x].data.class?exClass:""}</userTask>`
			}
		}
		for(let x in data.lines) {
			let exCon = `<conditionExpression xsi:type="tFormalExpression"><![CDATA[${data.lines[x].name}]]></conditionExpression>`
			txt += `<sequenceFlow id="${x}" sourceRef="${data.lines[x].from}" targetRef="${data.lines[x].to}">${data.lines[x].name?exCon:""}</sequenceFlow>`
		}
		let _start = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:tns="http://www.activiti.org/test" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" expressionLanguage="http://www.w3.org/1999/XPath" id="m1500972151491" name="" targetNamespace="http://www.activiti.org/test" typeLanguage="http://www.w3.org/2001/XMLSchema">`
  		let _end = `</definitions>`
		txt = `${_start}<process id="${this.$flowId}" name="${this.$flowName}" isClosed="false" isExecutable="true" processType="None">${txt}</process>${_end}`
		return txt
	}
}
export default GooFlow