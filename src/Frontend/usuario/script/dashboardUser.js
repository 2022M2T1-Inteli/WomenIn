let userId = document.cookie.split("=")[1];

const getInfo = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/getUserInfo");
  const data = await response.json();
  return data;
};

getInfo().then((res) => {
  //colocar nome
  document.querySelector("#username").textContent = res.name;

  //confere se o questionario de softskills já foi preenchido
  if (res.softSkills) {
    $("#skillAndCurriculum").append(
      "<h4 class='local'>SoftSkills cadastradas</h4>"
    );
  } else {
    $("#skillAndCurriculum").append(
      "<h4 id='setRed' class='local'>SoftSkills pendentes</h4>"
    );
  }

  //confere se o curriculo já foi preenchido
  if (res.curriculum) {
    $("#skillAndCurriculum").append(
      "<h4 class='local'>Currículo cadastrado</h4>"
    );
  } else {
    $("#skillAndCurriculum").append(
      "<h4 id='setRed' class='local'>Currículo pendente</h4>"
    );
  }
});
