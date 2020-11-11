/*
//This allows us to go into the element with the id #book-list, access the second child of the li with class name. 
const wmf = document.querySelector("#book-list li:nth-child(2) .name"); //grabs "Wise Mans Fear"
//console.log(wmf); //write this if you want to log into console

//To grab one element.
var books = document.querySelector("#book-list li .name");

//To grab more than one element.
books = document.querySelector("#book-list li .name");
console.log(books);

//To add books into an array.
Array.from(books).forEach(function(book){
    console.log(book);
});

//how to retrieve text content
Array.from(books).forEach(function(book){
    console.log(book.textContent);
});

//how to overwrite text content
Array.from(books).forEach(function(book){
    book.textContent ="test";
}); 

//Appending new HTML elements. To replace the original HTML, use '=' instead of '+='
bookList.innerHTML = '<h2>Books and more books...</h2>';
*/

document.addEventListener('DOMContentLoaded', function(){

    const books = document.querySelectorAll('#book-list li .name');
    
    //how to append text content
    Array.from(books).forEach(function(book){
        book.textContent += ' (book title)';
    });

    const bookList = document.querySelector('#book-list');
    bookList.innerHTML += '<p>This is how you add HTML content</p>';

    console.log('#book-list next sibling:', bookList.nextSibling);
    console.log('#book-list next element sibling:', bookList.nextElementSibling);
    console.log('#book-list previous sibling:', bookList.previousSibling);

    //To find previous element sibling:
    console.log('#book-list previous element sibling:', bookList.previousElementSibling);
    //You can chain the properties and methods together:
    bookList.previousElementSibling.querySelector('p').innerHTML += '<br/>Too cool for everyone else!';
    
    const listItems = document.querySelectorAll('#book-list ul li');

    Array.from(listItems).forEach(function(item){
        item.addEventListener('click', (e) => {
            //Example use case: Deleting a list object using the removeChild() method
            const li = e.target.parentElement;
            console.log('child element to remove:', li);
            console.log('parent element to remove child from:', li.parentElement);
            li.parentNode.removeChild(li);
    });
    });

    /* WITHOUT USING ARRAYS
        const h2 = document.querySelector('#book-list h2');
        h2.addEventListener('click', function(e){
            console.log(e.target);
            console.log(e);
        });
        //Example use case: Deleting a list object using the removeChild() method
        const btns = document.querySelectorAll('#book-list .delete');
        btns.forEach(function(btn){
            btn.addEventListener('click', function(e){
                const li = e.target.parentElement;
                li.parentNode.removeChild(li);
            })
        })
    */

    //Attaching event listeners to the ul instead of each li for efficiency
    //Adding an event listener to each li is "expensive" and inefficient
    const list = document.querySelector('#book-list ul');
    //the follows code delete books when you press only the delete button
    // delete books
    list.addEventListener('click', (e) => {
        if(e.target.className == 'delete'){
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
        }
    });

    // add books
    const forms = document.forms;
    console.log(forms);// Returns a HTML collection
    console.log(forms[0]); // Accesses the first form element 

    Array.from(forms).forEach(function(form){
        console.log(form);
    });

    // Add book list
    const addForm = forms['add-book']; //Access the form with id #add-book
    // Forms have a 'submit' event that we can listen for. They also refresh the page by default.
    // That explains e.preventDefault() below
    addForm.addEventListener('submit', function(e){
        e.preventDefault();

        // create elements
        const value = addForm.querySelector('input[type="text"]').value;
        const li = document.createElement('li');
        const bookName = document.createElement('span');
        const deleteBtn = document.createElement('span');

        // add text content
        bookName.textContent = value; //for the add button
        deleteBtn.textContent = 'delete'; //for the delete button

        // add classes, because we didn't have the delete button next to the newly added book
        bookName.classList.add('name');
        deleteBtn.classList.add('delete');

        // append to DOM
        li.appendChild(bookName);
        li.appendChild(deleteBtn);
        list.appendChild(li);
        //list.insertBefore(li, list.querySelector('li:first-child'));
        // console.log(value); //shows the value in the console
    });

    // hide books
    const hideBox = document.querySelector('#hide');
    hideBox.addEventListener('change', function(e){
    if(hideBox.checked){
        list.style.display = "none"; //when we check this it will hide the ul
    } else {
        list.style.display = "initial"; //when we don't check it everything will show normally
    }
    });

    // filter books
    const searchBar = forms['search-books'].querySelector('input'); //we pass the id search-books
    searchBar.addEventListener('keyup', (e) => {
        //gets the search term and turns the whole string to lowercase, because we're comparing two lowercase strings
        const term = e.target.value.toLowerCase();
        const books = list.getElementsByTagName('li'); //performs a search in the li tag
        //cycle through the li tags and sees if the search time is in the books
        //we turn it into an array
        Array.from(books).forEach((book) => {
            //each iteration checks if the title of the book is equal to what we searched for in the field
            const title = book.firstElementChild.textContent; //now we have the title of the book
            //gets the index of the term within the string, if its not equal to -1 then its in the string
            if(title.toLowerCase().indexOf(e.target.value) != -1){
                book.style.display = 'block';
            } else {
                book.style.display = 'none'; //hide the book
            }
        });
    });

    // tabbed content
    const tabs = document.querySelector('.tabs'); //this is the ul
    const panels = document.querySelectorAll('.panel');
    tabs.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.tagName == 'LI'){
            const targetPanel = document.querySelector(e.target.dataset.target); //dataset looks for data attributes
            Array.from(panels).forEach((panel) => {
                if(panel == targetPanel){ //shows active
                    panel.classList.add('active');
                }else{ //doesn't show active
                    panel.classList.remove('active');
                }
            });
        }
    });
})