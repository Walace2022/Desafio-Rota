const arabicoEl = document.querySelector("#arabico");
const romanoEl = document.querySelector("#romano");
const btnArabicoEl = document.querySelector("#btn1");
const btnRomanoEl = document.querySelector("#btn2");
const resultArabicoEl = document.querySelector("#resultArabico");
const resultRomanoEl = document.querySelector("#resultRomano");

//Conversor de arabico para Romano

const simbolos = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
];
const valores = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

function toRomanNumber(numArabico = 0) {
  // Subtrai os valores se possivel e adiciona o simbolo correspondente
  let numRomano = "";
  for (let i = 0; i < simbolos.length; i++) {
    while (numArabico >= valores[i]) {
      numArabico -= valores[i];
      numRomano += simbolos[i];
    }
  }

  return numRomano;
}

//Conversor Romano para arabico

const simbolos2 = "MDCLXVI";
const valores2 = [1000, 500, 100, 50, 10, 5, 1];

function checkSintaxe(numRomano) {
  // Verifica se o numero digitado só contem simbolos validos.
  for (let i = 0; i < numRomano.length; i++) {
    if (simbolos2.includes(numRomano[i])) {
    } else {
      return false;
    }
  }
  return true;
}

function toArabicNumber(numRomano) {
  let numArabico = 0;
  numRomano = numRomano.toUpperCase();
  if (checkSintaxe(numRomano)) {
    let anterior = 0;
    let atual = 0;
    for (let i = 0; i < numRomano.length - 1; i++) {
      anterior = valores2[simbolos2.indexOf(numRomano[i])];
      atual = valores2[simbolos2.indexOf(numRomano[i + 1])];

      if (anterior < atual) {
        numArabico -= anterior;
      } else {
        numArabico += anterior;
      }
    }
    numArabico += atual;

    let numRomano2 = toRomanNumber(numArabico); // criar um segundo numero romano com o valor arabico para verificar se a sintaxe está correta

    if (numRomano !== numRomano2) {
      // se a sintaxe tiver incorreta retorna a forma correta.
      return "Voce quis dizer :" + numRomano2 + " = " + numArabico;
    } else {
      return numRomano + " = " + numArabico;
    }
  } else {
    return "Numero romano invalido.";
  }
}

btnArabicoEl.addEventListener("click", () => {
  let num = arabicoEl.value;
  resultArabicoEl.innerHTML = `${num} = ${toRomanNumber(num)}`;
});

btnRomanoEl.addEventListener("click", () => {
  let num = romanoEl.value;
  resultRomanoEl.innerHTML = toArabicNumber(num);
});
