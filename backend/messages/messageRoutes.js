const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'main'
});

// Get all messages for a user
router.get('/:application_id', (req, res) => {
  const { application_id } = req.params;
  db.query(
    'SELECT * FROM messages WHERE application_id = ? ORDER BY created_at ASC',
    [application_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

// Send a new message
router.post('/', (req, res) => {
  const { application_id, sender, message } = req.body;
  if (!application_id || !sender || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  db.query(
    'INSERT INTO messages (application_id, sender, message) VALUES (?, ?, ?)',
    [application_id, sender, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ id: result.insertId, application_id, sender, message });

      // Send automated response
      const automatedMessage = "Thank you for reaching out, the administrator is unavailable at the moment and will get back to you at 24-48 business hours. For general inquiries, please visit our FAQ page. If you require assistance, kindly refer to the school's support page at ptcoams.help.support.";
      
      db.query(
        'INSERT INTO messages (application_id, sender, message) VALUES (?, ?, ?)',
        [application_id, 'system', automatedMessage],
        (autoErr) => {
          if (autoErr) console.error('Error sending automated message:', autoErr);
        }
      );
    }
  );
});

module.exports = router;
