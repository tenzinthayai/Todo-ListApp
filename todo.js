// variables

const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

// Event listeners
submit.addEventListener('click', addItem);
document.addEventListener('DOMContentLoaded', displayStorage);
clear.addEventListener('click', removeItems);
list.addEventListener('click', removeSingleItem);

// Functions

function addItem(event) {
    event.preventDefault();
    let value = input.value;
    if (value === '') {
        showAction(addItemsAction, 'Please add new item', false); //function to run
    } else {
        showAction(addItemsAction, `${value} added to the list`, true);
        createItem(value);
        updateStorage(value);
    }
}

//showAction() function
function showAction(element, text, value) {
    if(value === true) {
        element.classList.add('success'); //add success class
        element.innerText = text;
        input.value = '';
        setTimeout(function() {
            element.classList.remove('success'); 
        }, 3000);
    } else {
        element.classList.add('alert'); //add alert class
        element.innerText = text;
        input.value = '';
        setTimeout(function() {
            element.classList.remove('alert'); 
        }, 3000);
    }
}

//createItem() function
function createItem(value) {
    let parent = document.createElement('div');
    parent.classList.add('grocery-item');

    parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
    <span class="grocery-item__link"><i class="far fa-trash-alt"></i></span>`

    list.appendChild(parent);
}

//updateStorage() function
function updateStorage(value) {
    let groceryList;
    let exists = localStorage.getItem('groceryList');

    groceryList = localStorage.getItem('groceryList') ? JSON.parse
    (localStorage.getItem('groceryList')) : [];

    // if(exists) {
    //     groceryList = JSON.parse(localStorage.getItem('groceryList'));    
    // } else {
    //     groceryList = [];
    // }
    groceryList.push(value);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}

// localStorage.clear();

//display local storage

function displayStorage() {
    let exists = localStorage.getItem('groceryList');

    if(exists) {
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));

        storageItems.forEach(function(element) {
            createItem(element);
        });
    }
}

//remove all items
function removeItems() {
    //delete from local storage
    localStorage.removeItem('groceryList');
    let items = document.querySelectorAll('.grocery-item');
    if(items.length > 0) {
        showAction(displayItemsAction, 'All items deleted', false);
        items.forEach(function(element) {
            list.removeChild(element);
        });
    } else {
        showAction(displayItemsAction, 'No more items to delete', true);
    }
}

//remove single item
function removeSingleItem(event) {
    event.preventDefault();

let link = event.target.parentElement;
 if(link.classList.contains('grocery-item__link')) {
     let text = link.previousElementSibling.innerHTML;
     let groceryItem = event.target.parentElement.parentElement;
 
     list.removeChild(groceryItem);
     showAction(displayItemsAction, `${text} removed from the list`, true);
     //remove from the local storage
     editStorage(text);
    }
}

//edit storage
function editStorage(item) {
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));

    let index = groceryItems.indexOf(item);

    groceryItems.splice(index, 1);
    localStorage.removeItem('groceryList');
    //set the new local items
    localStorage.setItem('groceryList', JSON.stringify(groceryItems));

}