const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

function match(req) {
  let currentId = req.cookies.id;
  console.log(currentId);
  db.all("SELECT * FROM vagas", (err, responseDB) => {});
}

module.exports = {
  match,
};
