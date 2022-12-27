console.log('api js file connected');
import { API_URL, API_KEY } from './api_keys/keys.js';
let btn_get_games = document.querySelector('.get_btn');

btn_get_games.addEventListener('click', () => {
  fetchAPI();
});

async function fetchAPI() {
  fetch(`${API_URL}?key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      console.log(data.results[0].parent_platforms);
      createGameList(data.results);
    })
    .catch((err) => {
      console.error(err.message);
    });
}



async function createGameList(item) {
  let ul = document.querySelector('#game_list');
  let html = '';

  item.forEach((item) => {
    let platforms;
    let ps;

    item.parent_platforms.forEach((p) => {
      ps += `
                    <span>${p.platform.name}</span>
                    `;

      platforms = ps;
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
}
/* 
let search = '';
const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // so many ways of acutally doing this :D

  let newSearch = document.querySelector('#search').value;
  console.log(
    'this is the new search value inside submit function: ' + newSearch
  );
}); */
/* 
const handleSearch = () => {
  fetch(SEARCH_URL + `${search}`)
    .then((res) => res.json())
    .then((data) => console.log(data.results));
};
 */

// could get form data like this, maybe better when getting more input data
/* const data = new FormData(form);
    for (const [name, value] of data) {
      console.log(name, ':', value);
    }
      */


    
/* 
added
: 
18389
added_by_status
: 
{yet: 469, owned: 10641, beaten: 5123, toplay: 545, dropped: 942, …}
background_image
: 
"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
clip
: 
null
dominant_color
: 
"0f0f0f"
esrb_rating
: 
{id: 4, name: 'Mature', slug: 'mature'}
genres
: 
(2) [{…}, {…}]
id
: 
3498
metacritic
: 
91
name
: 
"Grand Theft Auto V"
parent_platforms
: 
(3) [{…}, {…}, {…}]
platforms
: 
(7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
playtime
: 
72
rating
: 
4.47
rating_top
: 
5
ratings
: 
(4) [{…}, {…}, {…}, {…}]
ratings_count
: 
6054
released
: 
"2013-09-17"
reviews_count
: 
6131
reviews_text_count
: 
43
saturated_color
: 
"0f0f0f"
short_screenshots
: 
(7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
slug
: 
"grand-theft-auto-v"
stores
: 
(5) [{…}, {…}, {…}, {…}, {…}]
suggestions_count
: 
413
tags
: 
(19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
tba
: 
false
updated
: 
"2022-12-25T20:03:55"
user_game
: 
null
*/
