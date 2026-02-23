// --- 1. The Book Class ---
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // This replaces Book.prototype.toggleRead
    toggleRead() {
        this.read = !this.read;
    }
}

// --- 2. The Library Manager (Module/Class) ---
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

    // This is the "displayBooks" function moved inside the class
    render() {
        this.container.innerHTML = ''; 
        this.books.forEach((book, index) => {
            const card = document.createElement('div');
            card.classList.add('book-card');
            card.innerHTML = `
                <h3>${book.title}</h3>
                <p>By: ${book.author}</p>
                <button class="status-btn" data-index="${index}">${book.read ? 'Read' : 'Not Read'}</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            this.container.appendChild(card);
        });
    }
}

// Initialize the library
const myLibrary = new Library();

container.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return; // Ignore clicks that aren't on buttons

    if (e.target.classList.contains('remove-btn')) {
        myLibrary.splice(index, 1);
    } else if (e.target.classList.contains('status-btn')) {
        myLibrary[index].toggleRead();
    }
    displayBooks(); // One call at the end handles both cases
});