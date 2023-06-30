import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { DispathType, RootStateType } from '../store'

export const useAppDispatch = () => useDispatch<DispathType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
