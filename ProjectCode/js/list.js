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
      this.selectedAttribute = yVar;

      this.header = [
        { name: "Popularity", key: "pop" },
        { name: "Track", key: "track" },
        { name: "Artist", key: "artist" },
        { name: yVar, key: "attribute" },
      ];
    
      this.table = d3.select('#table');
      this.tableBody = d3.select('#tbody');

      //current sorting by word:
      this.sortKeyword = '';
      
      this.sortAscend = false;

      let top = this.data.sort((a,b)=>{
        return d3.descending(a.track_pop, b.track_pop)
      }).slice(0,50)
      console.log(top)

      this.makeHeader();
      this.updateTable(this.data, yVar);
    }

     makeHeader() {
      //const that = this;
      const th = this.table.append("thead")
        .append("tr")
        .attr("id", "theader")
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

    updateTable(data, yVar){
      this.data = data;
      this.selectedAttribute = yVar;
      this.updateHeader(this.selectedAttribute);

      //format data for table using filters...
      const formattedData = this.data.map((d) => {
        return {
           pop: d.track_pop,
           track: d.name,
           artist: d.artist,
           attribute: d[yVar],  //value changes with toggle...
        }
      })

  
      const tableRows = this.tableBody
        .selectAll('tr')
        .data(formattedData)
        .join('tr');
  
      const allRows = tableRows.selectAll('td')
        .data(d => d3Entries(d))
        .join('td')
        .text(d => d.value);
      
    }
  
    sorter(keyword){
      //clicking the same header, so reverse order
      if(this.sortKeyword && this.sortKeyword.includes(keyword)){
        this.sortAscend = !this.sortAscend;
      }

      let sortedData = this.data.sort((a, b)=> {
        this.sortKeyword = keyword;
        switch(keyword) {
          case 'pop':
            return this.sortAscend ? d3.descending(+a.track_pop, +b.track_pop) : d3.descending(+b.track_pop, +a.track_pop);
          case 'track':
            return this.sortAscend ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          case 'artist':
            return this.sortAscend ? a.artist.localeCompare(b.artist) : b.artist.localeCompare(a.artist);
          case 'attribute':
            let key = this.selectedAttribute;
            return this.sortAscend ? d3.descending(+a[key], +b[key]) : d3.descending(+b[key], +a[key]);
        }
      } )
      //update with the sorted data:
      this.updateTable(sortedData, this.selectedAttribute);
    }
    updateHeader(yVar){
      this.header = [//can you not change the other ones?
        { name: "Popularity", key: "pop" },
        { name: "Track", key: "track" },
        { name: "Artist", key: "artist" },
        { name: yVar, key: "attribute" },
      ];

      d3.select("#theader")
        .selectAll("text")
        .data(this.header)
        .join('text')
        .attr('class', 'header-text')
        .text((d) => d.name)
        .style('text-anchor', 'middle')
        .style('font-weight', '900')
        .attr('transform', (d) => {
          return `translate(${SIZE_DICT[d.key] /2}, 15)`
        })
    }
  }
  function d3Entries(obj) {
    return Object.entries(obj).map((entry) => ({
      key: entry[0],
      value: entry[1],
    }))
  }