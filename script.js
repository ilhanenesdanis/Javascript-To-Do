//eleman ekleme işlemleri
//UI vars
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btn = document.querySelector("#btnDeleteAll");
const list = document.querySelector("#task-list");
let items;

//load items
loadlitems();
eventListeners();
function eventListeners() {
  //submit event
  form.addEventListener("submit", addnewıtem);

  //delete an item
  list.addEventListener("click", deleteItem);

  //delete all items
  btn.addEventListener("click", deleteAllItems);
}
function createıtem(text) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));
  //create a
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';
  //add a to li
  li.appendChild(a);
  //add li to ul
  list.appendChild(li);
}
// add new item
function addnewıtem(e) {
  if (input.value == "") {
    alert("add new item");
  }
  //create li
  createıtem(input.value);

  //save to LS
  setItemToLS(input.value);
  //clear input
  input.value = "";

  e.preventDefault();
}
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("silmek istedigine emin misin")) {
      e.target.parentElement.parentElement.remove();

      //delete item from
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

function deleteAllItems(e) {
  if (confirm("Silmek istedigine emin misin")) {
   while(list.firstChild){
     list.removeChild(list.firstChild);
   }
    localStorage.clear();
  }

  // list.innerHTML='';

  e.preventDefault();
}
function loadlitems() {
    items=getItemsFromLS();
  items.forEach(function (item) {
    createıtem(item);
  });
}
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }
    else{
      items=JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemToLS(text){
  items=getItemsFromLS();
  items.push(text);
  localStorage.setItem('items',JSON.stringify(items));
}
function deleteItemFromLS(text){
  items=getItemsFromLS();
  items.forEach(function(item,index){
    if(item===text){
      items.splice(index,1);
    }

  });
  localStorage.setItem('items',JSON.stringify(items));
}