class ListChart {

    constructor(globalApplicationState) {
      this.globalApplicationState = globalApplicationState;
      const data = globalApplicationState.data
      let top = data.sort((a,b)=>{
        return d3.descending(+a.weeks_on_chart, +b.weeks_on_chart)
      }).slice(0,50)
      let theader = d3.select('#theaders')
      let rows = d3.select('#tbody').selectAll('tr').data(top).join('tr')

      theader.append('th').text('#Weeks')
      rows.append('td').text(d=>d.weeks_on_chart)
      
      theader.append('th').text('#Song')
      rows.append('td').text(d=>d.track_name)

      theader.append('th').text('#Artists')
      rows.append('td').text(d=>d.artist_names)
      
      theader.append('th').text('Peak Rank')
      rows.append('td').text(d=>d.peak_rank)


    }
    updateTable(){

    }

}