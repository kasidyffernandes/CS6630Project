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
        .domain(d3.extent(this.data.map(d=>+d['track_pop'])))
    
      this.main.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(this.xScale))
    
      this.yScale = d3.scaleLinear()
          .range([ height, 0 ])
     
      this.drawTable('bpm')

    }
    drawTable(yVar){
      let brush = d3.brush().extent([[0,0], [800,400]]).on('start brush', this.brushed)
        .on('end', function(d){
          globalApplicationState.camelot.updateTable()
        })
        this.main.call(brush)
      this.yScale.domain(d3.extent(this.data.map(d=>+d[yVar])))
      this.main.append("g").attr('class', 'yAxis').call(d3.axisLeft(this.yScale))

      let Tooltip = d3.select('#one')
      .append('div')
      .attr('class', 'tooltip')
      .style('background-color', 'lightgrey')
      .style('position', 'absolute')
      .style('visibility', 'hidden')

      let dots = this.main.append('g')
      dots.selectAll('circle')
        .data(this.data)
        .join('circle')
        .attr("cx", d=>this.xScale(+d['track_pop']))
        .attr("cy", d=> this.yScale(+d[yVar]) )
        .attr("r", 4)
        .attr("fill", function(d){
          if(d['app'] == 'tiktok')
            return "#69b3a2"
          else 
          return '#ac87ff'
          })
        .on('mouseover', function(d,i){

            Tooltip.style('visibility', 'visible')
            .html(i.name + '</br>' + i.artist + '</br>'+ i.camelot)
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
    brushed({selection}){
      let dots = d3.select('#one').selectAll('circle')
        .attr('opacity', '.2')
        .attr('class', 'non-brushed')
      const [[x0,y0], [x1,y1]] = selection
      globalApplicationState.brushedData = dots.filter(function(){
        return x0 <= d3.select(this).attr('cx')
                && d3.select(this).attr('cx') < x1
                && y0 <=d3.select(this).attr('cy')
                && d3.select(this).attr('cy') < y1
      }).attr('opacity', '1').attr('class', 'brushed').data()
   //   console.log(globalApplicationState.brushedData)
    }
    highlighting(selected, i){
      console.log(i)
      let hdata = this.data.filter(function(d){return d.camelot== i.key})
      if(selected){
        let hdata = this.data.filter(function(d){return d.camelot== i.key})
        console.log(hdata)
        d3.selectAll('circle').data(hdata).attr('stroke', 'red')
      }
      else{
        let hdata = this.data.filter(function(d){return d.camelot== i.key})
        console.log('deselect', hdata)
        d3.selectAll('circle').data(hdata).attr('stroke', 'black')
      }
      //let i = d3.selectAll('.cselected').property('cselected', true)
      console.log(i.key)
     
     // d3.selectAll('circle').data(highlightdata).attr('stroke', 'red').raise()
     
   //  d3.selectAll('circle')
     // console.log(key)
    }

}