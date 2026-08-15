

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

        return JSON.stringify(this.bookQualities)
    }
    this.getQualities = function () {
        return this.bookQualities;
    }



}

function Library() {

    if (!new.target) {
        throw new TypeError("Calling Library without new is not permitted")
    }
    this.books = []

    this.addBook = function (book) {
        this.books.push(book)
    }
    this.printLibrary = function () {
        this.books.forEach(element => {
            console.log(element.toString())
        });
    }
    this.getBooks = function () {
        return this.books
    }
    this.getLastBook = function () {
        return this.books[this.books.length - 1]
    }
    this.deleteBook = function (bookId) {
        const removeIdx = this.books.findIndex(book => {
            console.log(`book ha id: ${book.getId()}`)
            console.log(`target ha id:${bookId}`)
            return book.getId() === bookId
        })
        if (removeIdx !== -1) {

            this.books.splice(removeIdx, 1)
            this.printLibrary();
            console.log("Done delete")
            return true

        }
        else {
            console.log("NON trovato")
            return SyntaxError("bookId is not valid")
        }
    }



}

library = new Library();

function createNewBook(bookQualities) {
    try {
        book = new Book(bookQualities)
        library.addBook(book)
        console.log("Added a new book!")

    } catch (error) {
        console.log(`Cannot create a new book:${error}`)
    }

}


createNewBook(new BookQualities("Gennaro stirato"))
createNewBook(new BookQualities("La principessa", "Toyo Taro"))
console.log(library)
library.printLibrary();





function BookCard(book, onDelete) {
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
    this.deleteElement = document.createElement("button")
    this.deleteElement.textContent = "Delete"
    this.deleteElement.addEventListener("click", (event) => {
        const bookId = book.getId()
        onDelete(bookId, this.book_card_container)
    })


    this.authorElement.classList.add("book-author")
    this.dateElement.classList.add("book-date")

    this.book_card_container.appendChild(this.titleElement)
    this.book_card_container.appendChild(this.authorElement)
    this.book_card_container.appendChild(this.dateElement)
    this.book_card_container.appendChild(this.readElement)
    this.book_card_container.appendChild(this.deleteElement)



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
        book_qualities = book.getQualities()
        this
            .setTitle(book_qualities["name"])
            .setReadStatus(book_qualities["isRead"])
            .setAuthor(book_qualities["author"])
            .setDate(book_qualities["year"])
        return this.book_card_container;
    }
}

function displayBooks(last_only = true) {
    if (last_only) {
        book_arr = [];
        book_arr.push(library.getLastBook())
        console.log(`in last only:${book_arr.toString()}`);
    } else {

        book_arr = library.getBooks()

    }
    container = document.querySelector(".book_section")


    book_arr.forEach(book => {
        book_card = new BookCard(book, function (bookId, book_card_container) { //callback function, in order to not have dependency on library
            if (library.deleteBook(bookId)) {

                book_card_container.remove()
            } else {
            }
        }
        )

        container.prepend(book_card.render())//reverse order


    })
}

function onSubmit(event) {
    event.preventDefault();
    console.log("Sumbitted!");

    let field = document.querySelector("#book_dialog")
    let form = document.querySelector("form")
    let formData = new FormData(form)
    createNewBook(new BookQualities(formData.get("name"), formData.get("author"), formData.get("year")))
    console.log(library.getLastBook().toString());
    displayBooks()
}

form = document.querySelector("form")
form.addEventListener("submit", onSubmit)



displayBooks(last_only = false);
