import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage } from '../../store/slices/filters.slice';

interface PaginationBarProps {
	totalCount: number;
}

const PaginationBar = ({ totalCount }: PaginationBarProps) => {
	const { page, pageSize } = useAppSelector((state) => state.filters);
	const dispatch = useAppDispatch();

	const totalPages = Math.ceil(totalCount / pageSize) || 1;
	return (
		<div className="flex gap-2 items-center justify-center text-sm">
			<button
				disabled={page <= 1}
				className="bg-blue-500 text-white text-2xl cursor-pointer px-3 py-1 border rounded disabled:opacity-40"
				onClick={() => dispatch(setPage(page - 1))}
			>
				Prev
			</button>
			<span className='text-2xl'>
				Page {page} / {totalPages}
			</span>
			<button
				disabled={page >= totalPages}
				className="bg-blue-500 text-white text-2xl cursor-pointer px-3 py-1 border rounded disabled:opacity-40"
				onClick={() => dispatch(setPage(page + 1))}
			>
				Next
			</button>
		</div>
	);
};

export default PaginationBar;
