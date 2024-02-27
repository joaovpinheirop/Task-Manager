
// ==== List Tasks ====
let listTask = [];
let idTasks = 0;
const addtask = document.querySelector('.add_task');

// === Load Page === 
window.addEventListener('load', () => {
  // Percorrer todos os itens no localStorage

  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.key(i);
    listTask.push(JSON.parse(localStorage.getItem(item)))
  }
  idTasks = obterMaiorId(listTask) + 1;

  // Show in Screen
  showScreen();
})

// ==== Object Task ====
class Task {
  constructor(title, description, data, id, state) {
    this.title = title
    this.data = data
    this.description = description
    this.id = id
    this.state = state
  }
}

const obterMaiorId = (list) => {
  let maior = list[0].id;

  for (let i = 0; i < list.length; i++) {
    if (parseInt(list[i].id) >= maior) {
      maior = list[i].id
    }

  }

  return maior;
}

// ==== Create and Add new element ====
const Add = (title, description, data, id = idTasks++) => {
  // add object in list task
  const task = NewTask(title, description, data, id, "pendente")

  // Set LocalStorage
  localStorage.setItem(id, JSON.stringify(task));
  listTask.push(task)

  // Show in Screen
  showScreen();
}

//==== Modify Task ====
const Modify = (checkId, state) => {
  const id = listTask.findIndex(element => element.id == checkId);

  // Modify taks
  const modify = NewTask(listTask[id].title, listTask[id].description, listTask[id].data, parseInt(checkId), state);
  listTask[id] = modify;

  // Set LocalStorage modify
  localStorage.setItem(checkId, JSON.stringify(modify))
  showScreen();
}

// ==== Remove Task ====
const Remove = (list, id) => {
  // Filter 
  listTask = list.filter(element => element.id !== id);

  // Remover a Task do localStorage
  localStorage.removeItem(id);
}

// ==== Create New Objetct ====
const NewTask = (title, description, data, id, state) => {
  return new Task(title, description, data, id, state)
}

// ==== Ler lista ====
function showScreen() {
  let textPendente = ``;

  listTask.forEach((value) => {
    if (value.state == "pendente") {

      textPendente += ` <div class="itemTask">
      <div>
        <p class="title">${value.title}</p>
        <p>${value.data}</p>
        <span class="detail">${value.description}</span>
        <button class="clear" data-index="${value.id}">apagar</button>
      </div>

      <div class="ball">
        <input class="status" type="checkbox" id="${value.id}" >
        <label for="${value.id}"></label>
      </div>
  </div>`
    }
    if (value.state == "concluido") {
      textPendente += `
    <div class="itemTask">
      <div>
        <p class="title">${value.title}</p>
        <p>${value.data}</p>
        <span>${value.description}</span>
        <button class="clear" data-index="${value.id}">apagar</button>
      </div>

      <div class="ball">
        <input class="status" type="checkbox" id="${value.id}" checked>
        <label for="${value.id}"></label>
      </div>
  </div>`
    }
  });

  const pendenteList = document.getElementById("pendenteList")
  pendenteList.innerHTML = textPendente
  console.log(listTask)
  EventButtons();
}


// ==== EventsButtons ====
function EventButtons() {
  // Clear
  const btnClear = document.querySelectorAll('.clear');
  btnClear.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      const div = btn.closest(".itemTask");
      Remove(listTask, parseInt(index));
      if (div) {
        div.remove();
      }
    })
  })

  // Check Box
  const check = document.querySelectorAll(".status");
  check.forEach(chk => {
    chk.addEventListener('click', () => {
      const checkId = chk.getAttribute("id");
      chk.checked ? Modify(checkId, "concluido") : Modify(checkId, "pendente")
    })
  })
}

// === Button Add task===
const btnAdd = document.getElementById('add');
btnAdd.addEventListener('click', () => {


  // Get Values
  let title = document.getElementById('title').value
  let description = document.getElementById('description').value
  let date = document.getElementById('date').value.split('-')
  let dia = date[2];
  let mes = date[1];
  let ano = date[0];
  const dateFormat = `${dia}/${mes}/${ano}`

  // Verificar se todos os campos estão preenchidos
  if (title.trim() === '' || description.trim() === '' || date.length !== 3) {
    alert('Por favor, preencha todos os campos antes de adicionar...');
    return; // Impede que o código abaixo seja executado
  }
  Add(title, description, dateFormat);

  document.getElementById('title').value = "";
  document.getElementById('description').value = "";

  Visible(addtask)
})


// === Button creator new Task === 
const CreatorTask = document.getElementById('creator-task');
CreatorTask.addEventListener('click', () => {
  Visible(addtask)
})


function Visible(Button) {
  if (Button.classList.contains("visible")) {
    Button.classList.remove("visible")
  } else { Button.classList.add("visible") }
}