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
      
      this.main.append('text')
        .attr('class', 'title')
        .attr('transform', "translate(400,0)")
        .attr('text-anchor', 'middle')
        .text('Top Song 2022')

      this.main.append('text')
        .attr("transform", "translate(" + width/2 + ",400)")
        .attr('text-anchor', 'middle')
        .text("Popularity Score")
        this.colorScale = function(d){
          let object = {};
          this.result = [];
          globalApplicationState.data.forEach(function(item){
            if(!object[item.url])
              object[item.url] = 0;
              object[item.url] += 1;
            })
          for (let prop in object){
            if(object[prop] >=2){
              this.result.push(prop);
            }}
            if(this.result.includes(d['url'])){
              return 'black'
            }else{
              if(d['app'] == 'tiktok'){
                return "#69b3a2"
              }else{return "#ac87ff"}
            }
        }
      this.main.append('text')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + width + ',-15)')
        .attr('fill',"#ac87ff" )
        .text('Spotify')
        .on('mouseover', function(d){
          d3.selectAll('circle').filter(d=>d['app'] == 'spotify').transition().attr('opacity', 1)
        })
        .on('mouseout', function(d){
          d3.selectAll('circle').filter(d=>d['app'] == 'spotify').transition().attr('opacity', .6)
        })
        .on('click', function(d){
          console.log('spot')
          let copacity= parseFloat(d3.selectAll('circle').filter(d=>[d.app] == 'spotify').attr('opacity'))
          if(copacity > 0){
            d3.select('.reset').attr('visibility', 'visible')
            d3.selectAll('circle').filter(d=>d['app'] != 'spotify').transition().attr('opacity', 0)
            d3.selectAll('circle').filter(d=>d['app'] == 'spotify').transition().attr('opacity', .6).attr('fill', '#ac87ff')
          }
        })

      this.main.append('text')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + width + ',0)')
        .attr('fill',"#69b3a2" )
        .text('TikTok') 
        .on('mouseover', function(d){
          d3.selectAll('circle').filter(d=>d['app'] == 'tiktok').transition().attr('opacity', 1)
        })
        .on('mouseout', function(d){
          d3.selectAll('circle').filter(d=>d['app'] == 'tiktok').transition().attr('opacity', .6)
        }) 
        .on('click', function(d){
          let copacity= parseFloat(d3.selectAll('circle').filter(d=>[d.app] == 'tiktok').attr('opacity'))
          if(copacity > 0){
            d3.select('.reset').attr('visibility', 'visible')
            d3.selectAll('circle').filter(d=>d['app'] != 'tiktok').transition().attr('opacity', 0)
            d3.selectAll('circle').filter(d=>d['app'] == 'tiktok').transition().attr('opacity', .6).attr('fill',  "#69b3a2")
          }
        })

      this.main.append('text')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + width + ',15)')
        .attr('fill', "black" )
        .text('Both')
        .on('click', function(d){
          d3.select('.reset').attr('visibility', 'visible')
          d3.selectAll("circle[fill='black']").transition().attr('opacity', .6)
          d3.selectAll("circle:not([fill='black'])").transition().attr('opacity', 0)
        })
      
      this.main.append('text')
        .attr('class', 'reset')
        .attr('transform', 'translate(' + width + ',30)')
        .text('Reset')
        .attr('visibility', 'hidden')
        .on('click' , d=> this.resetting())


      this.xScale = d3.scaleLinear()
        .range([ 20, width ])
        .domain(d3.extent(this.data.map(d=>+d['track_pop'])))
    
      this.main.append("g").attr("transform", "translate(0,370)").call(d3.axisBottom(this.xScale))
    
      this.yScale = d3.scaleLinear()
          .range([ height -20, 30 ])
     
    this.drawTable('bpm')

    }


    drawTable(yVar){
      if(yVar == 'bpm'){
        this.yScale.domain([0,d3.max(this.data.map(d=>+d[yVar]))])
      }else{
        this.yScale.domain(d3.extent(this.data.map(d=>+d[yVar])))
      }
  
      this.main.append('text')
        .attr('class', 'ylabel')
        .attr('transform', 'rotate(-90)')
        .attr('y', -30)
        .attr('x', -200)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text(yVar)
    
      this.main.append("g").attr('class', 'yAxis').attr("transform", "translate(20,0)").call(d3.axisLeft(this.yScale))

      let Tooltip = d3.select('#one')
        .append('div')
        .attr('class', 'tooltip')
        .style('background-color', 'lightgrey')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
      let brush = d3.brush().extent([[20,30], [750,375]]).on('start brush', this.brushed)
        .on('end', function(d){
          globalApplicationState.camelot.updateTable()
        })  
      const brushsvg = this.main.append('g').call(brush)

      let dots = this.main.append('g')
      dots.selectAll('circle')
        .data(this.data)
        .join('circle')
        .attr("cx", d=>this.xScale(+d['track_pop']))
        .attr("cy", d=> this.yScale(+d[yVar]) )
        .attr("r", 4)
        .attr('fill', d=>this.colorScale(d))
       // .attr("fill", d=> d['app'] == 'tiktok' ? "#69b3a2" : '#ac87ff')
        .attr('opacity', '.6')
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
    }
    resetting(){
      d3.selectAll('.cselected').classed('cselected', false).transition().attr('stroke', 'none')
      d3.selectAll('circle').transition().attr('opacity', .6).attr('fill', d=>this.colorScale(d)).attr('stroke','none')
      d3.select('.reset').attr('visibility', 'hidden')
    }
    highlighting(selected, i){

      if(selected){
        d3.selectAll('circle').attr('opacity', '.6')
        d3.selectAll('circle').filter(d=> d['camelot'] == i.key)
          .attr('fill', i.color).attr('stroke', 'black').attr('opacity', '1')
      }

      else{
        console.log(selected)
        d3.selectAll('circle').filter(d=> d['camelot'] == i.key)
          .attr('stroke', 'none').attr('fill',  d=> d['app'] == 'tiktok' ? "#69b3a2" : '#ac87ff').attr('opacity', '.6')
      }
      //let i = d3.selectAll('.cselected').property('cselected', true)

     // d3.selectAll('circle').data(highlightdata).attr('stroke', 'red').raise()
     
   //  d3.selectAll('circle')
     // console.log(key)
    }

}