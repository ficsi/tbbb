// index.js (Node.js backend)
const WebSocket = require('ws');
const axios = require('axios');

// Create WebSocket server for frontend clients
const wss = new WebSocket.Server({ port: 5000 }, () =>
	console.log("WebSocket server started on port 3001")
);

// Subscribe to Binance WebSocket for BTC/USDT price updates
const binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
// When price updates come from Binance
binanceSocket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	console.log(data)

	const price = parseFloat(data.p).toFixed(2);

	// Broadcast to all connected clients
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ price }));
		}
	});
};

binanceSocket.onopen = () => console.log('Connected to Binance WebSocket');
binanceSocket.onerror = (err) => console.error('Binance WS error:', err);
