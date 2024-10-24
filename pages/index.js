import { useState, useEffect } from "react";
import calculateEllipse from "../utils/calculateEllipse";

export default function Home() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rx, setRx] = useState(50);
  const [ry, setRy] = useState(30);
  const [results, setResults] = useState({ foci: 0, majorAxisLength: 0, minorAxisLength: 0 });

  useEffect(() => {
    const canvas = document.getElementById("ellipseCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    ctx.stroke();
  }, [x, y, rx, ry]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const major = parseFloat(rx);
    const minor = parseFloat(ry);

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
        <label htmlFor="x">X:</label>
        <input
          type="number"
          id="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
          required
        />
        <label htmlFor="y">Y:</label>
        <input
          type="number"
          id="y"
          value={y}
          onChange={(e) => setY(e.target.value)}
          required
        />
        <label htmlFor="rx">Radius X:</label>
        <input
          type="number"
          id="rx"
          value={rx}
          onChange={(e) => setRx(e.target.value)}
          required
        />
        <label htmlFor="ry">Radius Y:</label>
        <input
          type="number"
          id="ry"
          value={ry}
          onChange={(e) => setRy(e.target.value)}
          required
        />
        <button type="submit">Calculate</button>
      </form>
      <canvas id="ellipseCanvas" width="500" height="500"></canvas>
      <div id="results">
        <h2>Results</h2>
        <p>Foci: ±{results.foci.toFixed(2)}</p>
        <p>Major Axis: {results.majorAxisLength.toFixed(2)}, Minor Axis: {results.minorAxisLength.toFixed(2)}</p>
      </div>
    </div>
  );
}
