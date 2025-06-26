import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
};
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getAllBooks() { },
    
  },
});
