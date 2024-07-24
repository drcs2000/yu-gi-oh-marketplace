import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import cardRoutes from './routes/cardRoutes';
import tradeRoutes from './routes/tradeRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/trades', tradeRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
