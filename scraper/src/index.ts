import getData, { writeData } from './scrape';
import citiesOptions, { City } from './cities';

const getDataByPagesAmount = async (city: City, pageAmount: number) => {
	const citySummary: unknown[] = [];
	const citySortedByRooms: Record<number, number[]> = {};
	const cityPricesPerMeter: number[] = [];

	const pages = Array.from(Array(pageAmount).keys());

	for (const page of pages) {
		const data = await getData(city, page + 1);

		citySummary.push(data.posts);
		cityPricesPerMeter.push(...data.pricesPerMeter);

		Object.entries(data.sortedByRooms).forEach(([roomAmount, prices]) => {
			const key = Number(roomAmount);
			citySortedByRooms[key] = prices;
		});
	}

	writeData(city, citySummary, citySortedByRooms, cityPricesPerMeter);
};

const PAGE_AMOUNT = 3;
const cities = Object.keys(citiesOptions) as City[];

// Get apartments data and write to json files
cities.forEach((city) => {
	getDataByPagesAmount(city, PAGE_AMOUNT);
});
