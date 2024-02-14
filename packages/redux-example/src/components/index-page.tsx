import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../store";
import { fetchItems, selectStatus, selectUserId } from "../store/itemsSlice";
import { TopButtons } from "./top-buttons";
import { RenderItems } from "./render-items";

export const IndexPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchItems({ userId }));
  }, [userId]);

  return (
    <div>
      <TopButtons />
      {status === "success" ? <RenderItems /> : <p>{status}</p>}
    </div>
  );
};
