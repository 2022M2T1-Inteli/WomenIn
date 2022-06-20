const express = require("express");
const path = require("path");
const match = require("./match.js");
const cors = require("cors");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const hostname = "127.0.0.1";
const port = 3030;
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("../Frontend/"));

app.post("/signup", (req, res1) => {
  const infos = req.body;
  db.run(
    `INSERT INTO users(name, email, password) VALUES('${infos.name}', '${infos.email}', '${infos.password}')`,
    (res2) => {
      if (res2 == null) {
        db.get(
          `SELECT id FROM users WHERE email == '${infos.email}'`,
          (err, res3) => {
            if (err != null)
              res1.send("ERRO! Tivemos um problema em pegar seu ID!");
            else {
              let currentId = res3["id"];
              res1.cookie("id", currentId);
            }
          }
        );
        res1.sendFile(
          path.resolve(
            __dirname + "/../Frontend/usuario/pages/dashboardUser.html"
          )
        );
      } else if (res2.code == "SQLITE_CONSTRAINT")
        res1.send("ERRO! E-mail já utilizado ou banco de dados ocupado!");
    }
  );
});

app.get("/dashboard", (req, res) => {
  currentId = req.cookies;
  if (!currentId.id) {
    res.sendFile(path.resolve(__dirname + "/../Frontend/index.html"));
  } else {
    res.sendFile(
      path.resolve(__dirname + "/../Frontend/usuario/pages/dashboardUser.html")
    );
  }
});

app.post("/login", (req, res) => {
  const infos = req.body;
  console.log(infos.email);
  db.get(
    `SELECT password, id FROM users WHERE email == '${infos.email}'`,
    (error, response) => {
      if (response) {
        console.log(response.password, infos.password);
        if (response.password === infos.password) {
          res.cookie("id", response.id);
          res.sendFile(
            path.resolve(
              __dirname + "/../Frontend/usuario/pages/dashboardUser.html"
            )
          );
        } else {
          res.send("Senha incorreta");
          res.end();
        }
      } else {
        db.get(
          `SELECT id, password, accepted FROM empresas WHERE email == '${infos.email}'`,
          (error, response) => {
            console.log(error);
            if (response) {
              if (response.password === infos.password) {
                if (response.accepted == 1) {
                  res.cookie("id", response.id);
                  res.sendFile(
                    path.resolve(
                      __dirname + "/../Frontend/empresa/pages/dashboard.html"
                    )
                  );
                } else {
                  res.send("Sua empresa aínda não foi aceita!");
                  res.end();
                }
              } else {
                res.send("senha incorreta");
                res.end();
              }
            } else {
              res.send("email incorreto");
              res.end();
            }
          }
        );
      }
    }
  );
});

app.get("/loginPage", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/usuario/pages/loginUser.html")
  );
});

app.post("/api/getUserInfo", (req, res) => {
  currentId = req.body.id;
  db.get(
    `SELECT * FROM users WHERE id == ${Number(currentId)}`,
    (err, response) => {
      console.log(`--> GET api - sent infos of user ${currentId}`);
      res.send(response);
    }
  );
});

app.post("/api/sendSoftSkills", (req, res) => {
  currentId = req.body.id;
  let skills = req.body;
  // delete skills.id;
  let softSkills = JSON.stringify(skills);
  console.log(softSkills);
  console.log(` --> POST received - user ${currentId} softSKills`);
  db.run(
    `UPDATE users SET softSkills = '${softSkills}' WHERE id = ${currentId}`,
    (err, response) => {
      if (err == null) {
        console.log(`--> softSkills of user ${currentId} sent to db`);
      } else console.log("--> db error - " + err);
    }
  );
  res.end();
});

app.get("/skillTest", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/usuario/pages/softSkillsTest.html")
  );
});

app.get("/index", (req, res) => {
  res.clearCookie("id");
  res.sendFile(path.resolve(__dirname + "/../Frontend/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../Frontend/index.html"));
});

app.get("/cadastroEmpresa", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/empresa/pages/cadastroEmpresa.html")
  );
});
app.get("/cadastroCurriculo", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname + "/../Frontend/usuario/pages/cadastroCurriculo.html"
    )
  );
});

