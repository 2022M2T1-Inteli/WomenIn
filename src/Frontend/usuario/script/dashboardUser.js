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
            ${curriculumOBJ.formacao[0].Formacao}
          </p>
          <p>
            ${curriculumOBJ.formacao[0].lugar}
          </p>
          <p>
            ${curriculumOBJ.formacao[0].DataEntrada}
          </p>
          <p>
            ${curriculumOBJ.formacao[0].DataSaida}
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
          <p>
            Controle de Emoções: ${skillsOBJ.ss1}
          </p>
          <p>
            Criatividade: ${skillsOBJ.ss2}
          </p>
          <p>
            Trabalho em grupo: ${skillsOBJ.ss3}
          </p>
          <p>
            Comunicação eficaz: ${skillsOBJ.ss4}
          </p>
          <p>
            Liderança: ${skillsOBJ.ss5}
          </p>
          <p>
            Pensamento crítico: ${skillsOBJ.ss6}
          </p>
          <p>
            Empatia: ${skillsOBJ.ss7}
          </p>
          <p>
            Atitude: ${skillsOBJ.ss8}
          </p>
          <p>
            Flexivel nas tarefas: ${skillsOBJ.ss9}
          </p>
          <p>
            Rápida tomada de decisões: ${skillsOBJ.ss10}
          </p>
          <p>
            Negociações: ${skillsOBJ.ss11}
          </p>
          <p>
            Adaptável: ${skillsOBJ.ss12}
          </p>
          <p>
            Detalhista: ${skillsOBJ.ss13}
          </p>
          <p>
            Relacionamentos interpessoais: ${skillsOBJ.ss14}
          </p>
          <p>
            Gestão de tempo: ${skillsOBJ.ss15}
          </p>
          <p>
            Planejamento: ${skillsOBJ.ss16}
          </p>
          <p>
            Organização: ${skillsOBJ.ss17}
          </p>
          <p>
            Resiliência: ${skillsOBJ.ss18}
          </p>
          <p>
            Desempenho sobre pressão: ${skillsOBJ.ss19}
          </p>
          <p>
            Desenvolvimento próprio: ${skillsOBJ.ss20}
          </p>
          
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

