


async function loadData(){
  const data = await d3.csv('data/both2022.csv')
  console.log(data)

  return {data}

}
const globalApplicationState = {
  data: null,
  brusheddata: null,
  camelotdata: null,
  heatmap: null,
  camelot: null,
  main: null,
  chart: null,
}

loadData().then((loadedData)=>{
 
  globalApplicationState.data = loadedData.data;
 /*
  let h = d3.select('#header')
  const img = loadedData.tiktok[1].image
  console.log(img)
  h.append('img').attr('src', img).attr('width', 100)
    .attr('height', 100)
*/
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

  d3.select('#toggle').on('click', (d)=>{
    console.log('toggle')
    globalApplicationState.camelot.drawTable();
});
})

