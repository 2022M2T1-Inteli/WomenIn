"use strict";

let counterFormacao = 1;
let counterExperiencia = 1;

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
    objetoAtual.Formacao = document.querySelector(`#inputFormacao${i}`).value;
    objetoAtual.lugar = document.querySelector(`#inputUniversidade${i}`).value;
    objetoAtual.DataEntrada = document.querySelector(
      `#inputDataEntrada${i}`
    ).value;
    objetoAtual.DataSaida = document.querySelector(`#inputDataSaida${i}`).value;
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

//FUNÇAO PRINCIPAL
const finalizar = () => {
  let userId = document.cookie.split("=")[1];
  let objetoFinal = {};
  objetoFinal.id = userId;
  objetoFinal.formacao = criarArrayFormacao();
  objetoFinal.experiencia = criarArrayExperiencia();
  // console.log(objetoFinal);
  enviarCurriculum(objetoFinal);
  alert(JSON.stringify(objetoFinal));
  window.location.replace("/dashboard");
};

const enviarCurriculum = (file) => {
  const params = { contenttype: "application/json" };
  $.post("http://127.0.0.1:3030/cadastrarCurriculo", file, (err) => {
    console.log(err);
  });
};
