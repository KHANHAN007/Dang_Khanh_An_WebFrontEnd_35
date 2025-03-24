document.addEventListener("DOMContentLoaded", loadTodos);
function addTodo() {
    let input = document.getElementById("todoInput");
    let todoText = input.value.trim();
    if (todoText === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    renderTodos();
}
function renderTodos() {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${todo}</span>
            <div>
                <button class="edit-btn" onclick="editTodo(${index})">Sửa</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">Xóa</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
function deleteTodo(index) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}
function editTodo(index) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let newText = prompt("Chỉnh sửa công việc:", todos[index]);
    if (newText !== null && newText.trim() !== "") {
        todos[index] = newText.trim();
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    }
}
function loadTodos() {
    renderTodos();
}