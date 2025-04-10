// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bot = require('./bot/trade');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/status', async (req, res) => {
	const status = await bot.getBotStatus();
	res.json(status);
});

app.post('/trade', async (req, res) => {
	const { action } = req.body; // "buy" or "sell"
	const result = await bot.manualTrade(action);
	res.json(result);
});

app.listen(process.env.PORT, () => {
	console.log(`Bot API running on port ${process.env.PORT}`);
});
