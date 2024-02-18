// ==== Fragment  ====


// ==== List Tasks ====
let listTask = []; // list task
let idTasks = 0; // id task

const btnAdd = document.getElementById('add');
btnAdd.addEventListener('click', () => {

  let title = document.getElementById('title').value
  let description = document.getElementById('description').value
  let date = document.getElementById('date').value.split('-')
  let dia = date[2];
  let mes = date[1];
  let ano = date[0];

  // Verificar se todos os campos estão preenchidos
  if (title.trim() === '' || description.trim() === '' || date.length !== 3) {
    alert('Por favor, preencha todos os campos antes de adicionar.');
    return; // Impede que o código abaixo seja executado
  }
  const dateFormat = `${dia}/${mes}/${ano}`

  Add(title, description, dateFormat, idTasks);

  document.getElementById('title').value = "";
  document.getElementById('description').value = "";
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

// ==== Create and Add new element in list Task ====
const Add = (title, description, data) => {

  // add object in list task
  const task = NewTask(title, description, data, idTasks++, "pendente")
  listTask.push(task)

  // Show in Screen
  showScreen();
}

//==== Modify Task ====
const Modify = (newTitle, newDescription, newData, local, state) => {

  // Modify taks
  const modify = NewTask(newTitle, newDescription, newData, local, state);
  listTask[local] = modify;
}

// ==== Remove Task ====
const Remove = (list, id) => {
  listTask = list.filter(element => element.id !== id);
}

// ==== Create New Objetct ====
const NewTask = (title, description, data, id, state) => {
  return new Task(title, description, data, id, state)
}

// ==== Ler lista ====
const showScreen = () => {
  let textPendente = ``;
  let textConcluido = ``;
  listTask.forEach((value, i, refList) => {
    if (value.state == "pendente") {
      textPendente += `<div class="itemTask">
    <div><input class="status" type="checkbox" id="${value.id}">
    <p>${value.title}</p>
    <p>${value.data}</p>
    <button class="clear" data-index="${value.id}">apagar</button></div>
    <div> <span>${value.description}</span></div>
  </div>`
    }
    if (value.state == "concluido") {
      textConcluido += `<div class="itemTask">
    <div><input class="status" type="checkbox" id="${value.id}" checked>
    <p>${value.title}</p>
    <p>${value.data}</p>
    <button class="clear" data-index="${value.id}">apagar</button></div>
    <div> <span>${value.description}</span></div>
  </div>`
    }
  });

  const pendenteList = document.getElementById("pendenteList")
  const concluidaList = document.getElementById("concluidaList")
  pendenteList.innerHTML = textPendente
  concluidaList.innerHTML = textConcluido
  console.log(listTask)
  EventButtons();
}

// ==== EventsButtons ====
const EventButtons = () => {
  const btnClear = document.querySelectorAll('.clear');
  btnClear.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      const div = btn.closest(".itemTask");
      Remove(listTask, parseInt(index));
      if (div) {
        div.remove();
      }
    });
  });

  const check = document.querySelectorAll(".status");
  check.forEach(chk => {
    chk.addEventListener('click', () => {
      const id = chk.getAttribute("id");
      if (chk.checked) {
        const div = chk.closest(".itemTask");
        div.style.backgroundColor = "red";
        div.remove();
        Modify(listTask[id].title, listTask[id].description, listTask[id].data, parseInt(id), "concluido")
        showScreen();
      }
      else {
        Modify(listTask[id].title, listTask[id].description, listTask[id].data, parseInts(id), "pendente")
        showScreen();
      }
    })
  })
}

