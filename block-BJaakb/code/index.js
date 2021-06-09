

// let data = fetchData(`https:api.github.com/users/getify`).then(data => console.log(data.name)).catch(error => alert('Check Your Internet Connection!'));

let display = document.querySelector('.display');
let input = document.querySelector('input');

const url =
  'https://api.unsplash.com/photos/?client_id=YYJ9Yzc0iLISY4UhTxDC187x_cZDkS9btvhGQBcTghs';

const GetSearchUrl = (query) => {
  return `https://api.unsplash.com/search/photos/?query=${query}&client_id=YYJ9Yzc0iLISY4UhTxDC187x_cZDkS9btvhGQBcTghs`;
};

function fetchData(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject('Something went wong!');

        xhr.send();
    });
};

// CALLBACK PATTERN

// function fetchData(url, sucessHandler) {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.onload = () => sucessHandler(JSON.parse(xhr.response));

//   xhr.onerror = function () {
//     console.error('Something Went Wrong!');
//   };
//   xhr.send();
// }

// PROMISES

function displayImages(images) {
  display.innerHTML = '';
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.small;
    li.append(img);
    display.append(li);
  });
}

fetchData(url)
.then(displayImages)
.catch(error => console.log("Error!"));

function handleSearch(event) {
  if (event.keyCode === 13 && input.value) {
    fetchData(GetSearchUrl(input.value)).then(searchResults => {
      displayImages(searchResults.results);
    }).catch(error => console.log("Error!"))
    input.value = '';
  }
}

input.addEventListener('keyup', handleSearch);