require('dotenv').config();
const { Spot } = require('@binance/connector');

const client = new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_API_SECRET, {
	baseURL: 'https://testnet.binance.vision', // use testnet for now
});

module.exports = client;
