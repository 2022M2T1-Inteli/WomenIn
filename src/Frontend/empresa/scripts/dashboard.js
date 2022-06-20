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
      `
      <div class="infos">
        <div class="nome">
            <h2>${res.profileName}</h2>
        </div>
        <div class="location">
             <h1>Sede da empresa: ${res.companyCity}, ${res.companyState}</h1>
        </div>     
        <div class="site">
             <h1>Site: ${res.website}</h1>
        </div>
      </div>
      <div class="bio">
        <h2> ${res.bio} </h2>
      </div>

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
