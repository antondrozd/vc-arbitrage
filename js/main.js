(() => {
  window.cities = {
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

  window.getDataFromURL = () => {
    const params = new URLSearchParams(window.location.search.slice(1));

    if (params.toString()) {
      const raiseFromKey = params.get('raise');
      const spendInKey = params.get('spend');
      const sum = Number(params.get('sum'));

      const raiseFrom = window.cities[raiseFromKey];
      const spendIn = window.cities[spendInKey];

      return { raiseFromKey, raiseFrom, spendInKey, spendIn, sum };
    }
  };

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

  function addEvents() {
    $('#sum').on('focus', function() {
      $(this).select();
    });

    $('#getResult').on('submit', function(event) {
      // event.preventDefault();

      const $sum = $('#sum');

      if (!$sum.val()) return $sum.focus();

      // $(this).submit();
    });
  }

  function activateSearchfieldsBehavior() {
    const firstValue = $(
      'select.cities-searchfield > option:first-child'
    ).val();
    const lastValue = $('select.cities-searchfield > option:last-child').val();

    $('select.cities-searchfield').on('hide.bs.select', event => {
      $('.dropup').removeClass('dropup');
    });

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
    });

    const data = window.getDataFromURL();

    if (data) {
      const { raiseFromKey, spendInKey, sum } = data;

      $('select.cities-searchfield#raise').selectpicker('val', raiseFromKey);
      $('select.cities-searchfield#spend').selectpicker('val', spendInKey);
      $('#sum').val(sum);
    } else {
      $('select.cities-searchfield#spend').selectpicker('val', lastValue);
    }
  }

  $(document).ready(() => {
    addCitiesDataToFields(cities);
    initSelectPicker();
    activateSearchfieldsBehavior();
    addEvents();
  });
})();
