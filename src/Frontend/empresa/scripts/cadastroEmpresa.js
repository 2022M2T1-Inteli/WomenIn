const cadastrarEmpresa = () => {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let objeto = {
    name: name,
    email: email,
    password: password,
  };

  const parameters = {
    method: "POST",
    body: JSON.stringify(objeto),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://127.0.0.1:3030/api/cadastrarEmpresa", parameters);
  window.location.replace("/");
};
