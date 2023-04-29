import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';



const colorsArray = ['#22c55e', '#fde047',  '#f97316',  '#38bdf8', '#fb7185','#6366f1',
'#a3e635', '#22d3ee',
'#2dd4bf',
'#78716c',
'#ec4899',
'#64748b',
'#8b5cf6',
'#e879f9',
'#f59e0b',
'#c2410c',
'#be123c',
'#4338ca',
'#047857',
'#374151',
'#be185d',
'#1d4ed8',
'#15803d',
'#b91c1c',
'#334155',
'#6d28d9',
'#0f766e',
'#b45309',
'#3f3f46',
'#7e22ce',
'#0e7490',
'#a16207',
'#404040',
'#a21caf',
'#0369a1',
'#4d7c0f',
'#44403c',
'#60a5fa',
'#d9f99d',
'#164e63'
]
//green-500 yellow-300 orange-500 sky-400 rose-400 indigo-500 lime-400 cyan-400 teal-400
//stone-500 pink-500 slate-500 violet-500 fuchsia-400 amber-500 orange-700 rose-700
//indigo-700 emerald-700 gray-700 pink-700 blue-700 green-700 red-700 slate-700 violet-700
//teal-700 amber-700 zinc-700 purple-700 cyan-700 yellow-700 neutral-700 fuchsia-700 sky-700
//lime-700 stone-700 blue-400 lime-200 cyan-900

const PieChart = ({pieData}) => {

	const pieChart = useRef()

	useEffect(()=>{
    const data = pieData
		// Get positions for each data object
		const piedata = d3.pie().value(d => d.count)(data)
		// Define arcs for graphing 
		const arc = d3.arc().innerRadius(0).outerRadius(100)

		const colors = d3.scaleOrdinal(colorsArray)

		// Define the size and position of svg
		const svg = d3.select(pieChart.current)
						.attr('width', 220)
						.attr('height', 220)
						// .style('background-color','yellow')
						.append('g')
							.attr('transform','translate(110,110)')

		// Add tooltip
		const tooldiv = d3.select('#chartArea')
						  .append('div')
						  .style('visibility','hidden')
						  .style('position','absolute')
						  .style('background-color','gray')


		// Draw pie
		svg.append('g')
			.selectAll('path')
			.data(piedata)
			.join('path')
				.attr('d', arc)
				.attr('fill',(d,i)=>colors(i))
				.attr('stroke', 'white')
				.on('mouseover', (e,d)=>{
					console.log(e)
					console.log(d)

					tooldiv.style('visibility','visible')
							.text(`${d.data.tag}: ` + `${d.data.count} ` + ' days')
				})
				.on('mousemove', (e,d)=>{
					tooldiv.style('top', (e.pageY-50) + 'px')
							.style('left', (e.pageX-50) + 'px')
				})
				.on('mouseout',()=>{
					tooldiv.style('visibility','hidden')
				})

	})

	return (
		<div id='chartArea'>
			<svg ref={pieChart} ></svg>
		</div>
	)
}

export default PieChart;