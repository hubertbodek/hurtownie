import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

import { getNumberValue, wait } from './utils';
import { City, getUrlByCity } from './cities';
import { writeFile } from './utils/writeFile';

function processData(data: string, city: City) {
	console.log(`Processing ${city}...`);
	const $ = cheerio.load(data);

	const posts: unknown[] = [];
	const offers = $('[data-cy="listing-item"]');
	const sortedByRooms: Record<number, number[]> = {};
	const pricesPerMeter: number[] = [];

	offers.each((i, element) => {
		const priceText = $(element).find($('span.css-s8wpzb')).eq(0).text();
		const pricePerMeterText = $(element)
			.find($('span.css-s8wpzb'))
			.eq(1)
			.text();
		const roomsText = $(element).find($('span.css-s8wpzb')).eq(2).text();
		const metresText = $(element).find($('span.css-s8wpzb')).eq(3).text();
		const href = $(element)
			.find($('[data-cy="listing-item-link"]'))
			.prop('href');

		const price = getNumberValue(priceText);
		const rooms = getNumberValue(roomsText);
		const pricePerMeter = getNumberValue(pricePerMeterText);

		if (price === 0) {
			return;
		}

		posts.push({
			title: $(element).find($('[data-cy="listing-item-title"]')).text(),
			price: getNumberValue(priceText),
			rooms: getNumberValue(roomsText),
			metres: getNumberValue(metresText),
			pricePerMeter: pricePerMeter,
			city,
			href,
		});

		if (rooms in sortedByRooms) {
			sortedByRooms[rooms].push(price);
		} else {
			sortedByRooms[rooms] = [price];
		}

		pricesPerMeter.push(pricePerMeter);
	});

	console.log(`${city} Complete`);

	return { posts, sortedByRooms, pricesPerMeter };
}

export function writeData(
	city: string,
	summaryData: any[],
	sortedByRoomsData: Record<number, number[]>,
	cityPricesPerMeter: number[]
) {
	writeFile(
		`./src/data/${city}/all.json`,
		JSON.stringify(summaryData),
		console.error
	);

	const averagePriceByRooms: Record<number, number> = {};

	Object.entries(sortedByRoomsData).forEach(([roomAmount, prices]) => {
		averagePriceByRooms[Number(roomAmount)] = getAverage(prices);
	});

	const averagePricePerMeter = getAverage(cityPricesPerMeter);

	const stats = { averagePriceByRooms, averagePricePerMeter };

	writeFile(
		`./src/data/${city}/stats.json`,
		JSON.stringify(stats),
		console.error
	);
}

async function getData(city: City, pageNumber = 1) {
	const url = getUrlByCity(city);
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	const urlObj = new URL(url);
	urlObj.searchParams.set('page', String(pageNumber));

	const desitnation = urlObj.toString();

	console.log('DESTINATION URL =========================\n', desitnation);

	await page.goto(desitnation);

	const bodyHandle = await page.$('body');
	let height = 100;

	if (bodyHandle) {
		const boundingBox = await bodyHandle.boundingBox();
		height = boundingBox ? boundingBox.height : 100;
		await bodyHandle.dispose();
	}

	// Scroll one viewport at a time, pausing to let content load
	const viewport = page.viewport();

	const viewportHeight = viewport ? viewport.height : 1000;
	let viewportIncr = 0;
	while (viewportIncr + viewportHeight < height) {
		await page.evaluate((_viewportHeight) => {
			//@ts-ignore
			window.scrollBy(0, _viewportHeight);
		}, viewportHeight);
		await wait(20);
		viewportIncr = viewportIncr + viewportHeight;
	}

	await page.evaluate(() => {
		//@ts-ignore
		window.scrollTo(0, 0);
	});

	const data = await page.content();
	await browser.close();
	return processData(data, city);
}

const getAverage = (prices: number[]) => {
	const sum = prices.reduce((prev, next) => prev + next, 0);

	return Math.ceil(sum / prices.length);
};

export default getData;
