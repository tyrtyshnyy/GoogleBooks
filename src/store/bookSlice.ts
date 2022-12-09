import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookResults } from "../utils/service/types";
import { Book } from "../utils/types";

type TodosState = {
  books: Book[];
  totalItems: number;
  isLoading: boolean;
};

const initialState: TodosState = {
  books: [],
  totalItems: 0,
  isLoading: false,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks(state, action: PayloadAction<BookResults>) {
      state.books.push(...action.payload.books);
      state.totalItems = action.payload.totalItems
    },
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

export const { addBooks } = bookSlice.actions;

export const bookReducer =  bookSlice.reducer;
