import { useAppDispatch, useAppSelector } from "../app/store";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    return { auth, dispatch };
}
