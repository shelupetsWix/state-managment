import React from "react";
import { useSelector } from "../store";
import { selectItems } from "../store/itemsSlice";
import { RenderItemSingle } from "./render-item-single";

export const RenderItems = () => {
  const items = useSelector(selectItems);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {(items || []).map((item) => (
        <RenderItemSingle item={item} key={item.id} />
      ))}
    </div>
  );
};
