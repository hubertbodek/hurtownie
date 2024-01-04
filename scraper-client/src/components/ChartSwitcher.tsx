import { useState } from 'react';

import citiesMap, { City } from '../../../scraper/src/cities';
import citiesStats from '../data/citiesStats';
import Chart from './Chart';

const cities = Object.keys(citiesMap) as City[];
const priceByCityData = cities.map((city) => ({
	x: city,
	y: citiesStats[city].averagePricePerMeter,
}));

export default function ChartSwitcher() {
	const [activeCity, setActiveCity] = useState<City>('Cracow');
	return (
		<div>
			<select onChange={(e) => setActiveCity(e.target.value as City)}>
				{cities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>
			<h3 className='text-3xl mb-6 text-center'>
				Price by rooms amount in {activeCity}
			</h3>
			<Chart data={dataToAxis(citiesStats[activeCity].averagePriceByRooms)} />
			<h3 className='text-3xl mb-6 text-center'>
				Price per meter in each city
			</h3>
			<Chart data={priceByCityData} />
		</div>
	);
}

function dataToAxis<T extends {}>(data: T) {
	const entries = Object.entries(data);

	return entries.map((entry) => ({ x: entry[0], y: entry[1] }));
}
