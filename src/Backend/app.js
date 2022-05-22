const express = require("express");
const path = require("path");
const cors = require("cors");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const hostname = "127.0.0.1";
const port = 3030;
const sqlite3 = require("sqlite3");
const { stringify } = require("querystring");
const db = new sqlite3.Database("database.db");
app.use(bp.urlencoded({ extended: false }));
app.use(cors());
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
            __dirname + "/../Frontend/usuario/pages/signUpCompleted.html"
          )
        );
      } else if (res2.code == "SQLITE_CONSTRAINT")
        res1.send("ERRO! E-mail já utilizado ou banco de dados ocupado!");
    }
  );
});

app.get("/dashboard", (req, res) => {
  currentId = req.cookies.id;
  if (!currentId) {
    res.sendFile(path.resolve(__dirname + "/../Frontend/index.html"));
    console.log(currentId);
  }
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/usuario/pages/dashboardUser.html")
  );
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
        res.send("email incorreto");
        res.end();
      }
    }
  );
});

app.get("/loginPage", (req, res) => {
  if (req.cookies.id) {
    res.sendFile(
      path.resolve(__dirname + "/../Frontend/usuario/pages/dashboardUser.html")
    );
  }
  res.sendFile(
    path.resolve(__dirname + "/../Frontend/usuario/pages/loginUser.html")
  );
});

app.get("/api/getUserInfo", (req, res) => {
  currentId = req.cookies.id;
  db.get(
    `SELECT * FROM users WHERE id == ${Number(currentId)}`,
    (err, response) => {
      res.send(response);
    }
  );
});

app.get("/index", (req, res) => {
  res.clearCookie("id");
  res.sendFile(path.resolve(__dirname + "/../Frontend/index.html"));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
