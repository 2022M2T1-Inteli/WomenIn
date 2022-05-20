const { get } = require("express/lib/response");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./Backend/database.db");

const cadastrar = () => {
  document.querySelector("#name").value;
  document.querySelector("#email").value;
  document.querySelector("#password").value;
};

db.run("INSERT INTO users(name) VALUES('paulera')");
