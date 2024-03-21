import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import fantasy from "./data/fantasy.json";
import CommentArea from "./components/CommentArea";
import BookList from "./components/BookList";

//---------------------------------------------------------------------Test1
test("search a title in a component welcome", () => {
  render(<Welcome />);
  const text = screen.getByText(/Benvenuti in EpiBooks/i);
  expect(text).toBeInTheDocument();
});
// ---------------------------------------------------------------------Test2
it("Ceck the card", () => {
  render(<AllTheBooks />);
  const book = screen.getAllByTestId("card");

  expect(book).toHaveLength(fantasy.length);
});
//------------------------------------------------------------------------Test3
test("search a session area comment", () => {
  render(<CommentArea />);
  const text = screen.getByText(/Recensione/i);
  expect(text).toBeInTheDocument();
});
//------------------------------------------------------------------------Test4
it("Test On the camp search", () => {
  render(<BookList />);
  const inputCamp = screen.getByPlaceholderText(/Cerca un libro/i);
  expect(inputCamp).toBeInTheDocument();
});
//------------------------------------------------------------------------Test5

//------------------------------------------------------------------------Test6
