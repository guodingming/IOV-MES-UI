<template>
	<div id="orgchart">

	</div>
</template>
<script>
	import "./jit-yc"
	export default {
		props: ['data'],
		mounted() {
			$jit.ST.Plot.NodeTypes.implement({
				'nodeline': {
					'render': function(node, canvas, animating) {
						if(animating === 'expand' || animating === 'contract') {
							let pos= node.pos.getc(true),
								nconfig = this.node,
								data = node.data;
							let width = nconfig.width
							let	height = nconfig.height
							let algnPos = this.getAlignedPos(pos, width, height);
							let ctx = canvas.getCtx(),
								ort = this.config.orientation;
							ctx.beginPath();
							if(ort == 'left' || ort == 'right') {
								ctx.moveTo(algnPos.x, algnPos.y + height / 2);
								ctx.lineTo(algnPos.x + width, algnPos.y + height / 2);
							} else {
								ctx.moveTo(algnPos.x + width / 2, algnPos.y);
								ctx.lineTo(algnPos.x + width / 2, algnPos.y + height);
							}
							ctx.stroke();
						}
					}
				}

			});

			//Create a new instance
			let st = new $jit.ST({
				'injectInto': 'orgchart',
				//set duration for the animation
				duration: 300,
				//set animation transition type
				transition: $jit.Trans.Quart.easeInOut,
				levelDistance: 80,
				levelsToShow: 1,
				Node: {
					height: 60,
					width: 150,
					type: 'nodeline',
					color: '#23A4FF',
					lineWidth: 2,
					align: "center",
					overridable: false
				},

				Edge: {
					type: 'bezier',
					lineWidth: 2,
					color: 'rgb(57,141,238)',
					overridable: true
				},

				//Retrieve the json data from database and create json objects for org chart
				request: function(nodeId, level, onComplete) {
					onComplete.onComplete(nodeId, {})
				},
				onCreateLabel: function(label, node) {
					label.id = node.id;
					label.title = node.name;
					label.className = "node diyNodes";
					label.innerHTML = node.name;
					label.onclick = function() {
						st.onClick(node.id);
					};
					
				}
			});
			st.loadJSON(this.data);
			//compute node positions and layout
			st.compute();
			//emulate a click on the root node.
			st.onClick(st.root);
			//end
		},
		methods: {

		}
	};
</script>

<style>
	#orgchart {
		height: 100%;
		width: 100%;
		background: url("./bg.png");
	}
	#orgchart .diyNodes{
		width: 150px;
		height: 50px;
		cursor: pointer;
		color: #FFF;
		border: 1px solid #888;
		border-radius: 5px;
		background-color: rgb(57,141,238);
		font-size: 14px;
		letter-spacing: 2px;
		text-align: center;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 10px;
		line-height: 28px;
	}
</style>