"use strict"

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
const docRef = firestore.collection('books')

firestore.collection("books").get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    myLibrary.push(doc.data());
    displayBooks();
  })
})




// Class Constructor to create new books and return their infos
class Book {
  constructor(title, author, pages, status) {
    this.title = title,
      this.author = author,
      this.pages = pages,
      this.status = status;
  }
};

let myLibrary = [];

function addBookToLibrary(title, author, pages, status) {
  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

// Create form to add new Books and get info from them.
const newBookButton = document.getElementById("add-book-button");
const newBookForm = document.getElementById("add-book-form");
const formCloseButton = document.createElement("button");

newBookForm.appendChild(formCloseButton);
formCloseButton.textContent = "x";
formCloseButton.classList.add("remove-button");
formCloseButton.setAttribute("type", "button");
formCloseButton.addEventListener("click", function () {
  newBookForm.style.visibility = "hidden";
});

newBookButton.addEventListener("click", function () {
  if (newBookForm.style.visibility == "visible") {
    newBookForm.style.visibility = "hidden";
  } else {
    newBookForm.style.visibility = "visible";
  }
});

function getFormInfo() {
  let title = newBookForm[0].value;
  let author = newBookForm[1].value;
  let pages = newBookForm[2].value;
  if (document.getElementById("status").checked) {
    status = true;
  } else {
    status = false;
  }
  addBookToLibrary(title, author, pages, status);
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () {
  getFormInfo();
  newBookForm.style.visibility = "hidden";
  // populateStorage();
  displayBooks();
});






function displayBooks(title, author, pages, status) {
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    // Create necessery html elements to display single Book;
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
    let labelElement = document.createElement("label");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("id", "read-checkbox");
    let span = document.createElement("span");

    title.textContent = `Title: ${bookTitle}`;
    author.textContent = `Author: ${bookAuthor}`;
    pages.textContent = `Pages: ${bookPages}`;
    status.textContent = `Read?: `;

    // Add customization to html elements
    labelElement.classList.add("switch");
    span.classList.add("slider", "round");
    book.classList.add("book");
    status.style.display = "inline-block";
    removeButton.classList.add("remove-button");
    checkbox.setAttribute("type", "checkbox");
    if (bookStatus == "true") {
      checkbox.setAttribute("checked", "true");
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
    removeButton.textContent = "x";
    book.appendChild(removeButton);

    checkbox.addEventListener("click", function () {
      if (checkbox.checked) {
        myLibrary[i].status = "true";
        docRef.doc(`${bookTitle}`).update({
          status: myLibrary[i].status
        });
        displayBooks();
        // populateStorage();
      } else {
        myLibrary[i].status = "false";
        displayBooks();
        // populateStorage();
        console.log(myLibrary);
      }
    })

    removeButton.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      displayBooks();
      // populateStorage();
      docRef.doc(`${bookTitle}`).delete();
    });
  }
}

// function populateStorage() {
//   localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
// }


// function getStorage() {
//   if (!localStorage.myLibrary) {
//     displayBooks();
//   } else {
//     let objects = localStorage.getItem("myLibrary");
//     objects = JSON.parse(objects);
//     console.log
//     myLibrary = objects;
//     console.log(myLibrary);
//     displayBooks();
//   }
// }

displayBooks();





// getStorage();