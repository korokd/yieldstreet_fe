import React from "react";
import { render, screen } from "@testing-library/react";
import App, { steps } from "./App";

test("renders the first step of the survey", () => {
  render(<App />);
  const headerElement = screen.getByText(new RegExp(steps[0].name));
  expect(headerElement).toBeInTheDocument();
});
