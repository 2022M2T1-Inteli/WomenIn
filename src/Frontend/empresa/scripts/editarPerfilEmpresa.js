let userId = document.cookie.split("=")[1];

// quando o user entrar nessa pagina, vamos pedir pro banco de dados
// enviar as informações ja existentes para ele não ter que preencher tudo dnv

// função asincriona para o request
const getInfo = async () => {
  let infos = { id: userId };
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
  document.getElementById("profileName").value = res.profileName;
  document.getElementById("bio").value = res.bio;
  document.getElementById("website").value = res.website;
});

function enviar() {
  let nome = document.getElementById("profileName").value;
  let bio = document.getElementById("bio").value;
  let website = document.getElementById("website").value;
  let estado = document.getElementById("estado1").value;
  let cidade = document.getElementById("cidade1").value;
  let obj = {
    id: userId,
    name: nome,
    bio: bio,
    website: website,
    estado: estado,
    cidade: cidade,
  };
  fetch("http://127.0.0.1:3030/api/editarEmpresa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  window.location.replace("/empresa");
}
