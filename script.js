

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
    this.getTitle = function () {
        return this.bookQualities.name
    }
    this.getAuthor = function () {
        return this.bookQualities.author
    }

    this.getDate = function () {
        return this.bookQualities.year
    }

    this.getReadStatus = function () {
        return this.bookQualities.isRead
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
        const removeIdx = this.getBookIndex(bookId)
        if (removeIdx !== -1) {

            this.books.splice(removeIdx, 1)
            console.log("Done delete")
            this.printLibrary();
            return true

        }
        else {
            console.log("NON trovato")
            return SyntaxError("bookId is not valid")
        }
    }
    this.changeReadStatus = function (bookId) {
        const changeIdx = this.getBookIndex(bookId)
        if (changeIdx !== -1) {
            console.log(`Da:${this.books[changeIdx].getQualities().isRead}`)
            this.books[changeIdx].getQualities().isRead = !this.books[changeIdx].getQualities().isRead
            console.log(`A:${this.books[changeIdx].getQualities().isRead}`)
            console.log("cambiato read status")
            return true


        } else {
            console.log("Non trovato")
            return SyntaxError("bookId is not valid")
        }
    }




    this.getBookIndex = function (bookId) {
        return this.books.findIndex(book => {

            return book.getId() === bookId;
        });
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






function BookCard(book) {
    if (!new.target) {
        throw new TypeError("Calling BookCard without new is not permitted")
    }
    this.book = book
    this.book_card_container = document.createElement("div")
    this.book_card_container.classList.add("card")


    this.book_card_container.innerHTML = `
     <h3 class="book-title">${book.getTitle()}</h3>
        <p class="book-author">${book.getAuthor()}</p>
        <p class="book-date">${book.getDate()}</p>
        <div class="card-actions">
            <label for="read_status">Letto?</label>
            <input id="read_status" name="read_status" type="checkbox" class="book-read" ${book.getReadStatus() ? 'checked' : ''}>
                
            <button class="book-delete">Cancella</button>
        </div> 
    `

    this.deleteElement = this.book_card_container.querySelector(".book-delete")
    this.readElement = this.book_card_container.querySelector(".book-read")


    this.deleteElement.addEventListener("click", (event) => this.onDelete())
    this.readElement.addEventListener("change", (event) => this.onRead())




    // this.setTitle = function (title) {
    //     this.titleElement.textContent = title
    //     return this
    // }
    // this.setReadStatus = function (readStatus) {
    //     this.readElement.checked = readStatus
    //     return this
    // }
    // this.setAuthor = function (author) {
    //     this.authorElement.textContent = author
    //     return this
    // }
    // this.setDate = function (date) {
    //     this.dateElement.textContent = date
    //     return this
    // }

    this.onRead = function () {
        const bookId = this.book.getId()
        if (library.changeReadStatus(bookId)) {
            console.log("Cambiando anche read of UI")

        } else {
            console.error("cannot change read status")
            this.setReadStatus(!this.readElement.checked)
        }
    }
    this.onDelete = function () {
        const bookId = this.book.getId()
        if (library.deleteBook(bookId)) {
            this.book_card_container.remove()
        } else {
            console.error("cannot remove book")
        }
    }
    this.render = function () {
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
    let container = document.querySelector(".book_section")


    book_arr.forEach(book => {
        displayBook(container, book);//reverse order


    })
}

function displayBook(container, book) {
    let book_card = new BookCard(book);

    container.prepend(book_card.render());
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
