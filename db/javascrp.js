import Sequelize from 'equelize';

const db = {};

const sequelize = new Sequelize(
  'DATABASE_NAME',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    dialect: 'ysql',
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
  },
);

let models = [];

// Initialize models
models.forEach(model => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(db).forEach(key => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
