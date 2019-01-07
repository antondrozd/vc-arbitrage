import getPurchasingPowerValue from './purchasingPower.js';
import { scrollTo, USDFormatter } from './helpers.js';

function getFieldsData() {
  const raiseFrom = $(`#raise option[value="${$('#raise').val()}"]`).text();
  const spendIn = $(`#spend option[value="${$('#spend').val()}"]`).text();
  const sum = $('#sum').val();

  return { raiseFrom, spendIn, sum };
}

export default function renderResult() {
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
