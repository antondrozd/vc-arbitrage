import activateNavbarBehavior from './navbar.js';
import BarChart from './barChart.js';
import addCitiesDataToFields from './addCitiesDataToFields.js';
import initSelectPicker from './selectpicker.js';
import addEvents from './events.js';
import activateSearchfieldsBehavior from './searchfields.js';

import { cities } from '../data/cities.js';

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
