import PageContainer from '../components/layout/PageContainer';
import SearchBar from '../components/pokedex/SearchBar';
import TypeSelect from '../components/pokedex/TypeSelect';
import PaginationBar from '../components/pokedex/PaginationBar';
import { useAppSelector } from '../store/hooks';
import {
	useGetPokemonListQuery,
	useGetPokemonByTypeQuery,
	useGetAllPokemonQuery,
} from '../services/pokemon.api';
import PokeCard from '../components/pokedex/PokeCard';
import type { PokemonListItem } from '../types/pokemon.interface';

const PokedexPage = () => {
	const trainer = useAppSelector((s) => s.trainer);
	const { search, type, page, pageSize } = useAppSelector((s) => s.filters);

	const offset = (page - 1) * pageSize;

	const shouldFetchAll = search.length > 0;

	const listQuery = useGetPokemonListQuery(
		{ limit: pageSize, offset },
		{ skip: type !== 'allPokemons' || shouldFetchAll },
	);

	const allPokemonQuery = useGetAllPokemonQuery(undefined, {
		skip: !shouldFetchAll || type !== 'allPokemons',
	});

	const typeQuery = useGetPokemonByTypeQuery(type, {
		skip: type === 'allPokemons',
	});

	const isLoading =
		listQuery.isLoading || typeQuery.isLoading || allPokemonQuery.isLoading;
	const error = listQuery.error || typeQuery.error || allPokemonQuery.error;

	let allResults: PokemonListItem[] = [];

	if (type === 'allPokemons') {
		allResults = shouldFetchAll
			? allPokemonQuery.data?.results || []
			: listQuery.data?.results || [];
	} else {
		allResults = typeQuery.data?.pokemon.map((p) => p.pokemon) || [];
	}

	const filtered = search
		? allResults.filter((p: PokemonListItem) => p.name.includes(search))
		: allResults;

	const paginatedResults = search
		? filtered.slice(offset, offset + pageSize)
		: filtered;

	const totalCount = search
		? filtered.length
		: type === 'allPokemons'
		? listQuery.data?.count || 0
		: filtered.length;

	return (
		<PageContainer>
			<img src="./image/cabezapoke.png" alt="imagen encabezado" />
			<p className="text-2xl"><span className='text-red-600'>Bienvenido(@) {trainer}</span>, aquí  podrás encontrar tu pokemón favorito.</p>

			<div className="flex flex-wrap gap-4 items-center justify-center mt-4">
				<SearchBar />
				<TypeSelect />
				
			</div>

			{isLoading && <p className="mt-6">Loading pokémon...</p>}
			{error && <p className="text-red-600 mt-6">Error cargando data</p>}
			{!isLoading && !paginatedResults.length && (
				<p className="mt-6">No coincide ningun Pokémon.</p>
			)}
			<section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
				{paginatedResults.map((pokemon: PokemonListItem) => (
					<PokeCard key={pokemon.name} pokemon={pokemon} />
				))}
			</section>
			<PaginationBar totalCount={totalCount} />
		</PageContainer>
	);
};
export default PokedexPage;
