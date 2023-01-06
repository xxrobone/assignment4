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


example helper
function paginateData(pageNumber, pageSize) {
  // Fetch data from server
  fetch(
    'http://example.com/data?pageNumber=' + pageNumber + '&pageSize=' + pageSize
  )
    .then((response) => response.json())
    .then((data) => {
      // Calculate the total number of pages
      const totalPages = Math.ceil(data.total / pageSize);

      // Render the data for the current page
      renderData(data.results);

      // Render the pagination buttons
      renderPaginationButtons(totalPages, pageNumber);
    });
}

// Initialize the pagination with the first page
paginateData(1, 10);
*/