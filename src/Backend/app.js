const express = require("express");
const path = require("path");
const cors = require("cors");
const bp = require("body-parser");
const app = express();
const hostname = "127.0.0.1";
const port = 3030;
const sqlite3 = require("sqlite3");
const { stringify } = require("querystring");
const db = new sqlite3.Database("database.db");
app.use(bp.urlencoded({ extended: false }));
app.use(cors());
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
              res1.cookie("name", currentId);
              console.log(String(currentId));
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
  console.log("!!!!!!!!!!!!!");
  res.send("ok!");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
