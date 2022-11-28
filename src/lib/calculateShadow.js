export function calculateShadow(value, min, max) {
  const result = ((value - min) / (max - min)) * 100;
  return (
    "linear-gradient(to right, #ff9514 0%, #ff9514 " +
    result +
    "%, #e1e1e1 " +
    result +
    "%, #e1e1e1 100%)"
  );
}
