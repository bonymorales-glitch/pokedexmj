import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { lazy, Suspense } from 'react';
import ProtectedRoutes from './router/ProtectedRoutes';

const PokedexPage = lazy(() => import('./pages/PokedexPage'));
const PokeInfoPage = lazy(() => import('./pages/PokeInfoPage'));

function App() {
	return (
		<Suspense fallback={<p>Loading Page...</p>}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/pokedex" element={<PokedexPage />} />
					<Route path="/pokemon/:name" element={<PokeInfoPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
