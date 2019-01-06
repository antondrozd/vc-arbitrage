function getPercentage(value, percentage) {
  return (value * percentage) / 100;
}

export default function getPurchasingPowerValue() {
  const sum = $('#sum').val();
  const coefficients = [
    ...$('.bar').map((index, bar) => $(bar).data('bar-value'))
  ];

  return Math.ceil(
    getPercentage(sum, 70) * coefficients[0] +
      getPercentage(sum, 10) * coefficients[1] +
      getPercentage(sum, 20) * coefficients[2]
  );
}
