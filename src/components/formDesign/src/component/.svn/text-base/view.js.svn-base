const View = function(){
	this.$workInner = $(`<div class='workInner'></div>`)
				this.$workInner.css({
					height: this._property.height,
					width: this._property.width
				})
				this.$view = $(`<div class='work'></div>`)
				this.$body.find(".view .workArea").append(this.$workInner)
				this.$workInner.append(this.$view)

				this.$container.on("click", {
					inthis: this
				}, function(e) {
					let This = e.data.inthis
					if(e.button != 0) {
						return false
					}
					else if(e.target.className == "nodes"){
						This.focusNodes(e.target.id)
					}
					else if($(e.target).parents(".nodes").length>0){
						This.focusNodes($(e.target).parents(".nodes").attr("id"))
					}
					else{
						This.blurNodes()
					}
				})
				this.$view.delegate(".nodes", "mousedown", {
					inthis: this
				}, function(e) {
					let This = e.data.inthis
					if(e.button != 0) {
						return false
					}
					if(This.$focus == $(this).attr("id")) {
						let dom = $(this)
						let id = dom.attr("id")
						let X, Y
						This.$leftRulerDash.show()
						This.$topRulerDash.show()
						let mouse_pos_temp = This.until.mousePosition(e)
						let dom_pos_temp = This.until.getElCoordinate($(this)[0])
						let offsetX = mouse_pos_temp.x-dom_pos_temp.left
						let offsetY = mouse_pos_temp.y-dom_pos_temp.top
						
						window.onmousemove = _.throttle(function(e) {
							let mouse_pos = This.until.mouseRoundPosition(e, This.until.getElCoordinate(This.$view[0]),{x:offsetX,y:offsetY})
							let dom_pos = This.until.getElCoordinate(This.$view[0])
							let temp_pos = This.getRelativePosition(This.$focus)
							X = mouse_pos.x - dom_pos.left - temp_pos.left
							Y = mouse_pos.y - dom_pos.top - temp_pos.top
							X=X>=0?X:0
							Y=Y>=0?Y:0
							let left = X + dom_pos.left + temp_pos.left - This.$offsetWidth
							let top = Y + dom_pos.top + temp_pos.top - This.$offsetHeight
							This.$leftRulerDash.css({
								left: left
							})
							This.$topRulerDash.css({
								top: top
							})
							dom.css({
								left: X,
								top: Y
							})
						}, 50)
						window.onmouseup = function(e) {
							This.$leftRulerDash.hide()
							This.$topRulerDash.hide()
							window.onmousemove = null
							window.onmouseup = null
						}
					
					}
				})
				this.$view.delegate(".delete", "click", {
					inthis: this
				}, function(e) {
					if(e.button != 0) {
						return false
					}
					let This = e.data.inthis
					This.deleteNodes(This.$focus)
				})
}
export default View