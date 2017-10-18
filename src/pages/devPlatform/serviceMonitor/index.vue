<template>
	<div id="serviceMonitor">
		<mes-table-layout :tree-data="treeData" @tree-click="treeClick" v-if="treeData">
			<template slot="extra">
				<el-form label-width="40px">
					<el-form-item label="分类">
						<mes-cascader ref="cascader" :data="cascaderData" @change="getTree">
						</mes-cascader>
					</el-form-item>
				</el-form>
			</template>
			<div class="mes-content" slot="container">
				<el-tabs v-model="activeName" @tab-click="changeTab">
					<el-tab-pane label="调用详情" name="des"></el-tab-pane>
					<el-tab-pane label="图表" name="chart"></el-tab-pane>
				</el-tabs>
				<div class="chart" v-if="activeName=='chart'">
					<div class="chartContainer" v-scroll>
						<div class="monthContent">
							<div class="dateSelect">
								<el-date-picker v-model="chooseMonth" type="year" placeholder="选择年" @change="pickTime"></el-date-picker>
							</div>
							<div class="chartContent">
								<echarts :option="optionYear"></echarts>
							</div>
						</div>

						<div class="monthContent dayContent">
							<div class="dateSelect">
								<el-date-picker v-model="chooseDay" type="month" placeholder="选择月" @change="pickTime"></el-date-picker>
							</div>
							<div class="chartContent">
								<echarts :option="optionMonth"></echarts>
							</div>
						</div>
					</div>
				</div>
				<div class="mes-table" v-if="table.data&&activeName=='des'">
					<mes-table :table-data="table.data" :table-option="table.option" :table-loading="table.loading" :total="table.pageTotal" :pageSize="table.pageSize" :pageChange="pageChange" :sizeChange="sizeChange" :pageNum="table.pageNum" :showCheckBox="false" @selectChange="selectChange">
					</mes-table>
				</div>
			</div>
		</mes-table-layout>
	</div>
</template>

