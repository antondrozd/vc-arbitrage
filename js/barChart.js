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
    const _this = this;

    this._$bars.each(function(index) {
      const $bar = $(this);

      const maxBarHeight = _this._maxBarHeight;
      const maxValue = _this._maxValue;
      const value = Number($bar.data('bar-value'));

      const height = (maxBarHeight / maxValue) * value;
      const marginTop = maxBarHeight - height;

      const colorIndex = _this.colors[index]
        ? index
        : index % _this.colors.length;

      $bar.css({
        height,
        marginTop,
        backgroundColor: _this.colors[colorIndex]
      });

      const valueToDisplay = _this._getFormattedValue(value);

      $bar.text(`${valueToDisplay}x`);

      if (_this.animation) {
        const animationType = _this.animation;
        const delay = (
          index * _this.animationStep +
          _this.animationDelay
        ).toFixed(2);

        $bar
          .addClass(`animated ${animationType} wow`)
          .attr('data-wow-delay', `${delay}s`);
      }
    });
  }
}
