import Vue from 'vue'
import calendar from '@/components/calendar'

// 挂载元素并返回已渲染的文本的工具函数 
function getRenderedText(Component, propsData) {
	const Ctor = Vue.extend(Component)
	const vm = new Ctor({
		propsData: propsData
	}).$mount()
	return vm.$el
}

function trim(str) {
	let res = str.replace(/[\r\n\s]/g, "")
	return res
}

function getRandom() {
	let t = new Date(parseInt(Math.random() * new Date().getTime()))
	function getTotalDays(dates) {
		function getDaysInMonth(year, month) {
			let temp = new Date(year, parseInt(month, 10), 0);
			return temp.getDate();
		}
		let year = dates.getFullYear()
		let month = dates.getMonth() + 1
		let days = getDaysInMonth(year, month)
		return days
	}
	let day = getTotalDays(t)
	let arr = []
	for(let i = 1; i < day + 1; i++) {
		arr.push(i)
	}
	let safe = parseInt(Math.random() * day)
	let res = []
	for(let i = 0; i < safe; i++) {
		let index = parseInt(Math.random() * arr.length)
		res.push(arr[index])
		arr.splice(index, 1)
	}
	return {
		date: t.getFullYear() + "/" + (t.getMonth() + 1),
		safe: res.sort(function(a, b) {
			return a - b
		}),
		unsafe: arr.sort(function(a, b) {
			return a - b
		})
	}
}

describe('随机日期输入结果测试', () => {
		let data = getRandom()
		let vm = getRenderedText(calendar, data)
		it('组件渲染', () => {
			function getStr(year, month) {
				function getDate(year, month) {
					let str = ""
					let map = {
						1: 31,
						2: 28,
						3: 31,
						4: 30,
						5: 31,
						6: 30,
						7: 31,
						8: 31,
						9: 30,
						10: 31,
						11: 30,
						12: 31
					}
					if(year % 100 == 0) {
						if(year % 400 == 0) {
							map[2] = 29
						}
					}
					else if(year % 4 == 0) {
						map[2] = 29
					}
					for(let i = 1; i < map[month] + 1; i++) {
						str += i
					}
					return str
				}
				let str = `${year}年${month}月一二三四五六日${getDate(year,month)}`
				return str
			}
			expect(trim(vm.textContent)).to.equals(getStr(data.date.split("/")[0], data.date.split("/")[1]))
		})
		it('日期颜色', () => {
			function getStr(selector) {
				let dom = vm.querySelectorAll(selector)
				let arr = []
				for(let x of dom) {
					arr.push(x.textContent)
				}
				return trim(arr.join(""))
			}
			let isSafe = getStr(".success") == data.safe.join("")
			let isUnsafe = getStr(".error") == data.unsafe.join("")
			expect(isSafe && isUnsafe).to.equals(true)
		})
})