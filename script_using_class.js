// --- 1. THE BOOK CLASS ---
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

// --- 2. THE LIBRARY MANAGER CLASS ---
class Library {
    constructor() {
        this.books = [];
        this.container = document.querySelector('#library-container');
    }

    addBook(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.books.push(newBook);
        this.render();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.render();
    }

    toggleStatus(index) {
        this.books[index].toggleRead();
        this.render();
    }

    render() {
        this.container.innerHTML = ''; 
        this.books.forEach((book, index) => {
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
            this.container.appendChild(card);
        });
    }
}

// --- 3. INITIALIZATION & UI LOGIC ---

// Create the library instance
const myLibrary = new Library();

// Select DOM Elements
const dialog = document.querySelector("#book-dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = document.querySelector("#close-dialog");
const bookForm = document.querySelector("#book-form");
const container = document.querySelector('#library-container');

// Open/Close Dialog logic
showButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());

// Form Submission Logic
bookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page from refreshing

    // Get values from the form
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    // Use our Class method!
    myLibrary.addBook(title, author, pages, read);

    // Reset and close
    bookForm.reset();
    dialog.close();
});

// Card Click Logic (Event Delegation)
container.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;

    if (e.target.classList.contains('remove-btn')) {
        myLibrary.removeBook(index);
    } else if (e.target.classList.contains('status-btn')) {
        myLibrary.toggleStatus(index);
    }
});