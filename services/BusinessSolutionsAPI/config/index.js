require('dotenv').config();

module.exports = {
    secret: 'budgetsecret',
    session: { session: false },
    database: 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+process.env.DB_HOST
  }
  