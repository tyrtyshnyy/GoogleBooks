import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Book } from "../../utils/types";
import s from "./style.module.css";

interface BookItemProps {
  book: Book;
}
const BookItem: FC<BookItemProps> = ({ book }) => {
  const navigate = useNavigate();
console.log(book.id);

  
  return (
    <div onClick={() => navigate(`./${book.id}`)} className={s.wrapper}>
      {book.rating && <span className={s.rating}>{book.rating}</span>}

      <img className={s.image} src={book.image} alt="book_image" />

      {/* {book.categories &&
        <div>
            <span className={s.categories}>{book.categories[0]}</span>
        </div>
    } */}
      <h2 className={s.title}>{book.title}</h2>
      {book.authors && (
        <div>
          {book.authors.map((author, index) => (
            <span className={s.authors} key={index}>
              {author};&nbsp;
            </span>
          ))}
        </div>
      )}
      <div>{/* <a href={book.link} target="_blank">Ссылка</a> */}</div>
    </div>
  );
};

export default BookItem;
