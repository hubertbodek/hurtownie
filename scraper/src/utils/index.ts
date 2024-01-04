import currency from 'currency.js';

export function getNumberValue(price: string) {
	return currency(price.split(',')[0]).value;
}

export function wait(ms: number) {
	return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}
