
var https = require('https');

const getMovieTitles = (substr) => {
  let title = substr , page = 1, total_pages, title_data = [];
  let url = 'https://jsonmock.hackerrank.com/api/movies/search/';
  
  https.get(url+'?Title='+title+'&page='+page, (res) => {
    res.on('data', (body) => {
      let data = JSON.parse(body);
      total_pages = data.total_pages;
      // push the first page titles to the array
      data.data.forEach(  el => {
          title_data.push(el.Title);
      });
      title_data.sort();
      // Next if total pages > 1 then we do next loop
      // to fetch the data up to the end of the pages
      if (total_pages > 1) {
        for (let i = 2; i <= total_pages; i++) {
          newFetch(title,i);
        }
      } else {
        console.log('...................');
        console.log(title_data.join('\n'));
        console.log('...................');
      }   
    });
  }).on('error', (e) => {
      console.error(e);
  });

  const newFetch = (fetchTitle, newPage) => {
    https.get(url+'?Title='+fetchTitle+'&page='+newPage, (res) => {
        res.on('data', (body) => {
          let data = JSON.parse(body);
          // push title to the array
          data.data.forEach( el => {
              title_data.push(el.Title);
          });
          title_data.sort();
          console.log('...................');
          console.log(title_data.join('\n'));
          console.log('...................');
        });
    }).on('error', (e) => {
      console.error(e);
    });
  }
}

getMovieTitles('spiderman');
