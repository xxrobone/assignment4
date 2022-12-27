console.log('api js file connected');
import { API_URL, API_KEY } from './api_keys/keys.js';

const SEARCH_URL = `${API_URL}?key=${API_KEY}&search=`;

let btn_get_games = document.querySelector('.get_btn');

btn_get_games.addEventListener('click', () => {
  fetchAPI();
});

const fetchAPI = async () => {
  try {
   /*  const res = await fetch(`${API_URL}?key=${API_KEY}`); */
    const res = await fetch(`${API_URL}?key=${API_KEY}&page=1&page_size=40`);
    const data = await res.json();
    if (!res.ok) {
      console.log(data.descriptiong);
      return;
    } else {
      console.log(data.results);
      createGameList(data.results);
    }
  } catch (error) {
    console.log(error + 'something went wrong');
  }
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
      createGameList(data.results);
    })
    .catch((err) => {
      console.error(err.message);
    });
} */

const createGameList = (item) => {
  let ul = document.querySelector('#game_list');
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
      createGameList(data.results);
    });
};

// could get form data like this, maybe better when getting more input data
/* const data = new FormData(form);
    for (const [name, value] of data) {
      console.log(name, ':', value);
    }
      */
