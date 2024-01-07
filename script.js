
/* DOM MANIPULATIONS */
const bookContainer = document.querySelector('div.booksContainer')
const dialog        = document.getElementById("bookInfo");
const newBookBtn    = document.getElementById("newBook")
const updateButton  = document.getElementById("update");
const cancelButton  = document.getElementById("cancel");
 
class Book{
    
    static #myLibrary =[];
    static #card;static #readStatusBtn;
    static #readStatusButtons;static #rmvbtns;
    constructor(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read =read;
    this.info= function(){
        return `The   ${this.title} by ${this.author} ,${this.pages}pages,${this.read}`;
       }
   
   }

   static createReadStatusBtn(book){
    Book.#readStatusBtn = document.createElement("button");
        Book.#readStatusBtn.setAttribute('type','button');
        Book.#readStatusBtn.setAttribute('data-read',`${book.read}`);
        Book.#readStatusBtn.setAttribute('data-read-book',`${book.title}`);
        Book.#readStatusBtn.textContent=`${book.read}`;
        Book.colorReadBtn(Book.#readStatusBtn); 
        Book.#card.appendChild(Book.#readStatusBtn);
   }

   static createRemoveBtn(book){
        let removeBtn;
        removeBtn = document.createElement("button");
        removeBtn.setAttribute('type','button');
        removeBtn.setAttribute('data-book',`${book.title}`)
        removeBtn.textContent="remove";
        Book.#card.appendChild(removeBtn);
    }

    static removeBook(delBook){
        Book.#myLibrary.forEach((book,index)=>{ 
              if (book.title === delBook.dataset.book){
               Book.#myLibrary.splice(index,1);
               Book.displayBooks();
            }  }  )  
  }

  static changeReadStatus(btn){
   this.#myLibrary.forEach( (book)=>{
        if(btn.dataset.readBook === book.title){
           book.read =  book.read == "read"?"notRead":"read";
           Book.displayBooks();
        }
         
    } )

  }

  static addEvents(){ //fnc to add evnts for newly joined books too 
    this.forEach( (btn)=>{
        btn.addEventListener("click",()=> Book.removeBook(btn))
    } )
    Book.#readStatusButtons.forEach((btn)=>{
        btn.addEventListener("click",()=> Book.changeReadStatus(btn))
    })

    /*Handling opening and closing of dialog box*/
    newBookBtn.addEventListener("click", () => {
    dialog.show();
    cancelButton.addEventListener("click",()=>{
    dialog.close(); 
        })
        });
    }

    
static colorReadBtn(btn){
    if(btn.dataset.read === "read"){
        btn.classList.add("bookRead");
    }
    else if(btn.dataset.read === "notRead"){
        btn.classList.add("bookNotRead");
    }
}


static addBookToLibrary(...args) {
    args.forEach((book )=> Book.#myLibrary.push(book));
    console.log(Book.#myLibrary);
    Book.displayBooks();
 }  

   static displayBooks() { 
    //console.log(Book.#myLibrary)
    bookContainer.textContent='';/*free container*/
    Book.#myLibrary.forEach( (book)=> { 
        
        Book.#card = document.createElement('div');
        Book.#card.classList=("card");
        bookContainer.appendChild(Book.#card);
        Book.#card.textContent = book.info(); 
        Book.createRemoveBtn(book);/*creating rmv btns*/ 
        Book.createReadStatusBtn(book);
        
        console.log(Book.#readStatusBtn,'dfd');
        console.log(book.read)
         })
    Book.#rmvbtns = document.querySelectorAll("[data-book]"); 
    Book.#readStatusButtons = document.querySelectorAll("button[data-read]");
    // changeReadStatus()
    Book.addEvents.call(Book.#rmvbtns);//add event listenr for readstatubtn too
 }

}     

    //example books
    const physics = new Book("pysic","rocky","464","read");
    const chemistry = new Book("cmstry","rocky","443","read");
    const ds = new Book("datastructrue","siva siva","8834","notRead");
    const maths = new Book("maths","rocky","348295","read");
    Book.addBookToLibrary(maths,physics,chemistry,ds);

    


updateButton.addEventListener('click',function() { 
    /*getting form inputs*/
    const bookTitle     = document.getElementById("title");
    const bookPages     = document.getElementById("pages");
    const bookRead      = document.getElementById("read");
    const bookAuthor    = document.getElementById("author");
    let bookReadStatus = bookRead.checked;
    bookReadStatus= bookReadStatus?"read":"notRead";
    let newObj = bookTitle;
     
    /*creating new books */
    newObj = new Book(`${bookTitle.value}`,`${bookAuthor.value}`,`${bookPages.value}`,`${bookReadStatus}`)
    Book.addBookToLibrary(newObj);
    Book.displayBooks();dialog.close();
    
}) 


 
