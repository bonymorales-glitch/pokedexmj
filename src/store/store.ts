import { configureStore } from '@reduxjs/toolkit';
import trainer from './slices/trainer.slice.ts';
import filters from './slices/filters.slice.ts';
import { pokemonApi } from '../services/pokemon.api';

export const store = configureStore({
	reducer: {
		trainer,
		filters,
		[pokemonApi.reducerPath]: pokemonApi.reducer,
	},
	middleware: (getDefault) => getDefault().concat(pokemonApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
