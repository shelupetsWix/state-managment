import axios from "axios";
import { create } from "zustand";

export type Item = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Status = "idle" | "pending" | "success" | "error";

type State = {
  userId: number;
  items: Item[];
  status: Status;
};
type Action = {
  setItems: (firstName: State["items"]) => void;
  setUserId: (lastName: State["userId"]) => void;
  fetchItems: ({ userId }: { userId: State["userId"] }) => Promise<void>;
  patchItem: ({
    title,
    itemId,
  }: {
    title: Item["title"];
    itemId: Item["userId"];
  }) => Promise<void>;
};

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const useStore = create<State & Action>((set) => ({
  userId: 1,
  items: [],
  status: "idle",
  setItems: (items: Item[]) => set((_state) => ({ items })),
  setUserId: (userId: number) => set((_state) => ({ userId })),
  fetchItems: async ({ userId }) => {
    try {
      const response = await axios.get<Item[]>(BASE_URL, {
        params: { userId },
      });
      console.log("<> fetchItems ", response.data);
      set({ items: response.data });
    } catch (e) {
      console.error((e as Error).message);
    }
  },
  patchItem: async ({ title, itemId }) => {
    try {
      const response = await axios.patch<Item>(
        `${BASE_URL}/${itemId}`,
        { title },
        { headers: { "Content-type": "application/json; charset=UTF-8" } }
      );
      console.log("<> patchItem ", response.data);
      set((state) => ({
        items: state.items.map((item) => {
          if (item.id === itemId && item.userId === response.data.userId) {
            return response.data;
          } else {
            return item;
          }
        }),
      }));
    } catch (e) {
      console.error((e as Error).message);
    }
  },
}));
