import React, { Suspense } from 'react';
import './styles/index.scss';
import Routes from 'pages/routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import { NAVIGATION, ROUTE_CONFIG } from 'app/config/route';

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={''}>
				<div className="app theme-default">
					<Routes pages={ROUTE_CONFIG}
							navigation={NAVIGATION}/>
				</div>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;