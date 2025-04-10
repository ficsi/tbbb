const client = require('./binance');
const { getRSI } = require('./strategy');
const { RSI } = require('technicalindicators');

async function getBotStatus() {
	const { data } = await client.klines(process.env.TRADE_SYMBOL, '1m', { limit: 100 });
	const closes = data.map(candle => parseFloat(candle[4]));
	const rsi = getRSI(closes);
	console.log(rsi)
	return {
		symbol: process.env.TRADE_SYMBOL,
		currentRSI: rsi[rsi.length - 1],
		timestamp: new Date()
	};
}

async function manualTrade(action) {
	return {
		action,
		message: 'This is a test — implement real orders here.'
	};
}

module.exports = { getBotStatus, manualTrade };
