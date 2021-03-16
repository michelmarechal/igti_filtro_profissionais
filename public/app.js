
const urlEmployees = "http://localhost:3000/employees",
      urlRoles = "http://localhost:3000/roles",
      cargos = [],
      empregados = [];

fetchData(urlEmployees, empregados);
fetchData(urlRoles, cargos);


let checarDadosCarregados = setInterval(() => {
      if (cargos[0] != undefined) {
            clearInterval(checarDadosCarregados);
            document.querySelector('.preloader').classList.add('display-none');
            montaTabela(empregados, cargos, '.tbody');
            montaCargos();
      }
}, 50);


function fetchData(url, array) {
      fetch(url).then(data => {return data.json()}).then(data => {data.map((dado) => {array.push(dado)})});
};

function montaTabela(empregados, cargos) {
      const tabela = document.querySelector('tbody');
      empregados.map((empregado) => {
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
      const filtroHTML = document.querySelector('.checkbox')
      cargos.forEach((cargo) => {
            filtroHTML.innerHTML += `<div><label><input type="radio" name="role" class="cargo-label" id="${cargo.id}"> ${cargo.name}</label></div>`;
      });
}

function organizaPorSalario(array) {
      return array.sort((a, b) => (b.salary > b.salary) ? 1 : -1);
}

function organizaPorNome(array) {
      return array.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

