
/* DOM MANIPULATIONS */
const bookContainer = document.querySelector('div.booksContainer')
const dialog        = document.getElementById("bookInfo");
const newBookBtn    = document.getElementById("newBook")
const updateButton  = document.getElementById("update");
const cancelButton  = document.getElementById("cancel");
const bookTitle     = document.getElementById("title");
const bookAuthor    = document.getElementById("author");
const bookPages     = document.getElementById("pages");
const bookRead      = document.getElementById("read");
/*Handling opening and closing of dialog box*/
newBookBtn.addEventListener("click", () => {
    dialog.show();
    cancelButton.addEventListener("click",()=>{
        dialog.close(); 
    })
}); //end 
//  creation of constructors and objects
function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read =read;
    this.info= function(){
        return `The   ${this.title} by ${this.author} ,${this.pages}pages,${this.read}`;
    }
}                                                           /*books*/
    const physics = new Book("pysic","rocky","464","read");
    const chemistry = new Book("cmstry","rocky","443","read");
    const ds = new Book("datastructrue","siva siva","8834","notRead");
    const maths = new Book("maths","rocky","348295","read");

const myLibrary =[];
function addBookToLibrary(...args) {
     args.forEach((book )=> myLibrary.push(book))
  }
let removeBtn;

function displayBooks() { 
    bookContainer.textContent='';/*free container*/
    myLibrary.forEach( (book)=> { 
        card = document.createElement('div');
        card.classList=("card");
        bookContainer.appendChild(card);
        card.textContent = book.info(); /*creating rmv btns*/ 
        removeBtn = document.createElement("button");
        removeBtn.setAttribute('type','button');
        removeBtn.setAttribute('data-book',`${book.title}`)
        removeBtn.textContent="remove";
        card.appendChild(removeBtn);/*crting read sts btns*/
        readStatusBtn = document.createElement("button");
        readStatusBtn.setAttribute('type','button');
        readStatusBtn.setAttribute('data-read',`${book.read}`);
        readStatusBtn.setAttribute('data-read-book',`${book.title}`);
        readStatusBtn.textContent=`${book.read}`;
        colorReadBtn(readStatusBtn);//clr it
        card.appendChild(readStatusBtn);
        
        console.log(readStatusBtn);
        console.log(book.read)
         })
    rmvbtns = document.querySelectorAll("[data-book]"); 
    readStatusButtons = document.querySelectorAll("button[data-read]");
    // changeReadStatus()
    addEvents.call(rmvbtns);//add event listenr for readstatusbtn too
 }
addBookToLibrary(maths,physics,chemistry,ds);
displayBooks(myLibrary);
//handling form input
updateButton.addEventListener('click',()=>{ 
    /*getting form inputs*/
     let bookReadStatus = bookRead.checked;
     bookReadStatus= bookReadStatus?"read":"notRead";
     let newObj = bookTitle;
   /*creating new books */
     newObj = new Book(`${bookTitle.value}`,`${bookAuthor.value}`,`${bookPages.value}`,`${bookReadStatus}`)
    addBookToLibrary(newObj);
    displayBooks();dialog.close();
    console.log(myLibrary,"inside updatbtn");
    
}) 

function addEvents(){ //fnc to add evnts for newly joined books too 
    this.forEach( (btn)=>{
        btn.addEventListener("click",()=> removeBook(btn))
    } )
    readStatusButtons.forEach((btn)=>{
        btn.addEventListener("click",()=> changeReadStatus(btn))
    })
}

function removeBook(delBook){
      myLibrary.forEach((book,index)=>{ 
            if (book.title === delBook.dataset.book){
             myLibrary.splice(index,1);
             displayBooks();
          }  }  )  
}
 

console.log(readStatusButtons);

function changeReadStatus(btn){
    myLibrary.forEach( (book)=>{
        if(btn.dataset.readBook === book.title){
           book.read =  book.read == "read"?"notRead":"read";
            displayBooks();
        }
         
    } )

}
function colorReadBtn(btn){
    if(btn.dataset.read === "read"){
        btn.classList.add("bookRead");
    }
    else if(btn.dataset.read === "notRead"){
        btn.classList.add("bookNotRead");
    }
}