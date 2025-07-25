import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationForm(props) {
  const navigate = useNavigate();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("");
  const [preferences, setPreferences] = useState("");
  const [comments, setComments] = useState("");

  const [touched, setTouched] = useState({});

  const [finalTime, setFinalTime] = useState(
    props.availableTimes.map((times) => (
      <option key={times} value={times}>{times}</option>
    ))
  );

  function handleDateChange(e) {
    setDate(e.target.value);
    const selectedDate = new Date(e.target.value);
    props.updateTimes(selectedDate);
    setFinalTime(props.availableTimes.map((times) => (
      <option key={times} value={times}>{times}</option>
    )));
  }

  const isFormValid = () => {
    return (
      fName.trim().length >= 2 &&
      lName.trim().length >= 2 &&
      email.trim().length >= 4 &&
      tel.trim().length >= 10 &&
      people >= 1 &&
      date &&
      time
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate("/confirmation");
    }
  };

  const showError = (field, condition, message) => {
    return touched[field] && !condition ? (
      <div style={{ color: "red", fontSize: "0.9em" }}>{message}</div>
    ) : null;
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fName">
          First Name <span style={{ color: "red" }}>*</span>
        </label><br />
        <input
          type="text"
          id="fName"
          placeholder="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          onBlur={() => setTouched({ ...touched, fName: true })}
        />
        {showError("fName", fName.trim().length >= 2, "First name must be at least 2 characters")}
      </div>

      <div>
        <label htmlFor="lName">
          Last Name <span style={{ color: "red" }}>*</span>
        </label><br />
        <input
          type="text"
          id="lName"
          placeholder="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          onBlur={() => setTouched({ ...touched, lName: true })}
        />
        {showError("lName", lName.trim().length >= 2, "Last name must be at least 2 characters")}
      </div>

      <div>
        <label htmlFor="email">
          Email <span style={{ color: "red" }}>*</span>
        </label><br />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
        />
        {showError("email", email.trim().length >= 4, "Email must be at least 4 characters")}
      </div>

      <div>
        <label htmlFor="phonenum">
          Phone Number <span style={{ color: "red" }}>*</span>
        </label><br />
        <input
          type="tel"
          id="phonenum"
          placeholder="(xxx)-xxx-xxxx"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          onBlur={() => setTouched({ ...touched, tel: true })}
        />
        {showError("tel", tel.trim().length >= 10, "Phone number must be at least 10 digits")}
      </div>

      <div>
        <label htmlFor="people">
          Number of People <span style={{ color: "red" }}>*</span>
        </label><br />
        <input
          type="number"
          id="people"
          placeholder="Number of People"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          onBlur={() => setTouched({ ...touched, people: true })}
        />
        {showError("people", people >= 1, "Please enter at least 1 person")}
      </div>

      <div>
        <label htmlFor="date">
          Select Date <span style={{ color: "red" }}>*</span>
        </label><br />
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          onBlur={() => setTouched({ ...touched, date: true })}
        />
        {showError("date", date, "Please select a date")}
      </div>

      <div>
        <label htmlFor="time">
          Select Time <span style={{ color: "red" }}>*</span>
        </label><br />
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onBlur={() => setTouched({ ...touched, time: true })}
        >
          <option value="">Select a time</option>
          {finalTime}
        </select>
        {showError("time", time, "Please select a time")}
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label><br />
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option>None</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Engagement</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferences">Seating preferences</label><br />
        <select
          id="preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        >
          <option>None</option>
          <option>Indoors</option>
          <option>Outdoor (Patio)</option>
          <option>Outdoor (Sidewalk)</option>
        </select>
      </div>

      <div>
        <label htmlFor="comments">Additional Comments</label><br />
        <textarea
          id="comments"
          rows={5}
          cols={45}
          placeholder="Additional Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <div>
        <br />
        <small>
          <p>
            Note: You cannot edit your reservation after submission. Please
            double-check your answer before submitting your reservation request.
          </p>
        </small>
        <button
          className={!isFormValid()? "action-button-disabled" : "action-button"}
          type="submit"
          disabled={!isFormValid()}
        >
          Book Table
        </button>
      </div>
    </form>
  );
}
