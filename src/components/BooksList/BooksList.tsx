import { useOutletContext } from "react-router-dom";

import { Book } from "../../utils/types";
import BookItem from "../BookItem/BookItem";
import s from "./style.module.css";

interface OutletContext {
  books: Book[];
  totalItems: number;
}

const BooksList = () => {
  const { books, totalItems }: OutletContext = useOutletContext();

  return (
    <>
      {totalItems ? (
        <h2 className={s.title}>Всего найдено {totalItems} книг!</h2>
      ) : (
        <h2 className={s.title}>Книг не найдено!</h2>
      )}
      <div className={s.wrapper}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default BooksList;
