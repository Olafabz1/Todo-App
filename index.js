//select elements
const theme = document.getElementById('theme')
const newInput = document.getElementById('additem') 
const list = document.querySelector('.content ul')
const items = document.querySelector('.items-left span')

items.innertext = document.querySelectorAll('.list-item input[type="checkbox"]').length

theme.addEventListener('click', () => {
  document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

// Add Todo item
document.querySelector('.new-item span').addEventListener('click', () => {
  if(newInput.value.length > 0) {
    newTodo(newInput.value);
    newInput.value = '';
  }
})


newInput.addEventListener('keypress', (event) => {
  if(event.charCode === 13 && newInput.value.length > 0) {
    newTodo(newInput.value);
    newInput.value = '';
  }
})

function newTodo (input) {
  const newList = document.createElement('li');
  newList.classList.add('flex-row');

  newList.innerHTML = `
  <label for="" class="list-item">
    <input type="checkbox" name="todoItem">
    <span class="checkmark"></span>
    <span class="text">${input}</span>
  </label>
  <span class="remove"></span>` ;

  if(document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
    newList.classList.add('hidden');
  }

  list.append(newList);
  updateItemsCount(1);
}

function updateItemsCount (no) {
  items.innerText = +items.innerText + no ; 
}

// remove todo
function deleteTodo (input) {
  input.remove();
  updateItemsCount(-1);
}

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    deleteTodo(event.target.parentElement);
  }
})

// clear completed items
 document.querySelector('.clear').addEventListener('click', () => {
  document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach (item => {
    removeTodoItem(item.closest('li'));   
  });
 })


// filter todo list items
 document.querySelectorAll('.filter input').forEach(radio => {
  radio.addEventListener('change', (e) => {
      filterTodoItems(e.target.id);
  });
});


function filterTodoItems(id) {
  const allItems = todoList.querySelectorAll('li');

  switch(id) {
      case 'all':
          allItems.forEach(item => {
              item.classList.remove('hidden');
          })
          break;
      case 'active':
          allItems.forEach(item => {
              item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
          })
          break;
      default: 
          allItems.forEach(item => {
              !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
          })
          break;
  }
}
