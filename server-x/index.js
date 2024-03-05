const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());


const pool = new Pool({
  user: 'postgres',
  password: '94072',
  host: 'localhost',
  port: 5432,
  database: 'busket_buddy',
});

// Endpoint for user registration #
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get user information #
app.get('/users/:user_id', async (req, res) => {
    try {
      const { user_id } = req.params;
      const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  



// Endpoint to get all user items
app.get('/user_items/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query('SELECT * FROM user_items WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to post a new user item
app.post('/user_items/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { description } = req.body;
    const newItem = await pool.query(
      'INSERT INTO user_items (user_id, description) VALUES ($1, $2) RETURNING *',
      [user_id, description]
    );
    res.json(newItem.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to create a new group
app.post('/groups', async (req, res) => {
  try {
    const { group_name } = req.body;
    const newGroup = await pool.query(
      'INSERT INTO groups (group_name) VALUES ($1) RETURNING *',
      [group_name]
    );
    res.json(newGroup.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to join a group
app.post('/groups/:group_id/members/:user_id', async (req, res) => {
  try {
    const { group_id, user_id } = req.params;
    const joinedGroup = await pool.query(
      'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) RETURNING *',
      [group_id, user_id]
    );
    res.json(joinedGroup.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get all group items
app.get('/groups/:group_id/items', async (req, res) => {
  try {
    const { group_id } = req.params;
    const result = await pool.query(
      'SELECT shared_items.*, users.username AS member_username FROM shared_items ' +
      'JOIN user_members ON shared_items.member_id = user_members.member_id ' +
      'JOIN users ON shared_items.user_id = users.user_id ' +
      'WHERE user_members.group_id = $1',
      [group_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to post a new group item
app.post('/groups/:group_id/items/:user_id', async (req, res) => {
  try {
    const { group_id, user_id } = req.params;
    const { member_id, description } = req.body;
    const newItem = await pool.query(
      'INSERT INTO shared_items (user_id, member_id, description) VALUES ($1, $2, $3) RETURNING *',
      [user_id, member_id, description]
    );
    res.json(newItem.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
