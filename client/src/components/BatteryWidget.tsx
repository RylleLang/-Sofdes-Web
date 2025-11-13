import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function BatteryWidget() {
	const [battery, setBattery] = useState<number>(85);

	useEffect(() => {
		const db = getDatabase();
		const robotRef = ref(db, '/robot');
		onValue(robotRef, (snapshot) => {
			const data = snapshot.val();
			if (data && data.battery !== undefined) {
				setBattery(data.battery);
			}
		});
	}, []);

	const getBatteryColor = (level: number): string => {
		if (level >= 71) return 'green';
		if (level >= 31) return 'yellow';
		if (level >= 16) return 'orange';
		return 'red';
	};

	return (
		<div className={`widget dark battery-widget ${getBatteryColor(battery)}`}>
			<h1>Battery Level</h1>
			<p>{battery}%</p>
		</div>
		);
	}

export default BatteryWidget;