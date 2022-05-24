const express = require("express");
const { Router } = require("express");
const router = express.Router;
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

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
            __dirname + "/../../Frontend/usuario/pages/signUpCompleted.html"
          )
        );
      } else if (res2.code == "SQLITE_CONSTRAINT")
        res1.send("ERRO! E-mail já utilizado ou banco de dados ocupado!");
    }
  );
});

module.exports = router;
