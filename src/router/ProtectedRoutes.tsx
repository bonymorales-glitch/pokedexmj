import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoutes = () => {
	const trainer = useAppSelector((state) => state.trainer);
	return trainer.length >= 3 ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
