import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useSelectorDefault,
  useDispatch as useDispatchDefault,
} from "react-redux";

import itemsReducer from "./itemsSlice";

const rootReducer = combineReducers({
  todoListItems: itemsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>;

export const useDispatch = () => useDispatchDefault<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorDefault;
