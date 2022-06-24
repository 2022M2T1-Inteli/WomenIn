let idEmpresa = document.cookie.split("=")[1];

const getInfo = async () => {
  let infos = { id: idEmpresa };
  const parameters = {
    method: "POST",
    body: JSON.stringify(infos),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "http://127.0.0.1:3030/api/getVagasEmpresa",
    parameters
  );
  const data = await response.json();
  return data;
};

const criarCard = (index, idVaga, aplicantes) => {
  $("#container").append(`
    <div class="card1" id="card${index}">
    <h1 class="job" id="job${index}">Engenheiro de sistemas</h1>
    <h2 class="number" id="number${index}">23 aplicantes</h2>
    <p class="desc" id="desc${index}">
    </p>
    <div>
      <button
      onclick="aplicantes(${aplicantes})"
        class="btn btn-warning"
      >
        Ver aplicantes
      </button>
    </div>
  </div>
  `);
};

getInfo().then((res) => {
  for (let i in res) {
    let idVaga = res[i].id;
    let infos = res[i];
    let aplicantes = `'${res[i].idApply}'`;
    console.log(aplicantes);
    criarCard(i, idVaga, aplicantes);
    $(`#job${i}`).text(infos.jobTitle);
    $(`#desc${i}`).text(infos.description);
  }
  console.log(res);
});

const aplicantes = (a) => {
  console.log(a);
  let infos = { id: a };
  const parameters = {
    method: "POST",
    body: JSON.stringify(infos),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://127.0.0.1:3030/api/getCandidatasVaga", parameters);
};
