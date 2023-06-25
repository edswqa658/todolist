// 할 일 데이터
let todos = [];

// 할 일 추가 함수
function addTodo() {
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const dueDate = document.getElementById('dueDateInput').value;
  const priority = document.getElementById('priorityInput').value;

  const todo = {
    title,
    description,
    dueDate,
    priority,
    completed: false
  };

  todos.push(todo);
  renderNewTodo(todo); // 새로 추가된 할 일 렌더링
  renderTodoList();
  resetForm();
}
// 새로 추가된 할 일 렌더링 함수
function renderNewTodo(todo) {
  const todoList = document.getElementById('todoList');

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" id="checkbox-${todos.length - 1}" onchange="toggleComplete(${todos.length - 1})">
    <span>${todo.title}</span>
    <span>${todo.description}</span>
    <span>${todo.dueDate}</span>
    <span class="priority ${todo.priority}">${todo.priority}</span>
    <span>
      <button onclick="editTodo(${todos.length - 1})">수정</button>
      <button onclick="deleteTodo(${todos.length - 1})">삭제</button>
    </span>
  `;

  todoList.appendChild(li);
}


// 할 일 목록 렌더링 함수
function renderTodoList() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  const sortOption = document.getElementById('sortOptions').value;

  let filteredTodos = todos;

  if (sortOption === 'dueDate') {
    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortOption === 'priority') {
    filteredTodos.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  } else if (sortOption === 'title') {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})" ${todo.completed ? 'checked' : ''}>
      <span>${todo.title}</span>
      <span>${todo.description}</span>
      <span>${todo.dueDate}</span>
      <span class="priority ${todo.priority}">${todo.priority}</span>
      <span>
        <button onclick="editTodo(${index})">수정</button>
        <button onclick="deleteTodo(${index})">삭제</button>
      </span>
    `;
    if (todo.completed) {
      li.classList.add('completed');
    }

    todoList.appendChild(li);
  });
}

// 할 일 완료 토글 함수
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodoList();
}

// 할 일 수정 함수
function editTodo(index) {
  const todo = todos[index];
  document.getElementById('titleInput').value = todo.title;
  document.getElementById('descriptionInput').value = todo.description;
  document.getElementById('dueDateInput').value = todo.dueDate;
  document.getElementById('priorityInput').value = todo.priority;

  todos.splice(index, 1);
  renderTodoList();
}


// 할 일 삭제 함수
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodoList();
}

// 검색 함수
function searchTodo() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();

  const filteredTodos = todos.filter(todo => {
    const lowerCaseTitle = todo.title.toLowerCase();
    const lowerCaseDescription = todo.description.toLowerCase();

    return (
      lowerCaseTitle.includes(keyword) || lowerCaseDescription.includes(keyword)
    );
  });

  renderFilteredTodoList(filteredTodos);
}

// 필터링된 할 일 목록 렌더링 함수
function renderFilteredTodoList(filteredTodos) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  const sortOption = document.getElementById('sortOptions').value;

  if (sortOption === 'dueDate') {
    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortOption === 'priority') {
    filteredTodos.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  } else if (sortOption === 'title') {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})">
      <span>${todo.title}</span>
      <span>${todo.description}</span>
      <span>${todo.dueDate}</span>
      <span class="priority ${todo.priority.toLowerCase()}">${todo.priority}</span>
      <span>
        <button onclick="editTodo(${index})">수정</button>
        <button onclick="deleteTodo(${index})">삭제</button>
      </span>
    `;
    if (todo.completed) {
      li.classList.add('completed');
    }

    todoList.appendChild(li);
  });
}

// 폼 초기화 함수
function resetForm() {
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('priorityInput').value = '';
}

// 할 일 검색 이벤트 처리
document.getElementById('searchInput').addEventListener('input', searchTodo);

// 할 일 추가 이벤트 처리
document.getElementById('todoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  addTodo();
});
document.getElementById('sortOptions').addEventListener('change', function() {
  const hideCompleted = document.getElementById('hideCompletedCheckbox').checked;
  const sortOption = this.value;

  let filteredTodos = todos;

  if (hideCompleted) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (sortOption === 'dueDate') {
    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortOption === 'priority') {
    filteredTodos.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  } else if (sortOption === 'title') {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderFilteredTodoList(filteredTodos);
});

// 할 일 목록 초기 렌더링
renderTodoList();