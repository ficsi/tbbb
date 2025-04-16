const client = require('./binance');
const { getRSI } = require('./strategy');
const { RSI } = require('technicalindicators');

async function getBotStatus() {

	// client.account().then(res=>{
	// 	console.log(res);
	// });

	const { data } = await client.klines(process.env.TRADE_SYMBOL, '1m', { limit: 100 });
	const closes = data.map(candle => parseFloat(candle[4]));
	const rsi = getRSI(closes);
	const currentPrice = data[data.length - 1][4];
	console.log(currentPrice)
	return {
		currentPrice,
		symbol: process.env.TRADE_SYMBOL,
		currentRSI: rsi,
		timestamp: new Date(),
		rsi: rsi
	};
}

async function manualTrade(action) {
	return {
		action,
		message: 'This is a test — implement real orders here.'
	};
}

module.exports = { getBotStatus, manualTrade };
