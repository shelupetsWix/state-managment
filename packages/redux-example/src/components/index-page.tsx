import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../store";
import { fetchItems, selectUserId } from "../store/itemsSlice";
import { TopButtons } from "./top-buttons";
import { RenderItems } from "./render-items";

export const IndexPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchItems({ userId }));
  }, [userId]);

  return (
    <div>
      <TopButtons />
      <RenderItems />
    </div>
  );
};
