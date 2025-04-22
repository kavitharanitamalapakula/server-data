const sql = require('mysql2');

let db = sql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: "Kavitha@431",
    database: "usersData"
  }
)
function getData() {
  return new Promise((res, rej) => {
    db.query('SELECT * FROM USERS', (err, results) => {
      if (err) {
        rej(err);
      }
      else {
        res(results);
      }
    })
  })
}

function getDataById(id) {
  return new Promise((res, rej) => {
    db.query('SELECT * FROM USERS WHERE id = ?', [id], (err, results) => {
      if (err) {
        rej(err);
      }
      else {
        res(results);
      }
    })
  })
}

function addData(Email, Password) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (Email, Password) VALUES (?, ?)';
    db.query(query, [Email, Password], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id: results.insertId, Email, Password });
      }
    });
  });
}

function deleteData(id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id = ?', [id], (err, rows, col) => {
      if (err) {
        return reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  addData, getData, deleteData,getDataById
}


