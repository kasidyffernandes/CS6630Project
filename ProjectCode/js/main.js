class MainGraph {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      this.data = globalApplicationState.data

      let margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

      this.main = d3.select("#one")
        .append("svg")
          .attr("width", width+ margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("style", "outline: thin solid black;") 
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      this.xScale = d3.scaleLinear()
        .range([ 0, width ])
        .domain(d3.extent(this.data.map(d=>+d.weeks_on_chart)))
    
      this.main.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(this.xScale))
    
      this.yScale = d3.scaleLinear()
          .range([ height, 0 ])
     
      this.drawTable('tempo')

    }
    drawTable(yVar){

      this.yScale.domain(d3.extent(this.data.map(d=>+d[yVar])))
      this.main.append("g").attr('class', 'yAxis').call(d3.axisLeft(this.yScale))

      let Tooltip = d3.select('#one')
      .append('div')
      .attr('class', 'tooltip')
      .style('background-color', 'lightgrey')
      .style('position', 'absolute')
      .style('visibility', 'hidden')

      let dots = this.main.append('g')
      .selectAll("dot") 
      .data(this.data)
      .enter()
      .append("circle")
        .attr("cx", d=>this.xScale(+d.weeks_on_chart))
        .attr("cy", d=> this.yScale(+d[yVar]) )
        .attr("r", 3)
        .attr("fill", "#69b3a2")
        .on('mouseover', function(d,i){
          console.log(d,i)
            Tooltip.style('visibility', 'visible')
            .html(i.track_name + '</br>' + i.artist_names)
            .style('text-transform', 'capitalize')
        })
        .on('mousemove', function(d){
          Tooltip.style('top', d.pageY -10 + 'px')
          .style('left', d.pageX + 10 + 'px')
        })
        .on('mouseout', function(d){
          Tooltip
          .style("visibility", 'hidden') 
        })
    }

}