const getInfo = async () => {
  const parameters = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "http://127.0.0.1:3030/api/seeCompany",
    parameters
  );
  const data = await response.json();
  console.log(data);
  return data;
};

getInfo().then((res) => {
  console.log(res)
  $("#main").append(
    `
    <div class="background" id="background">
        <div class="logo">
          <img
            id="profile"
            src="../../assets/empresaPerfil.png"
            alt="logoPerfil"
          />
        </div>
      </div>
      <div id="content">
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
            <p>
              <b>Sede da empresa:</b> ${res.companyCity}, ${res.companyState}
            </p>
          </div>
          <div class="site">
            <p><b>Site:</b> <a href="${res.website}">${res.website}</a></p>
          </div>
        </div>
      </div>
    `
  );
});
