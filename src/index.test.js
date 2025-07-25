import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Mock the App component
jest.mock("./App", () => () => <div>Mocked App Component</div>);

// Mock reportWebVitals
jest.mock("./reportWebVitals", () => jest.fn());

describe("index.js", () => {
  let rootContainer;

  beforeEach(() => {
    // Create a mock DOM element for the root
    rootContainer = document.createElement("div");
    rootContainer.setAttribute("id", "root");
    document.body.appendChild(rootContainer);
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.removeChild(rootContainer);
    rootContainer = null;
    jest.clearAllMocks();
  });

  test("renders App component inside BrowserRouter", () => {
    // Mock ReactDOM.createRoot
    const renderMock = jest.fn();
    ReactDOM.createRoot = jest.fn(() => ({
      render: renderMock,
    }));

    // Import the index.js file to trigger the rendering
    require("./index");

    // Assert that ReactDOM.createRoot was called with the root element
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootContainer);

    // Assert that the render method was called with the correct structure
    expect(renderMock).toHaveBeenCalledWith(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  });
});