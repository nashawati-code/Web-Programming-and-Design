// =================================================================================== //
var orderCount = 0;
// when the page loads, it will load the buttons
window.onload = () => {
    var text = document.getElementById("cart");
    text.value = "";
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    btnAddItem = document.getElementById("btnAddItem"); //gets the id of the "Add Item" button from the html file
    btnAddItem.onclick = addItem; //when the button is clicked it will call the addItem() function
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    btnFeedMe = document.getElementById("btnFeedMe"); //gets the id of the "Feed Me" button from the html file
    btnFeedMe.onclick = feedMe; //when the button is clicked it will call the feedMe() function
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    send = document.getElementById("send"); //gets the id of the "Send Order" button from the html file
    send.onclick = sendOrder; //when the button is clicked it will call the sendOrder() function
}
// =================================================================================== //
//when "Add Item" is pressed, a new row containing Burger: <dropdown list> Quality: <input field> Delete Button will show
function addItem() {
    /*
    The appendChild() method appends a node as the last child of a node --> use when we want to add items
    If you want to create a new paragraph with text:
        - First create the text as a Text node.
        - You will then append to the paragraph.
        - Finally, you'll append the paragraph to the document.
    */
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    var div = document.createElement("div"); //creates a <div> node
    div.id = "orderRow" + orderCount;  //each created row will have its associated orderCount to keep track of the quantity of ordered Burgers
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    div.appendChild(document.createTextNode("Burger: ")); //creates a text node and appends the text to <div>, now we have Burger:
    div.appendChild(makeSelection(orderCount)); //calls the function makeSelection() function which has the dropdown 
                                                //appends the dropdown to <div>, now we have Burger: <dropdown list>
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    //the input field will have a unique number of orders, hence orderCount
    div.appendChild(document.createTextNode(" Quantity: ")); //creates a text node and appends the text to <div>, now we have Burger: <dropdown list> Quality:
    var quantity = document.createElement("INPUT"); //creates an <input> node called "quantity"
    quantity.setAttribute("type", "text"); //sets the type of the input node "quantity" to text --> it's now an input field
    quantity.id = "quantity" + orderCount; //each input field will have its associated orderCount
    div.appendChild(quantity); //appends the input field to <div>, we now have Burger: <dropdown list> Quality: <input field>
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    var button = document.createElement("button"); //creates a <button> node
    button.setAttribute("type", "button"); //set the type of the button node "button" to button
    button.innerHTML = "x"; //the button will show "x"
    button.onclick = removeRow; //calls the function removeRow() that deletes a row
    div.append(button); //appends the button to <div>, we now have Burger: <dropdown list> Quality: <input field> Delete Button
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    var input = document.getElementById("dynamicInput"); //gets the id "dynamicInput" from the html file
    input.appendChild(div); //appends all the above (since we appended everything to the <div>) into a bigger <div> with id "dynamicInput"
    // ----------------------------------------------------------------------------------------------------------------------------------------- //
    orderCount++; //the orderCount will be incremeneted each time a new row is created (and when the user inputs "quantity")
};
// =================================================================================== //
//this function creates a dropdown list, a dropdown needs a <select> node and an <option> node, each option in the list has its own name and value
function makeSelection(idCount) { //the idCount basically says "I'm the chosen burger item"
    var select = document.createElement("select"); //creates a <select> node
    select.id = "select" + idCount; //each dropdown will have one chosen burger item
    // ---------------------------------------------------//
    //all of these create an <option> node, and assign to it a value (price) and an innerHTML (name)
    var op1 = document.createElement("option");
    op1.value = 18250
    op1.innerHTML = "Cheese-At-Heart"
    var op2 = document.createElement("option");
    op2.value = 13750
    op2.innerHTML = "Diner-Mite"
    var op3 = document.createElement("option");
    op3.value = 12750
    op3.innerHTML = "Swiss Mushroom"
    var op4 = document.createElement("option");
    op4.value = 13500
    op4.innerHTML = "Mighty Chicken"
    var op5 = document.createElement("option");
    op5.value = 13750
    op5.innerHTML = "B. B. B."
    // ---------------------------------------------------//
    //each option will get appended to the <select>
    select.appendChild(op1);
    select.appendChild(op2);
    select.appendChild(op3);
    select.appendChild(op4);
    select.appendChild(op5);
    // ---------------------------------------------------//
    return select;
}
// =================================================================================== //
//when "x" is pressed, the row its on (its parentNode) will be deleted
function removeRow() {
    /*
    In JavaScript, an element can only be deleted from its parent. 
    To delete an element you have to:
        - Get the element.
        - Find its parent.
        - Delete it using the removeChild method.
    parseInt() function parses a string and returns an integer
    removeChild() method removes a specified child node of the specified element.
    */
    var div = this.parentNode; //as seen in addItem(), the row is contained in a <div> called div, its the parentNode 
    
    //will go from element to element, removing it as it goes
    //it will "start" at an element in "orderRow" and will replace it with an empty string 
    var start = parseInt(div.id.replace("orderRow", "")); //div.id.replace("orderRow", "") --> replace the row with an empty space

    //deletes the row using removeChild, as long as it still has children it will keep deleting
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }           
    div.outerHTML = "";

    orderCount--; //decrement the orderCount since we're no longer going to use it since we're removing the row

    //allows you to keep calculating the data of the existing rows, we can have two rows and calculate it, but then delete row 2
    //this for loop will allow us to recalculate the data but now without the row we removed
    for(var i = start; i < orderCount; i++) {
        var div = document.getElementById("orderRow" + (i + 1));
        div.id = "orderRow" + i;
        var select = document.getElementById("select" + (i + 1));
        select.id = "select" + i;
        var quantity = document.getElementById("quantity" + (i + 1));
        quantity.id = "quantity" + i;
    }
}
// =================================================================================== //
function feedMe() {
    var text = document.getElementById("cart"); //gets the id of the textarea from the html file
    text.value = ""; //the text value will be initially set blank

    var sum = 0;
    for(var i = 0; i < orderCount; i++) {
        var select = document.getElementById("select" + i);

        // The selectedIndex property sets or returns the index of the selected option in a drop-down list. The index starts at 0.
        var burger = select.options[select.selectedIndex]; //selects a burger from the dropdown list

        //outputs the quantity, + i is used to count the quantity (if its more than 1)
        var quantity = document.getElementById("quantity" + i).value;

        // condition ? exprIfTrue : exprIfFalse
        quantity = (quantity == "") ? 0 : parseInt(quantity); 

        //to get the price, it finds the assigned value of the chosen burger and multiplies it by the quantity
        var price =  parseInt(burger.value) * quantity;

        text.value += burger.text //outputs the chosen burger on the textarea
        text.value += " x " + quantity + " = " + price + " L.L.\n"; //Example: Diner-Mite x 2 = 27500 L.L.

        sum += price; //adds up all the prices
    }
    text.value += "\nTotal: " + sum + " L.L."; //Example: Total: 41250 L.L.
}
// =================================================================================== //
//when "Send Order" is pressed, the textarea "cart" will be cleared and all the rows from "Add Item" will be removed
function sendOrder() {
    //clear the textarea with id "cart"
    var text = document.getElementById("cart");
    text.value = "";
    
    ///deletes everything in the div with id "dynamicInput" using removeChild, removes everything that shows up when you press "Add Item"
    var input = document.getElementById("dynamicInput");
    while (input.hasChildNodes()) { //as long as it still has children it will keep deleting
        input.removeChild(input.lastChild);
    }           
    orderCount = 0; //orderCount will be reset to 0, since we're starting everything over again
}
// =================================================================================== //