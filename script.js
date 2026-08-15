

function BookQualities(name, author = "unknown author", year = new Date(), isRead = true) {

    if (!new.target) {
        throw new TypeError("Calling Book without new is not permitted")
    }
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = crypto.randomUUID();
    this.isRead = isRead;

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

        return this.bookQualities
    }



}

function Library() {

    if (!new.target) {
        throw new TypeError("Calling Library without new is not permitted")
    }
    this.books = []

    this.add_book = function (book) {
        this.books.push(book)
    }
    this.printLibrary = function () {
        this.books.forEach(element => {
            console.log(element.toString())
        });
    }
    this.get_books = function () {
        return this.books
    }

}

library = new Library();

function createNewBook(bookQualities) {
    try {
        book = new Book(bookQualities)
        library.add_book(book)
        console.log("Added a new book!")

    } catch (error) {
        console.log(`Cannot create a new book:${error}`)
    }

}


createNewBook(new BookQualities("Gennaro stirato"))
createNewBook(new BookQualities("La principessa", "Toyo Taro"))
console.log(library)
library.printLibrary();


function on_submit(event) {
    event.preventDefault();
    console.log("Sumbitted!");

    field = document.querySelector("#book_dialog")
    field.style.display = "none"
    form = document.querySelector("form")
    formData = new FormData(form)
    createNewBook(new BookQualities(formData.get("name"), formData.get("author"), formData.get("year")))
    library[library.length - 1].toString();
}


function BookCard() {
    if (!new.target) {
        throw new TypeError("Calling BookCard without new is not permitted")
    }

    this.book_card_container = document.createElement("div")
    this.book_card_container.classList.add("card")

    this.titleElement = document.createElement("h3")
    this.authorElement = document.createElement("p")
    this.dateElement = document.createElement("p");
    // this.idElement=
    this.readElement = document.createElement("input")
    this.readElement.setAttribute("type", "checkbox")

    this.authorElement.classList.add("book-author")
    this.dateElement.classList.add("book-date")

    this.book_card_container.appendChild(this.titleElement)
    this.book_card_container.appendChild(this.authorElement)
    this.book_card_container.appendChild(this.dateElement)

    this.book_card_container.appendChild(this.readElement)


    this.setTitle = function (title) {
        this.titleElement.textContent = title
        return this
    }
    this.setReadStatus = function (readStatus) {
        this.readElement.checked = readStatus
        return this
    }
    this.setAuthor = function (author) {
        this.authorElement.textContent = author
        return this
    }
    this.setDate = function (date) {
        this.dateElement.textContent = date
        return this
    }
    this.render = function () {
        return this.book_card_container;
    }
}

function display_books() {
    book_arr = library.get_books()

    container = document.querySelector(".book_section")


    book_arr.forEach(book => {
        book_card = new BookCard()
        book_qualities = book.toString()
        book_card
            .setTitle(book_qualities["name"])
            .setReadStatus(book_qualities["isRead"])
            .setAuthor(book_qualities["author"])
        container.appendChild(book_card.render())


    })
}
form = document.querySelector("form")
form.addEventListener("submit", on_submit)
display_books();
