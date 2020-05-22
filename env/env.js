const env = {
    database: 'api_mis',
    username: 'root',
    password: '0bo9okdki',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;
  