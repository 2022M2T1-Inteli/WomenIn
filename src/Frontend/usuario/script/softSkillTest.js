const slidersArr = document.getElementsByClassName("form-range");

document.querySelector("body").addEventListener("touchend", function (event) {
  if (event.srcElement.nodeName == "INPUT") {
    let currentSlider = event.srcElement.id;
    value = document.getElementById(currentSlider).value;
    console.log(currentSlider, value);
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
