export default class BarChart {
  constructor({
    maxBarHeight = 100,
    colors = ['#007bff', '#6f42c1', '#dc3545', '#28a745'],
    animation = null,
    animationStep = 0.2,
    animationDelay = 0
  } = {}) {
    this._maxValue;
    this._maxBarHeight = maxBarHeight;
    this.colors = colors;
    this.animation = animation;
    this.animationStep = animationStep;
    this.animationDelay = animationDelay;
  }

  init() {
    this._$bars = $('.bar');
    this._setMaxValue();
  }

  _setMaxValue() {
    const values = [];

    this._$bars.each(function() {
      const value = Number($(this).data('bar-value'));

      values.push(value);
    });

    this._maxValue = Math.max(...values);
  }

  getFormattedValue(value) {
    const numberOfDecimalPlaces = value.toString().includes('.')
      ? value
          .toString()
          .split('.')
          .pop().length > 1
      : 0;

    return numberOfDecimalPlaces ? value.toFixed(2) : value.toFixed(1);
  }

  renderBars() {
    const maxBarHeight = this._maxBarHeight;
    const maxValue = this._maxValue;

    this._$bars.each((index, bar) => {
      const $bar = $(bar);
      const value = Number($bar.data('bar-value'));

      const height = (maxBarHeight / maxValue) * value;
      const marginTop = maxBarHeight - height;

      const colorIndex = this.colors[index]
        ? index
        : index % this.colors.length;

      $bar.css({
        height,
        marginTop,
        backgroundColor: this.colors[colorIndex]
      });

      const valueToDisplay = this.getFormattedValue(value);

      $bar.text(`${valueToDisplay}x`);

      if (this.animation && WOW) {
        const animationType = this.animation;
        const delay = (
          index * this.animationStep +
          this.animationDelay
        ).toFixed(2);

        $bar
          .addClass(`animated ${animationType} wow`)
          .attr('data-wow-delay', `${delay}s`);

        new WOW({ mobile: false }).init();
      }
    });
  }
}
