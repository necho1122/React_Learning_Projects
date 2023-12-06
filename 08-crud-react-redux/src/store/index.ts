import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";


const persistanceMiddleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
} 

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
