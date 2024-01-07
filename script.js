/* DOM MANIPULATIONS */
const bookContainer = document.querySelector("div.booksContainer");
const dialog = document.getElementById("bookInfo");
const newBookBtn = document.getElementById("newBook");
const updateButton = document.getElementById("update");
const cancelButton = document.getElementById("cancel");

let Local_Storage_Book = "  @s$sdfk.ddffddfddcvd43farray";
// "form"
const bookTitle = document.getElementById("title");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");
const bookAuthor = document.getElementById("author");

function info() {
  return `The   ${this.title} by ${this.author} ,${this.pages}pages,${this.read}`;
}
class Book {
  static #myLibrary = JSON.parse(localStorage.getItem(Local_Storage_Book)) || [
    {
      author: "siva siva",
      id: Date.now().toString(),
      pages: "",
      read: "notRead",
      title: "",
      info:`A rocky ragul created library with local storage ✌️😎💕🔥💻⚡😁💪`,
    },
  ];

  static #card;
  static #readStatusBtn;
  static #readStatusButtons;
  static #rmvbtns;
  constructor(title, author, pages, read) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;this.prfop = 'tst';
    this.pages = pages;
    this.read = read; 
    this.info =   `The   ${this.title} by ${this.author} ,${this.pages}pages,${this.read}`
     
    
  }
  info() {
    return `The   ${this.title} by ${this.author} ,${this.pages}pages,${this.read}`;
  }
  static createReadStatusBtn(book) {
    Book.#readStatusBtn = document.createElement("button");
    Book.#readStatusBtn.setAttribute("type", "button");
    Book.#readStatusBtn.setAttribute("data-read", `${book.read}`);
    Book.#readStatusBtn.setAttribute("data-read-book", `${book.id}`);
    Book.#readStatusBtn.textContent = `${book.read}`;
    Book.colorReadBtn(Book.#readStatusBtn);
    Book.#card.appendChild(Book.#readStatusBtn);
  }

  static createRemoveBtn(book) {
    let removeBtn;
    removeBtn = document.createElement("button");
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute("data-book", `${book.title}`);
    removeBtn.setAttribute("data-id", `${book.id}`);
    removeBtn.textContent = "remove";
    Book.#card.appendChild(removeBtn);
  }

  static removeBook(delBook) {
    Book.#myLibrary.forEach((book, index) => { 
      if (book.id === delBook.dataset.id) {
        Book.#myLibrary.splice(index, 1);
        Book.displayBooks();
      }
    });
    Book.save();
  }

  static changeReadStatus(btn) {
    this.#myLibrary.forEach((book) => {
      if (btn.dataset.readBook === book.id) {
        book.read = book.read == "read" ? "notRead" : "read";
        Book.displayBooks();
      }
    });
  }

  static addEvents() {
    //fnc to add evnts for newly joined books too
    this.forEach((btn) => {
      btn.addEventListener("click", () => Book.removeBook(btn));
    });
    Book.#readStatusButtons.forEach((btn) => {
      btn.addEventListener("click", () => Book.changeReadStatus(btn));
    });

    /*Handling opening and closing of dialog box*/
    newBookBtn.addEventListener("click", () => {
      dialog.show(); 
      cancelButton.addEventListener("click", () => {
        dialog.close();
      });
    });
  }

  static colorReadBtn(btn) {
    if (btn.dataset.read === "read") {
      btn.classList.add("bookRead");
    } else if (btn.dataset.read === "notRead") {
      btn.classList.add("bookNotRead");
    }
  }

  static addBookToLibrary(...args) {
    args.forEach((book) => Book.#myLibrary.push(book)); 
    Book.displayBooks();
  }

  static displayBooks() { 
    bookContainer.textContent = ""; /*free container*/
    Book.#myLibrary.forEach((book) => {
      Book.#card = document.createElement("div");
      Book.#card.classList = "card";
      bookContainer.appendChild(Book.#card);
      Book.#card.textContent =book.info;
      Book.createRemoveBtn(book); /*creating rmv btns*/
      Book.createReadStatusBtn(book);
    });
    Book.#rmvbtns = document.querySelectorAll("[data-book]");
    Book.#readStatusButtons = document.querySelectorAll("button[data-read]");
    // changeReadStatus()
    Book.addEvents.call(Book.#rmvbtns); //add event listenr for readstatubtn too
  }

  static addDummyBook() {
    if (Book.#myLibrary.length) { 
      Book.addBookToLibrary();
    }
  }

  static save() {
    localStorage.setItem(Local_Storage_Book, JSON.stringify(Book.#myLibrary));
  }
}

//example books
const physics = new Book("pysic", "rocky", "464", "read");
// const chemistry = new Book("cmstry","rocky","443","read");
// const ds = new Book("datastructrue","siva siva","8834","notRead");
// const maths = new Book("maths","rocky","348295","read");

Book.displayBooks();

updateButton.addEventListener("click", function () {
  /*getting form inputs*/
  if(checkFormValidity()){
    let bookReadStatus = bookRead.checked;
  bookReadStatus = bookReadStatus ? "read" : "notRead";
  let newObj = bookTitle;

  /*creating new books */
  newObj = new Book(
    `${bookTitle.value}`,
    `${bookAuthor.value}`,
    `${bookPages.value}`,
    `${bookReadStatus}`,
  );
  Book.addBookToLibrary(newObj);
  Book.save();
  Book.displayBooks();
  dialog.close();
  }
  
});


/*form full stack js*/

// const bookTitle = document.getElementById("title");
// const bookPages = document.getElementById("pages");
// const bookRead = document.getElementById("read");
// const bookAuthor = document.getElementById("author");



function checkFormValidity(){
  console.log('dc')
   inputs = [bookAuthor,bookTitle,bookRead,bookPages]
   inputs.forEach( input => {
    if(input.value==''){
      if(input == bookTitle){
        input.setCustomValidity("Ponniyin Selvan..\nHarry Potter");
      }
      if(input == bookAuthor){ input.setCustomValidity("Example author name :J. K. Rowling,Kalki Krishnamurthy,")   }
      if(input == bookPages){ input.setCustomValidity("Greater than 25")}
      if(input == bookRead) { input.setCustomValidity("Check if u have read the book")}
      input.addEventListener( 'input',()=>input.setCustomValidity('') )
      return false
    }
    else    return true   
   })
   
}