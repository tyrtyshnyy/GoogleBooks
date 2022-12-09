import { useState } from "react";
import { Outlet } from "react-router-dom";

import SearchGroup from "../../components/SearchGroup/SearchGroup";
import { useAppSelector } from "../../utils/hook";

const Books = () => {
  const [startIndex, setStartIndex] = useState(0)
  const {books, totalItems} = useAppSelector(store => store.books)
  return (
    <div>
      <SearchGroup startIndex={startIndex}/>
      <Outlet context={{books, totalItems}} />

    </div>
  );
};

export default Books;
