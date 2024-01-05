const express = require('express');
const { dbQueryWithData } = require('../helper');

const usersRouter = express.Router();

// routes
// POST /api/auth/register - registruoti vartotoja su name, email, password, role_id
usersRouter.post('/register', async (req, res) => {
  const { user_name: userName, email, password, role_id: roleId } = req.body;
  const newUser = [userName, email, password, roleId];
  const sql = `
  INSERT INTO users (user_name, email, password, role_id)
  VALUES
    (?, ?, ?, ?)
    `;
  const [newUserObj, error] = await dbQueryWithData(sql, newUser);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (newUserObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (newUserObj.affectedRows === 1) {
    res.status(201).json({ msg: 'New user created' });
    return;
  }
  res.json(newUserObj);
});

// POST /api/auth/login - prijungti vartotoja su email ir password
usersRouter.post('/login', async (req, res) => {
  const { user_name: userName, password } = req.body;
  const sql = 'SELECT * FROM `users` WHERE user_name=?';
  const [rows, error] = await dbQueryWithData(sql, [userName]);
  console.log('error ===', error);
  // neradom
  if (rows.length === 0) {
    res.status(400).json({
      msg: 'username or password wrong',
    });
    return;
  }
  // jei randam turim patikrinti ar sutampa slaptazodis
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(400).json({
        msg: 'username or password wrong',
      });
      return;
    }
    res.json({
      msg: 'Login success',
    });
  }
});

// export
module.exports = usersRouter;
