let display = document.querySelector('.display');
let input = document.querySelector('input');

function handleChange(event) {
  if (event.keyCode === 13) {
    display.innerHTML = '';
    let xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos/?query=${event.target.value}&client_id=YYJ9Yzc0iLISY4UhTxDC187x_cZDkS9btvhGQBcTghs`
    );
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);

      for (let i = 0; i < userData.results.length; i++) {
        display.innerHTML += `<img src="${userData.results[i].urls.small}" alt="${userData.results[i].alt_description}"/>`;
      }
    };
    xhr.send();
    input.value = '';
  }
}

input.addEventListener('keyup', handleChange);