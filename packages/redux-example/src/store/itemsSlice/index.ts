import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";

export type Item = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Status = "idle" | "pending" | "success" | "error";
const initialState = {
  userId: 1 as number,
  items: [] as Item[],
  status: "idle" as Status,
};

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (payload: { userId: number }, { rejectWithValue }) => {
    const userId = payload.userId;
    try {
      const response = await axios.get<Item[]>(BASE_URL, { params: { userId } });
      console.log("<> fetchItems ", response.data);
      return response?.data || [];
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const patchItem = createAsyncThunk(
  "items/patchItem",
  async (payload: { title: string; itemId: number }, { rejectWithValue }) => {
    const { itemId, title } = payload;
    try {
      const response = await axios.patch<Item>(
        `${BASE_URL}/${itemId}`,
        { title },
        { headers: { "Content-type": "application/json; charset=UTF-8" } }
      );
      console.log("<> patchItem ", response.data);
      return response?.data || [];
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const itemsSlice: Slice<typeof initialState> = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(patchItem.pending, (state) => {
        // state.status = "pending";
      })
      .addCase(patchItem.fulfilled, (state, action) => {
        state.status = "success";
        state.items = state.items.map(item => {
          if (item.id === action.payload.id && item.userId === action.payload.userId) {
            return action.payload
          } else {
            return item
          }
        }) ;
      })
      .addCase(patchItem.rejected, (state, action) => {
        state.status = "error";
      })
  },
});

export const { setItems, setUserId } = itemsSlice.actions;

export const selectState = (state: RootState) => state.todoListItems;

export const selectItems = createSelector(
  [selectState],
  (todoListItems) => todoListItems.items
);

export const selectUserId = createSelector(
  [selectState],
  (todoListItems) => todoListItems.userId
);

export const selectStatus = createSelector(
  [selectState],
  (todoListItems) => todoListItems.status
);

export default itemsSlice.reducer;
