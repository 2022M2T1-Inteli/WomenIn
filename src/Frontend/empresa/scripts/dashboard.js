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
    "http://127.0.0.1:3030/api/getEmpresaInfo",
    parameters
  );
  const data = await response.json();
  return data;
};

getInfo().then((res) => {
  if (res.profileName) {
    $("#infoEmpresa").append(
      `<h1>Nome da empresa:</h1>
      <p>
            ${res.profileName}
          </p>
      `
    );
  } else {
    $("#infoEmpresa").append(
      `
            <h4 class="local">Você ainda não terminou seu perfil</h4>
            <a href="/editarEmpresa">
              <button id="criarcurriculo"type="button"  class="btn btn-warning">Terminar perfil</button>
            </a>
            `
    );
  }
});
