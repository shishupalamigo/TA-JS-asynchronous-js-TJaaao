let display = document.querySelector('.display');
let input = document.querySelector('input');

const url =
  'https://api.unsplash.com/photos/?client_id=YYJ9Yzc0iLISY4UhTxDC187x_cZDkS9btvhGQBcTghs';

const GetSearchUrl = (query) => {
  return `https://api.unsplash.com/search/photos/?query=${query}&client_id=YYJ9Yzc0iLISY4UhTxDC187x_cZDkS9btvhGQBcTghs`;
};

function fetchData(url, sucessHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => sucessHandler(JSON.parse(xhr.response));

  xhr.onerror = function () {
    console.error('Something Went Wrong!');
  };
  xhr.send();
}
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

fetchData(url, displayImages);

function handleSearch(event) {
  if (event.keyCode === 13 && input.value) {
    fetchData(GetSearchUrl(input.value), (searchResults) => {
      displayImages(searchResults.results);
    });
    input.value = '';
  }
}

input.addEventListener('keyup', handleSearch);
