import { API_URL_GAMES, API_URL_TOP, API_KEY } from './api_keys/keys.js';

/* const SEARCH_GAMES_URL = `${API_URL_GAMES}?key=${API_KEY}&search=`; */
const SEARCH_GAMES_URL = `${''}?key=${''}&search=`;

let gamesBtn = document.querySelector('.top_games_btn');
//
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
const paginationButtons = document.querySelector('.pagination_btns');
const gamesList = document.querySelector('#games_list');
/* let gamesArr = [...gamesList.querySelectorAll('.game_card')]; */
let gamesArr = [];

const itemsLimit = 10;
/* const pageCount = Math.ceil(gamesArr.length / itemsLimit); */
let pageCount;
let currentPage = 1;

// set fetch here?

// fetch api

const fetchGAMES = async () => {
  try {
    const res = await fetch(
      /* `${API_URL_GAMES}?key=${API_KEY}&page=${1}&page_size=${20}` */
      `${''}?key=${''}&page=${1}&page_size=${20}`
    );
    const data = await res.json();
    gamesArr = data.results;
    if (!res.ok) {
      console.log('error getting data');
      return;
    } else {
      createItem(gamesArr);
      console.log(data);
      console.log(gamesArr);
      getPaginationNumbers(gamesArr);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
};

/* fetchGAMES(); */

// get top games fetch
const getTopGames = async () => {
  try {
    const res = await fetch(`${API_URL_TOP}?key=${API_KEY}`);
    const data = await res.json();
    if (!res.ok) {
      console.log(data.description);
      return;
    } else {
      createItem(data.results);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
};
const fetchTest = async () => {
  // https://api.rawg.io/api/platforms - plattforms
  // upcoming games https://api.rawg.io/api/games?dates=2023-01-01,2023-12-31&ordering=-added
  // most popular games in 2022 https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added
  try {
    const res = await fetch(
     /*  `https://api.rawg.io/api/games?key=${API_KEY}?metacritic=80,100` */
       `https://api.rawg.io/api/games?key=${''}?metacritic=80,100` 
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(data.description);
      return;
    } else {
      console.log(data.results);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
};

/* fetchTest(); */
// platforms
// pc 4
// playstation 5 id 187
// xbox series x/s id 186
// Nintendo Switch id 7

gamesBtn.addEventListener('click', () => {
  getTopGames();
});

window.addEventListener('load', () => {
  /*  fetchGAMES(); */
  setCurrentPage(1);

  prevBtn.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  btnClick();
});

const createPaginationButton = async (idx) => {
  const paginationBtn = document.createElement('button');
  paginationBtn.classList.add('pagination_btn');
  paginationBtn.textContent = await idx;
  paginationBtn.setAttribute('page-index', idx);
  paginationBtn.setAttribute('aria-label', 'Page: ' + idx);
  /*  console.log(paginationBtn); */
  paginationButtons.appendChild(paginationBtn);

  btnClick();
};

function btnClick() {
  const btns = [...document.querySelectorAll('.pagination_btn')];
  btns.forEach((btn) => {
    console.log('page num clicked');
    const pageIndex = Number(btn.getAttribute('page-index'));
    if (pageIndex) {
      btn.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
}

const getPaginationNumbers = async (data) => {
  await data;
  pageCount = Math.ceil(data.length / itemsLimit);
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

const setCurrentPage = async (pageNum) => {
  let data = [...document.querySelectorAll('.game_card')];
  currentPage = pageNum;
  const prevCount = (pageNum - 1) * itemsLimit;
  const currCount = pageNum * itemsLimit;

  handleActivePageNumber();
  handlePageButtonsStatus();

  data.forEach((item, idx) => {
    item.classList.add('hidden');
    if (idx >= prevCount && idx < currCount) {
      item.classList.remove('hidden');
    }
  });
};

// creating the game cards from the fetch

// icons will only use 4 not getting mac, ios, android, etc

const ps = '<i class="fa-brands fa-playstation"></i>';
const xbox = '<i class="fa-brands fa-xbox"></i>';
const pc = '<i class="fa-solid fa-headset"></i>';
const nintendo = '<i class="fa-solid fa-n"></i>';

const createItem = (item) => {
  let ul = gamesList;
  let html = '';

  item.forEach((item) => {
    let platforms = '';

    item.parent_platforms.forEach((p) => {
      let name = p.platform.name;
      switch (name) {
        case 'PC':
          name = pc;
          break;
        case 'PlayStation':
          name = ps;
          break;
        case 'Xbox':
          name = xbox;
          break;
        case 'Nintendo':
          name = nintendo;
          break;
        default:
          return null;
      }

      platforms += `
                    <span>${name}</span>
                    `;
    });

    html += `
    <li class="game_card game_card_front">
                <img src="${item.background_image}" alt="">
                <h2>${item.name}</h2>
                <div class="game_info">
                    <div>
                        <span class="game_score">Rating: ${item.rating}</span>
                        <span class="game_score">Metacritic: ${item.metacritic}</span>
                        <p class="game_plattforms">${platforms}</p>
                    </div>
                </div>
                <div class="game_card_back game_review">
                    <p>review</p>
                    <p>${item.name}</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate ipsam fugiat facilis dolorum
                        at impedit quae laboriosam ullam laudantium optio.</p>
                </div>
            </li>
    `;

    ul.innerHTML = html;
  });
};

const searchBtnActive = document.querySelector('.fa-solid.fa-magnifying-glass');

searchBtnActive.addEventListener('click', () => {
  const wrapper = document.querySelector('form > .search_wrapper');
  const label = document.querySelector('form > .search_wrapper > label');
  const sInput = document.querySelector('#search');
  const subBtn = document.querySelector('form > .search_wrapper > #submit');

  wrapper.classList.toggle('active');
  label.classList.toggle('active');
  sInput.classList.toggle('active');
  subBtn.classList.toggle('active');
});

// for the search function get input from form
const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  e.preventDefault(); // so many ways of acutally doing this :D
  let search = document.querySelector('#search').value;
  console.log('this is the new search value inside submit function: ' + search);
  handleSearch(search);
  form.reset();
});

// function to fetch the search query
const handleSearch = async (search) => {
  fetch(SEARCH_GAMES_URL + `${search}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      createItem(data.results);
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
      createItem(data.results);
    })
    .catch((err) => {
      console.error(err.message);
    });
} */

/* const paginationData = async () => {
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
      createItem(gamesArr);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
}; */

/* 
getting the plattform icons test

{p.platform.name 
                    ?
                     (p.platform.name === 'PC' ? pc : null
                    ||  p.platform.name === 'PlayStation' ? ps : null
                    || p.platform.name === 'Xbox' ?  xbox  : null 
                    || p.platform.name === 'Nintendo'?  nintendo : null
                    )   : p.platform.name          
                    }

*/
