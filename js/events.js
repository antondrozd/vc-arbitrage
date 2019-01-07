import renderResult from './renderResult.js';

export default function addEvents() {
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
