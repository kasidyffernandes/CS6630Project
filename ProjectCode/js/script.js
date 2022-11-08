


async function loadData(){
  const data = await d3.csv('data/2_spotify_top_charts_22.csv')

  return {data}

}
const globalApplicationState = {
  data: null,
  heatmap: null,
  camelot: null,
  main: null,
  chart: null,
}

loadData().then((loadedData)=>{
 
  globalApplicationState.data = loadedData.data;
  
  const camelot= new CamelotWheel(globalApplicationState);
  const heatmap = new HeatMap(globalApplicationState);
  const main = new MainGraph(globalApplicationState);
  const chart = new ListChart(globalApplicationState);
  
  globalApplicationState.heatmap = heatmap;
  globalApplicationState.camelot = camelot;
  globalApplicationState.main = main;
  globalApplicationState.chart = chart;

  d3.select('#yAxis').on('change', function(){
    var updated = d3.select(this).property('value')
    d3.selectAll('circle').remove()
    d3.selectAll('.yAxis').remove()
    main.drawTable(updated)
  })

})

