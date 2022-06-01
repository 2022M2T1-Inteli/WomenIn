let userId = document.cookie.split("=")[1];

const getInfo = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/getUserInfo");
  const data = await response.json();
  return data;
};

getInfo().then((res) => {
  //colocar nome
  document.querySelector("#username").textContent = res.name;
 if (res.softSkills){
  $("#skillCurriculo").append(res.softSkills
    );
    $("#skillCurriculo").append( 
    `
      <a href="/skillTest">
        <button id="editarsoftskills"type="button"  class="btn btn-warning">Editar Softskills</button>
      </a>
      `
    );
   }  else {
    $("#skillCurriculo").append(
      `
      <h2 id="curriculum">Minhas Soft Skills</h2>
      <h4 class="local">Você ainda não possui um currículo</h4>
      <a href="/skillTest">
        <button id="criarcurriculo"type="button"  class="btn btn-warning">Criar Curriculo</button>
      </a>
      `
    );
  }
  if (res.curriculum) {
    $("#curriculoContainer").append(
      res.curriculum
    );
    $("#curriculoContainer").append(
      `
      <a href="/cadastroCurriculo">
      <button id="editarcurriculo"type="button"  class="btn btn-warning">Editar Curriculo</button>
    </a>
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

  if (!res.curriculum && !res.softSkills) {
    Swal.fire({
      title: "Bem vinda!",
      text: "Para descobrir as vagas que mais combinam com você, adicione seu currículo e suas SoftSkills!",
      icon: "success",
      confirmButtonText: "Ótimo!",
    });
  }
});
