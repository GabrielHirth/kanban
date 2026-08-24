const tarefas = [];

const inputTarefa = document.getElementById("task-input");
const botaoAdicionar = document.getElementById("add-btn");
const listaTarefas = document.getElementById("task-list");
const mensagemVazia = document.getElementById("empty-message");

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (texto === "") {
    inputTarefa.focus();
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false,
  };

  tarefas.push(novaTarefa);

  inputTarefa.value = "";
  inputTarefa.focus();

  renderizarTarefas();
}

function alternarConclusao(id) {
  const tarefa = tarefas.find((t) => t.id === id);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    renderizarTarefas();
  }
}

function criarLinhaTarefa(tarefa) {
  const linha = document.createElement("tr");
  if (tarefa.concluida) {
    linha.classList.add("concluida");
  }

  const celulaTexto = document.createElement("td");
  celulaTexto.textContent = tarefa.texto;

  const celulaAcao = document.createElement("td");
  celulaAcao.classList.add("finished");
  const botaoConcluir = document.createElement("button");
  botaoConcluir.type = "button";
  botaoConcluir.className = "complete-btn";
  botaoConcluir.textContent = tarefa.concluida ? "🔄" : "✔️";
  botaoConcluir.setAttribute(
    "aria-label",
    tarefa.concluida ? "Marcar como não concluída" : "Marcar como concluída",
  );
  botaoConcluir.addEventListener("click", () => alternarConclusao(tarefa.id));

  celulaAcao.appendChild(botaoConcluir);

  linha.appendChild(celulaTexto);
  linha.appendChild(celulaAcao);

  return linha;
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    listaTarefas.appendChild(mensagemVazia);
    return;
  }

  tarefas.forEach((tarefa) => {
    listaTarefas.appendChild(criarLinhaTarefa(tarefa));
  });
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});

renderizarTarefas();