/*
import React,{useEffect, useRef, useState, useContext} from 'react'
import {Context} from '../Diary'
import * as d3 from 'd3'




const PieChart = ({w, pieData })=>{

    //const dataOfTheMonthForPieChart = pieData
    
    
    
    const pRef = useRef()
  
  useEffect(()=>{
    
  ///PREPARE DATA
    
    //[[{},{}], [{},{}], [{}]]
    const arrayOfarray = []
    dataOfTheMonthForPieChart.map(item => {
      const tags = item.tags
      arrayOfarray.push(tags)
    })
    
    //[['',''], [''], ['','']] need count
    const arrayOfstring = []
    arrayOfarray.map(subarray => {
      subarray.map(item => {
        const string = item.tag
        arrayOfstring.push(string)
      })
    })
    
    //[{}, {}, {}] duplicates and can't call both key and value
    const arrayOfobject = []
    arrayOfstring.map(string =>{
      
      const newarr = arrayOfstring.filter(str => str === string )
      
      const newobject = {}
      newobject[string] = newarr.length
      
      arrayOfobject.push(newobject)
      
    })
    
    //{ }
    const bigObject = {}
    arrayOfobject.map(obj=>{
      Object.assign(bigObject, obj)
    })
    
    //[ [], [], []]
    const bigArray = Object.entries(bigObject)
    
    const data = bigArray.map(array => array[1])
    
    


  
    const data = pieData
    
    const piedata = d3.pie().value(d => d )(data)
    
    const arc = d3.arc().innerRadius(0).outerRadius(w/2)
    
    const colors = d3.scaleOrdinal(['#ffa822','#134e6f','#ff6150','#1ac0c6','#dee0e6'])
    
    const svg = d3.select(pRef.current)
    .attr('width', w)
    .attr('height', w)
    .style('background-color','gray')
    .append('g')
    .attr('transform', `translate(${w/2},${w/2})`)
    
    svg.append('g')
    .selectAll('path')
    .data(piedata)
    .join('path')
      .attr('d', arc )
      .attr('fill', (i)=>colors(i))
      .attr('stroke', 'white')
    
    
    
    
    
    
  },[pieData])
  
  
  return <div>
  <svg ref={pRef} ></svg>
  
  </div>
}

export default PieChart
*/

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/*
const data = [
                {item: 'A', count: 590},
                {item: 'B', count: 291},
                {item: 'C', count: 348},
                {item: 'D', count: 145},
                {item: 'E', count: 46}
             ]
*/

const PieChart = ({pieData}) => {

	const pieChart = useRef()

	useEffect(()=>{
    const data = pieData
		// Get positions for each data object
		const piedata = d3.pie().value(d => d.count)(data)
		// Define arcs for graphing 
		const arc = d3.arc().innerRadius(0).outerRadius(100)

		const colors = d3.scaleOrdinal(['#ffa822','#134e6f','#ff6150','#1ac0c6','#dee0e6'])

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
						  .style('background-color','red')


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
							.text(`${d.data.tag}:` + `${d.data.count}`)
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