<script>
	import {
		queryServiceType,
		queryService,
		queryData,
		queryCharts
	} from "./service";
	import echarts from "components/echarts"
	export default {
		components: {
			echarts
		},
		created() {
			this.init();
		},
		computed: {},
		data() {
			return {
				activeName: 'des',
				month: "",
				treeData: false,
				table: {
					option: [{
						prop: "path",
						label: "路径"
					}, {
						prop: "code",
						label: "编码"
					}, {
						prop: "tookTime",
						label: "消耗时间(ms)"
					}, {
						prop: "startTime",
						label: "发生时间"
					}, {
						prop: "status",
						label: "状态"
					}],
					data: false,
					loading: true,
					pageSize: 10,
					pageNum: 1
				},
				searchData: '',
				cascaderData:[],
				mutiDeleteData: [],
				chooseMonth: new Date(),
				chooseDay: new Date(),
				optionMonth: {},
				optionYear: {}
			}
		},
		methods: {
			init() {
				this.getServiceType()
				this.getTree()
				this.queryData()
				this.queryCharts()
			},
			async getServiceType() {
				let res = await queryServiceType()
				this.cascaderData = this.$.processArray(res.content, null, {})
			},
			async getTree(id,ids) {
				let res = await queryService({
					serviceTypeId: id
				});
				if(res.status == "success") {
					this.treeData = this.$.transformTree(res.content, {
						pNode: '接口列表',
						listArray: true
					})
				} else {
					this.treeData = []
				}
				this.selectNode = null
			},
			treeClick: function(node) {
				this.selectNode = node
				this.queryData();
				this.queryCharts();
			},
			async queryData() {
				this.table.loading = true;
				this.mutiDeleteData = [];
				let data = {
					condition: {
						serviceId: this.selectNode ? this.selectNode.id : "",
						search: this.searchData
					},
					pageSize: this.table.pageSize,
					pageNum: this.table.pageNum
				}
				let res = await queryData(data);
				if(res.status == "success") {
					this.table.data = res.content.rows || [];
					this.table.pageTotal = res.content.total;
				} else {
					this.table.data = [];
					this.table.pageTotal = 0;
				}
				this.table.loading = false;
			},
			async queryCharts() {
				let year = this.chooseMonth.getFullYear();
				let month = this.disposeTime(this.chooseDay);
				let data = {
					serviceId: this.selectNode ? this.selectNode.id : "",
					year: year,
					month: month
				}
				let res = await queryCharts(data);
				this.optionMonth = this.processMonth(res.content)
				this.optionYear = this.processYear(res.content)
			},
			//日期选择器的数值改变
			pickTime: function() {
				this.queryCharts()
			},
			//  处理日期格式
			disposeTime: function(time) {
				//将日期格式进行处理
				//日期不足两位补 0
				let Appendzero = function(obj) {
					let r = obj;
					if(obj < 10) {
						r = "0" + r;
					}
					return r;
				};
				let d = new Date(time);
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				let date = year + '-' + Appendzero(month)
				return date
			},
			changeTab: function() {
				if(this.activeName == "des") {
					this.queryData()
				} else {
					this.queryCharts()
				}
			},
			search() {
				this.queryData();
			},
			pageChange(currentPage) {
				this.table.pageNum = currentPage
				this.queryData();
			},
			sizeChange(size) {
				this.table.pageSize = size
				this.queryData();
			},
			selectChange(data) {
				this.mutiDeleteData = data
			},
			processMonth(data) {
				return {
					animation: false,
					color: ["#FF9B9D", "#37B38F"],
					title: {
						text: '按月统计调用次数表',
						textStyle: {
							fontWeight: "normal",
							fontSize: 14
						}
					},
					legend: {
						data: ['调用失败', '调用成功']
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					grid: {
						top: 100,
						bottom: 100,
						left: '5%',
						right: '5%'
					},

					xAxis: [{
						type: 'category',
						boundaryGap: false,
						xisLine: {
							lineStyle: {
								color: "#E2E2E2"
							}
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							interval: 0,
							rotate: -45,
							textStyle: {
								color: "#AFAFAF"
							}
						},
						data: data.monthLine.labels
					}],
					yAxis: [{
						type: 'value',
						name: '调用次数',
						nameTextStyle: {
							color: "#AFAFAF",
							fontSize: 12
						},
						nameGap: 30,
						type: 'value',
						axisLine: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ["#E2E2E2"]
							}
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 50,
							textStyle: {
								color: "#AFAFAF",
								align: "left"
							}
						}
					}],
					series: [{
							smooth: true,
							symbolSize: 8,
							name: '调用失败',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {}
							},
							itemStyle: {
								normal: {
									lineStyle: {
										color: "#FF9B9D",
										width: 3
									},
									areaStyle: {
										type: 'default',
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [{
												offset: 0,
												color: '#FF9B9D' // 0% 处的颜色
											}, {
												offset: 1,
												color: '#FF9B9D' // 100% 处的颜色
											}],
											globalCoord: false // 缺省为 false
										}
									}
								}
							},
							textStyle: {
								color: "#FF9B9D"
							},
							data: data.monthLine.fails
						},
						{
							smooth: true,
							symbolSize: 8,
							name: '调用成功',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {}
							},
							itemStyle: {
								normal: {
									lineStyle: {
										color: "#37B38F",
										width: 3
									},
									areaStyle: {
										type: 'default',
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [{
												offset: 0,
												color: '#37B38F' // 0% 处的颜色
											}, {
												offset: 1,
												color: '#37B38F' // 100% 处的颜色
											}],
											globalCoord: false // 缺省为 false
										}
									}
								}
							},
							textStyle: {
								color: "#FF9B9D"

							},
							data: data.monthLine.successes
						}
					]
				}
			},
			processYear(data) {
				return {
					animation: false,
					color: ["#FF9B9D", "#37B38F"],
					title: {
						text: '按年统计调用次数表',
						textStyle: {
							fontWeight: "normal",
							fontSize: 14
						}
					},
					legend: {
						data: ['调用失败', '调用成功']
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					grid: {
						top: 100,
						bottom: 100,
						left: '5%',
						right: '5%'
					},

					xAxis: [{
						type: 'category',
						boundaryGap: false,
						xisLine: {
							lineStyle: {
								color: "#E2E2E2"
							}
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							interval: 0,
							textStyle: {
								color: "#AFAFAF"
							}
						},
						data: data.yearLine.labels
					}],
					yAxis: [{
						type: 'value',
						name: '调用次数',
						nameTextStyle: {
							color: "#AFAFAF",
							fontSize: 12
						},
						nameGap: 30,
						type: 'value',
						axisLine: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ["#E2E2E2"]
							}
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 50,
							textStyle: {
								color: "#AFAFAF",
								align: "left"
							}
						}
					}],
					series: [{
							smooth: true,
							symbolSize: 8,
							name: '调用失败',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {}
							},
							itemStyle: {
								normal: {
									lineStyle: {
										color: "#FF9B9D",
										width: 3
									},
									areaStyle: {
										type: 'default',
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [{
												offset: 0,
												color: '#FF9B9D' // 0% 处的颜色
											}, {
												offset: 1,
												color: '#FF9B9D' // 100% 处的颜色
											}],
											globalCoord: false // 缺省为 false
										}
									}
								}
							},
							textStyle: {
								color: "#FF9B9D"
							},
							data: data.yearLine.fails
						},
						{
							smooth: true,
							symbolSize: 8,
							name: '调用成功',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {}
							},
							itemStyle: {
								normal: {
									lineStyle: {
										color: "#37B38F",
										width: 3
									},
									areaStyle: {
										type: 'default',
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [{
												offset: 0,
												color: '#37B38F' // 0% 处的颜色
											}, {
												offset: 1,
												color: '#37B38F' // 100% 处的颜色
											}],
											globalCoord: false // 缺省为 false
										}
									}
								}
							},
							textStyle: {
								color: "#FF9B9D"

							},
							data: data.yearLine.successes
						}
					]
				}
			}
		}
	};
</script>

<style>
	#serviceMonitor .chart {
		position: absolute;
		top: 60px;
		left: 0;
		right: 0;
		bottom: 0;
		padding-bottom: 20px;
	}
	
	#serviceMonitor .chart .monthContent {
		width: 100%;
		height: 400px;
	}
	
	#serviceMonitor .chart .monthContent .chartContent,
	#serviceMonitor .chart .chartContainer {
		width: 100%;
		height: 100%;
	}
	
	#serviceMonitor .chart .monthContent .dateSelect {
		position: absolute;
		right: 5%;
		z-index: 999;
	}
	
	#serviceMonitor .chart .monthContent:nth-of-type(1) {
		border-bottom: 1px solid #ccc;
	}
	
	#serviceMonitor .chart .dayContent {
		margin-top: 30px;
	}
</style>