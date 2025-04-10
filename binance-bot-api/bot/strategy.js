const { RSI } = require('technicalindicators');

function getRSI(closes, period = 14) {
	const result = RSI.calculate({ values: closes, period });
	return result[result.length - 1]; // return last RSI value
}

module.exports = {
	getRSI,
};