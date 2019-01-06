import activateNavbarBehavior from './navbar.js';
import BarChart from './barChart.js';
import addCitiesDataToFields from './addCitiesDataToFields.js';
import initSelectPicker from './selectpicker.js';
import renderResult from './renderResult.js';

import { cities } from '../data/cities.js';

$(document).ready(() => {
  activateNavbarBehavior();
  addCitiesDataToFields(cities);
  initSelectPicker();

  $('#sum').on('focus', function() {
    $(this).select();
  });

  $('#showResult').on('click', event => {
    event.preventDefault();

    const $sum = $('#sum');

    if (!$sum.val()) return $sum.focus();

    renderResult($('#result'));
  });

  window.barChart = new BarChart({
    maxBarHeight: 175,
    animation: 'fadeIn'
  });
});
