// 할 일 데이터를 저장하는 객체 배열
let todos = [];
let nextId = 1;

// 할 일 추가
function addTodo() {
  let input = document.getElementById("todoInput");
  let text = input.value.trim();

  if (text === "") {
    alert("할 일을 입력하세요.");
    return;
  }

  let todo = {
    id: nextId,
    text: text,
    completed: false
  };

  todos.push(todo);
  nextId++;

  input.value = "";
  renderTodos();
  input.focus();
}

// 객체 배열을 화면에 표시
function renderTodos() {
  let list = document.getElementById("todoList");
  list.innerHTML = "";

  let completedCount = 0;

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    let li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) {
      li.classList.add("completed");
      completedCount++;
    }

    let taskButton = document.createElement("button");
    taskButton.type = "button";
    taskButton.classList.add("todo-text");
    taskButton.setAttribute("aria-pressed", String(todo.completed));

    let status = document.createElement("span");
    status.classList.add("todo-status");
    status.setAttribute("aria-hidden", "true");

    let label = document.createElement("span");
    label.classList.add("todo-label");
    label.textContent = todo.text;

    taskButton.append(status, label);
    taskButton.onclick = function() {
      todo.completed = !todo.completed;
      renderTodos();
    };

    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "삭제";
    deleteButton.setAttribute("aria-label", todo.text + " 삭제");
    deleteButton.onclick = function() {
      todos.splice(i, 1);
      renderTodos();
    };

    li.append(taskButton, deleteButton);
    list.append(li);
  }

  document.getElementById("totalCount").textContent = todos.length;
  document.getElementById("doneCount").textContent = completedCount;
  document.getElementById("emptyState").style.display =
    todos.length === 0 ? "block" : "none";
}

renderTodos();
