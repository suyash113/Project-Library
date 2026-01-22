const dialog = document.querySelector("#book-dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = document.querySelector("#close-dialog");
const bookForm = document.querySelector("#book-form");
const container = document.querySelector('#library-container');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    container.innerHTML = ''; 

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">By: ${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            <div class="card-buttons">
                <button class="status-btn ${book.read ? 'read-true' : 'read-false'}" data-index="${index}">
                    ${book.read ? 'Read' : 'Not Read'}
                </button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

container.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains('remove-btn')) {
        myLibrary.splice(index, 1);
        displayBooks();
    } else if (e.target.classList.contains('status-btn')) {
        myLibrary[index].toggleRead();
        displayBooks();
    }
});

showButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    dialog.close();
});