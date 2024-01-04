import { useState } from 'react';
import './index.css';

import ChartSwitcher from './components/ChartSwitcher';

function App() {
	const [count, setCount] = useState(0);

	return (
		<main className='min-h-screen flex items-center justify-center py-20'>
			<ChartSwitcher />
		</main>
	);
}

export default App;
