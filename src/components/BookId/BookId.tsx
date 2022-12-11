import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addBook } from "../../store/bookSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { bookApi } from "../../utils/service/GoogleBooks";

const BookId: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.books);

  useEffect(() => {
    bookApi.getBookId(id!).then((result) => dispatch(addBook(result)));
  }, []);

  console.log(book);

  return <></>;
};

export default BookId;
