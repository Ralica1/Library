// create the Book constructor function
function Book(author, title, numPages, readStatus) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.readStatus = readStatus;
}

// add a prototype method to the Book constructor function to toggle the read status
Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
};

// create the myLibrary array to store the book objects
let myLibrary = [];

// function to add a new book to the library
function addBookToLibrary() {
  // get the values from the form inputs
  let author = document.getElementById("author-input").value;
  let title = document.getElementById("title-input").value;
  let numPages = document.getElementById("num-pages-input").value;
  let readStatus = document.getElementById("read-status-input").checked;

  // check if any of the form input values are empty
  if (!author || !title || !numPages) {
    // if any of them are empty, return from the function
    return;
  }

  // create a new book object and add it to the library array
  let newBook = new Book(author, title, numPages, readStatus);
  myLibrary.push(newBook);

  // clear the form inputs
  document.getElementById("author-input").value = "";
  document.getElementById("title-input").value = "";
  document.getElementById("num-pages-input").value = "";
  document.getElementById("read-status-input").checked = false;

  // update the display
  displayLibrary();

}

// function to display the library on the page
function displayLibrary() {
  // clear the current display
  document.getElementById("library").innerHTML = "";

  // loop through the library array and create a new element for each book
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];

    // create the book element and set its data-index attribute to the current index
    let bookEl = document.createElement("div");
    bookEl.setAttribute("data-index", i);
    bookEl.classList.add("book");

    // create the remove button and set its click event listener
    let removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Remove";
    removeBtn.addEventListener("click", function () {
      // get the index of the book to remove from the data-index attribute of the parent element
      let index = this.parentElement.getAttribute("data-index");
      // remove the book from the array
      myLibrary.splice(index, 1);
      // update the display
      displayLibrary();
    });
    function validateForm(event) {
      // get the value of the num-pages-input element
      let numPages = document.getElementById("num-pages-input").value;
    
      // check if the value is less than 1
      if (numPages < 1) {
        // display an error message
        alert("Number of pages must be a positive number!");
        // prevent the form from being submitted
        event.preventDefault();
        return false;
      }
      // if the value is valid, allow the form to be submitted
      return true;
    }
    document
      .getElementById("new-book-form")
      .addEventListener("submit", validateForm);

    // create the read status toggle button and set its click event listener
    let toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = book.readStatus ? "Mark as Unread" : "Mark as Read";
    toggleBtn.addEventListener("click", function () {
      // get the index of the book to toggle from the data-index attribute of the parent element
      let index = this.parentElement.getAttribute("data-index");
      // toggle the read status of the book
      myLibrary[index].toggleReadStatus();
      // update the button text
      this.innerHTML = myLibrary[index].readStatus
        ? "Mark as Unread"
        : "Mark as Read";
    });

    // create the book info element and add it to the book element
    let infoEl = document.createElement("p");
    infoEl.innerHTML = `${book.title} by ${book.author}, ${
      book.numPages
    } pages, ${book.readStatus ? "read" : "not read"}`;
    bookEl.appendChild(infoEl);

    // add the buttons to the book element
    bookEl.appendChild(removeBtn);
    bookEl.appendChild(toggleBtn);

    // add the book element to the library element
    document.getElementById("library").appendChild(bookEl);
  }
}

// function to handle the form submission and prevent the default action (sending the form data to a server)
function handleFormSubmit(event) {
  event.preventDefault();
  addBookToLibrary();
}

// add an event listener to the form to handle the submission
document
  .getElementById("new-book-form")
  .addEventListener("submit", handleFormSubmit);

// get a reference to the "New Book" button
const addBookButton = document.querySelector(".addBookToLibraryBtn");

// add an event listener to the button to listen for clicks
addBookButton.addEventListener("click", function () {
  // get a reference to the form element
  const newBookForm = document.querySelector("#new-book-form");

  // check if the form is valid
  if (newBookForm.checkValidity()) {
    // if the form is valid, create a new book object and add it to the library
    addBookToLibrary();
  } else {
    // if the form is not valid, show an alert to the user
    alert(
      "Please complete all fields in the form before adding a book to the library."
    );
  }
});
