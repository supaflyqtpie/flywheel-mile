import db from '../models/index';

export function setupDB() {
  return db.sequelize.drop({ logging: false, cascade: true }).then(() =>
    db.sequelize.sync({ logging: false }).then(() => (db.user.saltRounds = 1))
  );
}
