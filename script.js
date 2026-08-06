


const title = document.querySelector("h1");


const myP = document.createElement("p")
myP.textContent = "come va?"
title.appendChild(myP);


function BookQualities(name, author = "unknown author", year = new Date()) {

    if (!new.target) {
        throw new TypeError("Calling Book without new is not permitted")
    }
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = crypto.randomUUID();

}

function Book(bookQualities) {

    if (!new.target) {
        throw new TypeError("Calling Book without new is not permitted")
    }
    this.bookQualities = bookQualities

    this.getId = function () {
        return this.bookQualities.id;
    }

    this.toString = function () {
        qualitiesParams = Object.entries(this.bookQualities)
        for (let key in qualitiesParams) {
            console.log(key, qualitiesParams[key])
        }
    }



}


const library = []

function createNewBook(bookQualities) {
    try {
        book = new Book(bookQualities)
        library.push(book)
        console.log("Added a new book!")

    } catch (error) {
        console.log(`Cannot create a new book:${error}`)
    }

}

function printLibrary() {
    library.forEach(element => {
        element.toString()
    });
}
createNewBook(new BookQualities("Gennaro stirato"))
createNewBook(new BookQualities("La principessa", "Toyo Taro"))
console.log(library)
printLibrary();

new_book_button = document.querySelector("#new_book")
function new_book_onclick(event) {
    console.log("I can now add a book!")
    field = document.querySelector("fieldset")
    field.style.display = "block";

}
new_book_button.addEventListener("click", new_book_onclick)
function on_submit(event) {
    event.preventDefault();
    console.log("Sumbitted!");

    field = document.querySelector("fieldset")
    field.style.display = "none"
    form = document.querySelector("form")
    formData = new FormData(form)
    createNewBook(new BookQualities(formData.get("name"), formData.get("author"), formData.get("year")))
    library[library.length - 1].toString();
}

form = document.querySelector("form")
form.addEventListener("submit", on_submit)
