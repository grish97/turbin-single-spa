import { useDispatch } from "react-redux";
import { AppDispatch } from "storage";

export const useAppDispatch = () => useDispatch<AppDispatch>();
