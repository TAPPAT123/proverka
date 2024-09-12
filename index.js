const express = require('express');
const { MongoClient } = require('mongodb');
const { ServerlessFunction } = require('@yandex-cloud/function-types');

// Строка подключения к MongoDB (ЗАМЕНИ НА СВОЮ!)
const uri = process.env.MONGODB_URI || "mongodb://<user1>:<David990.>@rc1d-an5jq9ibsru3gh8m.mdb.yandexcloud.net>:<27018>/<db1>?authSource=admin"; 
const client = new MongoClient(uri);

const app = express();

// Парсинг JSON в запросах
app.use(express.json());

// Обработчик запросов на получение баланса пользователя
app.get('/api/users/:telegramId/balance', async (req, res) => {
  try {
    const telegramId = parseInt(req.params.telegramId, 10); 

    await client.connect();
    const db = client.db('bd1');
    const collection = db.collection('user1');

    const user = await collection.findOne({ telegramId });

    if (user) {
      res.json({ balance: user.balance });
    } else {
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при получении баланса:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  } finally {
    await client.close(); 
  }
});

// Создаем бессерверную функцию
module.exports.handler = ServerlessFunction((req, res) => {
  // Запускаем Express внутри бессерверной функции
  app(req, res);
});
