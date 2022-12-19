const apiBtn = document.querySelector('.get_btn');
const apiTestBtn = document.querySelector('.get_test_btn');
const apiTest = 'https://go-apod.herokuapp.com/apod';

apiBtn.addEventListener('click', getData);
apiTestBtn.addEventListener('click', getTestData);

const apiUrl = 'https://api.github.com/users/xxrobone/repos';
const list = document.querySelector('#repos');
let title = '';
let repoName = '';
let repoUrl = '';
let id = null;
let html = '';

function getData() {
  list.innerHTML = '';
  fetch(apiUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      title = document.createElement('h2');
      title.classList.add('title');
      title.textContent = 'My repos from github';
      list.appendChild(title);

      data.forEach((repo) => {
        repoName = repo.name;
        repoUrl = repo.html_url;
        console.log(repoName, repoUrl);

        html = document.createElement('LI');
        html.innerHTML = `
            <a href="${repoUrl}" target="_blank" class="repo_a">${repoName}</a>
            `;

        list.appendChild(html);
      });
    });
}

/* ajax asyncronous javascript and xml, json */
/* https://go-apod.herokuapp.com/apod */

function getTestData() {
  fetch(apiTest)
    .then((res) => res.json())
    .then((data) => {
      title = document.createElement('h2');
      title.classList.add('title');
      title.textContent = `${data.title}`;
      list.appendChild(title);
      console.log(data.title, data.explanation);
      writeDataToDom(data);
    })
    .catch((err) => console.log(err));
}

function writeDataToDom(data) {
  list.innerHTML = '';
  let output = '';
  output = document.createElement('div');
  output.classList.add('output');
  output.innerHTML = `
          <h2 class="apod_title">${data.title}</h2>
          <p class="desc">${data.explanation}</p>
          <p class="date">Date: ${data.date}</p>
          <img class="img" src="${data.url}"></img>
          <a href="${data.hdurl}" target="_blank">Check image source</a>
          <p class="copy">&copy; ${data.copyright}</p>
          `;

  list.appendChild(output);
}

/* 

THE DATA FROM THE API
  copyright
: 
"Craig Stocks"
date
: 
"2022-12-19"
explanation
: 
"What's causing the commotion in the Tadpole Nebula? Star formation.  Dusty emission in the Tadpole Nebula, IC 410, lies about 12,000 light-years away in the northern constellation of the Charioteer (Auriga). The cloud of glowing gas is over 100 light-years across, sculpted by stellar winds and radiation from embedded open star cluster NGC 1893. Formed in the interstellar cloud a mere 4 million years ago, bright newly formed cluster stars are seen all around the star-forming nebula.  Notable on the lower-right of the featured image are two relatively dense streamers of material trailing away from the nebula's central regions. Potentially sites of ongoing star formation in IC 410, these cosmic tadpole shapes are about 10 light-years long. The image was processed highlighting the emission from sulfur (red), hydrogen (green), and oxygen (blue) gas -- but with the stars digitally removed."
hdurl
: 
"https://apod.nasa.gov/apod/image/2212/Tadpoles_Stocks_2560.jpg"
media_type
: 
"image"
service_version
: 
"v1"
title
: 
"The Tadpole Nebula in Gas and Dust"
url
: 
"https://apod.nasa.gov/apod/image/2212/Tadpoles_Stocks_960.jpg"
[[Prototype]]
: 
Object
 */
