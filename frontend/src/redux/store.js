import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import { authApi } from "./api/authApi";
import { tashkilApi } from "./api/tashkilApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tashkilApi.reducerPath]: tashkilApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            tashkilApi.middleware
        )
});

const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.getProfile.initiate({}, { forceRefetch: true }))
}

initializeApp();