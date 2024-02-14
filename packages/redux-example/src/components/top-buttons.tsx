import React from "react";
import { useDispatch } from "../store";
import { setUserId } from "../store/itemsSlice";

export const TopButtons = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex" }}>
      {Array(10)
        .fill("")
        .map((_item, index) => {
          const userId = index + 1;
          return (
            <button key={index} onClick={() => dispatch(setUserId(userId))}>
              user Id {userId}
            </button>
          );
        })}
    </div>
  );
};
