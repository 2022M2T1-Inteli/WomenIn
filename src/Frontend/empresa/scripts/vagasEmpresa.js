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

const criarCard = (index, idVaga) => {
  $("#container").append(`
    <div class="card" id="card${index}">
    <h3>id ${idVaga}<h3>
    <h1 class="job" id="job${index}">Engenheiro de sistemas</h1>
    <h2 class="number" id="number${index}">23 aplicantes</h2>
    <p class="desc" id="desc${index}">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
      itaque enim ex, id optio eos, dignissimos facere blanditiis culpa
      accusantium nobis eum.
    </p>
    <div>
      <a
        href="./aplicantes.html"
        id="button${index}"
        type="button"
        class="btn btn-warning"
      >
        Ver aplicantes
      </a>
    </div>
  </div>
  `);
};

getInfo().then((res) => {
  for (let i in res) {
    let idVaga = res[i].id;
    criarCard(i, idVaga);
  }
});
