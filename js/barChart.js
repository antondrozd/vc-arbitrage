export default class BarChart {
  constructor({
    maxBarHeight = 100,
    colors = ['#007bff', '#6f42c1', '#dc3545', '#28a745'],
    animation = null,
    animationStep = 0.2,
    animationDelay = 0
  } = {}) {
    this._$bars = $('.bar');
    this._maxValue;
    this._maxBarHeight = maxBarHeight;
    this.colors = colors;
    this.animation = animation;
    this.animationStep = animationStep;
    this.animationDelay = animationDelay;

    this.init();
  }

  init() {
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

  _getFormattedValue(value) {
    const numberOfDecimalPlaces = value.toString().includes('.')
      ? value
          .toString()
          .split('.')
          .pop().length
      : 0;

    return numberOfDecimalPlaces ? value : value.toFixed(1);
  }

  renderBars() {

    this._$bars.each((index, bar) => {
      const $bar = $(bar);

      const maxBarHeight = this._maxBarHeight;
      const maxValue = this._maxValue;
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

      const valueToDisplay = this._getFormattedValue(value);

      $bar.text(`${valueToDisplay}x`);

      if (this.animation) {
        const animationType = this.animation;
        const delay = (
          index * this.animationStep +
          this.animationDelay
        ).toFixed(2);

        $bar
          .addClass(`animated ${animationType} wow`)
          .attr('data-wow-delay', `${delay}s`);
      }
    });
  }
}
