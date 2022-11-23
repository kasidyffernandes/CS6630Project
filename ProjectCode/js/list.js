class ListChart {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      const data = globalApplicationState.data
      console.log(data)
      let top = data.sort((a,b)=>{
        return d3.descending(a.track_pop, b.track_pop)
      }).slice(0,50)
      console.log(top)
      let theader = d3.select('#theaders')
      let rows = d3.select('#tbody').selectAll('tr').data(top).join('tr')

      theader.append('th').text('#Weeks')
      rows.append('td').text(d=>d.track_pop)

      
      theader.append('th').text('#Song')
      rows.append('td').text(d=>d.name)

      theader.append('th').text('#Artists')
      rows.append('td').text(d=>d.artist)
      
     // theader.append('th').text('Peak Rank')
     // rows.append('td').text(d=>d.peak_rank)


    }
    updateTable(){

    }

}