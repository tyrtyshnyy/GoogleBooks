import { Spin } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SearchGroup from "../../components/SearchGroup/SearchGroup";
import { useAppSelector } from "../../utils/hook";
import s from "./style.module.css";

const Books = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const { books, totalItems, isLoading } = useAppSelector(
    (store) => store.books
  );
  return (
    <div>
      <SearchGroup startIndex={startIndex} navigate={navigate} />
      {isLoading ? (
        <Spin className={s.spin} size="large" />
      ) : (
        <Outlet context={{ books, totalItems }} />
      )}
    </div>
  );
};

export default Books;