app.post("/cadastrarCurriculo", (req, res) => {
  console.log("Posted!");
  let curriculum = req.body;
  // salva o id e a localizacao em variaveis e os deleta do obj curriculum
  currentId = curriculum.id;
  delete curriculum.id;
  let localizacao = curriculum.loc;
  delete curriculum.loc;
  db.run(
    `UPDATE users SET location = '${localizacao}' WHERE id = ${currentId}`,
    (err, response) => {
      if (!err) console.log("--> location OK");
      else console.log("erro com a localização");
    }
  );

  // envia o curriculo para o db
  db.run(
    `UPDATE users SET curriculum = '${JSON.stringify(
      curriculum
    )}' WHERE id = ${currentId}`,
    (err, response) => {
      if (err == null) {
        console.log(`--> curriculum of user ${currentId} sent to db`);
      } else console.log("--> db error - " + err);
    }
  );
  res.end();
});

app.post("/api/cadastrarEmpresa", (req, res) => {
  console.log("--> received new POST - cadastrarEmpresa");
  data = req.body;
  db.run(
    `INSERT INTO empresas(name, email, password) VALUES('${data.name}','${data.email}','${data.password}')`,
    (err) => {
      if (err == null) {
        console.log(
          `--> nenhum erro. '${data.name}' inserida no banco de dados.`
        );
      } else {
        console.log("--> ERRO!", err);
      }
    }
  );
});
app.post("/api/editarEmpresa", (req, res) => {
  console.log(req.body);
  var data = req.body;
  // var info = req.body.id;
  db.run(
    `UPDATE empresas SET (profileName, bio, website, companyState, companyCity) = ('${data.name}', '${data.bio}', '${data.website}', '${data.estado}','${data.cidade}') WHERE id = ${data.id}`,
    (err) => {
      if (err == null) {
        console.log(
          `--> nenhum erro. '${data.name}' inserida no banco de dados.`
        );
      } else {
        console.log("--> ERRO!", err);
      }
    }
  );
});

app.post("/api/getEmpresaInfo", (req, res) => {
  currentId = req.body.id;
  console.log("oi");
  db.get(`SELECT * FROM empresas WHERE id == ${currentId}`, (err, response) => {
    console.log(`--> GET api - sent infos of empresas ${currentId}`);
    res.send(response);
  });
});

app.get("/editarEmpresa", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname + "/../Frontend/empresa/pages/editarPerfilEmpresa.html"
    )
  );
});
app.get("/empresa", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/empresa/pages/dashboard.html")
  );
});

app.post("/api/enviarVaga", (req, res) => {
  let data = req.body;
  db.run(
    `INSERT INTO vagas(idEmpresa, jobTitle, description, jobType, jobTime, jobState, jobCity, neededSkills, hardSkills, academicFormation) VALUES('${data.idEmpresa}','${data.name}','${data.descricao}','${data.tipo}','${data.horario}','${data.estado}','${data.cidade}','${data.ss}', '${data.hardSkills}', '${data.formacao}')`,
    (err) => {
      if (err == null) {
        console.log(
          `--> nenhum erro. '${data.name}' inserida no banco de dados.`
        );
      } else {
        console.log("--> ERRO!", err);
      }
    }
  );
});

app.get("/cadastrarVaga", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/empresa/pages/cadastroVagas.html")
  );
});

app.get("/dashboardEmpresa", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/empresa/pages/dashboard.html")
  );
});

app.get("/api/puxarVagas", async (req, res) => {
  currentId = req.cookies.id;
  if (currentId >= 3000) {
    const infos = await match.match(req);
    res.send(infos);
  } else {
    res.send("ERRO! ID não identificado ou ID de não-usuario");
  }
});

app.get("/vagasDisponiveis", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/usuario/pages/vagasDisponiveis.html")
  );
});

app.post("/sendPhotoUrl", (req, res) => {
  const infos = req.body;
  const currentId = req.cookies.id;
  console.log(currentId);
  db.run(
    `UPDATE users SET (photoUrl) = ('${infos.photoUrl}') WHERE id = ${currentId}`
  );
});
app.get("/minhasVagas", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/usuario/pages/minhasVagas.html")
  );
});
app.get("/api/apply", (req, res) => {
  res.send("oi");
});

app.post("/api/apply", (req, res) => {
  console.log("oioioioi");
  userId = req.body.userid;
  vagaId = req.body.vagaid;
  console.log(vagaId, userId);
  // db.get(`SELECT * FROM empresas WHERE id == ${currentId}`, (err, response) => {
  //   console.log(`--> GET api - sent infos of empresas ${currentId}`);
  //   res.send(response);
  // });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
