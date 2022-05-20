const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./Backend/database.db");

db.get("SELECT email FROM users WHERE name == 'Paulo'", (err, res) => {
  console.log(res, err);
});
db.run("INSERT INTO users(name) VALUES('paulera')", (res) => console.log(res));
