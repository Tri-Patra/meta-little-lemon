import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import Navigation from "./Navigation";
import Hamburger from "../assets/hamburger.png";
import Close from "../assets/close.png";

jest.mock("./Navigation", () => jest.fn(() => <div>Mocked Navigation</div>));
jest.mock("../assets/hamburger.png", () => "mock-hamburger.png");
jest.mock("../assets/close.png", () => "mock-close.png");

describe("Navbar Component", () => {

  test("displays the correct icon based on navbarOpen state", () => {
    render(<Navbar />);

    const burgerButton = screen.getByRole("button", { name: /Navigation Bar/i });

    // Initially, the Hamburger icon should be displayed
    const hamburgerIcon = screen.getByAltText("Navigation Bar");
    expect(hamburgerIcon).toHaveAttribute("src", "mock-hamburger.png");

    // Click the burger button to toggle the state
    fireEvent.click(burgerButton);

    // Now, the Close icon should be displayed
    const closeIcon = screen.getByAltText("Navigation Bar");
    expect(closeIcon).toHaveAttribute("src", "mock-close.png");
  });
});