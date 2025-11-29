import { useParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { useGetPokemonByNameQuery } from '../services/pokemon.api';

const PokeInfoPage = () => {
	const { name } = useParams();

	const { data, isLoading, error } = useGetPokemonByNameQuery(name || '', {
		skip: !name,
	});
	return (
		<PageContainer>
			<img src="./image/cabezapoke.png" alt="imagen encabezado" />
			<div className="relative shadow-gray-500 min-h-[60vh] flex flex-col items-center justity-center bg-white/40 p-6 rounded-lg shadow-lg mt-4">
			<div className='bg-green-400 w-full h-30 opacity-20 rounded-2xl'> </div>
			{isLoading && <p>Cargando..</p>}
			{error && <p className="text-red-600">Error cargando Pokémon</p>}
			{data && (
				<article className="space-y-4 flex flex-col items-center mt-6">
					<img
						src={data.sprites.other?.['official-artwork']?.front_default}
						alt={data.name}
						className="w-48 absolute -top-12"
					/>
					
					<h2 className="text-4xl font-bold capitalize mb-4">{data.name}</h2>
					<div className='flex justify-between mt-2 px-2'>
						<h3 className="text-lg font-bold uppercase text-red-600 ">Types: </h3>
						<ul className="flex gap-2 text-sm">
							{data.types.map((type) => (
								<li
									key={type.type.url}
									className="ml-2 px-2 py-1 bg-slate-800 text-white rounded capitalize"
								>
									{type.type.name}
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold uppercase text-red-600">Stats</h3>
						<ul className="text-sm grid grid-cols-2 gap-2">
							{data.stats.map((stat) => (
								<li
									key={stat.stat.url}
									className="border-b-2 p-3 flex justify-between"
								>
									<span className='text-lg font-semibold'>{stat.stat.name}:</span>
									<span className="text-lg font-mono">{stat.base_stat}</span>
								</li>
							))}
						</ul>
					</div>
				</article>
			)}
			</div>
		</PageContainer>
	);
};

export default PokeInfoPage;
