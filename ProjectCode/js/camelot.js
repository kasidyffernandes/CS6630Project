class CamelotWheel {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      let d1 = d3.rollup(this.globalApplicationState.data, v=> v.length, d=>d.camelot)
      const data = Array.from(d1)

      const colordata = [
        {key:"0A", color:'#b3ffed', sort:"a", l:'B', text:'A-Flat Minor'},
        {key:"1A", color:'#bfffca', sort:"b", l:'B', text:'E-Flat Minor'},
        {key:"2A", color:'#ccfcac', sort:"c", l:'B', text:'B-Flat Minor'},
        {key:"3A", color:'#deeaa7', sort:"d", l:'Fm', text:'F Minor'},
        {key:"4A", color:'#f0cda7', sort:"e", l:'Cm', text:'C Minor'},
        {key:"5A", color:'#feb3b3', sort:"f", l:'Gm', text:'G Minor'},
        {key:"6A", color:'#fbaec5', sort:"g", l:'Dm', text:'D Minor'},
        {key:"7A", color:'#e9aee1', sort:"h", l:'Am', text:'A Minor'},
        {key:"8A", color:'#d5aef9', sort:"i", l:'Em', text:'E Minor'},
        {key:"9A", color:'#c6bcff', sort:"j", l:'Bm', text:'B Minor'},
        {key:"10A", color:'#b9ddff', sort:"k", l:'B', text:'F-Sharp Minor'},
        {key:"11A", color:'#b0f8fd', sort:"l", l:'B', text:'D-Flat Minor'},

        {key:"0B", color:'#86ffe5', sort:"m", l:'B', text:'F-Sharp Major'},
        {key:"1B", color:'#99ffad', sort:"n", l:'F#', text:'F-Sharp Major'},
        {key:"2B", color:'#b0fa7c', sort:"o", l:'C#', text:'D-Flat Major'},
        {key:"3B", color:'#c7e173', sort:"p", l:'G#', text:'A-Flat Major'},
        {key:"4B", color:'#e5b573', sort:"q", l:'D#', text:'E-Flat Major'},
        {key:"5B",color:'#fc7e99', sort:"r", l:'A#', text:'B-Flat Major'},
        {key:"6B", color:'#e57ec2', sort:"s", l:'F', text:'F Major'},
        {key:"7B", color:'#c47eed', sort:"t", l:'C', text:'C Major'},
        {key:"8B",color:'#ac87ff', sort:"u", l:'G', text:'G Major'},
        {key:"9B", color:'#97b5ff', sort:"v", l:'A', text:'D Major'},
        {key:"10B", color:'#85ebfd', sort:"w", l:'D', text:'A Major'},
        {key:"11B", color:'#82fff0', sort:"x", l:'E', text:'E Major'}
        ];
        this.dataResult = [];
        colordata.forEach((v)=>{
          data.forEach((p)=>{
            if(p[0] == v.key){
              this.dataResult.push(Object.assign({},v,p))
            }
          })
        })
        this.margin = {top: 10, right: 10, bottom: 10, left: 10},
        this.width = 460 - this.margin.left - this.margin.right,
        this.height = 460 - this.margin.top - this.margin.bottom
    
   
       this.camelot = d3.select('#two')
        .append("svg")
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
          .attr("transform", "translate(" + this.width / 2 + "," + ( this.height/2 )+ ")"); 
    
        this.drawTable()

     //  let data = d.sort(function(a,b){return d3.ascending(a.key, b.key)})

     

    
    }
    drawTable(){
      let ischecked = d3.select('#toggle').property('checked')
      let data = this.dataResult
      data = data.sort(function(a,b){return d3.ascending(a.sort, b.sort)})

      let Tooltip = d3.select('#two')
      .append('div')
      .attr('class', 'tooltip')
      .style('background-color', 'lightgrey')
      .style('position', 'absolute')
      .style('visibility', 'hidden')

    
    
     // Add 100 on Y translation, cause upper bars are longer
   
      if(ischecked){
        d3.selectAll('.slabel').remove()
       let adata = data.filter(function(d){return d.key.match('A')})
       let bdata = data.filter(function(d){return d.key.match('B')})


       let axScale = d3.scaleBand()
       .range([0,2*Math.PI])
       .align(0)
       .domain(adata.map(d=>d.key))

     let ayScale = d3.scaleRadial()
       .range([110, Math.min(this.width, this.height)/2])
       .domain([0,d3.max(data.map(d=>d['1']))])

      let bxScale = d3.scaleBand()
        .range([0,2*Math.PI])
        .align(0)
        .domain(bdata.map(d=>d.key))

      let byScale = d3.scaleRadial()
        .range([110, 1])
        .domain([0,d3.max(data.map(d=>d['1']))])
      
      this.camelot.append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('fill', d=>d.color)
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(  byScale(0))
          .startAngle(d=> d.key.match('B') ? bxScale(d.key) : axScale(d.key))
          .endAngle(d=> d.key.match('B') ? bxScale(d.key) + bxScale.bandwidth() : axScale(d.key) + axScale.bandwidth())
          .padAngle(.01)
          .padRadius(80)
        )
        .attr('class', 'dual')
      this.camelot.selectAll('path').transition().duration(500).attr('d', d3.arc()
        .innerRadius( d=> d.key.match('B') ? 115: ayScale(0))
        .outerRadius( d=> d.key.match('B') ? byScale(d['1']) : ayScale(d['1']))
        .startAngle(d=> d.key.match('B') ? bxScale(d.key) : axScale(d.key))
        .endAngle(d=> d.key.match('B') ? bxScale(d.key) + bxScale.bandwidth() : axScale(d.key) + axScale.bandwidth())
        .padAngle(.01)
        .padRadius(80)
      )
      .attr('class', 'dual')

      this.camelot.append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
          .attr('text-anchor', d=> d.key.match('B') ? (bxScale(d.key) + bxScale.bandwidth() /2 + Math.PI) % (2* Math.PI) < Math.PI ? 'end': 'start' :(axScale(d.key) + axScale.bandwidth() /2 + Math.PI) % (2* Math.PI) < Math.PI ? 'end': 'start')  
          .attr('transform', d=> d.key.match('B') ? "rotate(" + ((bxScale(d.key) + bxScale.bandwidth()/2) * 180 / Math.PI - 90) + ")" + "translate(" + (120) + ",0)" : "rotate(" + ((axScale(d.key) + axScale.bandwidth()/2) * 180 / Math.PI - 90) + ")" + "translate(" + (90) + ",0)" )
        .append('text')
          .text(d=> d.l)
          .attr('transform', d=>d.key.match('B') ? (bxScale(d.key) + bxScale.bandwidth() /2 + Math.PI) %(2*Math.PI) < Math.PI  ? "rotate(180)" : "rotate(0)" :(axScale(d.key) + axScale.bandwidth() /2 + Math.PI) %(2*Math.PI) < Math.PI  ? "rotate(180)" : "rotate(0)" )
          .attr('alignment-baseline', 'middle').attr('class', 'dlabel')
     
        }


     else{
      d3.selectAll('.dual').remove()
      d3.selectAll('.dlabel').remove()
      let singleData = data.sort(function(a,b){return d3.ascending(a.key, b.key)})
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
     
      }
     
    let path =   this.camelot.selectAll('path')   .on('mouseover', function(d,i){
          Tooltip.style('visibility', 'visible')
          .html(i.text + '</br>' + i['1'])
          .style('text-transform', 'capitalize')
      })
      .on('mousemove', function(d){
        Tooltip.style('top', d.pageY -10 + 'px')
        .style('left', d.pageX + 10 + 'px')
      })
      .on('mouseout', function(d){
        Tooltip
        .style("visibility", 'hidden') 
      }).on('click', function(d,i){
        d3.select('.reset').attr('visibility', 'visible')
        if(d3.select(this).classed('cselected')){

          d3.select(this).attr('stroke', 'none').classed('cselected', false)
          globalApplicationState.main.highlighting(false,i)
        }
        else{
          d3.select(this).attr('stroke', 'red').classed('cselected', true)
          console.log(d,i)
          globalApplicationState.main.highlighting(true, i)
        }
    

      })
    }
    updateTable(){
      console.log('db')
      console.log(globalApplicationState.brushedData)
    }

}