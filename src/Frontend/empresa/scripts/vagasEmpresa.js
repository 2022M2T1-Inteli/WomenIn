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
    <div class="cardBx" id="card${index}">
    <h1 class="job" id="job${index}"></h1>
    <h2 class="number" id="number${index}">23 aplicantes</h2>
    <p class="desc" id="desc${index}"></p>
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
  console.log(res);
  for (let i in res) {
    let idVaga = res[i].id;
    let infos = res[i];
    let aplicantes = `'${res[i].idApply}'`;
    console.log(aplicantes);
    let teste = aplicantes.split(",");
    criarCard(i, idVaga, aplicantes);
    $(`#job${i}`).text(infos.jobTitle);
    $(`#number${i}`).text(teste.length + " candidatas");
    $(`#desc${i}`).text(infos.description);
  }
});

const aplicantes = async (a) => {
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
  const response = await fetch(
    "http://127.0.0.1:3030/api/getCandidatasVaga",
    parameters
  );

  const data = await response.json();
  strModal = ``;
  for (let i in data) {
    strModal += `<h2>${data[i].name} - ${data[i].location}</h2>
    <h4 style="color: gray">${data[i].email}</h4><hr>
    `;
  }
  $(".modal-content").append(strModal);
  $("#myModal").modal("toggle");
};

$("#myModal").on("hide.bs.modal", () => {
  $(".modal-content").text(" ");
});
