import { City } from '../../../scraper/src/cities';

import CracowStats from '../../../scraper/src/data/Cracow/stats.json';
import GdanskStats from '../../../scraper/src/data/Gdansk/stats.json';
import GdyniaStats from '../../../scraper/src/data/Gdynia/stats.json';
import LodzStats from '../../../scraper/src/data/Lodz/stats.json';
import SopotStats from '../../../scraper/src/data/Sopot/stats.json';
import WarsawStats from '../../../scraper/src/data/Warsaw/stats.json';
import WroclawStats from '../../../scraper/src/data/Wroclaw/stats.json';

const citiesStats: Record<City, any> = {
	Cracow: CracowStats,
	Gdansk: GdanskStats,
	Gdynia: GdyniaStats,
	Lodz: LodzStats,
	Sopot: SopotStats,
	Warsaw: WarsawStats,
	Wroclaw: WroclawStats,
};

export default citiesStats;
