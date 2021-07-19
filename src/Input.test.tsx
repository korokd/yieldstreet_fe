import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

test("translates the required prop into the required field", () => {
  render(
    <Input
      name="Text Input"
      config={{ type: "text" }}
      required={true}
      onChange={() => void 0}
    />
  );
  const input = screen.getByLabelText("Text Input");
  expect(input).toHaveAttribute("required");
});
