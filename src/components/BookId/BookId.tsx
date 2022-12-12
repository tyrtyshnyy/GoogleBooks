import HTMLReactParser from "html-react-parser";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addBook, resetBook } from "../../store/bookSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { bookApi } from "../../utils/service/GoogleBooks";

import s from "./style.module.css";

const BookId: FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.books);

  useEffect(() => {
    bookApi.getBookId(id!).then((result) => dispatch(addBook(result)));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetBook());
    };
  }, []);

  const parsedDescription = book.description
    ? HTMLReactParser(book.description)
    : null;

  return (
    <div className={s.BookId}>
      <div className={s.BookIdItem}>
        <img className={s.image} src={book.image} alt="bookImage" />
      </div>
      <div className={s.BookIdInfo}>
        <div className={s.title}>
          <p className={s.paragraph}>Название</p>
          <h2>{book.title}</h2>
        </div>
        <div className={s.authors}>
          <p className={s.paragraph}>Автор(ы)</p>
          {book.authors?.map((author, index) => (
            <span className={s.author} key={index}>
              {author};
            </span>
          ))}
        </div>
        <div className={s.subtitle}>{book.subtitle}</div>

        {book.description && (
          <div className={s.description}>
            <p className={s.paragraph}>Описание</p>
            {parsedDescription}
          </div>
        )}

        {book.publishedDate && (
          <div>
            <p className={s.paragraph}>Дата публикации</p>
            {book.publishedDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookId;
