let userId = document.cookie.split("=")[1];

const getInfo = async () => {
  infos = { id: userId };
  console.log(JSON.stringify(infos));
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

getInfo().then((res) => {
  //colocar nome
  document.querySelector("#username").textContent = res.name;
  console.log(res);
  if (res.photoUrl) {
    document.querySelector("#user").src=`${res.photoUrl}`;
  }

  //confere se o curriculo já foi preenchido
  if (res.curriculum) {
    const curriculumOBJ = JSON.parse(res.curriculum);
    $("#curriculoContainer").append(
      `
      <h2 class="center">Currículo</h2>
      <div class="curriculoBx">
        <div class="formacaoContainer">
          <h3>Formação</h3>
          <p>
            ${curriculumOBJ.formacao[0].formacao}
          </p>
          <p>
            ${curriculumOBJ.formacao[0].lugar}
          </p>
          <p>
            ${curriculumOBJ.formacao[0].dataEntrada}
          </p>
          <p>
            ${curriculumOBJ.formacao[0].dataSaida}
          </p>
        </div>
        <div class="experienciaContainer">
          <h3>Experiência</h3>
          <p>
          ${curriculumOBJ.experiencia[0].titulo}
          </p>
          <p>
            ${curriculumOBJ.experiencia[0].descricao}
          </p>
        </div>

      </div>
      `
    );
  } else {
    $("#curriculoContainer").append(
      `
        <h2 id="curriculum">Meu Currículo</h2>
        <h4 class="local">Você ainda não possui um currículo</h4>
        <a href="/cadastroCurriculo">
          <button id="criarcurriculo"type="button"  class="btn btn-warning">Criar Curriculo</button>
        </a>
        `
    );
  }

  //confere se o questionario de softskills já foi preenchido
  if (res.softSkills) {
    const skillsOBJ = JSON.parse(res.softSkills);
    $("#skillContainer").append(
      `
      <h2 class="center">Soft Skills</h2>
      <div class="skillsBx">
          <div class="skillParagraph">  
            <p>Resolução de Problemas Complexos: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss1})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Pensamento Crítico: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss2})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Criatividade: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss3})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Gestão de Pessoas: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss4})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Liderança e influência social: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss5})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Pensamento analítico e inovação: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss6})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Resiliência, tolerância e flexibilidade: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss7})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Inteligência emocional: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss8})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Persuasão e negociação: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss9})"></div>
              </div>
          </div>
          <div class="skillParagraph">  
            <p>Gestão do tempo: </p>
              <div class="progressBar">
                <div class="greenBar" style="width:calc(25%*${skillsOBJ.ss10})"></div>
              </div>
          </div>
      </div>
      `
    );
  } else {
    $("#skillContainer").append(
      `
      <h2 id="curriculum">Minhas Soft Skills</h2>
      <h4 class="local">Você ainda não possui um currículo</h4>
      <a href="/skillTest">
        <button id="criarcurriculo"type="button"  class="btn btn-warning">Criar Curriculo</button>
      </a>
      `
    );
  }

  if (!res.curriculum && !res.softSkills) {
    Swal.fire({
      title: "Bem vinda!",
      text: "Para descobrir as vagas que mais combinam com você, adicione seu currículo e suas SoftSkills!",
      icon: "success",
      confirmButtonText: "Ótimo!",
    });
  }
});

function selectPhoto(){
  var photoUrl = prompt("Digite a URL de uma foto sua")

  $.post('/sendPhotoUrl', {photoUrl: photoUrl})

  document.location.reload(true);
}
