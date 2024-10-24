document.getElementById('ellipse-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const majorAxis = parseFloat(document.getElementById('major-axis').value);
  const minorAxis = parseFloat(document.getElementById('minor-axis').value);

  if (isNaN(majorAxis) || isNaN(minorAxis) || majorAxis <= 0 || minorAxis <= 0) {
    alert('Please enter valid positive numbers for the axes.');
    return;
  }

  const foci = Math.sqrt(Math.abs(majorAxis ** 2 - minorAxis ** 2));
  const majorAxisLength = 2 * majorAxis;
  const minorAxisLength = 2 * minorAxis;

  document.getElementById('foci').textContent = `Foci: ±${foci.toFixed(2)}`;
  document.getElementById('axes').textContent = `Major Axis: ${majorAxisLength.toFixed(2)}, Minor Axis: ${minorAxisLength.toFixed(2)}`;
});
