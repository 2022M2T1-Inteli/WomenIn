// alert("oi");
function enviar() {
  let arr = [];
  for (let i = 1; i <= 10; i++) {
    let str = "ss" + i;
    console.log(str);
    if (document.getElementById(str).checked) {
      arr.push(str);
    }
    if (arr.length > 4) alert("erro!!!!");
    else "certo!";
  }
}
