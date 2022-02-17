const {
  NODE_ENV,
  SALT_ROUNDS,
  JWT_SECRET,
  DB_NAME,
} = process.env;

let secrets;

if (NODE_ENV === 'production') {
  secrets = {
    SALT_ROUNDS,
    JWT_SECRET,
    DB_NAME,
  };
} else {
  secrets = {
    SALT_ROUNDS: 10,
    JWT_SECRET: 'dev-secret',
    DB_NAME: '//localhost:27017/moviesdb',
  };
}

module.exports = secrets;
