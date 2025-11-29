import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useRef } from 'react';
import { setTrainer } from '../store/slices/trainer.slice';
import PageContainer from '../components/layout/PageContainer';

const HomePage = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const value = inputRef.current?.value.trim() || '';

		if (value.length >= 3) {
			dispatch(setTrainer(value));
			navigate('/pokedex');
		}
	};
	return (
		<PageContainer>
			<div className="flex flex-col items-center justity-center gap-4 text-center min-h-[60vh]">
				<header className="flex items-center">
				   <img className="mx-auto mt-24" src="./image/logo.png" alt="logo" />
				</header>

				<h2 className="text-4xl text-red-700 font-bold mt-20">!Hola Entrenador!</h2>
				<p className="text-sm">Para poder comenzar dame tu nombre</p>

				<form onSubmit={handleSubmit} className="flex gap-2 mt-10 items-center">
					<input
						ref={inputRef}
						className="border rounded px-3 py-2"
						placeholder="Tu nombre"
					/>

					<button className="bg-blue-600 text-white px-4 py-2 rounded">
						Comenzar
					</button>
				</form>
				<footer className='w-full mt-40'>
					<img src="./image/piepoke.png" alt="piePagina" />
				</footer>
			</div>
		</PageContainer>
	);
};

export default HomePage;
