const CELL_HEIGHT = 20;
const SIZE_DICT = {
  weeks: 65,
  track: 300,
  artist: 200,
  attribute: 65,
};

const PADDING = 15;

class ListChart {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      const data = globalApplicationState.data
      
      this.header = [
        { name: "Weeks", key: "weeks" },
        { name: "Track", key: "track" },
        { name: "Artist", key: "artist" },
        { name: "Attribute", key: "attribute" },
      ];
      this.tableBody = d3.select('#tbody');

      //current sorting by word:
      this.sortKeyword = '';
  
      this.sortAscend = false;

      let top = data.sort((a,b)=>{
        return d3.descending(a.track_pop, b.track_pop)
      }).slice(0,50)
      console.log(top)

      this.makeHeader();

      //let theader = d3.select('#theader')
      let rows = d3.select('#tbody').selectAll('tr').data(top).join('tr')

      //theader.append('th').text('#Weeks')
      rows.append('td').text(d=>d.track_pop)

      
      //theader.append('th').text('#Song')
      rows.append('td').text(d=>d.name)

      //theader.append('th').text('#Artists')
      rows.append('td').text(d=>d.artist)
      
     // theader.append('th').text('Peak Rank')
     // rows.append('td').text(d=>d.peak_rank)
    }

     makeHeader() {
      const that = this;
      const th = d3.select("#theader")
        .append("tr")
        .selectAll("th")
        .data(this.header)
        .join('th')
        .append('svg')
        .attr('width', (d) => SIZE_DICT[d.key])
        .attr('height', CELL_HEIGHT * 2);
      
      th.selectAll('rect')
        .data((d) => [d])
        .join('rect')
        .attr('class', 'header')
        .attr('width', (d) => SIZE_DICT[d.key])
        .attr('height', CELL_HEIGHT * 2)
        .attr('x', 0)
        .attr('y', 0);
  
      th.selectAll("text")
        .data((d) => [d])
        .join('text')
        .attr('class', 'header-text')
        .text((d) => d.name)
        .style('text-anchor', 'middle')
        .style('font-weight', '900')
        .attr('transform', (d) => {
          return `translate(${SIZE_DICT[d.key] /2}, 15)`
        })
  
      th.on("click", (e, d) => {
        this.sorter(d.key);
      })
    }

    updateTable(data){
      console.log("Update Chart Data is: " + data)
    
      //format data for table using filters...
  
      const tableRows = this.tableBody
        .selectAll('tr')
        .data(data)
        .join('tr');
  
      const allRows = tableRows.selectAll('td')
        .data(d => d3Entries(d))
        .join('td')
        .text(d => d.value);
      
    }
  
    sorter(keyword){
      console.log("sort by: " + keyword);
      //add sorting in here...
    }
  }
  function d3Entries(obj) {
    return Object.entries(obj).map((entry) => ({
      key: entry[0],
      value: entry[1],
    }))
  }