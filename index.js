const express = require('express');
const db = require("./db");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  db.getData()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.deleteData(userId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.getDataById(userId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post('/users', (req, res) => {
  const { Email, Password } = req.body;
  db.addData(Email, Password)
    .then(result => {
      console.log('User added:', result);
      res.status(200).json({ message: 'User added successfully', user: result });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
