class HeatMap {
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    const data = globalApplicationState.data;
    let margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 800 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    console.log("heatamp called");
    let heatmap = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", width / 2 + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", "outline: thin solid black;")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //test edit for github commit...
    let myGroups = [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
      "T13",
      "T14",
      "T15",
      "T16",
      "T17",
      "T18",
      "T19",
      "T20",
      "T21",
      "T22",
      "T23",
      "T24",
      "T25",
    ];
    let myVars = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];
    let x = d3
      .scaleBand()
      .range([0, width / 2])
      .domain(myGroups);

    heatmap
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    let y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);

    heatmap.append("g").call(d3.axisLeft(y));
  }
  updateTable() {}
}
