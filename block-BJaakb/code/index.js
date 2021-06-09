function fetchData(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject('Something went wong!');

        xhr.send();
    });
};

let data = fetchData(`https:api.github.com/users/getify`).then(data => console.log(data.name)).catch(error => alert('Check Your Internet Connection!'));

