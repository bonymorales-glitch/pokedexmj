import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const trainerSlice = createSlice({
	name: 'trainer',
	initialState: '' as string,
	reducers: {
		setTrainer: (_state, action: PayloadAction<string>) => action.payload,
		clearTrainer: () => '',
	},
});
export const { setTrainer, clearTrainer } = trainerSlice.actions;
export default trainerSlice.reducer;
