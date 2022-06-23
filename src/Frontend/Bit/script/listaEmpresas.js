const getInfo = async () => {
  const parameters = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "http://127.0.0.1:3030/api/getEmpresasAprovadas",
    parameters
  );
  console.log(response);
  const data = await response.json();
  return data;
};

getInfo().then((arrCompanies) => {
  for (var i = 0; i < arrCompanies.length; i++) {
    // let company = arrCompanies[i];
    criarCard(i, arrCompanies[i].id);
    $(`#profileName${i}`).text(arrCompanies[i].name);
    $(`#bio${i}`).text(arrCompanies[i].bio);
    console.log(i);
    console.log(arrCompanies[i].name);
    console.log(arrCompanies[i].bio);
  }
});

const criarCard = (index, IDCompany) => {
  $("#cards").append(
    `
      <div class="cardBx">
        <h1 class="title" id="profileName${index}"></h1>
        <p id="bio${index}"></p>
        <div class="btnBx">
            <a class="acceptBtn red" onclick="deny(${IDCompany})">Remover empresa</a>
        </div>
      </div>
      `
  );
};

// function seeCompany(IDCompany) {
//   $.post("/seeCompany", { ID_Company: IDCompany });
//   window.location.replace('/perfilEmpresaBit');
// }

function deny(IDCompany) {
  $.post("/denyCompany", { ID_Company: IDCompany });
  document.location.reload(true);
}
