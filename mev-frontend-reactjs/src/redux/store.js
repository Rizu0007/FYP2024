import { configureStore, combineReducers } from "@reduxjs/toolkit";
import balanceReducer from "./balanceRedux";
import addressReducer from "./AddressRedux";
import activityReducer from "./UserActivityRedux"
import botActivityReducer from "./UserBotActivityRedux"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({ balance: balanceReducer, address: addressReducer, activity: activityReducer, botactivity: botActivityReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persistStore(store)