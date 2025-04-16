// React component (PriceDisplay.jsx or similar)
import React, {useEffect, useState} from 'react';

export default function BotStatus() {
	const [priceData, setPriceData] = useState('Connecting...');
	const [lastPrice, setLastPrice] = useState(0);
	const [isBullish, setIsBullish] = useState(true);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:5000');

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data) {
				setPriceData(data);
			}
		};

		console.log(priceData)
		return () => socket.close();
	}, []);

	useEffect(() => {
		if (priceData) {
			setLastPrice(prevState => {
				if (prevState > priceData.p) {
					setIsBullish(false)
				}else{
					setIsBullish(true)
				}
				return priceData.p
			});
		}
		console.log(isBullish)
	}, [priceData]);

	return (
		<div className="text-xl font-mono d-flex">
			<ul>
				<li >
					setTLive BTC/USDT: <span className={isBullish ? 'text-green-500' : 'text-red-500'}>${priceData.p}</span>
				</li>
				<li>
					{Date(priceData.t)}
				</li>
			</ul>
		</div>
	);
}
