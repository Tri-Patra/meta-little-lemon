
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

  test("shows error messages when fields are invalid and blurred", () => {
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.blur(firstNameInput);
    expect(screen.getByText(/First name must be at least 2 characters/i)).toBeInTheDocument();

    const lastNameInput = screen.getByLabelText(/Last Name/i);
    fireEvent.blur(lastNameInput);
    expect(screen.getByText(/Last name must be at least 2 characters/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Email must be at least 4 characters/i)).toBeInTheDocument();

    const phoneInput = screen.getByLabelText(/Phone Number/i);
    fireEvent.blur(phoneInput);
    expect(screen.getByText(/Phone number must be at least 10 digits/i)).toBeInTheDocument();
  });

  test("updates state correctly when inputs are changed", () => {
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
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(phoneInput.value).toBe("1234567890");

    const peopleInput = screen.getByLabelText(/Number of People/i);
    fireEvent.change(peopleInput, { target: { value: "3" } });
    expect(peopleInput.value).toBe("3");
  });

  test("updates available times when date is changed", () => {
    const dateInput = screen.getByLabelText(/Select Date/i);
    fireEvent.change(dateInput, { target: { value: "2023-12-25" } });

    const timeDropdown = screen.getByLabelText(/Select Time/i);
    mockAvailableTimes.forEach((time) => {
      expect(timeDropdown).toHaveTextContent(time);
    });
  });
});
