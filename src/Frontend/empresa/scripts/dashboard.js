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
  console.log(res)
  if (res.profileUrl) {
    document.querySelector("#background").style.backgroundImage =`url("${res.backgroundUrl}")`;
  }
  
  if (res.backgroundUrl) {
    document.querySelector("#profile").src=`${res.profileUrl}`;
  }
  
  if (res.profileName && res.bio && res.companyCity && res.companyState && res.website) {
    $("#content").append(
      `
      <div class="nameDescription">
          <div class="nome">
            <h1>${res.profileName}</h1>
          </div>
          <div class="bio">
            <p>${res.bio}</p>
          </div>
        </div>
        <div class="sedeLink">
          <div class="location">
            <p><b>Sede da empresa:</b> ${res.companyCity}, ${res.companyState}</p>
          </div>
          <div class="site">
            <p><b>Site:</b> <a href="${res.website}">${res.website}</a></p>
          </div>
        </div>
      `
    );
  } else {
    $("#content").append(
      `
      <div class="uncompletedProfile">
        <h4 class="local">Você ainda não terminou seu perfil</h4>
        <a href="/editarEmpresa">
        <button id="criarcurriculo"type="button"  class="btn btn-warning">Terminar perfil</button>
        </a>
      </div>
        `
    );
  }
});
