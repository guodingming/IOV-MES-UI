export default {
	type:"other",
	name:"tool",
	text: "工具栏",
	template:
	`<div class="mes__formDesign_tool" style="" id="mes__tool">
		<div class="mes__formDesign_input_com pd" style="">
			<span class="mes__formDesign_word" style="">产品条码</span>
			<div class="mes__formDesign_input" style="">
			   <input class="mes__formDesign_input_inner mes__tool__pdCode" style="" placeholder="请输入关键字">
			</div>
		</div>
		<div class="mes__formDesign_input_com button" style="">
			<button class="mes__formDesign_button mes__formDesign_primary" style=""  onclick="mes__tool.submit()">确定</button>
		</div>
		<div class="mes__formDesign_input_com" style="">
			<span class="mes__formDesign_word small" style="">联板数量</span>
			<div class="mes__formDesign_input tiny" style="">
			   <input class="mes__formDesign_input_inner mes__tool__plate" style="" disabled>
			</div>
		</div>
	</div>`,
	script:
`
window.mes__tool = {
	/*
	 * 点击提交执行函数
	 */
	submit: function(){
		console.log($("#mes__tool .mes__tool__pdCode").val())
	}
}
`
}
