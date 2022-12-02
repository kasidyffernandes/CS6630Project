const CELL_HEIGHT = 20;
const SIZE_DICT = {
  pop: 65,
  track: 300,
  //artist: 150,
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
     // { name: "Artist", key: "artist" },
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

    this.updateTable(this.data);
    this.makeHeader();
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
    this.updateHeader(this.yV);

    //format data for table using filters...
    //adding all attributes on here...
    this.formattedData = this.data.map((d) => {
      return {
        pop: d.track_pop,
        art: {img: d.image, song:d.songplay, track: d.name, release: d.release_date, artist: d.artist, url: d.url}, 
      // artist: d.artist,
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
      .text((d) => d.key !== 'art' ? d.value : null);
      
      let imgCell = allRows.filter(d=>d.key==='art')
        .append('div')
        .attr('class', 'ldiv')
        .on('mouseover', function(d,i,){
            d3.selectAll('circle').filter(d=> d.url == i.value.url)
            .transition()
            .attr('fill', 'red')
            .attr('opacity', '1' )
            .attr('r', 6)
            .attr('stroke', 'black')
      }).on('mouseout',function(d,i){
            d3.selectAll('circle').filter(d=> d.url == i.value.url).transition()
            .attr('fill', d=>globalApplicationState.main.colorScale(d))
            .attr('opacity', '.6' )
            .attr('r', 4)
            .attr('stroke', 'none')
      } )

      var img = imgCell.selectAll('img')
      .data(d=>[d.value])
      .enter()
      .append('img')
      .attr('src', d=>d.img)
      .attr('width','100')
      .attr('height', '100')
      .attr('class', 'listImage')
      
      imgCell.selectAll('text')
      .data(d=>[d.value])
      .enter()
      .append('text')
      .html(function(d,i){ return '<h4>' + d.track + '</h4>'  + '<p> Artist: ' + d.artist +  '</br> Release Date: ' + d.release + '</p>' })
      .attr('class', 'listTrack')


  }

  sorter(keyword) {
    //clickinpy the same header, so reverse order
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
      //{ name: "Artist", key: "artist" },
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
