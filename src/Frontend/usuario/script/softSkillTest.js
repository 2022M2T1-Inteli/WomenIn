const slidersArr = document.getElementsByClassName("form-range");

document.querySelector("body").addEventListener("touchend", function (event) {
  if (event.srcElement.nodeName == "INPUT") {
    let currentSlider = event.srcElement.id;
    value = document.getElementById(currentSlider).value;
    const [selectedH2] = $("#" + currentSlider).next();
    switch (value) {
      case "-2":
        selectedH2.textContent = "Discordo";
        break;
      case "-1":
        selectedH2.textContent = "Discordo parcialmente";
        break;
      case "0":
        selectedH2.textContent = "neutro";
        break;
      case "1":
        selectedH2.textContent = "Concordo parcialmente";
        break;
      case "2":
        selectedH2.textContent = "Concordo";
        break;
    }
  }
});
document.querySelector("body").addEventListener("mouseup", function (event) {
  if (event.srcElement.nodeName == "INPUT") {
    let currentSlider = event.srcElement.id;
    value = document.getElementById(currentSlider).value;
    const [selectedH2] = $("#" + currentSlider).next();
    switch (value) {
      case "-2":
        selectedH2.textContent = "Discordo";
        break;
      case "-1":
        selectedH2.textContent = "Discordo parcialmente";
        break;
      case "0":
        selectedH2.textContent = "-";
        break;
      case "1":
        selectedH2.textContent = "Concordo parcialmente";
        break;
      case "2":
        selectedH2.textContent = "Concordo";
        break;
    }
  }
});
// cria o objeto para ser salvo no banco de dados
// no formato: {#ss1: 1, #ss2: -2...}
// caso alguma pergunta n tenha sido preenchida, retorna false
// caso contrario, retorna o objeto
const createObject = () => {
  let result = {};
  for (let i = 1; i <= 20; i++) {
    let currentId = "ss" + i;
    let value = document.querySelector("#" + currentId).value;
    if (value == 0) return false;
    result[currentId] = value;
  }
  console.log(result);
  return result;
};

const sendTest = () => {
  let data = createObject();
  if (data == false) {
    Swal.fire({
      title: "Oops!",
      text: "Preencha todos os campos!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    let userId = document.cookie.split("=")[1];
    data.id = userId;
    const parameters = {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://127.0.0.1:3030/api/sendSoftSkills", parameters);
    window.location.replace("/dashboard");
  }
};
