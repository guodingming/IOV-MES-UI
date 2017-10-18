const Save = function(){
	this.$save =
		$(`<div class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">读取缓存</h4>
	      </div>
	      <div class="modal-body">
	        <p>是否恢复到上次离开时候的状态?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary confirm">确定</button>
	      </div>
	    </div>
	  </div>
	</div>`)
	this.$container.append(this.$save)
}
export default Save
