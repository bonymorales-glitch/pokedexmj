import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setType } from '../../store/slices/filters.slice';
import { useGetTypesQuery } from '../../services/pokemon.api';

const TypeSelect = () => {
	const dispatch = useAppDispatch();
	const type = useAppSelector((s) => s.filters.type);

	const { data, isLoading } = useGetTypesQuery();

	return (
		<select
			value={type}
			onChange={(e) => dispatch(setType(e.target.value))}
			className="border rounded px-2 py-2 shadow-gray-700 shadow-2xs hover:scale-105 cursor-pointer"
		>
			<option value="allPokemons">Todos los pokemones</option>
			{isLoading && <option>Loading...</option>}
			{data?.results.map((t) => (
				<option key={t.url} value={t.url}>
					{t.name}
				</option>
			))}
		</select>
	);
};
export default TypeSelect;
