const addButtonEL = document.getElementById("add");
const calcButtonEL = document.getElementById("calc");

let produtos = []; //Vetor que lida com a exibição dos produtos.
let comandaClientes = []; // Vetor para o calculo final.

function adicionarProduto() {
  //Recebe os Produtos ,valores e clientes e adiociona aos devidos vetores
  let form = document.getElementById("form");
  let produto = form.produto.value;
  let preco = parseFloat(form.preco.value);
  let clientes = form.clientes.value.split(",").map(function (item) {
    return item.trim();
  });
  clientes.forEach((cliente) => {
    //checa se já existe esse cliente na comanda
    let hasCliente = comandaClientes.some((item) => {
      return item.cliente == cliente;
    });

    if (hasCliente) {
      // Se existe encontra ele e adiciona o valor consumido, se não adiciona ele na comanda
      comandaClientes.find((item) => {
        return item.cliente == cliente;
      }).total += preco / clientes.length;
    } else {
      comandaClientes.push({
        cliente: cliente,
        total: preco / clientes.length,
        taxaServiço: false,
      });
    }
  });

  produtos.push({
    produto: produto,
    preco: preco,
    clientes: clientes,
  });

  form.produto.value = "";
  form.preco.value = "";
  form.clientes.value = "";

  exibirProdutos();
}

function exibirProdutos() {
  // Exibe os produtos adicionados, com o valor e os clientes.
  let table = document.createElement("table");
  table.innerHTML = "<tr><th>Produto</th><th>Preço</th><th>Clientes</th></tr>";

  produtos.forEach((item) => {
    let row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      item.produto +
      "</td><td>" +
      item.preco +
      "</td><td>" +
      item.clientes.join(", ") +
      "</td>";
    table.appendChild(row);
  });

  let div = document.getElementById("resultado");
  div.innerHTML = "";
  div.appendChild(table);
}

function calcularDivisao() {
  let div = document.getElementById("resultado");
  div.innerHTML = "";

  comandaClientes.forEach((item) => {
    let payTax = confirm(
      `${item.cliente} vai pagar a taxa de serviço? ok = sim /cancelar =não`
    );
    let taxaServiço = item.total * 0.1;
    if (payTax) {
      let resultado = document.createElement("p");
      resultado.textContent =
        "Cliente: " +
        item.cliente +
        " - Taxa de Serviço: " +
        taxaServiço.toFixed(2) +
        " - Valor Total: " +
        (item.total + taxaServiço).toFixed(2);
      div.appendChild(resultado);
    } else {
      let resultado = document.createElement("p");
      resultado.textContent =
        "Cliente: " + item.cliente + " - Valor Total: " + item.total.toFixed(2);
      div.appendChild(resultado);
    }
  });
}

addButtonEL.addEventListener("click", adicionarProduto);
calcButtonEL.addEventListener("click", calcularDivisao);
