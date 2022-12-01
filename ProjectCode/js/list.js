const CELL_HEIGHT = 20;
const SIZE_DICT = {
  pop: 65,
  track: 300,
  artist: 200,
  attribute: 65,
};

const PADDING = 15;

class ListChart {
  constructor(globalApplicationState, yVar) {
    this.globalApplicationState = globalApplicationState;
    this.data = globalApplicationState.data;
    this.yV = d3.select("#yAxis").property("value");

    this.header = [
      { name: "Popularity", key: "pop" },
      { name: "Track", key: "track" },
      { name: "Artist", key: "artist" },
      { name: this.yV, key: "attribute" },
    ];

    this.table = d3.select("#table");
    this.tableBody = d3.select("#tbody");

    //current sorting by word:
    this.sortKeyword = "";

    this.sortAscend = false;

    //initial sort by popularity
    let top = this.data
      .sort((a, b) => {
        return d3.descending(a.track_pop, b.track_pop);
      })
      .slice(0, 50);
    console.log(top);

    this.makeHeader();
    this.updateTable(this.data);
  }

  makeHeader() {
    const th = this.table
      .append("thead")
      .append("tr")
      .attr("id", "theader")
      .selectAll("th")
      .data(this.header)
      .join("th")
      .append("svg")
      .attr("width", (d) => SIZE_DICT[d.key])
      .attr("height", CELL_HEIGHT * 2);

    th.selectAll("rect")
      .data((d) => [d])
      .join("rect")
      .attr("class", "header")
      .attr("width", (d) => SIZE_DICT[d.key])
      .attr("height", CELL_HEIGHT * 2)
      .attr("x", 0)
      .attr("y", 0);

    th.selectAll("text")
      .data((d) => [d])
      .join("text")
      .attr("class", "header-text")
      .text((d) => d.name)
      .style("text-anchor", "middle")
      .style("font-weight", "900")
      .attr("transform", (d) => {
        return `translate(${SIZE_DICT[d.key] / 2}, 15)`;
      });

    th.on("click", (e, d) => {
      this.sorter(d.key);
    });
  }

  updateTable(data) {
    this.data = data;
    // let yVal = d3.select("#yAxis").property('value');
    this.updateHeader(this.yV);

    //format data for table using filters...
    //adding all attributes on here...
    this.formattedData = this.data.map((d) => {
      return {
        pop: d.track_pop,
        track: d.name,
        artist: d.artist,
        attribute: d[this.yV], //value changes with toggle...
        // danceability: d.danceability,
        // energy: d.energy,
        // instrumentalness: d.instrumentalness,
        // liveness: d.liveness,
        // speechiness: d.speechiness,
        // valence: d.valence,
        // bpm: d.bpm,
        // loudness: d.loudness,
        // duration: d.duration_ms,
      };
    });

    //filter data for table to just the selected attribute, not sure how to do this...
    // let tableData = this.formattedData.filter(d => this.formattedData.col)

    const tableRows = this.tableBody
      .selectAll("tr")
      .data(this.formattedData)
      .join("tr");

    const allRows = tableRows
      .selectAll("td")
      .data((d) => d3Entries(d))
      .join("td")
      .text((d) => d.value);
  }

  sorter(keyword) {
    //clicking the same header, so reverse order
    if (this.sortKeyword && this.sortKeyword.includes(keyword)) {
      this.sortAscend = !this.sortAscend;
    }

    let sortedData = this.data.sort((a, b) => {
      this.sortKeyword = keyword;
      switch (keyword) {
        case "pop":
          return this.sortAscend
            ? d3.descending(+a.track_pop, +b.track_pop)
            : d3.descending(+b.track_pop, +a.track_pop);
        case "track":
          return this.sortAscend
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "artist":
          return this.sortAscend
            ? a.artist.localeCompare(b.artist)
            : b.artist.localeCompare(a.artist);
        case "attribute":
          let key = this.yV;
          return this.sortAscend
            ? d3.descending(+a[key], +b[key])
            : d3.descending(+b[key], +a[key]);
      }
    });
    //update with the sorted data:
    this.updateTable(sortedData);
    //update heatmap with the sorted data as well
    this.globalApplicationState.heatmap.updateTable(sortedData);
  }
  updateHeader() {
    this.yV = d3.select("#yAxis").property("value");

    this.header = [
      //can you not change the other ones?
      { name: "Popularity", key: "pop" },
      { name: "Track", key: "track" },
      { name: "Artist", key: "artist" },
      { name: this.yV, key: "attribute" },
    ];

    d3.select("#theader")
      .selectAll("text")
      .data(this.header)
      .join("text")
      .attr("class", "header-text")
      .text((d) => d.name)
      .style("text-anchor", "middle")
      .style("font-weight", "900")
      .attr("transform", (d) => {
        return `translate(${SIZE_DICT[d.key] / 2}, 15)`;
      });
  }
}
function d3Entries(obj) {
  return Object.entries(obj).map((entry) => ({
    key: entry[0],
    value: entry[1],
  }));
}
