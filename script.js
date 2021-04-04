let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    if (read == true) {
      return `${title} ${author} ${pages} read`
    } else {
      return `${title} ${author} ${pages} notread`
    }
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}


addBookToLibrary("Hobbit", "Tolkien", 333, true);
addBookToLibrary("Wisgni", "Me", 123, false);
addBookToLibrary("Hobbit", "Tolkien", 333, true);
addBookToLibrary("Wisgni", "Me", 123, false);
addBookToLibrary("Hobbit", "Tolkien", 333, true);
addBookToLibrary("Wisgni", "Me", 123, false);
addBookToLibrary("Hobbit", "Tolkien", 333, true);
addBookToLibrary("Wisgni", "Me", 123, false);
addBookToLibrary("Hobbit", "Tolkien", 333, true);
addBookToLibrary("Wisgni", "Me", 123, false);

const bookForm = document.getElementById("add-book-form");
const addButton = document.getElementById("add-book-button");
addButton.addEventListener("click", function() {
  if(bookForm.style.display == "block") {
    bookForm.style.display = "none";
  } else {
    bookForm.style.display = "block";
  }
});

function getFormInfo() {
  title = bookForm[0].value;
  author = bookForm[1].value;
  pages = bookForm[2].value;
  if (document.getElementById("read").checked) {
    read = true;
  } else {
    read = false;
  }
  addBookToLibrary(title, author, pages, read);
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () {
  getFormInfo();
  bookForm.style.display = "none";
  displayBooks();
});

function displayBooks() {
  const selectBookPlace = document.getElementById("book-container");
  selectBookPlace.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let bookTitle = myLibrary[i].info().split(" ")[0];
    let bookAuthor = myLibrary[i].info().split(" ")[1];
    let bookPages = myLibrary[i].info().split(" ")[2];
    let bookStatus = myLibrary[i].info().split(" ")[3];
    let book = document.createElement("div");
    let title = document.createElement("p");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");
    title.textContent = `Title: ${bookTitle}`;
    author.textContent = `Author: ${bookAuthor}`;
    pages.textContent = `Pages: ${bookPages}`;
    read.textContent = `Status: ${bookStatus}`;
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.classList.add("book");
    selectBookPlace.appendChild(book);
    let removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("remove-button");
    book.appendChild(removeButton);
    removeButton.addEventListener("click", function() {
      myLibrary.splice(i, 1);
      displayBooks();
    });
  }
}

displayBooks();

