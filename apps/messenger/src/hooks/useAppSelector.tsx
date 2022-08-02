import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "storage";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
