var title = 'spiderman';
var page = 1;
var total = '';
var total_pages = '';
var title_data = [];
var url = 'https://jsonmock.hackerrank.com/api/movies/search/';

fetch(url+'?Title='+title+'&page='+page)
.then(  res  => res.json()) 
.then(  data => { total_pages = data.total_pages, 
                  total = data.total,
                  // Push the first page titles to the array,
                  data.data.forEach(element => {
                      title_data.push(element.Title) 
                  });
                  // Next if total pages > 1 then we do next loop 
                  // to fetch the data up the end of the pages
                  for (let i = 2; i <= total_pages; i++) {
                    newFetch(title , i);
                  };
                  console.log(title_data);
      })
.catch(error => console.error(error));

const newFetch = async (fetchTitle , newPage) => {
  const rep = await fetch(url+'?Title='+fetchTitle+'&page='+newPage);
  const data = await rep.json();
  // push title to the array,
  data.data.forEach(element => {
      title_data.push(element.Title) 
  });
  title_data.sort();
}