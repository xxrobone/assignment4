import { API_URL, API_KEY } from './api_keys/keys.js';

const SEARCH_URL = `${API_URL}?key=${API_KEY}&search=`;

let btn_get_games = document.querySelector('.get_btn');
//
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
const paginationButtons = document.querySelector('.pagination_btns');
const gamesList = document.querySelector('#game_list');
let gamesArr = [...gamesList.querySelectorAll('.game_card')];

const itemsLimit = 10;
const pageCount = Math.ceil(gamesArr.length / itemsLimit);
console.log('number of pages: ' + pageCount);
let currentPage;

window.addEventListener('load', () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevBtn.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  paginationBtnClick();

  /* document.querySelectorAll('.pagination_btn').forEach((btn) => {
    const pageIndex = Number(btn.getAttribute('page-index'));
    if (pageIndex) {
      btn.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  }); */
});

function paginationBtnClick() {
  const btns = [...document.querySelectorAll('.pagination_btn')];
  btns.forEach((btn) => {
    const pageIndex = Number(btn.getAttribute('page-index'));
    if (pageIndex) {
      btn.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
}

console.log(gamesArr.length);

const createPaginationButton = (idx) => {
  const paginationBtn = document.createElement('button');
  paginationBtn.classList.add('pagination_btn');
  paginationBtn.textContent = idx;
  paginationBtn.setAttribute('page-index', idx);
  paginationBtn.setAttribute('aria-label', 'Page: ' + idx);
  /*  console.log(paginationBtn); */
  paginationButtons.appendChild(paginationBtn);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    createPaginationButton(i);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll('.pagination_btn').forEach((btn) => {
    btn.classList.remove('active');

    const pageIndex = Number(btn.getAttribute('page-index'));
    if (pageIndex == currentPage) {
      btn.classList.add('active');
    }
  });
};

// create function enable and disable buttons if on first or last page
// we will set the hanle page button status in the setCurrentPage to check status
const disableButton = (btn) => {
  btn.classList.add('disabled');
  btn.setAttribute('disabled', true);
};
const enableButton = (btn) => {
  btn.classList.remove('disabled');
  btn.removeAttribute('disabled');
};
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevBtn);
  } else {
    enableButton(prevBtn);
  }
  if (pageCount === currentPage) {
    disableButton(nextBtn);
  } else {
    enableButton(nextBtn);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  const prevCount = (pageNum - 1) * itemsLimit;
  const currCount = pageNum * itemsLimit;

  handleActivePageNumber();
  handlePageButtonsStatus();

  gamesArr.forEach((item, idx) => {
    item.classList.add('hidden');
    if (idx >= prevCount && idx < currCount) {
      item.classList.remove('hidden');
    }
  });

  /* 
  when fetching from api
  item.forEach((item, idx) => {
  el.innerHTML = ''
    if (index >= prevRange && index < currRange) {
      el.appendChild(item)

      createCard 
      create this so change the games list to have a function
      creating the card
    }
  })
  */
};

btn_get_games.addEventListener('click', () => {
  fetchAPI();
});

const fetchAPI = async () => {
  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`);
    const data = await res.json();
    if (!res.ok) {
      console.log(data.descriptiong);
      return;
    } else {
      console.log(data.results);
      gamesArr = data.results;
      insertItem(data.results);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
};

const paginationData = async () => {
  try {
    const res = await fetch(
      `${API_URL}?key=${API_KEY}&page=${currentPage}&page_size=${itemsLimit}`
    );
    const data = await res.json();
    if (!res.ok) {
      console.log("Error can't download data.");
      return;
    } else {
      getPaginationNumbers();
      setCurrentPage(1);

      prevBtn.addEventListener('click', () => {
        setCurrentPage(currentPage - 1);
      });

      nextBtn.addEventListener('click', () => {
        setCurrentPage(currentPage + 1);
      });

      paginationBtnClick();

      gamesArr = data.results;
      console.log('data from pagination fetch : \n' + gamesArr);
      insertItem(gamesArr);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
};

const insertItem = (item) => {
  let ul = gamesList;
  let html = '';

  item.forEach((item) => {
    let platforms;

    item.parent_platforms.forEach((p) => {
      platforms += `
                    <span>${p.platform.name}</span>
                    `;
    });

    html += `
    <li class="game_card game_card_front">
                <img src="${item.background_image}" alt="">
                <h4>${item.name}</h4>
                <div class="game_info">
                    <div>
                        <span class="game_score">Rating: ${item.rating}</span>
                        <p class="game_plattforms">${platforms}</p>
                    </div>
                </div>
            </li>
    `;

    ul.innerHTML = html;
  });
};

const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // so many ways of acutally doing this :D

  let search = document.querySelector('#search').value;
  console.log('this is the new search value inside submit function: ' + search);

  handleSearch(search);
});

const handleSearch = async (search) => {
  fetch(SEARCH_URL + `${search}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      insertItem(data.results);
    });
};

/* async function fetchAPI() {
  fetch(`${API_URL}?key=${API_KEY}`)
    .then((res) => {
      if (!res.ok) {
        console.log('Could not fetch data');
        return;
      } else {
        console.log('response successful');
        return res.json();
      }
    })
    .then((data) => {
      console.log(data.results);
      console.log(data.results[0].parent_platforms);
      insertItem(data.results);
    })
    .catch((err) => {
      console.error(err.message);
    });
} */
