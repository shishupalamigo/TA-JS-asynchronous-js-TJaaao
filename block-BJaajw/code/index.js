let display = document.querySelector('.display');

let source = document.querySelector('#source');

let main = document.querySelector(".main");
let errorElm = document.querySelector(".error-message");

function handleErrorMessage (message = "Something went wrong!") {
  errorElm.style.display = "block";
  main.style.display = "none";
  errorElm.innerText = message;
}

function createLoader() {
  let preLoader = document.createElement('div');
  let preLoaderImg = document.createElement('img');
  preLoaderImg.src = './assets/loader.gif';
  preLoader.setAttribute('class', 'loader');
  preLoader.append(preLoaderImg);
  display.prepend(preLoader);
}
createLoader();

function handleChange(event) {
  document.querySelector('.display').innerHTML = '';
  createLoader();
  let data2 = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((res) => {
      if (res.ok) {
      return res.json();
      } else {
        throw new Error("Respnse Not Ok!");
      }
    })
    .then((userData) => {
      document.querySelector('.display').innerHTML = '';
      userData.forEach((data) => {
        if (data.newsSite == event.target.value) {
          createUI(data);
        }
      });
    })
    .catch((error) => {
      handleErrorMessage(error);
    });
}
source.addEventListener('change', handleChange);

function init() {
  let data = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((res) => {
      if (res.ok) {
        return res.json();
        } else {
          throw new Error("Respnse Not Ok!");
        }
    })
    .then((userData) => {
      document.querySelector('.display').innerHTML = '';

      userData.forEach((data) => createUI(data));
    })    .catch((error) => {
      handleErrorMessage(error);
    });
}
if (navigator.onLine) {
  init();
} else {
handleErrorMessage("Check your internet connection! ❌");
}


function createUI(info) {
  let newsItem = document.createElement('div');
  let newsImageContainer = document.createElement('aside');
  let newsImage = document.createElement('img');
  let article = document.createElement('article');
  let newsSite = document.createElement('span');
  let newsHeading = document.createElement('h2');
  let newsSummary = document.createElement('p');
  let readMore = document.createElement('a');

  newsItem.setAttribute('class', 'article-container');
  readMore.innerText = 'READ MORE...';
  newsImage.src = info.imageUrl;
  newsHeading.innerText = info.title;
  newsSummary.innerText = info.summary;
  newsSite.innerText = info.newsSite;
  readMore.href = info.url;
  readMore.target = '_blank';

  newsImageContainer.append(newsImage);
  article.append(newsSite, newsHeading, newsSummary, readMore);
  newsItem.append(newsImageContainer, article);
  display.append(newsItem);
}
