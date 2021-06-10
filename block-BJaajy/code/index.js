let randomNumber = function () {
  return Math.floor(Math.random() * 100);
};
randomNumber();

let one = new Promise((res, rej) => {
  setTimeout(res(randomNumber()), 1000);
});

let two = new Promise((res, rej) => {
  setTimeout(res(randomNumber()), 2000);
});

let three = new Promise((res, rej) => {
  setTimeout(res(randomNumber()), 3000);
});

let four = new Promise((res, rej) => {
  setTimeout(res(randomNumber()), 4000);
});

let all = Promise.all([one, two, three, four])
  .then((res) => console.log(res))
  .catch((error) => console.error(error));

const userNames = [
    "shishupalamigo",
    "prank7",
    "nnnkit",
    "suraj122",
    "shastri48"
];

const userData = Promise.all(
    userNames.map((user) => {
        fetch(`https://api.github.com/users/${user}`).then(res => res.json())
        .then(user => console.log(`Name: ${user.name}, Followers: ${user.followers}`))
    })
);

const dog = fetch(`https://random.dog/woof.json`).then(woof => console.log(woof));
const cat = fetch(`https://aws.random.cat/meow`).then(meow => console.log(meow));

let winner = Promise.race([dog, cat]);

console.log(winner);


Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('Arya'), 1000);
    }),
    'Sam',
    { name: 'John' },
  ]).then(console.log);

 //["Arya", "sam", {name: "John"}]
// It will 1 second to resolve the promise.   