import { render, screen } from "@testing-library/react";

import { NotFound } from "./NotFound";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("NotFound", () => {
  it("renders button", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
