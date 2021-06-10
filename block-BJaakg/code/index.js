(function() {
    const ul = document.querySelector("ul");
    const modal = document.querySelector(".modal");
    const close = document.querySelector(".close");
    const charactersData = document.querySelector(".characters-data");
    
    /* <div class="donut"></div> */
    
    function handleSpinner(rootElm, status = false) {
        if(status) {
            rootElm.innerHTML = `<div class="donut"><img src = "./assets/loader.gif"></div>`;
        }
    }
    close.addEventListener("click", (e) => {
        e.target.parentElement.style.display = "none";
    })

    const url = `https://www.anapioficeandfire.com/api/books`;
    
    
    function displayCharacters(characters) {
        handleSpinner(charactersData, true);   
        Promise.all(characters.map((character) =>fetch(character).then((res) => res.json())))
        .then((data) => {
            charactersData.innerHTML = "";
            data.forEach((character) => {
            let li = document.createElement("li");

             li.innerText = `${character.name} : (${character.aliases.join(",  ")})`;

            charactersData.append(li);
            
            })
                       
        });
    
        modal.append(charactersData);
        
    }
    
    
    function displayUI(books) {
        ul.innerHTML = "";
        books.forEach((book) => {
            let li = document.createElement("li");
            li.classList.add("book-container");

            let title = document.createElement("h2");
            title.innerText = book.name;

            let author = document.createElement("h3");
            author.innerText = book.authors.join(' ');

            let numberOfPages = document.createElement("span");
            numberOfPages.innerText = `Number of Pages: ${book.numberOfPages}`;

            let publisher = document.createElement("span");
            publisher.innerText = `Publisher: ${book.publisher}`;

            let released = document.createElement("span");
            released.innerText = `Release Date: ${book.released.slice(0, 10)}`;

            let country = document.createElement("span");
            country.innerText = `Country: ${book.country}`;

            let button = document.createElement("a");
            button.innerText = `Show Characters ${book.characters.length}`;

            button.addEventListener("click", (e) => {
                displayCharacters(book.characters);
                modal.style.display = "block";
            });

            li.append(title, author, numberOfPages, publisher,  released, country, button);

            ul.append(li);
        })
    }
    
    
    function booksData() {
        handleSpinner(ul, true);
        fetch(url).then((res) => res.json())
        .then((booksData) =>displayUI(booksData))
        .finally(() => handleSpinner(ul));
    }
            
    booksData();
     
    })(); 