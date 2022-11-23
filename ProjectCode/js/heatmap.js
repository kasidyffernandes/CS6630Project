class HeatMap {
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    //changed from a const should be same order and data as the list
    this.data = globalApplicationState.data;
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

    let tracks = [
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

    let attributes = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];

    //Axis
    let x = d3
      .scaleBand()
      .range([0, width / 2])
      .domain(attributes)
      .padding(0.01);

    let y = d3.scaleBand().range([0, height]).domain(tracks).padding(0.01);

    heatmap.append("g").call(d3.axisTop(x));
    heatmap.append("g").call(d3.axisLeft(y));

    //pulling a slice for rn, not sure how this works now with the data handling....
    //Should match whatever is in the table
    let selection = this.data.slice(0, 25);
    console.log("selection is:" + selection);

    //Color scales
    let colorRange = ["white", "#69b3a2"];

    // //determine min/max for bpm and loudness scales
    // let [bpmMIN, bpmMAX] = d3.extent(
    //   selection.map((d) => parseFloat(d["tempo"]))
    // );
    // let [loudMIN, loudMAX] = d3.extent(
    //   selection.map((d) => parseFloat(d["loudness"]))
    // );

    //attribute scales
    let attrColor = d3.scaleLinear().range(colorRange).domain([0, 1]);
    // let bmpColor = d3.scaleLinear().range(colorRange).domain([bpmMIN, bpmMAX]);
    // let loudColor = d3.scaleLinear().range(colorRange).domain([loudMIN, loudMAX]);

    let Tooltip = d3
      .select("#three")
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "lightgrey")
      .style("position", "absolute")
      .style("visibility", "hidden");

    heatmap
      .selectAll()
      .data(this.data)
      .enter()
      .append("rect")
      .attr("y", (d) => y(d[0]))
      .attr("x", (d) => x(d[1]))
      .attr("height", y.bandwidth())
      .attr("width", x.bandwidth())
      .attr("fill", (d) => {
        if (d[1] === "A8") {
          return bmpColor(d[2]);
        } else if (d[1] === "A6") {
          return loudColor(d[2]);
        } else {
          return attrColor(d[2]);
        }
      })
      .on("mouseover", function (d, i) {
        // console.log(d,i)
        Tooltip.style("visibility", "visible")
          .html(i[1] + ":" + i[2] + "</br>" + i[3] + "</br>" + i[4])
          .style("text-transform", "capitalize");
      })
      .on("mousemove", function (d) {
        Tooltip.style("top", d.pageY - 10 + "px").style(
          "left",
          d.pageX + 10 + "px"
        );
      })
      .on("mouseout", function (d) {
        Tooltip.style("visibility", "hidden");
      });
  }
  updateTable() {}
}
