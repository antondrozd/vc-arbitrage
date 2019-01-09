(() => {
  class BarChart {
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

  function getPercentage(value, percentage) {
    return (value * percentage) / 100;
  }

  function getPurchasingPowerValue() {
    const { sum } = window.getDataFromURL();
    const coefficients = [
      ...$('.bar').map((index, bar) => $(bar).data('bar-value'))
    ];

    return Math.ceil(
      getPercentage(sum, 70) * coefficients[0] +
        getPercentage(sum, 10) * coefficients[1] +
        getPercentage(sum, 20) * coefficients[2]
    );
  }

  function USDFormatter(value) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

  function renderResult() {
    const { raiseFrom, spendIn, sum } = window.getDataFromURL();

    const purchasingPowerSum = getPurchasingPowerValue();
    // const purchasingPowerCoef = window.barChart.getFormattedValue(
    //   purchasingPowerSum / sum
    // );

    $('.raise-sum').text(USDFormatter(sum));
    $('.raise-from').text(raiseFrom);
    $('.spend-in').text(spendIn);
    $('#purchasingPowerSum').text(USDFormatter(purchasingPowerSum));
    // $('#resultBar').attr('data-bar-value', purchasingPowerCoef);

    window.barChart.init();
    window.barChart.renderBars();
  }

  $(document).ready(() => {
    window.barChart = new BarChart({
      maxBarHeight: 175,
      animation: 'fadeIn'
    });

    renderResult();
  });
})();
