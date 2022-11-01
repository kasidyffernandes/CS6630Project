
let margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
/*
MAIN GRAPH
*/
  let main = d3.select("#one").append("svg")
    .attr("width", width+ margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "outline: thin solid black;") 
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  let scaleX = d3.scaleBand()
    .range([ 0, width ])
    .domain([1,100])

  main.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(scaleX))
  
  let scaleY = d3.scaleBand()
    .range([ height, 0 ])
    .domain([0,100])

  main.append("g").call(d3.axisLeft(scaleY));
 
/*
CAMELOT WHEEL 
https://stackoverflow.com/questions/43314115/d3-circular-heat-chart-increase-segment-height-on-mouseover (RESPONSE DEMO)
*/
        
let camelot = d3.select('#two').append('svg').attr('width', 800).attr('height', 450).attr("style", "outline:  thin solid black;")  
    camelot.append('circle')
    .attr('cx', 400)
    .attr('cy', 225)
    .attr('r', 200)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');






  /*
  HEAT MAP
  https://d3-graph-gallery.com/graph/heatmap_basic.html

  */

  let heatmap = d3.select("#heatmap").append("svg")
    .attr("width", width /2+ margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "outline: thin solid black;") 
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  let myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  let myVars = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"]
  let x = d3.scaleBand()
    .range([ 0, width/2 ])
    .domain(myGroups)

  heatmap.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  let y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.01);

  heatmap.append("g").call(d3.axisLeft(y));

/*
CHART
*/
  let songs = ['Song 1', 'Song 2', 'Song 3', 'Song 4']
  let chart = d3.select('#four')  .append("svg")
    .attr("width", width /2+ margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "outline: thin solid black;") 
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  let text = chart.selectAll('texts')
    .data(songs)
    .enter()
    .append('text')
    .attr("y", (d, i) => 10 + i * 20)
    .text(d=>d)