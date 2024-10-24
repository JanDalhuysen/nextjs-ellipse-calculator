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

    // Draw grid lines
    ctx.strokeStyle = "#e0e0e0";
    for (let i = 0; i < canvas.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw darker grid lines
    ctx.strokeStyle = "#a0a0a0";
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw dot at (x, y)
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Draw ellipse
    ctx.strokeStyle = "#000000";
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
        <label htmlFor="x">X: {x}</label>
        <input
          type="range"
          id="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
          min="0"
          max="500"
          required
        />
        <label htmlFor="y">Y: {y}</label>
        <input
          type="range"
          id="y"
          value={y}
          onChange={(e) => setY(e.target.value)}
          min="0"
          max="500"
          required
        />
        <label htmlFor="rx">Radius X: {rx}</label>
        <input
          type="range"
          id="rx"
          value={rx}
          onChange={(e) => setRx(e.target.value)}
          min="0"
          max="250"
          required
        />
        <label htmlFor="ry">Radius Y: {ry}</label>
        <input
          type="range"
          id="ry"
          value={ry}
          onChange={(e) => setRy(e.target.value)}
          min="0"
          max="250"
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
