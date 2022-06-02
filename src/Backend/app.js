const express = require("express");
const path = require("path");
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
                  res.send("autenticado! cookie set!");
                  res.end();
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
  currentId = curriculum.id;
  delete curriculum.id;
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

app.get("/teste", (req, res) => {
  db.get("SELECT name FROM users WHERE id==3010", (error, response) => {
    res.send(`Seu nome é ${response.name}`);
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
