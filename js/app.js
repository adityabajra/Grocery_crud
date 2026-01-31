//var items = groceryItems;
var editId = null;
var items = getLocalStorage();

function render() {
  var $app = $("#app");
  $app.empty();

  var itemToEdit = editId
    ? $.grep(items, function (item) {
        return item.id === editId;
      })[0]
    : null;
  var $formElement = createForm(editId, itemToEdit);

  var $itemsElement = createItems(items);
  $app.append($formElement);
  $app.append($itemsElement);
}

$(document).ready(function () {
  render();
});
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function addItem(itemName) {
  var newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  items.push(newItem);
  setLocalStorage(items);
  render();
}
function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  setLocalStorage(items);

  render();
}
function removeItem(itemId) {
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });
  setLocalStorage(items);
  render();
}
function updateItemName(newName) {
  items = $.map(items, function (item) {
    if (item.id === editId) {
      return $.extend({}, item, { name: newName });
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);

  render();
}
function getLocalStorage() {
  var list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}
function setEditId(itemId) {
  editId = itemId;
  render();
  setTimeout(function () {
    $(".form-input").focus();
  }, 0);
}
function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}
