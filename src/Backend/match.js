const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function match(req) {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  console.log("\n--------> funcao match chamada <----------");
  let currentId = req.cookies.id;
  console.log("id do usuário -> " + currentId);

  const resVaga = await db.all("SELECT * FROM vagas");

  const userSS = await db.get(
    `SELECT softSkills FROM users WHERE id==${currentId}`
  );

  const jsonSoftSkills = JSON.parse(userSS.softSkills);

  // Agora temos as infos de todas as vagas e as softSkills do usuario
  let arrVagas = [];
  let qntdVagas = resVaga.length;

  for (let i = 0; i < qntdVagas; i++) {
    let neededSkills = resVaga[i].neededSkills;
    let arrNeededSkills = neededSkills.split(",");
    let notaSS = 0;
    console.log("----------------vaga " + i);
    let somatorio = 0;
    for (let x of arrNeededSkills) {
      console.log(`${x} -> ${jsonSoftSkills[x]}`);
      somatorio += Number(jsonSoftSkills[x]);
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
  return JSON.stringify(arrFinal);
}

module.exports = {
  match,
};
