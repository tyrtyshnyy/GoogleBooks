import { useOutletContext } from "react-router-dom";
import { Book } from "../../utils/types";

import s from "./style.module.css";

interface OutletContext {
    books: Book[], 
    totalItems: number
}

const BooksList = () => {
  const {books, totalItems}: OutletContext = useOutletContext();

  if (totalItems === 0) {
    return <h1>Книг не найдено</h1>;
  }

  return (
    <>
      {totalItems && <h2>Всего найдено {totalItems} книг!</h2>}
      <div className={s.wrapper}>
        {/* {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))} */}
      </div>
    </>
  );
};

export default BooksList;
