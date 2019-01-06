import { scrollTo } from './helpers.js';

function getFieldsData() {
  const raiseFrom = $(`#raise option[value="${$('#raise').val()}"]`).text();
  const spendIn = $(`#spend option[value="${$('#spend').val()}"]`).text();
  const sum = $('#sum').val();

  return { raiseFrom, spendIn, sum };
}

export default function renderResult() {
  const $target = $('#result');
  const { raiseFrom, spendIn, sum } = getFieldsData();

  $('.raise-sum').text(`$${sum}`);
  $('.raise-from').text(raiseFrom);
  $('.spend-in').text(spendIn);

  $target.removeClass('d-none').addClass('d-block');
  scrollTo($target, 500);
}
