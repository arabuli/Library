let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    if (read == true) {
      return `${title} by ${author}, ${pages}, read`
    } else {
      return `${title} by ${author}, ${pages}, not yet read`
    }
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}


addBookToLibrary("Hobbit", "Tolkien", 333, true);
addBookToLibrary("Wisgni", "Me", 123, false);

const bookForm = document.getElementById("add-book-form");
const addButton = document.getElementById("add-book-button");
addButton.addEventListener("click", function () {
  if (bookForm.style.display == "none") {
    bookForm.style.display = "block";
  } else {
    bookForm.style.display = "none";
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
    let book = document.createElement("div");
    book.textContent = myLibrary[i].info();
    book.classList.add("book");
    selectBookPlace.appendChild(book);
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";
    removeButton.classList.add("remove-button");
    book.appendChild(removeButton);
    removeButton.addEventListener("click", function() {
      myLibrary.splice(i, 1);
      displayBooks();
    });
  }
}

displayBooks();

