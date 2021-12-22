
var selectedRow = null;
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI {

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
   
  }
  static editBook(el) {
    
    if(el.classList.contains('edit')) {
      selectedRow = el.parentElement.parentElement;
      document.querySelector('#title').value = selectedRow.children[0].textContent;
      document.querySelector('#author').value = selectedRow.children[1].textContent;
      document.querySelector('#isbn').value = selectedRow.children[2].textContent;
  
    } else null
    
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);
   
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}


document.addEventListener('DOMContentLoaded',UI.displayBooks);


document.querySelector('#book-form').addEventListener('submit', (e) => {

  e.preventDefault();

 
  
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

 
  
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
   
    const book = new Book(title, author, isbn);
  if (selectedRow == null) {
   
    UI.addBookToList(book);
    selectedRow = null;
    UI.showAlert('Employee Added', 'success');
  } else {
    UI.editBookToList(book);
    selectedRow = null;
    UI.showAlert('Employee Info Edited', 'info');
  }
 
    UI.clearFields();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
 
  UI.deleteBook(e.target);
  UI.editBook(e.target);
 
});
