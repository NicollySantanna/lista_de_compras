const btnAdicionar = document.querySelector(".btnAdicionar")
const inputTask = document.querySelector(".inputText")
const listaCompleta = document.querySelector(".listaItens")


let minhaListadeItens = []

function adicionarNovaTarefa() {

    if(!inputTask.value){
        inputTask.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    } else {

        minhaListadeItens.push({
            item: inputTask.value,
            concluida: false,
        })
        
        inputTask.style.border = ''
    }

    inputTask.value = ''; //para limpar
    inputTask.focus()

    mostrarTarefas()
}

function mostrarTarefas(){

    let novaLi = ''

    minhaListadeItens.forEach(( tarefa, posicao ) => {
        novaLi = novaLi + `
        <li class="task ${tarefa.concluida && "done"}" >
            <i class="  fas fa-check" onclick="concluirTarefa(${posicao})"></i>
            <p>${tarefa.item}</p>
        <i class="fas fa-trash" onclick = "deletarItem(${posicao})"></i>
    </li>
        `
    })

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(minhaListadeItens))

}

mostrarTarefas()

function concluirTarefa(posicao){

minhaListadeItens[posicao].concluida =  !minhaListadeItens[posicao].concluida //Para inverter o valor

mostrarTarefas()

}

function deletarItem(posicao) {
    minhaListadeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('lista')

    if(tarefasLocalStorage) {
        minhaListadeItens = JSON.parse(tarefasLocalStorage)
    }

    mostrarTarefas()
}




recarregarTarefas()
btnAdicionar.addEventListener("click", adicionarNovaTarefa)