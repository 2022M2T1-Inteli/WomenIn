let userId = document.cookie.split("=")[1];
const hostname = "127.0.0.1";

const getCheckedSS = () => {
  let arr = [];
  for (let i = 1; i <= 10; i++) {
    let str = "ss" + i;
    console.log(str);
    if (document.getElementById(str).checked) {
      arr.push(str);
    }
  }
  if (arr.length > 4) return false;
  return arr;
};

const getInfo = async () => {
  infos = { id: userId };
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
  console.log(response);
  const data = await response.json();
  return data;
};

function enviar() {
  getInfo().then((res) => {
    if (!getCheckedSS()) {
      alert("ERRO! PREENCHA APENAS 4 SSs");
      return;
    }
    let arrSS = getCheckedSS();
    let companyName = res.name;
    let cidade = document.getElementById("cidade1").value;
    let hardSkills = document.querySelector("#HH").value;
    let formacao = document.getElementById("FA").value;
    let estado = document.getElementById("estado1").value;
    let nome = $("#nome :selected").text();
    let descricao = document.getElementById("descricao").value;
    let tipo = $("#selTipo :selected").text();
    let formato = $("#selForm :selected").text();
    let horario = $("#selHor :selected").text();

    if (
      companyName &&
      cidade &&
      estado &&
      nome &&
      descricao &&
      tipo &&
      formato &&
      horario &&
      hardSkills &&
      formacao
    ) {
      const obj = {
        idEmpresa: userId,
        companyName: companyName,
        cidade: cidade,
        formacao: formacao,
        hardSkills: hardSkills,
        estado: estado,
        name: nome,
        descricao: descricao,
        tipo: tipo,
        formato: formato,
        horario: horario,
        ss: arrSS,
      };
      const parameters = {
        method: "POST",
        body: JSON.stringify(obj),
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("http://127.0.0.1:3030/api/enviarVaga", parameters);
      window.location.replace("/dashboardEmpresa");
    } else alert("er");
  });
}

// {"idEmpresa":"500","cidade":"Assunção do Piauí","estado":"PI","name":"bgfb","descricao":"gb","tipo":"Selecione o tipo de vaga","formato":"Selecione o formato da vaga","horario":"Selecione o horário da vaga","ss":["ss2","ss3"]}
