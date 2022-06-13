"use strict";

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
    <div style="margin:20px">
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
    <h1 id="experiencia">Experiência ${counterExperiencia}</h1>
    <div class="inputs">
      <input placeholder="Título" type="text" id="inputTitulo${counterExperiencia}"/>
      <input placeholder="Descrição" type="text" id="inputDescricao${counterExperiencia}"/>
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
  //adiciona o ID do usuario ao obj
  objetoFinal.id = userId;

  //adiciona as outras informações cadastradas ao obj
  objetoFinal.loc = criarStrLocalizacao();
  if (!objetoFinal.loc) {
    Swal.fire({
      title: "Oops!",
      text: "Preencha sua localização",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }
  objetoFinal.formacao = criarArrayFormacao();
  objetoFinal.experiencia = criarArrayExperiencia();
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
trigger.addEventListener('click', (e) => {
  e.currentTarget.parentElement.classList.toggle("open");
});