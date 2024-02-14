import React, { FC, useState } from "react";
import { Item } from "../types";
import { useStore } from "../store/useStore";

export const RenderItemSingle: FC<{ item: Item }> = ({ item }) => {
  const patchItem = useStore((state) => state.patchItem);
  const [inputShown, setInputShown] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            backgroundColor: item.completed ? "green" : "red",
          }}
        />
        <div>{item.title}</div>
        <button onClick={() => setInputShown((state) => !state)}>
          Edit text
        </button>
      </div>

      {inputShown && (
        <div style={{ display: "flex", gap: "10px" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              patchItem({ title: newTitle, itemId: item.id })
              setInputShown(false);
            }}
          >
            <label>
              <input
                style={{ width: "30vw" }}
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};
