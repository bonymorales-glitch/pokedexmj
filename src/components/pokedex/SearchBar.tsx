import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSearch } from '../../store/slices/filters.slice';
import { useDebounce } from '../../hooks/useDebounce';

const SearchBar = () => {
	const dispatch = useAppDispatch();

	const [local, setLocal] = useState('');

	const debounced = useDebounce(local, 400);

	useEffect(() => {
		dispatch(setSearch(debounced));
	}, [debounced, dispatch]);

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="flex gap-2 items-center "
		>
			<input
				value={local}
				onChange={(e) => setLocal(e.target.value.toLowerCase())}
				className="border rounded px-3 py-2 flex-1 shadow-gray-700 shadow-2xs hover:scale-105"
				placeholder="Busca un pokemon"
			/>
		</form>
	);
};
export default SearchBar;
