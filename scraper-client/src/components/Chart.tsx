import React, { useState } from 'react';

import {
	XYPlot,
	VerticalBarSeries,
	VerticalBarSeriesPoint,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	Hint,
} from 'react-vis';

interface AveragePriceByRoomsChartProps {
	data: any[];
}

export default function AveragePriceByRoomsChart({
	data = [],
}: AveragePriceByRoomsChartProps) {
	const [value, setValue] = useState<Record<string, string> | null>(null);

	const rememberValue = (value: VerticalBarSeriesPoint) => {
		const price = value.y;

		if (!price) {
			forgetValue();
			return;
		}

		setValue({ Price: formatCurrency(price) });
	};
	const forgetValue = () => setValue(null);

	return (
		<div className='relative mb-20 pb-16 border-b border-gray-200'>
			<XYPlot
				height={300}
				width={600}
				margin={{ bottom: 70 }}
				xType='ordinal'
				style={{ margin: 'auto' }}
				animation
			>
				<VerticalGridLines />
				<HorizontalGridLines />
				<VerticalBarSeries
					barWidth={0.7}
					data={data}
					onValueMouseOver={rememberValue}
					onValueMouseOut={forgetValue}
				/>
				{value ? <Hint value={value} className='' /> : null}
				<XAxis />
				<YAxis width={100} left={-45} tickFormat={formatNumber} />
			</XYPlot>
		</div>
	);
}

const formatCurrency = (number: number) => {
	return Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	}).format(number);
};

const formatNumber = (number: number) => {
	return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
};
