/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");
const addButton = document.querySelector("#diary-add");
const diaryView = document.querySelector("#diary-view");
const intoEdit = document.querySelector("#into-edit");
const editor = document.querySelector("#diary-edit");
const filterRec = document.querySelector("#filter");
const filterButton = document.querySelector("#filter-button");

let date_string = document.querySelector("#diary-date");
const topicInput = document.getElementById('diary-topic');
const emojiInput = document.getElementById('diary-emoji');
const saveButton = document.querySelector("#diary-save");
const todoDescriptionInput = document.querySelector("#diary-content");
const cancelButton = document.querySelector("#diary-cancel");
const dateButton = document.querySelector("#select-date");
const desigDate = document.querySelector("#designated-date");
const closeButton = document.querySelector("#close-view");
const filterTopic = document.querySelector("#filter-topic");
const filterEmoji = document.querySelector("#filter-emoji");
const topics = ["" , "學業" , "人際" , "社團"];
const emojis = ["" , "快樂" , "生氣" , "難過"];
const day_list = [" (日)"," (一)"," (二)"," (三)"," (四)"," (五)"," (六)"];
var editState = 0;

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    const todos = await getTodos();
    todos.forEach((todo) => renderTodo(todo));
  } catch (error) {
    alert("Failed to load todos!");
  }
}

function setupEventListeners() {
  date_string.innerText = getSystemDate();

  saveButton.addEventListener("click", async () => {
    if(editState!==0)
      await deleteTodoElement(String(editState));
    const topic = parseInt(topicInput.value);
    const emoji = parseInt(emojiInput.value);
    const description = todoDescriptionInput.value;
    if (!topic) {
      alert("請選擇標籤");
      return;
    }
    if (!emoji) {
      alert("請選擇心情");
      return;
    }
    if (!description) {
      alert("請輸入日記內文");
      return;
    }
    if(desigDate.style.display === "initial"){
      if(!desigDate.value){
        alert("請選擇日期");
        return;
      }
      const tmp = new Date(desigDate.value);
      const day = tmp.getDay();
      date_string.innerText = desigDate.value.replace(/-/g , ".") + day_list[day];
    }
    const date = date_string.innerText;
    try {
      const todo = await createTodo({ date , topic, emoji, description });
      renderTodo(todo);
    } catch (error) {
      alert("Failed to create todo!");
      return;
    } finally{
      date_string.innerText = getSystemDate();
      topicInput.selectedIndex=0;
      emojiInput.selectedIndex=0;
      todoDescriptionInput.value = "";
      editor.style.display = "none";
      addButton.style.display = "initial";
      filterRec.style.display = "flex";
      date_string.style.display = "initial";
      desigDate.style.display = "none";
      editState = 0;
      filterTodo();
    }
  });

  cancelButton.addEventListener("click", () =>{ 
    date_string.innerText = getSystemDate();
    topicInput.selectedIndex=0;
    emojiInput.selectedIndex=0;
    todoDescriptionInput.value = "";
    editor.style.display = "none";
    addButton.style.display = "initial";
    filterRec.style.display = "flex";
    date_string.style.display = "initial";
    desigDate.style.display = "none";
    editState = 0;
  });

  addButton.addEventListener("click", () => {
    editor.style.display = "block";
    addButton.style.display = "none";
    filterRec.style.display = "none";
  });

  dateButton.addEventListener("click", () => {
    date_string.style.display = "none";
    desigDate.style.display = "initial";
  });

  closeButton.addEventListener("click", () => {
    diaryView.style.display = "none";
    addButton.style.display = "initial";
    filterRec.style.display = "flex";
  });

  filterButton.addEventListener("click", () => {
    filterTodo();
  });
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  todoList.appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  const date = item.querySelector("p.todo-date");
  const topic = item.querySelector("p.todo-topic");
  const emoji = item.querySelector("p.todo-emoji");
  date.innerText = todo.date;
  topic.innerText = topics[todo.topic];
  emoji.innerText = emojis[todo.emoji];
  const description = item.querySelector("p.todo-description");
  description.innerText = todo.description;
  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });
  const viewButton = item.querySelector("button.view-todo");
  viewButton.addEventListener("click", () => {
    viewTodoElement(todo);
  });
  return item;
}

async function deleteTodoElement(id) {
  try {
    await deleteTodoById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

async function getTodos() {
  const response = await instance.get("/todos");
  return response.data;
}

async function createTodo(todo) {
  const response = await instance.post("/todos", todo);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

async function deleteTodoById(id) {
  const response = await instance.delete(`/todos/${id}`);
  return response.data;
}

function viewTodoElement(todo){
  const viewDate = document.querySelector("#view-date");
  viewDate.innerText = todo.date;
  const viewTopic = document.querySelector("#view-topic");
  viewTopic.innerText = topics[todo.topic];
  const viewEmoji = document.querySelector("#view-emoji");
  viewEmoji.innerText = emojis[todo.emoji];
  const viewContent = document.querySelector("#view-content");
  viewContent.innerText = todo.description;
  intoEdit.addEventListener("click", () => {
    editElement(todo);
  });
  diaryView.style.display = "initial";
  addButton.style.display = "none";
  filterRec.style.display = "none";
}

function editElement(todo){
  editor.style.display = "block";
  addButton.style.display = "none";
  filterRec.style.display = "none";
  diaryView.style.display = "none";

  date_string.innerText = todo.date;
  topicInput.selectedIndex = todo.topic;
  emojiInput.selectedIndex = todo.emoji;
  todoDescriptionInput.value = todo.description;
  editState = todo.id;
}

function getSystemDate(){
  let time = new Date();
  let month = time.getMonth();
  let date = time.getDate();
  let day = time.getDay();
  if (month<10) month = "0" + (month+1); else month = month+1;
  if (date<10) date = "0" + date;
  const tmp = time.getFullYear() + "." + month + "." + date + day_list[day];
  return tmp;
}

function filterTodo(){
  const fTopic = parseInt(filterTopic.value);
  const fEmoji = parseInt(filterEmoji.value);
  if( fTopic===0 && fEmoji===0 )
    for(let a=0 ; a<todoList.children.length ; a++)
      todoList.children[a].style.display="flex";
  else if( fTopic!==0 && fEmoji===0 )
    for(let a=0 ; a<todoList.children.length ; a++){
      if( (todoList.children[a]).querySelector(".todo-topic").innerText === topics[fTopic] )
        todoList.children[a].style.display="flex";
      else
        todoList.children[a].style.display="none";
    }
  else if( fTopic===0 && fEmoji!==0 )
    for(let a=0 ; a<todoList.children.length ; a++){
      if( (todoList.children[a]).querySelector(".todo-emoji").innerText === emojis[fEmoji] )
        todoList.children[a].style.display="flex";
      else
        todoList.children[a].style.display="none";
    }
  else
    for(let a=0 ; a<todoList.children.length ; a++){
      if( (todoList.children[a]).querySelector(".todo-topic").innerText === topics[fTopic] && (todoList.children[a]).querySelector(".todo-emoji").innerText === emojis[fEmoji])
        todoList.children[a].style.display="flex";
      else
        todoList.children[a].style.display="none";
    }
}

main();
