import { fireEvent, render, screen } from "@testing-library/react";
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

// Test to check if the Home page renders correctly
test("render Home page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  const homeElement = screen.getAllByText('Home');
  fireEvent.click(homeElement[0]);
  expect(screen.getByText("This weeks specials")).toBeInTheDocument();
});

// Test to check if the About page renders correctly
test("render About page", () => {
  render(
    <MemoryRouter initialEntries={["/about"]}>
      <App />
    </MemoryRouter>
  );
  const aboutElement = screen.getAllByText('About');
  fireEvent.click(aboutElement[0]);
  expect(screen.getByText("About us")).toBeInTheDocument();
});

// Test to check if the Reservations page renders correctly
test("render Reservations page", () => {
  render(
    <MemoryRouter initialEntries={["/reservations"]}>
      <App />
    </MemoryRouter>
  );
  const reservationsElement = screen.getAllByText('Reservations');
  fireEvent.click(reservationsElement[0]);
  expect(screen.getByText("Reserve a table")).toBeInTheDocument();
});

// Test to check if the Order Online page renders correctly
test("render Order Online page", () => {
  render(
    <MemoryRouter initialEntries={["/order-online"]}>
      <App />
    </MemoryRouter>
  );
  const orderOnlineElement = screen.getAllByText('Order Online');
  fireEvent.click(orderOnlineElement[0]);
  expect(screen.getAllByText("Order Online")[1]).toBeInTheDocument();
});

// Test to check if the Login page renders correctly
test("render Login page", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  const loginElement = screen.getAllByText('Login');
  fireEvent.click(loginElement[0]);
  expect(screen.getAllByText("Login")[1]).toBeInTheDocument();
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
