const request = require('request')


exports.search = (req,res) => {
    res.render('search');
  };

exports.results = (req,res) => {
  let query = req.query.search;
  console.log(query);
  request('https://api.themoviedb.org/3/search/movie?api_key=311bb5d1501921bd7dea7220d6d42c27&query='+query, (err,response,body)=>{
    if(err){
      console.log(err);
    }
    let data = JSON.parse(body);
    res.render('movies',{data:data,searchQuery:query});
  })
}