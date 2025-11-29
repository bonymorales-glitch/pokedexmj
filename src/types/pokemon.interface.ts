export interface PokemonListItem {
	name: string;
	url: string;
}
export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
}
export interface PokemonTypeEntry {
	slot: number;
	type: { name: string; url: string };
}
export interface PokemonStatEntry {
	base_stat: number;
	stat: { name: string; url: string };
}

export interface PokemonDetail {
	id: number;
	name: string;
	sprites: { other?: { ['official-artwork']: { front_default?: string } } };
	types: PokemonTypeEntry[];
	stats: PokemonStatEntry[];
}
