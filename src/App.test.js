import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Test to check if the Navbar component renders correctly
test("renders Navbar component", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const navbarElement = screen.getAllByText('Home'); // Assuming Navbar has a role of "navigation"
  expect(navbarElement[0]).toBeInTheDocument();
});


// Test to check if the Footer component renders correctly
test("renders Footer component", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const footerElement = screen.getByRole("contentinfo"); // Assuming Footer has a role of "contentinfo"
  expect(footerElement).toBeInTheDocument();
});
