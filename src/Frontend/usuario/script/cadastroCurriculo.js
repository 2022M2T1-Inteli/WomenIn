"use strict";
const hostname = "127.0.0.1";

let userId = document.cookie.split("=")[1];
let counterFormacao = 1;
let counterExperiencia = 1;

//Funções

const getInfo = async () => {
  let infos = { id: userId };
  const parameters = {
    method: "POST",
    body: JSON.stringify(infos),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "http://127.0.0.1:3030/api/getUserInfo",
    parameters
  );
  const data = await response.json();
  return data;
};

const addFormacao = () => {
  counterFormacao += 1;
  $("#novaFormacao").append(
    `
    <div id="fomacao${counterFormacao}Container" class="formacaoContainer">
    <button class="closeIcon" id='close' onclick="removeFormacaoContainer()">
      <img src="../../assets/closeIcon.svg" alt="closeIcon">
    </button>
    <h1 id="formacao" style="margin:20px">Formação ${counterFormacao}</h1>
    <div class="inputs">
      <input placeholder="Formação" type="text" id = "inputFormacao${counterFormacao}"/>
      <input placeholder="Universidade" type="text" id = "inputUniversidade${counterFormacao}"/>
      <div class="data">
        <p>
          Data de entrada:
          <input
            class="datecolor"
            type="date"
            placeholder="Duração"
            type="text"
          id = "inputDataEntrada${counterFormacao}"/>
        </p>
        <p>
          Data de saída:
          <input type="date" placeholder="Duração" type="text" id = "inputDataSaida${counterFormacao}"/>
        </p>
      </div>
    </div>
    </div>
    `
  );
};

function removeFormacaoContainer() {
  document.getElementById("close").onclick = function () {
    this.parentNode.remove();
    return false;
  };
}

function removeExperienciaContainer() {
  document.getElementById("closeEx").onclick = function () {
    this.parentNode.remove();
    return false;
  };
}

const criarArrayFormacao = () => {
  let arrayFinal = [];
  for (let i = 1; i <= counterFormacao; i++) {
    let objetoAtual = {};
    objetoAtual.formacao = document.querySelector(`#inputFormacao${i}`).value;
    objetoAtual.lugar = document.querySelector(`#inputUniversidade${i}`).value;
    objetoAtual.dataEntrada = document.querySelector(
      `#inputDataEntrada${i}`
    ).value;
    objetoAtual.dataSaida = document.querySelector(`#inputDataSaida${i}`).value;
    arrayFinal.push(objetoAtual);
  }
  return arrayFinal;
};

const addExperiencia = () => {
  counterExperiencia += 1;
  $("#novaExperiencia").append(
    `
    <div id="experiencia${counterExperiencia}Container" class="experienciaContainer">
      <button class="closeIconEx" id='closeEx' onclick="removeExperienciaContainer()">
        <img src="../../assets/closeIcon.svg" alt="closeIcon">
      </button>
      <h1 id="experiencia">Experiência ${counterExperiencia}</h1>
      <div class="inputs">
        <input placeholder="Título" type="text" id="inputTitulo${counterExperiencia}"/>
        <input placeholder="Descrição" type="text" id="inputDescricao${counterExperiencia}"/>
      </div>
    </div>
    `
  );
};

const criarArrayExperiencia = () => {
  let arrayFinal = [];
  for (let i = 1; i <= counterExperiencia; i++) {
    let objetoAtual = {};
    objetoAtual.titulo = document.querySelector(`#inputTitulo${i}`).value;
    objetoAtual.descricao = document.querySelector(`#inputDescricao${i}`).value;
    arrayFinal.push(objetoAtual);
  }
  return arrayFinal;
};

const criarStrLocalizacao = () => {
  let cidade = $("#cidade1").val();
  let estado = $("#estado1").val();
  if (cidade && estado) {
    return `${cidade}, ${estado}`;
  }
  return null;
};

const enviarCurriculum = (file) => {
  const params = { contenttype: "application/json" };
  $.post("http://127.0.0.1:3030/cadastrarCurriculo", file, (err) => {
    console.log(err);
  });
};

//FUNÇAO PRINCIPAL que envia o curriculo preenchido
const finalizar = () => {
  let userId = document.cookie.split("=")[1];
  let objetoFinal = {};
  objetoFinal.experiencia = criarArrayExperiencia();
  objetoFinal.formacao = criarArrayFormacao();
  objetoFinal.loc = criarStrLocalizacao();
  //adiciona o ID do usuario ao obj
  objetoFinal.id = userId;

  console.log(objetoFinal);
  // adiciona as outras informações cadastradas ao obj
  if (
    !objetoFinal.loc ||
    !objetoFinal.experiencia[0] ||
    !objetoFinal.formacao[0]
  ) {
    Swal.fire({
      title: "Oops!",
      text: "Preencha todas suas informações",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // envia o curriculo
  enviarCurriculum(objetoFinal);
  window.location.replace("/dashboard");
};

//RODA QUANDO O CÒDIGO INICIA -> responsavel por pré-preencher
//o formulário com as infos já armazenadas no db
getInfo().then((res) => {
  // PREPARANDO O AMBIENTE:

  //cria as variaveis necessarias
  let local = res.location.split(", ");
  let arrFormacoes = JSON.parse(res.curriculum).formacao;
  let arrExperiencias = JSON.parse(res.curriculum).experiencia;
  let tamanhoArrExperiencias = arrExperiencias.length;
  let tamanhoArrFormacoes = arrFormacoes.length;

  //cria as n seções HTML de formacao e experiencia necessárias
  for (let qtde = 1; tamanhoArrExperiencias > qtde; qtde++) addExperiencia();
  for (let qtde = 1; tamanhoArrFormacoes > qtde; qtde++) addFormacao();

  //PREENCHENDO AS SEÇÕES:

  // Preenchendo as formações
  //loop itera entre todas as formações no array vindo do db
  for (let i = 1; i <= tamanhoArrFormacoes; i++) {
    let formacaoAtual = arrFormacoes[i - 1];
    //data entrada
    document.querySelector(`#inputDataEntrada${i}`).value =
      formacaoAtual.dataEntrada;
    // data saida
    document.querySelector(`#inputDataSaida${i}`).value =
      formacaoAtual.dataSaida;
    // formacao
    document.querySelector(`#inputFormacao${i}`).value = formacaoAtual.formacao;
    // universidade / instituição
    document.querySelector(`#inputUniversidade${i}`).value =
      formacaoAtual.lugar;
  }
  //mesma coisa para as experiencias
  for (let i = 1; i <= tamanhoArrExperiencias; i++) {
    let experienciaAtual = arrExperiencias[i - 1];
    // titulo
    document.querySelector(`#inputTitulo${i}`).value = experienciaAtual.titulo;
    // descricao
    document.querySelector(`#inputDescricao${i}`).value =
      experienciaAtual.descricao;
  }
});

// função do menu

const trigger = document.querySelector("menu > .trigger");
trigger.addEventListener("click", (e) => {
  e.currentTarget.parentElement.classList.toggle("open");
});
