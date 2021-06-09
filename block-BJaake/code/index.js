let display = document.querySelector('.display');

let source = document.querySelector('#source');

function handleChange(event) {
  document.querySelector('.display').innerHTML = '';
  let data2 = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((res) => res.json())
    .then((userData) =>
      userData.forEach((data) => {
        if (data.newsSite == event.target.value) {
          createUI(data);
        }
      })
    );
}
source.addEventListener('change', handleChange);

let data = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
  .then((res) => res.json())
  .then((userData) => userData.forEach((data) => createUI(data)));

function createUI(info) {
  let newsItem = document.createElement('div');
  let newsImageContainer = document.createElement('aside');
  let newsImage = document.createElement('img');
  let article = document.createElement('article');
  let newsSite = document.createElement('span');
  let newsHeading = document.createElement('h2');
  let newsSummary = document.createElement('p')
  let readMore = document.createElement('a');

  newsItem.setAttribute('class', 'article-container');
  readMore.innerText = 'READ MORE...';
  newsImage.src = info.imageUrl;
  newsHeading.innerText = info.title;
  newsSummary.innerText = info.summary;
  newsSite.innerText = info.newsSite;
  readMore.href = info.url;
  readMore.target = "_blank";

  newsImageContainer.append(newsImage);
  article.append(newsSite, newsHeading, newsSummary,readMore);
  newsItem.append(newsImageContainer, article);
  display.append(newsItem);
}