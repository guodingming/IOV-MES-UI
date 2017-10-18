import Vue from 'vue'

Vue.directive('scroll', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el,binding) {
  	let options = binding.expression?JSON.parse(binding.expression):{"axis":"yx","theme":"dark"}
    setTimeout(()=>{
      $(el).mCustomScrollbar(options);
    })

  }
})
