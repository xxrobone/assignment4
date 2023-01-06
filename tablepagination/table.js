/* api https://randomuser.me/api/  */
/* 
const fetchBtn = document.querySelector('.fetch_btn');

fetchBtn.addEventListener('click', fetchData, false);

let data, table, sortCol;
let sortAsc = false;
const pageSize = 4;
let curPage = 1;

async function fetchData() {
  // Select the table (well, tbody)
  table = document.querySelector('#table tbody');
  // get the cats
  let res = await fetch('https://randomuser.me/api/?results=25');
  data = await res.json();
  console.log(data.results);
  renderTable();

  // listen for sort clicks
  document.querySelectorAll('#table thead tr th').forEach((t) => {
    t.addEventListener('click', sort, false);
  });

  document
    .querySelector('#nextButton')
    .addEventListener('click', nextPage, false);
  document
    .querySelector('#prevButton')
    .addEventListener('click', previousPage, false);
}

// rendering data to dom - table
function renderTable() {
  // create html
  let result = '';

  data.results
    .filter((r, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((p) => {
      result += `<tr>
     <td>${p.name.first + ' ' + p.name.last}</td>
     <td>${p.gender}</td>
     <td>${p.email}</td>
     <td>${p.location.country}</td>
     <td>${
       p.location.city +
       ', ' +
       p.location.street.name +
       ', ' +
       p.location.street.number
     }</td>
    
     </tr>`;
    });
  table.innerHTML = result;
}

// sorting
function sort(e) {
  let thisSort = e.target.data.results.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  console.log('sort dir is ', sortAsc);
  data.results.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    return 0;
  });
  renderTable();
}

// prev next button function

function previousPage() {
  if (curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if (curPage * pageSize < data.results.length) curPage++;
  renderTable();
}
 */
