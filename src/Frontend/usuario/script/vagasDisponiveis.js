let userId = document.cookie.split("=")[1];
const hostname = "127.0.0.1";

const criarCard = (index, IDVaga) => {
  $("#cards").append(`
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
      <h3>Match</h3>
      <p id="porcentagem${index}" class="porcentagem"></p>
    </div>
    <div class="btnBx">
      <button href="" type="button" class="btn btn-warning shadowBtn" onclick="apply(${IDVaga})"> Aplicar </button>
      <button
        type="button"
        class="btn btn-warning shadowBtn"
      >
        Ver Empresa
      </button>
   
  </div>
</div>`);
};

const getVagas = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/puxarVagas");
  const data = await response.json();
  return data;
};

const sendApply = async (ID) => {
  infos = { userid: userId, vagaid: ID };
  const parameters = {
    method: "POST",
    body: JSON.stringify(infos),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let test1 = await fetch("http://127.0.0.1:3030/api/apply", parameters);
  let test2 = await test1.json();
  return test2;
};

getVagas().then((arrVagas) => {
  for (let i in arrVagas) {
    let vaga = arrVagas[i];
    criarCard(i, vaga.id);
    $(`#jobTitle${i}`).text(vaga.jobTitle);
    $(`#idvaga${i}`).text(vaga.jobTitle);
    $(`#jobType${i}`).text(vaga.jobType);
    $(`#jobTime${i}`).text(vaga.jobTime);
    $(`#hardSkills${i}`).text(vaga.hardSkills);
    $(`#porcentagem${i}`).text(vaga.porcentagem);
  }
});

//função executada quando o user clica para apllicar em uma vaga
const apply = async (IDVaga) => {
  let status = await sendApply(IDVaga);
  switch (status.status) {
    case "alreadyApplied":
      Swal.fire({
        title: "Oops!",
        text: "Você já aplicou para essa vaga! Aguarde o retorno da empresa!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      break;
    case "sucess":
      Swal.fire({
        title: "Aplicação concluída!",
        text: "A empresa já recebeu seu currículo e entrará em contato em breve!",
        icon: "success",
        confirmButtonText: "OK",
      });
      break;
    case "error":
      Swal.fire({
        title: "Oops!",
        text: "Erro no banco de dados!",
        icon: "error",
        confirmButtonText: "OK",
      });
      break;
  }
};
