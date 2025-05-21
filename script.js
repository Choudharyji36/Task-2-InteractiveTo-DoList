let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  if (tasks.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'text-center text-muted my-3';
    emptyMsg.textContent = 'No tasks yet. Add one!';
    list.appendChild(emptyMsg);
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    if (task.completed) span.classList.add('completed');
    span.onclick = () => toggleComplete(index);

    const btnGroup = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-warning me-2 btn-custom';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger btn-custom';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    input.value = '';
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function clearAllTasks() {
  if (confirm('Delete all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

renderTasks();
