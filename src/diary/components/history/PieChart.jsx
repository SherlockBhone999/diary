import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';



const colorsArray = ['#22c55e', '#fde047',  '#f97316',  '#38bdf8', '#fb7185','#6366f1']
//green-500 yellow-300 orange-500 sky-400 rose-400 indigo-500


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