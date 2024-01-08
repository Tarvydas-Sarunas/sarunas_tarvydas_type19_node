const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkAddUserRegister, checkUserLogin } = require('../middleware');

const usersRouter = express.Router();

const dbTable = 'users';

// routes
// POST /api/auth/register - registruoti vartotoja su name, email, password, role_id
usersRouter.post('/register', checkAddUserRegister, async (req, res) => {
  const { user_name: userName, email, password, role_id: roleId } = req.body;

  // emeilu patikrinimo funkcija
  const controlEmail = await checkEmail(email);

  if (controlEmail) {
    res.status(400).json([{ error: 'Email already exists' }]);
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
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (newUserObj.affectedRows === 1) {
    res.status(201).json('Success');
    return;
  }
  res.status(400).json(newUserObj);
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
usersRouter.post('/login', checkUserLogin, async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM ${dbTable} WHERE email=?`;
  const [rows, error] = await dbQueryWithData(sql, [email]);
  console.log('error ===', error);
  // neradom
  if (rows.length === 0) {
    res.status(400).json([
      {
        error: 'Username or password wrong',
      },
    ]);
    return;
  }
  // jei randam turim patikrinti ar sutampa slaptazodis
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(400).json([
        {
          error: 'Username or password wrong',
        },
      ]);
      return;
    }
    res.json({
      msg: 'Login success',
    });
  }
});

// GET /api/auth/:email - gauti userius
usersRouter.get('/:email', async (req, res) => {
  const userEmail = req.params.email;
  const sql = `SELECT users.user_id, users.user_name, users.email, users.role_id, user_roles.role_name
  FROM users
  JOIN user_roles ON users.role_id = user_roles.role_id
  WHERE users.email = ?`;
  const [shopItemArr, error] = await dbQueryWithData(sql, [userEmail]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(shopItemArr);
});

// export
module.exports = usersRouter;
