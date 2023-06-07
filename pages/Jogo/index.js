const mainEl = document.querySelector(".container");
const buttonEl = document.querySelector("button");

let lifeGame = [];
let aux = [];

let n1 = 0;
let n2 = 0;

n1 = window.prompt("Digite um numero inteiro:");

while (n1 < 10) {
  alert("O numero precisa ser no minimo 10.");
  n1 = window.prompt("Digite um numero inteiro:");
}

n2 = window.prompt("Digite um numero inteiro:");

while (n2 < 10) {
  alert("O numero precisa ser no minimo 10.");
  n2 = window.prompt("Digite um numero inteiro:");
}

function setToZero() {
  // Deixa os todos Valores da matriz auxiliar em 0
  for (let i = 0; i < aux.length; i++) {
    for (let j = 0; j < aux[0].length; j++) {
      aux[i][j] = 0;
    }
  }
}

function setDefautState(index1, index2) {
  // Deixa os valores padroes das matrizes
  lifeGame = new Array(index1);
  for (let i = 0; i < index1; i++) {
    lifeGame[i] = new Array(index2);
    for (let j = 0; j < index2; j++) {
      lifeGame[i][j] = false;
    }
  }
  aux = new Array(index1);
  for (let i = 0; i < index1; i++) {
    aux[i] = new Array(index2);
    for (let j = 0; j < index2; j++) {
      aux[i][j] = 0;
    }
  }
}

function checkLife() {
  //Itera a matriz principal e para cada true chama a função setNeghboors e atualiza o HTMl
  const newHtml = toHtml();
  mainEl.innerHTML = newHtml;
  for (let i = 0; i < lifeGame.length; i++) {
    for (let j = 0; j < lifeGame.length; j++) {
      if (lifeGame[i][j]) {
        setNeighboors(i, j);
      }
    }
  }
}

function setNeighboors(linha, coluna) {
  // Adiociona +1 em todas as posições em volta de uma casa com vida(true);
  let linhas = aux.length;
  let colunas = aux[0].length;

  let posicoes = [
    { linha: linha - 1, coluna: coluna }, // acima
    { linha: linha - 1, coluna: coluna - 1 }, // acima à esquerda
    { linha: linha - 1, coluna: coluna + 1 }, // acima à direita
    { linha: linha + 1, coluna: coluna }, // abaixo
    { linha: linha + 1, coluna: coluna - 1 }, // abaixo à esquerda
    { linha: linha + 1, coluna: coluna + 1 }, // abaixo à direita
    { linha: linha, coluna: coluna - 1 }, // à esquerda
    { linha: linha, coluna: coluna + 1 }, // à direita
  ];

  for (let i = 0; i < posicoes.length; i++) {
    let pos = posicoes[i];
    let row = pos.linha;
    let column = pos.coluna;

    if (row >= 0 && row < linhas && column >= 0 && column < colunas) {
      aux[row][column]++;
    }
  }
  aux[linha][coluna]++;
}

function updateLife() {
  for (let i = 0; i < lifeGame.length; i++) {
    for (let j = 0; j < lifeGame.length; j++) {
      if (lifeGame[i][j]) {
        if (aux[i][j] < 3 || aux[i][j] > 4) lifeGame[i][j] = false;
      } else {
        if (aux[i][j] === 3) lifeGame[i][j] = true;
      }
    }
  }
  setToZero();
  checkLife();
}

function toHtml() {
  // Transforma a matriz principal em Html
  let HTML = "";
  for (let i = 0; i < lifeGame.length; i++) {
    HTML += '<div class="row">';
    for (let j = 0; j < lifeGame.length; j++) {
      if (lifeGame[i][j]) {
        HTML += '<div class="alive"></div>';
      } else {
        HTML += '<div class="dead"></div>';
      }
    }
    HTML += "</div>";
  }
  return HTML;
}

setDefautState(n1, n2);

lifeGame[1][0] = true;
lifeGame[2][1] = true;
lifeGame[2][2] = true;
lifeGame[1][2] = true;
lifeGame[0][2] = true;

checkLife();

buttonEl.addEventListener("click", updateLife);
