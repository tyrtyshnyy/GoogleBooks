import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookResults } from "../utils/service/types";
import { Book } from "../utils/types";

type BooksState = {
  books: Book[];
  totalItems: number;
  isLoading: boolean;
  book: Book | Record<string, never>
};

const initialState: BooksState = {
  books: [],
  totalItems: 0,
  isLoading: false,
  book: {}
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks(state, action: PayloadAction<BookResults>) {
      state.books.push(...action.payload.books);
      state.totalItems = action.payload.totalItems
      state.book = {}
    },
    loadingBooks(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    addBook(state, action: PayloadAction<Book>) {
      state.book = action.payload;
    },
    resetBook(state) {
      state.book = {}
    }
    // toggleComplete(state, action: PayloadAction<string>) {
    //   const toggledTodo = state.list.find((todo) => todo.id === action.payload);
    //   if (toggledTodo) {
    //     toggledTodo.completed = !toggledTodo.completed;
    //   }
    // },
    // removeTodo(state, action: PayloadAction<string>) {
    //   state.list = state.list.filter((todo) => todo.id !== action.payload);
    // },
  },
});

export const { addBooks, loadingBooks, addBook, resetBook } = bookSlice.actions;

export const bookReducer =  bookSlice.reducer;
