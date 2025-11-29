import { useNavigate } from 'react-router-dom';
import type {PokemonListItem } from '../../types/pokemon.interface';

interface PokeCardProps {
	pokemon: PokemonListItem;
}

const extractPokemonId = (url: string): string => {
	const matches = url.match(/\/pokemon\/(\d+)\//);
	return matches ? matches[1] : '1';
};

const PokeCard = ({ pokemon }: PokeCardProps) => {
	const navigate = useNavigate();

	const pokemonId = extractPokemonId(pokemon.url);
	const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

	return (
		<article
			onClick={() => navigate(`/pokemon/${pokemon.name}`)}
			className="border-l-4 border-t-4 border-gray-400 shadow-lg shadow-gray-500 hover:scale-125 border-2 bg-linear-to-t from-red-200 via-white/30 to-black/25 rounded p-4 cursor-pointer hover:shadow-sm transition"
		>
			
			<img
				src={imageUrl}
				alt={pokemon.name}
				className="w-40 h-40 mx-auto"
				onError={(e) => {
					e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
				}}
			/>
			<div className='bg-white text-center rounded-2xl p-2 mt-2 border-l-4 border-t-2 border-gray-400 shadow-lg shadow-gray-500'>
				<h3 className="text-2xl capitalize font-semibold">{pokemon.name}</h3>
				<p className="text-xs text-slate-500">Ver Detalles</p>
			</div>
		</article>
	);
};
export default PokeCard;
