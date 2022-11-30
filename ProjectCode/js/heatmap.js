const margin = { top: 30, right: 30, bottom: 30, left: 30 },
  width = 800 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

class HeatMap {
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    //changed from a const should be same order and data as the list
    this.data = globalApplicationState.data;

    console.log("heatamp called");

    this.heatmap = d3
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

    let attributes = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];

    //Axis
    this.x = d3
      .scaleBand()
      .range([0, width / 2])
      .domain(attributes)
      .padding(0.01);

    this.y = d3.scaleBand().range([0, height]).domain(tracks).padding(0.01);

    this.heatmap.append("g").call(d3.axisTop(this.x));
    this.heatmap.append("g").call(d3.axisLeft(this.y));

    //update heatmap...
    this.updateTable();

    
  }

  mapData(data) {
    //given data selection, map it to format that can be used for the heatmap easier...
    let mapData = [];
    for (let [i, track] of data.entries()) {
      mapData.push([
        `T${i + 1}`,
        "A1",
        parseFloat(track.danceability),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A2",
        parseFloat(track.energy),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A3",
        parseFloat(track.instrumentalness),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A4",
        parseFloat(track.liveness),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A5",
        parseFloat(track.speechiness),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A6",
        parseFloat(track.valence),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A7",
        parseFloat(track.bpm),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A8",
        parseFloat(track.loudness),
        track.name,
        track.artist,
      ]);
      mapData.push([
        `T${i + 1}`,
        "A9",
        parseFloat(track.duration_ms),
        track.name,
        track.artist,
      ]);
    }
    return mapData;
  }
  updateTable() {
    let selection = this.data.slice(0, 25);
    console.log(selection[0]);

    //Color scales
    let colorRange = ["white", "#69b3a2"];

    //determine min/max for bpm, loudness and duration scales
    let [bpmMIN, bpmMAX] = d3.extent(
      selection.map((d) => parseFloat(d["bpm"]))
    );
    let [loudMIN, loudMAX] = d3.extent(
      selection.map((d) => parseFloat(d["loudness"]))
    );
    let [lengthMIN, lengthMAX] = d3.extent(
      selection.map((d) => parseInt(d["duration_ms"]))
    );

    //attribute scales
    let attrColor = d3.scaleLinear().range(colorRange).domain([0, 1]);
    let bmpColor = d3.scaleLinear().range(colorRange).domain([bpmMIN, bpmMAX]);
    let loudColor = d3
      .scaleLinear()
      .range(colorRange)
      .domain([loudMIN, loudMAX]);
    let lengthColor = d3
      .scaleLinear()
      .range(colorRange)
      .domain([lengthMIN, lengthMAX]);

    let Tooltip = d3
      .select("#three")
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "lightgrey")
      .style("position", "absolute")
      .style("visibility", "hidden");

    let mappedData = this.mapData(selection);
    console.log(mappedData);

    this.heatmap
      .selectAll()
      .data(mappedData)
      .enter()
      .append("rect")
      .attr("y", (d) => this.y(d[0]))
      .attr("x", (d) => this.x(d[1]))
      .attr("height", this.y.bandwidth())
      .attr("width", this.x.bandwidth())
      .attr("fill", (d) => {
        if (d[1] === "A7") {
          return bmpColor(d[2]);
        } else if (d[1] === "A8") {
          return loudColor(d[2]);
        } else if (d[1] === "A9") {
          return lengthColor(d[2]);
        } else {
          return attrColor(d[2]);
        }
      })
      .on("mouseover", function (d, i) {
        Tooltip.style("visibility", "visible")
          //.text(d => {if (i[1] === "A1"){return "Dance"}})
          .html((d) => {
            let title = "";
            if (i[1] === "A1") {
              title = "Danceability";
            } else if (i[1] === "A2") {
              title = "Energy";
            } else if (i[1] === "A3") {
              title = "Instrumentalness";
            } else if (i[1] === "A4") {
              title = "Liveness";
            } else if (i[1] === "A5") {
              title = "Speechiness";
            } else if (i[1] === "A6") {
              title = "Valence";
            } else if (i[1] === "A7") {
              title = "BPM";
            } else if (i[1] === "A8") {
              title = "Loudness";
            } else if (i[1] === "A9") {
              title = "Duration";
            }
            return i[3] + "</br>" + i[4] + "</br>" + title + ":" + i[2];
          })
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
      });}
}
