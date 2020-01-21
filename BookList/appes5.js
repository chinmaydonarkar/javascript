// Book Constructor

function Book (title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI cONSTRUCTOR
function UI(){} 

// add book to list
UI.prototype.addBookToList = function(book){
   
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href= "#" class= "delete"> X </a> </td>
    `;
    list.appendChild(row);
}


// show alert
 UI.prototype.showAlert = function(message,className){

    //create div
    const div = document.createElement('div');

    //add classes
    div.className = `alert ${className}`;


    //add text
    div.appendChild(document.createTextNode(message));

    //get parent    
    const container = document.querySelector('.container');

    // get form
    const form = document.querySelector('#book-form');

    //insert alert
    container.insertBefore(div,form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

 }

 
 // delete book
 UI.prototype.deleteBook = function(target){
     if(target.className ==='delete'){
         target.parentElement.parentElement.remove();
     }
 }
 

 // Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit',
function(e){
     title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    //instantiate book
   const book = new Book(title, author, isbn)
   
   //instatiate Ui
    const ui  = new UI();

    //validate
    if(title ==='' || author ==='' || isbn ===''){
        
        //error alert
        ui.showAlert('please fill in all fields','error');
    }
    else{

         //adding book to list
         ui.addBookToList(book);

         //show success
         ui.showAlert('Book Added!','success');

         //clear fields
         ui.clearFields();

        }


    e.preventDefault();

});

//Event Listener for delete book
document.getElementById('book-list').addEventListener
('click',function(e){
    
    // instatiate ui
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

   //show message
   ui.showAlert('Book Remeoved!','success'); 
    e.preventDefault();
});

 