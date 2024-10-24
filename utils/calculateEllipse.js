function calculateEllipse(majorAxis, minorAxis) {
  const foci = Math.sqrt(Math.abs(majorAxis ** 2 - minorAxis ** 2));
  const majorAxisLength = 2 * majorAxis;
  const minorAxisLength = 2 * minorAxis;

  return { foci, majorAxisLength, minorAxisLength };
}

export default calculateEllipse;
