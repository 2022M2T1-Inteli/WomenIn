let userId = document.cookie.split("=")[1];

function enviar() {
    let nome = document.getElementById("profileName").value;
    let bio = document.getElementById("bio").value;
    let website = document.getElementById("website").value;
    let estado = document.getElementById("estado1").value;
    let cidade = document.getElementById("cidade1").value;
    let obj = {
        "id": userId,
        "name": nome,
        "bio": bio,
        "website": website,
        "estado": estado,
        "cidade": cidade
    }
fetch("http://127.0.0.1:3030/api/editarEmpresa",{
method: "POST",
headers: {
    "Content-Type": "application/json",
  },
body: JSON.stringify(obj),
})}



    