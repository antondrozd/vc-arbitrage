(() => {
  const cities = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
    FM: 'Federated States Of Micronesia',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PW: 'Palau',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VI: 'Virgin Islands',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  };

  function activateNavbarBehavior() {
    let scrollPosition = 0;
    const $sections = $('section');
    const $nav = $('nav');
    const navHeight = $nav.outerHeight();

    $(window).on('scroll', function() {
      scrollPosition = $(this).scrollTop();

      $sections.each(function() {
        const top = $(this).offset().top - navHeight;
        const bottom = top + $(this).outerHeight();
        const sectionId = $(this).attr('id');

        if (scrollPosition >= top && scrollPosition <= bottom) {
          $nav.find('.nav-link').removeClass('active');
          $nav.find(`a[href="#${sectionId}"]`).addClass('active');
        }
      });
    });

    $('.navbar-brand').on('click', () => location.reload());
  }

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

  function addCitiesDataToFields(data) {
    function getHTMLTemplate(value, label) {
      return `<option value="${value}">${label}</option>`;
    }

    let htmlString = '';

    for (let value in data) {
      const label = data[value];

      htmlString += getHTMLTemplate(value, label);
    }

    $('.cities-searchfield').html(htmlString);
  }

  function initSelectPicker() {
    $('.cities-searchfield').selectpicker({
      liveSearch: true,
      liveSearchPlaceholder: 'Type city name here...',
      size: 5
    });
  }

  function getPercentage(value, percentage) {
    return (value * percentage) / 100;
  }

  function getPurchasingPowerValue() {
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

  function scrollTo($element, speed) {
    const position = $element.offset().top;
    const navBarHeight = $('.navbar').outerHeight() || 0;

    $('body, html').animate(
      {
        scrollTop: position - navBarHeight
      },
      speed
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

  function getFieldsData() {
    const raiseFrom = $(`#raise option[value="${$('#raise').val()}"]`).text();
    const spendIn = $(`#spend option[value="${$('#spend').val()}"]`).text();
    const sum = $('#sum').val();

    return { raiseFrom, spendIn, sum };
  }

  function renderResult() {
    const $target = $('#result');
    const { raiseFrom, spendIn, sum } = getFieldsData();

    const purchasingPowerSum = getPurchasingPowerValue();
    const purchasingPowerCoef = window.barChart.getFormattedValue(
      purchasingPowerSum / sum
    );

    $('.raise-sum').text(USDFormatter(sum));
    $('.raise-from').text(raiseFrom);
    $('.spend-in').text(spendIn);
    $('#purchasingPowerSum').text(USDFormatter(purchasingPowerSum));
    $('#resultBar').attr('data-bar-value', purchasingPowerCoef);

    window.barChart.init();
    window.barChart.renderBars();

    $target.removeClass('d-none');
    scrollTo($target, 500);

    $('#resultLink').removeClass('disabled');
  }

  function addEvents() {
    $('#sum').on('focus', function() {
      $(this).select();
    });

    $('#showResult').on('click', event => {
      event.preventDefault();

      const $sum = $('#sum');

      if (!$sum.val()) return $sum.focus();

      renderResult($('#result'));
    });
  }

  function activateSearchfieldsBehavior() {
    const firstValue = $(
      'select.cities-searchfield > option:first-child'
    ).val();
    const lastValue = $('select.cities-searchfield > option:last-child').val();

    $('select.cities-searchfield').on('changed.bs.select', event => {
      const currentId = event.target.id;
      const value = event.target.value;
      const $anotherField = $(`select.cities-searchfield:not(#${currentId})`);
      const anotherValue = $anotherField.val();

      if (value == anotherValue) {
        if (value == firstValue) {
          $anotherField.selectpicker('val', lastValue);
        } else {
          $anotherField.selectpicker('val', firstValue);
        }
      }

      $('.dropup').removeClass('dropup');
    });

    $('select.cities-searchfield#spend').selectpicker('val', lastValue);
  }

  $(document).ready(() => {
    activateNavbarBehavior();
    addCitiesDataToFields(cities);
    initSelectPicker();
    activateSearchfieldsBehavior();
    addEvents();

    window.barChart = new BarChart({
      maxBarHeight: 175,
      animation: 'fadeIn'
    });
  });
})();
