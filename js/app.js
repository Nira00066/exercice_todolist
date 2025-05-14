// VARIABLES GLOBALES
let todos = [];
let currentFilter = "all";

// FORMULAIRE
let form = document.querySelector("form");
let inputData = document.querySelector('input[name="title"]');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let valeur = inputData.value;

  let tâche = {
    id: Date.now(),
    text: valeur,
    done: false,
  };

  todos.push(tâche);
  inputData.value = "";
  updateDisplay();
});

// AFFICHAGE DES TÂCHES
function updateDisplay() {
  let list = document.querySelector(".list-group");
  list.innerHTML = "";

  let filteredTodos = todos.filter((tâche) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "done") return tâche.done;
    if (currentFilter === "todos") return !tâche.done;
  });

  filteredTodos.forEach((tâche) => {
    let card = document.createElement("li");
    card.className =
      "todo list-group-item d-flex align-items-center justify-content-between";

    let formcheck = document.createElement("div");
    formcheck.className = "form-check";

    let check = document.createElement("input");
    check.type = "checkbox";
    check.id = `todo-${tâche.id}`;
    check.className = "form-check-input";
    check.checked = tâche.done;

    let label = document.createElement("label");
    label.textContent = tâche.text;
    label.className = "form-check-label ms-2";
    label.htmlFor = `todo-${tâche.id}`;

    if (tâche.done) {
      label.classList.add("text-decoration-line-through", "opacity-50");
    }

    // Quand on coche/décoche la case
    check.addEventListener("change", () => {
      tâche.done = check.checked;
      updateDisplay();
    });

    // Bouton de suppression
    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger btn-sm";
    btnDelete.setAttribute("aria-label", "Supprimer");

    let iconbtn = document.createElement("i");
    iconbtn.className = "bi-trash";

    btnDelete.appendChild(iconbtn);
    card.appendChild(btnDelete);

    btnDelete.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== tâche.id);
      updateDisplay();
    });

    formcheck.appendChild(label);
    formcheck.appendChild(check);
    card.appendChild(formcheck);
    list.appendChild(card);
  });
}
