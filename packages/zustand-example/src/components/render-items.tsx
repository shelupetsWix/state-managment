import React from "react";
import { RenderItemSingle } from "./render-item-single";
import { useStore } from "../store/useStore";

export const RenderItems = () => {
  const items = useStore((state) => state.items);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {(
        items||
         []).map((item, i) => (
        <RenderItemSingle item={item} key={i} />
      ))}
    </div>
  );
};
