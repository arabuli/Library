let myLibrary = [];

var firebaseConfig = {
  apiKey: "AIzaSyAzL-LJB8ifDZzO_7u3eUleFp4A4EeMzU8",
  authDomain: "library-ea17e.firebaseapp.com",
  databaseURL: "https://library-ea17e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-ea17e",
  storageBucket: "library-ea17e.appspot.com",
  messagingSenderId: "184578746713",
  appId: "1:184578746713:web:47e01d3d1a2b4a625cc448"
};

firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore();
const docRef = firestore.collection('books');


function Book(title, author, pages, status) {
  this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
  this.info = function () {
    if (status == true) {
      return `${title} ${author} ${pages} ${status}`
    } else {
      return `${title} ${author} ${pages} ${status}`
    }
  }
}

function addBookToLibrary(title, author, pages, status) {
  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

const bookForm = document.getElementById("add-book-form");
const addButton = document.getElementById("add-book-button");
addButton.addEventListener("click", function () {
  if(bookForm.style.visibility == "visible") {
    bookForm.style.visibility = "hidden";
  } else {
    bookForm.style.visibility = "visible";
  }
});

let closeButton = document.createElement("button");
closeButton.textContent="x";
bookForm.appendChild(closeButton);
closeButton.classList.add("remove-button");
closeButton.setAttribute("type", "button");
bookForm.addEventListener("click", function() {
  bookForm.style.visibility = "hidden";
});

function getFormInfo() {
  title = bookForm[0].value;
  author = bookForm[1].value;
  pages = bookForm[2].value;
  console.log(pages);
  let getStatus = document.getElementById("status");
  if (getStatus.checked) {
    status = true;
  } else {
    status = false;
  }
  addBookToLibrary(title, author, pages, status);
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () {
  getFormInfo();
  bookForm.style.visibility = "hidden";
  populateStorage();
  displayBooks();
});

function displayBooks() {
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement("div");
    let removeButton = document.createElement("button");
    let bookTitle = myLibrary[i].title;
    let bookAuthor = myLibrary[i].author;
    let bookPages = myLibrary[i].pages;
    let bookStatus = myLibrary[i].status;
    let title = document.createElement("p");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let status = document.createElement("p");
    let labelElement = document.createElement("LABEL");
    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("id", "read-checkbox");
    let span = document.createElement("SPAN");
    title.textContent = `Title: ${bookTitle}`;
    author.textContent = `Author: ${bookAuthor}`;
    pages.textContent = `Pages: ${bookPages}`;
    status.textContent = `Read?: `;
    labelElement.classList.add("switch");
    span.classList.add("slider", "round");
    book.classList.add("book");
    status.style.display = "inline-block";
    removeButton.classList.add("remove-button");
    checkbox.setAttribute("type", "checkbox");
    if (myLibrary[i].status == true) {
      checkbox.setAttribute("checked", true);
    }


    docRef.doc(`${bookTitle}`).set({
        title: bookTitle,
        author: bookAuthor,
        pages: bookPages,
        status: bookStatus,
      }).then(function (docRef) {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });




    labelElement.appendChild(checkbox);
    labelElement.appendChild(span);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(labelElement);
    bookContainer.appendChild(book);
    checkbox.addEventListener("click", function () {
      if (checkbox.checked) {
        myLibrary[i].status = true;
        docRef.doc(`${bookTitle}`).update({
          status: myLibrary[i].status
        });
        displayBooks();
        populateStorage();
      } else {
        myLibrary[i].status = false;
        displayBooks();
        populateStorage();
      }
    })
    removeButton.textContent = "x";
    book.appendChild(removeButton);
    removeButton.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      displayBooks();
      populateStorage();
      docRef.doc(`${bookTitle}`).delete();
    });
  }
}

function populateStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


function getStorage() {
  if (!localStorage.myLibrary) {
    displayBooks();
  } else {
    let objects = localStorage.getItem("myLibrary");
    objects = JSON.parse(objects);
    myLibrary = objects;
    displayBooks();
  }
}


getStorage();