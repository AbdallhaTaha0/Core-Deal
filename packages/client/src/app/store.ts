import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";
import orderReducer from "../features/order/orderSlice";
import orderItemReducer from "../features/orderItem/orderItemSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import {useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook} from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        category: categoryReducer,
        order: orderReducer,
        orderItem: orderItemReducer,
        product: productReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;