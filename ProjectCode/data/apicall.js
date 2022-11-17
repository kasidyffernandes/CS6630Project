
/** 
 * 
 * 
 * 
 * //**API FETCH SPOTIFY DATA
 * 
 * Get Authorization Bearer token 
 * https://developer.spotify.com/console/get-track/
 * 
 * 
 * 
 */
//async function loadData(){
    {
    const data = await d3.json('data/dataset2.json')
  
  
    data.forEach(function(d){
      let uri = d.url
      let id = uri.split(':')[2]
      let url = `https://api.spotify.com/v1/tracks/${id}`
     fetch(url, {
        method: 'GET' ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer BQDWfgQ82iffHcQWhii6-iN7rGdlGvdOBu5e-YNaSVhONym66BlPvYxd0jYbp4z8gmV-fdhWKpVYRyHojQzXW4Lm2y_1E7b6s4UB8nEjqm-BbxfjbLiVPVGWLVhLizCOeFCDAyXBjM9nnnlawb0x2n4IMZPuJm22pX53M4_SDD3dS1FryK9qrIJOOhK0adYGLmc'
        },
      }).then(function(response) {
        return response.json();
      }) .then(function(d){
     
        var data_obj = d;
      
         let kl = {
          popularity: data_obj.popularity, 
          release_date: data_obj.album.release_date,
          image: data_obj.album.images[0],
          songplay: data_obj.preview_url,
          url: data_obj.uri,
          n1: data_obj.name
        };
      
        data.forEach((e)=>{
          if(e.url == data_obj.uri){
             Object.assign(e, kl)
          }
  
         })
     
  
      })
    })
  
    console.log(data)

    return {data}
  }


/** 
 * 
 * 
 * 
 * //**API FETCH TikTok DATA
 * 
 * Get Authorization Bearer token 
 * https://developer.spotify.com/console/get-track/
 * 
 *   async function loadData()
 * 
 */
{
    let data = await d3.csv('data/4a_TikTok_songs_2022.csv')
    let da =  JSON.parse(JSON.stringify(data))
    console.log(da)
   // let data = await d3.json('data/dataset2.json')
    let kl;
    da.forEach(function(d){
     //console.log(d)
      let uri = d.uri
      let id = uri.split(':')[2]
      let url = `https://api.spotify.com/v1/tracks/${id}`
      fetch(url, {
        method: 'GET' ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer BQAxOrpvxD987H-9P70ffAi8LIIxzdBAZ3KfbHQrsRigxAw-XVsgZ-IFqaU-KFc8CZ6PwkGBNaY02X1gVOeo-FDc1KCZriLHsBzs-hQ60r91uDgEqckyepUXAtAmjgGP9PLiJDdQK2-cfKdBF9BTx-6rBDZQFmGrx0mPj1NGwy8NA1COzXMACNgsbpiO1ShuYYA'
        },
      }).then(function(response) {
        return response.json();
      })
      .then(function(d){
        var data_obj = d;
         kl = {
          popularity: data_obj.popularity, 
          release_date: data_obj.album.release_date,
          image: data_obj.album.images[0],
          songplay: data_obj.preview_url,
          url: data_obj.uri,
          n1: data_obj.name
        };
  
       da.forEach((e)=>{
          if(e.uri == data_obj.uri) {
            Object.assign(e, kl)
          }
        })
      })
    })
    console.log(da)
    return{data, kl}
  }