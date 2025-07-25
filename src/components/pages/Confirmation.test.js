
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Confirmation from "./Confirmation";
import HeroImage from "../../assets/food/food5.jpeg";

describe("Confirmation Component", () => {
  test("renders the confirmation header", () => {
    render(
      <BrowserRouter>
        <Confirmation />
      </BrowserRouter>
    );

    // Check if the header image is rendered with the correct src and alt attributes
    const headerImage = screen.getByAltText("Little Lemon Ingredients");
    expect(headerImage).toBeInTheDocument();
    expect(headerImage).toHaveAttribute("src", HeroImage);

    // Check if the confirmation text is rendered
    expect(
      screen.getByRole("heading", { name: /Your Reservation is Confirmed!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A confirmation message has been sent to your email./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Thanks for dining with us!/i)).toBeInTheDocument();
  });

  test("renders redirect buttons with correct links", () => {
    render(
      <BrowserRouter>
        <Confirmation />
      </BrowserRouter>
    );

    // Check if the "Browse Menu" button is rendered with the correct href
    const browseMenuButton = screen.getByText(/Browse Menu/i);
    expect(browseMenuButton).toBeInTheDocument();
    expect(browseMenuButton).toHaveAttribute(
      "href",
      expect.stringContaining("menu.webp")
    );
    expect(browseMenuButton).toHaveAttribute("target", "_blank");
    expect(browseMenuButton).toHaveAttribute("rel", "noreferrer");

    // Check if the "Order Online" button is rendered with the correct link
    const orderOnlineButton = screen.getByText(/Order Online/i);
    expect(orderOnlineButton).toBeInTheDocument();
    expect(orderOnlineButton.closest("a")).toHaveAttribute("href", "/order");

    // Check if the "Home Page" button is rendered with the correct link
    const homePageButton = screen.getByText(/Home Page/i);
    expect(homePageButton).toBeInTheDocument();
    expect(homePageButton.closest("a")).toHaveAttribute("href", "/");
  });
});