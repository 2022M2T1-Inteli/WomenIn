const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

function match(req) {
  console.log("\n--------> funcao match chamada <----------");
  let currentId = req.cookies.id;
  console.log("id do usuário -> " + currentId);
  db.all("SELECT * FROM vagas", (err, resVaga) => {
    db.get(
      `SELECT softSkills FROM users WHERE id==${currentId}`,
      (err2, resSS) => {
        // Agora temos as infos de todas as vagas e as softSkills do usuario
        let arrVagas = [];
        let qntdVagas = resVaga.length;
        let userSS = JSON.parse(resSS.softSkills);
        for (let i = 0; i < qntdVagas; i++) {
          let neededSkills = resVaga[i].neededSkills;
          let arrNeededSkills = neededSkills.split(",");
          let notaSS = 0;
          console.log("----------------vaga " + i);
          let somatorio = 0;
          for (let x of arrNeededSkills) {
            console.log(`${x} -> ${userSS[x]}`);
            somatorio += Number(userSS[x]);
          }
          let notaMaxima = arrNeededSkills.length * 4;
          let x = (somatorio / notaMaxima) * 100;
          let porcentagemMatch = x.toFixed(0);
          console.log("-->MATCH DE " + porcentagemMatch + "%!");
          arrVagas.push(`${i} ${porcentagemMatch}`);
        }
        console.log(
          `\n---> Todas as ${resVaga.length} vagas avaliadas! <---\n\nOrdem: (index porcentagem)`
        );
        //fiz uma função sort de array personalizada, já que o array não contem apenas números
        let arrOrdenadoVagas = arrVagas.sort((a, b) => {
          return b.split(" ")[1] - a.split(" ")[1];
        });
        console.log(arrOrdenadoVagas + "\n");
        // agora já fizemos a porcentagem de todas as vagas e criamos
        // um array ordenado com o index de cada vaga e a porcentagem.
        // agora vamos formar a resposta para enviar
        let arrFinal = [];
        for (let i of arrOrdenadoVagas) {
          let [index, porcentagem] = i.split(" ");
          index = Number(index);
          resVaga[index].porcentagem = porcentagem;
          arrFinal.push(resVaga[index]);
        }
        console.log("---> JSON final:\n\n" + JSON.stringify(arrFinal));
      }
    );
  });
}

module.exports = {
  match,
};
