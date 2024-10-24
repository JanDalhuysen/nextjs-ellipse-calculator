import { useState } from 'react';

export default function Home() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [h, setH] = useState('');
  const [k, setK] = useState('');
  const [foci, setFoci] = useState(null);
  const [axes, setAxes] = useState(null);

  const calculateEllipse = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const hNum = parseFloat(h);
    const kNum = parseFloat(k);

    const c = Math.sqrt(Math.abs(aNum * aNum - bNum * bNum));
    const foci = [
      { x: hNum + c, y: kNum },
      { x: hNum - c, y: kNum }
    ];
    const axes = {
      major: 2 * Math.max(aNum, bNum),
      minor: 2 * Math.min(aNum, bNum)
    };

    setFoci(foci);
    setAxes(axes);
  };

  return (
    <div>
      <h1>Ellipse Calculator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateEllipse();
        }}
      >
        <div>
          <label>
            a:
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            b:
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            h:
            <input
              type="number"
              value={h}
              onChange={(e) => setH(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            k:
            <input
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Calculate</button>
      </form>
      {foci && (
        <div>
          <h2>Foci</h2>
          <p>
            F1: ({foci[0].x}, {foci[0].y})
          </p>
          <p>
            F2: ({foci[1].x}, {foci[1].y})
          </p>
        </div>
      )}
      {axes && (
        <div>
          <h2>Axes</h2>
          <p>Major Axis: {axes.major}</p>
          <p>Minor Axis: {axes.minor}</p>
        </div>
      )}
    </div>
  );
}
