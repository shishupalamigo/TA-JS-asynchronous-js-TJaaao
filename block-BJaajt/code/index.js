
const input = document.querySelector("input");
const avatar = document.querySelector(".avatar");
const userName = document.querySelector(".user-name");
const bio = document.querySelector(".bio");
const followerUser = document.querySelector(".followers-count");
const followingUser = document.querySelector(".following");


function handleChange (event) {
    if (event.keyCode === 13 && input.value) {
        let user =  event.target.value;
        let xhr = new XMLHttpRequest();

xhr.open('GET', `https://api.github.com/users/${user}`);

xhr.onload = function () {
    let userData = JSON.parse(xhr.response);  
    avatar.src = userData.avatar_url;
    userName.innerText = userData.name;
    bio.innerText = userData.bio;    
}
xhr.onerror = function () {
    console.error("Something Went Wrong");
};
xhr.send();

let followers = new XMLHttpRequest();

followers.open('GET', `https://api.github.com/users/${user}/followers`);

followers.onload = function () {
    let followersData = JSON.parse(followers.response);
    followerUser.innerHTML = "Followers: ";
    followersData.forEach((element, index) => {
        if (index <= 5) {
            let followerAvatar = document.createElement("img");
            followerAvatar.src = element.avatar_url;
            let followerName = document.createElement("p");
            followerName.innerText = element.login;
            let followerInfo = document.createElement("div");
            followerInfo.append(followerAvatar, followerName);
            followerUser.append(followerInfo);
        }
    });
}
followers.send();

let following = new XMLHttpRequest();

following.open('GET', `https://api.github.com/users/${user}/following`);

following.onload = function () {
    let followingData = JSON.parse(following.response);
    followingUser.innerHTML = "Following: ";
    followingData.forEach((element, index) => {
        if (index <= 5) {
            let followingAvatar = document.createElement("img");
            followingAvatar.src = element.avatar_url;
            let followingName = document.createElement("p");
            followingName.innerText = element.login;
            let followingInfo = document.createElement("div");
            followingInfo.append(followingAvatar, followingName);
            followingUser.append(followingInfo);
        }
    });
}
following.send();
        event.target.value = "";        
    }

}

input.addEventListener("keyup", handleChange);


let button = document.querySelector("button");
let catImage = document.querySelector(".cat-image");

button.addEventListener('click', function() {
    let catApi = new XMLHttpRequest();
    catApi.open("GET", "https://api.thecatapi.com/v1/images/search?limit=1&size=full");

    catApi.onload = function () {

        let catData = JSON.parse(catApi.response);
        catImage.src = catData[0].url;
    }
    catApi.send();
});