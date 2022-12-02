class CamelotWheel {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      let d1 = d3.rollup(this.globalApplicationState.data, v=> v.length, d=>d.camelot)
      const data = Array.from(d1)
      

      this.colordata = [
        {key:"1A", color:'#b3ffed', sort:"a", l:'Ab', text:'A-Flat Minor'},
        {key:"2A", color:'#bfffca', sort:"b", l:'Eb', text:'E-Flat Minor'},
        {key:"3A", color:'#ccfcac', sort:"c", l:'Bb', text:'B-Flat Minor'},
        {key:"4A", color:'#deeaa7', sort:"d", l:'F', text:'F Minor'},
        {key:"5A", color:'#f0cda7', sort:"e", l:'C', text:'C Minor'},
        {key:"6A", color:'#feb3b3', sort:"f", l:'G', text:'G Minor'},
        {key:"7A", color:'#fbaec5', sort:"g", l:'D', text:'D Minor'},
        {key:"8A", color:'#e9aee1', sort:"h", l:'A', text:'A Minor'},
        {key:"9A", color:'#d5aef9', sort:"i", l:'E', text:'E Minor'},
        {key:"10A", color:'#c6bcff', sort:"j", l:'B', text:'B Minor'},
        {key:"11A", color:'#b9ddff', sort:"k", l:'F#', text:'F-Sharp Minor'},
        {key:"12A", color:'#b0f8fd', sort:"l", l:'Db', text:'D-Flat Minor'},

        {key:"1B", color:'#86ffe5', sort:"m", l:'B', text:'B-Major'},
        {key:"2B", color:'#99ffad', sort:"n", l:'F#', text:'F-Sharp Major'},
        {key:"3B", color:'#b0fa7c', sort:"o", l:'Db', text:'D-Flat Major'},
        {key:"4B", color:'#c7e173', sort:"p", l:'Ab', text:'A-Flat Major'},
        {key:"5B", color:'#e5b573', sort:"q", l:'Eb', text:'E-Flat Major'},
        {key:"6B",color:'#fc7e99', sort:"r", l:'Bb', text:'B-Flat Major'},
        {key:"7B", color:'#e57ec2', sort:"s", l:'F', text:'F Major'},
        {key:"8B", color:'#c47eed', sort:"t", l:'C', text:'C Major'},
        {key:"9B",color:'#ac87ff', sort:"u", l:'G', text:'G Major'},
        {key:"10B", color:'#97b5ff', sort:"v", l:'D', text:'D Major'},
        {key:"11B", color:'#85ebfd', sort:"w", l:'A', text:'A Major'},
        {key:"12B", color:'#82fff0', sort:"x", l:'E', text:'E Major'}
        ];

        this.margin = {top: 10, right: 10, bottom: 10, left: 10},
        this.width = 460 - this.margin.left - this.margin.right,
        this.height = 460 - this.margin.top - this.margin.bottom
    
   
      /* d3.select('#two').append('input').attr('type', 'checkbox')
            .attr("checked", true)
        .attr("type", "checkbox")*/
        this.camelot = d3.select('#two')
        .append("svg")
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
          .attr("transform", "translate(" + this.width / 2 + "," + ( this.height/2 )+ ")"); 
    
        let infotip = d3.select('#two')
          .append('div')
          .attr('class', 'infotip')
          .style('background-color', 'lightgrey')
          .style('position', 'fixed')
          .style('visibility', 'hidden')
          let img = 'data/CamelotWheel.jpg'

         this.camelot.append('text')
        .attr('class', 'title')
        .attr('transform', "translate(0,-200)")
        .attr('text-anchor', 'top')
        .text('Camelot Key Wheel')

        this.drawTable(data,this.colordata)
        this.camelot.append('text')
        .attr('class', 'title')
        .attr('transform', "translate(0,-200)")
        .attr('text-anchor', 'top')
        .text('Camelot Key Wheel')
        this.camelot.append('text')
        .attr('text-anchor', 'top')
        .attr('transform', 'translate(200,-200)')
        .text('?')
        .attr('font-weight', 'bold')
        .attr('fill', 'blue')
        .attr('font-size', '20px')
        .on('mouseover', function(d){
          infotip.transition().duration(200).style('visibility', 'visible')
         let  string = "<h1>The Camelot wheel</h1> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ligula at enim tincidunt suscipit.  \n  <img src= data/CamelotWheel.jpg width='300' height=300 />";
         infotip.html(string)
         .style('top', d.pageY -10 + 'px')
          .style('left', d.pageX - 400 + 'px')
          .style('text-transform', 'capitalize')
    })
    .on('mouseout', function(d){
   
      infotip
      .style("visibility", 'hidden') 
    })
    }
    drawTable(d1){
      let dataResult = [];
      this.colordata.forEach((v)=>{
        d1.forEach((p)=>{
          if(p[0] == v.key){
            dataResult.push(Object.assign({},v,p))
          }
        })
      })
      let ischecked = d3.select('#toggle').property('checked')
      let data = dataResult
   
      data = data.sort(function(a,b){return d3.ascending(a.sort, b.sort)})

      this.camelot.append('rect')
      .attr('class', 'ctooltip')
      .attr("x", -100)
      .attr("y", -100)

      let Tooltip = this.camelot
      .append('text')
      .attr('class', 'ctooltip')
      .attr('id', 'tooltiptext')
      .attr('transform', "translate(0,0)")

      let Tooltip2 = this.camelot
      .append('text')
      .attr('class', 'ctooltip')
      .attr('id', 'tooltiptext')
      .attr('transform', "translate(0,15)")

  
           //.  attr('transform', "translate(0,0)")
    
     // Add 100 on Y translation, cause upper bars are longer
   
      if(ischecked){
        d3.selectAll('.slabel').remove()
       let adata = data.filter(function(d){return d.key.match('A')})
       let bdata = data.filter(function(d){return d.key.match('B')})
      // console.log(adata,bdata)

      let innerRadius = 70
       let bxScale = d3.scaleBand()
       .range([0,2*Math.PI])
       .align(0)
       .domain(bdata.map(d=>d.key))

     let byScale = d3.scaleRadial()
       .range([110, Math.min(this.width, this.height)/2])
       .domain([0,d3.max(data.map(d=>d['1']))])

      let axScale = d3.scaleBand()
        .range([0,2*Math.PI])
        .align(0)
        .domain(adata.map(d=>d.key))

      let ayScale = d3.scaleRadial()
        .range([innerRadius, 0])
        .domain([0,d3.max(data.map(d=>d['1']))])
       // console.log(ayScale(0), byScale(0))

        this.camelot.append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('fill', d=>d.color)
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(  byScale(0))
          .startAngle(d=> d.key.match('A') ? axScale(d.key) : bxScale(d.key))
          .endAngle(d=> d.key.match('A') ? axScale(d.key) + axScale.bandwidth() : bxScale(d.key) + bxScale.bandwidth())
          .padAngle(.01)
          .padRadius(80)
        ).attr('class', 'dual')
   
        this.camelot.selectAll('path').transition().duration(500).attr('d', d3.arc()
        .innerRadius( d=> d.key.match('A') ? 115: byScale(0))
        .outerRadius( d=> d.key.match('A') ? ayScale(d['1']) : byScale(d['1']))
        .startAngle(d=> d.key.match('A') ? axScale(d.key) : bxScale(d.key))
        .endAngle(d=> d.key.match('A') ? axScale(d.key) + axScale.bandwidth() : bxScale(d.key) + bxScale.bandwidth())
        .padAngle(.01)
        .padRadius(80)
      ).attr('class', 'dual')
      this.camelot.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor",  d=> d.key.match('A') ?  (axScale(d.key) + axScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start" :(bxScale(d.key) + bxScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start" )
        .attr("transform",  d=> d.key.match('A') ? "rotate(" + ((axScale(d.key) + axScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (120) + ",0)" : "rotate(" + ((bxScale(d.key) + bxScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (90) + ",0)" )
      .append("text")
        .text(function(d){return(d.key)})
       .attr("transform", d=> d.key.match('A') ? (axScale(d.key) + axScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)" : (bxScale(d.key) + bxScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)")
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle").transition().duration(500).attr('class', 'dlabel')


     /*
      this.camelot.append('g')
        .selectAll('path')
        .data(bdata)
        .enter()
        .append('path')
        .attr('fill', d=>d.color)
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(d=> byScale(d['1']))
          .startAngle(d=>bxScale(d.key))
          .endAngle(d=>bxScale(d.key) + bxScale.bandwidth())
          .padAngle(.01)
          .padRadius(80)
        )

        this.camelot.append('g')
        .selectAll('path')
        .data(adata)
        .enter()
        .append('path')
        .attr('fill', d=>d.color)
        .attr('d', d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(d=> ayScale(d['1']))
          .startAngle(d=>axScale(d.key))
          .endAngle(d=>axScale(d.key) + axScale.bandwidth())
          .padAngle(.01)
          .padRadius(80)
        )
*/
/*
        this.camelot.append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('fill', d=>d.color)
        .attr('d', d3.arc()
          .innerRadius(function(d){//console.log(d.key)
            return 0})
          .outerRadius(  byScale(0))
          .startAngle(d=> d.key.match('A') ? axScale(d.key) :bxScale(d.key))
          .endAngle(d=> d.key.match('A') ? axScale(d.key) + axScale.bandwidth() : bxScale(d.key) + bxScale.bandwidth())
          .padAngle(.01)
          .padRadius(80)
        ).attr('class', 'dual')
        this.camelot.selectAll('path').transition().duration(500).attr('d', d3.arc()
        .innerRadius( d=> d.key.match('B') ? 115: ayScale(0))
        .outerRadius( d=> d.key.match('B') ? byScale(d['1']) : ayScale(d['1']))
        .startAngle(d=> d.key.match('B') ? bxScale(d.key) : axScale(d.key))
        .endAngle(d=> d.key.match('B') ? bxScale(d.key) + bxScale.bandwidth() : axScale(d.key) + axScale.bandwidth())
        .padAngle(.01)
        .padRadius(80)
      ).attr('class', 'dual')
      this.camelot.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor",  d=> d.key.match('A') ?  (axScale(d.key) + axScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start" :(bxScale(d.key) + bxScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start" )
        .attr("transform",  d=> d.key.match('A') ? "rotate(" + ((axScale(d.key) + axScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (120) + ",0)" : "rotate(" + ((bxScale(d.key) + bxScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (90) + ",0)" )
      .append("text")
        .text(function(d){return(d.l)})
       .attr("transform", d=> d.key.match('A') ? (axScale(d.key) + axScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)" : (bxScale(d.key) + bxScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)")
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle").transition().duration(500).attr('class', 'dlabel')
       
*/
}
     else{
      d3.selectAll('.dual').remove()
      d3.selectAll('.dlabel').remove()
      let singleData = data.sort(function(a,b){return d3.ascending(a.sort, b.sort)})
      let xScale = d3.scaleBand()
      .range([0,2*Math.PI])
      .align(0)
      .domain(data.map(d=>d.key))

    let yScale = d3.scaleRadial()
      .range([80, Math.min(this.width, this.height)/2])
      .domain([0,d3.max(data.map(d=>d['1']))])
  

    this.camelot.append('g')
      .selectAll('path')
      .data(singleData)
      .enter()
      .append('path')
      .attr('fill', d=>d.color)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(d=> yScale(0))
        .startAngle(d=>xScale(d.key))
        .endAngle(d=>xScale(d.key) + xScale.bandwidth())
        .padAngle(.01)
        .padRadius(80)
      ).attr('class', 'single')
      this.camelot.selectAll('path').transition().duration(500).attr('d', d3.arc()
      .innerRadius(80)
      .outerRadius(function(d){
        return yScale(d['1'])})
      .startAngle(d=>xScale(d.key))
      .endAngle(d=>xScale(d.key) + xScale.bandwidth())
      .padAngle(.01)
      .padRadius(80)
    )
    this.camelot.append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
      .attr('text-anchor', d=> (xScale(d.key) + xScale.bandwidth() /2 + Math.PI) % (2* Math.PI) < Math.PI ? 'end': 'start')  
      .attr('transform', d=>  "rotate(" + ((xScale(d.key) + xScale.bandwidth()/2) * 180 / Math.PI - 90) + ")" + "translate(" + (yScale(d['1'])-30) + ",0)")
    .append('text')
      .text(d=> d.key)
      .attr('transform', d=> (xScale(d.key) + xScale.bandwidth() /2 + Math.PI) %(2*Math.PI) < Math.PI  ? "rotate(180)" : 'rotate(0)')
      .attr('alignment-baseline', 'middle').attr('class', 'slabel')
      .style("font-size", "11px")
     
      }

    let path =   this.camelot.selectAll('path')   
    .on('mouseover', function(d,i){
          d3.selectAll('.ctooltip').style('visibility', 'visible')
          Tooltip.style('visibility', 'visible').html(i['1'] + ' Songs in key'  )
          .style('text-transform', 'capitalize').raise()
          Tooltip2.style('visibility', 'visible').html(i['text'])
          .style('text-transform', 'capitalize').raise()
      }).on('mouseout', function(){
        d3.selectAll('.ctooltip').style('visibility', 'hidden')
      })
      .on('click', function(d,i){
        d3.select('.reset').attr('visibility', 'visible')
        if(d3.select(this).classed('cselected')){

          d3.select(this).attr('stroke', 'none').classed('cselected', false)
          globalApplicationState.main.highlighting(false,i)
        }
        else{
          d3.select(this).attr('stroke', 'red').classed('cselected', true)
         // console.log(d,i)
          globalApplicationState.main.highlighting(true, i)
        }
    

      })
    }
    updateTable(d1){
      let cdata= d3.rollup(d1, v=> v.length, d=>d.camelot)
      d3.selectAll('.dual').remove()
      d3.selectAll('.single').remove()
      d3.selectAll('.slabel').remove()
      d3.selectAll('.dlabel').remove()
      const data = Array.from(cdata)
  
      this.drawTable(data)

    }

}