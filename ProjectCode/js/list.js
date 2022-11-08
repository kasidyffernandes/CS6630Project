class ListChart {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      const data = globalApplicationState.data
      let margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

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
    }
    updateTable(){

    }

}