class CamelotWheel {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom
      const d = [
        {key:"1A",count:70, color:'#b3ffed'},
        {key:"2A",count:90, color:'#bfffca'},
        {key:"3A",count:80, color:'#ccfcac'},
        {key:"4A",count:10, color:'#deeaa7'},
        {key:"5A",count:20, color:'#f0cda7'},
        {key:"6A",count:50, color:'#feb3b3'},
        {key:"7A",count:100, color:'#fbaec5'},
        {key:"8A",count:50, color:'#e9aee1'},
        {key:"9A",count:60, color:'#d5aef9'},
        {key:"10A",count:40, color:'#c6bcff'},
        {key:"11A",count:30, color:'#b9ddff'},
        {key:"12A",count:10, color:'#b0f8fd'},
        {key:"1B",count:100, color:'#86ffe5'},
        {key:"2B",count:100 , color:'#99ffad'},
        {key:"3B",count:100, color:'#b0fa7c'},
        {key:"4B",count:100, color:'#c7e173'},
        {key:"5B",count:100, color:'#e5b573'},
        {key:"6B",count:100, color:'#fc7e99'},
        {key:"7B",count:100, color:'#e57ec2'},
        {key:"8B",count:100, color:'#c47eed'},
        {key:"9B",count:100, color:'#ac87ff'},
        {key:"10B",count:100, color:'#97b5ff'},
        {key:"11B",count:100, color:'#85ebfd'},
        {key:"12B",count:100, color:'#82fff0'}
        ];
       let data = d.sort(function(a,b){return d3.ascending(a.key, b.key)})

      let camelot = d3.select('#two')
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + ( height/2 )+ ")"); // Add 100 on Y translation, cause upper bars are longer
  
      
      let xScale = d3.scaleBand()
        .range([0,2*Math.PI])
        .align(0)
        .domain(data.map(d=>d.key))

      let yScale = d3.scaleRadial()
        .range([80, Math.min(width, height)/2])
        .domain([0,d3.max(data.map(d=>d.count))])

      camelot.append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('fill', d=>d.color)
        .attr('d', d3.arc()
          .innerRadius(80)
          .outerRadius(d=>yScale(d.count))
          .startAngle(d=>xScale(d.key))
          .endAngle(d=>xScale(d.key) + xScale.bandwidth())
          .padAngle(.01)
          .padRadius(80)
        )

      camelot.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (xScale(d.key) + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((xScale(d.key) + xScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (yScale(d.count)+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.key)})
        .attr('transform', 'rotate(90)')
        .attr('font-size', '12px')
    
    }
    updateTable(){

    }

}