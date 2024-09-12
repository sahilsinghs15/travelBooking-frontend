import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../Redux/store.ts';

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;
