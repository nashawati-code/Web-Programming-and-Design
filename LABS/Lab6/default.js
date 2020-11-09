// ===================================================================== //
var itemCount = 0; //the number of items already inserted 
var stockItems = new Array(0); //2D array containing the inserted items 
var formExists = false;

var addFormBtn = document.getElementById("addFormBtn");
addFormBtn.onclick = createAddForm;
// ===================================================================== //
//when "Add Form" button is pressed, Item Code: <untypable input field> Item Name: <input field> Item Price: <input field> will show under Form
function createAddForm() {
    if(formExists) {
        console.log("Form Exists!");
        return;
    }
    var addItemDiv = document.getElementById("add_item"); //gets the div from the html file with id "add_item", all the "Add Form" content will go here
                                                          //the add_item div is located under Form, meaning all the "Add Form" content will be under Form
    var form = document.createElement("form"); //creates a <form> node
    form.id = "form" + itemCount; //whenever you submit a form, the Item Code will incrememnt by 1, 
                                  //the untypable input field of Item Code has the id "itemCount"

    //creates the disabled input field that has an itemCode that will be incremented when a new form is added--> <untypable input field>
    var inputCode = document.createElement("input"); //creates a <input> node
    inputCode.type = "text"; //sets the type of the input field to text, meaning we can now write
    inputCode.disabled = true; //we can't write anymore in the input field
    inputCode.name = "itemCode"; //this disabled text field will have the name "itemCode"
    inputCode.value = itemCount; //it has an unchangable value with name "itemCount", this valye gets incremented whenever a new form is added
    inputCode.id = "ItemCodeForm"; //set the id of this field to "ItemCodeForm"

    //creates the disabled input field --> <input field>
    var inputName = document.createElement("input"); //creates a <input> node
    inputName.type = "text"; //sets the type of the input field to text, meaning we can now write
    inputName.name = "itemName"; ////ths input text field will have the name "itemName"

    //creates the disabled input field --> <input field>
    var inputPrice = document.createElement("input"); //creates a <input> node
    inputPrice.type = "text"; //sets the type of the input field to text, meaning we can now write
    inputPrice.name = "itemPrice"; //this input text field will have the name "itemPrice"

    var submit = document.createElement("input"); //creates a <input> node
    submit.type = "submit"; //sets the type to submit, turning it into a button
    submit.value = "Submit";

    //when the submit butto is pressed, it wil send the data (value and price) to the addItem() function
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addItem(inputName.value, inputPrice.value); 
    }, true);

    //creates text nodes and appends each text node to its associated input field
    form.appendChild(document.createTextNode("Item Code: ")); //Item Code: <untypable input field>
    form.appendChild(inputCode);
    form.appendChild(document.createTextNode("Item Name: ")); //Item Name: <input field>
    form.appendChild(inputName);
    form.appendChild(document.createTextNode(" Item Price: ")); //Item Price: <input field> will show under Form
    form.appendChild(inputPrice);
    form.appendChild(submit);

    addItemDiv.appendChild(form); //appends all the above (all the forms) to the div of id "attenItemDiv"
                                  //Item Code: <untypable input field> Item Name: <input field> Item Price: <input field> will show under Form
    console.log("Form Created!");
    formExists = true;
}   
// ===================================================================== //
//when submit is pressed, the values name (from inputName) and price (from inputPrice)
function addItem(name, price) {
    stockItems.push(new Array(2)); //adds the new item inside stockItems
    stockItems[itemCount][0] = name; //the first element of the array is name
    stockItems[itemCount][1] = price; //the second element of the array is name
    console.log(stockItems[itemCount]); //Example: ["hello","100"]
    //increments the itemCount to allow to loop over mutliple added forms
    itemCount++;
    document.getElementById("ItemCodeForm").value = itemCount; //each form has an itemCode, this associates each 
    generateTable(); //this why each form data is added into a table
}
// ===================================================================== //
//when you press "Edit" it will place the array you choose to edit under Edit, it allows you to change the values
function createEditForm() {
    console.log("Edit is pressed!");

    //this.id refers to the object you want and you can directly access its id attribute with this.id
    var code = parseInt(this.id.replace("editBtn", ""));

    var editItemDiv = document.getElementById("edit_item"); //gets the div from the html file with id "edit_item", the row pressed will go here
                                                            //the edit_item div is located under Edit
    if(editItemDiv.hasChildNodes()) {
        editItemDiv.innerHTML = "";
    }

    var form = document.createElement("form"); //creates a <form> node
    form.id = "EditForm" +  code; //you can now "rewrite"/edit the input fields of the form

    //creates the disabled input field that has an itemCode that will be incremented when a new form is added--> <untypable input field>
    var inputCode = document.createElement("input"); //creates a <input> node
    inputCode.type = "text"; //sets the type of the input field to text, meaning we can now write
    inputCode.disabled = true; //we can't write anymore in the input field
    inputCode.name = "itemCode"; //this disabled text field will have the name "itemCode"
    inputCode.value = code; //another value will be assigned to it to differentiate this input field with the one in "Add Item"
    inputCode.id = "ItemCodeForm"; //set the id of this field to "ItemCodeForm"

    //creates the disabled input field --> <input field>
    var inputName = document.createElement("input"); //creates a <input> node
    inputName.type = "text"; //sets the type of the input field to text, meaning we can now write
    inputName.name = "itemName"; ////ths input text field will have the name "itemName"
    inputName.value = stockItems[code][0]; //to know that we're changing the first value of the array which is name

    //creates the disabled input field --> <input field>
    var inputPrice = document.createElement("input"); //creates a <input> node
    inputPrice.type = "text"; //sets the type of the input field to text, meaning we can now write
    inputPrice.name = "itemPrice"; //this input text field will have the name "itemPrice"
    inputPrice.value = stockItems[code][1]; //to know that we're changing the second value of the array which is price

    var submit = document.createElement("input"); //creates a <input> node
    submit.type = "submit"; //sets the type to submit, turning it into a button
    submit.value = "Submit";

    //when the submit butto is pressed, it wil send the editted data (value and price) to the ediItem() function
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        editItem(code, inputName.value, inputPrice.value, this);
    }, true);

    //creates text nodes and appends each text node to its associated input field
    form.appendChild(document.createTextNode("Item Code: ")); //Item Code: <untypable input field>
    form.appendChild(inputCode);
    form.appendChild(document.createTextNode("Item Name: ")); //Item Name: <input field>
    form.appendChild(inputName);
    form.appendChild(document.createTextNode(" Item Price: ")); //Item Price: <input field> will show under Form
    form.appendChild(inputPrice);
    form.appendChild(submit);

    editItemDiv.appendChild(form);
}
// ===================================================================== //
//when submit in the edit form is pressed, it will update the new inputs in the table
function editItem(code, name, price) {
    console.log("The table is now updated!");
    stockItems[code][0] = name; //the first element of the edited array is name
    stockItems[code][1] = price; //the second element of the edited array is price
    
    generateTable(); //so the table can change
    
    //after submitting the edit, everything under "Edit" will be removed, it will be blank
    var editItemDiv = document.getElementById("edit_item"); //gets the div from the html file with id "edit_item"
    editItemDiv.innerHTML = "";
} 
// ===================================================================== //
function deleteItem() {
    console.log("This has been deleted!");
    var i = parseInt(this.id.replace("btnDlt", ""));
    /*
    Deleting elements using JavaScript Array’s splice() method
    To delete elements in an array, you pass two arguments into the splice() method as follows: 
        Array.splice(position,num);
    The position specifies the position of the first item to delete and the num argument determines the number of elements to delete.
    The splice() method changes the original array and returns an array that contains the deleted elements.
    */
    stockItems.splice(i, 1);

    //if we have 3 rows [1,2,3] and delete row 2, row 3 will take the place of row 2 [1,2]
    itemCount--;
    document.getElementById("ItemCodeForm").value = itemCount;
    
    generateTable(); //so the table can change
    
    //if the edit form is open, then it will "delete" that too (it clears it)
    if(document.getElementById("EditForm" + i) != null) {
        var editItemDiv = document.getElementById("edit_item");
        editItemDiv.innerHTML = "";
    }
}
// ===================================================================== //
function generateTable() {
    var listItemDiv = document.getElementById("list_items"); //gets the div from the html file with id "edit_item"

    console.log("A table is created!");
    var table = document.createElement("table"); //creates <table> node
    table.style.width = '100%';

    //headers of the table
    var trh = document.createElement("tr");
    trh.appendChild(makeTH("Code"));
    trh.appendChild(makeTH("Name"));
    trh.appendChild(makeTH("Price"));
    trh.appendChild(makeTH("Edit"));
    trh.appendChild(makeTH("Delete"));

    table.appendChild(trh); //appends the header to the table

    for(var i = 0; i < itemCount; i++) {
        var tr = document.createElement("tr"); //creates a <tr> node
        
        //each row will have its associated name and price
        tr.appendChild(makeTD(document.createTextNode(i)));
        tr.appendChild(makeTD(document.createTextNode(stockItems[i][0]))); //adds the name in a cell
        console.log(stockItems[i][0]); //Example: hello
        tr.appendChild(makeTD(document.createTextNode(stockItems[i][1]))); //adds the price in a cell
        console.log(stockItems[i][1]); //Example: 100

        //add the edit button on the next available empty cell
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit"
        editBtn.onclick = createEditForm;
        editBtn.id = "editBtn" + i //so you can edit the associated row
        tr.appendChild(makeTD(editBtn));

        //add the delete button on the next available empty cell
        var btnDlt = document.createElement("button");
        btnDlt.innerHTML = "Delete"
        btnDlt.onclick = deleteItem;
        btnDlt.id = "btnDlt" + i //so you can delete the associated row
        tr.appendChild(makeTD(btnDlt));

        table.appendChild(tr);
    }
    
    if(listItemDiv.hasChildNodes()) {
        listItemDiv.innerHTML = "";
    }
    listItemDiv.appendChild(table);
}
// ===================================================================== //
//creates a table cell
function makeTD(data) {
    var td = document.createElement("td");
    td.appendChild(data);
    return td;
}
// ===================================================================== //
//creates a table header
function makeTH(data) {
    var td = document.createElement("th");
    td.appendChild(document.createTextNode(data));
    return td;
}
// ===================================================================== //