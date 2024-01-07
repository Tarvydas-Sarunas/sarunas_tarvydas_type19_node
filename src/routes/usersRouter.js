const express = require('express');
const { dbQueryWithData } = require('../helper');

const usersRouter = express.Router();

const dbTable = 'users';

// routes
// POST /api/auth/register - registruoti vartotoja su name, email, password, role_id
usersRouter.post('/register', async (req, res) => {
  const { user_name: userName, email, password, role_id: roleId } = req.body;

  console.log('Before checkEmail call');
  const controlEmail = await checkEmail(email);
  console.log('Check email result:', controlEmail);
  console.log('After checkEmail call');
  if (controlEmail) {
    res.status(400).json({ msg: 'Email already exists' });
    return;
  }
  const newUser = [userName, email, password, roleId];
  const sql = `
  INSERT INTO ${dbTable} (user_name, email, password, role_id)
  VALUES
    (?, ?, ?, ?)
    `;
  console.log('Before insert user call');
  const [newUserObj, error] = await dbQueryWithData(sql, newUser);
  console.log('After insert user call');
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

async function checkEmail(emailForCheck) {
  // tikriname email is db su count
  const sql = `SELECT COUNT(*) as count FROM ${dbTable} WHERE email = ?`;
  const [result, error] = await dbQueryWithData(sql, [emailForCheck]);

  // jei klaida
  if (error) {
    console.error('Error checking email existence:', error);
    return false;
  }

  // jei resultats daugiau uz 0 gauname true
  return result[0].count > 0;
}

// POST /api/auth/login - prijungti vartotoja su email ir password
usersRouter.post('/login', async (req, res) => {
  console.log('Received login request:', req.body);

  const { email, password } = req.body;
  const sql = `SELECT * FROM ${dbTable} WHERE email=?`;
  const [rows, error] = await dbQueryWithData(sql, [email]);
  console.log('error ===', error);
  console.log('rows ===', rows);
  // neradom
  if (rows.length === 0) {
    res.status(400).json({
      msg: 'username or password wrong name',
    });
    return;
  }
  // jei randam turim patikrinti ar sutampa slaptazodis
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(400).json({
        msg: 'username or password wrong pass',
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
