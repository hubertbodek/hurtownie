const cities = {
	Cracow:
		'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/krakow?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-38%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie&searchingCriteria=cala-polska',
	Warsaw:
		'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/warszawa?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-26%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie&searchingCriteria=cala-polska',
	Gdansk:
		'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/gdansk?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-40%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie',
	Gdynia:
		'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/gdynia?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-206%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie&searchingCriteria=cala-polska',
	Sopot:
		'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/sopot?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-208%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie&searchingCriteria=cala-polska',
	Wroclaw:
		'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/wroclaw?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-39%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie&searchingCriteria=cala-polska',
	Lodz: 'https://www.otodom.pl/pl/oferty/sprzedaz/mieszkanie/lodz?distanceRadius=0&page=1&limit=72&market=ALL&locations=%5Bcities_6-1004%5D&by=DEFAULT&direction=DESC&viewType=listing&lang=pl&searchingCriteria=sprzedaz&searchingCriteria=mieszkanie&searchingCriteria=cala-polska',
} as const;

export type City = keyof typeof cities;
export const getUrlByCity = (city: City) => cities[city];

export default cities;
