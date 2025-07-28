const listaDeNomes = [];
const limiteDeNomes = 20;

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (nome === "") {
    alert("Digite um nome válido!");
    return;
  }

  if (listaDeNomes.includes(nome)) {
    alert("Esse nome já foi adicionado!");
    input.value = "";
    return;
  }

  if (listaDeNomes.length >= limiteDeNomes) {
    alert("Limite de nomes atingido!");
    return;
  }

  listaDeNomes.push(nome);
  input.value = "";

  const lista = document.getElementById("listaAmigos");
  const item = document.createElement("li");
  item.innerText = nome;
  lista.appendChild(item);
}

function sortearAmigo() {
  if (listaDeNomes.length < 2) {
    alert("Adicione pelo menos 2 nomes para sortear.");
    return;
  }

  let sorteados;
  let tentativas = 0;

  do {
    sorteados = embaralharArray([...listaDeNomes]);
    tentativas++;
  } while ((temRepetido(listaDeNomes, sorteados) || temDuplicado(sorteados)) && tentativas < 100);

  if (tentativas >= 100) {
    alert("Não foi possível gerar um sorteio válido. Tente novamente.");
    return;
  }

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  for (let i = 0; i < listaDeNomes.length; i++) {
    const amigo = listaDeNomes[i];
    const amigoSecreto = sorteados[i];

    const item = document.createElement("li");
    item.innerText = `${amigo} → ${amigoSecreto}`;
    resultado.appendChild(item);
  }
}

function temRepetido(listaOriginal, sorteados) {
  for (let i = 0; i < listaOriginal.length; i++) {
    if (listaOriginal[i] === sorteados[i]) {
      return true;
    }
  }
  return false;
}

function temDuplicado(array) {
  return new Set(array).size !== array.length;
}

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
