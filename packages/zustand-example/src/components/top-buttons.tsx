import React from "react";
import { useStore } from "../store/useStore";

export const TopButtons = () => {
  const setUserId = useStore((state) => state.setUserId);

  return (
    <div style={{ display: "flex" }}>
      {Array(10)
        .fill("")
        .map((_item, index) => {
          const userId = index + 1;
          return (
            <button key={index} 
            onClick={() => setUserId(userId)}
            >
              user Id {userId}
            </button>
          );
        })}
    </div>
  );
};
