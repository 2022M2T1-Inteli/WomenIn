const criarCard = (index) => {
  $("#cards").append(`<div id="cards">
  <div class="cardContainer">
    <h1 id="jobTitle${index}" class="jobTitle"></h1>
    <div class="descriptionBx">
      <h3>Descrição da Vaga</h3>
      <p id="description${index}" class="description"></p>
    </div>
    <div class="jobTypeBx">
      <h3>Tipo de trabalho</h3>
      <p id="jobType${index}" class="jobType"></p>
    </div>
    <div class="jobTimeBx">
      <h3>Turno</h3>
      <p id="jobTime${index}" class="jobTime"></p>
    </div>
    <div class="jobLocationBx">
      <h3>Local da vaga</h3>
      <p id="jobLocation${index}" class="jobLocation"></p>
    </div>
    <div class="hardSkillsBx">
      <h3>Hard Skills</h3>
      <p id="hardSkills${index}" class="hardSkills"></p>
    </div>
    <div class="matchBx">
      <h3>Hard Skills</h3>
      <p id="porcentagem${index}" class="porcentagem"></p>
    </div>
    <div class="btnBx">
      <a href="" type="button" class="btn btn-warning shadowBtn"> Aplicar </a>
      <a
        href="perfilEmpresaUser.html"
        type="button"
        class="btn btn-warning shadowBtn"
      >
        Ver Empresa
      </a>
    </div>
  </div>
</div>`);
};

const getVagas = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/puxarVagas");
  const data = await response.json();
  return data;
};

getVagas().then((arrVagas) => {
  for (let i in arrVagas) {
    let vaga = arrVagas[i];
    console.log(vaga);
    criarCard(i);
    $(`#jobTitle${i}`).text = vaga.jobTitle;
    $(`#description${i}`).text = vaga.description;
    // $(`#job${i}`).value = vaga.
    // $(`${i}`).value = vaga.
    // $(`${i}`).value = vaga.
    // $(`${i}`).value = vaga.
    // $(`${i}`).value = vaga.
  }
});

// academicFormation: "undefined"
// description: "sfdffv"
// hardSkills: "undefined"
// id: 13
// idEmpresa: 500
// jobCity: "Antônio Olinto"
// jobState: "PR"
// jobTime: "Vespertino"
// jobTitle: "Paulo Presa Evangelista"
// jobType: "Estágio"
// neededSkills: "ss1,ss2"
// porcentagem: "75"
