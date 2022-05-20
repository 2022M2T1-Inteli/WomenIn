const express = require("express");
const path = require("path");
const cors = require("cors");
const bp = require("body-parser");
const app = express();
const hostname = "127.0.0.1";
const port = 3030;
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");
app.use(bp.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("../Frontend/"));

app.post("/signup", (req, res) => {
  const infos = req.body;
  console.log(infos.name, infos.email, infos.password);
  db.run(
    `INSERT INTO users(name, email, password) VALUES('${infos.name}', '${infos.email}', '${infos.password}')`,
    (response) => {
      console.log(response);
      if (response == null) {
        res.sendFile(
          path.resolve(
            __dirname + "/../Frontend/usuario/pages/dashboardUser.html"
          )
        );
      } else if (response.code == "SQLITE_CONSTRAINT") res.send("ERRO!");
    }
  );
});

// app.get("/", (req, res) => {
//   console.log("Responding - /");
//   res.sendFile(path.resolve(__dirname + "/../Frontend/index.html"));
// });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
