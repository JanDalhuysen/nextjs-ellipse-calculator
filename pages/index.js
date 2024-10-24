import { useState } from "react";
import calculateEllipse from "../utils/calculateEllipse";

export default function Home() {
  const [majorAxis, setMajorAxis] = useState("");
  const [minorAxis, setMinorAxis] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const major = parseFloat(majorAxis);
    const minor = parseFloat(minorAxis);

    if (isNaN(major) || isNaN(minor) || major <= 0 || minor <= 0) {
      alert("Please enter valid positive numbers for the axes.");
      return;
    }

    const { foci, majorAxisLength, minorAxisLength } = calculateEllipse(major, minor);
    setResults({ foci, majorAxisLength, minorAxisLength });
  };

  return (
    <div className="container">
      <h1>Ellipse Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="major-axis">Major Axis:</label>
        <input
          type="number"
          id="major-axis"
          value={majorAxis}
          onChange={(e) => setMajorAxis(e.target.value)}
          required
        />
        <label htmlFor="minor-axis">Minor Axis:</label>
        <input
          type="number"
          id="minor-axis"
          value={minorAxis}
          onChange={(e) => setMinorAxis(e.target.value)}
          required
        />
        <button type="submit">Calculate</button>
      </form>
      {results && (
        <div id="results">
          <h2>Results</h2>
          <p id="foci">Foci: ±{results.foci.toFixed(2)}</p>
          <p id="axes">
            Major Axis: {results.majorAxisLength.toFixed(2)}, Minor Axis: {results.minorAxisLength.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
