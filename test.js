import items from './items.js';
console.log('check check');
/* 
items.forEach(i => {
    console.log(i.title)
})
 */

const pagination = document.querySelector('.pagination > ul');
const content = document.querySelector('.content_wrapper');

let pageIndex = 0;
let itemsPerPage = 8;

loadItems(items);

function loadItems() {
  content.innerHTML = '';

  for (
    let i = pageIndex * itemsPerPage;
    i < pageIndex * itemsPerPage + itemsPerPage;
    i++
  ) {
    if (!items[i]) {
      break;
    }
    const item = document.createElement('div');
    item.innerHTML = `
        <div class="item">
        <h2>${items[i].title}</h2>
        <p>
${items[i].desc}
        </p>
        <p>score: ${items[i].score}</p>

        </div>
        `;

    content.append(item);
  }
  // adding page numbers
  loadPageNav();
}

// creating the page numbers

function loadPageNav() {
  pagination.innerHTML = '';

  for (let i = 0; i < items.length / itemsPerPage; i++) {
    const btn = document.createElement('li');
    btn.classList.add('page_num');
    btn.textContent = i + 1;
    btn.addEventListener('click', (e) => {
      pageIndex = e.target.textContent - 1;
      loadItems();
    });
      
      if (i === pageIndex) {
          btn.style.fontSize = '1.6rem'
          btn.style.backgroundColor = 'black'
      }
    pagination.append(btn);
  }
}
/* 
const prevBtn = document.querySelector('.prev_btn');
const NextBtn = document.querySelector('.prev_btn'); */


