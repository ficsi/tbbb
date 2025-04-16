const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 5000}, () => {
	console.log('WebSocket server started on port 5000');
});

let pair = 'btcusdt';
const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
let latestMessage = null;


binanceSocket.onmessage = (event) => {
	latestMessage = JSON.parse(event.data);

};

binanceSocket.onopen = (e) => {
	console.log('Open Binance ws connection!');

}

binanceSocket.onerror = (err) => {
	console.error('❌ Binance WS Error:', err.message);
};

setInterval(() => {
	if (!latestMessage) {
		return;
	}
	wss.clients.forEach(client=>{
		if(client.readyState === WebSocket.OPEN) {
			console.log(latestMessage)
			client.send(JSON.stringify(latestMessage));
		}

	})
	console.log('📤 Sent trade data:', latestMessage);
	latestMessage = null; // Clear after sending

}, 3000);

wss.on('connection', (ws) => {
	console.log('Frontend client has connected!');
})