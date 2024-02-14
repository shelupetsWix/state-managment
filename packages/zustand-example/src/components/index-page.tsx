import React, { useEffect } from "react";
import { TopButtons } from "./top-buttons";
import { RenderItems } from "./render-items";
import { useStore } from "../store/useStore";

export const IndexPage = () => {
  const { fetchItems, userId } = useStore((state) => state);

  useEffect(() => {
    fetchItems({ userId });
  }, [userId]);

  return (
    <div>
      <TopButtons />
      <RenderItems />
    </div>
  );
};
