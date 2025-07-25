
import { fetchAPI, submitAPI } from "./bookingsAPI";

describe("bookingsAPI", () => {
  describe("fetchAPI", () => {
    test("returns an array of available times based on the date", () => {
      const mockDate = new Date("2023-10-15"); // Example date
      const result = fetchAPI(mockDate);

      // Assert that the result is an array
      expect(Array.isArray(result)).toBe(true);

      // Assert that the result contains valid time slots
      result.forEach((time) => {
        expect(time).toMatch(/^(17|18|19|20|21|22|23):(00|30)$/);
      });
    });

    test("returns consistent results for the same date", () => {
      const mockDate = new Date("2023-10-15");

      // Call fetchAPI twice with the same date
      const result1 = fetchAPI(mockDate);
      const result2 = fetchAPI(mockDate);

      // Assert that the results are the same
      expect(result1).toEqual(result2);
    });

    test("returns different results for different dates", () => {
      const date1 = new Date("2023-10-15");
      const date2 = new Date("2023-10-16");

      // Call fetchAPI with different dates
      const result1 = fetchAPI(date1);
      const result2 = fetchAPI(date2);

      // Assert that the results are different
      expect(result1).not.toEqual(result2);
    });
  });

  describe("submitAPI", () => {
    test("always returns true", () => {
      const mockFormData = { name: "John Doe", time: "18:00", date: "2023-10-15" };

      // Call submitAPI with mock form data
      const result = submitAPI(mockFormData);

      // Assert that the result is true
      expect(result).toBe(true);
    });
  });
});