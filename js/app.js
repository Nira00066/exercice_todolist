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

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      //recupere le filtre
      currentFilter = btn.dataset.filter;

      // retirer "active de tout les btn"
      document
        .querySelectorAll("[data-filter]")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      updateDisplay();
    });
  });
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

    btnDelete.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== tâche.id);
      updateDisplay();
    });

// Note a moi même faire attention a l'orde de donnée a qui car sinon pas dans le bonne sens 



    formcheck.appendChild(label);
    formcheck.appendChild(check);
    card.appendChild(formcheck);
    card.appendChild(btnDelete);
    list.appendChild(card);
  });
}
//   faire le datafilter
// et le fetch
