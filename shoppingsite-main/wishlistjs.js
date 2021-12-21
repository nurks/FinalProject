// Book Class: Represents a Book
// document.querySelector('#isbn').value = Math.floor(Math.random() * 1000 + 100);
var selectedRow = null;
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
//   static displayBooks() {
//     const books = Store.getBooks();

//     books.forEach((book) => UI.addBookToList(book));
//   }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-success btn-sm edit">Edit</a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
  static editBookToList(book) {
    selectedRow.children[0].textContent = book.title;
    selectedRow.children[1].textContent = book.author;
    selectedRow.children[2].textContent = book.isbn;
  }
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      UI.showAlert('Employee Deleted', 'danger');
    } else null
    //   if(el.classList.contains('edit')) {
    //   document.querySelector('#title').value = el.parentElement.parentElement.children[0].textContent;
    //   document.querySelector('#author').value = el.parentElement.parentElement.children[1].textContent;
    //   document.querySelector('#isbn').value = el.parentElement.parentElement.children[2].textContent;
    // }
  }
  static editBook(el) {
    
    if(el.classList.contains('edit')) {
      selectedRow = el.parentElement.parentElement;
      document.querySelector('#title').value = selectedRow.children[0].textContent;
      document.querySelector('#author').value = selectedRow.children[1].textContent;
      document.querySelector('#isbn').value = selectedRow.children[2].textContent;
      // document.querySelector('.edit-btn').disabled = false;
      // document.querySelector('.add-btn').disabled = true;
    } else null
    
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);
    // div.style.position = "absolute";
    // div.style.top = "30px";
    // div.style.left = "90%";
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage
// class Store {
//   static getBooks() {
//     let books;
//     if(localStorage.getItem('books') === null) {
//       books = [];
//     } else {
//       books = JSON.parse(localStorage.getItem('books'));
//     }

//     return books;
//   }

//   static addBook(book) {
//     const books = Store.getBooks();
//     books.push(book);
//     localStorage.setItem('books', JSON.stringify(books));
//   }

//   static removeBook(isbn) {
//     const books = Store.getBooks();

//     books.forEach((book, index) => {
//       if(book.isbn === isbn) {
//         books.splice(index, 1);
//       }
//     });

//     localStorage.setItem('books', JSON.stringify(books));
//   }
// }

// Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);
  if (selectedRow == null) {
    // Add Book to UI
    UI.addBookToList(book);
    selectedRow = null;
    UI.showAlert('Employee Added', 'success');
  } else {
    UI.editBookToList(book);
    selectedRow = null;
    UI.showAlert('Employee Info Edited', 'info');
  }
    // Add book to store
    // Store.addBook(book);
    // Show success message
    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);
  UI.editBook(e.target);
  // Remove book from store
  // Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show success message
  // UI.showAlert('Book Removed', 'success');
});