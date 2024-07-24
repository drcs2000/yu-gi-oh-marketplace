import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'card_marketplace',
  dialect: 'postgres',
  username: 'card_user',
  password: 'yourpassword',
  models: [__dirname + '/../models'], // or [Player, Team],
});

export default sequelize;
