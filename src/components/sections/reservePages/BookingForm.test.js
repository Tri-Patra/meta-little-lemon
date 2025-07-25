
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReservationForm from "./BookingForm";

describe("ReservationForm Component", () => {
  const mockUpdateTimes = jest.fn();
  const mockAvailableTimes = ["12:00 PM", "1:00 PM", "2:00 PM"];

  beforeEach(() => {
    render(
      <ReservationForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
      />,
      { wrapper: MemoryRouter }
    );
  });

  test("renders all input fields", () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of People/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seating preferences/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Comments/i)).toBeInTheDocument();
  });

  test("renders available times in the time dropdown", () => {
    const timeDropdown = screen.getByLabelText(/Select Time/i);
    mockAvailableTimes.forEach((time) => {
      expect(timeDropdown).toHaveTextContent(time);
    });
  });

  test("calls updateTimes when date is changed", () => {
    const dateInput = screen.getByLabelText(/Select Date/i);
    fireEvent.change(dateInput, { target: { value: "2023-12-25" } });
    expect(mockUpdateTimes).toHaveBeenCalledWith(new Date("2023-12-25"));
  });

  test("updates state when inputs are changed", () => {
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");

    const lastNameInput = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput.value).toBe("Doe");

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput.value).toBe("john.doe@example.com");

    const phoneInput = screen.getByLabelText(/Phone Number/i);
    fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
    expect(phoneInput.value).toBe("123-456-7890");

    const peopleInput = screen.getByLabelText(/Number of People/i);
    fireEvent.change(peopleInput, { target: { value: "4" } });
    expect(peopleInput.value).toBe("4");

    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });
    expect(occasionSelect.value).toBe("Birthday");

    const preferencesSelect = screen.getByLabelText(/Seating preferences/i);
    fireEvent.change(preferencesSelect, { target: { value: "Indoors" } });
    expect(preferencesSelect.value).toBe("Indoors");

    const commentsTextarea = screen.getByLabelText(/Additional Comments/i);
    fireEvent.change(commentsTextarea, { target: { value: "No peanuts, please." } });
    expect(commentsTextarea.value).toBe("No peanuts, please.");
  });

  test("renders the Book Table button", () => {
    const bookTableButton = screen.getByText(/Book Table/i);
    expect(bookTableButton).toBeInTheDocument();
    expect(bookTableButton.closest("a")).toHaveAttribute("href", "/confirmation");
  });
});
