
const urlEmployees = "http://localhost:3000/employees",
      urlRoles = "http://localhost:3000/roles",
      cargos = [];
let controle = [],
    listaEmpregados = [];


fetchData(urlEmployees, listaEmpregados);
fetchData(urlRoles, cargos);

let checarDadosCarregados = setInterval(() => {
      if (cargos[0] != undefined) {
            clearInterval(checarDadosCarregados);
            document.querySelector('.preloader').classList.add('display-none');
            montaTabela(listaEmpregados, cargos);
            montaCargos();
            filtraPorCargo();
            filtraPorOrdem();
      }
}, 1000);


function fetchData(url, array) {
      fetch(url).then(data => {return data.json()}).then(data => {data.map((dado) => {array.push(dado)})});
};

function montaTabela(empregados, cargos) {
      const tabela = document.querySelector('tbody');
      tabela.innerHTML = "";
      empregados.forEach((empregado) => {
            tabela.innerHTML += 
            `<tr>
                  <td>${empregado.id}</td>
                  <td>${empregado.name}</td>
                  <td>${cargos[empregado.role_id - 1].name}</td>
                  <td>R$ ${empregado.salary}</td>
            </tr>`      
      });
}


function montaCargos() {
      const filtroHTML = document.querySelector('.checkbox');
      cargos.forEach((cargo) => {
            filtroHTML.innerHTML += `<div><input type="checkbox" name="role" class="cargo-label" id="${cargo.id}"><label>${cargo.name} </label></div>`;
      });
}

function organizaPorId(array) {
      return array.sort((a, b) => (a.id > b.id) ? 1 : -1);
}

function organizaPorSalario(array) {
      return array.sort((a, b) => (a.salary > b.salary) ? 1 : -1);
}

function organizaPorNome(array) {
      return array.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

function adicionaFiltros(cliclado) {
      const idAtual = parseInt(cliclado.id);
      // Se o elemento ainda não estiver na array controle, ele é adicionado
      if (controle.indexOf(idAtual) < 0) {
            controle.push(idAtual);
      } else {
            // Caso contrário, ele é removido da array, que tem o valor ajustado para a sua filtragem
            controle = controle.filter((numero) => { 
                  return numero != idAtual;
            });
      }
      if (controle[0] == undefined) {
            montaTabela(listaEmpregados, cargos);
      } else {
            const novaArray = listaEmpregados.filter((empregado) => {
                  return controle.indexOf(empregado.role_id) > -1;
            });
            montaTabela(novaArray, cargos);
      }
}

function limpaFiltros() {
      controle = [];
      // Seleciona todos os labels
      const label = document.querySelectorAll('input');
      // Cria um array de controle das checkboxes clicadas
      // Inicia um eventListener para cada um dos labels
      label.forEach((atual) => {
            atual.checked = false;
      });
}

function filtraPorCargo() {
            // Seleciona todos os labels
            const label = document.querySelectorAll('input');
            // Cria um array de controle das checkboxes clicadas
            // Inicia um eventListener para cada um dos labels
            label.forEach((atual) => {
                  atual.addEventListener('change', (event) => {
                        // Seleciona o id do elemento cliclado
                        adicionaFiltros(atual);
                  });
            });
}

function filtraPorOrdem() {
      const options = document.querySelector('select');
      options.addEventListener('change', function(event) {
            if (this.value=="sem-filtro") {
                  let lista = organizaPorId(listaEmpregados);
                  montaTabela(lista, cargos);
                  limpaFiltros()
            } else if (this.value == "salarios-asc") {
                  let lista = organizaPorSalario(listaEmpregados);
                  montaTabela(lista, cargos);
                  limpaFiltros()
            } else if (this.value == "salarios-desc") {
                  let lista = organizaPorSalario(listaEmpregados).reverse();
                  montaTabela(lista, cargos);
                  limpaFiltros()
            }
            else if (this.value == "nome-asc") {
                  let lista = organizaPorNome(listaEmpregados);
                  montaTabela(lista, cargos);
                  limpaFiltros()
            } else if (this.value == "nome-desc") {
                  let lista = organizaPorNome(listaEmpregados).reverse();
                  montaTabela(lista, cargos);
                  limpaFiltros()
            }
      });
}
